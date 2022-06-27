import mongoose from "mongoose";
import IProduct from "../interfaces/product.interface";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    isAvailable: { type: Boolean, required: true },
    isNew: { type: Boolean, default: true },
    gender: { type: [String], required: true, minLength: 1 },
    options: {
      type: [
        {
          rgb: { type: String, required: true },
          name: { type: String, required: true },
          sizes: { type: [String], required: true, minLength: 1 },
          images: { type: [String], required: true, minLength: 1 },
        },
      ],
      minLength: 1,
    },
    thumb: { type: String, required: true },
    categoryId: { type: String, required: true },
    collectionId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
