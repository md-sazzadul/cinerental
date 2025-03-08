import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Review {
  rating: number;
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
  const [reviews, setReviews] = useState<ReviewsState>({});

  // Debounce logic using useRef
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const storedReviews = localStorage.getItem("reviews");
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews) as ReviewsState);
      }
    } catch (error) {
      console.error("Error loading reviews from localStorage:", error);
    }
  }, []);

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

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [reviews]);

  const addReview = useCallback((movieId: string, review: Review) => {
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

      // Initialize if movie doesn't have reviews yet
      if (!newReviews[movieId]) {
        newReviews[movieId] = [];
      }

      // Prevent duplicate reviews (e.g., same text on the same date)
      const isDuplicate = newReviews[movieId].some(
        (r) => r.text === review.text && r.date === review.date
      );
      if (isDuplicate) {
        console.warn("Duplicate review detected. Ignoring submission.");
        return prevReviews;
      }

      newReviews[movieId].push(review);
      return newReviews;
    });
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };
