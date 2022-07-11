import CollectionModel from "../models/collection.model";
import { IImage } from "../interfaces/collection.interface";

export const createCollection = (payload: {
  name: string;
  description: string;
  season: string;
  author: string;
  lookbook: IImage[];
  cover: string[];
}) => {
  return CollectionModel.create(payload);
};

export const deleteCollection = (collectionId: string) => {
  return CollectionModel.findByIdAndDelete({ _id: collectionId });
};

export const getCollections = () => {
  return CollectionModel.find();
};

export const findHomeCollection = () => {
  return CollectionModel.findOne({ homePage: true });
};

export const updateHomeCollection = (collectionId: string) => {
  return CollectionModel.findByIdAndUpdate(
    { _id: collectionId },
    { homePage: false }
  );
};

export const updateCollection = (
  payload: {
    name: string;
    description: string;
    season: string;
    author: string;
    cover: string[];
    homePage: boolean;
  },
  collectionId: string
) => {
  return CollectionModel.findByIdAndUpdate({ _id: collectionId }, payload, {
    new: true,
  });
};
