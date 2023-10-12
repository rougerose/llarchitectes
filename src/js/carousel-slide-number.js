/**
 * Extension Splide :
 * afficher le numéro de la slide courante et le nombre total de slides
 * format : Slide courante / Nombre total de slides disponibles
 * @param {*} Splide
 * @param {*} Components
 * @returns
 */
export function SlideNumber(Splide, Components) {
	const { track } = Components.Elements;

	let elm, elmIndex, elmLength, textLength;

	function mount() {
		// Créer les éléments
		elm = document.createElement("div");
		elmIndex = document.createElement("span");
		elmSeparator = document.createElement("span");
		elmLength = document.createElement("span");

		// Ajouter les classes
		elm.classList.add("splide__number");
		elmIndex.classList.add("number__index");
		elmLength.classList.add("number__length");
		elmSeparator.classList.add("number__separator");

		// Ajouter le séparateur texte
		elmSeparator.textContent = ` / `;

		// Ajouter le compteur total
		textLength = Splide.length.toString().padStart(2, "0");
		elmLength.textContent = `${textLength}`;

		// Ajouter les SPAN au DIV, puis au DOM
		elm.appendChild(elmIndex);
		elm.appendChild(elmSeparator);
		elm.appendChild(elmLength);
		track.parentElement.insertBefore(elm, track.nextSibling);

		update();
		Splide.on("move", update);
	}

	function update() {
		// Ajouter un zéro initial au compteur de l'élément courant
		let index = (Splide.index + 1).toString().padStart(2, "0");
		elm.firstChild.textContent = `${index}`;
	}

	return {
		mount,
	};
}
