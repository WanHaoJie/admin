"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

var _animate = _interopRequireDefault(require("animate.css"));

var _index2 = _interopRequireDefault(require("./utils/http/index.js"));

require("./utils/filters/statusFormat.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入element ui
_vue["default"].use(_elementUi["default"]); //引入animate.css


_vue["default"].use(_animate["default"]); //引入封装的axios


_vue["default"].prototype.$http = _index2["default"]; //引入全局过滤器

// import 'sass';
_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');