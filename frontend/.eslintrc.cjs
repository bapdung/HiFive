module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],

  ignorePatterns: ["build", "dist", "public"],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },

  plugins: ["react", "react-hooks", "prettier"],

  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },

  settings: {
    react: {
      version: "detect",
    },
  },
};
