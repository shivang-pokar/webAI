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
    if (event.results[event.results.length - 1][0].transcript.toLocaleLowerCase() == options.baseCommand.toLocaleLowerCase()) {
      mainObject.baseCommandValid = true;
      mainObject.baseCommand = options.baseCommand.toLocaleLowerCase();
    }
    return mainObject;
  }

  trigerAction(options: WebAIPluginOptions, voiceCommand: string, commandObj: CommandObj): CommandObj {
    options.command.forEach((resp) => {
      resp.actionCommand.forEach(actionCommand => {
        if (voiceCommand.trim().indexOf(actionCommand.trim()) != -1) {
          commandObj.baseCommandValid = false
          commandObj.actionUrlCommand = actionCommand.trim();
          let callBackObject: CallBackObject = new CallBackObject();
          callBackObject.actionCommand = commandObj.actionUrlCommand;
          if (resp.pageSlug) {
            window.location.href = options.siteUrl + '/' + resp.pageSlug
          }
          else {
            return resp.callback.call(this, callBackObject);
          }

        }
      });
    });
    return commandObj;
  }


}
