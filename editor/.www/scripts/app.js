define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by pbalaga on 7/26/16.
     */
    var A = (function () {
        function A() {
        }
        A.prototype.f = function () {
            console.log('test');
        };
        return A;
    }());
    exports.A = A;
});
