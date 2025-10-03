import js from '@eslint/js';
import { defineConfig } from "eslint/config";
import lwcMobilePlugin from "@salesforce/eslint-plugin-lwc-mobile";
import lwcGraphAnalyzerPlugin from "@salesforce/eslint-plugin-lwc-graph-analyzer";


export default defineConfig([
    js.configs.recommended,

    // Salesforce LWC Mobile plugin configuration
    { 
        files: ["**/lwc/**/*.js"],
        plugins: { 
            "@salesforce/lwc-mobile": lwcMobilePlugin, 
            "@salesforce/lwc-graph-analyzer": lwcGraphAnalyzerPlugin 
        },
        extends: [
            lwcMobilePlugin.recommendedConfigs, 
            lwcGraphAnalyzerPlugin.configs.recommended
        ],
    }
]);