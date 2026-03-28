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

  it("listCategories() calls GET /images/category-list/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: { category_list: {} } });
    await images.listCategories();
    expect(http.get).toHaveBeenCalledWith("/images/category-list/", { contact_person_id: "null" });
  });

  it("list() calls GET /images/ with params", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await images.list({ image_type: "private" });
    expect(http.get).toHaveBeenCalledWith("/images/", { contact_person_id: "null", image_type: "private" });
  });

  it("listSaved() calls GET /images/saved-images/", async () => {
    (http.get as any).mockResolvedValue({ code: 200, data: [] });
    await images.listSaved();
    expect(http.get).toHaveBeenCalledWith("/images/saved-images/");
  });

  it("delete() calls PUT with delete_image action", async () => {
    (http.put as any).mockResolvedValue({ code: 200, data: null });
    await images.delete(5);
    expect(http.put).toHaveBeenCalledWith("/images/5/", { action_type: "delete_image" });
  });
});
