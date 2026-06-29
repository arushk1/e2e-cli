import type { Command } from "commander";
import type { E2EClient } from "@e2e-cloud/sdk";
import { formatOutput } from "../output.js";

export function registerDnsCommands(
  program: Command,
  getClient: () => E2EClient
): void {
  const dns = program
    .command("dns")
    .description("Manage E2E DNS forwarding domains");

  dns
    .command("list")
    .description("List all DNS forwarding domains")
    .action(async () => {
      const client = getClient();
      const result = await client.dns.list();
      formatOutput(result.data, program.opts().output, [
        "id",
        "domain_name",
        "domain_ip",
        "validity",
      ]);
    });

  dns
    .command("get")
    .description("Get DNS domain details")
    .requiredOption("--domain-name <name>", "Domain name")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.get(opts.domainName);
      formatOutput(result.data, program.opts().output);
    });

  dns
    .command("create")
    .description("Create a DNS forwarding domain")
    .requiredOption("--domain-name <name>", "Domain name")
    .requiredOption("--ip-address <ip>", "IPv4 address")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.create({
        domain_name: opts.domainName,
        ip_addr: opts.ipAddress,
      });
      formatOutput(result.data, program.opts().output);
    });

  dns
    .command("delete")
    .description("Delete a DNS forwarding domain")
    .requiredOption("--domain-id <id>", "Domain ID")
    .action(async (opts) => {
      const client = getClient();
      await client.dns.delete(opts.domainId);
      console.log(`DNS domain ${opts.domainId} deleted.`);
    });

  dns
    .command("verify-ns")
    .description("Verify nameservers for a DNS domain")
    .requiredOption("--domain-name <name>", "Domain name")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.verifyNameservers(opts.domainName);
      formatOutput(result.data, program.opts().output);
    });

  dns
    .command("verify-validity")
    .description("Diagnose DNS domain validity")
    .requiredOption("--domain-name <name>", "Domain name")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.verifyValidity(opts.domainName);
      formatOutput(result.data, program.opts().output);
    });

  dns
    .command("verify-ttl")
    .description("Diagnose DNS TTL")
    .requiredOption("--domain-name <name>", "Domain name")
    .action(async (opts) => {
      const client = getClient();
      const result = await client.dns.verifyTtl(opts.domainName);
      formatOutput(result.data, program.opts().output);
    });
}
