import {LitElement, html, css} from 'lit';

export class AtomicBreath extends LitElement {
  static properties = {
    totalSeconds: {type: Number},
    allowSkip: {type: Boolean},
    _remainingSeconds: {
      type: Number,
      state: true,
    },
    _intervalId: {
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
    this.totalSeconds = 0;
    this.allowSkip = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._remainingSeconds = this.totalSeconds;
    this.reduceTime();
  }

  handleSkip() {
    this._remainingSeconds = 0;
    clearInterval(this._intervalId);
  }

  reduceTime() {
    this._intervalId = setInterval(() => this.reducingTime(), 1000);
  }

  reducingTime() {
    this._remainingSeconds--;

    if (!this._remainingSeconds) {
      clearInterval(this._intervalId);
    }
  }

  render() {
    const skipButton = html`<button @click="${this.handleSkip}">skip</button>`;
    return html` Remaining time: ${this._remainingSeconds} -
    ${this.allowSkip ? skipButton : ''}`;
  }
}

window.customElements.define('atomic-breath', AtomicBreath);
