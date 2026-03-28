import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerFirewallCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const fw = program.command("firewall").description("Manage firewalls");

  fw.command("list")
    .description("List all firewalls")
    .action(async () => {
      const client = getClient();
      const result = await client.firewalls.list();
      formatOutput(result.data, program.opts().output, ["id", "name"]);
    });

  fw.command("get")
    .description("Get firewall details")
    .requiredOption("--id <id>", "Firewall ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.firewalls.get(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });

  fw.command("create")
    .description("Create a new firewall")
    .requiredOption("--name <name>", "Firewall name")
    .option("--rules <rules>", "JSON array of rules")
    .action(async (opts) => {
      const client = getClient();
      const rules = opts.rules ? JSON.parse(opts.rules) : [];
      const result = await client.firewalls.create({
        name: opts.name,
        rules,
      });
      formatOutput(result.data, program.opts().output);
    });

  fw.command("delete")
    .description("Delete a firewall")
    .requiredOption("--id <id>", "Firewall ID")
    .action(async (opts) => {
      const client = getClient();
      await client.firewalls.delete(Number(opts.id));
      console.log(`Firewall ${opts.id} deleted.`);
    });
}
