<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

// Inclure l'API Champs Extras
include_spip('inc/cextras');

// Inclure les champs déclarés à l'étape précédente
include_spip('base/llarchitectes');

function llarchitectes_upgrade($nom_meta_base_version,$version_cible) {
	$maj = array();
	// Première déclaration à l'installation du plugin
	cextras_api_upgrade(llarchitectes_declarer_champs_extras(), $maj['create']);

	include_spip('base/upgrade');
	maj_plugin($nom_meta_base_version, $version_cible, $maj);
}

// Désinstaller proprement le plugin en supprimant les champs de la base de données
function llarchitectes_vider_tables($nom_meta_base_version) {
	cextras_api_vider_tables(llarchitectes_declarer_champs_extras());
	effacer_meta($nom_meta_base_version);
}
