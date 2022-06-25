export default interface ICollection {
  name: string;
  description: string;
  season: ["AW21", "SS21", "AW22"];
  author: string;
  cover: string[];
  lookbook: string[];
  homePage: boolean; //se true, aparece na home
  createdAt: Date;
  updatedAt: Date;
}
