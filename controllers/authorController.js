import { body, validationResult } from "express-validator";
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
  res.render("authorForm", {
    title: "Create Author",
  });
};

// Handle Author create on POST.
export const authorCreatePost = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),

  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
    }

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    try {
      return author.save().then(() => {
        res.redirect(author.url);
      });
    } catch (err) {
      return next(err);
    }
  },
];
// Display Author delete form on GET.
export const authorDeleteGet = async (req, res, next) => {
  try {
    const [author, authorBooks] = await Promise.all([
      Author.findById(req.params.id),
      Book.find({ author: req.params.id }),
    ]);
    console.log("author books: ", authorBooks);

    if (author == null) {
      return res.redirect("/catalog/authors");
    }

    return res.render("authorDelete", {
      title: "Delete Author",
      author,
      authorBooks,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle Author delete on POST.
export const authorDeletePost = async (req, res, next) => {
  try {
    const [author, authorBooks] = await Promise.all([
      Author.findById(req.params.id),
      Book.find({ author: req.params.id }),
    ]);

    if (authorBooks.length > 0) {
      return res.render("authorDelete", {
        title: "Delete Author",
        author,
        authorBooks,
      });
    }

    await Author.findByIdAndRemove(req.body.authorid);
    return res.redirect("/catalog/authors");
  } catch (err) {
    return next(err);
  }
};

// Display Author update form on GET.
export const authorUpdateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
export const authorUpdatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};
