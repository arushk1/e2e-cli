import { describe, it, expect, vi } from "vitest";
import { E2EClient } from "../src/client.js";

vi.mock("axios", () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      isAxiosError: vi.fn(() => false),
    },
  };
});

describe("E2EClient", () => {
  it("exposes all service accessors", () => {
    const client = new E2EClient({ apiKey: "key", authToken: "token" });
    expect(client.nodes).toBeDefined();
    expect(client.volumes).toBeDefined();
    expect(client.images).toBeDefined();
    expect(client.vpcs).toBeDefined();
    expect(client.securityGroups).toBeDefined();
    expect(client.firewalls).toBeDefined();
    expect(client.dns).toBeDefined();
    expect(client.reserveIps).toBeDefined();
  });

  it("uses default base URL when not provided", () => {
    const client = new E2EClient({ apiKey: "key", authToken: "token" });
    expect(client).toBeDefined();
  });
});
