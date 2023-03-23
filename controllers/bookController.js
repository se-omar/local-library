import { body, validationResult } from "express-validator";
import Book from "../models/book.js";
import BookInstance from "../models/bookInstance.js";
import Genre from "../models/genre.js";
import Author from "../models/author.js";

export const index = async (req, res) => {
  try {
    const [
      bookCount,
      genreCount,
      bookInstanceCount,
      bookInstanceAvailableCount,
      authorCount,
    ] = await Promise.all([
      Book.count({}),
      Genre.count({}),
      BookInstance.count({}),
      BookInstance.count({ status: "available" }),
      Author.count({}),
    ]);

    res.render("index", {
      title: "local library home",
      data: {
        bookCount, genreCount, bookInstanceCount, bookInstanceAvailableCount, authorCount,
      },
    });
  } catch (err) {
    res.render("index", {
      title: "local library home",
      err,
    });
  }
};

// Display list of all books.
export const bookList = async (req, res, next) => {
  try {
    const books = await Book.find({}, "title author").sort({ title: 1 }).populate("author");
    res.render("bookList", { title: "Book List", bookList: books });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific book.
export const bookDetail = async (req, res, next) => {
  try {
    const [book, bookInstances] = await Promise.all([
      Book.findById(req.params.id).populate("author").populate("genre"),
      BookInstance.find({ book: req.params.id }),
    ]);

    if (book == null) {
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    return res.render("bookDetail", {
      title: book.title,
      book,
      bookInstances,
    });
  } catch (err) {
    return next(err);
  }
};

// Display book create form on GET.
export const bookCreateGet = async (req, res, next) => {
  try {
    const [authors, genres] = await Promise.all([
      Author.find(),
      Genre.find(),
    ]);

    res.render("bookForm", {
      title: "Create Book",
      authors,
      genres,
    });
  } catch (err) {
    next(err);
  }
};

// Handle book create on POST.
export const bookCreatePost = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  async (req, res) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      const [authors, genres] = await Promise.all([
        Author.find(),
        Genre.find(),
      ]);

      genres.forEach((genre) => {
        if (book.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      });

      res.render("bookForm", {
        title: "Create Book",
        authors,
        genres,
        book,
        errors: errors.array(),
      });
      return;
    }

    book.save().then(() => res.redirect(book.url));
  },

];

// Display book delete form on GET.
export const bookDeleteGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
export const bookDeletePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
export const bookUpdateGet = async (req, res, next) => {
  try {
    const [book, authors, genres] = await Promise.all([
      Book.findById(req.params.id).populate("author").populate("genre"),
      Author.find(),
      Genre.find(),
    ]);

    if (book == null) {
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }
    genres.forEach((genre) => {
      book.genre.forEach((bookGenre) => {
        if (genre._id.toString() === bookGenre._id.toString()) {
          genre.checked = "true";
        }
      });
    });

    return res.render("bookForm", {
      title: "Update Book",
      authors,
      genres,
      book,
    });
  } catch (err) {
    return next(err);
  }
};

// Handle book update on POST.
export const bookUpdatePost = [
  // Convert the genre to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      const [authors, genres] = await Promise.all([
        Author.find(),
        Genre.find(),
      ]);

      genres.forEach((genre) => {
        if (book.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      });

      return res.render("bookForm", {
        title: "Update Book",
        authors,
        genres,
        book,
        errors: errors.array(),
      });
    }

    const theBook = await Book.findByIdAndUpdate(req.params.id, book);
    return res.redirect(theBook.url);
  },
];
