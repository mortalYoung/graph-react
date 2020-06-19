import { ImxEventObject } from './mxEventObject';

/**
 * github: https://github.com/jgraph/mxgraph/blob/master/javascript/src/js/util/mxEventSource.js
 */
export class ImxEventSource {
  constructor(eventSource: any);
  // TODO What is the eventSource?
  eventListeners: null | [string, Function];
  eventsEnabled: boolean;
  eventSource: any;
  isEventsEnabled(): boolean;
  setEventsEnabled(value: boolean): void;
  getEventSource(): any;
  setEventSource(value: any): void;
  addListener(name: string, funct: Function): void;
  removeListener(funct: Function): void;
  fireEvent(evt: ImxEventObject, sender?: any): void;
}
