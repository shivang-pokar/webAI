/**
 * Options for the WebAI plugin.
 */
interface WebAIPluginOptions {
  /**
   * To Activate AI with this command
   */
  baseCommand?: string;
  command?: Array<{
    actionCommand: Array<string>,
    callback: (event: any) => {},
    type: typeOption,
    pageSlug?: string
  }>;
  siteUrl?: string;

}

declare enum typeOption {
  URL = "url",
  ACTION = 'action'
}