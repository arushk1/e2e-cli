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
    .description("Create a new Fortigate firewall")
    .requiredOption("--name <name>", "Firewall name")
    .requiredOption("--plan <plan>", "Fortigate plan identifier")
    .requiredOption("--image <image>", "Fortigate image identifier")
    .requiredOption("--vpc-id <id>", "VPC ID")
    .requiredOption("--cn-id <id>", "Committed node SKU ID")
    .option("--label <label>", "Resource label", "Default")
    .option("--region <region>", "Region code", "ncr")
    .option("--reserve-ip <ip>", "Reserved IP to assign")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.firewalls.create({
        label: opts.label,
        name: opts.name,
        region: opts.region,
        plan: opts.plan,
        image: opts.image,
        vpc_id: Number(opts.vpcId),
        cn_id: Number(opts.cnId),
        reserve_ip: opts.reserveIp,
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
