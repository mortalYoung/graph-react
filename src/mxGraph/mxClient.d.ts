/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/mxClient.js
 */
export type mxClient = {
  VERSION: string;
  IS_IE: boolean;
  IS_IE6: boolean;
  IS_IE11: boolean;
  IS_EDGE: boolean;
  IS_QUIRKS: boolean;
  IS_EM: boolean;
  VML_PREFIX: string;
  OFFICE_PREFIX: string;
  IS_NS: boolean;
  IS_OP: boolean;
  IS_OT: boolean;
  IS_SF: boolean;
  IS_ANDROID: boolean;
  IS_IOS: boolean;
  IOS_VERSION: number;
  IS_GC: boolean;
  IS_CHROMEAPP: boolean;
  IS_FF: boolean;
  IS_MT: boolean;
  IS_VML: boolean;
  IS_SVG: boolean;
  NO_FO: boolean;
  IS_WIN: boolean;
  IS_MAC: boolean;
  IS_CHROMEOS: boolean;
  IS_TOUCH: boolean;
  IS_POINTER: boolean;
  IS_LOCAL: boolean;
  defaultBundles: string[];
  isBrowserSupported(): boolean;
  link(rel: string, href: string, doc?: Document, id?: string): void;
  loadResources(fn: Function, lan?: string): void;
  include(src: string): void;
};
