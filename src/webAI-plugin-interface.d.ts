/**
 * Options for the WebAI plugin.
 */
interface WebAIPluginOptions {
  /**
   * To Activate AI with this command
   */
  /**
  @baseCommand  command to active AI actions
   */
  baseCommand?: string;

  /**
   * @command to set all command which perform action
   */
  command?: Array<{
    actionCommand: Array<string>,
    callback: (event: any) => {},
    type: typeOption,
    pageSlug?: string
  }>;

  /**
   @siteUrl to set site url to redirect to another page
    */
  siteUrl?: string;
  /**
   @timeOut To stop action 
    */
  timeOut: number; // In minute

}

declare enum typeOption {
  URL = "url",
  ACTION = 'action'
}