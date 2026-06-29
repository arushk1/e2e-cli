import { describe, it, expect, vi, beforeEach } from "vitest";
import { ImageService } from "../../src/services/images.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp(): HttpClient {
  return { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } as unknown as HttpClient;
}

describe("ImageService", () => {
  let http: HttpClient;
  let images: ImageService;

  beforeEach(() => {
    http = mockHttp();
    images = new ImageService(http);
  });

  it("listCategories() calls GET /images/os-category/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: { category_list: {} } });
    await images.listCategories();
    expect(http.get).toHaveBeenCalledWith("/images/os-category/");
  });

  it("list() calls GET /images/ with params", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await images.list({ os: "Ubuntu", osversion: "24.04" });
    expect(http.get).toHaveBeenCalledWith("/images/", { os: "Ubuntu", osversion: "24.04" });
  });

  it("listSaved() calls GET /images/saved-images/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await images.listSaved();
    expect(http.get).toHaveBeenCalledWith("/images/saved-images/");
  });

  it("delete() calls DELETE /images/{id}/", async () => {
    (http.delete as any).mockResolvedValue({ code: 200, data: null });
    await images.delete(5);
    expect(http.delete).toHaveBeenCalledWith("/images/5/");
  });
});
