var llarchitectes_cards = (function () {
	'use strict';

	// Cards : lien sur l'ensemble de l'élément
	// Source : https://inclusive-components.design/cards/#callstoaction
	const init = () => {
		let cards = document.querySelectorAll(".card");
		if (cards.length > 0) {
			console.log(cards);
			cards.forEach((card) => {
				card_add_link(card);
			});
		}
	};

	const card_add_link = (card) => {
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
	};

	const cards = {
		init: init,
	};

	return cards;

})();
