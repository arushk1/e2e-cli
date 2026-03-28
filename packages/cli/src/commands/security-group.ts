import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerSecurityGroupCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const sg = program
    .command("security-group")
    .description("Manage security groups");

  sg.command("list")
    .description("List all security groups")
    .action(async () => {
      const client = getClient();
      const result = await client.securityGroups.list();
      formatOutput(result.data, program.opts().output, [
        "id",
        "name",
        "description",
      ]);
    });

  sg.command("get")
    .description("Get security group details")
    .requiredOption("--id <id>", "Security group ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.securityGroups.get(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });
}
