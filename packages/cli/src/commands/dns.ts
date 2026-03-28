import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerDnsCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const dns = program
    .command("dns")
    .description("Manage DNS zones and records");

  dns
    .command("list")
    .description("List all DNS zones")
    .action(async () => {
      const client = getClient();
      const result = await client.dns.listZones();
      formatOutput(result.data, program.opts().output, [
        "id",
        "domain",
        "status",
      ]);
    });

  dns
    .command("get")
    .description("Get DNS zone details")
    .requiredOption("--id <id>", "Zone ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.getZone(Number(opts.id));
      formatOutput(result.data, program.opts().output);
    });

  dns
    .command("records")
    .description("List records for a DNS zone")
    .requiredOption("--zone-id <id>", "Zone ID")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.listRecords(Number(opts.zoneId));
      formatOutput(result.data, program.opts().output, [
        "id",
        "type",
        "name",
        "content",
        "ttl",
      ]);
    });

  dns
    .command("add-record")
    .description("Add a DNS record")
    .requiredOption("--zone-id <id>", "Zone ID")
    .requiredOption(
      "--type <type>",
      "Record type (A, AAAA, CNAME, MX, TXT)"
    )
    .requiredOption("--name <name>", "Record name")
    .requiredOption("--content <content>", "Record content/value")
    .option("--ttl <ttl>", "TTL in seconds", "3600")
    .option("--priority <priority>", "Priority (for MX records)")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.createRecord({
        zone_id: Number(opts.zoneId),
        type: opts.type,
        name: opts.name,
        content: opts.content,
        ttl: Number(opts.ttl),
        priority: opts.priority ? Number(opts.priority) : undefined,
      });
      formatOutput(result.data, program.opts().output);
    });

  dns
    .command("delete-record")
    .description("Delete a DNS record")
    .requiredOption("--zone-id <id>", "Zone ID")
    .requiredOption("--record-id <id>", "Record ID")
    .action(async (opts) => {
      const client = getClient();
      await client.dns.deleteRecord(
        Number(opts.zoneId),
        Number(opts.recordId)
      );
      console.log(`DNS record ${opts.recordId} deleted.`);
    });
}
