import BurgerMenu from "./burger-menu";

// BurgerMenu
if ("customElements" in window) {
	customElements.define("burger-menu", BurgerMenu);
}

// Cards : lien sur l'ensemble de l'élément
// Source : https://inclusive-components.design/cards/#callstoaction
const cards = document.querySelectorAll(".card");
if (cards.length > 0) {
	cards.forEach((card) => {
		let down,
			up,
			link = card.querySelector("h2 a");

		card.style.cursor = "pointer";

		card.onmousedown = () => (down = +new Date());
		card.onmouseup = () => {
			up = +new Date();
			if (up - down < 200) {
				link.click();
			}
		};
	});
}
