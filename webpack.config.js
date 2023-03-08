const { env: { NODE_ENV = "development", PORT = 3000 } = {} } = process;
const { resolve } = require("path");
const { HotModuleReplacementPlugin: HMRP } = require("webpack");
const MCEP = require("mini-css-extract-plugin");
const HWP = require("html-webpack-plugin");
const { CleanWebpackPlugin: CWP } = require("clean-webpack-plugin");
const EWP = require("eslint-webpack-plugin");

const isProduction = NODE_ENV === "production";
const resolvePath = (path = "") => resolve(`${process.cwd()}/${path}`);
const HotModuleReplacementPlugin = new HMRP();
const CleanWebpackPlugin = new CWP();
const EslintWebpackPlugin = new EWP();
const MiniCssExtractPlugin = new MCEP();
const HtmlWebpackPlugin = new HWP({
    template: resolvePath("public/index.html"),
});

const getFilename = () => isProduction ? "[name].min.js" : "[name].js";
const getStyleLoader = () => isProduction ? MCEP.loader : "style-loader";
const getDevTool = () => isProduction ? false : "inline-source-map";
const getPlugins = () => {
    const plugins = [
        CleanWebpackPlugin,
        EslintWebpackPlugin,
        HtmlWebpackPlugin,
    ];

    plugins.push(isProduction ?
        MiniCssExtractPlugin : HotModuleReplacementPlugin);

    return plugins;
};

/** @type { import('webpack').Configuration } */
module.exports = {
    entry: resolvePath("src/index.tsx"),
    output: {
        path: resolvePath("build"),
        filename: getFilename(),
    },
    mode: NODE_ENV,
    plugins: getPlugins(),
    resolve: {
        extensions: [".ts", ".tsx"],
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        port: PORT,
        hot: true,
    },
    optimization: {
        minimize: isProduction,
        splitChunks: {
            chunks: "all",
        },
    },
    devtool: getDevTool(),
    resolve: {
        extensions: [".tsx", ".ts", "..."],
    },
    module: {
        rules: [
            {
                test: /\.(?:ts|tsx)$/i,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/i,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(?:ttf)$/i,
                type: "asset/inline",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    getStyleLoader(),
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};
