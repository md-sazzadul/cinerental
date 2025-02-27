import { useContext, useState } from "react";
import { ReviewsContext } from "../../context/ReviewsContext";

const ReviewForm = ({ movieId }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const { addReview } = useContext(ReviewsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const review = {
      text: reviewText,
      rating: reviewRating,
      date: new Date().toISOString(),
    };
    addReview(movieId, review);
    setReviewText("");
    setReviewRating(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-mdbg-white dark:bg-[#1E1E2F]"
    >
      <div className="flex flex-col">
        <label htmlFor="rating" className="block mb-2 text-sm font-semibold">
          Rating:
        </label>
        <select
          id="rating"
          value={reviewRating}
          onChange={(e) => setReviewRating(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="review" className="mb-2 text-sm font-semibold">
          Review:
        </label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white dark:bg-[#171923] text-black dark:text-white"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-primary rounded-lg py-2 px-5 text-[#171923] font-semibold"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
