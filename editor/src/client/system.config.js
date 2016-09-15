System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "../jspm_packages/npm/*"
  },

  map: {
    "jquery": "npm:jquery@3.1.0"
  }
});
