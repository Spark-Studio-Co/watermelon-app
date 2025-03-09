module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            ["module-resolver", {
                root: ["./"],
                alias: {
                    "@/src": "./src"
                },
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }],
            ["react-native-reanimated/plugin", {
                relativeSourceLocation: true,
            }],
        ]
    };
};