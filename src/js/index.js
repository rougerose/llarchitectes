import BurgerMenu from "./burger-menu";

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
