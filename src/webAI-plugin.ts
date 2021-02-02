import { webAIPlugin } from './core/core';


var webAI = (options: WebAIPluginOptions) => {
  if (!options.timeOut) {
    options.timeOut = 5;
  }
  return new webAIPlugin(options);
}

export default webAI;
