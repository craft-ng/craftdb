System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "scripts/client/main-bundle.js": [
      "scripts/client/app.js",
      "scripts/common/common.js",
      "scripts/client/a.js",
      "npm:jquery@3.1.0.js",
      "npm:jquery@3.1.0/dist/jquery.js"
    ]
  },

  map: {
    "jquery": "npm:jquery@3.1.0"
  }
});
