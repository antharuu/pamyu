module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended', 'plugin:vue/recommended'],
    plugins: ["vue", "simple-import-sort"],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".vue"]
            }
        }
    },
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/naming-convention": ["error", {
            "selector": "variable", "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        }],
        "func-style": ["error", "declaration"],
        "no-var": "error",
        "prefer-const": "error",
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "complexity": ["error", {"max": 10}],
        "no-with": "error",
        "no-eval": "error",
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": ["error", {
            "groups": [["^\\u0000"], ["^@?\\w"], ["^/"], ["/stores/"], ["/utils/"], ["/routes/"], ["/types/"], ["/layouts/"], ["/components/"], ["^\\.\\.(?!/?$)", "^\\.\\./?$"], ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], ["^.+\\.s?css$"],]
        }]
    }
}
