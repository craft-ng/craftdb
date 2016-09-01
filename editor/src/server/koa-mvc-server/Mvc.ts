import Koa = require("koa");
import {MvcController} from "./MvcController";
import {mvcArea} from "./MvcArea";
import glob = require("glob");
import path = require("path");
const KoaRouter = require('koa-router');

import {KoaMiddleware} from "./KoaMiddleware";

interface RegisteredArea {
    applicationRootPath: string;
    areaPath: string;
    controllerConvention: string;
    //absolutePath: string;
}

interface FoundController {
    controller: MvcController;
    area: RegisteredArea;
}

export class Mvc {

    private registeredAreas: Array<RegisteredArea> = [];

    public function

    registerAreas(rootPath: string, areas: Array<string>, controllerConvention: string) {
        for (var areaPath of areas) {
            this.registeredAreas.push(<RegisteredArea>{
                applicationRootPath: rootPath,
                areaPath: areaPath,
                controllerConvention: controllerConvention
                //absolutePath: path.join(rootPath, areaPath)
            });
        }
        // this.registeredAreas.push(...areas);
    }

    private discoverControllers(): Array<FoundController> {
        var controllers: Array<FoundController> = [];
        for (var area of this.registeredAreas) {
            var controllerSearchPattern: string = path.join(
                area.applicationRootPath, area.areaPath, area.controllerConvention
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
            mvcArea(foundController.area.areaPath, {
                parentRouter: router,
                viewsDirectory: foundController.area.applicationRootPath,
                routes: foundController.controller.getRouter().routes()
            });
        }

        return router.routes();
    }

}