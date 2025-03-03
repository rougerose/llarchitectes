let url = process.env.DDEV_HOSTNAME;

module.exports = {
	open: false,
	ui: false,
	proxy: { target: "localhost" },
	host: url,
	// logLevel: "debug",
	files: ["./**/*.html", "./dist/js/*.js", "./dist/css/*.css"],
	ignore: ["./node_modules", "./vendor"],
	server: false,
};
