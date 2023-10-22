import BurgerMenu from "./burger-menu";
// import Splide from "@splidejs/splide";
// import { SlideNumber } from "./carousel-slide-number";

// let carousels = document.querySelectorAll(".splide");

// if (carousels) {
// 	carousels.forEach((carousel) => {
// 		let splide = new Splide(carousel, {
// 			arrowPath:
// 				"m31.9 13.4-1.41 1.41 4.21 4.21h-33.1v2h33.1l-4.21 4.21 1.41 1.41 5.21-5.21 1.42-1.41-1.42-1.41z",
// 			classes: {
// 				arrows: "splide__arrows portfolio_navigation",
// 			},
// 			i18n: {
// 				prev: "Image précédente",
// 				next: "Image suivante",
// 			},
// 			pagination: false,
// 			drag: true,
// 			autoWidth: true,
// 		});
// 		splide.mount({ SlideNumber });
// 	});
// }

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
			link = card.querySelector(".card_title a");

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
