// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config({
  ignores: [
    'node_modules/**',
    'dist/**',
    '.angular/**',
    'out-tsc/**',
    'coverage/**',
    '*.js',
    '*.mjs',
    '!eslint.config.mjs',
  ],
}, // Base configurations
eslint.configs.recommended, ...tseslint.configs.recommended, prettierConfig, // TypeScript files configuration
{
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    '@angular-eslint': angular,
    prettier: prettier,
  },
  rules: {
    // ═══════════════════════════════════════════════════════════
    // PRETTIER INTEGRATION
    // ═══════════════════════════════════════════════════════════
    'prettier/prettier': 'error',

    // ═══════════════════════════════════════════════════════════
    // TYPESCRIPT - TYPE SAFETY
    // ═══════════════════════════════════════════════════════════
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',

    // ═══════════════════════════════════════════════════════════
    // TYPESCRIPT - EXPLICIT TYPES
    // ═══════════════════════════════════════════════════════════
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: true,
      },
    ],

    // ═══════════════════════════════════════════════════════════
    // TYPESCRIPT - NAMING CONVENTIONS
    // ═══════════════════════════════════════════════════════════
    '@typescript-eslint/naming-convention': [
      'error',
      // Default: camelCase
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      // Variables: camelCase, UPPER_CASE (constants), PascalCase (components)
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      // Parameters: camelCase
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // Functions: camelCase
      {
        selector: 'function',
        format: ['camelCase'],
      },
      // Classes: PascalCase
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      // Interfaces: PascalCase starting with 'I'
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      // Type Aliases: PascalCase starting with 'T'
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
      // Enums: PascalCase starting with 'E'
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^E[A-Z]',
          match: true,
        },
      },
      // Enum Members: PascalCase or UPPER_CASE
      {
        selector: 'enumMember',
        format: ['PascalCase', 'UPPER_CASE'],
      },
      // Type Parameters (Generics): PascalCase starting with 'T'
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
      // Properties: allow any (for APIs, etc.)
      {
        selector: 'property',
        format: null,
      },
      // Private properties: camelCase with leading underscore
      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      // Protected properties: camelCase with leading underscore
      {
        selector: 'property',
        modifiers: ['protected'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      // Static readonly: UPPER_CASE
      {
        selector: 'property',
        modifiers: ['static', 'readonly'],
        format: ['UPPER_CASE'],
      },
      // Methods: camelCase
      {
        selector: 'method',
        format: ['camelCase'],
      },
      // Private methods: camelCase with leading underscore
      {
        selector: 'method',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      // Protected methods: camelCase with leading underscore
      {
        selector: 'method',
        modifiers: ['protected'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],

    // ═══════════════════════════════════════════════════════════
    // TYPESCRIPT - CODE QUALITY
    // ═══════════════════════════════════════════════════════════
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',

    // ═══════════════════════════════════════════════════════════
    // TYPESCRIPT - MEMBER ORDERING
    // ═══════════════════════════════════════════════════════════
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Index signature
          'signature',
          'call-signature',

          // Static
          'public-static-field',
          'protected-static-field',
          'private-static-field',

          // Fields
          'public-decorated-field',
          'protected-decorated-field',
          'private-decorated-field',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',

          'public-abstract-field',
          'protected-abstract-field',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          // Getters/Setters
          'public-static-get',
          'protected-static-get',
          'private-static-get',

          'public-decorated-get',
          'protected-decorated-get',
          'private-decorated-get',

          'public-instance-get',
          'protected-instance-get',
          'private-instance-get',

          'public-abstract-get',
          'protected-abstract-get',

          'public-static-set',
          'protected-static-set',
          'private-static-set',

          'public-decorated-set',
          'protected-decorated-set',
          'private-decorated-set',

          'public-instance-set',
          'protected-instance-set',
          'private-instance-set',

          'public-abstract-set',
          'protected-abstract-set',

          // Methods
          'public-static-method',
          'protected-static-method',
          'private-static-method',

          'public-decorated-method',
          'protected-decorated-method',
          'private-decorated-method',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',

          'public-abstract-method',
          'protected-abstract-method',
        ],
      },
    ],

    // ═══════════════════════════════════════════════════════════
    // ANGULAR - COMPONENT & DIRECTIVE RULES
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/component-class-suffix': [
      'error',
      {
        suffixes: ['Component', 'Page', 'Dialog', 'Modal'],
      },
    ],
    '@angular-eslint/directive-class-suffix': [
      'error',
      {
        suffixes: ['Directive'],
      },
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: '',
        style: 'kebab-case',
      },
    ],
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: '',
        style: 'camelCase',
      },
    ],
    '@angular-eslint/pipe-prefix': [
      'error',
      {
        prefixes: [''],
      },
    ],

    // ═══════════════════════════════════════════════════════════
    // ANGULAR - BEST PRACTICES
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/no-input-rename': 'error',
    '@angular-eslint/no-output-rename': 'error',
    '@angular-eslint/no-output-on-prefix': 'error',
    '@angular-eslint/no-output-native': 'error',
    '@angular-eslint/use-lifecycle-interface': 'error',
    '@angular-eslint/use-pipe-transform-interface': 'error',
    '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
    '@angular-eslint/use-component-selector': 'error',
    '@angular-eslint/use-component-view-encapsulation': 'warn',
    '@angular-eslint/contextual-lifecycle': 'error',
    '@angular-eslint/no-lifecycle-call': 'error',
    '@angular-eslint/no-conflicting-lifecycle': 'error',
    '@angular-eslint/no-empty-lifecycle-method': 'error',

    // ═══════════════════════════════════════════════════════════
    // ANGULAR - METADATA
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/no-inputs-metadata-property': 'error',
    '@angular-eslint/no-outputs-metadata-property': 'error',
    '@angular-eslint/no-queries-metadata-property': 'error',
    '@angular-eslint/prefer-output-readonly': 'error',
    '@angular-eslint/relative-url-prefix': 'error',
    '@angular-eslint/no-input-prefix': [
      'error',
      {
        prefixes: ['can', 'is', 'should', 'has'],
      },
    ],

    // ═══════════════════════════════════════════════════════════
    // ANGULAR - MODERN FEATURES
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/prefer-standalone': 'warn',
    '@angular-eslint/prefer-signals': 'warn',
    '@angular-eslint/no-forward-ref': 'warn',

    // ═══════════════════════════════════════════════════════════
    // GENERAL - BEST PRACTICES
    // ═══════════════════════════════════════════════════════════
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-object-spread': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'object-shorthand': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],

    // ═══════════════════════════════════════════════════════════
    // GENERAL - CODE QUALITY
    // ═══════════════════════════════════════════════════════════
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    curly: ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': ['error', { props: true }],
    'no-throw-literal': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'require-await': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',

    // ═══════════════════════════════════════════════════════════
    // GENERAL - IMPORTS
    // ═══════════════════════════════════════════════════════════
    'no-duplicate-imports': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    // ═══════════════════════════════════════════════════════════
    // GENERAL - COMPLEXITY
    // ═══════════════════════════════════════════════════════════
    complexity: ['warn', 15],
    'max-depth': ['error', 4],
    'max-lines': [
      'warn',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-lines-per-function': [
      'warn',
      {
        max: 150,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-params': ['error', 5],
    'max-nested-callbacks': ['error', 4],

    // ═══════════════════════════════════════════════════════════
    // GENERAL - DISABLED BASE RULES (use TypeScript versions)
    // ═══════════════════════════════════════════════════════════
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'always'],
  },
}, // HTML template files configuration
{
  files: ['**/*.html'],
  languageOptions: {
    parser: angularTemplateParser,
  },
  plugins: {
    '@angular-eslint/template': angularTemplate,
  },
  rules: {
    // ═══════════════════════════════════════════════════════════
    // ANGULAR TEMPLATES - SYNTAX
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/template/banana-in-box': 'error',
    '@angular-eslint/template/no-negated-async': 'error',
    '@angular-eslint/template/eqeqeq': [
      'error',
      {
        allowNullOrUndefined: true,
      },
    ],
    '@angular-eslint/template/prefer-self-closing-tags': 'error',
    '@angular-eslint/template/prefer-ngsrc': 'error',

    // ═══════════════════════════════════════════════════════════
    // ANGULAR TEMPLATES - PERFORMANCE
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/template/use-track-by-function': 'warn',
    '@angular-eslint/template/no-call-expression': 'warn',

    // ═══════════════════════════════════════════════════════════
    // ANGULAR TEMPLATES - QUALITY
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/template/no-duplicate-attributes': 'error',
    '@angular-eslint/template/no-positive-tabindex': 'error',

    // ═══════════════════════════════════════════════════════════
    // ANGULAR TEMPLATES - COMPLEXITY
    // ═══════════════════════════════════════════════════════════
    '@angular-eslint/template/conditional-complexity': [
      'warn',
      {
        maxComplexity: 4,
      },
    ],
    '@angular-eslint/template/cyclomatic-complexity': [
      'warn',
      {
        maxComplexity: 10,
      },
    ],
  },
}, storybook.configs["flat/recommended"]);
