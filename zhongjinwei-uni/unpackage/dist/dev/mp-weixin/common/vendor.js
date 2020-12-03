(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/utils/utils.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var utils = {};
utils.isTrueValidateCodeBy18IdCard = function (idCard) {
  if (idCard.length !== 18) {
    return;
  }
  var a_idCard = idCard.split("");
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0; // 声明加权求和变量
  if (a_idCard[17].toLowerCase() == "x") {
    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]; // 加权求和
  }
  var valCodePosition = sum % 11; // 得到验证码所位置
  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
};

utils.digitalConversion = function (num) {
  var num1 = "";
  var num = (num || 0).toString(),
  result = "";
  if (num.indexOf(".") > -1) {
    num1 = num.split(".")[1];
    num = num.split(".")[0];
  }
  while (num.length > 3) {
    result = "," + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  if (num1 != "") {
    console.log();
    if (num1.length == 1) {
      num1 += '0';
    }
    return result + "." + num1;
  } else {
    return result + '.00';
  }
};var _default =

utils;exports.default = _default;

/***/ }),

/***/ 171:
/*!*******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/pages/common/city.data.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "text": "北京市",
  "value": "1",
  "children": [{
    "text": "北京市",
    "value": "2",
    "children": [{
      "text": "东城区",
      "value": "3111" },

    {
      "text": "西城区",
      "value": "2",
      "children": [{
        "text": "西城区",
        "value": "3112" }] },


    {
      "text": "朝阳区",
      "value": "5",
      "children": [{
        "text": "朝阳区",
        "value": "3113" }] },


    {
      "text": "丰台区",
      "value": "6",
      "children": [{
        "text": "丰台区",
        "value": "3114" }] },


    {
      "text": "石景山区",
      "value": "7",
      "children": [{
        "text": "石景山区",
        "value": "3115" }] },


    {
      "text": "海淀区",
      "value": "8",
      "children": [{
        "text": "海淀区",
        "value": "3116" }] },


    {
      "text": "门头沟区",
      "value": "9",
      "children": [{
        "text": "门头沟区",
        "value": "3117" }] },


    {
      "text": "房山区",
      "value": "10",
      "children": [{
        "text": "房山区",
        "value": "3118" }] },


    {
      "text": "通州区",
      "value": "11",
      "children": [{
        "text": "通州区",
        "value": "3119" }] },


    {
      "text": "顺义区",
      "value": "12",
      "children": [{
        "text": "顺义区",
        "value": "3120" }] },


    {
      "text": "昌平区",
      "value": "13",
      "children": [{
        "text": "昌平区",
        "value": "3121" }] },


    {
      "text": "大兴区",
      "value": "14",
      "children": [{
        "text": "大兴区",
        "value": "3122" }] },


    {
      "text": "怀柔区",
      "value": "15",
      "children": [{
        "text": "怀柔区",
        "value": "3123" }] },


    {
      "text": "平谷区",
      "value": "16",
      "children": [{
        "text": "平谷区",
        "value": "3124" }] },


    {
      "text": "密云县",
      "value": "17",
      "children": [{
        "text": "密云县",
        "value": "3125" }] },


    {
      "text": "延庆县",
      "value": "18",
      "children": [{
        "text": "延庆县",
        "value": "3126" }] }] }] },







{
  "text": "天津市",
  "value": "2",
  "children": [{
    "text": "天津市",
    "value": "19",
    "children": [{
      "text": "和平区",
      "value": "3127" },

    {
      "text": "河东区",
      "value": "20",
      "children": [{
        "text": "河东区",
        "value": "3128" }] },


    {
      "text": "河西区",
      "value": "21",
      "children": [{
        "text": "河西区",
        "value": "3129" }] },


    {
      "text": "南开区",
      "value": "22",
      "children": [{
        "text": "南开区",
        "value": "3130" }] },


    {
      "text": "河北区",
      "value": "23",
      "children": [{
        "text": "河北区",
        "value": "3131" }] },


    {
      "text": "红桥区",
      "value": "24",
      "children": [{
        "text": "红桥区",
        "value": "3132" }] },


    {
      "text": "东丽区",
      "value": "25",
      "children": [{
        "text": "东丽区",
        "value": "3133" }] },


    {
      "text": "西青区",
      "value": "26",
      "children": [{
        "text": "西青区",
        "value": "3134" }] },


    {
      "text": "津南区",
      "value": "27",
      "children": [{
        "text": "津南区",
        "value": "3135" }] },


    {
      "text": "北辰区",
      "value": "28",
      "children": [{
        "text": "北辰区",
        "value": "3136" }] },


    {
      "text": "武清区",
      "value": "29",
      "children": [{
        "text": "武清区",
        "value": "3137" }] },


    {
      "text": "宝坻区",
      "value": "30",
      "children": [{
        "text": "宝坻区",
        "value": "3138" }] },


    {
      "text": "滨海新区",
      "value": "31",
      "children": [{
        "text": "滨海新区",
        "value": "3139" }] },


    {
      "text": "宁河县",
      "value": "32",
      "children": [{
        "text": "宁河县",
        "value": "3140" }] },


    {
      "text": "静海县",
      "value": "33",
      "children": [{
        "text": "静海县",
        "value": "3141" }] },


    {
      "text": "蓟县",
      "value": "34",
      "children": [{
        "text": "蓟县",
        "value": "3142" }] }] }] },







{
  "text": "河北省",
  "value": "3",
  "children": [{
    "text": "石家庄市",
    "value": "35",
    "children": [{
      "text": "长安区",
      "value": "2" },

    {
      "text": "桥东区",
      "value": "3" },

    {
      "text": "桥西区",
      "value": "4" },

    {
      "text": "新华区",
      "value": "5" },

    {
      "text": "井陉矿区",
      "value": "6" },

    {
      "text": "裕华区",
      "value": "7" },

    {
      "text": "井陉县",
      "value": "8" },

    {
      "text": "正定县",
      "value": "9" },

    {
      "text": "栾城县",
      "value": "10" },

    {
      "text": "行唐县",
      "value": "11" },

    {
      "text": "灵寿县",
      "value": "12" },

    {
      "text": "高邑县",
      "value": "13" },

    {
      "text": "深泽县",
      "value": "14" },

    {
      "text": "赞皇县",
      "value": "15" },

    {
      "text": "无极县",
      "value": "16" },

    {
      "text": "平山县",
      "value": "17" },

    {
      "text": "元氏县",
      "value": "18" },

    {
      "text": "赵县",
      "value": "19" },

    {
      "text": "辛集市",
      "value": "20" },

    {
      "text": "藁城市",
      "value": "21" },

    {
      "text": "晋州市",
      "value": "22" },

    {
      "text": "新乐市",
      "value": "23" },

    {
      "text": "鹿泉市",
      "value": "24" }] },



  {
    "text": "唐山市",
    "value": "36",
    "children": [{
      "text": "路南区",
      "value": "26" },

    {
      "text": "路北区",
      "value": "27" },

    {
      "text": "古冶区",
      "value": "28" },

    {
      "text": "开平区",
      "value": "29" },

    {
      "text": "丰南区",
      "value": "30" },

    {
      "text": "丰润区",
      "value": "31" },

    {
      "text": "滦县",
      "value": "32" },

    {
      "text": "滦南县",
      "value": "33" },

    {
      "text": "乐亭县",
      "value": "34" },

    {
      "text": "迁西县",
      "value": "35" },

    {
      "text": "玉田县",
      "value": "36" },

    {
      "text": "唐海县",
      "value": "37" },

    {
      "text": "遵化市",
      "value": "38" },

    {
      "text": "迁安市",
      "value": "39" }] },



  {
    "text": "秦皇岛市",
    "value": "37",
    "children": [{
      "text": "海港区",
      "value": "41" },

    {
      "text": "山海关区",
      "value": "42" },

    {
      "text": "北戴河区",
      "value": "43" },

    {
      "text": "青龙满族自治县",
      "value": "44" },

    {
      "text": "昌黎县",
      "value": "45" },

    {
      "text": "抚宁县",
      "value": "46" },

    {
      "text": "卢龙县",
      "value": "47" }] },



  {
    "text": "邯郸市",
    "value": "38",
    "children": [{
      "text": "邯山区",
      "value": "49" },

    {
      "text": "丛台区",
      "value": "50" },

    {
      "text": "复兴区",
      "value": "51" },

    {
      "text": "峰峰矿区",
      "value": "52" },

    {
      "text": "邯郸县",
      "value": "53" },

    {
      "text": "临漳县",
      "value": "54" },

    {
      "text": "成安县",
      "value": "55" },

    {
      "text": "大名县",
      "value": "56" },

    {
      "text": "涉县",
      "value": "57" },

    {
      "text": "磁县",
      "value": "58" },

    {
      "text": "肥乡县",
      "value": "59" },

    {
      "text": "永年县",
      "value": "60" },

    {
      "text": "邱县",
      "value": "61" },

    {
      "text": "鸡泽县",
      "value": "62" },

    {
      "text": "广平县",
      "value": "63" },

    {
      "text": "馆陶县",
      "value": "64" },

    {
      "text": "魏县",
      "value": "65" },

    {
      "text": "曲周县",
      "value": "66" },

    {
      "text": "武安市",
      "value": "67" }] },



  {
    "text": "邢台市",
    "value": "39",
    "children": [{
      "text": "桥东区",
      "value": "69" },

    {
      "text": "桥西区",
      "value": "70" },

    {
      "text": "邢台县",
      "value": "71" },

    {
      "text": "临城县",
      "value": "72" },

    {
      "text": "内丘县",
      "value": "73" },

    {
      "text": "柏乡县",
      "value": "74" },

    {
      "text": "隆尧县",
      "value": "75" },

    {
      "text": "任县",
      "value": "76" },

    {
      "text": "南和县",
      "value": "77" },

    {
      "text": "宁晋县",
      "value": "78" },

    {
      "text": "巨鹿县",
      "value": "79" },

    {
      "text": "新河县",
      "value": "80" },

    {
      "text": "广宗县",
      "value": "81" },

    {
      "text": "平乡县",
      "value": "82" },

    {
      "text": "威县",
      "value": "83" },

    {
      "text": "清河县",
      "value": "84" },

    {
      "text": "临西县",
      "value": "85" },

    {
      "text": "南宫市",
      "value": "86" },

    {
      "text": "沙河市",
      "value": "87" }] },



  {
    "text": "保定市",
    "value": "40",
    "children": [{
      "text": "新市区",
      "value": "89" },

    {
      "text": "北市区",
      "value": "90" },

    {
      "text": "南市区",
      "value": "91" },

    {
      "text": "满城县",
      "value": "92" },

    {
      "text": "清苑县",
      "value": "93" },

    {
      "text": "涞水县",
      "value": "94" },

    {
      "text": "阜平县",
      "value": "95" },

    {
      "text": "徐水县",
      "value": "96" },

    {
      "text": "定兴县",
      "value": "97" },

    {
      "text": "唐县",
      "value": "98" },

    {
      "text": "高阳县",
      "value": "99" },

    {
      "text": "容城县",
      "value": "100" },

    {
      "text": "涞源县",
      "value": "101" },

    {
      "text": "望都县",
      "value": "102" },

    {
      "text": "安新县",
      "value": "103" },

    {
      "text": "易县",
      "value": "104" },

    {
      "text": "曲阳县",
      "value": "105" },

    {
      "text": "蠡县",
      "value": "106" },

    {
      "text": "顺平县",
      "value": "107" },

    {
      "text": "博野县",
      "value": "108" },

    {
      "text": "雄县",
      "value": "109" },

    {
      "text": "涿州市",
      "value": "110" },

    {
      "text": "定州市",
      "value": "111" },

    {
      "text": "安国市",
      "value": "112" },

    {
      "text": "高碑店市",
      "value": "113" }] },



  {
    "text": "张家口市",
    "value": "41",
    "children": [{
      "text": "桥东区",
      "value": "115" },

    {
      "text": "桥西区",
      "value": "116" },

    {
      "text": "宣化区",
      "value": "117" },

    {
      "text": "下花园区",
      "value": "118" },

    {
      "text": "宣化县",
      "value": "119" },

    {
      "text": "张北县",
      "value": "120" },

    {
      "text": "康保县",
      "value": "121" },

    {
      "text": "沽源县",
      "value": "122" },

    {
      "text": "尚义县",
      "value": "123" },

    {
      "text": "蔚县",
      "value": "124" },

    {
      "text": "怀安县",
      "value": "126" },

    {
      "text": "万全县",
      "value": "127" },

    {
      "text": "怀来县",
      "value": "128" },

    {
      "text": "赤城县",
      "value": "130" },

    {
      "text": "崇礼县",
      "value": "131" },

    {
      "text": "阳原县",
      "value": "125" },

    {
      "text": "涿鹿县",
      "value": "129" }] },



  {
    "text": "承德市",
    "value": "42",
    "children": [{
      "text": "双桥区",
      "value": "133" },

    {
      "text": "鹰手营子矿区",
      "value": "135" },

    {
      "text": "承德县",
      "value": "136" },

    {
      "text": "兴隆县",
      "value": "137" },

    {
      "text": "滦平县",
      "value": "139" },

    {
      "text": "隆化县",
      "value": "140" },

    {
      "text": "丰宁满族自治县",
      "value": "141" },

    {
      "text": "宽城满族自治县",
      "value": "142" },

    {
      "text": "双滦区",
      "value": "134" },

    {
      "text": "平泉县",
      "value": "138" },

    {
      "text": "围场满族蒙古族自治县",
      "value": "143" }] },



  {
    "text": "沧州市",
    "value": "43",
    "children": [{
      "text": "新华区",
      "value": "145" },

    {
      "text": "运河区",
      "value": "146" },

    {
      "text": "沧县",
      "value": "147" },

    {
      "text": "青县",
      "value": "148" },

    {
      "text": "东光县",
      "value": "149" },

    {
      "text": "海兴县",
      "value": "150" },

    {
      "text": "肃宁县",
      "value": "152" },

    {
      "text": "南皮县",
      "value": "153" },

    {
      "text": "吴桥县",
      "value": "154" },

    {
      "text": "孟村回族自治县",
      "value": "156" },

    {
      "text": "泊头市",
      "value": "157" },

    {
      "text": "任丘市",
      "value": "158" },

    {
      "text": "河间市",
      "value": "160" },

    {
      "text": "盐山县",
      "value": "151" },

    {
      "text": "献县",
      "value": "155" },

    {
      "text": "黄骅市",
      "value": "159" }] },



  {
    "text": "廊坊市",
    "value": "44",
    "children": [{
      "text": "安次区",
      "value": "162" },

    {
      "text": "广阳区",
      "value": "163" },

    {
      "text": "永清县",
      "value": "165" },

    {
      "text": "香河县",
      "value": "166" },

    {
      "text": "大城县",
      "value": "167" },

    {
      "text": "文安县",
      "value": "168" },

    {
      "text": "霸州市",
      "value": "170" },

    {
      "text": "三河市",
      "value": "171" },

    {
      "text": "固安县",
      "value": "164" },

    {
      "text": "大厂回族自治县",
      "value": "169" }] },



  {
    "text": "衡水市",
    "value": "45",
    "children": [{
      "text": "桃城区",
      "value": "173" },

    {
      "text": "枣强县",
      "value": "174" },

    {
      "text": "武邑县",
      "value": "175" },

    {
      "text": "饶阳县",
      "value": "177" },

    {
      "text": "安平县",
      "value": "178" },

    {
      "text": "故城县",
      "value": "179" },

    {
      "text": "阜城县",
      "value": "181" },

    {
      "text": "冀州市",
      "value": "182" },

    {
      "text": "深州市",
      "value": "183" },

    {
      "text": "武强县",
      "value": "176" },

    {
      "text": "景县",
      "value": "180" }] }] },





{
  "text": "山西省",
  "value": "4",
  "children": [{
    "text": "晋城市",
    "value": "50",
    "children": [{
      "text": "泽州县",
      "value": "232" },

    {
      "text": "高平市",
      "value": "233" },

    {
      "text": "城区",
      "value": "228" },

    {
      "text": "沁水县",
      "value": "229" },

    {
      "text": "阳城县",
      "value": "230" },

    {
      "text": "陵川县",
      "value": "231" }] },



  {
    "text": "朔州市",
    "value": "51",
    "children": [{
      "text": "朔城区",
      "value": "235" },

    {
      "text": "平鲁区",
      "value": "236" },

    {
      "text": "山阴县",
      "value": "237" },

    {
      "text": "应县",
      "value": "238" },

    {
      "text": "右玉县",
      "value": "239" },

    {
      "text": "怀仁县",
      "value": "240" }] },



  {
    "text": "晋中市",
    "value": "52",
    "children": [{
      "text": "榆次区",
      "value": "242" },

    {
      "text": "榆社县",
      "value": "243" },

    {
      "text": "左权县",
      "value": "244" },

    {
      "text": "和顺县",
      "value": "245" },

    {
      "text": "昔阳县",
      "value": "246" },

    {
      "text": "寿阳县",
      "value": "247" },

    {
      "text": "太谷县",
      "value": "248" },

    {
      "text": "祁县",
      "value": "249" },

    {
      "text": "平遥县",
      "value": "250" },

    {
      "text": "灵石县",
      "value": "251" },

    {
      "text": "介休市",
      "value": "252" }] },



  {
    "text": "运城市",
    "value": "53",
    "children": [{
      "text": "盐湖区",
      "value": "254" },

    {
      "text": "临猗县",
      "value": "255" },

    {
      "text": "万荣县",
      "value": "256" },

    {
      "text": "闻喜县",
      "value": "257" },

    {
      "text": "稷山县",
      "value": "258" },

    {
      "text": "新绛县",
      "value": "259" },

    {
      "text": "绛县",
      "value": "260" },

    {
      "text": "垣曲县",
      "value": "261" },

    {
      "text": "夏县",
      "value": "262" },

    {
      "text": "平陆县",
      "value": "263" },

    {
      "text": "芮城县",
      "value": "264" },

    {
      "text": "永济市",
      "value": "265" },

    {
      "text": "河津市",
      "value": "266" }] },



  {
    "text": "忻州市",
    "value": "54",
    "children": [{
      "text": "忻府区",
      "value": "268" },

    {
      "text": "定襄县",
      "value": "269" },

    {
      "text": "五台县",
      "value": "270" },

    {
      "text": "代县",
      "value": "271" },

    {
      "text": "繁峙县",
      "value": "272" },

    {
      "text": "宁武县",
      "value": "273" },

    {
      "text": "静乐县",
      "value": "274" },

    {
      "text": "神池县",
      "value": "275" },

    {
      "text": "五寨县",
      "value": "276" },

    {
      "text": "岢岚县",
      "value": "277" },

    {
      "text": "河曲县",
      "value": "278" },

    {
      "text": "保德县",
      "value": "279" },

    {
      "text": "偏关县",
      "value": "280" },

    {
      "text": "原平市",
      "value": "281" }] },



  {
    "text": "临汾市",
    "value": "55",
    "children": [{
      "text": "尧都区",
      "value": "283" },

    {
      "text": "曲沃县",
      "value": "284" },

    {
      "text": "翼城县",
      "value": "285" },

    {
      "text": "襄汾县",
      "value": "286" },

    {
      "text": "洪洞县",
      "value": "287" },

    {
      "text": "古县",
      "value": "288" },

    {
      "text": "安泽县",
      "value": "289" },

    {
      "text": "浮山县",
      "value": "290" },

    {
      "text": "吉县",
      "value": "291" },

    {
      "text": "乡宁县",
      "value": "292" },

    {
      "text": "大宁县",
      "value": "293" },

    {
      "text": "隰县",
      "value": "294" },

    {
      "text": "永和县",
      "value": "295" },

    {
      "text": "蒲县",
      "value": "296" },

    {
      "text": "汾西县",
      "value": "297" },

    {
      "text": "侯马市",
      "value": "298" },

    {
      "text": "霍州市",
      "value": "299" }] },



  {
    "text": "吕梁市",
    "value": "56",
    "children": [{
      "text": "离石区",
      "value": "301" },

    {
      "text": "文水县",
      "value": "302" },

    {
      "text": "交城县",
      "value": "303" },

    {
      "text": "兴县",
      "value": "304" },

    {
      "text": "临县",
      "value": "305" },

    {
      "text": "柳林县",
      "value": "306" },

    {
      "text": "石楼县",
      "value": "307" },

    {
      "text": "岚县",
      "value": "308" },

    {
      "text": "方山县",
      "value": "309" },

    {
      "text": "中阳县",
      "value": "310" },

    {
      "text": "交口县",
      "value": "311" },

    {
      "text": "孝义市",
      "value": "312" },

    {
      "text": "汾阳市",
      "value": "313" }] },



  {
    "text": "太原市",
    "value": "46",
    "children": [{
      "text": "迎泽区",
      "value": "186" },

    {
      "text": "杏花岭区",
      "value": "187" },

    {
      "text": "尖草坪区",
      "value": "188" },

    {
      "text": "晋源区",
      "value": "190" },

    {
      "text": "清徐县",
      "value": "191" },

    {
      "text": "阳曲县",
      "value": "192" },

    {
      "text": "娄烦县",
      "value": "193" },

    {
      "text": "小店区",
      "value": "185" },

    {
      "text": "万柏林区",
      "value": "189" },

    {
      "text": "古交市",
      "value": "194" }] },



  {
    "text": "大同市",
    "value": "47",
    "children": [{
      "text": "城区",
      "value": "196" },

    {
      "text": "矿区",
      "value": "197" },

    {
      "text": "南郊区",
      "value": "198" },

    {
      "text": "阳高县",
      "value": "200" },

    {
      "text": "天镇县",
      "value": "201" },

    {
      "text": "广灵县",
      "value": "202" },

    {
      "text": "浑源县",
      "value": "204" },

    {
      "text": "左云县",
      "value": "205" },

    {
      "text": "大同县",
      "value": "206" },

    {
      "text": "新荣区",
      "value": "199" },

    {
      "text": "灵丘县",
      "value": "203" }] },



  {
    "text": "阳泉市",
    "value": "48",
    "children": [{
      "text": "城区",
      "value": "208" },

    {
      "text": "郊区",
      "value": "210" },

    {
      "text": "平定县",
      "value": "211" },

    {
      "text": "盂县",
      "value": "212" },

    {
      "text": "矿区",
      "value": "209" }] },



  {
    "text": "长治市",
    "value": "49",
    "children": [{
      "text": "郊区",
      "value": "215" },

    {
      "text": "长治县",
      "value": "216" },

    {
      "text": "屯留县",
      "value": "218" },

    {
      "text": "平顺县",
      "value": "219" },

    {
      "text": "黎城县",
      "value": "220" },

    {
      "text": "壶关县",
      "value": "221" },

    {
      "text": "武乡县",
      "value": "223" },

    {
      "text": "沁县",
      "value": "224" },

    {
      "text": "沁源县",
      "value": "225" },

    {
      "text": "城区",
      "value": "214" },

    {
      "text": "襄垣县",
      "value": "217" },

    {
      "text": "长子县",
      "value": "222" },

    {
      "text": "潞城市",
      "value": "226" }] }] },





{
  "text": "内蒙古自治区",
  "value": "5",
  "children": [{
    "text": "呼和浩特市",
    "value": "57",
    "children": [{
      "text": "新城区",
      "value": "315" },

    {
      "text": "回民区",
      "value": "316" },

    {
      "text": "玉泉区",
      "value": "317" },

    {
      "text": "赛罕区",
      "value": "318" },

    {
      "text": "土默特左旗",
      "value": "319" },

    {
      "text": "托克托县",
      "value": "320" },

    {
      "text": "和林格尔县",
      "value": "321" },

    {
      "text": "清水河县",
      "value": "322" },

    {
      "text": "武川县",
      "value": "323" }] },



  {
    "text": "包头市",
    "value": "58",
    "children": [{
      "text": "东河区",
      "value": "325" },

    {
      "text": "昆都仑区",
      "value": "326" },

    {
      "text": "青山区",
      "value": "327" },

    {
      "text": "石拐区",
      "value": "328" },

    {
      "text": "白云鄂博矿区",
      "value": "329" },

    {
      "text": "九原区",
      "value": "330" },

    {
      "text": "土默特右旗",
      "value": "331" },

    {
      "text": "固阳县",
      "value": "332" },

    {
      "text": "达尔罕茂明安联合旗",
      "value": "333" }] },



  {
    "text": "乌海市",
    "value": "59",
    "children": [{
      "text": "海勃湾区",
      "value": "335" },

    {
      "text": "海南区",
      "value": "336" },

    {
      "text": "乌达区",
      "value": "337" }] },



  {
    "text": "赤峰市",
    "value": "60",
    "children": [{
      "text": "红山区",
      "value": "339" },

    {
      "text": "元宝山区",
      "value": "340" },

    {
      "text": "松山区",
      "value": "341" },

    {
      "text": "阿鲁科尔沁旗",
      "value": "342" },

    {
      "text": "巴林左旗",
      "value": "343" },

    {
      "text": "巴林右旗",
      "value": "344" },

    {
      "text": "林西县",
      "value": "345" },

    {
      "text": "克什克腾旗",
      "value": "346" },

    {
      "text": "翁牛特旗",
      "value": "347" },

    {
      "text": "喀喇沁旗",
      "value": "348" },

    {
      "text": "宁城县",
      "value": "349" },

    {
      "text": "敖汉旗",
      "value": "350" }] },



  {
    "text": "通辽市",
    "value": "61",
    "children": [{
      "text": "科尔沁区",
      "value": "352" },

    {
      "text": "科尔沁左翼中旗",
      "value": "353" },

    {
      "text": "科尔沁左翼后旗",
      "value": "354" },

    {
      "text": "开鲁县",
      "value": "355" },

    {
      "text": "库伦旗",
      "value": "356" },

    {
      "text": "奈曼旗",
      "value": "357" },

    {
      "text": "扎鲁特旗",
      "value": "358" },

    {
      "text": "霍林郭勒市",
      "value": "359" }] },



  {
    "text": "鄂尔多斯市",
    "value": "62",
    "children": [{
      "text": "达拉特旗",
      "value": "362" },

    {
      "text": "准格尔旗",
      "value": "363" },

    {
      "text": "鄂托克前旗",
      "value": "364" },

    {
      "text": "鄂托克旗",
      "value": "365" },

    {
      "text": "乌审旗",
      "value": "367" },

    {
      "text": "伊金霍洛旗",
      "value": "368" },

    {
      "text": "东胜区",
      "value": "361" },

    {
      "text": "杭锦旗",
      "value": "366" }] },



  {
    "text": "呼伦贝尔市",
    "value": "63",
    "children": [{
      "text": "海拉尔区",
      "value": "370" },

    {
      "text": "莫力达瓦达斡尔族自治旗",
      "value": "372" },

    {
      "text": "鄂伦春自治旗",
      "value": "373" },

    {
      "text": "鄂温克族自治旗",
      "value": "374" },

    {
      "text": "新巴尔虎左旗",
      "value": "376" },

    {
      "text": "新巴尔虎右旗",
      "value": "377" },

    {
      "text": "满洲里市",
      "value": "378" },

    {
      "text": "牙克石市",
      "value": "379" },

    {
      "text": "额尔古纳市",
      "value": "381" },

    {
      "text": "根河市",
      "value": "382" },

    {
      "text": "阿荣旗",
      "value": "371" },

    {
      "text": "陈巴尔虎旗",
      "value": "375" },

    {
      "text": "扎兰屯市",
      "value": "380" }] },



  {
    "text": "巴彦淖尔市",
    "value": "64",
    "children": [{
      "text": "临河区",
      "value": "384" },

    {
      "text": "五原县",
      "value": "385" },

    {
      "text": "乌拉特前旗",
      "value": "387" },

    {
      "text": "乌拉特中旗",
      "value": "388" },

    {
      "text": "乌拉特后旗",
      "value": "389" },

    {
      "text": "磴口县",
      "value": "386" },

    {
      "text": "杭锦后旗",
      "value": "390" }] },



  {
    "text": "乌兰察布市",
    "value": "65",
    "children": [{
      "text": "集宁区",
      "value": "392" },

    {
      "text": "卓资县",
      "value": "393" },

    {
      "text": "化德县",
      "value": "394" },

    {
      "text": "商都县",
      "value": "395" },

    {
      "text": "凉城县",
      "value": "397" },

    {
      "text": "察哈尔右翼前旗",
      "value": "398" },

    {
      "text": "察哈尔右翼中旗",
      "value": "399" },

    {
      "text": "四子王旗",
      "value": "401" },

    {
      "text": "丰镇市",
      "value": "402" },

    {
      "text": "兴和县",
      "value": "396" },

    {
      "text": "察哈尔右翼后旗",
      "value": "400" }] },



  {
    "text": "兴安盟",
    "value": "66",
    "children": [{
      "text": "乌兰浩特市",
      "value": "403" },

    {
      "text": "阿尔山市",
      "value": "404" },

    {
      "text": "科尔沁右翼前旗",
      "value": "405" },

    {
      "text": "扎赉特旗",
      "value": "407" },

    {
      "text": "突泉县",
      "value": "408" },

    {
      "text": "科尔沁右翼中旗",
      "value": "406" }] },



  {
    "text": "锡林郭勒盟",
    "value": "67",
    "children": [{
      "text": "二连浩特市",
      "value": "409" },

    {
      "text": "锡林浩特市",
      "value": "410" },

    {
      "text": "阿巴嘎旗",
      "value": "411" },

    {
      "text": "苏尼特右旗",
      "value": "413" },

    {
      "text": "东乌珠穆沁旗",
      "value": "414" },

    {
      "text": "西乌珠穆沁旗",
      "value": "415" },

    {
      "text": "太仆寺旗",
      "value": "416" },

    {
      "text": "正镶白旗",
      "value": "418" },

    {
      "text": "正蓝旗",
      "value": "419" },

    {
      "text": "多伦县",
      "value": "420" },

    {
      "text": "苏尼特左旗",
      "value": "412" },

    {
      "text": "镶黄旗",
      "value": "417" }] },



  {
    "text": "阿拉善盟",
    "value": "68",
    "children": [{
      "text": "阿拉善左旗",
      "value": "421" },

    {
      "text": "额济纳旗",
      "value": "423" },

    {
      "text": "阿拉善右旗",
      "value": "422" }] }] },





{
  "text": "辽宁省",
  "value": "6",
  "children": [{
    "text": "沈阳市",
    "value": "69",
    "children": [{
      "text": "和平区",
      "value": "425" },

    {
      "text": "沈河区",
      "value": "426" },

    {
      "text": "大东区",
      "value": "427" },

    {
      "text": "铁西区",
      "value": "429" },

    {
      "text": "苏家屯区",
      "value": "430" },

    {
      "text": "东陵区",
      "value": "431" },

    {
      "text": "于洪区",
      "value": "433" },

    {
      "text": "辽中县",
      "value": "434" },

    {
      "text": "康平县",
      "value": "435" },

    {
      "text": "法库县",
      "value": "436" },

    {
      "text": "皇姑区",
      "value": "428" },

    {
      "text": "沈北新区",
      "value": "432" },

    {
      "text": "新民市",
      "value": "437" }] },



  {
    "text": "大连市",
    "value": "70",
    "children": [{
      "text": "中山区",
      "value": "439" },

    {
      "text": "西岗区",
      "value": "440" },

    {
      "text": "沙河口区",
      "value": "441" },

    {
      "text": "旅顺口区",
      "value": "443" },

    {
      "text": "金州区",
      "value": "444" },

    {
      "text": "长海县",
      "value": "445" },

    {
      "text": "瓦房店市",
      "value": "446" },

    {
      "text": "庄河市",
      "value": "448" },

    {
      "text": "甘井子区",
      "value": "442" },

    {
      "text": "普兰店市",
      "value": "447" }] },



  {
    "text": "鞍山市",
    "value": "71",
    "children": [{
      "text": "铁东区",
      "value": "450" },

    {
      "text": "铁西区",
      "value": "451" },

    {
      "text": "立山区",
      "value": "452" },

    {
      "text": "千山区",
      "value": "453" },

    {
      "text": "台安县",
      "value": "454" },

    {
      "text": "岫岩满族自治县",
      "value": "455" },

    {
      "text": "海城市",
      "value": "456" }] },



  {
    "text": "抚顺市",
    "value": "72",
    "children": [{
      "text": "新抚区",
      "value": "458" },

    {
      "text": "东洲区",
      "value": "459" },

    {
      "text": "望花区",
      "value": "460" },

    {
      "text": "顺城区",
      "value": "461" },

    {
      "text": "抚顺县",
      "value": "462" },

    {
      "text": "新宾满族自治县",
      "value": "463" },

    {
      "text": "清原满族自治县",
      "value": "464" }] },



  {
    "text": "本溪市",
    "value": "73",
    "children": [{
      "text": "平山区",
      "value": "466" },

    {
      "text": "溪湖区",
      "value": "467" },

    {
      "text": "明山区",
      "value": "468" },

    {
      "text": "南芬区",
      "value": "469" },

    {
      "text": "本溪满族自治县",
      "value": "470" },

    {
      "text": "桓仁满族自治县",
      "value": "471" }] },



  {
    "text": "丹东市",
    "value": "74",
    "children": [{
      "text": "元宝区",
      "value": "473" },

    {
      "text": "振兴区",
      "value": "474" },

    {
      "text": "振安区",
      "value": "475" },

    {
      "text": "宽甸满族自治县",
      "value": "476" },

    {
      "text": "东港市",
      "value": "477" },

    {
      "text": "凤城市",
      "value": "478" }] },



  {
    "text": "锦州市",
    "value": "75",
    "children": [{
      "text": "古塔区",
      "value": "480" },

    {
      "text": "凌河区",
      "value": "481" },

    {
      "text": "太和区",
      "value": "482" },

    {
      "text": "黑山县",
      "value": "483" },

    {
      "text": "义县",
      "value": "484" },

    {
      "text": "凌海市",
      "value": "485" },

    {
      "text": "北镇市",
      "value": "486" }] },



  {
    "text": "营口市",
    "value": "76",
    "children": [{
      "text": "站前区",
      "value": "488" },

    {
      "text": "西市区",
      "value": "489" },

    {
      "text": "鲅鱼圈区",
      "value": "490" },

    {
      "text": "老边区",
      "value": "491" },

    {
      "text": "盖州市",
      "value": "492" },

    {
      "text": "大石桥市",
      "value": "493" }] },



  {
    "text": "阜新市",
    "value": "77",
    "children": [{
      "text": "海州区",
      "value": "495" },

    {
      "text": "新邱区",
      "value": "496" },

    {
      "text": "太平区",
      "value": "497" },

    {
      "text": "清河门区",
      "value": "498" },

    {
      "text": "细河区",
      "value": "499" },

    {
      "text": "阜新蒙古族自治县",
      "value": "500" },

    {
      "text": "彰武县",
      "value": "501" }] },



  {
    "text": "辽阳市",
    "value": "78",
    "children": [{
      "text": "白塔区",
      "value": "503" },

    {
      "text": "文圣区",
      "value": "504" },

    {
      "text": "宏伟区",
      "value": "505" },

    {
      "text": "弓长岭区",
      "value": "506" },

    {
      "text": "太子河区",
      "value": "507" },

    {
      "text": "辽阳县",
      "value": "508" },

    {
      "text": "灯塔市",
      "value": "509" }] },



  {
    "text": "盘锦市",
    "value": "79",
    "children": [{
      "text": "双台子区",
      "value": "511" },

    {
      "text": "兴隆台区",
      "value": "512" },

    {
      "text": "大洼县",
      "value": "513" },

    {
      "text": "盘山县",
      "value": "514" }] },



  {
    "text": "铁岭市",
    "value": "80",
    "children": [{
      "text": "银州区",
      "value": "516" },

    {
      "text": "清河区",
      "value": "517" },

    {
      "text": "铁岭县",
      "value": "518" },

    {
      "text": "西丰县",
      "value": "519" },

    {
      "text": "昌图县",
      "value": "520" },

    {
      "text": "调兵山市",
      "value": "521" },

    {
      "text": "开原市",
      "value": "522" }] },



  {
    "text": "朝阳市",
    "value": "81",
    "children": [{
      "text": "双塔区",
      "value": "524" },

    {
      "text": "龙城区",
      "value": "525" },

    {
      "text": "朝阳县",
      "value": "526" },

    {
      "text": "建平县",
      "value": "527" },

    {
      "text": "喀喇沁左翼蒙古族自治县",
      "value": "528" },

    {
      "text": "北票市",
      "value": "529" },

    {
      "text": "凌源市",
      "value": "530" }] },



  {
    "text": "葫芦岛市",
    "value": "82",
    "children": [{
      "text": "连山区",
      "value": "532" },

    {
      "text": "龙港区",
      "value": "533" },

    {
      "text": "南票区",
      "value": "534" },

    {
      "text": "绥中县",
      "value": "535" },

    {
      "text": "建昌县",
      "value": "536" },

    {
      "text": "兴城市",
      "value": "537" }] }] },





{
  "text": "吉林省",
  "value": "7",
  "children": [{
    "text": "长春市",
    "value": "83",
    "children": [{
      "text": "南关区",
      "value": "539" },

    {
      "text": "宽城区",
      "value": "540" },

    {
      "text": "朝阳区",
      "value": "541" },

    {
      "text": "二道区",
      "value": "542" },

    {
      "text": "绿园区",
      "value": "543" },

    {
      "text": "双阳区",
      "value": "544" },

    {
      "text": "农安县",
      "value": "545" },

    {
      "text": "九台市",
      "value": "546" },

    {
      "text": "榆树市",
      "value": "547" },

    {
      "text": "德惠市",
      "value": "548" }] },



  {
    "text": "吉林市",
    "value": "84",
    "children": [{
      "text": "昌邑区",
      "value": "550" },

    {
      "text": "龙潭区",
      "value": "551" },

    {
      "text": "船营区",
      "value": "552" },

    {
      "text": "丰满区",
      "value": "553" },

    {
      "text": "永吉县",
      "value": "554" },

    {
      "text": "蛟河市",
      "value": "555" },

    {
      "text": "桦甸市",
      "value": "556" },

    {
      "text": "舒兰市",
      "value": "557" },

    {
      "text": "磐石市",
      "value": "558" }] },



  {
    "text": "四平市",
    "value": "85",
    "children": [{
      "text": "铁西区",
      "value": "560" },

    {
      "text": "铁东区",
      "value": "561" },

    {
      "text": "梨树县",
      "value": "562" },

    {
      "text": "伊通满族自治县",
      "value": "563" },

    {
      "text": "公主岭市",
      "value": "564" },

    {
      "text": "双辽市",
      "value": "565" }] },



  {
    "text": "辽源市",
    "value": "86",
    "children": [{
      "text": "龙山区",
      "value": "567" },

    {
      "text": "西安区",
      "value": "568" },

    {
      "text": "东丰县",
      "value": "569" },

    {
      "text": "东辽县",
      "value": "570" }] },



  {
    "text": "通化市",
    "value": "87",
    "children": [{
      "text": "东昌区",
      "value": "572" },

    {
      "text": "二道江区",
      "value": "573" },

    {
      "text": "通化县",
      "value": "574" },

    {
      "text": "辉南县",
      "value": "575" },

    {
      "text": "柳河县",
      "value": "576" },

    {
      "text": "梅河口市",
      "value": "577" },

    {
      "text": "集安市",
      "value": "578" }] },



  {
    "text": "白山市",
    "value": "88",
    "children": [{
      "text": "八道江区",
      "value": "580" },

    {
      "text": "江源区",
      "value": "581" },

    {
      "text": "靖宇县",
      "value": "583" },

    {
      "text": "长白朝鲜族自治县",
      "value": "584" },

    {
      "text": "临江市",
      "value": "585" },

    {
      "text": "抚松县",
      "value": "582" }] },



  {
    "text": "松原市",
    "value": "89",
    "children": [{
      "text": "前郭尔罗斯蒙古族自治县",
      "value": "588" },

    {
      "text": "长岭县",
      "value": "589" },

    {
      "text": "乾安县",
      "value": "590" },

    {
      "text": "扶余县",
      "value": "591" },

    {
      "text": "宁江区",
      "value": "587" }] },



  {
    "text": "白城市",
    "value": "90",
    "children": [{
      "text": "镇赉县",
      "value": "594" },

    {
      "text": "通榆县",
      "value": "595" },

    {
      "text": "洮南市",
      "value": "596" },

    {
      "text": "洮北区",
      "value": "593" },

    {
      "text": "大安市",
      "value": "597" }] },



  {
    "text": "延边朝鲜族自治州",
    "value": "91",
    "children": [{
      "text": "延吉市",
      "value": "598" },

    {
      "text": "图们市",
      "value": "599" },

    {
      "text": "敦化市",
      "value": "600" },

    {
      "text": "龙井市",
      "value": "602" },

    {
      "text": "和龙市",
      "value": "603" },

    {
      "text": "汪清县",
      "value": "604" },

    {
      "text": "安图县",
      "value": "605" },

    {
      "text": "珲春市",
      "value": "601" }] },



  {
    "text": "龙岩市",
    "value": "155",
    "children": [{
      "text": "新罗区",
      "value": "1183" },

    {
      "text": "长汀县",
      "value": "1184" },

    {
      "text": "永定县",
      "value": "1185" },

    {
      "text": "上杭县",
      "value": "1186" },

    {
      "text": "武平县",
      "value": "1187" },

    {
      "text": "连城县",
      "value": "1188" },

    {
      "text": "漳平市",
      "value": "1189" }] }] },





{
  "text": "黑龙江省",
  "value": "8",
  "children": [{
    "text": "哈尔滨市",
    "value": "92",
    "children": [{
      "text": "南岗区",
      "value": "608" },

    {
      "text": "道外区",
      "value": "609" },

    {
      "text": "平房区",
      "value": "610" },

    {
      "text": "香坊区",
      "value": "612" },

    {
      "text": "呼兰区",
      "value": "613" },

    {
      "text": "阿城区",
      "value": "614" },

    {
      "text": "方正县",
      "value": "616" },

    {
      "text": "宾县",
      "value": "617" },

    {
      "text": "巴彦县",
      "value": "618" },

    {
      "text": "通河县",
      "value": "620" },

    {
      "text": "延寿县",
      "value": "621" },

    {
      "text": "双城市",
      "value": "622" },

    {
      "text": "尚志市",
      "value": "623" },

    {
      "text": "道里区",
      "value": "607" },

    {
      "text": "松北区",
      "value": "611" },

    {
      "text": "依兰县",
      "value": "615" },

    {
      "text": "木兰县",
      "value": "619" },

    {
      "text": "五常市",
      "value": "624" }] },



  {
    "text": "齐齐哈尔市",
    "value": "93",
    "children": [{
      "text": "龙沙区",
      "value": "626" },

    {
      "text": "建华区",
      "value": "627" },

    {
      "text": "铁锋区",
      "value": "628" },

    {
      "text": "富拉尔基区",
      "value": "630" },

    {
      "text": "碾子山区",
      "value": "631" },

    {
      "text": "梅里斯达斡尔族区",
      "value": "632" },

    {
      "text": "龙江县",
      "value": "633" },

    {
      "text": "泰来县",
      "value": "635" },

    {
      "text": "甘南县",
      "value": "636" },

    {
      "text": "富裕县",
      "value": "637" },

    {
      "text": "克东县",
      "value": "639" },

    {
      "text": "拜泉县",
      "value": "640" },

    {
      "text": "讷河市",
      "value": "641" },

    {
      "text": "昂昂溪区",
      "value": "629" },

    {
      "text": "依安县",
      "value": "634" },

    {
      "text": "克山县",
      "value": "638" }] },



  {
    "text": "鸡西市",
    "value": "94",
    "children": [{
      "text": "恒山区",
      "value": "644" },

    {
      "text": "滴道区",
      "value": "645" },

    {
      "text": "梨树区",
      "value": "646" },

    {
      "text": "城子河区",
      "value": "647" },

    {
      "text": "鸡东县",
      "value": "649" },

    {
      "text": "虎林市",
      "value": "650" },

    {
      "text": "密山市",
      "value": "651" },

    {
      "text": "鸡冠区",
      "value": "643" },

    {
      "text": "麻山区",
      "value": "648" }] },



  {
    "text": "鹤岗市",
    "value": "95",
    "children": [{
      "text": "工农区",
      "value": "654" },

    {
      "text": "南山区",
      "value": "655" },

    {
      "text": "兴安区",
      "value": "656" },

    {
      "text": "兴山区",
      "value": "658" },

    {
      "text": "萝北县",
      "value": "659" },

    {
      "text": "绥滨县",
      "value": "660" },

    {
      "text": "向阳区",
      "value": "653" },

    {
      "text": "东山区",
      "value": "657" }] },



  {
    "text": "双鸭山市",
    "value": "96",
    "children": [{
      "text": "岭东区",
      "value": "663" },

    {
      "text": "四方台区",
      "value": "664" },

    {
      "text": "宝山区",
      "value": "665" },

    {
      "text": "集贤县",
      "value": "666" },

    {
      "text": "宝清县",
      "value": "668" },

    {
      "text": "饶河县",
      "value": "669" },

    {
      "text": "尖山区",
      "value": "662" },

    {
      "text": "友谊县",
      "value": "667" }] },



  {
    "text": "大庆市",
    "value": "97",
    "children": [{
      "text": "萨尔图区",
      "value": "671" },

    {
      "text": "让胡路区",
      "value": "673" },

    {
      "text": "红岗区",
      "value": "674" },

    {
      "text": "大同区",
      "value": "675" },

    {
      "text": "肇源县",
      "value": "677" },

    {
      "text": "林甸县",
      "value": "678" },

    {
      "text": "杜尔伯特蒙古族自治县",
      "value": "679" },

    {
      "text": "龙凤区",
      "value": "672" },

    {
      "text": "肇州县",
      "value": "676" }] },



  {
    "text": "伊春市",
    "value": "98",
    "children": [{
      "text": "翠峦区",
      "value": "685" },

    {
      "text": "新青区",
      "value": "686" },

    {
      "text": "美溪区",
      "value": "687" },

    {
      "text": "金山屯区",
      "value": "688" },

    {
      "text": "五营区",
      "value": "689" },

    {
      "text": "乌马河区",
      "value": "690" },

    {
      "text": "汤旺河区",
      "value": "691" },

    {
      "text": "带岭区",
      "value": "692" },

    {
      "text": "乌伊岭区",
      "value": "693" },

    {
      "text": "红星区",
      "value": "694" },

    {
      "text": "上甘岭区",
      "value": "695" },

    {
      "text": "嘉荫县",
      "value": "696" },

    {
      "text": "铁力市",
      "value": "697" },

    {
      "text": "伊春区",
      "value": "681" },

    {
      "text": "南岔区",
      "value": "682" },

    {
      "text": "友好区",
      "value": "683" },

    {
      "text": "西林区",
      "value": "684" }] },



  {
    "text": "佳木斯市",
    "value": "99",
    "children": [{
      "text": "向阳区",
      "value": "699" },

    {
      "text": "前进区",
      "value": "700" },

    {
      "text": "东风区",
      "value": "701" },

    {
      "text": "郊区",
      "value": "702" },

    {
      "text": "桦南县",
      "value": "703" },

    {
      "text": "桦川县",
      "value": "704" },

    {
      "text": "汤原县",
      "value": "705" },

    {
      "text": "抚远县",
      "value": "706" },

    {
      "text": "同江市",
      "value": "707" },

    {
      "text": "富锦市",
      "value": "708" }] },



  {
    "text": "七台河市",
    "value": "100",
    "children": [{
      "text": "新兴区",
      "value": "710" },

    {
      "text": "桃山区",
      "value": "711" },

    {
      "text": "茄子河区",
      "value": "712" },

    {
      "text": "勃利县",
      "value": "713" }] },



  {
    "text": "牡丹江市",
    "value": "101",
    "children": [{
      "text": "东安区",
      "value": "715" },

    {
      "text": "阳明区",
      "value": "716" },

    {
      "text": "爱民区",
      "value": "717" },

    {
      "text": "西安区",
      "value": "718" },

    {
      "text": "东宁县",
      "value": "719" },

    {
      "text": "林口县",
      "value": "720" },

    {
      "text": "绥芬河市",
      "value": "721" },

    {
      "text": "海林市",
      "value": "722" },

    {
      "text": "宁安市",
      "value": "723" },

    {
      "text": "穆棱市",
      "value": "724" }] },



  {
    "text": "黑河市",
    "value": "102",
    "children": [{
      "text": "爱辉区",
      "value": "726" },

    {
      "text": "嫩江县",
      "value": "727" },

    {
      "text": "逊克县",
      "value": "728" },

    {
      "text": "孙吴县",
      "value": "729" },

    {
      "text": "北安市",
      "value": "730" },

    {
      "text": "五大连池市",
      "value": "731" }] },



  {
    "text": "绥化市",
    "value": "103",
    "children": [{
      "text": "北林区",
      "value": "733" },

    {
      "text": "望奎县",
      "value": "734" },

    {
      "text": "兰西县",
      "value": "735" },

    {
      "text": "青冈县",
      "value": "736" },

    {
      "text": "庆安县",
      "value": "737" },

    {
      "text": "明水县",
      "value": "738" },

    {
      "text": "绥棱县",
      "value": "739" },

    {
      "text": "安达市",
      "value": "740" },

    {
      "text": "肇东市",
      "value": "741" },

    {
      "text": "海伦市",
      "value": "742" }] },



  {
    "text": "大兴安岭地区",
    "value": "104",
    "children": [{
      "text": "呼玛县",
      "value": "743" },

    {
      "text": "塔河县",
      "value": "744" },

    {
      "text": "漠河县",
      "value": "745" }] }] },





{
  "text": "上海市",
  "value": "9",
  "children": [{
    "text": "上海市",
    "value": "105",
    "children": [{
      "text": "黄浦区",
      "value": "3143" },

    {
      "text": "徐汇区",
      "value": "106",
      "children": [{
        "text": "徐汇区",
        "value": "3144" }] },


    {
      "text": "卢湾区",
      "value": "411",
      "children": [{
        "text": "卢湾区",
        "value": "3185" }] },


    {
      "text": "长宁区",
      "value": "412",
      "children": [{
        "text": "长宁区",
        "value": "3186" }] },


    {
      "text": "静安区",
      "value": "413",
      "children": [{
        "text": "静安区",
        "value": "3187" }] },


    {
      "text": "普陀区",
      "value": "414",
      "children": [{
        "text": "普陀区",
        "value": "3188" }] },


    {
      "text": "闸北区",
      "value": "415",
      "children": [{
        "text": "闸北区",
        "value": "3189" }] },


    {
      "text": "虹口区",
      "value": "416",
      "children": [{
        "text": "虹口区",
        "value": "3190" }] },


    {
      "text": "杨浦区",
      "value": "417",
      "children": [{
        "text": "杨浦区",
        "value": "3191" }] },


    {
      "text": "闵行区",
      "value": "418",
      "children": [{
        "text": "闵行区",
        "value": "3192" }] },


    {
      "text": "宝山区",
      "value": "419",
      "children": [{
        "text": "宝山区",
        "value": "3193" }] },


    {
      "text": "嘉定区",
      "value": "420",
      "children": [{
        "text": "嘉定区",
        "value": "3194" }] },


    {
      "text": "浦东新区",
      "value": "421",
      "children": [{
        "text": "浦东新区",
        "value": "3195" }] },


    {
      "text": "金山区",
      "value": "422",
      "children": [{
        "text": "金山区",
        "value": "3196" }] },


    {
      "text": "松江区",
      "value": "423",
      "children": [{
        "text": "松江区",
        "value": "3197" }] },


    {
      "text": "青浦区",
      "value": "424",
      "children": [{
        "text": "青浦区",
        "value": "3198" }] },


    {
      "text": "奉贤区",
      "value": "425",
      "children": [{
        "text": "奉贤区",
        "value": "3199" }] },


    {
      "text": "崇明县",
      "value": "426",
      "children": [{
        "text": "崇明县",
        "value": "3200" }] }] }] },







{
  "text": "江苏省",
  "value": "10",
  "children": [{
    "text": "南京市",
    "value": "107",
    "children": [{
      "text": "玄武区",
      "value": "765" },

    {
      "text": "白下区",
      "value": "766" },

    {
      "text": "秦淮区",
      "value": "767" },

    {
      "text": "建邺区",
      "value": "768" },

    {
      "text": "鼓楼区",
      "value": "769" },

    {
      "text": "下关区",
      "value": "770" },

    {
      "text": "浦口区",
      "value": "771" },

    {
      "text": "栖霞区",
      "value": "772" },

    {
      "text": "雨花台区",
      "value": "773" },

    {
      "text": "江宁区",
      "value": "774" },

    {
      "text": "六合区",
      "value": "775" },

    {
      "text": "溧水县",
      "value": "776" },

    {
      "text": "高淳县",
      "value": "777" }] },



  {
    "text": "无锡市",
    "value": "108",
    "children": [{
      "text": "崇安区",
      "value": "779" },

    {
      "text": "南长区",
      "value": "780" },

    {
      "text": "北塘区",
      "value": "781" },

    {
      "text": "锡山区",
      "value": "782" },

    {
      "text": "惠山区",
      "value": "783" },

    {
      "text": "滨湖区",
      "value": "784" },

    {
      "text": "江阴市",
      "value": "785" },

    {
      "text": "宜兴市",
      "value": "786" }] },



  {
    "text": "徐州市",
    "value": "109",
    "children": [{
      "text": "鼓楼区",
      "value": "788" },

    {
      "text": "云龙区",
      "value": "789" },

    {
      "text": "九里区",
      "value": "790" },

    {
      "text": "贾汪区",
      "value": "791" },

    {
      "text": "泉山区",
      "value": "792" },

    {
      "text": "丰县",
      "value": "793" },

    {
      "text": "沛县",
      "value": "794" },

    {
      "text": "铜山县",
      "value": "795" },

    {
      "text": "睢宁县",
      "value": "796" },

    {
      "text": "新沂市",
      "value": "797" },

    {
      "text": "邳州市",
      "value": "798" }] },



  {
    "text": "常州市",
    "value": "110",
    "children": [{
      "text": "天宁区",
      "value": "800" },

    {
      "text": "钟楼区",
      "value": "801" },

    {
      "text": "戚墅堰区",
      "value": "802" },

    {
      "text": "新北区",
      "value": "803" },

    {
      "text": "武进区",
      "value": "804" },

    {
      "text": "溧阳市",
      "value": "805" },

    {
      "text": "金坛市",
      "value": "806" }] },



  {
    "text": "苏州市",
    "value": "111",
    "children": [{
      "text": "沧浪区",
      "value": "808" },

    {
      "text": "平江区",
      "value": "809" },

    {
      "text": "金阊区",
      "value": "810" },

    {
      "text": "虎丘区",
      "value": "811" },

    {
      "text": "吴中区",
      "value": "812" },

    {
      "text": "相城区",
      "value": "813" },

    {
      "text": "常熟市",
      "value": "814" },

    {
      "text": "张家港市",
      "value": "815" },

    {
      "text": "昆山市",
      "value": "816" },

    {
      "text": "吴江市",
      "value": "817" },

    {
      "text": "太仓市",
      "value": "818" }] },



  {
    "text": "南通市",
    "value": "112",
    "children": [{
      "text": "崇川区",
      "value": "820" },

    {
      "text": "港闸区",
      "value": "821" },

    {
      "text": "通州区",
      "value": "822" },

    {
      "text": "海安县",
      "value": "823" },

    {
      "text": "如东县",
      "value": "824" },

    {
      "text": "启东市",
      "value": "825" },

    {
      "text": "如皋市",
      "value": "826" },

    {
      "text": "海门市",
      "value": "827" }] },



  {
    "text": "连云港市",
    "value": "113",
    "children": [{
      "text": "连云区",
      "value": "829" },

    {
      "text": "新浦区",
      "value": "830" },

    {
      "text": "赣榆县",
      "value": "832" },

    {
      "text": "东海县",
      "value": "833" },

    {
      "text": "灌云县",
      "value": "834" },

    {
      "text": "海州区",
      "value": "831" },

    {
      "text": "灌南县",
      "value": "835" }] },



  {
    "text": "淮安市",
    "value": "114",
    "children": [{
      "text": "清河区",
      "value": "837" },

    {
      "text": "楚州区",
      "value": "838" },

    {
      "text": "淮阴区",
      "value": "839" },

    {
      "text": "清浦区",
      "value": "840" },

    {
      "text": "洪泽县",
      "value": "842" },

    {
      "text": "盱眙县",
      "value": "843" },

    {
      "text": "金湖县",
      "value": "844" },

    {
      "text": "涟水县",
      "value": "841" }] },



  {
    "text": "盐城市",
    "value": "115",
    "children": [{
      "text": "盐都区",
      "value": "847" },

    {
      "text": "响水县",
      "value": "848" },

    {
      "text": "滨海县",
      "value": "849" },

    {
      "text": "阜宁县",
      "value": "850" },

    {
      "text": "建湖县",
      "value": "852" },

    {
      "text": "东台市",
      "value": "853" },

    {
      "text": "大丰市",
      "value": "854" },

    {
      "text": "亭湖区",
      "value": "846" },

    {
      "text": "射阳县",
      "value": "851" }] },



  {
    "text": "扬州市",
    "value": "116",
    "children": [{
      "text": "邗江区",
      "value": "857" },

    {
      "text": "维扬区",
      "value": "858" },

    {
      "text": "宝应县",
      "value": "859" },

    {
      "text": "仪征市",
      "value": "860" },

    {
      "text": "江都市",
      "value": "862" },

    {
      "text": "广陵区",
      "value": "856" },

    {
      "text": "高邮市",
      "value": "861" }] },



  {
    "text": "镇江市",
    "value": "117",
    "children": [{
      "text": "京口区",
      "value": "864" },

    {
      "text": "润州区",
      "value": "865" },

    {
      "text": "丹阳市",
      "value": "867" },

    {
      "text": "扬中市",
      "value": "868" },

    {
      "text": "句容市",
      "value": "869" },

    {
      "text": "丹徒区",
      "value": "866" }] },



  {
    "text": "泰州市",
    "value": "118",
    "children": [{
      "text": "高港区",
      "value": "872" },

    {
      "text": "兴化市",
      "value": "873" },

    {
      "text": "靖江市",
      "value": "874" },

    {
      "text": "泰兴市",
      "value": "875" },

    {
      "text": "海陵区",
      "value": "871" },

    {
      "text": "姜堰市",
      "value": "876" }] },



  {
    "text": "宿迁市",
    "value": "119",
    "children": [{
      "text": "宿城区",
      "value": "878" },

    {
      "text": "宿豫区",
      "value": "879" },

    {
      "text": "沭阳县",
      "value": "880" },

    {
      "text": "泗洪县",
      "value": "882" },

    {
      "text": "泗阳县",
      "value": "881" }] }] },





{
  "text": "浙江省",
  "value": "11",
  "children": [{
    "text": "杭州市",
    "value": "120",
    "children": [{
      "text": "上城区",
      "value": "884" },

    {
      "text": "下城区",
      "value": "885" },

    {
      "text": "江干区",
      "value": "886" },

    {
      "text": "西湖区",
      "value": "888" },

    {
      "text": "滨江区",
      "value": "889" },

    {
      "text": "萧山区",
      "value": "890" },

    {
      "text": "桐庐县",
      "value": "892" },

    {
      "text": "淳安县",
      "value": "893" },

    {
      "text": "建德市",
      "value": "894" },

    {
      "text": "富阳市",
      "value": "895" },

    {
      "text": "拱墅区",
      "value": "887" },

    {
      "text": "余杭区",
      "value": "891" },

    {
      "text": "临安市",
      "value": "896" }] },



  {
    "text": "宁波市",
    "value": "121",
    "children": [{
      "text": "海曙区",
      "value": "898" },

    {
      "text": "江东区",
      "value": "899" },

    {
      "text": "江北区",
      "value": "900" },

    {
      "text": "镇海区",
      "value": "902" },

    {
      "text": "鄞州区",
      "value": "903" },

    {
      "text": "象山县",
      "value": "904" },

    {
      "text": "余姚市",
      "value": "906" },

    {
      "text": "慈溪市",
      "value": "907" },

    {
      "text": "奉化市",
      "value": "908" },

    {
      "text": "北仑区",
      "value": "901" },

    {
      "text": "宁海县",
      "value": "905" }] },



  {
    "text": "温州市",
    "value": "122",
    "children": [{
      "text": "鹿城区",
      "value": "910" },

    {
      "text": "瓯海区",
      "value": "912" },

    {
      "text": "洞头县",
      "value": "913" },

    {
      "text": "永嘉县",
      "value": "914" },

    {
      "text": "苍南县",
      "value": "916" },

    {
      "text": "文成县",
      "value": "917" },

    {
      "text": "泰顺县",
      "value": "918" },

    {
      "text": "瑞安市",
      "value": "919" },

    {
      "text": "龙湾区",
      "value": "911" },

    {
      "text": "平阳县",
      "value": "915" },

    {
      "text": "乐清市",
      "value": "920" }] },



  {
    "text": "湖州市",
    "value": "124",
    "children": [{
      "text": "南浔区",
      "value": "931" },

    {
      "text": "吴兴区",
      "value": "930" },

    {
      "text": "德清县",
      "value": "932" },

    {
      "text": "长兴县",
      "value": "933" },

    {
      "text": "安吉县",
      "value": "934" }] },



  {
    "text": "绍兴市",
    "value": "125",
    "children": [{
      "text": "越城区",
      "value": "936" },

    {
      "text": "绍兴县",
      "value": "937" },

    {
      "text": "新昌县",
      "value": "938" },

    {
      "text": "诸暨市",
      "value": "939" },

    {
      "text": "上虞市",
      "value": "940" },

    {
      "text": "嵊州市",
      "value": "941" }] },



  {
    "text": "金华市",
    "value": "126",
    "children": [{
      "text": "婺城区",
      "value": "943" },

    {
      "text": "金东区",
      "value": "944" },

    {
      "text": "武义县",
      "value": "945" },

    {
      "text": "浦江县",
      "value": "946" },

    {
      "text": "磐安县",
      "value": "947" },

    {
      "text": "兰溪市",
      "value": "948" },

    {
      "text": "义乌市",
      "value": "949" },

    {
      "text": "东阳市",
      "value": "950" },

    {
      "text": "永康市",
      "value": "951" }] },



  {
    "text": "舟山市",
    "value": "128",
    "children": [{
      "text": "定海区",
      "value": "960" },

    {
      "text": "普陀区",
      "value": "961" },

    {
      "text": "岱山县",
      "value": "962" },

    {
      "text": "嵊泗县",
      "value": "963" }] },



  {
    "text": "台州市",
    "value": "129",
    "children": [{
      "text": "椒江区",
      "value": "965" },

    {
      "text": "黄岩区",
      "value": "966" },

    {
      "text": "路桥区",
      "value": "967" },

    {
      "text": "玉环县",
      "value": "968" },

    {
      "text": "三门县",
      "value": "969" },

    {
      "text": "天台县",
      "value": "970" },

    {
      "text": "仙居县",
      "value": "971" },

    {
      "text": "温岭市",
      "value": "972" },

    {
      "text": "临海市",
      "value": "973" }] },



  {
    "text": "丽水市",
    "value": "130",
    "children": [{
      "text": "莲都区",
      "value": "975" },

    {
      "text": "青田县",
      "value": "976" },

    {
      "text": "缙云县",
      "value": "977" },

    {
      "text": "遂昌县",
      "value": "978" },

    {
      "text": "松阳县",
      "value": "979" },

    {
      "text": "云和县",
      "value": "980" },

    {
      "text": "庆元县",
      "value": "981" },

    {
      "text": "景宁畲族自治县",
      "value": "982" },

    {
      "text": "龙泉市",
      "value": "983" }] },



  {
    "text": "嘉兴市",
    "value": "123",
    "children": [{
      "text": "南湖区",
      "value": "922" },

    {
      "text": "秀洲区",
      "value": "923" },

    {
      "text": "嘉善县",
      "value": "924" },

    {
      "text": "海宁市",
      "value": "926" },

    {
      "text": "平湖市",
      "value": "927" },

    {
      "text": "桐乡市",
      "value": "928" },

    {
      "text": "海盐县",
      "value": "925" }] },



  {
    "text": "衢州市",
    "value": "127",
    "children": [{
      "text": "柯城区",
      "value": "953" },

    {
      "text": "衢江区",
      "value": "954" },

    {
      "text": "常山县",
      "value": "955" },

    {
      "text": "开化县",
      "value": "956" },

    {
      "text": "龙游县",
      "value": "957" },

    {
      "text": "江山市",
      "value": "958" }] }] },





{
  "text": "安徽省",
  "value": "12",
  "children": [{
    "text": "芜湖市",
    "value": "132",
    "children": [{
      "text": "镜湖区",
      "value": "993" },

    {
      "text": "弋江区",
      "value": "994" },

    {
      "text": "鸠江区",
      "value": "995" },

    {
      "text": "三山区",
      "value": "996" },

    {
      "text": "芜湖县",
      "value": "997" },

    {
      "text": "繁昌县",
      "value": "998" },

    {
      "text": "南陵县",
      "value": "999" }] },



  {
    "text": "蚌埠市",
    "value": "133",
    "children": [{
      "text": "龙子湖区",
      "value": "1001" },

    {
      "text": "蚌山区",
      "value": "1002" },

    {
      "text": "禹会区",
      "value": "1003" },

    {
      "text": "淮上区",
      "value": "1004" },

    {
      "text": "怀远县",
      "value": "1005" },

    {
      "text": "五河县",
      "value": "1006" },

    {
      "text": "固镇县",
      "value": "1007" }] },



  {
    "text": "淮南市",
    "value": "134",
    "children": [{
      "text": "大通区",
      "value": "1009" },

    {
      "text": "田家庵区",
      "value": "1010" },

    {
      "text": "谢家集区",
      "value": "1011" },

    {
      "text": "八公山区",
      "value": "1012" },

    {
      "text": "潘集区",
      "value": "1013" },

    {
      "text": "凤台县",
      "value": "1014" }] },



  {
    "text": "马鞍山市",
    "value": "135",
    "children": [{
      "text": "金家庄区",
      "value": "1016" },

    {
      "text": "花山区",
      "value": "1017" },

    {
      "text": "雨山区",
      "value": "1018" },

    {
      "text": "当涂县",
      "value": "1019" }] },



  {
    "text": "铜陵市",
    "value": "137",
    "children": [{
      "text": "铜官山区",
      "value": "1026" },

    {
      "text": "狮子山区",
      "value": "1027" },

    {
      "text": "郊区",
      "value": "1028" },

    {
      "text": "铜陵县",
      "value": "1029" }] },



  {
    "text": "安庆市",
    "value": "138",
    "children": [{
      "text": "迎江区",
      "value": "1031" },

    {
      "text": "大观区",
      "value": "1032" },

    {
      "text": "宜秀区",
      "value": "1033" },

    {
      "text": "怀宁县",
      "value": "1034" },

    {
      "text": "枞阳县",
      "value": "1035" },

    {
      "text": "潜山县",
      "value": "1036" },

    {
      "text": "太湖县",
      "value": "1037" },

    {
      "text": "宿松县",
      "value": "1038" },

    {
      "text": "望江县",
      "value": "1039" },

    {
      "text": "岳西县",
      "value": "1040" },

    {
      "text": "桐城市",
      "value": "1041" }] },



  {
    "text": "黄山市",
    "value": "139",
    "children": [{
      "text": "屯溪区",
      "value": "1043" },

    {
      "text": "黄山区",
      "value": "1044" },

    {
      "text": "徽州区",
      "value": "1045" },

    {
      "text": "歙县",
      "value": "1046" },

    {
      "text": "休宁县",
      "value": "1047" },

    {
      "text": "黟县",
      "value": "1048" },

    {
      "text": "祁门县",
      "value": "1049" }] },



  {
    "text": "阜阳市",
    "value": "141",
    "children": [{
      "text": "颍州区",
      "value": "1060" },

    {
      "text": "颍东区",
      "value": "1061" },

    {
      "text": "颍泉区",
      "value": "1062" },

    {
      "text": "临泉县",
      "value": "1063" },

    {
      "text": "太和县",
      "value": "1064" },

    {
      "text": "阜南县",
      "value": "1065" },

    {
      "text": "界首市",
      "value": "1067" },

    {
      "text": "颍上县",
      "value": "1066" }] },



  {
    "text": "宿州市",
    "value": "142",
    "children": [{
      "text": "埇桥区",
      "value": "1069" },

    {
      "text": "砀山县",
      "value": "1070" },

    {
      "text": "灵璧县",
      "value": "1072" },

    {
      "text": "泗县",
      "value": "1073" },

    {
      "text": "萧县",
      "value": "1071" }] },



  {
    "text": "巢湖市",
    "value": "143",
    "children": [{
      "text": "居巢区",
      "value": "1075" },

    {
      "text": "无为县",
      "value": "1077" },

    {
      "text": "含山县",
      "value": "1078" },

    {
      "text": "和县",
      "value": "1079" },

    {
      "text": "庐江县",
      "value": "1076" }] },



  {
    "text": "亳州市",
    "value": "145",
    "children": [{
      "text": "谯城区",
      "value": "1089" },

    {
      "text": "涡阳县",
      "value": "1090" },

    {
      "text": "利辛县",
      "value": "1092" },

    {
      "text": "蒙城县",
      "value": "1091" }] },



  {
    "text": "池州市",
    "value": "146",
    "children": [{
      "text": "贵池区",
      "value": "1094" },

    {
      "text": "东至县",
      "value": "1095" },

    {
      "text": "石台县",
      "value": "1096" },

    {
      "text": "青阳县",
      "value": "1097" }] },



  {
    "text": "宣城市",
    "value": "147",
    "children": [{
      "text": "宣州区",
      "value": "1099" },

    {
      "text": "郎溪县",
      "value": "1100" },

    {
      "text": "广德县",
      "value": "1101" },

    {
      "text": "绩溪县",
      "value": "1103" },

    {
      "text": "旌德县",
      "value": "1104" },

    {
      "text": "宁国市",
      "value": "1105" },

    {
      "text": "泾县",
      "value": "1102" }] },



  {
    "text": "合肥市",
    "value": "131",
    "children": [{
      "text": "瑶海区",
      "value": "985" },

    {
      "text": "庐阳区",
      "value": "986" },

    {
      "text": "蜀山区",
      "value": "987" },

    {
      "text": "包河区",
      "value": "988" },

    {
      "text": "长丰县",
      "value": "989" },

    {
      "text": "肥东县",
      "value": "990" },

    {
      "text": "肥西县",
      "value": "991" }] },



  {
    "text": "淮北市",
    "value": "136",
    "children": [{
      "text": "杜集区",
      "value": "1021" },

    {
      "text": "相山区",
      "value": "1022" },

    {
      "text": "烈山区",
      "value": "1023" },

    {
      "text": "濉溪县",
      "value": "1024" }] },



  {
    "text": "滁州市",
    "value": "140",
    "children": [{
      "text": "琅琊区",
      "value": "1051" },

    {
      "text": "南谯区",
      "value": "1052" },

    {
      "text": "来安县",
      "value": "1053" },

    {
      "text": "全椒县",
      "value": "1054" },

    {
      "text": "定远县",
      "value": "1055" },

    {
      "text": "凤阳县",
      "value": "1056" },

    {
      "text": "天长市",
      "value": "1057" },

    {
      "text": "明光市",
      "value": "1058" }] },



  {
    "text": "六安市",
    "value": "144",
    "children": [{
      "text": "金安区",
      "value": "1081" },

    {
      "text": "寿县",
      "value": "1083" },

    {
      "text": "霍邱县",
      "value": "1084" },

    {
      "text": "舒城县",
      "value": "1085" },

    {
      "text": "霍山县",
      "value": "1087" },

    {
      "text": "裕安区",
      "value": "1082" },

    {
      "text": "金寨县",
      "value": "1086" }] }] },





{
  "text": "福建省",
  "value": "13",
  "children": [{
    "text": "厦门市",
    "value": "149",
    "children": [{
      "text": "思明区",
      "value": "1121" },

    {
      "text": "湖里区",
      "value": "1123" },

    {
      "text": "集美区",
      "value": "1124" },

    {
      "text": "同安区",
      "value": "1125" },

    {
      "text": "海沧区",
      "value": "1122" },

    {
      "text": "翔安区",
      "value": "1126" }] },



  {
    "text": "莆田市",
    "value": "150",
    "children": [{
      "text": "城厢区",
      "value": "1128" },

    {
      "text": "涵江区",
      "value": "1129" },

    {
      "text": "荔城区",
      "value": "1130" },

    {
      "text": "仙游县",
      "value": "1132" },

    {
      "text": "秀屿区",
      "value": "1131" }] },



  {
    "text": "三明市",
    "value": "151",
    "children": [{
      "text": "梅列区",
      "value": "1134" },

    {
      "text": "三元区",
      "value": "1135" },

    {
      "text": "明溪县",
      "value": "1136" },

    {
      "text": "宁化县",
      "value": "1138" },

    {
      "text": "大田县",
      "value": "1139" },

    {
      "text": "尤溪县",
      "value": "1140" },

    {
      "text": "将乐县",
      "value": "1142" },

    {
      "text": "泰宁县",
      "value": "1143" },

    {
      "text": "建宁县",
      "value": "1144" },

    {
      "text": "清流县",
      "value": "1137" },

    {
      "text": "沙县",
      "value": "1141" },

    {
      "text": "永安市",
      "value": "1145" }] },



  {
    "text": "泉州市",
    "value": "152",
    "children": [{
      "text": "鲤城区",
      "value": "1147" },

    {
      "text": "丰泽区",
      "value": "1148" },

    {
      "text": "洛江区",
      "value": "1149" },

    {
      "text": "泉港区",
      "value": "1150" },

    {
      "text": "安溪县",
      "value": "1152" },

    {
      "text": "永春县",
      "value": "1153" },

    {
      "text": "德化县",
      "value": "1154" },

    {
      "text": "石狮市",
      "value": "1156" },

    {
      "text": "晋江市",
      "value": "1157" },

    {
      "text": "南安市",
      "value": "1158" },

    {
      "text": "惠安县",
      "value": "1151" },

    {
      "text": "金门县",
      "value": "1155" }] },



  {
    "text": "南平市",
    "value": "154",
    "children": [{
      "text": "延平区",
      "value": "1172" },

    {
      "text": "顺昌县",
      "value": "1173" },

    {
      "text": "浦城县",
      "value": "1174" },

    {
      "text": "光泽县",
      "value": "1175" },

    {
      "text": "松溪县",
      "value": "1176" },

    {
      "text": "政和县",
      "value": "1177" },

    {
      "text": "邵武市",
      "value": "1178" },

    {
      "text": "武夷山市",
      "value": "1179" },

    {
      "text": "建瓯市",
      "value": "1180" },

    {
      "text": "建阳市",
      "value": "1181" }] },



  {
    "text": "宁德市",
    "value": "156",
    "children": [{
      "text": "蕉城区",
      "value": "1191" },

    {
      "text": "霞浦县",
      "value": "1192" },

    {
      "text": "古田县",
      "value": "1193" },

    {
      "text": "屏南县",
      "value": "1194" },

    {
      "text": "寿宁县",
      "value": "1195" },

    {
      "text": "周宁县",
      "value": "1196" },

    {
      "text": "柘荣县",
      "value": "1197" },

    {
      "text": "福安市",
      "value": "1198" },

    {
      "text": "福鼎市",
      "value": "1199" }] },



  {
    "text": "福州市",
    "value": "148",
    "children": [{
      "text": "台江区",
      "value": "1108" },

    {
      "text": "仓山区",
      "value": "1109" },

    {
      "text": "马尾区",
      "value": "1110" },

    {
      "text": "晋安区",
      "value": "1111" },

    {
      "text": "连江县",
      "value": "1113" },

    {
      "text": "罗源县",
      "value": "1114" },

    {
      "text": "闽清县",
      "value": "1115" },

    {
      "text": "平潭县",
      "value": "1117" },

    {
      "text": "福清市",
      "value": "1118" },

    {
      "text": "长乐市",
      "value": "1119" },

    {
      "text": "鼓楼区",
      "value": "1107" },

    {
      "text": "闽侯县",
      "value": "1112" },

    {
      "text": "永泰县",
      "value": "1116" }] },



  {
    "text": "漳州市",
    "value": "153",
    "children": [{
      "text": "芗城区",
      "value": "1160" },

    {
      "text": "云霄县",
      "value": "1162" },

    {
      "text": "漳浦县",
      "value": "1163" },

    {
      "text": "诏安县",
      "value": "1164" },

    {
      "text": "东山县",
      "value": "1166" },

    {
      "text": "南靖县",
      "value": "1167" },

    {
      "text": "平和县",
      "value": "1168" },

    {
      "text": "华安县",
      "value": "1169" },

    {
      "text": "龙海市",
      "value": "1170" },

    {
      "text": "龙文区",
      "value": "1161" },

    {
      "text": "长泰县",
      "value": "1165" }] }] },





{
  "text": "江西省",
  "value": "14",
  "children": [{
    "text": "景德镇市",
    "value": "158",
    "children": [{
      "text": "昌江区",
      "value": "1211" },

    {
      "text": "珠山区",
      "value": "1212" },

    {
      "text": "浮梁县",
      "value": "1213" },

    {
      "text": "乐平市",
      "value": "1214" }] },



  {
    "text": "萍乡市",
    "value": "159",
    "children": [{
      "text": "安源区",
      "value": "1216" },

    {
      "text": "湘东区",
      "value": "1217" },

    {
      "text": "莲花县",
      "value": "1218" },

    {
      "text": "上栗县",
      "value": "1219" },

    {
      "text": "芦溪县",
      "value": "1220" }] },



  {
    "text": "九江市",
    "value": "160",
    "children": [{
      "text": "庐山区",
      "value": "1222" },

    {
      "text": "浔阳区",
      "value": "1223" },

    {
      "text": "九江县",
      "value": "1224" },

    {
      "text": "武宁县",
      "value": "1225" },

    {
      "text": "修水县",
      "value": "1226" },

    {
      "text": "永修县",
      "value": "1227" },

    {
      "text": "德安县",
      "value": "1228" },

    {
      "text": "星子县",
      "value": "1229" },

    {
      "text": "都昌县",
      "value": "1230" },

    {
      "text": "湖口县",
      "value": "1231" },

    {
      "text": "彭泽县",
      "value": "1232" },

    {
      "text": "瑞昌市",
      "value": "1233" }] },



  {
    "text": "鹰潭市",
    "value": "162",
    "children": [{
      "text": "月湖区",
      "value": "1238" },

    {
      "text": "余江县",
      "value": "1239" },

    {
      "text": "贵溪市",
      "value": "1240" }] },



  {
    "text": "赣州市",
    "value": "163",
    "children": [{
      "text": "章贡区",
      "value": "1242" },

    {
      "text": "赣县",
      "value": "1243" },

    {
      "text": "信丰县",
      "value": "1244" },

    {
      "text": "大余县",
      "value": "1245" },

    {
      "text": "上犹县",
      "value": "1246" },

    {
      "text": "崇义县",
      "value": "1247" },

    {
      "text": "安远县",
      "value": "1248" },

    {
      "text": "龙南县",
      "value": "1249" },

    {
      "text": "定南县",
      "value": "1250" },

    {
      "text": "全南县",
      "value": "1251" },

    {
      "text": "宁都县",
      "value": "1252" },

    {
      "text": "于都县",
      "value": "1253" },

    {
      "text": "兴国县",
      "value": "1254" },

    {
      "text": "会昌县",
      "value": "1255" },

    {
      "text": "寻乌县",
      "value": "1256" },

    {
      "text": "石城县",
      "value": "1257" },

    {
      "text": "瑞金市",
      "value": "1258" },

    {
      "text": "南康市",
      "value": "1259" }] },



  {
    "text": "吉安市",
    "value": "164",
    "children": [{
      "text": "吉州区",
      "value": "1261" },

    {
      "text": "青原区",
      "value": "1262" },

    {
      "text": "吉安县",
      "value": "1263" },

    {
      "text": "吉水县",
      "value": "1264" },

    {
      "text": "峡江县",
      "value": "1265" },

    {
      "text": "新干县",
      "value": "1266" },

    {
      "text": "永丰县",
      "value": "1267" },

    {
      "text": "泰和县",
      "value": "1268" },

    {
      "text": "遂川县",
      "value": "1269" },

    {
      "text": "万安县",
      "value": "1270" },

    {
      "text": "安福县",
      "value": "1271" },

    {
      "text": "永新县",
      "value": "1272" },

    {
      "text": "井冈山市",
      "value": "1273" }] },



  {
    "text": "宜春市",
    "value": "165",
    "children": [{
      "text": "袁州区",
      "value": "1275" },

    {
      "text": "奉新县",
      "value": "1276" },

    {
      "text": "万载县",
      "value": "1277" },

    {
      "text": "上高县",
      "value": "1278" },

    {
      "text": "宜丰县",
      "value": "1279" },

    {
      "text": "靖安县",
      "value": "1280" },

    {
      "text": "铜鼓县",
      "value": "1281" },

    {
      "text": "丰城市",
      "value": "1282" },

    {
      "text": "樟树市",
      "value": "1283" },

    {
      "text": "高安市",
      "value": "1284" }] },



  {
    "text": "上饶市",
    "value": "167",
    "children": [{
      "text": "上饶县",
      "value": "1299" },

    {
      "text": "广丰县",
      "value": "1300" },

    {
      "text": "玉山县",
      "value": "1301" },

    {
      "text": "横峰县",
      "value": "1303" },

    {
      "text": "弋阳县",
      "value": "1304" },

    {
      "text": "余干县",
      "value": "1305" },

    {
      "text": "鄱阳县",
      "value": "1306" },

    {
      "text": "婺源县",
      "value": "1308" },

    {
      "text": "德兴市",
      "value": "1309" },

    {
      "text": "信州区",
      "value": "1298" },

    {
      "text": "铅山县",
      "value": "1302" },

    {
      "text": "万年县",
      "value": "1307" }] },



  {
    "text": "南昌市",
    "value": "157",
    "children": [{
      "text": "东湖区",
      "value": "1201" },

    {
      "text": "西湖区",
      "value": "1202" },

    {
      "text": "青云谱区",
      "value": "1203" },

    {
      "text": "湾里区",
      "value": "1204" },

    {
      "text": "青山湖区",
      "value": "1205" },

    {
      "text": "南昌县",
      "value": "1206" },

    {
      "text": "新建县",
      "value": "1207" },

    {
      "text": "安义县",
      "value": "1208" },

    {
      "text": "进贤县",
      "value": "1209" }] },



  {
    "text": "新余市",
    "value": "161",
    "children": [{
      "text": "渝水区",
      "value": "1235" },

    {
      "text": "分宜县",
      "value": "1236" }] },



  {
    "text": "抚州市",
    "value": "166",
    "children": [{
      "text": "临川区",
      "value": "1286" },

    {
      "text": "南城县",
      "value": "1287" },

    {
      "text": "黎川县",
      "value": "1288" },

    {
      "text": "南丰县",
      "value": "1289" },

    {
      "text": "崇仁县",
      "value": "1290" },

    {
      "text": "乐安县",
      "value": "1291" },

    {
      "text": "宜黄县",
      "value": "1292" },

    {
      "text": "金溪县",
      "value": "1293" },

    {
      "text": "资溪县",
      "value": "1294" },

    {
      "text": "东乡县",
      "value": "1295" },

    {
      "text": "广昌县",
      "value": "1296" }] }] },





{
  "text": "山东省",
  "value": "15",
  "children": [{
    "text": "济南市",
    "value": "168",
    "children": [{
      "text": "历下区",
      "value": "1311" },

    {
      "text": "槐荫区",
      "value": "1313" },

    {
      "text": "天桥区",
      "value": "1314" },

    {
      "text": "历城区",
      "value": "1315" },

    {
      "text": "长清区",
      "value": "1316" },

    {
      "text": "济阳县",
      "value": "1318" },

    {
      "text": "商河县",
      "value": "1319" },

    {
      "text": "章丘市",
      "value": "1320" },

    {
      "text": "市中区",
      "value": "1312" },

    {
      "text": "平阴县",
      "value": "1317" }] },



  {
    "text": "青岛市",
    "value": "169",
    "children": [{
      "text": "市北区",
      "value": "1323" },

    {
      "text": "四方区",
      "value": "1324" },

    {
      "text": "黄岛区",
      "value": "1325" },

    {
      "text": "李沧区",
      "value": "1327" },

    {
      "text": "城阳区",
      "value": "1328" },

    {
      "text": "胶州市",
      "value": "1329" },

    {
      "text": "即墨市",
      "value": "1330" },

    {
      "text": "胶南市",
      "value": "1332" },

    {
      "text": "莱西市",
      "value": "1333" },

    {
      "text": "市南区",
      "value": "1322" },

    {
      "text": "崂山区",
      "value": "1326" },

    {
      "text": "平度市",
      "value": "1331" }] },



  {
    "text": "枣庄市",
    "value": "171",
    "children": [{
      "text": "市中区",
      "value": "1344" },

    {
      "text": "薛城区",
      "value": "1345" },

    {
      "text": "台儿庄区",
      "value": "1347" },

    {
      "text": "山亭区",
      "value": "1348" },

    {
      "text": "滕州市",
      "value": "1349" },

    {
      "text": "峄城区",
      "value": "1346" }] },



  {
    "text": "东营市",
    "value": "172",
    "children": [{
      "text": "东营区",
      "value": "1351" },

    {
      "text": "垦利县",
      "value": "1353" },

    {
      "text": "利津县",
      "value": "1354" },

    {
      "text": "广饶县",
      "value": "1355" },

    {
      "text": "河口区",
      "value": "1352" }] },



  {
    "text": "烟台市",
    "value": "173",
    "children": [{
      "text": "福山区",
      "value": "1358" },

    {
      "text": "牟平区",
      "value": "1359" },

    {
      "text": "莱山区",
      "value": "1360" },

    {
      "text": "龙口市",
      "value": "1362" },

    {
      "text": "莱阳市",
      "value": "1363" },

    {
      "text": "莱州市",
      "value": "1364" },

    {
      "text": "蓬莱市",
      "value": "1365" },

    {
      "text": "栖霞市",
      "value": "1367" },

    {
      "text": "海阳市",
      "value": "1368" },

    {
      "text": "芝罘区",
      "value": "1357" },

    {
      "text": "长岛县",
      "value": "1361" },

    {
      "text": "招远市",
      "value": "1366" }] },



  {
    "text": "济宁市",
    "value": "175",
    "children": [{
      "text": "市中区",
      "value": "1383" },

    {
      "text": "任城区",
      "value": "1384" },

    {
      "text": "微山县",
      "value": "1385" },

    {
      "text": "金乡县",
      "value": "1387" },

    {
      "text": "嘉祥县",
      "value": "1388" },

    {
      "text": "汶上县",
      "value": "1389" },

    {
      "text": "梁山县",
      "value": "1391" },

    {
      "text": "曲阜市",
      "value": "1392" },

    {
      "text": "兖州市",
      "value": "1393" },

    {
      "text": "鱼台县",
      "value": "1386" },

    {
      "text": "泗水县",
      "value": "1390" },

    {
      "text": "邹城市",
      "value": "1394" }] },



  {
    "text": "泰安市",
    "value": "176",
    "children": [{
      "text": "泰山区",
      "value": "1396" },

    {
      "text": "岱岳区",
      "value": "1397" },

    {
      "text": "宁阳县",
      "value": "1398" },

    {
      "text": "东平县",
      "value": "1399" },

    {
      "text": "新泰市",
      "value": "1400" },

    {
      "text": "肥城市",
      "value": "1401" }] },



  {
    "text": "威海市",
    "value": "177",
    "children": [{
      "text": "环翠区",
      "value": "1403" },

    {
      "text": "文登市",
      "value": "1404" },

    {
      "text": "荣成市",
      "value": "1405" },

    {
      "text": "乳山市",
      "value": "1406" }] },



  {
    "text": "莱芜市",
    "value": "179",
    "children": [{
      "text": "莱城区",
      "value": "1413" },

    {
      "text": "钢城区",
      "value": "1414" }] },



  {
    "text": "临沂市",
    "value": "180",
    "children": [{
      "text": "兰山区",
      "value": "1416" },

    {
      "text": "罗庄区",
      "value": "1417" },

    {
      "text": "河东区",
      "value": "1418" },

    {
      "text": "沂南县",
      "value": "1419" },

    {
      "text": "郯城县",
      "value": "1420" },

    {
      "text": "沂水县",
      "value": "1421" },

    {
      "text": "苍山县",
      "value": "1422" },

    {
      "text": "费县",
      "value": "1423" },

    {
      "text": "平邑县",
      "value": "1424" },

    {
      "text": "莒南县",
      "value": "1425" },

    {
      "text": "蒙阴县",
      "value": "1426" },

    {
      "text": "临沭县",
      "value": "1427" }] },



  {
    "text": "德州市",
    "value": "181",
    "children": [{
      "text": "德城区",
      "value": "1429" },

    {
      "text": "陵县",
      "value": "1430" },

    {
      "text": "宁津县",
      "value": "1431" },

    {
      "text": "庆云县",
      "value": "1432" },

    {
      "text": "临邑县",
      "value": "1433" },

    {
      "text": "齐河县",
      "value": "1434" },

    {
      "text": "平原县",
      "value": "1435" },

    {
      "text": "夏津县",
      "value": "1436" },

    {
      "text": "武城县",
      "value": "1437" },

    {
      "text": "乐陵市",
      "value": "1438" },

    {
      "text": "禹城市",
      "value": "1439" }] },



  {
    "text": "聊城市",
    "value": "182",
    "children": [{
      "text": "东昌府区",
      "value": "1441" },

    {
      "text": "阳谷县",
      "value": "1442" },

    {
      "text": "莘县",
      "value": "1443" },

    {
      "text": "茌平县",
      "value": "1444" },

    {
      "text": "东阿县",
      "value": "1445" },

    {
      "text": "冠县",
      "value": "1446" },

    {
      "text": "高唐县",
      "value": "1447" },

    {
      "text": "临清市",
      "value": "1448" }] },



  {
    "text": "菏泽市",
    "value": "184",
    "children": [{
      "text": "牡丹区",
      "value": "1458" },

    {
      "text": "曹县",
      "value": "1459" },

    {
      "text": "单县",
      "value": "1460" },

    {
      "text": "成武县",
      "value": "1461" },

    {
      "text": "巨野县",
      "value": "1462" },

    {
      "text": "郓城县",
      "value": "1463" },

    {
      "text": "鄄城县",
      "value": "1464" },

    {
      "text": "定陶县",
      "value": "1465" },

    {
      "text": "东明县",
      "value": "1466" }] },



  {
    "text": "淄博市",
    "value": "170",
    "children": [{
      "text": "淄川区",
      "value": "1335" },

    {
      "text": "博山区",
      "value": "1337" },

    {
      "text": "临淄区",
      "value": "1338" },

    {
      "text": "周村区",
      "value": "1339" },

    {
      "text": "桓台县",
      "value": "1340" },

    {
      "text": "沂源县",
      "value": "1342" },

    {
      "text": "张店区",
      "value": "1336" },

    {
      "text": "高青县",
      "value": "1341" }] },



  {
    "text": "潍坊市",
    "value": "174",
    "children": [{
      "text": "潍城区",
      "value": "1370" },

    {
      "text": "坊子区",
      "value": "1372" },

    {
      "text": "奎文区",
      "value": "1373" },

    {
      "text": "临朐县",
      "value": "1374" },

    {
      "text": "昌乐县",
      "value": "1375" },

    {
      "text": "诸城市",
      "value": "1377" },

    {
      "text": "寿光市",
      "value": "1378" },

    {
      "text": "安丘市",
      "value": "1379" },

    {
      "text": "昌邑市",
      "value": "1381" },

    {
      "text": "寒亭区",
      "value": "1371" },

    {
      "text": "青州市",
      "value": "1376" },

    {
      "text": "高密市",
      "value": "1380" }] },



  {
    "text": "日照市",
    "value": "178",
    "children": [{
      "text": "东港区",
      "value": "1408" },

    {
      "text": "岚山区",
      "value": "1409" },

    {
      "text": "五莲县",
      "value": "1410" },

    {
      "text": "莒县",
      "value": "1411" }] },



  {
    "text": "滨州市",
    "value": "183",
    "children": [{
      "text": "滨城区",
      "value": "1450" },

    {
      "text": "惠民县",
      "value": "1451" },

    {
      "text": "阳信县",
      "value": "1452" },

    {
      "text": "无棣县",
      "value": "1453" },

    {
      "text": "沾化县",
      "value": "1454" },

    {
      "text": "博兴县",
      "value": "1455" },

    {
      "text": "邹平县",
      "value": "1456" }] }] },





{
  "text": "河南省",
  "value": "16",
  "children": [{
    "text": "郑州市",
    "value": "185",
    "children": [{
      "text": "中原区",
      "value": "1468" },

    {
      "text": "二七区",
      "value": "1469" },

    {
      "text": "管城回族区",
      "value": "1470" },

    {
      "text": "金水区",
      "value": "1471" },

    {
      "text": "上街区",
      "value": "1472" },

    {
      "text": "惠济区",
      "value": "1473" },

    {
      "text": "中牟县",
      "value": "1474" },

    {
      "text": "巩义市",
      "value": "1475" },

    {
      "text": "荥阳市",
      "value": "1476" },

    {
      "text": "新密市",
      "value": "1477" },

    {
      "text": "新郑市",
      "value": "1478" },

    {
      "text": "登封市",
      "value": "1479" }] },



  {
    "text": "开封市",
    "value": "186",
    "children": [{
      "text": "龙亭区",
      "value": "1481" },

    {
      "text": "顺河回族区",
      "value": "1482" },

    {
      "text": "鼓楼区",
      "value": "1483" },

    {
      "text": "禹王台区",
      "value": "1484" },

    {
      "text": "金明区",
      "value": "1485" },

    {
      "text": "杞县",
      "value": "1486" },

    {
      "text": "通许县",
      "value": "1487" },

    {
      "text": "尉氏县",
      "value": "1488" },

    {
      "text": "开封县",
      "value": "1489" },

    {
      "text": "兰考县",
      "value": "1490" }] },



  {
    "text": "平顶山市",
    "value": "188",
    "children": [{
      "text": "新华区",
      "value": "1508" },

    {
      "text": "卫东区",
      "value": "1509" },

    {
      "text": "石龙区",
      "value": "1510" },

    {
      "text": "湛河区",
      "value": "1511" },

    {
      "text": "宝丰县",
      "value": "1512" },

    {
      "text": "叶县",
      "value": "1513" },

    {
      "text": "鲁山县",
      "value": "1514" },

    {
      "text": "郏县",
      "value": "1515" },

    {
      "text": "舞钢市",
      "value": "1516" },

    {
      "text": "汝州市",
      "value": "1517" }] },



  {
    "text": "安阳市",
    "value": "189",
    "children": [{
      "text": "文峰区",
      "value": "1519" },

    {
      "text": "北关区",
      "value": "1520" },

    {
      "text": "殷都区",
      "value": "1521" },

    {
      "text": "龙安区",
      "value": "1522" },

    {
      "text": "安阳县",
      "value": "1523" },

    {
      "text": "汤阴县",
      "value": "1524" },

    {
      "text": "滑县",
      "value": "1525" },

    {
      "text": "内黄县",
      "value": "1526" },

    {
      "text": "林州市",
      "value": "1527" }] },



  {
    "text": "鹤壁市",
    "value": "190",
    "children": [{
      "text": "鹤山区",
      "value": "1529" },

    {
      "text": "山城区",
      "value": "1530" },

    {
      "text": "浚县",
      "value": "1532" },

    {
      "text": "淇县",
      "value": "1533" },

    {
      "text": "淇滨区",
      "value": "1531" }] },



  {
    "text": "焦作市",
    "value": "192",
    "children": [{
      "text": "解放区",
      "value": "1548" },

    {
      "text": "中站区",
      "value": "1549" },

    {
      "text": "马村区",
      "value": "1550" },

    {
      "text": "修武县",
      "value": "1552" },

    {
      "text": "博爱县",
      "value": "1553" },

    {
      "text": "武陟县",
      "value": "1554" },

    {
      "text": "沁阳市",
      "value": "1556" },

    {
      "text": "孟州市",
      "value": "1557" },

    {
      "text": "山阳区",
      "value": "1551" },

    {
      "text": "温县",
      "value": "1555" }] },



  {
    "text": "濮阳市",
    "value": "193",
    "children": [{
      "text": "华龙区",
      "value": "1559" },

    {
      "text": "南乐县",
      "value": "1561" },

    {
      "text": "范县",
      "value": "1562" },

    {
      "text": "台前县",
      "value": "1563" },

    {
      "text": "濮阳县",
      "value": "1564" },

    {
      "text": "清丰县",
      "value": "1560" }] },



  {
    "text": "许昌市",
    "value": "194",
    "children": [{
      "text": "许昌县",
      "value": "1567" },

    {
      "text": "鄢陵县",
      "value": "1568" },

    {
      "text": "襄城县",
      "value": "1569" },

    {
      "text": "长葛市",
      "value": "1571" },

    {
      "text": "魏都区",
      "value": "1566" },

    {
      "text": "禹州市",
      "value": "1570" }] },



  {
    "text": "漯河市",
    "value": "195",
    "children": [{
      "text": "源汇区",
      "value": "1573" },

    {
      "text": "郾城区",
      "value": "1574" },

    {
      "text": "召陵区",
      "value": "1575" },

    {
      "text": "临颍县",
      "value": "1577" },

    {
      "text": "舞阳县",
      "value": "1576" }] },



  {
    "text": "南阳市",
    "value": "197",
    "children": [{
      "text": "卧龙区",
      "value": "1587" },

    {
      "text": "南召县",
      "value": "1588" },

    {
      "text": "方城县",
      "value": "1589" },

    {
      "text": "西峡县",
      "value": "1590" },

    {
      "text": "内乡县",
      "value": "1592" },

    {
      "text": "淅川县",
      "value": "1593" },

    {
      "text": "社旗县",
      "value": "1594" },

    {
      "text": "新野县",
      "value": "1596" },

    {
      "text": "桐柏县",
      "value": "1597" },

    {
      "text": "邓州市",
      "value": "1598" },

    {
      "text": "宛城区",
      "value": "1586" },

    {
      "text": "镇平县",
      "value": "1591" },

    {
      "text": "唐河县",
      "value": "1595" }] },



  {
    "text": "商丘市",
    "value": "198",
    "children": [{
      "text": "睢阳区",
      "value": "1601" },

    {
      "text": "民权县",
      "value": "1602" },

    {
      "text": "睢县",
      "value": "1603" },

    {
      "text": "宁陵县",
      "value": "1604" },

    {
      "text": "虞城县",
      "value": "1606" },

    {
      "text": "夏邑县",
      "value": "1607" },

    {
      "text": "永城市",
      "value": "1608" },

    {
      "text": "梁园区",
      "value": "1600" },

    {
      "text": "柘城县",
      "value": "1605" }] },



  {
    "text": "信阳市",
    "value": "199",
    "children": [{
      "text": "平桥区",
      "value": "1611" },

    {
      "text": "罗山县",
      "value": "1612" },

    {
      "text": "光山县",
      "value": "1613" },

    {
      "text": "新县",
      "value": "1614" },

    {
      "text": "固始县",
      "value": "1616" },

    {
      "text": "潢川县",
      "value": "1617" },

    {
      "text": "淮滨县",
      "value": "1618" },

    {
      "text": "浉河区",
      "value": "1610" },

    {
      "text": "商城县",
      "value": "1615" },

    {
      "text": "息县",
      "value": "1619" }] },



  {
    "text": "驻马店市",
    "value": "201",
    "children": [{
      "text": "驿城区",
      "value": "1632" },

    {
      "text": "西平县",
      "value": "1633" },

    {
      "text": "上蔡县",
      "value": "1634" },

    {
      "text": "平舆县",
      "value": "1635" },

    {
      "text": "正阳县",
      "value": "1636" },

    {
      "text": "确山县",
      "value": "1637" },

    {
      "text": "泌阳县",
      "value": "1638" },

    {
      "text": "汝南县",
      "value": "1639" },

    {
      "text": "遂平县",
      "value": "1640" },

    {
      "text": "新蔡县",
      "value": "1641" }] },



  {
    "text": "济源市",
    "value": "202",
    "children": [{
      "text": "济源市",
      "value": "3201" }] },


  {
    "text": "洛阳市",
    "value": "187",
    "children": [{
      "text": "老城区",
      "value": "1492" },

    {
      "text": "西工区",
      "value": "1493" },

    {
      "text": "瀍河回族区",
      "value": "1494" },

    {
      "text": "涧西区",
      "value": "1495" },

    {
      "text": "吉利区",
      "value": "1496" },

    {
      "text": "洛龙区",
      "value": "1497" },

    {
      "text": "孟津县",
      "value": "1498" },

    {
      "text": "新安县",
      "value": "1499" },

    {
      "text": "栾川县",
      "value": "1500" },

    {
      "text": "嵩县",
      "value": "1501" },

    {
      "text": "汝阳县",
      "value": "1502" },

    {
      "text": "宜阳县",
      "value": "1503" },

    {
      "text": "洛宁县",
      "value": "1504" },

    {
      "text": "伊川县",
      "value": "1505" },

    {
      "text": "偃师市",
      "value": "1506" }] },



  {
    "text": "新乡市",
    "value": "191",
    "children": [{
      "text": "红旗区",
      "value": "1535" },

    {
      "text": "卫滨区",
      "value": "1536" },

    {
      "text": "牧野区",
      "value": "1538" },

    {
      "text": "新乡县",
      "value": "1539" },

    {
      "text": "获嘉县",
      "value": "1540" },

    {
      "text": "延津县",
      "value": "1542" },

    {
      "text": "封丘县",
      "value": "1543" },

    {
      "text": "长垣县",
      "value": "1544" },

    {
      "text": "卫辉市",
      "value": "1545" },

    {
      "text": "凤泉区",
      "value": "1537" },

    {
      "text": "原阳县",
      "value": "1541" },

    {
      "text": "辉县市",
      "value": "1546" }] },



  {
    "text": "三门峡市",
    "value": "196",
    "children": [{
      "text": "湖滨区",
      "value": "1579" },

    {
      "text": "渑池县",
      "value": "1580" },

    {
      "text": "卢氏县",
      "value": "1582" },

    {
      "text": "义马市",
      "value": "1583" },

    {
      "text": "灵宝市",
      "value": "1584" },

    {
      "text": "陕县",
      "value": "1581" }] },



  {
    "text": "周口市",
    "value": "200",
    "children": [{
      "text": "川汇区",
      "value": "1621" },

    {
      "text": "扶沟县",
      "value": "1622" },

    {
      "text": "西华县",
      "value": "1623" },

    {
      "text": "沈丘县",
      "value": "1625" },

    {
      "text": "郸城县",
      "value": "1626" },

    {
      "text": "淮阳县",
      "value": "1627" },

    {
      "text": "鹿邑县",
      "value": "1629" },

    {
      "text": "项城市",
      "value": "1630" },

    {
      "text": "商水县",
      "value": "1624" },

    {
      "text": "太康县",
      "value": "1628" }] }] },





{
  "text": "湖北省",
  "value": "17",
  "children": [{
    "text": "武汉市",
    "value": "203",
    "children": [{
      "text": "江岸区",
      "value": "1644" },

    {
      "text": "江汉区",
      "value": "1645" },

    {
      "text": "硚口区",
      "value": "1646" },

    {
      "text": "汉阳区",
      "value": "1647" },

    {
      "text": "武昌区",
      "value": "1648" },

    {
      "text": "青山区",
      "value": "1649" },

    {
      "text": "洪山区",
      "value": "1650" },

    {
      "text": "东西湖区",
      "value": "1651" },

    {
      "text": "汉南区",
      "value": "1652" },

    {
      "text": "蔡甸区",
      "value": "1653" },

    {
      "text": "江夏区",
      "value": "1654" },

    {
      "text": "黄陂区",
      "value": "1655" },

    {
      "text": "新洲区",
      "value": "1656" }] },



  {
    "text": "十堰市",
    "value": "205",
    "children": [{
      "text": "茅箭区",
      "value": "1665" },

    {
      "text": "张湾区",
      "value": "1666" },

    {
      "text": "郧县",
      "value": "1667" },

    {
      "text": "郧西县",
      "value": "1668" },

    {
      "text": "竹山县",
      "value": "1669" },

    {
      "text": "竹溪县",
      "value": "1670" },

    {
      "text": "房县",
      "value": "1671" },

    {
      "text": "丹江口市",
      "value": "1672" }] },



  {
    "text": "宜昌市",
    "value": "206",
    "children": [{
      "text": "西陵区",
      "value": "1674" },

    {
      "text": "伍家岗区",
      "value": "1675" },

    {
      "text": "点军区",
      "value": "1676" },

    {
      "text": "猇亭区",
      "value": "1677" },

    {
      "text": "夷陵区",
      "value": "1678" },

    {
      "text": "远安县",
      "value": "1679" },

    {
      "text": "兴山县",
      "value": "1680" },

    {
      "text": "秭归县",
      "value": "1681" },

    {
      "text": "长阳土家族自治县",
      "value": "1682" },

    {
      "text": "五峰土家族自治县",
      "value": "1683" },

    {
      "text": "宜都市",
      "value": "1684" },

    {
      "text": "当阳市",
      "value": "1685" },

    {
      "text": "枝江市",
      "value": "1686" }] },



  {
    "text": "襄樊市",
    "value": "207",
    "children": [{
      "text": "襄城区",
      "value": "1688" },

    {
      "text": "樊城区",
      "value": "1689" },

    {
      "text": "襄阳区",
      "value": "1690" },

    {
      "text": "南漳县",
      "value": "1691" },

    {
      "text": "谷城县",
      "value": "1692" },

    {
      "text": "保康县",
      "value": "1693" },

    {
      "text": "老河口市",
      "value": "1694" },

    {
      "text": "枣阳市",
      "value": "1695" },

    {
      "text": "宜城市",
      "value": "1696" }] },



  {
    "text": "鄂州市",
    "value": "208",
    "children": [{
      "text": "梁子湖区",
      "value": "1698" },

    {
      "text": "华容区",
      "value": "1699" },

    {
      "text": "鄂城区",
      "value": "1700" }] },



  {
    "text": "孝感市",
    "value": "210",
    "children": [{
      "text": "孝南区",
      "value": "1708" },

    {
      "text": "孝昌县",
      "value": "1709" },

    {
      "text": "大悟县",
      "value": "1710" },

    {
      "text": "云梦县",
      "value": "1711" },

    {
      "text": "应城市",
      "value": "1712" },

    {
      "text": "安陆市",
      "value": "1713" },

    {
      "text": "汉川市",
      "value": "1714" }] },



  {
    "text": "荆州市",
    "value": "211",
    "children": [{
      "text": "松滋市",
      "value": "1723" },

    {
      "text": "沙市区",
      "value": "1716" },

    {
      "text": "荆州区",
      "value": "1717" },

    {
      "text": "公安县",
      "value": "1718" },

    {
      "text": "监利县",
      "value": "1719" },

    {
      "text": "江陵县",
      "value": "1720" },

    {
      "text": "石首市",
      "value": "1721" },

    {
      "text": "洪湖市",
      "value": "1722" }] },



  {
    "text": "黄冈市",
    "value": "212",
    "children": [{
      "text": "黄州区",
      "value": "1725" },

    {
      "text": "团风县",
      "value": "1726" },

    {
      "text": "红安县",
      "value": "1727" },

    {
      "text": "罗田县",
      "value": "1728" },

    {
      "text": "英山县",
      "value": "1729" },

    {
      "text": "浠水县",
      "value": "1730" },

    {
      "text": "蕲春县",
      "value": "1731" },

    {
      "text": "黄梅县",
      "value": "1732" },

    {
      "text": "麻城市",
      "value": "1733" },

    {
      "text": "武穴市",
      "value": "1734" }] },



  {
    "text": "随州市",
    "value": "214",
    "children": [{
      "text": "曾都区",
      "value": "1743" },

    {
      "text": "随县",
      "value": "1744" },

    {
      "text": "广水市",
      "value": "1745" }] },



  {
    "text": "恩施土家族苗族自治州",
    "value": "215",
    "children": [{
      "text": "恩施市",
      "value": "1746" },

    {
      "text": "利川市",
      "value": "1747" },

    {
      "text": "建始县",
      "value": "1748" },

    {
      "text": "巴东县",
      "value": "1749" },

    {
      "text": "宣恩县",
      "value": "1750" },

    {
      "text": "咸丰县",
      "value": "1751" },

    {
      "text": "来凤县",
      "value": "1752" },

    {
      "text": "鹤峰县",
      "value": "1753" }] },



  {
    "text": "仙桃市",
    "value": "427",
    "children": [{
      "text": "仙桃市",
      "value": "3202" }] },


  {
    "text": "潜江市",
    "value": "428",
    "children": [{
      "text": "潜江市",
      "value": "3203" }] },


  {
    "text": "天门市",
    "value": "429",
    "children": [{
      "text": "天门市",
      "value": "3204" }] },


  {
    "text": "神农架林区",
    "value": "430",
    "children": [{
      "text": "神农架林区",
      "value": "3205" }] },


  {
    "text": "黄石市",
    "value": "204",
    "children": [{
      "text": "黄石港区",
      "value": "1658" },

    {
      "text": "西塞山区",
      "value": "1659" },

    {
      "text": "下陆区",
      "value": "1660" },

    {
      "text": "铁山区",
      "value": "1661" },

    {
      "text": "阳新县",
      "value": "1662" },

    {
      "text": "大冶市",
      "value": "1663" }] },



  {
    "text": "荆门市",
    "value": "209",
    "children": [{
      "text": "东宝区",
      "value": "1702" },

    {
      "text": "掇刀区",
      "value": "1703" },

    {
      "text": "京山县",
      "value": "1704" },

    {
      "text": "沙洋县",
      "value": "1705" },

    {
      "text": "钟祥市",
      "value": "1706" }] },



  {
    "text": "咸宁市",
    "value": "213",
    "children": [{
      "text": "咸安区",
      "value": "1736" },

    {
      "text": "嘉鱼县",
      "value": "1737" },

    {
      "text": "通城县",
      "value": "1738" },

    {
      "text": "崇阳县",
      "value": "1739" },

    {
      "text": "通山县",
      "value": "1740" },

    {
      "text": "赤壁市",
      "value": "1741" }] }] },





{
  "text": "湖南省",
  "value": "18",
  "children": [{
    "text": "长沙市",
    "value": "216",
    "children": [{
      "text": "芙蓉区",
      "value": "1759" },

    {
      "text": "天心区",
      "value": "1760" },

    {
      "text": "岳麓区",
      "value": "1761" },

    {
      "text": "开福区",
      "value": "1762" },

    {
      "text": "雨花区",
      "value": "1763" },

    {
      "text": "长沙县",
      "value": "1764" },

    {
      "text": "宁乡县",
      "value": "1766" },

    {
      "text": "浏阳市",
      "value": "1767" },

    {
      "text": "望城县",
      "value": "1765" }] },



  {
    "text": "株洲市",
    "value": "217",
    "children": [{
      "text": "荷塘区",
      "value": "1769" },

    {
      "text": "石峰区",
      "value": "1771" },

    {
      "text": "天元区",
      "value": "1772" },

    {
      "text": "株洲县",
      "value": "1773" },

    {
      "text": "茶陵县",
      "value": "1775" },

    {
      "text": "炎陵县",
      "value": "1776" },

    {
      "text": "醴陵市",
      "value": "1777" },

    {
      "text": "芦淞区",
      "value": "1770" },

    {
      "text": "攸县",
      "value": "1774" }] },



  {
    "text": "湘潭市",
    "value": "218",
    "children": [{
      "text": "岳塘区",
      "value": "1780" },

    {
      "text": "湘潭县",
      "value": "1781" },

    {
      "text": "湘乡市",
      "value": "1782" },

    {
      "text": "韶山市",
      "value": "1783" },

    {
      "text": "雨湖区",
      "value": "1779" }] },



  {
    "text": "衡阳市",
    "value": "219",
    "children": [{
      "text": "雁峰区",
      "value": "1786" },

    {
      "text": "石鼓区",
      "value": "1787" },

    {
      "text": "蒸湘区",
      "value": "1788" },

    {
      "text": "衡阳县",
      "value": "1790" },

    {
      "text": "衡南县",
      "value": "1791" },

    {
      "text": "衡山县",
      "value": "1792" },

    {
      "text": "衡东县",
      "value": "1793" },

    {
      "text": "耒阳市",
      "value": "1795" },

    {
      "text": "常宁市",
      "value": "1796" },

    {
      "text": "珠晖区",
      "value": "1785" },

    {
      "text": "南岳区",
      "value": "1789" },

    {
      "text": "祁东县",
      "value": "1794" }] },



  {
    "text": "邵阳市",
    "value": "220",
    "children": [{
      "text": "双清区",
      "value": "1798" },

    {
      "text": "北塔区",
      "value": "1800" },

    {
      "text": "邵东县",
      "value": "1801" },

    {
      "text": "新邵县",
      "value": "1802" },

    {
      "text": "邵阳县",
      "value": "1803" },

    {
      "text": "洞口县",
      "value": "1805" },

    {
      "text": "绥宁县",
      "value": "1806" },

    {
      "text": "新宁县",
      "value": "1807" },

    {
      "text": "武冈市",
      "value": "1809" },

    {
      "text": "大祥区",
      "value": "1799" },

    {
      "text": "隆回县",
      "value": "1804" },

    {
      "text": "城步苗族自治县",
      "value": "1808" }] },



  {
    "text": "岳阳市",
    "value": "221",
    "children": [{
      "text": "岳阳楼区",
      "value": "1811" },

    {
      "text": "云溪区",
      "value": "1812" },

    {
      "text": "君山区",
      "value": "1813" },

    {
      "text": "岳阳县",
      "value": "1814" },

    {
      "text": "湘阴县",
      "value": "1816" },

    {
      "text": "平江县",
      "value": "1817" },

    {
      "text": "汨罗市",
      "value": "1818" },

    {
      "text": "临湘市",
      "value": "1819" },

    {
      "text": "华容县",
      "value": "1815" }] },



  {
    "text": "常德市",
    "value": "222",
    "children": [{
      "text": "鼎城区",
      "value": "1822" },

    {
      "text": "安乡县",
      "value": "1823" },

    {
      "text": "汉寿县",
      "value": "1824" },

    {
      "text": "临澧县",
      "value": "1826" },

    {
      "text": "桃源县",
      "value": "1827" },

    {
      "text": "石门县",
      "value": "1828" },

    {
      "text": "武陵区",
      "value": "1821" },

    {
      "text": "澧县",
      "value": "1825" },

    {
      "text": "津市市",
      "value": "1829" }] },



  {
    "text": "张家界市",
    "value": "223",
    "children": [{
      "text": "永定区",
      "value": "1831" },

    {
      "text": "武陵源区",
      "value": "1832" },

    {
      "text": "慈利县",
      "value": "1833" },

    {
      "text": "桑植县",
      "value": "1834" }] },



  {
    "text": "益阳市",
    "value": "224",
    "children": [{
      "text": "资阳区",
      "value": "1836" },

    {
      "text": "赫山区",
      "value": "1837" },

    {
      "text": "南县",
      "value": "1838" },

    {
      "text": "桃江县",
      "value": "1839" },

    {
      "text": "沅江市",
      "value": "1841" },

    {
      "text": "安化县",
      "value": "1840" }] },



  {
    "text": "郴州市",
    "value": "225",
    "children": [{
      "text": "北湖区",
      "value": "1843" },

    {
      "text": "苏仙区",
      "value": "1844" },

    {
      "text": "宜章县",
      "value": "1846" },

    {
      "text": "永兴县",
      "value": "1847" },

    {
      "text": "嘉禾县",
      "value": "1848" },

    {
      "text": "临武县",
      "value": "1849" },

    {
      "text": "桂东县",
      "value": "1851" },

    {
      "text": "安仁县",
      "value": "1852" },

    {
      "text": "资兴市",
      "value": "1853" },

    {
      "text": "桂阳县",
      "value": "1845" },

    {
      "text": "汝城县",
      "value": "1850" }] },



  {
    "text": "永州市",
    "value": "226",
    "children": [{
      "text": "冷水滩区",
      "value": "1856" },

    {
      "text": "祁阳县",
      "value": "1857" },

    {
      "text": "东安县",
      "value": "1858" },

    {
      "text": "双牌县",
      "value": "1859" },

    {
      "text": "江永县",
      "value": "1861" },

    {
      "text": "宁远县",
      "value": "1862" },

    {
      "text": "蓝山县",
      "value": "1863" },

    {
      "text": "江华瑶族自治县",
      "value": "1865" },

    {
      "text": "零陵区",
      "value": "1855" },

    {
      "text": "道县",
      "value": "1860" },

    {
      "text": "新田县",
      "value": "1864" }] },



  {
    "text": "怀化市",
    "value": "227",
    "children": [{
      "text": "鹤城区",
      "value": "1867" },

    {
      "text": "中方县",
      "value": "1868" },

    {
      "text": "沅陵县",
      "value": "1869" },

    {
      "text": "辰溪县",
      "value": "1870" },

    {
      "text": "溆浦县",
      "value": "1871" },

    {
      "text": "会同县",
      "value": "1872" },

    {
      "text": "麻阳苗族自治县",
      "value": "1873" },

    {
      "text": "新晃侗族自治县",
      "value": "1874" },

    {
      "text": "芷江侗族自治县",
      "value": "1875" },

    {
      "text": "靖州苗族侗族自治县",
      "value": "1876" },

    {
      "text": "通道侗族自治县",
      "value": "1877" },

    {
      "text": "洪江市",
      "value": "1878" }] },



  {
    "text": "娄底市",
    "value": "228",
    "children": [{
      "text": "娄星区",
      "value": "1880" },

    {
      "text": "双峰县",
      "value": "1881" },

    {
      "text": "新化县",
      "value": "1882" },

    {
      "text": "冷水江市",
      "value": "1883" },

    {
      "text": "涟源市",
      "value": "1884" }] },



  {
    "text": "湘西土家族苗族自治州",
    "value": "229",
    "children": [{
      "text": "吉首市",
      "value": "1885" },

    {
      "text": "泸溪县",
      "value": "1886" },

    {
      "text": "凤凰县",
      "value": "1887" },

    {
      "text": "花垣县",
      "value": "1888" },

    {
      "text": "保靖县",
      "value": "1889" },

    {
      "text": "古丈县",
      "value": "1890" },

    {
      "text": "永顺县",
      "value": "1891" },

    {
      "text": "龙山县",
      "value": "1892" }] }] },





{
  "text": "广东省",
  "value": "19",
  "children": [{
    "text": "广州市",
    "value": "230",
    "children": [{
      "text": "荔湾区",
      "value": "1894" },

    {
      "text": "越秀区",
      "value": "1895" },

    {
      "text": "海珠区",
      "value": "1896" },

    {
      "text": "天河区",
      "value": "1897" },

    {
      "text": "白云区",
      "value": "1898" },

    {
      "text": "黄埔区",
      "value": "1899" },

    {
      "text": "番禺区",
      "value": "1900" },

    {
      "text": "花都区",
      "value": "1901" },

    {
      "text": "南沙区",
      "value": "1902" },

    // {
    // 	"text": "萝岗区",
    // 	"value": "1903"
    // },
    {
      "text": "增城市",
      "value": "1904" },

    {
      "text": "从化市",
      "value": "1905" }] },



  {
    "text": "韶关市",
    "value": "231",
    "children": [{
      "text": "武江区",
      "value": "1907" },

    {
      "text": "浈江区",
      "value": "1908" },

    {
      "text": "曲江区",
      "value": "1909" },

    {
      "text": "始兴县",
      "value": "1910" },

    {
      "text": "仁化县",
      "value": "1911" },

    {
      "text": "翁源县",
      "value": "1912" },

    {
      "text": "乳源瑶族自治县",
      "value": "1913" },

    {
      "text": "新丰县",
      "value": "1914" },

    {
      "text": "乐昌市",
      "value": "1915" },

    {
      "text": "南雄市",
      "value": "1916" }] },



  {
    "text": "深圳市",
    "value": "232",
    "children": [{
      "text": "罗湖区",
      "value": "1918" },

    {
      "text": "福田区",
      "value": "1919" },

    {
      "text": "南山区",
      "value": "1920" },

    {
      "text": "宝安区",
      "value": "1921" },

    {
      "text": "龙岗区",
      "value": "1922" },

    {
      "text": "盐田区",
      "value": "1923" }] },



  {
    "text": "珠海市",
    "value": "233",
    "children": [{
      "text": "香洲区",
      "value": "1925" },

    {
      "text": "斗门区",
      "value": "1926" },

    {
      "text": "金湾区",
      "value": "1927" }] },



  {
    "text": "汕头市",
    "value": "234",
    "children": [{
      "text": "龙湖区",
      "value": "1929" },

    {
      "text": "金平区",
      "value": "1930" },

    {
      "text": "濠江区",
      "value": "1931" },

    {
      "text": "潮阳区",
      "value": "1932" },

    {
      "text": "潮南区",
      "value": "1933" },

    {
      "text": "澄海区",
      "value": "1934" },

    {
      "text": "南澳县",
      "value": "1935" }] },



  {
    "text": "佛山市",
    "value": "235",
    "children": [{
      "text": "禅城区",
      "value": "1937" },

    {
      "text": "南海区",
      "value": "1938" },

    {
      "text": "顺德区",
      "value": "1939" },

    {
      "text": "三水区",
      "value": "1940" },

    {
      "text": "高明区",
      "value": "1941" }] },



  {
    "text": "江门市",
    "value": "236",
    "children": [{
      "text": "蓬江区",
      "value": "1943" },

    {
      "text": "江海区",
      "value": "1944" },

    {
      "text": "新会区",
      "value": "1945" },

    {
      "text": "台山市",
      "value": "1946" },

    {
      "text": "开平市",
      "value": "1947" },

    {
      "text": "鹤山市",
      "value": "1948" },

    {
      "text": "恩平市",
      "value": "1949" }] },



  {
    "text": "湛江市",
    "value": "237",
    "children": [{
      "text": "赤坎区",
      "value": "1951" },

    {
      "text": "霞山区",
      "value": "1952" },

    {
      "text": "坡头区",
      "value": "1953" },

    {
      "text": "麻章区",
      "value": "1954" },

    {
      "text": "遂溪县",
      "value": "1955" },

    {
      "text": "徐闻县",
      "value": "1956" },

    {
      "text": "廉江市",
      "value": "1957" },

    {
      "text": "雷州市",
      "value": "1958" },

    {
      "text": "吴川市",
      "value": "1959" }] },



  {
    "text": "茂名市",
    "value": "238",
    "children": [{
      "text": "茂南区",
      "value": "1961" },

    {
      "text": "茂港区",
      "value": "1962" },

    {
      "text": "电白县",
      "value": "1963" },

    {
      "text": "高州市",
      "value": "1964" },

    {
      "text": "化州市",
      "value": "1965" },

    {
      "text": "信宜市",
      "value": "1966" }] },



  {
    "text": "肇庆市",
    "value": "239",
    "children": [{
      "text": "端州区",
      "value": "1968" },

    {
      "text": "鼎湖区",
      "value": "1969" },

    {
      "text": "广宁县",
      "value": "1970" },

    {
      "text": "怀集县",
      "value": "1971" },

    {
      "text": "封开县",
      "value": "1972" },

    {
      "text": "德庆县",
      "value": "1973" },

    {
      "text": "高要市",
      "value": "1974" },

    {
      "text": "四会市",
      "value": "1975" }] },



  {
    "text": "惠州市",
    "value": "240",
    "children": [{
      "text": "惠城区",
      "value": "1977" },

    {
      "text": "惠阳区",
      "value": "1978" },

    {
      "text": "博罗县",
      "value": "1979" },

    {
      "text": "惠东县",
      "value": "1980" },

    {
      "text": "龙门县",
      "value": "1981" }] },



  {
    "text": "梅州市",
    "value": "241",
    "children": [{
      "text": "梅江区",
      "value": "1983" },

    {
      "text": "梅县",
      "value": "1984" },

    {
      "text": "大埔县",
      "value": "1985" },

    {
      "text": "丰顺县",
      "value": "1986" },

    {
      "text": "五华县",
      "value": "1987" },

    {
      "text": "平远县",
      "value": "1988" },

    {
      "text": "蕉岭县",
      "value": "1989" },

    {
      "text": "兴宁市",
      "value": "1990" }] },



  {
    "text": "汕尾市",
    "value": "242",
    "children": [{
      "text": "城区",
      "value": "1992" },

    {
      "text": "海丰县",
      "value": "1993" },

    {
      "text": "陆河县",
      "value": "1994" },

    {
      "text": "陆丰市",
      "value": "1995" }] },



  {
    "text": "河源市",
    "value": "243",
    "children": [{
      "text": "源城区",
      "value": "1997" },

    {
      "text": "紫金县",
      "value": "1998" },

    {
      "text": "龙川县",
      "value": "1999" },

    {
      "text": "和平县",
      "value": "2001" },

    {
      "text": "东源县",
      "value": "2002" },

    {
      "text": "连平县",
      "value": "2000" }] },



  {
    "text": "阳江市",
    "value": "244",
    "children": [{
      "text": "江城区",
      "value": "2004" },

    {
      "text": "阳东县",
      "value": "2006" },

    {
      "text": "阳春市",
      "value": "2007" },

    {
      "text": "阳西县",
      "value": "2005" }] },



  {
    "text": "清远市",
    "value": "245",
    "children": [{
      "text": "清城区",
      "value": "2009" },

    {
      "text": "佛冈县",
      "value": "2010" },

    {
      "text": "连山壮族瑶族自治县",
      "value": "2012" },

    {
      "text": "连南瑶族自治县",
      "value": "2013" },

    {
      "text": "清新县",
      "value": "2014" },

    {
      "text": "连州市",
      "value": "2016" },

    {
      "text": "阳山县",
      "value": "2011" },

    {
      "text": "英德市",
      "value": "2015" }] },



  {
    "text": "潮州市",
    "value": "246",
    "children": [{
      "text": "湘桥区",
      "value": "2018" },

    {
      "text": "潮安县",
      "value": "2019" },

    {
      "text": "饶平县",
      "value": "2020" }] },



  {
    "text": "揭阳市",
    "value": "247",
    "children": [{
      "text": "揭东县",
      "value": "2023" },

    {
      "text": "揭西县",
      "value": "2024" },

    {
      "text": "惠来县",
      "value": "2025" },

    {
      "text": "榕城区",
      "value": "2022" },

    {
      "text": "普宁市",
      "value": "2026" }] },



  {
    "text": "云浮市",
    "value": "248",
    "children": [{
      "text": "云城区",
      "value": "2028" },

    {
      "text": "新兴县",
      "value": "2029" },

    {
      "text": "郁南县",
      "value": "2030" },

    {
      "text": "云安县",
      "value": "2031" },

    {
      "text": "罗定市",
      "value": "2032" }] },



  {
    "text": "东莞市",
    "value": "450",
    "children": [{
      "text": "莞城区",
      "value": "3333" },

    {
      "text": "东城区",
      "value": "3334" },

    {
      "text": "南城区",
      "value": "3335" },

    {
      "text": "万江区",
      "value": "3336" }] },



  {
    "text": "中山市",
    "value": "451",
    "children": [{
      "text": "中山区(中山市)",
      "value": "3337" }] }] },




{
  "text": "广西壮族自治区",
  "value": "20",
  "children": [{
    "text": "南宁市",
    "value": "249",
    "children": [{
      "text": "兴宁区",
      "value": "2034" },

    {
      "text": "青秀区",
      "value": "2035" },

    {
      "text": "江南区",
      "value": "2036" },

    {
      "text": "良庆区",
      "value": "2038" },

    {
      "text": "邕宁区",
      "value": "2039" },

    {
      "text": "武鸣县",
      "value": "2040" },

    {
      "text": "隆安县",
      "value": "2041" },

    {
      "text": "上林县",
      "value": "2043" },

    {
      "text": "宾阳县",
      "value": "2044" },

    {
      "text": "横县",
      "value": "2045" },

    {
      "text": "西乡塘区",
      "value": "2037" },

    {
      "text": "马山县",
      "value": "2042" }] },



  {
    "text": "柳州市",
    "value": "250",
    "children": [{
      "text": "鱼峰区",
      "value": "2048" },

    {
      "text": "柳南区",
      "value": "2049" },

    {
      "text": "柳北区",
      "value": "2050" },

    {
      "text": "柳江县",
      "value": "2051" },

    {
      "text": "鹿寨县",
      "value": "2053" },

    {
      "text": "融安县",
      "value": "2054" },

    {
      "text": "融水苗族自治县",
      "value": "2055" },

    {
      "text": "城中区",
      "value": "2047" },

    {
      "text": "柳城县",
      "value": "2052" },

    {
      "text": "三江侗族自治县",
      "value": "2056" }] },



  {
    "text": "桂林市",
    "value": "251",
    "children": [{
      "text": "秀峰区",
      "value": "2058" },

    {
      "text": "叠彩区",
      "value": "2059" },

    {
      "text": "象山区",
      "value": "2060" },

    {
      "text": "七星区",
      "value": "2061" },

    {
      "text": "雁山区",
      "value": "2062" },

    {
      "text": "临桂县",
      "value": "2064" },

    {
      "text": "灵川县",
      "value": "2065" },

    {
      "text": "全州县",
      "value": "2066" },

    {
      "text": "兴安县",
      "value": "2067" },

    {
      "text": "灌阳县",
      "value": "2069" },

    {
      "text": "龙胜各族自治县",
      "value": "2070" },

    {
      "text": "资源县",
      "value": "2071" },

    {
      "text": "荔蒲县",
      "value": "2073" },

    {
      "text": "恭城瑶族自治县",
      "value": "2074" },

    {
      "text": "阳朔县",
      "value": "2063" },

    {
      "text": "永福县",
      "value": "2068" },

    {
      "text": "平乐县",
      "value": "2072" }] },



  {
    "text": "梧州市",
    "value": "252",
    "children": [{
      "text": "万秀区",
      "value": "2076" },

    {
      "text": "蝶山区",
      "value": "2077" },

    {
      "text": "苍梧县",
      "value": "2079" },

    {
      "text": "藤县",
      "value": "2080" },

    {
      "text": "蒙山县",
      "value": "2081" },

    {
      "text": "长洲区",
      "value": "2078" },

    {
      "text": "岑溪市",
      "value": "2082" }] },



  {
    "text": "北海市",
    "value": "253",
    "children": [{
      "text": "海城区",
      "value": "2084" },

    {
      "text": "银海区",
      "value": "2085" },

    {
      "text": "铁山港区",
      "value": "2086" },

    {
      "text": "合浦县",
      "value": "2087" }] },



  {
    "text": "防城港市",
    "value": "254",
    "children": [{
      "text": "港口区",
      "value": "2089" },

    {
      "text": "防城区",
      "value": "2090" },

    {
      "text": "上思县",
      "value": "2091" },

    {
      "text": "东兴市",
      "value": "2092" }] },



  {
    "text": "钦州市",
    "value": "255",
    "children": [{
      "text": "钦北区",
      "value": "2095" },

    {
      "text": "灵山县",
      "value": "2096" },

    {
      "text": "浦北县",
      "value": "2097" },

    {
      "text": "钦南区",
      "value": "2094" }] },



  {
    "text": "贵港市",
    "value": "256",
    "children": [{
      "text": "港北区",
      "value": "2099" },

    {
      "text": "港南区",
      "value": "2100" },

    {
      "text": "覃塘区",
      "value": "2101" },

    {
      "text": "平南县",
      "value": "2102" },

    {
      "text": "桂平市",
      "value": "2103" }] },



  {
    "text": "玉林市",
    "value": "257",
    "children": [{
      "text": "玉州区",
      "value": "2105" },

    {
      "text": "容县",
      "value": "2106" },

    {
      "text": "陆川县",
      "value": "2107" },

    {
      "text": "博白县",
      "value": "2108" },

    {
      "text": "兴业县",
      "value": "2109" },

    {
      "text": "北流市",
      "value": "2110" }] },



  {
    "text": "百色市",
    "value": "258",
    "children": [{
      "text": "右江区",
      "value": "2112" },

    {
      "text": "田阳县",
      "value": "2113" },

    {
      "text": "田东县",
      "value": "2114" },

    {
      "text": "平果县",
      "value": "2115" },

    {
      "text": "德保县",
      "value": "2116" },

    {
      "text": "靖西县",
      "value": "2117" },

    {
      "text": "那坡县",
      "value": "2118" },

    {
      "text": "凌云县",
      "value": "2119" },

    {
      "text": "乐业县",
      "value": "2120" },

    {
      "text": "田林县",
      "value": "2121" },

    {
      "text": "西林县",
      "value": "2122" },

    {
      "text": "隆林各族自治县",
      "value": "2123" }] },



  {
    "text": "贺州市",
    "value": "259",
    "children": [{
      "text": "八步区",
      "value": "2125" },

    {
      "text": "昭平县",
      "value": "2126" },

    {
      "text": "钟山县",
      "value": "2127" },

    {
      "text": "富川瑶族自治县",
      "value": "2128" }] },



  {
    "text": "河池市",
    "value": "260",
    "children": [{
      "text": "金城江区",
      "value": "2130" },

    {
      "text": "南丹县",
      "value": "2131" },

    {
      "text": "天峨县",
      "value": "2132" },

    {
      "text": "凤山县",
      "value": "2133" },

    {
      "text": "东兰县",
      "value": "2134" },

    {
      "text": "罗城仫佬族自治县",
      "value": "2135" },

    {
      "text": "环江毛南族自治县",
      "value": "2136" },

    {
      "text": "巴马瑶族自治县",
      "value": "2137" },

    {
      "text": "都安瑶族自治县",
      "value": "2138" },

    {
      "text": "大化瑶族自治县",
      "value": "2139" },

    {
      "text": "宜州市",
      "value": "2140" }] },



  {
    "text": "来宾市",
    "value": "261",
    "children": [{
      "text": "兴宾区",
      "value": "2142" },

    {
      "text": "忻城县",
      "value": "2143" },

    {
      "text": "象州县",
      "value": "2144" },

    {
      "text": "武宣县",
      "value": "2145" },

    {
      "text": "金秀瑶族自治县",
      "value": "2146" },

    {
      "text": "合山市",
      "value": "2147" }] },



  {
    "text": "崇左市",
    "value": "262",
    "children": [{
      "text": "江洲区",
      "value": "2149" },

    {
      "text": "扶绥县",
      "value": "2150" },

    {
      "text": "宁明县",
      "value": "2151" },

    {
      "text": "龙州县",
      "value": "2152" },

    {
      "text": "大新县",
      "value": "2153" },

    {
      "text": "天等县",
      "value": "2154" },

    {
      "text": "凭祥市",
      "value": "2155" }] }] },





{
  "text": "海南省",
  "value": "21",
  "children": [{
    "text": "海口市",
    "value": "263",
    "children": [{
      "text": "秀英区",
      "value": "2157" },

    {
      "text": "龙华区",
      "value": "2158" },

    {
      "text": "琼山区",
      "value": "2159" },

    {
      "text": "美兰区",
      "value": "2160" }] },



  {
    "text": "三亚市",
    "value": "264",
    "children": [{
      "text": "三亚市辖区",
      "value": "3226" }] },


  {
    "text": "五指山市",
    "value": "431",
    "children": [{
      "text": "五指山市",
      "value": "3206" }] },


  {
    "text": "琼海市",
    "value": "432",
    "children": [{
      "text": "琼海市",
      "value": "3207" }] },


  {
    "text": "儋州市",
    "value": "433",
    "children": [{
      "text": "儋州市",
      "value": "3208" }] },


  {
    "text": "文昌市",
    "value": "434",
    "children": [{
      "text": "文昌市",
      "value": "3209" }] },


  {
    "text": "万宁市",
    "value": "435",
    "children": [{
      "text": "万宁市",
      "value": "3210" }] },


  {
    "text": "东方市",
    "value": "436",
    "children": [{
      "text": "东方市",
      "value": "3211" }] },


  {
    "text": "定安县",
    "value": "437",
    "children": [{
      "text": "定安县",
      "value": "3212" }] },


  {
    "text": "屯昌县",
    "value": "438",
    "children": [{
      "text": "屯昌县",
      "value": "3213" }] },


  {
    "text": "澄迈县",
    "value": "439",
    "children": [{
      "text": "澄迈县",
      "value": "3214" }] },


  {
    "text": "临高县",
    "value": "440",
    "children": [{
      "text": "临高县",
      "value": "3215" }] },


  {
    "text": "白沙黎族自治县",
    "value": "441",
    "children": [{
      "text": "白沙黎族自治县",
      "value": "3216" }] },


  {
    "text": "昌江黎族自治县",
    "value": "442",
    "children": [{
      "text": "昌江黎族自治县",
      "value": "3217" }] },


  {
    "text": "乐东黎族自治县",
    "value": "443",
    "children": [{
      "text": "乐东黎族自治县",
      "value": "3218" }] },


  {
    "text": "陵水黎族自治县",
    "value": "444",
    "children": [{
      "text": "陵水黎族自治县",
      "value": "3219" }] },


  {
    "text": "保亭黎族苗族自治县",
    "value": "445",
    "children": [{
      "text": "保亭黎族苗族自治县",
      "value": "3220" }] },


  {
    "text": "琼中黎族苗族自治县",
    "value": "446",
    "children": [{
      "text": "琼中黎族苗族自治县",
      "value": "3221" }] },


  {
    "text": "西沙群岛",
    "value": "447",
    "children": [{
      "text": "西沙群岛",
      "value": "3222" }] },


  {
    "text": "南沙群岛",
    "value": "448",
    "children": [{
      "text": "南沙群岛",
      "value": "3223" }] },


  {
    "text": "中沙群岛的岛礁及其海域",
    "value": "449",
    "children": [{
      "text": "中沙群岛的岛礁及其海域",
      "value": "3224" }] },


  {
    "text": "三沙市",
    "value": "452",
    "children": [{
      "text": "三沙市辖区",
      "value": "3227" },

    {
      "text": "西沙群岛",
      "value": "3228" },

    {
      "text": "南沙群岛",
      "value": "3229" },

    {
      "text": "中沙群岛",
      "value": "3230" }] }] },





{
  "text": "重庆市",
  "value": "22",
  "children": [{
    "text": "重庆市",
    "value": "371",
    "children": [{
      "text": "万州区",
      "value": "3145" },

    {
      "text": "渝中区",
      "value": "373",
      "children": [{
        "text": "渝中区",
        "value": "3147" }] },


    {
      "text": "大渡口区",
      "value": "374",
      "children": [{
        "text": "大渡口区",
        "value": "3148" }] },


    {
      "text": "江北区",
      "value": "375",
      "children": [{
        "text": "江北区",
        "value": "3149" }] },


    {
      "text": "沙坪坝区",
      "value": "376",
      "children": [{
        "text": "沙坪坝区",
        "value": "3150" }] },


    {
      "text": "南岸区",
      "value": "378",
      "children": [{
        "text": "南岸区",
        "value": "3152" }] },


    {
      "text": "北碚区",
      "value": "379",
      "children": [{
        "text": "北碚区",
        "value": "3153" }] },


    {
      "text": "万盛区",
      "value": "380",
      "children": [{
        "text": "万盛区",
        "value": "3154" }] },


    {
      "text": "渝北区",
      "value": "382",
      "children": [{
        "text": "渝北区",
        "value": "3156" }] },


    {
      "text": "巴南区",
      "value": "383",
      "children": [{
        "text": "巴南区",
        "value": "3157" }] },


    {
      "text": "黔江区",
      "value": "384",
      "children": [{
        "text": "黔江区",
        "value": "3158" }] },


    {
      "text": "长寿区",
      "value": "385",
      "children": [{
        "text": "长寿区",
        "value": "3159" }] },


    {
      "text": "合川区",
      "value": "387",
      "children": [{
        "text": "合川区",
        "value": "3161" }] },


    {
      "text": "永川区",
      "value": "388",
      "children": [{
        "text": "永川区",
        "value": "3162" }] },


    {
      "text": "南川区",
      "value": "389",
      "children": [{
        "text": "南川区",
        "value": "3163" }] },


    {
      "text": "潼南县",
      "value": "391",
      "children": [{
        "text": "潼南县",
        "value": "3165" }] },


    {
      "text": "铜梁县",
      "value": "392",
      "children": [{
        "text": "铜梁县",
        "value": "3166" }] },


    {
      "text": "大足县",
      "value": "393",
      "children": [{
        "text": "大足县",
        "value": "3167" }] },


    {
      "text": "璧山县",
      "value": "395",
      "children": [{
        "text": "璧山县",
        "value": "3169" }] },


    {
      "text": "梁平县",
      "value": "396",
      "children": [{
        "text": "梁平县",
        "value": "3170" }] },


    {
      "text": "城口县",
      "value": "397",
      "children": [{
        "text": "城口县",
        "value": "3171" }] },


    {
      "text": "丰都县",
      "value": "398",
      "children": [{
        "text": "丰都县",
        "value": "3172" }] },


    {
      "text": "武隆县",
      "value": "400",
      "children": [{
        "text": "武隆县",
        "value": "3174" }] },


    {
      "text": "忠县",
      "value": "401",
      "children": [{
        "text": "忠县",
        "value": "3175" }] },


    {
      "text": "开县",
      "value": "402",
      "children": [{
        "text": "开县",
        "value": "3176" }] },


    {
      "text": "奉节县",
      "value": "404",
      "children": [{
        "text": "奉节县",
        "value": "3178" }] },


    {
      "text": "巫山县",
      "value": "405",
      "children": [{
        "text": "巫山县",
        "value": "3179" }] },


    {
      "text": "巫溪县",
      "value": "406",
      "children": [{
        "text": "巫溪县",
        "value": "3180" }] },


    {
      "text": "秀山土家族苗族自治县",
      "value": "408",
      "children": [{
        "text": "秀山土家族苗族自治县",
        "value": "3182" }] },


    {
      "text": "酉阳土家族苗族自治县",
      "value": "409",
      "children": [{
        "text": "酉阳土家族苗族自治县",
        "value": "3183" }] },


    {
      "text": "彭水苗族土家族自治县",
      "value": "410",
      "children": [{
        "text": "彭水苗族土家族自治县",
        "value": "3184" }] },


    {
      "text": "涪陵区",
      "value": "372",
      "children": [{
        "text": "涪陵区",
        "value": "3146" }] },


    {
      "text": "九龙坡区",
      "value": "377",
      "children": [{
        "text": "九龙坡区",
        "value": "3151" }] },


    {
      "text": "双桥区",
      "value": "381",
      "children": [{
        "text": "双桥区",
        "value": "3155" }] },


    {
      "text": "江津区",
      "value": "386",
      "children": [{
        "text": "江津区",
        "value": "3160" }] },


    {
      "text": "綦江县",
      "value": "390",
      "children": [{
        "text": "綦江县",
        "value": "3164" }] },


    {
      "text": "荣昌县",
      "value": "394",
      "children": [{
        "text": "荣昌县",
        "value": "3168" }] },


    {
      "text": "垫江县",
      "value": "399",
      "children": [{
        "text": "垫江县",
        "value": "3173" }] },


    {
      "text": "云阳县",
      "value": "403",
      "children": [{
        "text": "云阳县",
        "value": "3177" }] },


    {
      "text": "石柱土家族自治县",
      "value": "407",
      "children": [{
        "text": "石柱土家族自治县",
        "value": "3181" }] }] }] },







{
  "text": "四川省",
  "value": "23",
  "children": [{
    "text": "成都市",
    "value": "265",
    "children": [{
      "text": "锦江区",
      "value": "2222" },

    {
      "text": "青羊区",
      "value": "2223" },

    {
      "text": "金牛区",
      "value": "2224" },

    {
      "text": "武侯区",
      "value": "2225" },

    {
      "text": "成华区",
      "value": "2226" },

    {
      "text": "龙泉驿区",
      "value": "2227" },

    {
      "text": "青白江区",
      "value": "2228" },

    {
      "text": "新都区",
      "value": "2229" },

    {
      "text": "温江区",
      "value": "2230" },

    {
      "text": "金堂县",
      "value": "2231" },

    {
      "text": "双流县",
      "value": "2232" },

    {
      "text": "郫县",
      "value": "2233" },

    {
      "text": "大邑县",
      "value": "2234" },

    {
      "text": "蒲江县",
      "value": "2235" },

    {
      "text": "新津县",
      "value": "2236" },

    {
      "text": "都江堰市",
      "value": "2237" },

    {
      "text": "彭州市",
      "value": "2238" },

    {
      "text": "邛崃市",
      "value": "2239" },

    {
      "text": "崇州市",
      "value": "2240" }] },



  {
    "text": "自贡市",
    "value": "266",
    "children": [{
      "text": "自流井区",
      "value": "2242" },

    {
      "text": "贡井区",
      "value": "2243" },

    {
      "text": "大安区",
      "value": "2244" },

    {
      "text": "沿滩区",
      "value": "2245" },

    {
      "text": "荣县",
      "value": "2246" },

    {
      "text": "富顺县",
      "value": "2247" }] },



  {
    "text": "攀枝花市",
    "value": "267",
    "children": [{
      "text": "东区",
      "value": "2249" },

    {
      "text": "西区",
      "value": "2250" },

    {
      "text": "仁和区",
      "value": "2251" },

    {
      "text": "米易县",
      "value": "2252" },

    {
      "text": "盐边县",
      "value": "2253" }] },



  {
    "text": "泸州市",
    "value": "268",
    "children": [{
      "text": "江阳区",
      "value": "2255" },

    {
      "text": "纳溪区",
      "value": "2256" },

    {
      "text": "泸县",
      "value": "2258" },

    {
      "text": "合江县",
      "value": "2259" },

    {
      "text": "叙永县",
      "value": "2260" },

    {
      "text": "古蔺县",
      "value": "2261" }] },



  {
    "text": "德阳市",
    "value": "269",
    "children": [{
      "text": "旌阳区",
      "value": "2263" },

    {
      "text": "中江县",
      "value": "2264" },

    {
      "text": "罗江县",
      "value": "2265" },

    {
      "text": "广汉市",
      "value": "2266" },

    {
      "text": "什邡市",
      "value": "2267" },

    {
      "text": "绵竹市",
      "value": "2268" }] },



  {
    "text": "绵阳市",
    "value": "270",
    "children": [{
      "text": "涪城区",
      "value": "2270" },

    {
      "text": "游仙区",
      "value": "2271" },

    {
      "text": "三台县",
      "value": "2272" },

    {
      "text": "盐亭县",
      "value": "2273" },

    {
      "text": "安县",
      "value": "2274" },

    {
      "text": "梓潼县",
      "value": "2275" },

    {
      "text": "北川羌族自治县",
      "value": "2276" },

    {
      "text": "平武县",
      "value": "2277" },

    {
      "text": "江油市",
      "value": "2278" }] },



  {
    "text": "广元市",
    "value": "271",
    "children": [{
      "text": "利州区",
      "value": "2280" },

    {
      "text": "元坝区",
      "value": "2281" },

    {
      "text": "朝天区",
      "value": "2282" },

    {
      "text": "旺苍县",
      "value": "2283" },

    {
      "text": "青川县",
      "value": "2284" },

    {
      "text": "剑阁县",
      "value": "2285" },

    {
      "text": "苍溪县",
      "value": "2286" }] },



  {
    "text": "遂宁市",
    "value": "272",
    "children": [{
      "text": "安居区",
      "value": "2289" },

    {
      "text": "船山区",
      "value": "2288" },

    {
      "text": "蓬溪县",
      "value": "2290" },

    {
      "text": "射洪县",
      "value": "2291" },

    {
      "text": "大英县",
      "value": "2292" }] },



  {
    "text": "内江市",
    "value": "273",
    "children": [{
      "text": "东兴区",
      "value": "2295" },

    {
      "text": "市中区",
      "value": "2294" },

    {
      "text": "威远县",
      "value": "2296" },

    {
      "text": "资中县",
      "value": "2297" },

    {
      "text": "隆昌县",
      "value": "2298" }] },



  {
    "text": "乐山市",
    "value": "274",
    "children": [{
      "text": "夹江县",
      "value": "2306" },

    {
      "text": "沐川县",
      "value": "2307" },

    {
      "text": "峨边彝族自治县",
      "value": "2308" },

    {
      "text": "峨眉山市",
      "value": "2310" },

    {
      "text": "市中区",
      "value": "2300" },

    {
      "text": "井研县",
      "value": "2305" },

    {
      "text": "马边彝族自治县",
      "value": "2309" },

    {
      "text": "沙湾区",
      "value": "2301" },

    {
      "text": "五通桥区",
      "value": "2302" },

    {
      "text": "金口河区",
      "value": "2303" },

    {
      "text": "犍为县",
      "value": "2304" }] },



  {
    "text": "南充市",
    "value": "275",
    "children": [{
      "text": "顺庆区",
      "value": "2312" },

    {
      "text": "高坪区",
      "value": "2313" },

    {
      "text": "嘉陵区",
      "value": "2314" },

    {
      "text": "南部县",
      "value": "2315" },

    {
      "text": "蓬安县",
      "value": "2317" },

    {
      "text": "仪陇县",
      "value": "2318" },

    {
      "text": "西充县",
      "value": "2319" },

    {
      "text": "阆中市",
      "value": "2320" },

    {
      "text": "营山县",
      "value": "2316" }] },



  {
    "text": "眉山市",
    "value": "276",
    "children": [{
      "text": "仁寿县",
      "value": "2323" },

    {
      "text": "彭山县",
      "value": "2324" },

    {
      "text": "洪雅县",
      "value": "2325" },

    {
      "text": "青神县",
      "value": "2327" },

    {
      "text": "东坡区",
      "value": "2322" },

    {
      "text": "丹棱县",
      "value": "2326" }] },



  {
    "text": "宜宾市",
    "value": "277",
    "children": [{
      "text": "翠屏区",
      "value": "2329" },

    {
      "text": "宜宾县",
      "value": "2330" },

    {
      "text": "江安县",
      "value": "2332" },

    {
      "text": "长宁县",
      "value": "2333" },

    {
      "text": "高县",
      "value": "2334" },

    {
      "text": "珙县",
      "value": "2335" },

    {
      "text": "兴文县",
      "value": "2337" },

    {
      "text": "屏山县",
      "value": "2338" },

    {
      "text": "南溪县",
      "value": "2331" },

    {
      "text": "筠连县",
      "value": "2336" }] },



  {
    "text": "广安市",
    "value": "278",
    "children": [{
      "text": "广安区",
      "value": "2340" },

    {
      "text": "武胜县",
      "value": "2342" },

    {
      "text": "邻水县",
      "value": "2343" },

    {
      "text": "华蓥市",
      "value": "2344" },

    {
      "text": "岳池县",
      "value": "2341" }] },



  {
    "text": "达州市",
    "value": "279",
    "children": [{
      "text": "通川区",
      "value": "2346" },

    {
      "text": "宣汉县",
      "value": "2348" },

    {
      "text": "开江县",
      "value": "2349" },

    {
      "text": "大竹县",
      "value": "2350" },

    {
      "text": "万源市",
      "value": "2352" },

    {
      "text": "达县",
      "value": "2347" },

    {
      "text": "渠县",
      "value": "2351" }] },



  {
    "text": "雅安市",
    "value": "280",
    "children": [{
      "text": "雨城区",
      "value": "2354" },

    {
      "text": "名山县",
      "value": "2355" },

    {
      "text": "汉源县",
      "value": "2357" },

    {
      "text": "石棉县",
      "value": "2358" },

    {
      "text": "天全县",
      "value": "2359" },

    {
      "text": "宝兴县",
      "value": "2361" },

    {
      "text": "荥经县",
      "value": "2356" },

    {
      "text": "芦山县",
      "value": "2360" }] },



  {
    "text": "巴中市",
    "value": "281",
    "children": [{
      "text": "巴州区",
      "value": "2363" },

    {
      "text": "通江县",
      "value": "2364" },

    {
      "text": "南江县",
      "value": "2365" },

    {
      "text": "平昌县",
      "value": "2366" }] },



  {
    "text": "资阳市",
    "value": "282",
    "children": [{
      "text": "雁江区",
      "value": "2368" },

    {
      "text": "安岳县",
      "value": "2369" },

    {
      "text": "乐至县",
      "value": "2370" },

    {
      "text": "简阳市",
      "value": "2371" }] },



  {
    "text": "阿坝藏族羌族自治州",
    "value": "283",
    "children": [{
      "text": "汶川县",
      "value": "2372" },

    {
      "text": "理县",
      "value": "2373" },

    {
      "text": "茂县",
      "value": "2374" },

    {
      "text": "九寨沟县",
      "value": "2376" },

    {
      "text": "金川县",
      "value": "2377" },

    {
      "text": "小金县",
      "value": "2378" },

    {
      "text": "黑水县",
      "value": "2379" },

    {
      "text": "壤塘县",
      "value": "2381" },

    {
      "text": "阿坝县",
      "value": "2382" },

    {
      "text": "若尔盖县",
      "value": "2383" },

    {
      "text": "红原县",
      "value": "2384" },

    {
      "text": "松潘县",
      "value": "2375" },

    {
      "text": "马尔康县",
      "value": "2380" }] },



  {
    "text": "甘孜藏族自治州",
    "value": "284",
    "children": [{
      "text": "康定县",
      "value": "2385" },

    {
      "text": "泸定县",
      "value": "2386" },

    {
      "text": "丹巴县",
      "value": "2387" },

    {
      "text": "九龙县",
      "value": "2388" },

    {
      "text": "雅江县",
      "value": "2389" },

    {
      "text": "道孚县",
      "value": "2390" },

    {
      "text": "炉霍县",
      "value": "2391" },

    {
      "text": "甘孜县",
      "value": "2392" },

    {
      "text": "新龙县",
      "value": "2393" },

    {
      "text": "德格县",
      "value": "2394" },

    {
      "text": "白玉县",
      "value": "2395" },

    {
      "text": "石渠县",
      "value": "2396" },

    {
      "text": "色达县",
      "value": "2397" },

    {
      "text": "理塘县",
      "value": "2398" },

    {
      "text": "巴塘县",
      "value": "2399" },

    {
      "text": "乡城县",
      "value": "2400" },

    {
      "text": "稻城县",
      "value": "2401" },

    {
      "text": "得荣县",
      "value": "2402" }] },



  {
    "text": "凉山彝族自治州",
    "value": "285",
    "children": [{
      "text": "西昌市",
      "value": "2403" },

    {
      "text": "木里藏族自治县",
      "value": "2404" },

    {
      "text": "盐源县",
      "value": "2405" },

    {
      "text": "德昌县",
      "value": "2406" },

    {
      "text": "会理县",
      "value": "2407" },

    {
      "text": "会东县",
      "value": "2408" },

    {
      "text": "宁南县",
      "value": "2409" },

    {
      "text": "普格县",
      "value": "2410" },

    {
      "text": "布拖县",
      "value": "2411" },

    {
      "text": "金阳县",
      "value": "2412" },

    {
      "text": "昭觉县",
      "value": "2413" },

    {
      "text": "喜德县",
      "value": "2414" },

    {
      "text": "冕宁县",
      "value": "2415" },

    {
      "text": "越西县",
      "value": "2416" },

    {
      "text": "甘洛县",
      "value": "2417" },

    {
      "text": "美姑县",
      "value": "2418" },

    {
      "text": "雷波县",
      "value": "2419" }] }] },





{
  "text": "贵州省",
  "value": "24",
  "children": [{
    "text": "贵阳市",
    "value": "286",
    "children": [{
      "text": "南明区",
      "value": "2421" },

    {
      "text": "云岩区",
      "value": "2422" },

    {
      "text": "花溪区",
      "value": "2423" },

    {
      "text": "乌当区",
      "value": "2424" },

    {
      "text": "白云区",
      "value": "2425" },

    {
      "text": "小河区",
      "value": "2426" },

    {
      "text": "开阳县",
      "value": "2427" },

    {
      "text": "息烽县",
      "value": "2428" },

    {
      "text": "修文县",
      "value": "2429" },

    {
      "text": "清镇市",
      "value": "2430" }] },



  {
    "text": "六盘水市",
    "value": "287",
    "children": [{
      "text": "钟山区",
      "value": "2431" },

    {
      "text": "六枝特区",
      "value": "2432" },

    {
      "text": "水城县",
      "value": "2433" },

    {
      "text": "盘县",
      "value": "2434" }] },



  {
    "text": "遵义市",
    "value": "288",
    "children": [{
      "text": "红花岗区",
      "value": "2436" },

    {
      "text": "汇川区",
      "value": "2437" },

    {
      "text": "遵义县",
      "value": "2438" },

    {
      "text": "桐梓县",
      "value": "2439" },

    {
      "text": "绥阳县",
      "value": "2440" },

    {
      "text": "正安县",
      "value": "2441" },

    {
      "text": "道真仡佬族苗族自治县",
      "value": "2442" },

    {
      "text": "务川仡佬族苗族自治县",
      "value": "2443" },

    {
      "text": "凤冈县",
      "value": "2444" },

    {
      "text": "湄潭县",
      "value": "2445" },

    {
      "text": "余庆县",
      "value": "2446" },

    {
      "text": "习水县",
      "value": "2447" },

    {
      "text": "赤水市",
      "value": "2448" },

    {
      "text": "仁怀市",
      "value": "2449" }] },



  {
    "text": "安顺市",
    "value": "289",
    "children": [{
      "text": "西秀区",
      "value": "2451" },

    {
      "text": "平坝县",
      "value": "2452" },

    {
      "text": "普定县",
      "value": "2453" },

    {
      "text": "镇宁布依族苗族自治县",
      "value": "2454" },

    {
      "text": "关岭布依族苗族自治县",
      "value": "2455" },

    {
      "text": "紫云苗族布依族自治县",
      "value": "2456" }] },



  {
    "text": "铜仁地区",
    "value": "290",
    "children": [{
      "text": "铜仁市",
      "value": "2457" },

    {
      "text": "江口县",
      "value": "2458" },

    {
      "text": "玉屏侗族自治县",
      "value": "2459" },

    {
      "text": "石阡县",
      "value": "2460" },

    {
      "text": "思南县",
      "value": "2461" },

    {
      "text": "印江土家族苗族自治县",
      "value": "2462" },

    {
      "text": "德江县",
      "value": "2463" },

    {
      "text": "沿河土家族自治县",
      "value": "2464" },

    {
      "text": "松桃苗族自治县",
      "value": "2465" },

    {
      "text": "万山特区",
      "value": "2466" }] },



  {
    "text": "黔西南布依族苗族自治州",
    "value": "291",
    "children": [{
      "text": "兴义市",
      "value": "2467" },

    {
      "text": "兴仁县",
      "value": "2468" },

    {
      "text": "普安县",
      "value": "2469" },

    {
      "text": "晴隆县",
      "value": "2470" },

    {
      "text": "贞丰县",
      "value": "2471" },

    {
      "text": "望谟县",
      "value": "2472" },

    {
      "text": "册亨县",
      "value": "2473" },

    {
      "text": "安龙县",
      "value": "2474" }] },



  {
    "text": "毕节地区",
    "value": "292",
    "children": [{
      "text": "毕节市",
      "value": "2475" },

    {
      "text": "大方县",
      "value": "2476" },

    {
      "text": "黔西县",
      "value": "2477" },

    {
      "text": "金沙县",
      "value": "2478" },

    {
      "text": "织金县",
      "value": "2479" },

    {
      "text": "纳雍县",
      "value": "2480" },

    {
      "text": "威宁彝族回族苗族自治县",
      "value": "2481" },

    {
      "text": "赫章县",
      "value": "2482" }] },



  {
    "text": "黔东南苗族侗族自治州",
    "value": "293",
    "children": [{
      "text": "凯里市",
      "value": "2483" },

    {
      "text": "黄平县",
      "value": "2484" },

    {
      "text": "施秉县",
      "value": "2485" },

    {
      "text": "三穗县",
      "value": "2486" },

    {
      "text": "镇远县",
      "value": "2487" },

    {
      "text": "岑巩县",
      "value": "2488" },

    {
      "text": "天柱县",
      "value": "2489" },

    {
      "text": "锦屏县",
      "value": "2490" },

    {
      "text": "剑河县",
      "value": "2491" },

    {
      "text": "台江县",
      "value": "2492" },

    {
      "text": "黎平县",
      "value": "2493" },

    {
      "text": "榕江县",
      "value": "2494" },

    {
      "text": "从江县",
      "value": "2495" },

    {
      "text": "雷山县",
      "value": "2496" },

    {
      "text": "麻江县",
      "value": "2497" },

    {
      "text": "丹寨县",
      "value": "2498" }] },



  {
    "text": "黔南布依族苗族自治州",
    "value": "294",
    "children": [{
      "text": "都匀市",
      "value": "2499" },

    {
      "text": "福泉市",
      "value": "2500" },

    {
      "text": "荔波县",
      "value": "2501" },

    {
      "text": "贵定县",
      "value": "2502" },

    {
      "text": "瓮安县",
      "value": "2503" },

    {
      "text": "独山县",
      "value": "2504" },

    {
      "text": "平塘县",
      "value": "2505" },

    {
      "text": "长顺县",
      "value": "2507" },

    {
      "text": "龙里县",
      "value": "2508" },

    {
      "text": "惠水县",
      "value": "2509" },

    {
      "text": "三都水族自治县",
      "value": "2510" },

    {
      "text": "罗甸县",
      "value": "2506" }] }] },





{
  "text": "云南省",
  "value": "25",
  "children": [{
    "text": "昆明市",
    "value": "295",
    "children": [{
      "text": "盘龙区",
      "value": "2513" },

    {
      "text": "官渡区",
      "value": "2514" },

    {
      "text": "西山区",
      "value": "2515" },

    {
      "text": "呈贡县",
      "value": "2517" },

    {
      "text": "晋宁县",
      "value": "2518" },

    {
      "text": "富民县",
      "value": "2519" },

    {
      "text": "宜良县",
      "value": "2520" },

    {
      "text": "嵩明县",
      "value": "2522" },

    {
      "text": "禄劝彝族苗族自治县",
      "value": "2523" },

    {
      "text": "寻甸回族彝族自治县",
      "value": "2524" },

    {
      "text": "安宁市",
      "value": "2525" },

    {
      "text": "五华区",
      "value": "2512" },

    {
      "text": "东川区",
      "value": "2516" },

    {
      "text": "石林彝族自治县",
      "value": "2521" }] },



  {
    "text": "曲靖市",
    "value": "296",
    "children": [{
      "text": "麒麟区",
      "value": "2527" },

    {
      "text": "陆良县",
      "value": "2529" },

    {
      "text": "师宗县",
      "value": "2530" },

    {
      "text": "罗平县",
      "value": "2531" },

    {
      "text": "会泽县",
      "value": "2533" },

    {
      "text": "沾益县",
      "value": "2534" },

    {
      "text": "宣威市",
      "value": "2535" },

    {
      "text": "马龙县",
      "value": "2528" },

    {
      "text": "富源县",
      "value": "2532" }] },



  {
    "text": "玉溪市",
    "value": "297",
    "children": [{
      "text": "红塔区",
      "value": "2537" },

    {
      "text": "澄江县",
      "value": "2539" },

    {
      "text": "通海县",
      "value": "2540" },

    {
      "text": "华宁县",
      "value": "2541" },

    {
      "text": "峨山彝族自治县",
      "value": "2543" },

    {
      "text": "新平彝族傣族自治县",
      "value": "2544" },

    {
      "text": "元江哈尼族彝族傣族自治县",
      "value": "2545" },

    {
      "text": "江川县",
      "value": "2538" },

    {
      "text": "易门县",
      "value": "2542" }] },



  {
    "text": "保山市",
    "value": "298",
    "children": [{
      "text": "施甸县",
      "value": "2548" },

    {
      "text": "腾冲县",
      "value": "2549" },

    {
      "text": "龙陵县",
      "value": "2550" },

    {
      "text": "昌宁县",
      "value": "2551" },

    {
      "text": "隆阳区",
      "value": "2547" }] },



  {
    "text": "昭通市",
    "value": "299",
    "children": [{
      "text": "鲁甸县",
      "value": "2554" },

    {
      "text": "巧家县",
      "value": "2555" },

    {
      "text": "盐津县",
      "value": "2556" },

    {
      "text": "永善县",
      "value": "2558" },

    {
      "text": "绥江县",
      "value": "2559" },

    {
      "text": "镇雄县",
      "value": "2560" },

    {
      "text": "彝良县",
      "value": "2561" },

    {
      "text": "水富县",
      "value": "2563" },

    {
      "text": "昭阳区",
      "value": "2553" },

    {
      "text": "大关县",
      "value": "2557" },

    {
      "text": "威信县",
      "value": "2562" }] },



  {
    "text": "丽江市",
    "value": "300",
    "children": [{
      "text": "古城区",
      "value": "2565" },

    {
      "text": "玉龙纳西族自治县",
      "value": "2566" },

    {
      "text": "华坪县",
      "value": "2568" },

    {
      "text": "宁蒗彝族自治县",
      "value": "2569" },

    {
      "text": "永胜县",
      "value": "2567" }] },



  {
    "text": "普洱市",
    "value": "301",
    "children": [{
      "text": "思茅区",
      "value": "2571" },

    {
      "text": "墨江哈尼族自治县",
      "value": "2573" },

    {
      "text": "景东彝族自治县",
      "value": "2574" },

    {
      "text": "景谷傣族彝族自治县",
      "value": "2575" },

    {
      "text": "镇沅彝族哈尼族拉祜族自治县",
      "value": "2576" },

    {
      "text": "江城哈尼族彝族自治县",
      "value": "2577" },

    {
      "text": "孟连傣族拉祜族佤族自治县",
      "value": "2578" },

    {
      "text": "澜沧拉祜族自治县",
      "value": "2579" },

    {
      "text": "宁洱哈尼族彝族自治县",
      "value": "2572" },

    {
      "text": "西盟佤族自治县",
      "value": "2580" }] },



  {
    "text": "临沧市",
    "value": "302",
    "children": [{
      "text": "双江拉祜族佤族布朗族傣族自治县",
      "value": "2587" },

    {
      "text": "耿马傣族佤族自治县",
      "value": "2588" },

    {
      "text": "沧源佤族自治县",
      "value": "2589" },

    {
      "text": "临翔区",
      "value": "2582" },

    {
      "text": "凤庆县",
      "value": "2583" },

    {
      "text": "云县",
      "value": "2584" },

    {
      "text": "永德县",
      "value": "2585" },

    {
      "text": "镇康县",
      "value": "2586" }] },



  {
    "text": "楚雄彝族自治州",
    "value": "303",
    "children": [{
      "text": "楚雄市",
      "value": "2590" },

    {
      "text": "双柏县",
      "value": "2591" },

    {
      "text": "牟定县",
      "value": "2592" },

    {
      "text": "南华县",
      "value": "2593" },

    {
      "text": "姚安县",
      "value": "2594" },

    {
      "text": "大姚县",
      "value": "2595" },

    {
      "text": "永仁县",
      "value": "2596" },

    {
      "text": "元谋县",
      "value": "2597" },

    {
      "text": "武定县",
      "value": "2598" },

    {
      "text": "禄丰县",
      "value": "2599" }] },



  {
    "text": "红河哈尼族彝族自治州",
    "value": "304",
    "children": [{
      "text": "河口瑶族自治县",
      "value": "2612" },

    {
      "text": "个旧市",
      "value": "2600" },

    {
      "text": "开远市",
      "value": "2601" },

    {
      "text": "蒙自县",
      "value": "2602" },

    {
      "text": "屏边苗族自治县",
      "value": "2603" },

    {
      "text": "建水县",
      "value": "2604" },

    {
      "text": "石屏县",
      "value": "2605" },

    {
      "text": "弥勒县",
      "value": "2606" },

    {
      "text": "泸西县",
      "value": "2607" },

    {
      "text": "元阳县",
      "value": "2608" },

    {
      "text": "红河县",
      "value": "2609" },

    {
      "text": "金平苗族瑶族傣族自治县",
      "value": "2610" },

    {
      "text": "绿春县",
      "value": "2611" }] },



  {
    "text": "文山壮族苗族自治州",
    "value": "305",
    "children": [{
      "text": "文山县",
      "value": "2613" },

    {
      "text": "砚山县",
      "value": "2614" },

    {
      "text": "西畴县",
      "value": "2615" },

    {
      "text": "麻栗坡县",
      "value": "2616" },

    {
      "text": "马关县",
      "value": "2617" },

    {
      "text": "丘北县",
      "value": "2618" },

    {
      "text": "广南县",
      "value": "2619" },

    {
      "text": "富宁县",
      "value": "2620" }] },



  {
    "text": "西双版纳傣族自治州",
    "value": "306",
    "children": [{
      "text": "景洪市",
      "value": "2621" },

    {
      "text": "勐海县",
      "value": "2622" },

    {
      "text": "勐腊县",
      "value": "2623" }] },



  {
    "text": "大理白族自治州",
    "value": "307",
    "children": [{
      "text": "大理市",
      "value": "2624" },

    {
      "text": "漾濞彝族自治县",
      "value": "2625" },

    {
      "text": "祥云县",
      "value": "2626" },

    {
      "text": "宾川县",
      "value": "2627" },

    {
      "text": "弥渡县",
      "value": "2628" },

    {
      "text": "南涧彝族自治县",
      "value": "2629" },

    {
      "text": "巍山彝族回族自治县",
      "value": "2630" },

    {
      "text": "永平县",
      "value": "2631" },

    {
      "text": "云龙县",
      "value": "2632" },

    {
      "text": "洱源县",
      "value": "2633" },

    {
      "text": "剑川县",
      "value": "2634" },

    {
      "text": "鹤庆县",
      "value": "2635" }] },



  {
    "text": "德宏傣族景颇族自治州",
    "value": "308",
    "children": [{
      "text": "瑞丽市",
      "value": "2636" },

    {
      "text": "潞西市",
      "value": "2637" },

    {
      "text": "梁河县",
      "value": "2638" },

    {
      "text": "盈江县",
      "value": "2639" },

    {
      "text": "陇川县",
      "value": "2640" }] },



  {
    "text": "怒江傈僳族自治州",
    "value": "309",
    "children": [{
      "text": "泸水县",
      "value": "2641" },

    {
      "text": "福贡县",
      "value": "2642" },

    {
      "text": "贡山独龙族怒族自治县",
      "value": "2643" },

    {
      "text": "兰坪白族普米族自治县",
      "value": "2644" }] },



  {
    "text": "迪庆藏族自治州",
    "value": "310",
    "children": [{
      "text": "香格里拉县",
      "value": "2645" },

    {
      "text": "德钦县",
      "value": "2646" },

    {
      "text": "维西傈僳族自治县",
      "value": "2647" }] }] },





{
  "text": "西藏自治区",
  "value": "26",
  "children": [{
    "text": "拉萨市",
    "value": "311",
    "children": [{
      "text": "城关区",
      "value": "2649" },

    {
      "text": "林周县",
      "value": "2650" },

    {
      "text": "当雄县",
      "value": "2651" },

    {
      "text": "尼木县",
      "value": "2652" },

    {
      "text": "曲水县",
      "value": "2653" },

    {
      "text": "堆龙德庆县",
      "value": "2654" },

    {
      "text": "达孜县",
      "value": "2655" },

    {
      "text": "墨竹工卡县",
      "value": "2656" }] },



  {
    "text": "昌都地区",
    "value": "312",
    "children": [{
      "text": "昌都县",
      "value": "2657" },

    {
      "text": "江达县",
      "value": "2658" },

    {
      "text": "贡觉县",
      "value": "2659" },

    {
      "text": "类乌齐县",
      "value": "2660" },

    {
      "text": "丁青县",
      "value": "2661" },

    {
      "text": "察雅县",
      "value": "2662" },

    {
      "text": "八宿县",
      "value": "2663" },

    {
      "text": "左贡县",
      "value": "2664" },

    {
      "text": "芒康县",
      "value": "2665" },

    {
      "text": "洛隆县",
      "value": "2666" },

    {
      "text": "边坝县",
      "value": "2667" }] },



  {
    "text": "山南地区",
    "value": "313",
    "children": [{
      "text": "乃东县",
      "value": "2668" },

    {
      "text": "扎囊县",
      "value": "2669" },

    {
      "text": "贡嘎县",
      "value": "2670" },

    {
      "text": "桑日县",
      "value": "2671" },

    {
      "text": "琼结县",
      "value": "2672" },

    {
      "text": "曲松县",
      "value": "2673" },

    {
      "text": "措美县",
      "value": "2674" },

    {
      "text": "洛扎县",
      "value": "2675" },

    {
      "text": "加查县",
      "value": "2676" },

    {
      "text": "隆子县",
      "value": "2677" },

    {
      "text": "错那县",
      "value": "2678" },

    {
      "text": "浪卡子县",
      "value": "2679" }] },



  {
    "text": "日喀则地区",
    "value": "314",
    "children": [{
      "text": "日喀则市",
      "value": "2680" },

    {
      "text": "南木林县",
      "value": "2681" },

    {
      "text": "江孜县",
      "value": "2682" },

    {
      "text": "定日县",
      "value": "2683" },

    {
      "text": "萨迦县",
      "value": "2684" },

    {
      "text": "拉孜县",
      "value": "2685" },

    {
      "text": "昂仁县",
      "value": "2686" },

    {
      "text": "谢通门县",
      "value": "2687" },

    {
      "text": "白朗县",
      "value": "2688" },

    {
      "text": "仁布县",
      "value": "2689" },

    {
      "text": "康马县",
      "value": "2690" },

    {
      "text": "定结县",
      "value": "2691" },

    {
      "text": "仲巴县",
      "value": "2692" },

    {
      "text": "亚东县",
      "value": "2693" },

    {
      "text": "吉隆县",
      "value": "2694" },

    {
      "text": "聂拉木县",
      "value": "2695" },

    {
      "text": "萨嘎县",
      "value": "2696" },

    {
      "text": "岗巴县",
      "value": "2697" }] },



  {
    "text": "那曲地区",
    "value": "315",
    "children": [{
      "text": "那曲县",
      "value": "2698" },

    {
      "text": "嘉黎县",
      "value": "2699" },

    {
      "text": "比如县",
      "value": "2700" },

    {
      "text": "聂荣县",
      "value": "2701" },

    {
      "text": "安多县",
      "value": "2702" },

    {
      "text": "索县",
      "value": "2704" },

    {
      "text": "班戈县",
      "value": "2705" },

    {
      "text": "巴青县",
      "value": "2706" },

    {
      "text": "尼玛县",
      "value": "2707" },

    {
      "text": "申扎县",
      "value": "2703" }] },



  {
    "text": "阿里地区",
    "value": "316",
    "children": [{
      "text": "札达县",
      "value": "2709" },

    {
      "text": "噶尔县",
      "value": "2710" },

    {
      "text": "日土县",
      "value": "2711" },

    {
      "text": "改则县",
      "value": "2713" },

    {
      "text": "措勤县",
      "value": "2714" },

    {
      "text": "普兰县",
      "value": "2708" },

    {
      "text": "革吉县",
      "value": "2712" }] },



  {
    "text": "林芝地区",
    "value": "317",
    "children": [{
      "text": "林芝县",
      "value": "2715" },

    {
      "text": "米林县",
      "value": "2717" },

    {
      "text": "墨脱县",
      "value": "2718" },

    {
      "text": "波密县",
      "value": "2719" },

    {
      "text": "察隅县",
      "value": "2720" },

    {
      "text": "朗县",
      "value": "2721" },

    {
      "text": "工布江达县",
      "value": "2716" }] }] },





{
  "text": "陕西省",
  "value": "27",
  "children": [{
    "text": "西安市",
    "value": "318",
    "children": [{
      "text": "碑林区",
      "value": "2724" },

    {
      "text": "莲湖区",
      "value": "2725" },

    {
      "text": "灞桥区",
      "value": "2726" },

    {
      "text": "雁塔区",
      "value": "2728" },

    {
      "text": "阎良区",
      "value": "2729" },

    {
      "text": "临潼区",
      "value": "2730" },

    {
      "text": "长安区",
      "value": "2731" },

    {
      "text": "周至县",
      "value": "2733" },

    {
      "text": "户县",
      "value": "2734" },

    {
      "text": "高陵县",
      "value": "2735" },

    {
      "text": "新城区",
      "value": "2723" },

    {
      "text": "未央区",
      "value": "2727" },

    {
      "text": "蓝田县",
      "value": "2732" }] },



  {
    "text": "铜川市",
    "value": "319",
    "children": [{
      "text": "印台区",
      "value": "2738" },

    {
      "text": "耀州区",
      "value": "2739" },

    {
      "text": "宜君县",
      "value": "2740" },

    {
      "text": "王益区",
      "value": "2737" }] },



  {
    "text": "宝鸡市",
    "value": "320",
    "children": [{
      "text": "金台区",
      "value": "2743" },

    {
      "text": "陈仓区",
      "value": "2744" },

    {
      "text": "凤翔县",
      "value": "2745" },

    {
      "text": "岐山县",
      "value": "2746" },

    {
      "text": "眉县",
      "value": "2748" },

    {
      "text": "陇县",
      "value": "2749" },

    {
      "text": "千阳县",
      "value": "2750" },

    {
      "text": "凤县",
      "value": "2752" },

    {
      "text": "太白县",
      "value": "2753" },

    {
      "text": "渭滨区",
      "value": "2742" },

    {
      "text": "扶风县",
      "value": "2747" },

    {
      "text": "麟游县",
      "value": "2751" }] },



  {
    "text": "咸阳市",
    "value": "321",
    "children": [{
      "text": "秦都区",
      "value": "2755" },

    {
      "text": "杨陵区",
      "value": "2756" },

    {
      "text": "三原县",
      "value": "2758" },

    {
      "text": "泾阳县",
      "value": "2759" },

    {
      "text": "乾县",
      "value": "2760" },

    {
      "text": "永寿县",
      "value": "2762" },

    {
      "text": "彬县",
      "value": "2763" },

    {
      "text": "长武县",
      "value": "2764" },

    {
      "text": "旬邑县",
      "value": "2765" },

    {
      "text": "武功县",
      "value": "2767" },

    {
      "text": "兴平市",
      "value": "2768" },

    {
      "text": "渭城区",
      "value": "2757" },

    {
      "text": "礼泉县",
      "value": "2761" },

    {
      "text": "淳化县",
      "value": "2766" }] },



  {
    "text": "渭南市",
    "value": "322",
    "children": [{
      "text": "临渭区",
      "value": "2770" },

    {
      "text": "潼关县",
      "value": "2772" },

    {
      "text": "大荔县",
      "value": "2773" },

    {
      "text": "合阳县",
      "value": "2774" },

    {
      "text": "蒲城县",
      "value": "2776" },

    {
      "text": "白水县",
      "value": "2777" },

    {
      "text": "富平县",
      "value": "2778" },

    {
      "text": "华阴市",
      "value": "2780" },

    {
      "text": "华县",
      "value": "2771" },

    {
      "text": "澄城县",
      "value": "2775" },

    {
      "text": "韩城市",
      "value": "2779" }] },



  {
    "text": "延安市",
    "value": "323",
    "children": [{
      "text": "宝塔区",
      "value": "2782" },

    {
      "text": "延长县",
      "value": "2783" },

    {
      "text": "延川县",
      "value": "2784" },

    {
      "text": "安塞县",
      "value": "2786" },

    {
      "text": "志丹县",
      "value": "2787" },

    {
      "text": "吴起县",
      "value": "2788" },

    {
      "text": "富县",
      "value": "2790" },

    {
      "text": "洛川县",
      "value": "2791" },

    {
      "text": "宜川县",
      "value": "2792" },

    {
      "text": "黄龙县",
      "value": "2793" },

    {
      "text": "子长县",
      "value": "2785" },

    {
      "text": "甘泉县",
      "value": "2789" },

    {
      "text": "黄陵县",
      "value": "2794" }] },



  {
    "text": "汉中市",
    "value": "324",
    "children": [{
      "text": "汉台区",
      "value": "2796" },

    {
      "text": "南郑县",
      "value": "2797" },

    {
      "text": "城固县",
      "value": "2798" },

    {
      "text": "洋县",
      "value": "2799" },

    {
      "text": "西乡县",
      "value": "2800" },

    {
      "text": "勉县",
      "value": "2801" },

    {
      "text": "宁强县",
      "value": "2802" },

    {
      "text": "略阳县",
      "value": "2803" },

    {
      "text": "镇巴县",
      "value": "2804" },

    {
      "text": "留坝县",
      "value": "2805" },

    {
      "text": "佛坪县",
      "value": "2806" }] },



  {
    "text": "榆林市",
    "value": "325",
    "children": [{
      "text": "榆阳区",
      "value": "2808" },

    {
      "text": "神木县",
      "value": "2809" },

    {
      "text": "府谷县",
      "value": "2810" },

    {
      "text": "横山县",
      "value": "2811" },

    {
      "text": "靖边县",
      "value": "2812" },

    {
      "text": "定边县",
      "value": "2813" },

    {
      "text": "绥德县",
      "value": "2814" },

    {
      "text": "米脂县",
      "value": "2815" },

    {
      "text": "佳县",
      "value": "2816" },

    {
      "text": "吴堡县",
      "value": "2817" },

    {
      "text": "清涧县",
      "value": "2818" },

    {
      "text": "子洲县",
      "value": "2819" }] },



  {
    "text": "安康市",
    "value": "326",
    "children": [{
      "text": "汉滨区",
      "value": "2821" },

    {
      "text": "汉阴县",
      "value": "2822" },

    {
      "text": "石泉县",
      "value": "2823" },

    {
      "text": "宁陕县",
      "value": "2824" },

    {
      "text": "紫阳县",
      "value": "2825" },

    {
      "text": "岚皋县",
      "value": "2826" },

    {
      "text": "平利县",
      "value": "2827" },

    {
      "text": "镇坪县",
      "value": "2828" },

    {
      "text": "旬阳县",
      "value": "2829" },

    {
      "text": "白河县",
      "value": "2830" }] },



  {
    "text": "商洛市",
    "value": "327",
    "children": [{
      "text": "商州区",
      "value": "2832" },

    {
      "text": "洛南县",
      "value": "2833" },

    {
      "text": "丹凤县",
      "value": "2834" },

    {
      "text": "商南县",
      "value": "2835" },

    {
      "text": "山阳县",
      "value": "2836" },

    {
      "text": "镇安县",
      "value": "2837" },

    {
      "text": "柞水县",
      "value": "2838" }] }] },





{
  "text": "甘肃省",
  "value": "28",
  "children": [{
    "text": "兰州市",
    "value": "328",
    "children": [{
      "text": "城关区",
      "value": "2840" },

    {
      "text": "七里河区",
      "value": "2841" },

    {
      "text": "西固区",
      "value": "2842" },

    {
      "text": "安宁区",
      "value": "2843" },

    {
      "text": "红古区",
      "value": "2844" },

    {
      "text": "永登县",
      "value": "2845" },

    {
      "text": "皋兰县",
      "value": "2846" },

    {
      "text": "榆中县",
      "value": "2847" }] },



  {
    "text": "嘉峪关市",
    "value": "329",
    "children": [] },

  {
    "text": "金昌市",
    "value": "330",
    "children": [{
      "text": "金川区",
      "value": "2850" },

    {
      "text": "永昌县",
      "value": "2851" }] },



  {
    "text": "白银市",
    "value": "331",
    "children": [{
      "text": "白银区",
      "value": "2853" },

    {
      "text": "平川区",
      "value": "2854" },

    {
      "text": "靖远县",
      "value": "2855" },

    {
      "text": "会宁县",
      "value": "2856" },

    {
      "text": "景泰县",
      "value": "2857" }] },



  {
    "text": "天水市",
    "value": "332",
    "children": [{
      "text": "秦州区",
      "value": "2859" },

    {
      "text": "麦积区",
      "value": "2860" },

    {
      "text": "清水县",
      "value": "2861" },

    {
      "text": "秦安县",
      "value": "2862" },

    {
      "text": "甘谷县",
      "value": "2863" },

    {
      "text": "武山县",
      "value": "2864" },

    {
      "text": "张家川回族自治县",
      "value": "2865" }] },



  {
    "text": "张掖市",
    "value": "334",
    "children": [{
      "text": "甘州区",
      "value": "2872" },

    {
      "text": "肃南裕固族自治县",
      "value": "2873" },

    {
      "text": "民乐县",
      "value": "2874" },

    {
      "text": "临泽县",
      "value": "2875" },

    {
      "text": "高台县",
      "value": "2876" },

    {
      "text": "山丹县",
      "value": "2877" }] },



  {
    "text": "平凉市",
    "value": "335",
    "children": [{
      "text": "崆峒区",
      "value": "2879" },

    {
      "text": "泾川县",
      "value": "2880" },

    {
      "text": "灵台县",
      "value": "2881" },

    {
      "text": "崇信县",
      "value": "2882" },

    {
      "text": "华亭县",
      "value": "2883" },

    {
      "text": "庄浪县",
      "value": "2884" },

    {
      "text": "静宁县",
      "value": "2885" }] },



  {
    "text": "酒泉市",
    "value": "336",
    "children": [{
      "text": "肃州区",
      "value": "2887" },

    {
      "text": "金塔县",
      "value": "2888" },

    {
      "text": "瓜州县",
      "value": "2889" },

    {
      "text": "肃北蒙古族自治县",
      "value": "2890" },

    {
      "text": "阿克塞哈萨克族自治县",
      "value": "2891" },

    {
      "text": "玉门市",
      "value": "2892" },

    {
      "text": "敦煌市",
      "value": "2893" }] },



  {
    "text": "庆阳市",
    "value": "337",
    "children": [{
      "text": "西峰区",
      "value": "2895" },

    {
      "text": "庆城县",
      "value": "2896" },

    {
      "text": "环县",
      "value": "2897" },

    {
      "text": "华池县",
      "value": "2898" },

    {
      "text": "合水县",
      "value": "2899" },

    {
      "text": "正宁县",
      "value": "2900" },

    {
      "text": "宁县",
      "value": "2901" },

    {
      "text": "镇原县",
      "value": "2902" }] },



  {
    "text": "陇南市",
    "value": "339",
    "children": [{
      "text": "武都区",
      "value": "2912" },

    {
      "text": "成县",
      "value": "2913" },

    {
      "text": "文县",
      "value": "2914" },

    {
      "text": "宕昌县",
      "value": "2915" },

    {
      "text": "康县",
      "value": "2916" },

    {
      "text": "西和县",
      "value": "2917" },

    {
      "text": "礼县",
      "value": "2918" },

    {
      "text": "徽县",
      "value": "2919" },

    {
      "text": "两当县",
      "value": "2920" }] },



  {
    "text": "临夏回族自治州",
    "value": "340",
    "children": [{
      "text": "临夏市",
      "value": "2921" },

    {
      "text": "临夏县",
      "value": "2922" },

    {
      "text": "康乐县",
      "value": "2923" },

    {
      "text": "永靖县",
      "value": "2924" },

    {
      "text": "广河县",
      "value": "2925" },

    {
      "text": "和政县",
      "value": "2926" },

    {
      "text": "东乡族自治县",
      "value": "2927" },

    {
      "text": "积石山保安族东乡族撒拉族自治县",
      "value": "2928" }] },



  {
    "text": "甘南藏族自治州",
    "value": "341",
    "children": [{
      "text": "合作市",
      "value": "2929" },

    {
      "text": "卓尼县",
      "value": "2931" },

    {
      "text": "舟曲县",
      "value": "2932" },

    {
      "text": "迭部县",
      "value": "2933" },

    {
      "text": "碌曲县",
      "value": "2935" },

    {
      "text": "夏河县",
      "value": "2936" },

    {
      "text": "临潭县",
      "value": "2930" },

    {
      "text": "玛曲县",
      "value": "2934" }] },



  {
    "text": "定西市",
    "value": "338",
    "children": [{
      "text": "安定区",
      "value": "2904" },

    {
      "text": "通渭县",
      "value": "2905" },

    {
      "text": "陇西县",
      "value": "2906" },

    {
      "text": "渭源县",
      "value": "2907" },

    {
      "text": "临洮县",
      "value": "2908" },

    {
      "text": "漳县",
      "value": "2909" },

    {
      "text": "岷县",
      "value": "2910" }] },



  {
    "text": "武威市",
    "value": "333",
    "children": [{
      "text": "凉州区",
      "value": "2867" },

    {
      "text": "民勤县",
      "value": "2868" },

    {
      "text": "古浪县",
      "value": "2869" },

    {
      "text": "天祝藏族自治县",
      "value": "2870" }] }] },





{
  "text": "青海省",
  "value": "29",
  "children": [{
    "text": "海东地区",
    "value": "343",
    "children": [{
      "text": "平安县",
      "value": "2945" },

    {
      "text": "民和回族土族自治县",
      "value": "2946" },

    {
      "text": "乐都县",
      "value": "2947" },

    {
      "text": "互助土族自治县",
      "value": "2948" },

    {
      "text": "循化撒拉族自治县",
      "value": "2950" },

    {
      "text": "化隆回族自治县",
      "value": "2949" }] },



  {
    "text": "海北藏族自治州",
    "value": "344",
    "children": [{
      "text": "门源回族自治县",
      "value": "2951" },

    {
      "text": "祁连县",
      "value": "2952" },

    {
      "text": "海晏县",
      "value": "2953" },

    {
      "text": "刚察县",
      "value": "2954" }] },



  {
    "text": "黄南藏族自治州",
    "value": "345",
    "children": [{
      "text": "尖扎县",
      "value": "2956" },

    {
      "text": "泽库县",
      "value": "2957" },

    {
      "text": "河南蒙古族自治县",
      "value": "2958" },

    {
      "text": "同仁县",
      "value": "2955" }] },



  {
    "text": "果洛藏族自治州",
    "value": "347",
    "children": [{
      "text": "班玛县",
      "value": "2965" },

    {
      "text": "甘德县",
      "value": "2966" },

    {
      "text": "达日县",
      "value": "2967" },

    {
      "text": "玛多县",
      "value": "2969" },

    {
      "text": "玛沁县",
      "value": "2964" },

    {
      "text": "久治县",
      "value": "2968" }] },



  {
    "text": "玉树藏族自治州",
    "value": "348",
    "children": [{
      "text": "玉树县",
      "value": "2970" },

    {
      "text": "杂多县",
      "value": "2971" },

    {
      "text": "称多县",
      "value": "2972" },

    {
      "text": "囊谦县",
      "value": "2974" },

    {
      "text": "曲麻莱县",
      "value": "2975" },

    {
      "text": "治多县",
      "value": "2973" }] },



  {
    "text": "海西蒙古族藏族自治州",
    "value": "349",
    "children": [{
      "text": "格尔木市",
      "value": "2976" },

    {
      "text": "乌兰县",
      "value": "2978" },

    {
      "text": "都兰县",
      "value": "2979" },

    {
      "text": "天峻县",
      "value": "2980" },

    {
      "text": "德令哈市",
      "value": "2977" }] },



  {
    "text": "西宁市",
    "value": "342",
    "children": [{
      "text": "城东区",
      "value": "2938" },

    {
      "text": "城中区",
      "value": "2939" },

    {
      "text": "城北区",
      "value": "2941" },

    {
      "text": "大通回族土族自治县",
      "value": "2942" },

    {
      "text": "湟中县",
      "value": "2943" },

    {
      "text": "城西区",
      "value": "2940" },

    {
      "text": "湟源县",
      "value": "2944" }] },



  {
    "text": "海南藏族自治州",
    "value": "346",
    "children": [{
      "text": "同德县",
      "value": "2960" },

    {
      "text": "贵德县",
      "value": "2961" },

    {
      "text": "兴海县",
      "value": "2962" },

    {
      "text": "贵南县",
      "value": "2963" },

    {
      "text": "共和县",
      "value": "2959" }] }] },





{
  "text": "宁夏回族自治区",
  "value": "30",
  "children": [{
    "text": "银川市",
    "value": "350",
    "children": [{
      "text": "兴庆区",
      "value": "2982" },

    {
      "text": "金凤区",
      "value": "2984" },

    {
      "text": "永宁县",
      "value": "2985" },

    {
      "text": "贺兰县",
      "value": "2986" },

    {
      "text": "西夏区",
      "value": "2983" },

    {
      "text": "灵武市",
      "value": "2987" }] },



  {
    "text": "石嘴山市",
    "value": "351",
    "children": [{
      "text": "大武口区",
      "value": "2989" },

    {
      "text": "惠农区",
      "value": "2990" },

    {
      "text": "平罗县",
      "value": "2991" }] },



  {
    "text": "固原市",
    "value": "353",
    "children": [{
      "text": "原州区",
      "value": "2999" },

    {
      "text": "隆德县",
      "value": "3001" },

    {
      "text": "泾源县",
      "value": "3002" },

    {
      "text": "彭阳县",
      "value": "3003" },

    {
      "text": "西吉县",
      "value": "3000" }] },



  {
    "text": "中卫市",
    "value": "354",
    "children": [{
      "text": "中宁县",
      "value": "3006" },

    {
      "text": "海原县",
      "value": "3007" },

    {
      "text": "沙坡头区",
      "value": "3005" }] },



  {
    "text": "吴忠市",
    "value": "352",
    "children": [{
      "text": "利通区",
      "value": "2993" },

    {
      "text": "盐池县",
      "value": "2995" },

    {
      "text": "同心县",
      "value": "2996" },

    {
      "text": "青铜峡市",
      "value": "2997" },

    {
      "text": "红寺堡区",
      "value": "2994" }] }] },





{
  "text": "新疆维吾尔自治区",
  "value": "31",
  "children": [{
    "text": "乌鲁木齐市",
    "value": "355",
    "children": [{
      "text": "天山区",
      "value": "3009" },

    {
      "text": "沙依巴克区",
      "value": "3010" },

    {
      "text": "水磨沟区",
      "value": "3012" },

    {
      "text": "头屯河区",
      "value": "3013" },

    {
      "text": "达坂城区",
      "value": "3014" },

    {
      "text": "乌鲁木齐县",
      "value": "3016" },

    {
      "text": "新市区",
      "value": "3011" },

    {
      "text": "米东区",
      "value": "3015" }] },



  {
    "text": "吐鲁番地区",
    "value": "357",
    "children": [{
      "text": "吐鲁番市",
      "value": "3022" },

    {
      "text": "鄯善县",
      "value": "3023" },

    {
      "text": "托克逊县",
      "value": "3024" }] },



  {
    "text": "哈密地区",
    "value": "358",
    "children": [{
      "text": "哈密市",
      "value": "3025" },

    {
      "text": "巴里坤哈萨克自治县",
      "value": "3026" },

    {
      "text": "伊吾县",
      "value": "3027" }] },



  {
    "text": "昌吉回族自治州",
    "value": "359",
    "children": [{
      "text": "昌吉市",
      "value": "3028" },

    {
      "text": "阜康市",
      "value": "3029" },

    {
      "text": "呼图壁县",
      "value": "3030" },

    {
      "text": "玛纳斯县",
      "value": "3031" },

    {
      "text": "奇台县",
      "value": "3032" },

    {
      "text": "吉木萨尔县",
      "value": "3033" },

    {
      "text": "木垒哈萨克自治县",
      "value": "3034" }] },



  {
    "text": "博尔塔拉蒙古自治州",
    "value": "360",
    "children": [{
      "text": "阿拉山口市",
      "value": "3225" },

    {
      "text": "博乐市",
      "value": "3035" },

    {
      "text": "精河县",
      "value": "3036" },

    {
      "text": "温泉县",
      "value": "3037" }] },



  {
    "text": "巴音郭楞蒙古自治州",
    "value": "361",
    "children": [{
      "text": "库尔勒市",
      "value": "3038" },

    {
      "text": "轮台县",
      "value": "3039" },

    {
      "text": "尉犁县",
      "value": "3040" },

    {
      "text": "若羌县",
      "value": "3041" },

    {
      "text": "且末县",
      "value": "3042" },

    {
      "text": "焉耆回族自治县",
      "value": "3043" },

    {
      "text": "和静县",
      "value": "3044" },

    {
      "text": "和硕县",
      "value": "3045" },

    {
      "text": "博湖县",
      "value": "3046" }] },



  {
    "text": "克孜勒苏柯尔克孜自治州",
    "value": "363",
    "children": [{
      "text": "阿图什市",
      "value": "3056" },

    {
      "text": "阿克陶县",
      "value": "3057" },

    {
      "text": "阿合奇县",
      "value": "3058" },

    {
      "text": "乌恰县",
      "value": "3059" }] },



  {
    "text": "喀什地区",
    "value": "364",
    "children": [{
      "text": "喀什市",
      "value": "3060" },

    {
      "text": "疏附县",
      "value": "3061" },

    {
      "text": "疏勒县",
      "value": "3062" },

    {
      "text": "英吉沙县",
      "value": "3063" },

    {
      "text": "泽普县",
      "value": "3064" },

    {
      "text": "莎车县",
      "value": "3065" },

    {
      "text": "叶城县",
      "value": "3066" },

    {
      "text": "麦盖提县",
      "value": "3067" },

    {
      "text": "岳普湖县",
      "value": "3068" },

    {
      "text": "伽师县",
      "value": "3069" },

    {
      "text": "巴楚县",
      "value": "3070" },

    {
      "text": "塔什库尔干塔吉克自治县",
      "value": "3071" }] },



  {
    "text": "和田地区",
    "value": "365",
    "children": [{
      "text": "和田市",
      "value": "3072" },

    {
      "text": "和田县",
      "value": "3073" },

    {
      "text": "墨玉县",
      "value": "3074" },

    {
      "text": "皮山县",
      "value": "3075" },

    {
      "text": "洛浦县",
      "value": "3076" },

    {
      "text": "策勒县",
      "value": "3077" },

    {
      "text": "于田县",
      "value": "3078" },

    {
      "text": "民丰县",
      "value": "3079" }] },



  {
    "text": "伊犁哈萨克自治州",
    "value": "366",
    "children": [{
      "text": "伊宁市",
      "value": "3080" },

    {
      "text": "奎屯市",
      "value": "3081" },

    {
      "text": "伊宁县",
      "value": "3082" },

    {
      "text": "察布查尔锡伯自治县",
      "value": "3083" },

    {
      "text": "霍城县",
      "value": "3084" },

    {
      "text": "巩留县",
      "value": "3085" },

    {
      "text": "新源县",
      "value": "3086" },

    {
      "text": "昭苏县",
      "value": "3087" },

    {
      "text": "特克斯县",
      "value": "3088" },

    {
      "text": "尼勒克县",
      "value": "3089" }] },



  {
    "text": "阿勒泰地区",
    "value": "368",
    "children": [{
      "text": "阿勒泰市",
      "value": "3097" },

    {
      "text": "布尔津县",
      "value": "3098" },

    {
      "text": "富蕴县",
      "value": "3099" },

    {
      "text": "福海县",
      "value": "3100" },

    {
      "text": "哈巴河县",
      "value": "3101" },

    {
      "text": "青河县",
      "value": "3102" },

    {
      "text": "吉木乃县",
      "value": "3103" }] },



  {
    "text": "自治区直辖县级行政区划",
    "value": "369",
    "children": [{
      "text": "北屯市",
      "value": "3231" },

    {
      "text": "铁门关市",
      "value": "3232" },

    {
      "text": "石河子市",
      "value": "3104" },

    {
      "text": "阿拉尔市",
      "value": "3105" },

    {
      "text": "图木舒克市",
      "value": "3106" },

    {
      "text": "五家渠市",
      "value": "3107" }] },



  {
    "text": "克拉玛依市",
    "value": "356",
    "children": [{
      "text": "独山子区",
      "value": "3018" },

    {
      "text": "克拉玛依区",
      "value": "3019" },

    {
      "text": "白碱滩区",
      "value": "3020" },

    {
      "text": "乌尔禾区",
      "value": "3021" }] },



  {
    "text": "阿克苏地区",
    "value": "362",
    "children": [{
      "text": "阿克苏市",
      "value": "3047" },

    {
      "text": "温宿县",
      "value": "3048" },

    {
      "text": "库车县",
      "value": "3049" },

    {
      "text": "沙雅县",
      "value": "3050" },

    {
      "text": "新和县",
      "value": "3051" },

    {
      "text": "拜城县",
      "value": "3052" },

    {
      "text": "乌什县",
      "value": "3053" },

    {
      "text": "阿瓦提县",
      "value": "3054" },

    {
      "text": "柯坪县",
      "value": "3055" }] },



  {
    "text": "塔城地区",
    "value": "367",
    "children": [{
      "text": "塔城市",
      "value": "3090" },

    {
      "text": "乌苏市",
      "value": "3091" },

    {
      "text": "额敏县",
      "value": "3092" },

    {
      "text": "沙湾县",
      "value": "3093" },

    {
      "text": "托里县",
      "value": "3094" },

    {
      "text": "裕民县",
      "value": "3095" },

    {
      "text": "和布克赛尔蒙古自治县",
      "value": "3096" }] }] }];exports.default = _default;

/***/ }),

