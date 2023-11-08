import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const srcDir = "src/js/";
const destDir = "dist/js/";
const terserOptions = {
	compress: { passes: 3 },
	module: true,
	mangle: true,
	nameCache: {},
};
const outputPlugins = () => [
	process.env.NODE_ENV === "production" && terser(terserOptions),
];

function build(src, dist, name) {
	return {
		input: srcDir + src,
		plugins: [resolve(), commonjs()],
		output: {
			file: destDir + dist,
			format: "es",
			// name,
			plugins: outputPlugins(),
		},
	};
}

export default [
	build("index.js", "llarchitectes.js", ""),
	build("photoswipe.js", "llarchitectes_photoswipe.js", ""),
	build("filtrer_projets.js", "llarchitectes_filtrer_projets.js", ""),
	//build("carousel.js", "llarchitectes_carousel.js", ""),
];
