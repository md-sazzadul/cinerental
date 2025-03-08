import { createContext, ReactNode, useEffect, useRef, useState } from "react";

interface Review {
  rating: number; // Numeric type for ratings
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
    try {
      const storedReviews = localStorage.getItem("reviews");
      return storedReviews ? (JSON.parse(storedReviews) as ReviewsState) : {};
    } catch (error) {
      console.error("Error parsing reviews from localStorage:", error);
      return {};
    }
  });

  // Debounce logic using useRef
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem("reviews", JSON.stringify(reviews));
      } catch (error) {
        console.error("Error saving reviews to localStorage:", error);
      }
    }, 500); // Debounce duration
  }, [reviews]);

  const addReview = (movieId: string, review: Review) => {
    // Validation: Ensure rating is between 1 and 5, and text is non-empty
    if (review.rating < 1 || review.rating > 5) {
      console.error("Rating must be between 1 and 5.");
      return;
    }
    if (!review.text.trim()) {
      console.error("Review text cannot be empty.");
      return;
    }

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
