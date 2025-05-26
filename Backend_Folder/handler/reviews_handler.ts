import ReviewsModel from "../db/reviews";

export const updateReviews = async (id: any, body: any) => {
  try {
    const updateReviews = await ReviewsModel.findByIdAndUpdate(id, body);
    return { message: "reviews updated", data: updateReviews };
  } catch (err) {
    return { message: "error while updating reviews" };
  }
};

export const deleteReviews = async (id: any) => {
  try {
    const updateReviews = await ReviewsModel.findByIdAndDelete(id);
    return { message: "reviews deleted", data: updateReviews };
  } catch (err) {
    return { message: "error while deleting reviews" };
  }
};
