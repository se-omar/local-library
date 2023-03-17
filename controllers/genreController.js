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
  res.send("NOT IMPLEMENTED: Genre create GET");
};

// Handle Genre create on POST.
export const genreCreatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
};

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
