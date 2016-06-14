var HtmlWebpackPlugin = require('html-webpack-plugin');

// Metadata
const METADATA = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    ENV: process.env.ENV = process.env.NODE_ENV = "development",
    PRODUCTION: false,
    DEVELOPMENT: true,
};

// Directives to be used in CSP header
// References
// https://developer.mozilla.org/en-US/docs/Web/Security/CSP
// https://scotthelme.co.uk/csp-cheat-sheet
const cspDirectives = [
    "base-uri 'self'",
    "default-src 'self'",
    "child-src 'self'",
    "connect-src 'self' http://my.awesome.api ws://localhost:3000",  // http://my.awesome.api is due to the mock REST api mock baseUrl and ws://localhost:3000" is due to FakeRest
    "font-src 'self'",
    "form-action 'self'",
    "frame-src 'self'",   // TODO: deprecated. Use child-src instead. Used here because child-src is not yet supported by Firefox. Remove as soon as it is fully supported
    "frame-ancestors 'none'",  // the app will not be allowed to be embedded in an iframe (roughly equivalent to X-Frame-Options: DENY)
    "img-src 'self' data: image/png",  // data: image/png" is due to Angular Material loading PNG images in base64 encoding
    "media-src 'self'",
    "object-src 'self'",
    "plugin-types application/pdf",  // valid mime-types for plugins invoked via <object> and <embed>  // TODO: not yet supported by Firefox
    "script-src 'self' 'unsafe-eval' http://query.yahooapis.com",  // 'unsafe-eval' is due to Angular Material inline theming (see issue https://github.com/angular/material/issues/980)
    "style-src 'self' 'unsafe-inline'",  // 'unsafe-inline' is due to Angular Material inline theming (see issue https://github.com/angular/material/issues/980)
    "referrer no-referrer",
    "reflected-xss block",
    "block-all-mixed-content",
    "report-uri http://localhost"  // TODO: define an specific URL to POST the reports of policy failures
];


module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".html"]
    },

    module: {
        loaders: [
            // Support for .ts and .tsx files.
            // reference: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: [
                    /\.e2e\.ts$/, // exclude end-to-end tests
                    /\.spec\.ts$/, // exclude unit tests
                ],
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
    plugins: [new HtmlWebpackPlugin({
        template: "src/index.html"
    })],
    devServer: {
        port: METADATA.PORT,
        host: METADATA.HOST,

        // HTML5 History API support: no need for # in URLs
        // automatically redirect 404 errors to the index.html page
        // uses connect-history-api-fallback behind the scenes: https://github.com/bripkens/connect-history-api-fallback
        // reference: http://jaketrent.com/post/pushstate-webpack-dev-server/
        historyApiFallback: true,

        // Cache generated modules and chunks to improve performance for multiple incremental builds.
        // Enabled by default in watch mode.
        // You can pass false to disable it
        // reference: http://webpack.github.io/docs/configuration.html#cache
        cache: true,

        // Switch loaders to debug mode
        // reference: http://webpack.github.io/docs/configuration.html#debug
        debug: true,


        // file watch configuration
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        // contentBase: helpers.root("src/app"), // necessary so that assets are accessible

        // Can be used to add specific headers
        headers: {
            // enable CORS
            "Access-Control-Allow-Origin": "*",

            // CSP header (and its variants per browser)
            "Content-Security-Policy": cspDirectives.join("; "),
            "X-Content-Security-Policy": cspDirectives.join("; "),
            "X-WebKit-CSP": cspDirectives.join("; "),

            // Other security headers

            // protect against clickjacking: https://en.wikipedia.org/wiki/Clickjacking
            // reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options
            "X-Frame-Options": "deny",

            // enable some protection against XSS
            // reference: https://www.owasp.org/index.php/List_of_useful_HTTP_headers
            // other reference: http://blog.innerht.ml/the-misunderstood-x-xss-protection/
            "X-Xss-Protection": "1; mode=block",

            // protect against drive-by download attacks and user uploaded content that could be treated by Internet Explorer as executable or dynamic HTML files
            // reference: https://www.owasp.org/index.php/List_of_useful_HTTP_headers
            "X-Content-Type-Options": "nosniff",
        },
    }
};