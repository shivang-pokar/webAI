/** Example service class */
import { CallBackObject, CommandObj } from './mainObject';
const { webkitSpeechRecognition } = (window as any);

export class WebAIPluginServices {
  /**
   * Returns a webkitSpeechRecognition.
   * @param recognition
   */
  webkitSpeechRecognition() {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    return recognition;
  }

  checkBaseCommand(event: any, options: WebAIPluginOptions, mainObject: CommandObj): CommandObj {

    if (event.results[event.results.length - 1][0].transcript.toLocaleLowerCase().trim() == options.baseCommand.toLocaleLowerCase()) {
      mainObject.baseCommandValid = true;
      mainObject.baseCommand = options.baseCommand.toLocaleLowerCase();
    }
    return mainObject;
  }

  trigerAction(options: WebAIPluginOptions, voiceCommand: string, commandObj: CommandObj): CommandObj {
    let webAIAnimate = document.getElementById('webAI-animate');
    webAIAnimate.classList.add('voice-active');
    options.command.forEach((resp) => {
      resp.actionCommand.forEach(actionCommand => {
        if (voiceCommand.indexOf(actionCommand.trim().toLocaleLowerCase()) != -1) {
          commandObj.actionUrlCommand = actionCommand.trim();
          let callBackObject: CallBackObject = new CallBackObject();
          callBackObject.actionCommand = voiceCommand;

          let isDefaultKey = this.checkDefaultKeyWordk(voiceCommand);
          if (!isDefaultKey) {
            commandObj.baseCommandValid = false;
          }
          if (resp.pageSlug) {
            window.location.href = options.siteUrl + '/' + resp.pageSlug
          }
          else {
            return resp.callback.call(this, callBackObject);
          }
        }
        else {
          this.checkDefaultBackCommand(voiceCommand)
        }
      });
    });

    var timeout = setTimeout(() => {
      commandObj.baseCommandValid = false;
      webAIAnimate.classList.remove('voice-active');
      clearTimeout(timeout);
    }, options.timeOut * 1000);

    return commandObj;
  }

  appendHTML() {
    let aiSVG = `<svg id="webAI-svg" width="300" height="300" xmlns="http://www.w3.org/2000/svg" filter="url(#goo)"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs><circle id="Circle1"></circle><circle id="Circle2"></circle><circle id="Circle3"></circle><circle id="Circle4"></circle><text x="110" y="175" class="small" style="fill: #fff;font-size: 80px;font-family: Arial;">AI</text></svg>`;
    var node = document.createElement("div");
    node.id = 'webAI-animate';
    node.innerHTML = aiSVG;
    document.body.appendChild(node);
    document.head.insertAdjacentHTML("beforeend", `<style>#webAI-animate{position:fixed; bottom:0px; right:0px; width:150px; height:150px; transform: translate(40px, 30px); opacity: 0; visibility: hidden; transition: 0.5s ease all;}#webAI-animate.voice-active{transform: translate(0px, 0px); opacity: 1; visibility: visible;}#webAI-svg{transform: scale(0.4); transform-origin: left top;}#webAI-svg, #webAI-svg circle {fill: #1F9DEA;}#webAI-svg #Circle1 {animation: from0to360 1s linear infinite;cx: 150;cy: 145;r: 100;transform-origin: 145px 150px;}#webAI-svg #Circle2 {animation: from360to0 2s linear infinite;cx: 150;cy: 155;r: 100;transform-origin: 155px 150px;}#webAI-svg #Circle3 {animation: from0to360 3s linear infinite;cx: 145;cy: 150;r: 100;transform-origin: 150px 145px;}#webAI-svg #Circle4 {animation: from360to0 2.5s linear infinite;cx: 155;cy: 150;r: 100;transform-origin: 150px 155px;}@keyframes from360to0 {from{transform:rotate(360deg);}to{transform:rotate(0deg);}}</style>`)
  }


  checkDefaultKeyWordk(action: string): boolean {
    let defaultKey = ['search'];
    let isDefault: boolean = false;
    defaultKey.forEach(keys => {
      if (action.indexOf(keys.trim().toLocaleLowerCase()) != -1) {
        isDefault = true;
      }
    })
    return isDefault;
  }

  checkDefaultBackCommand(action: string): boolean {
    let defaultCommand = ['go back', 'go back to page', 'go to previous page'];
    let isDefaultCommand: boolean = false;
    defaultCommand.forEach(keys => {
      if (action.indexOf(keys.trim().toLocaleLowerCase()) != -1) {
        history.back();
        isDefaultCommand = true;
      }
    })
    return isDefaultCommand;
  }


}
