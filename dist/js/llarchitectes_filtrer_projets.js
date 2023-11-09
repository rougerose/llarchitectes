$(function () {
	// $("#t1").on("click", function () {
	// 	ajaxReload("projets_body", { args: { id_article: 3 }, history: true });
	// });

	$("#t1").on("click", function () {
		event.preventDefault();
		ajaxReload("projets_body", { args: { id_article: 3 }, history: true });
	});

	// $(".filters_list").on("click", "input[type='checkbox']", function () {
	// 	// let $form = $(this).parents("form");
	// 	// $inputs = $form.find("input[type='checkbox']"),
	// 	// filtres = inputsChecked($inputs),
	// 	// params = { mots: [] };

	// 	ajaxReload("projets_body", { args: { id_article: 3 }, history: true });
	// });

	/**
	 * Prise en charge des filtres et rechargement des blocs ajax
	 */
	// $(".formulaire_filtrer_projets").on(
	// 	"click",
	// 	"input[type='checkbox']",
	// 	function () {
	// 		let $form = $(this).parents("form"),
	// 			// récupérer tous les checkbox...
	// 			$inputs = $form.find("input[type='checkbox']"),
	// 			// et parmi cette sélection, ceux qui sont sélectionnés
	// 			filtres = lla_inputsChecked($inputs),
	// 			// stocker les filtres dans un objet param
	// 			params = { mots: [] };

	// 		// Ajouter/supprimer la classe is-checked au parent du checkbox
	// 		$(this).parent().toggleClass("is-checked");

	// 		// Récupérer les id des filtres (mots) sélectionnés
	// 		// et les ajouter à l'url de la page en cours via ajaxReload
	// 		filtres.ids.forEach(function (id) {
	// 			params.mots.push(id);
	// 		});

	// 		// Récupérer les titres des filtres sélectionnés
	// 		// filtres.titles.forEach(function (title) {
	// 		// 	console.log(title);
	// 		// });

	// 		// Recharger la liste des projets et mettre à jour historique et url du navigateur
	// 		ajaxReload("projets_body", {
	// 			// history: true,
	// 			args: params,
	// 		});

	// 		// Recharcher le fil d'Ariane
	// 		// ajaxReload("projets_breadcrumb", { args: params });
	// 		// Recharger le titre de la page
	// 		// ajaxReload("projets_header", { args: params });
	// 	}
	// );

	/**
	 * Bouton de suppression des filtres et recharchement des blocs ajax
	 */

	// $(".filters_reset").on("click", "button", function () {
	// 	event.preventDefault();
	// 	let url = $(this).attr("data-self");
	// 	// Recharger la liste des projets
	// 	ajaxReload("projets_body", {
	// 		history: true,
	// 		href: url,
	// 	});
	// 	// et le fil d'Ariane
	// 	ajaxReload("projets_breadcrumb", { href: url });
	// 	// et le titre de la page
	// 	ajaxReload("projets_header", { href: url });
	// });

	/**
	 * Stocker dans un objet les filtres sélectionnés.
	 * Les identifiants et les titres sont réunis dans des tableaux spécifiques
	 * @param {*} $inputs
	 * @returns
	 */
	// const inputsChecked = ($inputs) => {
	// 	let checkedValues = { ids: [], titles: [] };
	// 	if ($inputs.length > 0) {
	// 		$inputs.each(function () {
	// 			if ($(this).is(":checked")) {
	// 				checkedValues.ids.push($(this).val());
	// 				checkedValues.titles.push($(this).attr("data-title"));
	// 			}
	// 		});
	// 	}
	// 	return checkedValues;
	// };
});
