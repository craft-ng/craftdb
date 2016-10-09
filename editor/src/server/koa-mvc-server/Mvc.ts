import Koa = require("koa");
import glob = require("glob");
import path = require("path");
import extend = require("extend");
const KoaRouter = require('koa-router');
const views = require('koa-views');

import {KoaMiddleware} from "./KoaMiddleware";
import {MvcAreaDefinition} from "./MvcAreaDefinition";

interface RegisteredArea {
    applicationRootPath: string;
    areaPath: string;
    options: MvcOptions;
}

interface FoundController {
    controller: MvcController;
    area: RegisteredArea;
}

export interface MvcController {
    getRouter(): any;
}

export interface MvcOptions {
    controllers?: {
        convention?: string;
    };
    views?: {
        convention?: string;
        extension?: string;
        engine?: string;
        middleware?: (area: RegisteredArea)=>KoaMiddleware;
        templateOptions?: any
    };
    middleware?: Array<(area: RegisteredArea)=>KoaMiddleware>;
}

export class Mvc {

    private registeredAreas: Array<RegisteredArea> = [];

    public registerAreas(rootPath: string, areas: Array<string>, options: MvcOptions) {
        options = extend(true, <MvcOptions>{
            controllers: {convention: 'controllers/*.js'},
            views: {
                convention: 'views',
                engine: 'ejs',
                extension: 'html',
                middleware: area => {

                    var viewSearchDirectory = path.join(
                        area.applicationRootPath,
                        area.areaPath,
                        area.options.views.convention
                    );

                    return views(viewSearchDirectory, {
                        map: {[area.options.views.extension]: area.options.views.engine},
                        extension: area.options.views.extension,
                        options: area.options.views.templateOptions
                    });
                }
            }
        }, options);

        for (var areaPath of areas) {
            this.registeredAreas.push(<RegisteredArea>{
                applicationRootPath: rootPath,
                areaPath: areaPath,
                options: options
            });
        }
    }

    private discoverControllers(): Array<FoundController> {
        var controllers: Array<FoundController> = [];
        for (var area of this.registeredAreas) {
            var controllerSearchPattern: string = path.join(
                area.applicationRootPath,
                area.areaPath,
                area.options.controllers.convention
            );

            var files: Array<string> = glob.sync(controllerSearchPattern);

            for (var file of files) {
                const ControllerClass = require(file);
                controllers.push({
                    controller: new ControllerClass(),
                    area: area
                });
            }
        }

        return controllers;
    }

    private createArea(definition: MvcAreaDefinition) {

        definition.parentRouter.use(
            definition.rootRoute,
            definition.viewMiddleware,
            definition.routes
        );
    }

    public routes(): KoaMiddleware {
        const router = new KoaRouter();
        for (var foundController of this.discoverControllers()) {

            this.createArea({
                rootRoute: foundController.area.areaPath,
                parentRouter: router,
                viewMiddleware: foundController.area.options.views.middleware(
                    foundController.area
                ),
                routes: foundController.controller.getRouter().routes()
            });
        }

        return router.routes();
    }

}