import Author from "../models/author";

// Display list of all Authors.
export const authorList = (req, res) => {
  res.send("NOT IMPLEMENTED: Author list");
};

// Display detail page for a specific Author.
export const authorDetail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};

// Display Author create form on GET.
export const authorCreateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
export const authorCreatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
export const authorDeleteGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
export const authorDeletePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
export const authorUpdateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
export const authorUpdatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};