/***/ 18:
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/utils/interface.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.updateFinanceInfo = updateFinanceInfo;exports.confirmCollectionEntrusted = confirmCollectionEntrusted;exports.addModApply = addModApply;exports.updateModApply = updateModApply;exports.updateModApplySubmit = updateModApplySubmit;exports.vehicleAdministration = vehicleAdministration;exports.getBrandsListForApp = getBrandsListForApp;exports.getSeriesByIdForApp = getSeriesByIdForApp;exports.getSeriesyearForApp = getSeriesyearForApp;exports.getCarInfo = getCarInfo;exports.logout = logout;exports.updatePassword = updatePassword;exports.getModApplyForApp = getModApplyForApp;exports.handleMoneyForService = handleMoneyForService;exports.getFinanceEntrustedList = getFinanceEntrustedList;exports.getApplyFinance = getApplyFinance;exports.getApplyFinanceEntrusted = getApplyFinanceEntrusted;exports.getFacilitatorInfoById = getFacilitatorInfoById;exports.getApplyListEntrusted = getApplyListEntrusted;exports.getUserInfoBySfId = getUserInfoBySfId;exports.confirmationModApply = confirmationModApply;exports.distributionModApply = distributionModApply;exports.RefuseModApply = RefuseModApply;exports.uploadUrl = exports.baseUrl = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var baseUrl = _request.default.baseUrl;exports.baseUrl = baseUrl;
var uploadUrl = _request.default.uploadUrl;



