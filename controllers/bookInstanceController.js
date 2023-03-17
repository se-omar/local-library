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
export const bookinstanceCreateGet = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

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
