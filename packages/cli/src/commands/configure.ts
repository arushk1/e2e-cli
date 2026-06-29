import type { Command } from "commander";
import inquirer from "inquirer";
import { saveConfig, loadConfig } from "../config.js";

export const SUPPORTED_REGIONS = ["Delhi", "Chennai"] as const;

export function registerConfigureCommand(program: Command): void {
  program
    .command("configure")
    .description("Configure E2E Cloud credentials")
    .action(async () => {
      const existing = loadConfig();

      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "apiKey",
          message: "API Key:",
          default: existing.apiKey,
        },
        {
          type: "password",
          name: "authToken",
          message: "Auth Token:",
          default: existing.authToken,
        },
        {
          type: "input",
          name: "defaultProjectId",
          message: "Default Project ID:",
          default: existing.defaultProjectId,
        },
        {
          type: "list",
          name: "defaultRegion",
          message: "Default Region:",
          choices: [...SUPPORTED_REGIONS],
          default: existing.defaultRegion ?? "Delhi",
        },
      ]);

      saveConfig(answers);
      console.log("Configuration saved to ~/.e2e/config.json");
    });
}
