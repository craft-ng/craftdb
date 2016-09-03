import {KoaMiddleware} from "./KoaMiddleware";

export interface MvcAreaDefinition {
    rootRoute: string; // "name" of the area
    parentRouter;
    routes;
    viewMiddleware: KoaMiddleware;
}