import {Context} from "koa";

declare module "koa" {
    interface Context {
        params: any;
        render(viewName: string): void;
    }
}