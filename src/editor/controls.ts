import { css, html, LitElement, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { filterOptions, type FieldOption } from "./filter.js";

export type { FieldOption } from "./filter.js";

export type FieldKind = "text" | "number" | "select" | "combo" | "boolean";

let listCounter = 0;

/**
 * Minimal form field styled with Home Assistant theme tokens. Deliberately independent of HA's
 * internal components (ha-form, ha-selector), which are not a supported API for custom cards.
 * `combo` is a free-text input with its own suggestion list (entities, attributes, states); the native
 * datalist is not used because it is unreliable inside dialogs and the mobile app.
 */
@customElement("hv-field")
export class HvField extends LitElement {
  @property() public kind: FieldKind = "text";
  @property() public label = "";
  @property() public helper?: string;
  @property() public placeholder?: string;
  @property({ attribute: false }) public value?: string | number | boolean;
  @property({ attribute: false }) public options: FieldOption[] = [];
  /** Combo: only values from `options` are accepted and their labels are shown. */
  @property({ type: Boolean }) public strict = false;

  @state() private _open = false;
  @state() private _query = "";
  /** The user typed since focusing; until then the whole list is shown. */
  @state() private _typed = false;
  @state() private _active = -1;

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
    .listbox {
      max-height: 240px;
      margin: 4px 0 0;
      padding: 4px 0;
      overflow-y: auto;
      list-style: none;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-box-shadow-m, 0 2px 8px rgba(0, 0, 0, 0.3));
    }
    .listbox li {
      display: flex;
      flex-direction: column;
      padding: 6px 10px;
      cursor: pointer;
    }
    .listbox li.active,
    .listbox li:hover {
      background: var(--secondary-background-color);
    }
    .option-value {
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    .empty {
      padding: 6px 10px;
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

    if (this.kind === "combo") return this._renderCombo();

    return html`
      <label for="${this._inputId}">${this.label}</label>
      <input
        id="${this._inputId}"
        type="${this.kind === "number" ? "number" : "text"}"
        step="any"
        autocomplete="off"
        placeholder="${this.placeholder ?? ""}"
        .value="${this.value === undefined ? "" : String(this.value)}"
        @change="${this._onInput}"
      />
      ${this._renderHelper()}
    `;
  }

  private _matches(): FieldOption[] {
    return filterOptions(this.options, this._typed ? this._query : "");
  }

  private _renderCombo(): TemplateResult {
    const matches = this._open ? this._matches() : [];
    const current = this._displayValue();
    return html`
      <label for="${this._inputId}">${this.label}</label>
      <input
        id="${this._inputId}"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-expanded="${this._open}"
        aria-controls="${this._listId}"
        aria-activedescendant="${this._active >= 0 ? `${this._listId}-${this._active}` : nothing}"
        placeholder="${this.placeholder ?? ""}"
        .value="${this._open ? this._query : current}"
        @focus="${this._onFocus}"
        @input="${this._onType}"
        @keydown="${this._onKey}"
        @blur="${this._onBlur}"
      />
      ${this._open
        ? html`<ul id="${this._listId}" class="listbox" role="listbox">
            ${matches.length
              ? matches.map(
                  (o, i) => html`<li
                    id="${this._listId}-${i}"
                    role="option"
                    class="${i === this._active ? "active" : ""}"
                    aria-selected="${i === this._active}"
                    @mousedown="${(ev: Event) => ev.preventDefault()}"
                    @click="${() => this._select(o.value)}"
                  >
                    <span>${o.label ?? o.value}</span>
                    ${o.label ? html`<span class="option-value">${o.value}</span>` : nothing}
                  </li>`
                )
              : html`<li class="empty" role="presentation">—</li>`}
          </ul>`
        : nothing}
      ${this._renderHelper()}
    `;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("_active") && this._active >= 0) {
      this.renderRoot.querySelector("li.active")?.scrollIntoView({ block: "nearest" });
    }
  }

  private _displayValue(): string {
    if (this.value === undefined) return "";
    const value = String(this.value);
    return this.strict ? (this.options.find((o) => o.value === value)?.label ?? value) : value;
  }

  private _onFocus(): void {
    this._query = this._displayValue();
    this._typed = false;
    this._active = -1;
    this._open = true;
  }

  private _onType(ev: Event): void {
    this._query = (ev.target as HTMLInputElement).value;
    this._typed = true;
    this._active = -1;
    this._open = true;
  }

  private _onKey(ev: KeyboardEvent): void {
    const matches = this._matches();
    switch (ev.key) {
      case "ArrowDown":
        ev.preventDefault();
        this._open = true;
        this._active = Math.min(this._active + 1, matches.length - 1);
        break;
      case "ArrowUp":
        ev.preventDefault();
        this._active = Math.max(this._active - 1, 0);
        break;
      case "Enter":
        ev.preventDefault();
        if (this._open && this._active >= 0 && matches[this._active]) this._select(matches[this._active].value);
        else this._commitTyped();
        break;
      case "Escape":
        if (this._open) {
          ev.preventDefault();
          ev.stopPropagation();
          this._open = false;
        }
        break;
    }
  }

  private _onBlur(): void {
    if (this._open) this._commitTyped();
  }

  private _commitTyped(): void {
    this._open = false;
    if (!this._typed) return;
    const raw = this._query.trim();
    if (raw === "") {
      this._emit(undefined);
    } else if (!this.strict) {
      this._emit(raw);
    } else {
      const match = filterOptions(this.options, raw, 1)[0];
      if (match) this._emit(match.value);
    }
  }

  private _select(value: string): void {
    this._query = value;
    this._typed = false;
    this._open = false;
    this._emit(value);
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
