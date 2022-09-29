import {LitElement, html, css} from 'lit';

export class AtomicBreath extends LitElement {
  static properties = {
    totalSeconds: {type: Number},
    _remainingSeconds: {
      type: Number,
      state: true,
    },
  };

  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  constructor() {
    super();
    this.name = '';
    this.totalSeconds = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._remainingSeconds = this.totalSeconds;
    this.reduceTime();
  }

  reduceTime() {
    setTimeout(() => this._remainingSeconds--, 1000);
  }

  render() {
    return html` Remaining time: ${this._remainingSeconds} `;
  }
}

window.customElements.define('atomic-breath', AtomicBreath);
