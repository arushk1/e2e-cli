import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerNodeCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const node = program.command("node").description("Manage compute nodes");

  node
    .command("list")
    .description("List all nodes")
    .action(async () => {
      const client = getClient();
      const result = await client.nodes.list();
      formatOutput(result.data, program.opts().output, [
        "id",
        "name",
        "status",
        "plan",
        "public_ip_address",
      ]);
    });

  node
    .command("get")
    .description("Get node details")
    .requiredOption("--id <id>", "Node ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.nodes.get(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });

  node
    .command("create")
    .description("Create a new node")
    .requiredOption("--name <name>", "Node name")
    .requiredOption("--plan <plan>", "Plan identifier (e.g., C-2)")
    .requiredOption("--image <image>", "Image name (e.g., Ubuntu-22.04-Starter)")
    .requiredOption("--ssh-keys <keys>", "Comma-separated SSH public keys")
    .option("--security-group-id <id>", "Security group ID")
    .option("--region <region>", "Region", "ncr")
    .option("--backups", "Enable backups")
    .option("--vpc-id <id>", "VPC ID")
    .option("--subnet-id <id>", "Subnet ID inside the VPC")
    .option("--reserve-ip <ip>", "Reserve IP to assign")
    .option("--default-public-ip", "Assign an auto-allocated public IP")
    .option("--number-of-instances <count>", "Number of nodes to create", "1")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.nodes.create({
        name: opts.name,
        plan: opts.plan,
        image: opts.image,
        security_group_id: opts.securityGroupId
          ? Number(opts.securityGroupId)
          : undefined,
        region: opts.region,
        ssh_keys: opts.sshKeys.split(","),
        backups: opts.backups ?? false,
        vpc_id: opts.vpcId ? Number(opts.vpcId) : undefined,
        subnet_id: opts.subnetId,
        reserve_ip: opts.reserveIp,
        default_public_ip: opts.defaultPublicIp ?? false,
        number_of_instances: Number(opts.numberOfInstances),
      });
      formatOutput(result.data, program.opts().output);
    });

  node
    .command("delete")
    .description("Delete a node")
    .requiredOption("--id <id>", "Node ID")
    .action(async (opts) => {
      const client = getClient();
      await client.nodes.delete(Number(opts.id));
      console.log(`Node ${opts.id} deleted.`);
    });

  node
    .command("action")
    .description(
      "Perform an action on a node (power_on, power_off, reboot, etc.)"
    )
    .requiredOption("--id <id>", "Node ID")
    .requiredOption("--type <type>", "Action type")
    .option("--name <name>", "New name (for rename action)")
    .action(async (opts) => {
      const client = getClient();
      const action: { type: string; name?: string } = { type: opts.type };
      if (opts.name) action.name = opts.name;
      const result = await client.nodes.action(
        Number(opts.id),
        action as any
      );
      formatOutput(result.data, program.opts().output);
    });
}
