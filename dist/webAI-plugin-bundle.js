var webAI = (function () {
  'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var CommandObj = function CommandObj() {
    classCallCheck(this, CommandObj);
  };
  var CallBackObject = function CallBackObject() {
    classCallCheck(this, CallBackObject);
  };

  var _window = window,
      _webkitSpeechRecognition = _window.webkitSpeechRecognition;

  var WebAIPluginServices = function () {
      function WebAIPluginServices() {
          classCallCheck(this, WebAIPluginServices);
      }

      createClass(WebAIPluginServices, [{
          key: 'webkitSpeechRecognition',
          value: function webkitSpeechRecognition() {
              var recognition = new _webkitSpeechRecognition();
              recognition.continuous = true;
              recognition.interimResults = true;
              return recognition;
          }
      }, {
          key: 'checkBaseCommand',
          value: function checkBaseCommand(event, options, mainObject) {
              if (event.results[event.results.length - 1][0].transcript.toLocaleLowerCase().trim() == options.baseCommand.toLocaleLowerCase()) {
                  mainObject.baseCommandValid = true;
                  mainObject.baseCommand = options.baseCommand.toLocaleLowerCase();
              }
              return mainObject;
          }
      }, {
          key: 'trigerAction',
          value: function trigerAction(options, voiceCommand, commandObj) {
              var _this = this;

              var webAIAnimate = document.getElementById('webAI-animate');
              webAIAnimate.classList.add('voice-active');
              options.command.forEach(function (resp) {
                  resp.actionCommand.forEach(function (actionCommand) {
                      if (voiceCommand.indexOf(actionCommand.trim().toLocaleLowerCase()) != -1) {
                          commandObj.actionUrlCommand = actionCommand.trim();
                          var callBackObject = new CallBackObject();
                          callBackObject.actionCommand = voiceCommand;
                          var isDefaultKey = _this.checkDefaultKeyWordk(voiceCommand);
                          if (!isDefaultKey) {
                              commandObj.baseCommandValid = false;
                          }
                          if (resp.pageSlug) {
                              window.location.href = options.siteUrl + '/' + resp.pageSlug;
                          } else {
                              return resp.callback.call(_this, callBackObject);
                          }
                      } else {
                          _this.checkDefaultBackCommand(voiceCommand);
                      }
                  });
              });
              var timeout = setTimeout(function () {
                  commandObj.baseCommandValid = false;
                  webAIAnimate.classList.remove('voice-active');
                  clearTimeout(timeout);
              }, options.timeOut * 1000);
              return commandObj;
          }
      }, {
          key: 'appendHTML',
          value: function appendHTML() {
              var aiSVG = '<svg id="webAI-svg" width="300" height="300" xmlns="http://www.w3.org/2000/svg" filter="url(#goo)"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs><circle id="Circle1"></circle><circle id="Circle2"></circle><circle id="Circle3"></circle><circle id="Circle4"></circle><text x="110" y="175" class="small" style="fill: #fff;font-size: 80px;font-family: Arial;">AI</text></svg>';
              var node = document.createElement("div");
              node.id = 'webAI-animate';
              node.innerHTML = aiSVG;
              document.body.appendChild(node);
              document.head.insertAdjacentHTML("beforeend", '<style>#webAI-animate{position:fixed; bottom:0px; right:0px; width:150px; height:150px; transform: translate(40px, 30px); opacity: 0; visibility: hidden; transition: 0.5s ease all;}#webAI-animate.voice-active{transform: translate(0px, 0px); opacity: 1; visibility: visible;}#webAI-svg{transform: scale(0.4); transform-origin: left top;}#webAI-svg, #webAI-svg circle {fill: #1F9DEA;}#webAI-svg #Circle1 {animation: from0to360 1s linear infinite;cx: 150;cy: 145;r: 100;transform-origin: 145px 150px;}#webAI-svg #Circle2 {animation: from360to0 2s linear infinite;cx: 150;cy: 155;r: 100;transform-origin: 155px 150px;}#webAI-svg #Circle3 {animation: from0to360 3s linear infinite;cx: 145;cy: 150;r: 100;transform-origin: 150px 145px;}#webAI-svg #Circle4 {animation: from360to0 2.5s linear infinite;cx: 155;cy: 150;r: 100;transform-origin: 150px 155px;}@keyframes from360to0 {from{transform:rotate(360deg);}to{transform:rotate(0deg);}}</style>');
          }
      }, {
          key: 'checkDefaultKeyWordk',
          value: function checkDefaultKeyWordk(action) {
              var defaultKey = ['search'];
              var isDefault = false;
              defaultKey.forEach(function (keys) {
                  if (action.indexOf(keys.trim().toLocaleLowerCase()) != -1) {
                      isDefault = true;
                  }
              });
              return isDefault;
          }
      }, {
          key: 'checkDefaultBackCommand',
          value: function checkDefaultBackCommand(action) {
              var defaultCommand = ['go back', 'go back to page', 'go to previous page'];
              var isDefaultCommand = false;
              defaultCommand.forEach(function (keys) {
                  if (action.indexOf(keys.trim().toLocaleLowerCase()) != -1) {
                      history.back();
                      isDefaultCommand = true;
                  }
              });
              return isDefaultCommand;
          }
      }]);
      return WebAIPluginServices;
  }();

  var webAIPlugin = function webAIPlugin(options) {
      classCallCheck(this, webAIPlugin);

      var webAIPluginServices = new WebAIPluginServices();
      var commandObj = new CommandObj();
      webAIPluginServices.appendHTML();
      var recognition = webAIPluginServices.webkitSpeechRecognition();
      document.getElementById("webAI-animate").addEventListener('click', function () {
          recognition.start();
      });
      recognition.onresult = function (event) {
          if (commandObj.baseCommandValid) {
              var voiceCommand = event.results[event.results.length - 1][0].transcript.toLocaleLowerCase().trim();
              commandObj = webAIPluginServices.trigerAction(options, voiceCommand, commandObj);
          }
          if (!commandObj.baseCommandValid) {
              commandObj = webAIPluginServices.checkBaseCommand(event, options, commandObj);
          }
      };
      recognition.start();
      recognition.onend = function () {
          recognition.start();
      };
  };

  var webAI = function webAI(options) {
      if (!options.timeOut) {
          options.timeOut = 5;
      }
      return new webAIPlugin(options);
  };

  return webAI;

}());
//# sourceMappingURL=webAI-plugin-bundle.js.map
