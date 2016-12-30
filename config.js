const apps = ['kgwc', 'loan']

const dist = "dist";

const connect = {
    root: [dist],
    port: 4860
}

const stylus = {
    'compress': true,
    'include css': true,
    'include': ['apps', 'node_modules']
};

const webpack = {
    output: {
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    "presets": [
                        ["env", {
                            "targets": {
                                "browsers": ["defaults", "IE >= 8"]
                            }
                        }],
                        "react",
                        "stage-3"
                    ]
                }
            }
        ]
    }
};

module.exports = new Proxy({
        apps, dist, connect, stylus, webpack
    }, {
        get(target, name) {
            if (name in target)
                return target[name];
            else
                throw new ReferenceError("Config not defined: " + name);
        }
    }
);
