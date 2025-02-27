import { useContext } from "react";
import { ReviewsContext } from "../../context/ReviewsContext";
import Rating from "../Cine/Rating";

const ReviewList = ({ movieId }) => {
  const { reviews } = useContext(ReviewsContext);
  const movieReviews = reviews[movieId] || [];

  return (
    <div className="space-y-4">
      {movieReviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      ) : (
        movieReviews.map((review, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Rating value={review.rating} />
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm">{review.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
