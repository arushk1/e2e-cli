import type { HttpClient } from "../http.js";
import type { ApiResponse } from "../types/common.js";
import type { Image, ImageCategory, SavedImage } from "../types/image.js";

export class ImageService {
  constructor(private readonly http: HttpClient) {}

  async listCategories(): Promise<ApiResponse<ImageCategory>> {
    return this.http.get<ImageCategory>("/images/category-list/", {
      contact_person_id: "null",
    });
  }

  async list(params?: {
    display_category?: string;
    category?: string;
    osversion?: string;
    image_type?: string;
  }): Promise<ApiResponse<Image[]>> {
    return this.http.get<Image[]>("/images/", {
      contact_person_id: "null",
      ...params,
    });
  }

  async listSaved(): Promise<ApiResponse<SavedImage[]>> {
    return this.http.get<SavedImage[]>("/images/saved-images/");
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.put<void>(`/images/${id}/`, {
      action_type: "delete_image",
    });
  }

  async rename(id: number, name: string): Promise<ApiResponse<void>> {
    return this.http.put<void>(`/images/${id}/`, {
      name,
      action_type: "rename",
    });
  }
}
