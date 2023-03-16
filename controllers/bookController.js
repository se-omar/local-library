import async from "async";
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
export const bookList = (req, res) => {
  res.send("NOT IMPLEMENTED: Book list");
};

// Display detail page for a specific book.
export const bookDetail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display book create form on GET.
export const bookCreateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
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
