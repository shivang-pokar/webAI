import { WebAIPluginServices } from '../webAI-service';
import { CommandObj } from '../mainObject';
export class webAIPlugin {
    constructor(options) {
        let webAIPluginServices = new WebAIPluginServices();
        let commandObj = new CommandObj();
        webAIPluginServices.appendHTML();
        let recognition = webAIPluginServices.webkitSpeechRecognition();
        document.getElementById("webAI-animate").addEventListener('click', function () {
            recognition.start();
        });
        recognition.onresult = (event) => {
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
    }
}
//# sourceMappingURL=core.js.map