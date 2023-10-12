import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const output_plugins = [process.env.NODE_ENV === "production" && terser()];

export default [
	{
		input: {
			main: "src/js/index.js",
			// carousel: "src/js/carousel.js",
		},
		plugins: [resolve(), commonjs()],
		output: [
			{
				entryFileNames: "clla_[name].js",
				format: "es",
				plugins: output_plugins,
				dir: "dist/js",
			},
		],
	},
	// {
	// 	input: "src/js/index.js",
	// 	plugins: [resolve(), commonjs()],
	// 	output: [
	// 		{
	// 			file: "dist/js/clla.js",
	// 			format: "es",
	// 			plugins: output_plugins,
	// 		},
	// 	],
	// },
	// {
	// 	input: "src/js/carousel.js",
	// 	plugins: [resolve()],
	// 	output: [
	// 		{
	// 			file: "dist/js/clla_carousel.js",
	// 			format: "es",
	// 			plugins: output_plugins,
	// 		},
	// 	],
	// },
];
