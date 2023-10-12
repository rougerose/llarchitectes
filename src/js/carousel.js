import Splide from "@splidejs/splide";
import { SlideNumber } from "./carousel-slide-number";

let carousels = document.querySelectorAll(".splide");

carousels.forEach((carousel) => {
	let splide = new Splide(carousel, {
		arrowPath:
			"m31.9 13.4-1.41 1.41 4.21 4.21h-33.1v2h33.1l-4.21 4.21 1.41 1.41 5.21-5.21 1.42-1.41-1.42-1.41z",
		classes: {
			arrows: "splide__arrows portfolio_navigation",
		},
		i18n: {
			prev: "Image précédente",
			next: "Image suivante",
		},
		pagination: false,
		drag: true,
		autoWidth: true,
	});
	splide.mount({ SlideNumber });
});
