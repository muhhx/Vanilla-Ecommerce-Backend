export interface IImage {
  url: string;
  key: string;
}

export default interface ICollection {
  name: string;
  description: string;
  season: string; //AW21, SS22, etc
  author: string;
  cover: string[]; //3 imagens
  lookbook: IImage[]; //varias imagens
  homePage: boolean; //true or false
  createdAt: Date;
  updatedAt: Date;
}
