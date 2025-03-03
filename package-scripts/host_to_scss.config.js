/**
 * Ajouter un fichier scss contenant la variable $host
 * qui dépend de l'environnement developpement ou production.
 */
const fs = require("fs/promises");
const pkg = require("./package.json");

async function add_host_variable() {
	try {
		let comment = `// La variable $host est utilisée lors de la compilation
// des webfonts pour tenir compte du contexte (local, test ou production)
// et de l'emplacement des fichiers dans la mesure où ils ne sont pas indexés
// dans le dépôt du projet.
`;
		let content = "$host: " + JSON.stringify(pkg.config.host.local) + ";";

		if (process.env.NODE_ENV === "test") {
			content = "$host: " + JSON.stringify(pkg.config.host.test) + ";";
		}

		if (process.env.NODE_ENV === "production") {
			content = "$host: " + JSON.stringify(pkg.config.host.prod) + ";";
		}

		content = comment + content;

		await fs.writeFile("./src/scss/abstract/_host.scss", content);
	} catch (err) {
		console.log(err);
	}
}

add_host_variable();
