import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerVpcCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const vpc = program
    .command("vpc")
    .description("Manage virtual private clouds");

  vpc
    .command("list")
    .description("List all VPCs")
    .action(async () => {
      const client = getClient();
      const result = await client.vpcs.list();
      formatOutput(result.data, program.opts().output, [
        "network_id",
        "name",
        "gateway_ip",
        "pool_size",
      ]);
    });

  vpc
    .command("get")
    .description("Get VPC details")
    .requiredOption("--id <id>", "VPC ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.vpcs.get(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });

  vpc
    .command("create")
    .description("Create a new VPC")
    .requiredOption("--name <name>", "VPC name")
    .option("--size <size>", "Network size", "512")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.vpcs.create({
        vpc_name: opts.name,
        network_size: Number(opts.size),
      });
      formatOutput(result.data, program.opts().output);
    });

  vpc
    .command("delete")
    .description("Delete a VPC")
    .requiredOption("--id <id>", "VPC ID")
    .action(async (opts) => {
      const client = getClient();
      await client.vpcs.delete(Number(opts.id));
      console.log(`VPC ${opts.id} deleted.`);
    });
}
