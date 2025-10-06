import eslintJs from '@eslint/js';
import { defineConfig } from "eslint/config";
import lwcMobilePlugin from "@salesforce/eslint-plugin-lwc-mobile";
import lwcGraphAnalyzerPlugin from "@salesforce/eslint-plugin-lwc-graph-analyzer";


export default defineConfig([
    eslintJs.configs.recommended,

    // Salesforce LWC Mobile plugin configuration
    { 
        files: ["**/lwc/**/*.js"],
        plugins: {
            "eslintJs": eslintJs,
            "@salesforce/lwc-mobile": lwcMobilePlugin, 
            "@salesforce/lwc-graph-analyzer": lwcGraphAnalyzerPlugin 
        },
        extends: [
            eslintJs.configs.recommended,
            lwcMobilePlugin.recommendedConfigs, 
            lwcGraphAnalyzerPlugin.configs.recommended
        ],
    }
]);