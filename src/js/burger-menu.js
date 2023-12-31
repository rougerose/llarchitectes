import getFocusableElements from "./get-focusable-elements.js";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";

// Source https://piccalil.li/tutorial/build-a-fully-responsive-progressively-enhanced-burger-menu/
class BurgerMenu extends HTMLElement {
	constructor() {
		super();

		const self = this;

		this.state = new Proxy(
			{
				status: "open",
				enabled: false,
			},
			{
				set(state, key, value) {
					const oldValue = state[key];

					state[key] = value;
					if (oldValue !== value) {
						self.processStateChange();
					}
					return state;
				},
			}
		);
	}

	get maxWidth() {
		return parseInt(this.getAttribute("max-width") || 9999, 10);
	}

	connectedCallback() {
		this.initialMarkup = this.innerHTML;
		this.render();

		const observer = new ResizeObserver((observedItems) => {
			const { contentRect } = observedItems[0];
			this.state.enabled = contentRect.width <= this.maxWidth;
			// Récupérer la hauteur total du header,
			// pour la convertir en variable qui sera utilisée
			// par le menu version mobile et se décaler en hauteur
			// pour laisser le logo apparent à l'écran.
			this.root.style.setProperty(
				"--panel-top",
				Math.ceil(this.parentNode.parentNode.offsetHeight) + "px"
			);
		});

		// We want to watch the parent like a hawk
		observer.observe(this.parentNode);
	}

	render() {
		this.innerHTML = `
      <div class="burger-menu" data-element="burger-root">
        <button class="burger-menu__trigger" data-element="burger-menu-trigger" type="button" aria-label="Ouvrir le menu">
          <span class="burger-menu__bar" aria-hidden="true"></span>
        </button>
        <div class="burger-menu__panel" data-element="burger-menu-panel">
          ${this.initialMarkup}
        </div>
      </div>
    `;

		this.postRender();
	}

	postRender() {
		this.trigger = this.querySelector(
			'[data-element="burger-menu-trigger"]'
		);
		this.panel = this.querySelector('[data-element="burger-menu-panel"]');
		this.root = this.querySelector('[data-element="burger-root"]');
		this.focusableElements = getFocusableElements(this);

		if (this.trigger && this.panel) {
			this.toggle();

			this.trigger.addEventListener("click", (evt) => {
				evt.preventDefault();
				this.toggle();
			});

			document.addEventListener("focusin", () => {
				if (!this.contains(document.activeElement)) {
					this.toggle("closed");
				}
			});

			return;
		}

		this.innerHTML = this.initialMarkup;
	}

	toggle(forcedStatus) {
		if (forcedStatus) {
			if (this.state.status === forcedStatus) {
				return;
			}

			this.state.status = forcedStatus;
		} else {
			this.state.status =
				this.state.status === "closed" ? "open" : "closed";
		}
	}

	processStateChange() {
		this.root.setAttribute("status", this.state.status);
		this.root.setAttribute(
			"enabled",
			this.state.enabled ? "true" : "false"
		);

		this.manageFocus();

		switch (this.state.status) {
			case "closed":
				this.trigger.setAttribute("aria-expanded", "false");
				this.trigger.setAttribute("aria-label", "Open menu");
				enableBodyScroll(this);
				break;
			case "open":
			case "initial":
				this.trigger.setAttribute("aria-expanded", "true");
				this.trigger.setAttribute("aria-label", "Close menu");
				disableBodyScroll(this);
				break;
		}
	}

	manageFocus() {
		if (!this.state.enabled) {
			this.focusableElements.forEach((element) =>
				element.removeAttribute("tabindex")
			);
			return;
		}

		switch (this.state.status) {
			case "open":
				this.focusableElements.forEach((element) =>
					element.removeAttribute("tabindex")
				);
				break;
			case "closed":
				[...this.focusableElements]
					.filter(
						(element) =>
							element.getAttribute("data-element") !==
							"burger-menu-trigger"
					)
					.forEach((element) =>
						element.setAttribute("tabindex", "-1")
					);
				break;
		}
	}
}

// if ("customElements" in window) {
// 	customElements.define("burger-menu", BurgerMenu);
// }

export default BurgerMenu;
