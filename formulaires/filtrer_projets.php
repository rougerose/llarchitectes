<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

function formulaires_filtrer_projets_charger($id_rubrique = '', $articles = []) {
	$valeurs = [
		'articles' => $articles,
		'mots' => _request('mots'),
		'id_rubrique' => $id_rubrique,
	];
	return $valeurs;
}

function formulaires_filtrer_projets_verifier($id_rubrique = '', $articles = []) {
	$erreurs = [];
	return $erreurs;
}

function formulaires_filtrer_projets_traiter($id_rubrique = '', $articles = []) {
	$retour = [];
	refuser_traiter_formulaire_ajax();
	$mots = _request('mots');
	$self = self();
	if ($mots) {
		$redirection = parametre_url($self, 'mots', '');
		$mots = array_unique($mots);
		$retour['redirect'] = parametre_url($redirection, 'mots', $mots);
	}
	return $retour;
}
