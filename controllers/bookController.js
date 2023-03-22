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
      Book.find(),
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
export const bookCreatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
export const bookDeleteGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
export const bookDeletePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
export const bookUpdateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
export const bookUpdatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
