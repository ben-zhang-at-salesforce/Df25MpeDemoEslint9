const eslintJs = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const lwcMobilePlugin = require("@salesforce/eslint-plugin-lwc-mobile");
const lwcGraphAnalyzerPlugin = require("@salesforce/eslint-plugin-lwc-graph-analyzer");

module.exports = defineConfig([
  // Salesforce LWC Mobile plugin configuration
  {
    files: ["**/lwc/**/*.js"],
    plugins: {
      eslintJs: eslintJs,
      "@salesforce/lwc-mobile": lwcMobilePlugin,
      "@salesforce/lwc-graph-analyzer": lwcGraphAnalyzerPlugin
    },
    extends: [
      eslintJs.configs.recommended,
      lwcMobilePlugin.recommendedConfigs,
      lwcGraphAnalyzerPlugin.configs.recommended
    ]
  }
]);
