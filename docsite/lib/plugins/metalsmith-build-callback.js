var extend = require('extend');

module.exports = function (options) {
    function noop() {

    }

    var opts = extend({
        success: noop,
        error: noop
    }, options);

    return function (err) {
        if(err) opts.error(err);
        else opts.success();
    }
};