// 确认打款
exports.uploadUrl = uploadUrl;function updateFinanceInfo(data) {
  return _request.default.baseRequest({
    url: 'finance/updateFinanceInfo',
    method: 'post' },

  data);
}

// 确认收款
function confirmCollectionEntrusted(data) {
  return _request.default.baseRequest({
    url: 'finance/confirmCollectionEntrusted',
    method: 'post' },

  data);
}

// 申请单保存
function addModApply(data) {
  return _request.default.baseRequest({
    url: 'modApply/addModApply',
    method: 'post' },

  data);
}

// 申请单修改
function updateModApply(data) {
  return _request.default.baseRequest({
    url: 'modApply/updateModApply',
    method: 'post' },

  data);
}

// 申请单提报
function updateModApplySubmit(data) {
  return _request.default.baseRequest({
    url: 'modApply/updateModApplySubmit',
    method: 'post' },

  data);
}

// 车管所
function vehicleAdministration(data) {
  return _request.default.baseRequest({
    url: 'dmv/getDmvForAdrress',
    method: 'post' },

  data);
}

//车辆品牌
function getBrandsListForApp(data) {
  return _request.default.baseRequest({
    url: 'brands/getBrandsListForApp',
    method: 'get' },

  data);
}

// 车系
function getSeriesByIdForApp(data) {
  return _request.default.baseRequest({
    url: 'serieses/getSeriesByIdForApp',
    method: 'get' },

  data);
}

