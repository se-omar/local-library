import { body, validationResult } from "express-validator";
import Genre from "../models/genre.js";
import Book from "../models/book.js";

// Display list of all Genre.
export const genreList = async (req, res, next) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.render("genreList", {
      title: "Genre List",
      genreList: genres,
    });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific Genre.
export const genreDetail = async (req, res, next) => {
  try {
    const [genre, genreBooks] = await Promise.all([
      Genre.findById(req.params.id),
      Book.find({ genre: req.params.id }),
    ]);
    if (genre == null) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    return res.render("genreDetail", {
      title: "Genre Detail",
      genre,
      genreBooks,
    });
  } catch (err) {
    return next(err);
  }
};

// Display Genre create form on GET.
export const genreCreateGet = (req, res) => {
  res.render("genreForm", { title: "Create Genre" });
};

// Handle Genre create on POST.
export const genreCreatePost = [
  // Validate and sanitize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      return res.render("genreForm", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
    }

    const foundGenre = await Genre.findOne({ name: req.body.name });
    if (foundGenre) {
      return res.redirect(foundGenre.url);
    }
    return genre.save().then(() => {
      res.redirect(genre.url);
    });
  },
];

// Display Genre delete form on GET.
export const genreDeleteGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
export const genreDeletePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
export const genreUpdateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
export const genreUpdatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
