import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerImageCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const image = program.command("image").description("Manage images");

  image
    .command("list")
    .description("List available images")
    .option("--category <category>", "Filter by category")
    .option("--os <os>", "Filter by OS type")
    .option("--type <type>", "Image type (e.g., private)")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.images.list({
        display_category: opts.category,
        category: opts.os,
        image_type: opts.type,
      });
      formatOutput(result.data, program.opts().output, [
        "plan",
        "image",
        "location",
      ]);
    });

  image
    .command("list-categories")
    .description("List image categories")
    .action(async () => {
      const client = getClient();
      const result = await client.images.listCategories();
      formatOutput(result.data, "json");
    });

  image
    .command("list-saved")
    .description("List saved images")
    .action(async () => {
      const client = getClient();
      const result = await client.images.listSaved();
      formatOutput(result.data, program.opts().output, [
        "template_id",
        "name",
        "image_state",
      ]);
    });

  image
    .command("delete")
    .description("Delete a saved image")
    .requiredOption("--id <id>", "Image ID")
    .action(async (opts) => {
      const client = getClient();
      await client.images.delete(Number(opts.id));
      console.log(`Image ${opts.id} deleted.`);
    });
}