// 年份
function getSeriesyearForApp(data) {
  return _request.default.baseRequest({
    url: 'seriesyear/getSeriesyearForApp',
    method: 'get' },

  data);
}

// 类型
function getCarInfo(data) {
  return _request.default.baseRequest({
    url: 'car/getCarInfo',
    method: 'get' },

  data);
}

// 退出
function logout(data) {
  return _request.default.baseRequest({
    url: 'sys/user/logout',
    method: 'post' },

  data);
}

// 修改密码
function updatePassword(data) {
  return _request.default.baseRequest({
    url: 'user/updatePassword',
    method: 'post' },

  data);
}

// 申请单页面数据
function getModApplyForApp(data) {
  return _request.default.baseRequest({
    url: 'modApply/getModApplyForApp',
    method: 'get' },

  data);
}

// 应付账单数据
function handleMoneyForService(data) {
  return _request.default.baseRequest({
    url: 'finance/handleMoneyForService',
    method: 'get' },

  data);
}

// 收款账单数据
function getFinanceEntrustedList(data) {
  return _request.default.baseRequest({
    url: 'finance/getFinanceEntrustedList',
    method: 'get' },

  data);
}

// 财务申请数量数据
function getApplyFinance(data) {
  return _request.default.baseRequest({
    url: 'finance/getApplyFinance',
    method: 'get' },

  data);
}

