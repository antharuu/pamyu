export interface IConfig {
  /**
   * The current version of Pamyu
   */
  pamyuVersion: string;

  /**
   * The speed of the default transition
   * @default 0
   */
  transitionSpeed: number;

  /**
   * The speed of the default message
   * @default 0
   */
  messageSpeed: number;

  /**
   * The translation object
   * @default null
   */
  translation: unknown | null;

  /**
   * The default language
   * @default "en"
   */
  defaultLanguage: string;

  /**
   * The sides of the screen
   * @default ["left", "right"]
   */
  sides: string[];

  /**
   * The number of positions
   * @default 2
   */
  positions: number;
}
