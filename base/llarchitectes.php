<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

// Ajout d'un champ "Date de réalisation" dans les articles de la rubrique Projets
function llarchitectes_declarer_champs_extras($champs = array()) {
	$champs['spip_articles']['date_projet'] = array(
		// Le type de saisie
        'saisie' => 'date',
        'options' => array(
            // Le nom du champ dans la base de données
            'nom' => 'date_projet',
            // Le label affiché dans l'espace privé du site
            'label' => _T('llarchitectes:date_projet_label_prive'),
            // L'explication affichée dans l'espace privé du site
            // 'explication' => _T('prefixe:chaine_de_langue_date_diffusion_explication'),
            // Le type d'info attendue
            'sql' => "datetime DEFAULT '0000-00-00 00:00:00' NOT NULL",
            // La valeur par défaut
            'defaut' => '',
            // Le champ est obligatoire
            'obligatoire' => 'oui',
            // Afficher ce champ uniquement pour les articles du secteur n°1
            'restrictions'=> array(
                'secteur' => '1'
            ),
       ),
        // Vérifier et normaliser les infos saisies avant de les insérer dans la base
        'verifier' => array(
            'type' => 'date',
            'options' => array(
                'normaliser' => 'datetime',
			),
        ),
	);

	return $champs;
}
