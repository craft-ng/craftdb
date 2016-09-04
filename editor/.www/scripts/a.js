define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by pbalaga on 9/4/16.
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

//# sourceMappingURL=../../.maps/client/a.js.map
