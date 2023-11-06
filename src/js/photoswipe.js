import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";

let $portfolio = document.querySelector(".article_portfolio.portfolio");
const backEasing = {
	in: "cubic-bezier(0.6, -0.28, 0.7, 1)",
	out: "cubic-bezier(0.3, 0, 0.32, 1.275)",
	inOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

if ($portfolio) {
	const lightbox = new PhotoSwipeLightbox({
		gallery: $portfolio,
		children: "a.portfolio_img-link",
		showHideAnimationType: "zoom",
		showAnimationDuration: 500,
		hideAnimationDuration: 500,
		pswpModule: PhotoSwipe,
	});
	lightbox.on("firstUpdate", () => {
		lightbox.pswp.options.easing = backEasing.out;
	});
	lightbox.on("initialZoomInEnd", () => {
		lightbox.pswp.options.easing = backEasing.inOut;
	});
	lightbox.on("close", () => {
		lightbox.pswp.options.easing = backEasing.in;
	});
	lightbox.init();
}
