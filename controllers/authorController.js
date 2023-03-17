import Author from "../models/author.js";
import Book from "../models/book.js";

// Display list of all Authors.
export const authorList = async (req, res, next) => {
  try {
    const authors = await Author.find().sort([["family_name", "ascending"]]);
    res.render("authorList", {
      title: "Author List",
      authorList: authors,
    });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific Author.
export const authorDetail = async (req, res, next) => {
  try {
    const [author, authorBooks] = await Promise.all([
      Author.findById(req.params.id),
      Book.find({ author: req.params.id }, "title summary"),
    ]);

    if (author == null) {
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    return res.render("authorDetail", {
      title: author.full_name,
      author,
      authorBooks,
    });
  } catch (err) {
    return next(err);
  }
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
