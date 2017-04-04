module.exports = {
	"extends": "standard",
	"plugins": [
		"standard",
		"promise"
	],
	"parserOptions": {
			"ecmaVersion": 2017,
			"sourceType": "module",
			"ecmaFeatures": {
				"arrowFunctions": true,
				"binaryLiterals": true,
				"blockBindings": true,
				"classes": true,
				"defaultParams": true,
				"destructuring": true,
				"forOf": true,
				"generators": true,
				"modules": true,
				"objectLiteralComputedProperties": true,
				"objectLiteralDuplicateProperties": true,
				"objectLiteralShorthandMethods": true,
				"objectLiteralShorthandProperties": true,
				"octalLiterals": true,
				"regexUFlag": true,
				"regexYFlag": true,
				"spread": true,
				"superInFunctions": true,
				"templateStrings": true,
				"unicodeCodePointEscapes": true,
				"globalReturn": true,
				"experimentalObjectRestSpread": true
			}
    },
		rules: {
			"quotes": [2,"single"],
			"comma-dangle": ["error", "always"],
			"comma-dangle": ["error", "always-multiline"],
			"linebreak-style": [2,"unix"],
			"semi": [2,"always"],
			"no-console": 0
		}
};