import Koa = require("koa");
import {MvcController} from "./MvcController";
import {mvcArea} from "./MvcArea";
import glob = require("glob");
import path = require("path");
import extend = require("extend");
const KoaRouter = require('koa-router');

import {KoaMiddleware} from "./KoaMiddleware";
import extend = require("extend");

interface RegisteredArea {
    applicationRootPath: string;
    areaPath: string;
    options: MvcOptions;
    //absolutePath: string;
}

interface FoundController {
    controller: MvcController;
    area: RegisteredArea;
}

export interface MvcOptions {
    controllerConvention?: string;
    viewConvention?: string;
}

export class Mvc {

    private registeredAreas: Array<RegisteredArea> = [];

    public function

    registerAreas(rootPath: string, areas: Array<string>, options: MvcOptions) {
        options = extend(<MvcOptions>{
            controllerConvention: 'controllers/*.js',
            viewConvention: 'views'
        }, options);

        for (var areaPath of areas) {
            this.registeredAreas.push(<RegisteredArea>{
                applicationRootPath: rootPath,
                areaPath: areaPath,
                options: options
                //absolutePath: path.join(rootPath, areaPath)
            });
        }
        // this.registeredAreas.push(...areas);
    }

    private discoverControllers(): Array<FoundController> {
        var controllers: Array<FoundController> = [];
        for (var area of this.registeredAreas) {
            var controllerSearchPattern: string = path.join(
                area.applicationRootPath,
                area.areaPath,
                area.options.controllerConvention
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

    public function

    routes(): KoaMiddleware {
        const router = new KoaRouter();
        for (var foundController of this.discoverControllers()) {
            var viewSearchDirectory = path.join(
                foundController.area.applicationRootPath,
                foundController.area.areaPath,
                foundController.area.options.viewConvention
            );

            mvcArea(foundController.area.areaPath, {
                parentRouter: router,
                viewsDirectory: viewSearchDirectory,
                routes: foundController.controller.getRouter().routes()
            });
        }

        return router.routes();
    }

}