import { webAIPlugin } from './core/core';
import { WebAIPluginServices } from './webAI-service';


var webAI = (options: WebAIPluginOptions) => {
  return new webAIPlugin(options);
}

export default webAI;
