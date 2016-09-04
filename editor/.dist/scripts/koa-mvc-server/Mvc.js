"use strict";
const glob = require("glob");
const path = require("path");
const extend = require("extend");
const KoaRouter = require('koa-router');
const views = require('koa-views');
class Mvc {
    constructor() {
        this.registeredAreas = [];
    }
    registerAreas(rootPath, areas, options) {
        options = extend(true, {
            controllers: { convention: 'controllers/*.js' },
            views: {
                convention: 'views',
                engine: 'ejs',
                extension: 'html',
                middleware: area => {
                    var viewSearchDirectory = path.join(area.applicationRootPath, area.areaPath, area.options.views.convention);
                    return views(viewSearchDirectory, {
                        map: { [area.options.views.extension]: area.options.views.engine },
                        extension: area.options.views.extension
                    });
                }
            }
        }, options);
        for (var areaPath of areas) {
            this.registeredAreas.push({
                applicationRootPath: rootPath,
                areaPath: areaPath,
                options: options
            });
        }
    }
    discoverControllers() {
        var controllers = [];
        for (var area of this.registeredAreas) {
            var controllerSearchPattern = path.join(area.applicationRootPath, area.areaPath, area.options.controllers.convention);
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
    createArea(definition) {
        definition.parentRouter.use(definition.rootRoute, definition.viewMiddleware, definition.routes);
    }
    routes() {
        const router = new KoaRouter();
        for (var foundController of this.discoverControllers()) {
            this.createArea({
                rootRoute: foundController.area.areaPath,
                parentRouter: router,
                viewMiddleware: foundController.area.options.views.middleware(foundController.area),
                routes: foundController.controller.getRouter().routes()
            });
        }
        return router.routes();
    }
}
exports.Mvc = Mvc;

//# sourceMappingURL=../../../.maps/server/koa-mvc-server/Mvc.js.map
