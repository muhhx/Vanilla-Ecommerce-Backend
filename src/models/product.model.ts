import mongoose from "mongoose";
import IProduct from "../interfaces/product.interface";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    display: { type: Boolean, default: false }, //Toda vez que eu fizer uma requisição pra deixar o isAvailable true, fetch options deste produto e verificar: Se não tem nenhuma option relacionada com esse produto, você não pode setar isAvailable pra true
    isSoldOut: { type: Boolean, default: false }, //Se refere ao produto se esgotando
    isNewProduct: { type: Boolean, default: true },
    gender: { type: [String], required: true, minLength: 1 },
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
