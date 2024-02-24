module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	root: true,
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	rules: {
		"no-debugger": "warn",
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": "warn",
		"@typescript-eslint/ban-ts-comment": "warn",
		"import/no-named-as-default-member": "off",
	},
	settings: {
		"import/resolver": {
			typescript: true,
			node: true,
		},
	},
};
