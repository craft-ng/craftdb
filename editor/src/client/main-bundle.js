"bundle";
(function() {
var define = System.amdDefine;
define("scripts/client/a.js", ["require", "exports"], function(require, exports) {
  "use strict";
  var A = (function() {
    function A() {}
    A.prototype.f = function() {
      console.log('test');
    };
    return A;
  }());
  exports.A = A;
});

})();
(function() {
var define = System.amdDefine;
define("scripts/common/common.js", ["require", "exports"], function(require, exports) {
  "use strict";
  function pow(a, b) {
    return Math.pow(a, b);
  }
  exports.pow = pow;
});

})();
(function() {
var define = System.amdDefine;
define("scripts/client/app.js", ["require", "exports", "scripts/client/a.js", "scripts/common/common.js"], function(require, exports, a_1, common_1) {
  "use strict";
  new a_1.A().f();
  console.log(common_1.pow(2, 4));
});

})();
//# sourceMappingURL=main-bundle.js.map