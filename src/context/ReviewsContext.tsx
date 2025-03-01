import { createContext, ReactNode, useEffect, useState } from "react";

interface Review {
  rating: Number;
  date: string;
  text: string;
}

interface ReviewsState {
  [movieId: string]: Review[];
}

interface ReviewsContextType {
  reviews: ReviewsState;
  addReview: (movieId: string, review: Review) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

interface ReviewProviderProps {
  children: ReactNode;
}

const ReviewsProvider = ({ children }: ReviewProviderProps) => {
  const [reviews, setReviews] = useState<ReviewsState>(() => {
    const storedReviews = localStorage.getItem("reviews");
    return storedReviews ? (JSON.parse(storedReviews) as ReviewsState) : {};
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (movieId: string, review: Review) => {
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
