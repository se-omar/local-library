import mongoose from "mongoose";

const { Schema } = mongoose;

const GenreSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
  },
});

GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

export default mongoose.model("Genre", GenreSchema);
