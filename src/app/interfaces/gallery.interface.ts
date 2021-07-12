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
  texto_link: string;
  tipo_ampliacao: number;
}