import BooksModel from "../db/books";
import ReviewsModel from "../db/reviews";

export const createBook = (bookData: any) => {
  const book = new BooksModel({
    title: bookData.title,
    author: bookData.author,
    genre: bookData.genre,
    published: bookData.published,
  });

  const createdBook = book.save(); // created book
  return createdBook;
};
export const addreviews = async (Bid: any, reviewData: any) => {
  const published_data = new Date(); // published now

  const checkifallreadyreview = await ReviewsModel.findOne({
    userId: reviewData.userId,
    bookId: reviewData.bookId,
  });

  if (!checkifallreadyreview) {
    const review = new ReviewsModel({
      rating: reviewData.rating,
      rating_Message: reviewData.rating_Message,
      date_rating: published_data,
      userId: reviewData.userId,
      bookId: reviewData.bookId,
    });

    const addedreview = await review.save(); // created book
    return { message: "review added", data: addedreview };
  } else {
    return { message: "User already reviewed the book" };
  }
};

export const getBook = async (
  skip: any,
  limit: any,
  author: any,
  genre: any
) => {
  let foundbook: any;
  console.log("founted data", author);
  let myquery: any = {};
  if (author != null) myquery.author = author;
  if (genre != null) myquery.genre = genre;
  foundbook = await BooksModel.find(myquery).skip(skip).limit(limit);
  return foundbook;
};

export const searchBooks = async (searchterm: any) => {
  let foundbook: any;
  let myquery: any = searchterm
    ? {
        $or: [
          { title: { $regex: searchterm, $options: "i" } },
          { author: { $regex: searchterm, $options: "i" } },
        ],
      }
    : {};

  foundbook = await BooksModel.find(myquery);
  return foundbook;
};

export const getBookById = async (id:any,page:any,limit:any) => {

  const foundbook = await BooksModel.findById(id);

  const reviews = await ReviewsModel.find({ bookId:id })
    .skip(page)
    .limit(limit);

  // get avarage review of rating s.
  const avgData = await ReviewsModel.aggregate([
    // { $match: { booId:id } },
    {
      $group: {
        _id: "$bookId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  console.log("everage rating", avgData);

  return {message:"Book Found",data:{book:{foundbook},avarage:avgData,reviews}};
};
