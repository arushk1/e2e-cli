import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerReserveIpCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const rip = program
    .command("reserve-ip")
    .description("Manage reserved IPs");

  rip
    .command("list")
    .description("List all reserved IPs")
    .action(async () => {
      const client = getClient();
      const result = await client.reserveIps.list();
      formatOutput(result.data, program.opts().output, [
        "id",
        "ip_address",
        "status",
        "vm_name",
      ]);
    });

  rip
    .command("get")
    .description("Get reserved IP details")
    .requiredOption("--id <id>", "Reserve IP ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.reserveIps.get(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });

  rip
    .command("create")
    .description("Reserve a new IP address")
    .action(async () => {
      const client = getClient();
      const result = await client.reserveIps.create();
      formatOutput(result.data, program.opts().output);
    });

  rip
    .command("delete")
    .description("Release a reserved IP")
    .requiredOption("--id <id>", "Reserve IP ID")
    .action(async (opts) => {
      const client = getClient();
      await client.reserveIps.delete(Number(opts.id));
      console.log(`Reserved IP ${opts.id} released.`);
    });
}
