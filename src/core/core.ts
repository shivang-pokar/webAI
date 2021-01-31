import { WebAIPluginServices } from '../webAI-service';
import { CommandObj, CallBackObject } from '../mainObject';


export class webAIPlugin {
    allowCommand: boolean = false;
    constructor(options: WebAIPluginOptions,) {
        let webAIPluginServices = new WebAIPluginServices();
        let commandObj: CommandObj = new CommandObj();

        let recognition = webAIPluginServices.webkitSpeechRecognition();
        recognition.onresult = (event: any) => {
            if (commandObj.baseCommandValid) {
                var voiceCommand = event.results[event.results.length - 1][0].transcript.toLocaleLowerCase();
                commandObj = webAIPluginServices.trigerAction(options, voiceCommand, commandObj)
            }
            if (!commandObj.baseCommandValid) {
                commandObj = webAIPluginServices.checkBaseCommand(event, options, commandObj);
            }
        };
        recognition.start();
    }

    handleSuccess(stream: any) {
        console.log(stream)
    }
}