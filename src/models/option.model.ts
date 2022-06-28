import mongoose from "mongoose";
import IOption from "../interfaces/option.interface";

const optionSchema = new mongoose.Schema<IOption>(
  {
    productId: { type: String, required: true },
    rgb: { type: String, required: true },
    name: { type: String, required: true },
    sizes: { type: [String], required: true, minLength: 1 },
    images: {
      type: [
        {
          key: { type: String },
          url: { type: String },
        },
      ],
      required: true,
      minLength: 1,
    },
  },
  {
    timestamps: true,
    collection: "options",
  }
);

const OptionModel = mongoose.model("OptionModel", optionSchema);

export default OptionModel;
