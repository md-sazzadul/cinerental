interface Review {
  userId: string;
  rating: number;
  text: string;
}

interface Movie {
  id: string;
  cover: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
  price: number;
  discount?: number;
  reviews: Review[];
}

const moviesData: Movie[] = [
  {
    id: crypto.randomUUID(),
    cover: "once-in-ho.png",
    title: "Once Upon a Time... in Hollywood",
    description:
      "A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.",
    genre: "Comedy/Drama",
    rating: 5,
    price: 140,
    discount: 10,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "marriage-strory.png",
    title: "Marriage Story",
    description:
      "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
    genre: "Comedy/Drama",
    rating: 3,
    price: 90,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "pain-and-gain.png",
    title: "Pain & Gain",
    description:
      "A trio of bodybuilders in Florida get caught up in an extortion ring and a kidnapping scheme that goes terribly wrong.",
    genre: "Action/Comedy/Crime/Drama",
    rating: 4,
    price: 100,
    discount: 5,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "parasite.png",
    title: "Parasite",
    description:
      "All unemployed, Ki-taek and his family take peculiar interest in the wealthy and glamorous Parks, as they ingratiate themselves into their lives and get entangled in an unexpected incident.",
    genre: "Comedy, Drama, Thriller",
    rating: 4,
    price: 250,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "iron-man.png",
    title: "Iron Man",
    description:
      "A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon.",
    genre: "Action/Adventure/Sci-fi",
    rating: 5,
    price: 100,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "interstellar.png",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Adventure/Drama/Sci-Fi",
    rating: 5,
    price: 150,
    discount: 15,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "the-dark-knight.png",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    genre: "Action/Crime/Drama",
    rating: 5,
    price: 120,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "inception.png",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    genre: "Action/Adventure/Sci-Fi",
    rating: 4,
    price: 130,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "joker.png",
    title: "Joker",
    description:
      "In Gotham's fractured society, Arthur Fleck, a man disregarded by society, embarks on a downward spiral of revolution and bloody crime.",
    genre: "Crime/Drama/Thriller",
    rating: 4,
    price: 110,
    discount: 10,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "avengers-endgame.png",
    title: "Avengers: Endgame",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    genre: "Action/Adventure/Drama",
    rating: 5,
    price: 200,
    discount: 20,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "ford-v-ferrari.png",
    title: "Ford v Ferrari",
    description:
      "American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.",
    genre: "Action/Biography/Drama",
    rating: 4,
    price: 140,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "spider-man.png",
    title: "Spider-Man: Homecoming",
    description:
      "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.",
    genre: "Action/Adventure/Sci-Fi",
    rating: 4,
    price: 120,
    discount: 10,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "the-lion-king.png",
    title: "The Lion King",
    description:
      "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    genre: "Animation/Adventure/Drama",
    rating: 5,
    price: 80,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "toy-story-4.png",
    title: "Toy Story 4",
    description:
      "When a new toy called 'Forky' joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.",
    genre: "Animation/Adventure/Comedy",
    rating: 4,
    price: 90,
    discount: 5,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "frozen-2.png",
    title: "Frozen II",
    description:
      "Anna, Elsa, Kristoff, Olaf, and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land.",
    genre: "Animation/Adventure/Comedy",
    rating: 4,
    price: 100,
    reviews: [],
  },
  {
    id: crypto.randomUUID(),
    cover: "black-panther.png",
    title: "Black Panther",
    description:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    genre: "Action/Adventure/Sci-Fi",
    rating: 5,
    price: 140,
    reviews: [],
  },
];

// Function to calculate effective price after discount
function getEffectivePrice(movie: Movie): number {
  if (!movie.discount || movie.discount <= 0) return movie.price;
  return Math.max(movie.price * (1 - movie.discount / 100), 0); // Prevent negative prices
}

// Store movies in localStorage (if not already stored)
function saveMoviesToLocalStorage() {
  if (!localStorage.getItem("moviesData")) {
    try {
      localStorage.setItem("moviesData", JSON.stringify(moviesData));
    } catch (error) {
      console.error("Error saving movies to localStorage:", error);
    }
  }
}

// Retrieve movies from localStorage (fallback to default data)
function loadMoviesFromLocalStorage(): Movie[] {
  try {
    const storedMovies = localStorage.getItem("moviesData");
    return storedMovies ? JSON.parse(storedMovies) : moviesData;
  } catch (error) {
    console.error("Error loading movies from localStorage:", error);
    return moviesData;
  }
}

// Simulate an asynchronous API call
async function getAllMovies(): Promise<Movie[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(loadMoviesFromLocalStorage()), 500); // Simulates 500ms delay
  });
}

// Fetch a single movie by ID
async function getMovieById(movieId: string): Promise<Movie | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = loadMoviesFromLocalStorage().find((m) => m.id === movieId);
      resolve(movie || null);
    }, 300); // Simulated delay for fetching a single movie
  });
}

// Initialize movies in localStorage
saveMoviesToLocalStorage();

export { getAllMovies, getEffectivePrice, getMovieById, Movie, Review };
