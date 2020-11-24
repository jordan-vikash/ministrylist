// https://browsersync.io/docs/options
module.exports = {
    server: {
        baseDir: "assets",
        index: "index.html",
        directory: true
    },
    files: [
        "assets/dist/**/*.css",
        // don't refresh on js changes
        "!assets/dist/**/*.js",
        "assets/**/*.html"
    ],
    notify: false,
    injectChanges: true,
    online: true,
    reloadOnRestart: true,
    logFileChanges: true,
    ghostMode: false,
    logLevel: "warn"
};

