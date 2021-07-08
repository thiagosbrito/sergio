export interface MenuResponse {
  menuItems: MenuParentItem[]
}

export interface MenuParentItem {
  children: MenuChildItem[];
  sref: string;
  title: string;
  isLoaded: boolean;
}

export interface MenuChildItem {
  id: string;
  pages: number
  tipo_thumb: string;
  titleEn: string;
  titlePt: string;
}
