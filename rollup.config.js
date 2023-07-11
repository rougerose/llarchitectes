import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const output_plugins = [process.env.NODE_ENV === "production" && terser()];

export default [
	{
		input: "src/js/burger-menu.js",
		plugins: [resolve(), commonjs()],
		output: [
			{
				file: "dist/js/burger-menu.js",
				format: "es",
				plugins: output_plugins,
			},
		],
	},
];
