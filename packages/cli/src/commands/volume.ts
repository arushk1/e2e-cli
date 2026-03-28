import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerVolumeCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const volume = program
    .command("volume")
    .description("Manage block storage volumes");

  volume
    .command("list")
    .description("List all volumes")
    .action(async () => {
      const client = getClient();
      const result = await client.volumes.list();
      formatOutput(result.data, program.opts().output, [
        "block_id",
        "name",
        "status",
      ]);
    });

  volume
    .command("get")
    .description("Get volume details")
    .requiredOption("--id <id>", "Volume ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.volumes.get(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });

  volume
    .command("create")
    .description("Create a new volume")
    .requiredOption("--name <name>", "Volume name")
    .requiredOption(
      "--size <size>",
      "Size in GB (250, 500, 1000, 2000, 4000, 8000, 16000)"
    )
    .requiredOption("--iops <iops>", "IOPS value")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.volumes.create({
        name: opts.name,
        size: Number(opts.size),
        iops: Number(opts.iops),
      });
      formatOutput(result.data, program.opts().output);
    });

  volume
    .command("delete")
    .description("Delete a volume")
    .requiredOption("--id <id>", "Volume ID")
    .action(async (opts) => {
      const client = getClient();
      await client.volumes.delete(Number(opts.id));
      console.log(`Volume ${opts.id} deleted.`);
    });

  volume
    .command("attach")
    .description("Attach volume to a node")
    .requiredOption("--id <id>", "Volume ID")
    .requiredOption("--vm-id <vmId>", "Node/VM ID")
    .action(async (opts) => {
      const client = getClient();
      await client.volumes.attach(Number(opts.id), Number(opts.vmId));
      console.log(`Volume ${opts.id} attached to node ${opts.vmId}.`);
    });

  volume
    .command("detach")
    .description("Detach volume from a node")
    .requiredOption("--id <id>", "Volume ID")
    .requiredOption("--vm-id <vmId>", "Node/VM ID")
    .action(async (opts) => {
      const client = getClient();
      await client.volumes.detach(Number(opts.id), Number(opts.vmId));
      console.log(`Volume ${opts.id} detached from node ${opts.vmId}.`);
    });
}
