/**
 * Returns back a NodeList of focusable elements
 * that exist within the passed parnt HTMLElement
 *
 * @param {HTMLElement} parent HTML element
 * @returns {NodeList} The focusable elements that we can find
 */
var getFocusableElements = (parent) => {
	if (!parent) {
		console.warn("You need to pass a parent HTMLElement");
		return [];
	}

	return parent.querySelectorAll(
		'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
	);
};

/**
 * name: body-scroll-lock-upgrade
 * version: v1.0.4
 * author: Rick.li
 */
let hasPassiveEvents = false;
if (typeof window !== "undefined") {
  const passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return void 0;
    }
  };
  window.addEventListener("testPassive", null, passiveTestOptions);
  window.removeEventListener("testPassive", null, passiveTestOptions);
}
const isIosDevice = typeof window !== "undefined" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
let locks = [];
let locksIndex = /* @__PURE__ */ new Map();
let documentListenerAdded = false;
let initialClientY = -1;
let previousBodyOverflowSetting;
let htmlStyle;
let bodyStyle;
let previousBodyPaddingRight;
const allowTouchMove = (el) => locks.some((lock) => {
  if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
    return true;
  }
  return false;
});
const preventDefault = (rawEvent) => {
  const e = rawEvent || window.event;
  if (allowTouchMove(e.target)) {
    return true;
  }
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
};
const setOverflowHidden = (options) => {
  if (previousBodyPaddingRight === void 0) {
    const reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
    if (reserveScrollBarGap && scrollBarGap > 0) {
      const computedBodyPaddingRight = parseInt(
        window.getComputedStyle(document.body).getPropertyValue("padding-right"),
        10
      );
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
    }
  }
  if (previousBodyOverflowSetting === void 0) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
};
const restoreOverflowSetting = () => {
  if (previousBodyPaddingRight !== void 0) {
    document.body.style.paddingRight = previousBodyPaddingRight;
    previousBodyPaddingRight = void 0;
  }
  if (previousBodyOverflowSetting !== void 0) {
    document.body.style.overflow = previousBodyOverflowSetting;
    previousBodyOverflowSetting = void 0;
  }
};
const setPositionFixed = () => window.requestAnimationFrame(() => {
  const $html = document.documentElement;
  const $body = document.body;
  if (bodyStyle === void 0) {
    htmlStyle = { ...$html.style };
    bodyStyle = { ...$body.style };
    const { scrollY, scrollX, innerHeight } = window;
    $html.style.height = "100%";
    $html.style.overflow = "hidden";
    $body.style.position = "fixed";
    $body.style.top = `${-scrollY}px`;
    $body.style.left = `${-scrollX}px`;
    $body.style.width = "100%";
    $body.style.height = "auto";
    $body.style.overflow = "hidden";
    setTimeout(
      () => window.requestAnimationFrame(() => {
        const bottomBarHeight = innerHeight - window.innerHeight;
        if (bottomBarHeight && scrollY >= innerHeight) {
          $body.style.top = -(scrollY + bottomBarHeight) + "px";
        }
      }),
      300
    );
  }
});
const restorePositionSetting = () => {
  if (bodyStyle !== void 0) {
    const y = -parseInt(document.body.style.top, 10);
    const x = -parseInt(document.body.style.left, 10);
    const $html = document.documentElement;
    const $body = document.body;
    $html.style.height = (htmlStyle == null ? void 0 : htmlStyle.height) || "";
    $html.style.overflow = (htmlStyle == null ? void 0 : htmlStyle.overflow) || "";
    $body.style.position = bodyStyle.position || "";
    $body.style.top = bodyStyle.top || "";
    $body.style.left = bodyStyle.left || "";
    $body.style.width = bodyStyle.width || "";
    $body.style.height = bodyStyle.height || "";
    $body.style.overflow = bodyStyle.overflow || "";
    window.scrollTo(x, y);
    bodyStyle = void 0;
  }
};
const isTargetElementTotallyScrolled = (targetElement) => targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
const handleScroll = (event, targetElement) => {
  const clientY = event.targetTouches[0].clientY - initialClientY;
  if (allowTouchMove(event.target)) {
    return false;
  }
  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    return preventDefault(event);
  }
  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    return preventDefault(event);
  }
  event.stopPropagation();
  return true;
};
const disableBodyScroll = (targetElement, options) => {
  if (!targetElement) {
    console.error(
      "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
    );
    return;
  }
  locksIndex.set(
    targetElement,
    (locksIndex == null ? void 0 : locksIndex.get(targetElement)) ? (locksIndex == null ? void 0 : locksIndex.get(targetElement)) + 1 : 1
  );
  if (locks.some((lock2) => lock2.targetElement === targetElement)) {
    return;
  }
  const lock = {
    targetElement,
    options: options || {}
  };
  locks = [...locks, lock];
  if (isIosDevice) {
    setPositionFixed();
  } else {
    setOverflowHidden(options);
  }
  if (isIosDevice) {
    targetElement.ontouchstart = (event) => {
      if (event.targetTouches.length === 1) {
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = (event) => {
      if (event.targetTouches.length === 1) {
        handleScroll(event, targetElement);
      }
    };
    if (!documentListenerAdded) {
      document.addEventListener(
        "touchmove",
        preventDefault,
        hasPassiveEvents ? { passive: false } : void 0
      );
      documentListenerAdded = true;
    }
  }
};
const enableBodyScroll = (targetElement) => {
  if (!targetElement) {
    console.error(
      "enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices."
    );
    return;
  }
  locksIndex.set(
    targetElement,
    (locksIndex == null ? void 0 : locksIndex.get(targetElement)) ? (locksIndex == null ? void 0 : locksIndex.get(targetElement)) - 1 : 0
  );
  if ((locksIndex == null ? void 0 : locksIndex.get(targetElement)) === 0) {
    locks = locks.filter((lock) => lock.targetElement !== targetElement);
    locksIndex == null ? void 0 : locksIndex.delete(targetElement);
  }
  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;
    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener(
        "touchmove",
        preventDefault,
        hasPassiveEvents ? { passive: false } : void 0
      );
      documentListenerAdded = false;
    }
  }
  if (locks.length === 0) {
    if (isIosDevice) {
      restorePositionSetting();
    } else {
      restoreOverflowSetting();
    }
  }
};

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

// BurgerMenu
if ("customElements" in window) {
	customElements.define("burger-menu", BurgerMenu);
}

// Back to top Observer
// https://m.signalvnoise.com/how-to-back-to-top-button-without-scroll-events/
// et https://codepen.io/jasonzimdars/pen/LMaRKq
const scrollTarget = document.querySelector(".back-to-top");
const Observercallback = (entries, observer) => {
	entries.forEach((entry) => {
		entry.target.classList.toggle("is-intersecting", entry.isIntersecting);
	});
};
const observer = new IntersectionObserver(Observercallback, {});

observer.observe(scrollTarget);
