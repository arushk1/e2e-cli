# E2E Cloud Infrastructure Management

Manage E2E Networks cloud infrastructure using MCP tools. This skill provides guided workflows for creating and managing cloud resources.

## Prerequisites

1. Run `e2e configure` in the terminal to set up API credentials
2. Ensure the MCP server is configured in Claude Code settings:
   ```json
   {
     "mcpServers": {
       "e2e-cloud": {
         "command": "npx",
         "args": ["@e2e-cloud/mcp-server"]
       }
     }
   }
   ```

## Available MCP Tools

### Compute Nodes
- `e2e_node_list` - List all compute nodes
- `e2e_node_get` - Get node details (requires: id)
- `e2e_node_create` - Create a node (requires: name, plan, image, ssh_keys; optional: region, security_group_id, backups, vpc_id, subnet_id, reserve_ip)
- `e2e_node_delete` - Delete a node (requires: id)
- `e2e_node_action` - Perform node action: power_on, power_off, reboot, reinstall, lock_vm, unlock_vm, rename (requires: id, type)

### Block Storage Volumes
- `e2e_volume_list` - List all volumes
- `e2e_volume_get` - Get volume details (requires: id)
- `e2e_volume_create` - Create a volume (requires: name, size, iops). Valid sizes: 250GB/5000 IOPS, 500GB/10000, 1000GB/20000, 2000GB/40000, 4000GB/80000, 8000GB/120000, 16000GB/120000
- `e2e_volume_delete` - Delete a volume (requires: id)
- `e2e_volume_attach` - Attach volume to node (requires: volume_id, vm_id)
- `e2e_volume_detach` - Detach volume from node (requires: volume_id, vm_id)

### Images
- `e2e_image_list` - List available OS images (optional filters: category, os, osversion)
- `e2e_image_list_categories` - List all image categories and OS versions
- `e2e_image_list_saved` - List saved/custom images
- `e2e_image_delete` - Delete a saved image (requires: id)

### VPC (Virtual Private Cloud)
- `e2e_vpc_list` - List all VPCs
- `e2e_vpc_get` - Get VPC details (requires: id)
- `e2e_vpc_create` - Create a VPC (requires: name; optional: ipv4, is_e2e_vpc)
- `e2e_vpc_delete` - Delete a VPC (requires: id)

### Security Groups
- `e2e_security_group_list` - List all security groups
- `e2e_security_group_get` - Get security group details (requires: id)
- `e2e_security_group_create` - Create a security group (requires: name; optional: description, rules, default)
- `e2e_security_group_update` - Update a security group (requires: id; optional: name, description, rules)
- `e2e_security_group_delete` - Delete a security group (requires: id)
- `e2e_security_group_mark_default` - Mark a security group as default (requires: id)

### Firewalls
- `e2e_firewall_list` - List all firewalls
- `e2e_firewall_get` - Get firewall details (requires: id)
- `e2e_firewall_create` - Create a Fortigate firewall (requires: name, plan, image, vpc_id, cn_id; optional: label, region, reserve_ip)
- `e2e_firewall_delete` - Delete a firewall (requires: id)

### DNS
- `e2e_dns_list` - List DNS forwarding domains
- `e2e_dns_get` - Get DNS domain details (requires: domain_name)
- `e2e_dns_create` - Create a DNS forwarding domain (requires: domain_name, ip_addr)
- `e2e_dns_delete` - Delete a DNS forwarding domain (requires: domain_id)
- `e2e_dns_verify_nameservers` - Verify nameservers (requires: domain_name)
- `e2e_dns_verify_validity` - Diagnose DNS validity (requires: domain_name)
- `e2e_dns_verify_ttl` - Diagnose DNS TTL (requires: domain_name)

### Reserved IPs
- `e2e_reserve_ip_list` - List all reserved IPs
- `e2e_reserve_ip_get` - Get reserved IP details (requires: ip_address)
- `e2e_reserve_ip_create` - Reserve a new IP address
- `e2e_reserve_ip_delete` - Release a reserved IP (requires: ip_address)
- `e2e_reserve_ip_action` - Attach, detach, or live-reserve an IP (requires: ip_address, vm_id, type)
- `e2e_reserve_ip_convert_floating` - Convert reserved IP to floating IP (requires: ip_address, node_ids)
- `e2e_reserve_ip_attach_floating` - Attach floating IP to nodes (requires: ip_address, node_ids)
- `e2e_reserve_ip_detach_floating` - Detach floating IP from nodes (requires: ip_address, node_ids)

## Common Workflows

### Spin up a new compute node
1. List available images: `e2e_image_list_categories` to find the right OS
2. List security groups: `e2e_security_group_list` to get a security group ID
3. Create the node: `e2e_node_create` with name, plan (e.g., "C-2"), image, ssh_keys, and optional security_group_id
4. Optionally reserve and assign an IP: `e2e_reserve_ip_create`

### Create a node with attached storage in a VPC
1. Create VPC: `e2e_vpc_create`
2. Get a security group: `e2e_security_group_list`
3. Create node in VPC: `e2e_node_create` with vpc_id and subnet_id
4. Create volume: `e2e_volume_create`
5. Attach volume: `e2e_volume_attach`
6. Reserve IP: `e2e_reserve_ip_create`

### Set up DNS for a domain
1. List forwarding domains: `e2e_dns_list`
2. Create forwarding domain: `e2e_dns_create` with domain_name and ip_addr
3. Verify nameservers: `e2e_dns_verify_nameservers`

## Regions
Available regions: Delhi, Chennai

## Plans
Common node plans: C-2, C-4, C-8 (CPU-based). List images to see available plans and pricing.