// 委托机构申请数量数据
function getApplyFinanceEntrusted(data) {
  return _request.default.baseRequest({
    url: 'finance/getApplyFinanceEntrusted',
    method: 'get' },

  data);
}

// 应收方银行信息
function getFacilitatorInfoById(data) {
  return _request.default.baseRequest({
    url: 'facilitator/getFacilitatorInfoById',
    method: 'get' },

  data);
}


// 待办列表数据
function getApplyListEntrusted(data) {
  return _request.default.baseRequest({
    url: 'modApply/getApplyListEntrusted',
    method: 'get' },

  data);
}

// 办理人员数据
function getUserInfoBySfId(data) {
  return _request.default.baseRequest({
    url: 'userinfo/getUserInfoBySfId',
    method: 'get' },

  data);
}

// 办理中提交
function confirmationModApply(data) {
  return _request.default.baseRequest({
    url: 'modApply/confirmationModApply',
    method: 'get' },

  data);
}

// 分配
function distributionModApply(data) {
  return _request.default.baseRequest({
    url: 'modApply/distributionModApply',
    method: 'get' },

  data);
}

// 拒办
function RefuseModApply(data) {
  return _request.default.baseRequest({
    url: 'modApply/RefuseModApply',
    method: 'get' },

  data);
}

/***/ }),

