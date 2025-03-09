import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Review } from "../data/movies";

interface ReviewsContextType {
  reviews: Map<string, Review[]>;
  addReview: (movieId: string, review: Review) => void;
  clearReviews: () => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

interface ReviewProviderProps {
  children: ReactNode;
}

const ReviewsProvider = ({ children }: ReviewProviderProps) => {
  const [reviews, setReviews] = useState<Map<string, Review[]>>(new Map());

  // Debounce logic using useRef
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        setReviews(new Map(JSON.parse(storedReviews)));
      }
    } catch (error) {
      console.error("Error loading reviews from localStorage:", error);
    }
  }, []);

  // Save reviews to localStorage with debouncing
  useEffect(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem(
          "reviews",
          JSON.stringify(Array.from(reviews.entries()))
        );
      } catch (error) {
        console.error("Error saving reviews to localStorage:", error);
      }
    }, 500);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [reviews]);

  const addReview = useCallback((movieId: string, review: Review) => {
    // Validate rating and text
    if (review.rating < 1 || review.rating > 5) {
      console.error("Rating must be between 1 and 5.");
      return;
    }
    if (!review.text.trim()) {
      console.error("Review text cannot be empty.");
      return;
    }

    setReviews((prevReviews) => {
      const newReviews = new Map(prevReviews);

      if (!newReviews.has(movieId)) {
        newReviews.set(movieId, []);
      }

      // Add timestamp if missing
      const reviewWithDate = {
        ...review,
        date: review.date || new Date().toISOString(),
      };

      // Prevent duplicate reviews
      const isDuplicate = newReviews
        .get(movieId)!
        .some(
          (r) =>
            r.text === reviewWithDate.text && r.date === reviewWithDate.date
        );

      if (isDuplicate) {
        console.warn("Duplicate review detected.");
        return prevReviews;
      }

      newReviews.get(movieId)!.push(reviewWithDate);
      return newReviews;
    });
  }, []);

  // Function to clear all reviews
  const clearReviews = useCallback(() => {
    localStorage.removeItem("reviews");
    setReviews(new Map());
  }, []);

  // Memoized context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ reviews, addReview, clearReviews }),
    [reviews, addReview, clearReviews]
  );

  return (
    <ReviewsContext.Provider value={contextValue}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };
