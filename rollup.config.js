import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const srcDir = "src/js/";
const destDir = "dist/js/";
const terserOptions = {
	compress: { passes: 6, join_vars: false, sequences: false },
	module: true,
	mangle: false,
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
			name,
			plugins: outputPlugins(),
		},
	};
}

export default [build("index.js", "llarchitectes.js", "LLA")];

// export default [
// 	{
// 		input: {
// 			main: "src/js/index.js",
// 			// carousel: "src/js/carousel.js",
// 		},
// 		plugins: [resolve(), commonjs()],
// 		output: [
// 			{
// 				entryFileNames: "clla_[name].js",
// 				format: "es",
// 				plugins: output_plugins,
// 				dir: "dist/js",
// 			},
// 		],
// 	},
// 	// {
// 	// 	input: "src/js/index.js",
// 	// 	plugins: [resolve(), commonjs()],
// 	// 	output: [
// 	// 		{
// 	// 			file: "dist/js/clla.js",
// 	// 			format: "es",
// 	// 			plugins: output_plugins,
// 	// 		},
// 	// 	],
// 	// },
// 	// {
// 	// 	input: "src/js/carousel.js",
// 	// 	plugins: [resolve()],
// 	// 	output: [
// 	// 		{
// 	// 			file: "dist/js/clla_carousel.js",
// 	// 			format: "es",
// 	// 			plugins: output_plugins,
// 	// 		},
// 	// 	],
// 	// },
// ];
