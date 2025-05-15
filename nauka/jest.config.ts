import type { Config } from "@jest/types";

const config: Config.InitialOptions = {

    preset: "ts-jest",

    testEnvironment: "jsdom",

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    moduleNameMapper: {

        "\\.(css|less|scss|sass)$": "identity-obj-proxy",

        "^@/(.*)$": "<rootDir>/src/$1",

    },

    transform: {

        "^.+\\.(ts|tsx)$": [

            "ts-jest",

            {

                tsconfig: "tsconfig.json",

            },

        ],

    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$",

    globals: {

        "ts-jest": {

            diagnostics: {

                warnOnly: true, // Pozwala na uruchamianie testów nawet gdy są błędy TypeScript

            },

        },

    },

};

export default config;