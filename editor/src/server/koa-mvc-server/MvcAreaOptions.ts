import {KoaMiddleware} from "./KoaMiddleware";

export interface MvcAreaOptions {
    parentRouter;
    routes;
    rootRoute?: string;
    viewsDirectory?: string;
    viewMiddleware? : KoaMiddleware;
}