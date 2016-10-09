declare namespace SystemImport{

    interface System {
        import(moduleName: string): Promise<any>;
        import<TModule>(moduleName: string): Promise<TModule>;
    }
}


declare var System: SystemImport.System;

declare module "system" {

    import systemImport = SystemImport;
    let system: systemImport.System;
    export = system;
}