"use strict";
const MvcArea_1 = require("./MvcArea");
const glob = require("glob");
const path = require("path");
const KoaRouter = require('koa-router');
class Mvc {
    constructor() {
        this.registeredAreas = [];
    }
    registerAreas(rootPath, areas, controllerConvention) {
        for (var areaPath of areas) {
            this.registeredAreas.push({
                applicationRootPath: rootPath,
                areaPath: areaPath,
                controllerConvention: controllerConvention
            });
        }
        // this.registeredAreas.push(...areas);
    }
    discoverControllers() {
        var controllers = [];
        for (var area of this.registeredAreas) {
            var controllerSearchPattern = path.join(area.applicationRootPath, area.areaPath, area.controllerConvention);
            var files = glob.sync(controllerSearchPattern);
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
    routes() {
        const router = new KoaRouter();
        for (var foundController of this.discoverControllers()) {
            MvcArea_1.mvcArea(foundController.area.areaPath, {
                parentRouter: router,
                viewsDirectory: foundController.area.applicationRootPath,
                routes: foundController.controller.getRouter().routes()
            });
        }
        return router.routes();
    }
}
exports.Mvc = Mvc;
