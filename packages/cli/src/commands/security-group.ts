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

  sg.command("create")
    .description("Create a security group")
    .requiredOption("--name <name>", "Security group name")
    .option("--description <description>", "Security group description", "")
    .option("--rules <rules>", "JSON array of security group rules", "[]")
    .option("--default", "Make this the default security group")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.securityGroups.create({
        name: opts.name,
        description: opts.description,
        rules: JSON.parse(opts.rules),
        default: opts.default ?? false,
      });
      formatOutput(result.data, program.opts().output);
    });

  sg.command("update")
    .description("Update a security group")
    .requiredOption("--id <id>", "Security group ID")
    .option("--name <name>", "Security group name")
    .option("--description <description>", "Security group description")
    .option("--rules <rules>", "JSON array of security group rules")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.securityGroups.update(Number(opts.id), {
        name: opts.name,
        description: opts.description,
        rules: opts.rules ? JSON.parse(opts.rules) : undefined,
      });
      formatOutput(result.data, program.opts().output);
    });

  sg.command("delete")
    .description("Delete a security group")
    .requiredOption("--id <id>", "Security group ID")
    .action(async (opts) => {
      const client = getClient();
      await client.securityGroups.delete(Number(opts.id));
      console.log(`Security group ${opts.id} deleted.`);
    });

  sg.command("mark-default")
    .description("Mark a security group as the default")
    .requiredOption("--id <id>", "Security group ID")
    .action(async (opts) => {
      const client = getClient();
      await client.securityGroups.markDefault(Number(opts.id));
      console.log(`Security group ${opts.id} marked as default.`);
    });
}
