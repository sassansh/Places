import mongoose from "mongoose";

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Place", placeSchema, "places");
