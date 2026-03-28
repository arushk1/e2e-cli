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
- `e2e_node_create` - Create a node (requires: name, plan, image, security_group_id; optional: region, ssh_keys, backups, vpc_id)
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
- `e2e_image_list` - List available OS images (optional filters: category, os, image_type)
- `e2e_image_list_categories` - List all image categories and OS versions
- `e2e_image_list_saved` - List saved/custom images
- `e2e_image_delete` - Delete a saved image (requires: id)

### VPC (Virtual Private Cloud)
- `e2e_vpc_list` - List all VPCs
- `e2e_vpc_get` - Get VPC details (requires: id)
- `e2e_vpc_create` - Create a VPC (requires: name; optional: network_size, default 512)
- `e2e_vpc_delete` - Delete a VPC (requires: id)

### Security Groups
- `e2e_security_group_list` - List all security groups
- `e2e_security_group_get` - Get security group details (requires: id)

### Firewalls
- `e2e_firewall_list` - List all firewalls
- `e2e_firewall_get` - Get firewall details (requires: id)
- `e2e_firewall_create` - Create a firewall (requires: name; optional: rules array)
- `e2e_firewall_delete` - Delete a firewall (requires: id)

### DNS
- `e2e_dns_list_zones` - List all DNS zones
- `e2e_dns_get_zone` - Get DNS zone details (requires: id)
- `e2e_dns_list_records` - List records for a zone (requires: zone_id)
- `e2e_dns_create_record` - Create a DNS record (requires: zone_id, type, name, content; optional: ttl, priority)
- `e2e_dns_delete_record` - Delete a DNS record (requires: zone_id, record_id)

### Reserved IPs
- `e2e_reserve_ip_list` - List all reserved IPs
- `e2e_reserve_ip_get` - Get reserved IP details (requires: id)
- `e2e_reserve_ip_create` - Reserve a new IP address
- `e2e_reserve_ip_delete` - Release a reserved IP (requires: id)

## Common Workflows

### Spin up a new compute node
1. List available images: `e2e_image_list_categories` to find the right OS
2. List security groups: `e2e_security_group_list` to get a security group ID
3. Create the node: `e2e_node_create` with name, plan (e.g., "C-2"), image, and security_group_id
4. Optionally reserve and assign an IP: `e2e_reserve_ip_create`

### Create a node with attached storage in a VPC
1. Create VPC: `e2e_vpc_create`
2. Get a security group: `e2e_security_group_list`
3. Create node in VPC: `e2e_node_create` with vpc_id
4. Create volume: `e2e_volume_create`
5. Attach volume: `e2e_volume_attach`
6. Reserve IP: `e2e_reserve_ip_create`

### Set up DNS for a domain
1. List zones: `e2e_dns_list_zones`
2. Add A record: `e2e_dns_create_record` with type="A", name="@", content=IP
3. Add CNAME: `e2e_dns_create_record` with type="CNAME", name="www", content="domain.com"

## Regions
Available regions: Delhi (ncr), Mumbai, Pune

## Plans
Common node plans: C-2, C-4, C-8 (CPU-based). List images to see available plans and pricing.
