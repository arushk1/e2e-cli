import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient } from "../src/http.js";
import { E2EApiError } from "../src/errors.js";

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
      isAxiosError: vi.fn((err: any) => err.isAxiosError === true),
    },
  };
});

import axios from "axios";

describe("HttpClient", () => {
  let http: HttpClient;
  let mockInstance: ReturnType<typeof axios.create>;

  beforeEach(() => {
    vi.clearAllMocks();
    http = new HttpClient({
      apiKey: "test-key",
      authToken: "test-token",
      baseUrl: "https://api.example.com/v1",
      projectId: "proj-1",
      location: "Delhi",
    });
    mockInstance = (axios.create as any).mock.results[0].value;
  });

  it("creates axios instance with correct baseURL and auth header", () => {
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "https://api.example.com/v1",
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("GET appends apikey, project_id, location to query params", async () => {
    (mockInstance.get as any).mockResolvedValue({
      data: { code: 200, message: "success", errors: [], data: [{ id: 1 }] },
    });

    const result = await http.get("/nodes/");
    expect(mockInstance.get).toHaveBeenCalledWith("/nodes/", {
      params: { apikey: "test-key", project_id: "proj-1", location: "Delhi" },
    });
    expect(result).toEqual({
      code: 200,
      message: "success",
      errors: [],
      data: [{ id: 1 }],
    });
  });

  it("POST sends body and appends auth params", async () => {
    (mockInstance.post as any).mockResolvedValue({
      data: { code: 200, message: "success", errors: [], data: { id: 1 } },
    });

    const body = { name: "test-node" };
    const result = await http.post("/nodes/", body);
    expect(mockInstance.post).toHaveBeenCalledWith("/nodes/", body, {
      params: { apikey: "test-key", project_id: "proj-1", location: "Delhi" },
    });
    expect(result.data).toEqual({ id: 1 });
  });

  it("DELETE appends auth params", async () => {
    (mockInstance.delete as any).mockResolvedValue({
      data: { code: 200, message: "success", errors: [], data: null },
    });

    await http.delete("/nodes/123/");
    expect(mockInstance.delete).toHaveBeenCalledWith("/nodes/123/", {
      params: { apikey: "test-key", project_id: "proj-1", location: "Delhi" },
    });
  });

  it("throws E2EApiError on error response", async () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 403,
        data: { code: 403, message: "API not public.", errors: [] },
      },
    };
    (mockInstance.get as any).mockRejectedValue(axiosError);

    await expect(http.get("/nodes/")).rejects.toThrow(E2EApiError);
    await expect(http.get("/nodes/")).rejects.toMatchObject({
      statusCode: 403,
      message: "API not public.",
    });
  });

  it("allows extra query params", async () => {
    (mockInstance.get as any).mockResolvedValue({
      data: { code: 200, message: "success", errors: [], data: [] },
    });

    await http.get("/images/", { image_type: "private" });
    expect(mockInstance.get).toHaveBeenCalledWith("/images/", {
      params: {
        apikey: "test-key",
        project_id: "proj-1",
        location: "Delhi",
        image_type: "private",
      },
    });
  });
});
