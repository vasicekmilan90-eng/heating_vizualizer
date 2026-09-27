import type { ReactiveController, ReactiveControllerHost } from "lit";

/** Context keys published by the Home Assistant frontend (src/data/context/index.ts). */
export const HA_CONTEXT = {
  states: "states",
  formatters: "hassFormatters",
  internationalization: "hassInternationalization",
} as const;

type ContextCallback<T> = (value: T, unsubscribe?: () => void) => void;

interface ContextRequestEvent<T> extends Event {
  context: string;
  contextTarget: Element;
  callback: ContextCallback<T>;
  subscribe: boolean;
}

/**
 * Consumes a Home Assistant frontend context via the Web Components context protocol,
 * as recommended for custom cards instead of relying on the `hass` property.
 */
export class HassContextConsumer<T> implements ReactiveController {
  public value?: T;

  private _unsubscribe?: () => void;

  constructor(
    private readonly _host: ReactiveControllerHost & HTMLElement,
    private readonly _context: string
  ) {
    _host.addController(this);
  }

  public hostConnected(): void {
    const event = new Event("context-request", {
      bubbles: true,
      composed: true,
    }) as ContextRequestEvent<T>;
    event.context = this._context;
    event.contextTarget = this._host;
    event.callback = this._callback;
    event.subscribe = true;
    this._host.dispatchEvent(event);
  }

  public hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = undefined;
  }

  private _callback: ContextCallback<T> = (value, unsubscribe) => {
    if (this._unsubscribe && this._unsubscribe !== unsubscribe) {
      this._unsubscribe();
    }
    this._unsubscribe = unsubscribe;
    if (value !== this.value) {
      this.value = value;
      this._host.requestUpdate();
    }
  };
}
