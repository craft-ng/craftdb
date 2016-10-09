define(["require", "exports", "./a", "../common/common"], function (require, exports, a_1, common_1) {
    "use strict";
    new a_1.A().f();
    console.log(common_1.pow(2, 4));
    System.import('./sub').then(function (module) { return new module.Sub().f(); });
});

//# sourceMappingURL=app.js.map
