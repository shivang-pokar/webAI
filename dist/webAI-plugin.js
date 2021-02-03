import { webAIPlugin } from './core/core';
var webAI = (options) => {
    if (!options.timeOut) {
        options.timeOut = 5;
    }
    return new webAIPlugin(options);
};
export default webAI;
//# sourceMappingURL=webAI-plugin.js.map