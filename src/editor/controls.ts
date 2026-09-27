import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

export type FieldKind = "text" | "number" | "select" | "combo" | "boolean";

export interface FieldOption {
  value: string;
  label?: string;
}

let listCounter = 0;

/**
 * Minimal form field styled with Home Assistant theme tokens. Deliberately independent of HA's
 * internal components (ha-form, ha-selector), which are not a supported API for custom cards.
 * `combo` is a free-text input with suggestions (entities, attributes, states).
 */
@customElement("hv-field")
export class HvField extends LitElement {
  @property() public kind: FieldKind = "text";
  @property() public label = "";
  @property() public helper?: string;
  @property() public placeholder?: string;
  @property({ attribute: false }) public value?: string | number | boolean;
  @property({ attribute: false }) public options: FieldOption[] = [];

  private readonly _listId = `hv-list-${++listCounter}`;
  private readonly _inputId = `hv-input-${listCounter}`;

  static styles = css`
    :host {
      display: block;
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    input:not([type="checkbox"]),
    select {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 10px;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--ha-color-form-background, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    input:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
    }
    .check {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: inherit;
      color: var(--primary-text-color);
    }
    .check input {
      width: 18px;
      height: 18px;
      accent-color: var(--primary-color);
    }
    .helper {
      margin-top: 3px;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
  `;

  protected render(): TemplateResult {
    if (this.kind === "boolean") {
      return html`
        <label class="check">
          <input type="checkbox" .checked="${Boolean(this.value)}" @change="${this._onCheck}" />
          ${this.label}
        </label>
        ${this._renderHelper()}
      `;
    }

    if (this.kind === "select") {
      const current = this.value === undefined ? "" : String(this.value);
      return html`
        <label for="${this._inputId}">${this.label}</label>
        <select id="${this._inputId}" @change="${this._onInput}">
          ${this.options.map(
            (o) => html`<option value="${o.value}" ?selected="${o.value === current}">${o.label ?? o.value}</option>`
          )}
        </select>
        ${this._renderHelper()}
      `;
    }

    return html`
      <label for="${this._inputId}">${this.label}</label>
      <input
        id="${this._inputId}"
        type="${this.kind === "number" ? "number" : "text"}"
        step="any"
        autocomplete="off"
        placeholder="${this.placeholder ?? ""}"
        list="${this.kind === "combo" ? this._listId : ""}"
        .value="${this.value === undefined ? "" : String(this.value)}"
        @change="${this._onInput}"
      />
      ${this.kind === "combo"
        ? html`<datalist id="${this._listId}">
            ${this.options.map((o) => html`<option value="${o.value}">${o.label ?? ""}</option>`)}
          </datalist>`
        : nothing}
      ${this._renderHelper()}
    `;
  }

  private _renderHelper(): TemplateResult | typeof nothing {
    return this.helper ? html`<div class="helper">${this.helper}</div>` : nothing;
  }

  private _onCheck(ev: Event): void {
    this._emit((ev.target as HTMLInputElement).checked);
  }

  private _onInput(ev: Event): void {
    const raw = (ev.target as HTMLInputElement | HTMLSelectElement).value.trim();
    if (this.kind === "number") {
      this._emit(raw === "" ? undefined : Number(raw));
    } else {
      this._emit(raw === "" ? undefined : raw);
    }
  }

  private _emit(value: string | number | boolean | undefined): void {
    this.dispatchEvent(new CustomEvent("hv-change", { detail: { value } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hv-field": HvField;
  }
}
