import mongoose from "mongoose";

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  birth_date: { type: Date },
  death_date: { type: Date },
});

AuthorSchema.virtual("full_name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullName = `${(this.family_name, this.first_name)}`;
  }

  return fullName;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

export default mongoose.model("Author", AuthorSchema);