/***/ 19:
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/utils/request.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // const baseUrl = "http://172.16.9.200/collection/"; //200
var baseUrl = "http://172.16.8.38:8088/collection/"; //马奎
// const baseUrl = "http://172.16.8.31:8088/collection/"; //顶重阳
var uploadUrl = "http://172.16.9.200:8055/"; //图片查看
// 定义基础请求路径(后端服务器地址)
var baseRequest = function baseRequest(opts, data) {
  uni.showLoading({
    title: '执行中',
    mask: true });


  // 获取token
  var toKen;
  uni.getStorage({
    key: 'toKen',
    success: function success(res) {
      toKen = res.data;
    },
    fail: function fail() {
      uni.reLaunch({
        url: '/' });

    } });



  var baseDefaultOpts = {
    url: baseUrl + opts.url,
    // 请求接口地址
    data: data,
    // 传入请求参数
    method: opts.method,
    timeouut: [2000, 2000],

    // 配置请求类型
    header: opts.method == 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      'toKen': toKen } :
    {
      'X-Requested-With': 'XMLHttpRequest',
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      'toKen': toKen },

    // 配置请求头
    dataType: 'json' };

  var promise = new Promise(function (resolve, reject) {
    uni.request(baseDefaultOpts).then(
    function (res) {
      if (res[1].data.code === 0) {
        // 请求成功
        uni.hideLoading(); //隐藏 loading 提示框。
        uni.stopPullDownRefresh(); //停止当前页面下拉刷新。
      } else if (res[1].data.code === 500) {
        // 系统错误
        uni.showToast({
          title: res[1].data.msg,
          duration: 2000,
          icon: 'none' });

      } else if (res[1].data.code === 5001) {
        // 账号或密码不正确
        uni.showToast({
          title: res[1].data.msg,
          duration: 2000,
          icon: 'none' });

      } else if (res[1].data.code === 403) {
        // touken过期
        uni.showToast({
          title: res[1].data.msg,
          duration: 2000,
          icon: 'none' });

        uni.removeStorageSync('toKen');
        uni.reLaunch({
          url: '/' });

      } else if (res[1].data.code === 508) {
        // 旧密码错误
        uni.showToast({
          title: res[1].data.msg,
          duration: 2000,
          icon: 'none' });

      }
      resolve(res);
    }).

    catch(
    function (response) {
      uni.showToast({
        title: '请求超时',
        duration: 2000,
        icon: 'none' });

      uni.hideLoading(); //隐藏 loading 提示框。
      uni.stopPullDownRefresh(); //停止当前页面下拉刷新。
      reject(response);
    });

  });

  return promise;
};

// 将对象导出外部引入使用
var _default = {
  baseUrl: baseUrl,
  uploadUrl: uploadUrl,
  baseRequest: baseRequest };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 214:
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/components/uni-icons/icons.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 229:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 230);

/***/ }),

/***/ 230:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 231);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 231:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 239:
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/components/uni-popup/popup.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 240));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 240:
/*!*************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/components/uni-popup/message.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yesong-git/zhongjinwei-uni/pages.json ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map