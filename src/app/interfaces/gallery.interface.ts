export interface IGalleryResponse {
  images: IGalleryImage[],
  pages: number;
  total_images: number;
}

export interface IGalleryImage {
  id: number;
  img_grande: string;
  img_thumb: string;
  link: string;
  obra_1: string;
  obra_2: string;
  primeira_linha: string;
  segunda_linha: string;
  terceira_linha: string;
  quarta_linha: string;
  texto_link: string;
  tipo_ampliacao: number;
  next?: number;
  prev?: number;
}

export interface IBannersResponse {
  banners: IBanner[]
}

export interface IBanner {
  id: number,
  title: string;
  titulo: string;
}


export interface IGalleryItem {
  pages: number | undefined;
  total_images: number | undefined;
  images: any[] | undefined;
  activeItem: string | undefined;
  childId?: string | undefined;
  thumbType: string | undefined;
};
