import { HttpClient } from "./http.js";
import type { E2EClientConfig } from "./types/common.js";
import { NodeService } from "./services/nodes.js";
import { VolumeService } from "./services/volumes.js";
import { ImageService } from "./services/images.js";
import { VpcService } from "./services/vpcs.js";
import { SecurityGroupService } from "./services/security-groups.js";
import { FirewallService } from "./services/firewalls.js";
import { DnsService } from "./services/dns.js";
import { ReserveIpService } from "./services/reserve-ips.js";

const DEFAULT_BASE_URL = "https://api.e2enetworks.com/myaccount/api/v1";

export class E2EClient {
  private readonly http: HttpClient;

  public readonly nodes: NodeService;
  public readonly volumes: VolumeService;
  public readonly images: ImageService;
  public readonly vpcs: VpcService;
  public readonly securityGroups: SecurityGroupService;
  public readonly firewalls: FirewallService;
  public readonly dns: DnsService;
  public readonly reserveIps: ReserveIpService;

  constructor(config: E2EClientConfig) {
    this.http = new HttpClient({
      apiKey: config.apiKey,
      authToken: config.authToken,
      baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
      projectId: config.projectId,
      location: config.location,
      debug: config.debug,
    });

    this.nodes = new NodeService(this.http);
    this.volumes = new VolumeService(this.http);
    this.images = new ImageService(this.http);
    this.vpcs = new VpcService(this.http);
    this.securityGroups = new SecurityGroupService(this.http);
    this.firewalls = new FirewallService(this.http);
    this.dns = new DnsService(this.http);
    this.reserveIps = new ReserveIpService(this.http);
  }
}
