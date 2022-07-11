import mongoose from "mongoose";
import ICollection from "../interfaces/collection.interface";

const collectionSchema = new mongoose.Schema<ICollection>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    season: { type: String, required: true },
    author: { type: String, required: true },
    cover: { type: [String], required: true },
    lookbook: {
      type: [
        {
          url: { type: String, required: true },
          key: { type: String, required: true },
        },
      ],
      required: true,
    },
    homePage: { type: Boolean, default: false },
  },
  {
    collection: "collections",
    timestamps: true,
  }
);

const CollectionModel = mongoose.model("CollectionModel", collectionSchema);

export default CollectionModel;
