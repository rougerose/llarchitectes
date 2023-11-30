<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

// Zcore
if (!isset($GLOBALS['z_blocs'])) {
	$GLOBALS['z_blocs'] = [
		'content',
		'head',
		'head_js',
		'header',
		'footer',
	];
}

// Appels de notes
define('_NOTES_OUVRE_REF', '<span class="spip_note_ref">&nbsp;');
define('_NOTES_FERME_REF', '</span>');
define('_NOTES_OUVRE_NOTE', '<span class="spip_note_ref">');
define('_NOTES_FERME_NOTE', '&nbsp;</span>');

// Titrer les documents
if (!defined('_TITRER_DOCUMENTS')) {
	define('_TITRER_DOCUMENTS', true);
}
