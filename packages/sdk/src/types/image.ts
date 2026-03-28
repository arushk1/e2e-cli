export interface Image {
  plan: string;
  image: string;
  location: string;
  specs: {
    price_per_month: number;
    price_per_hour: number;
  };
}

export interface ImageCategory {
  category_list: Record<string, Record<string, string[]>>;
}

export interface SavedImage {
  template_id: number;
  name: string;
  image_state: string;
  os_distribution: string;
  image_type: string;
  creation_time: string;
}
