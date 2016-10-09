declare module "system" {

    interface System {
        import(moduleName: string): Promise<any>;
        import<TModule>(moduleName: string): Promise<TModule>;
    }
}