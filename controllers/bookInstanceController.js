import { body, validationResult } from "express-validator";
import Book from "../models/book.js";
import BookInstance from "../models/bookInstance.js";

// Display list of all BookInstances.
export const bookinstanceList = async (req, res, next) => {
  try {
    const bookInstances = await BookInstance.find().populate("book");
    res.render("bookInstanceList", {
      title: "Book Instances List",
      bookInstanceList: bookInstances,
    });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = async (req, res, next) => {
  try {
    const bookInstance = await BookInstance.findById(req.params.id).populate("book");

    if (BookInstance == null) {
      const err = new Error("Book Instance not found");
      err.status = 404;
      return next(err);
    }

    return res.render("bookInstanceDetail", {
      bookInstance,
    });
  } catch (err) {
    return next(err);
  }
};

// Display BookInstance create form on GET.
export const bookinstanceCreateGet = async (req, res, next) => {
  try {
    const book = await Book.find({}, "title");
    res.render("bookInstanceForm", {
      title: "Create Book Instance",
      bookList: book,
    });
  } catch (err) {
    next(err);
  }
};

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  async (req, res) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      const books = await Book.find({}, "title");
      res.render("bookInstanceForm", {
        title: "Create Book Instance",
        book_list: books,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookInstance,
      });
      return;
    }

    await bookInstance.save();
    res.redirect(bookInstance.url);
  },
];

// Display BookInstance delete form on GET.
export const bookinstanceDeleteGet = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BookInstance delete on POST.
export const bookinstanceDeletePost = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// Display BookInstance update form on GET.
export const bookinstanceUpdateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
export const bookinstanceUpdatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
