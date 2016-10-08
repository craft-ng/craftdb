define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by pbalaga on 9/4/16.
     */
    var Sub = (function () {
        function Sub() {
        }
        Sub.prototype.f = function () {
            console.log('sub');
        };
        return Sub;
    }());
    exports.Sub = Sub;
});

//# sourceMappingURL=sub.js.map
