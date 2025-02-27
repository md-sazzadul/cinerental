import { createContext, useEffect, useState } from "react";

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("reviews")) || {};
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (movieId, review) => {
    setReviews((prevReviews) => {
      const newReviews = { ...prevReviews };
      if (!newReviews[movieId]) {
        newReviews[movieId] = [];
      }
      newReviews[movieId].push(review);
      return newReviews;
    });
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };
