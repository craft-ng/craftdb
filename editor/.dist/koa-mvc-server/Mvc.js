"use strict";
const MvcArea_1 = require("./MvcArea");
const glob = require("glob");
const path = require("path");
const extend = require("extend");
const KoaRouter = require('koa-router');
class Mvc {
    constructor() {
        this.registeredAreas = [];
    }
    registerAreas(rootPath, areas, options) {
        options = extend({
            controllerConvention: 'controllers/*.js',
            viewConvention: 'views'
        }, options);
        for (var areaPath of areas) {
            this.registeredAreas.push({
                applicationRootPath: rootPath,
                areaPath: areaPath,
                options: options
            });
        }
        // this.registeredAreas.push(...areas);
    }
    discoverControllers() {
        var controllers = [];
        for (var area of this.registeredAreas) {
            var controllerSearchPattern = path.join(area.applicationRootPath, area.areaPath, area.options.controllerConvention);
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
            var viewSearchDirectory = path.join(foundController.area.applicationRootPath, foundController.area.areaPath, foundController.area.options.viewConvention);
            MvcArea_1.mvcArea(foundController.area.areaPath, {
                parentRouter: router,
                viewsDirectory: viewSearchDirectory,
                routes: foundController.controller.getRouter().routes()
            });
        }
        return router.routes();
    }
}
exports.Mvc = Mvc;
