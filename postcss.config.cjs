module.exports = (ctx) => ({
	plugins: {
		autoprefixer: {},
		"postcss-csso":
			ctx.env === "production"
				? { restructure: false }
				: ctx.env === "test"
				? { restructure: false }
				: false,
	},
});
