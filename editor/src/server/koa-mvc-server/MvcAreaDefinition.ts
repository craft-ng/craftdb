import {KoaMiddleware} from "./KoaMiddleware";

export interface MvcAreaDefinition {
    name: string;
    parentRouter;
    routes;
    viewMiddleware: KoaMiddleware;
    rootRoute?: string;
}