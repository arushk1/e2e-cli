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
        "ip_address",
        "reserve_id",
        "status",
        "vm_name",
      ]);
    });

  rip
    .command("get")
    .description("Get reserved IP details")
    .requiredOption("--ip-address <ip>", "Reserved IP address")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.reserveIps.get(opts.ipAddress);
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
    .requiredOption("--ip-address <ip>", "Reserved IP address")
    .action(async (opts) => {
      const client = getClient();
      await client.reserveIps.delete(opts.ipAddress);
      console.log(`Reserved IP ${opts.ipAddress} released.`);
    });

  rip
    .command("action")
    .description("Attach, detach, or live-reserve an IP for a node")
    .requiredOption("--ip-address <ip>", "Reserved IP address")
    .requiredOption("--vm-id <id>", "Node/VM ID")
    .requiredOption("--type <type>", "Action type: attach, detach, live-reserve")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.reserveIps.action(opts.ipAddress, {
        vm_id: Number(opts.vmId),
        type: opts.type,
      });
      formatOutput(result.data, program.opts().output);
    });

  rip
    .command("convert-floating")
    .description("Convert a reserved IP to a floating IP")
    .requiredOption("--ip-address <ip>", "Reserved IP address")
    .requiredOption("--node-ids <ids>", "Comma-separated node IDs")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.reserveIps.convertToFloating({
        ip_address: opts.ipAddress,
        node_ids: opts.nodeIds.split(",").map(Number),
      });
      formatOutput(result.data, program.opts().output);
    });

  rip
    .command("attach-floating")
    .description("Attach a floating IP to node IDs")
    .requiredOption("--ip-address <ip>", "Floating IP address")
    .requiredOption("--node-ids <ids>", "Comma-separated node IDs")
    .action(async (opts) => {
      const client = getClient();
      await client.reserveIps.attachFloating({
        ip_address: opts.ipAddress,
        node_ids: opts.nodeIds.split(",").map(Number),
      });
      console.log(`Floating IP ${opts.ipAddress} attached.`);
    });

  rip
    .command("detach-floating")
    .description("Detach a floating IP from node IDs")
    .requiredOption("--ip-address <ip>", "Floating IP address")
    .requiredOption("--node-ids <ids>", "Comma-separated node IDs")
    .action(async (opts) => {
      const client = getClient();
      await client.reserveIps.detachFloating({
        ip_address: opts.ipAddress,
        node_ids: opts.nodeIds.split(",").map(Number),
      });
      console.log(`Floating IP ${opts.ipAddress} detached.`);
    });
}
