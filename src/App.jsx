import { useState } from "react";
import "./App.css";
import MovieList from "./components/Cine/MovieList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { MovieContext } from "./context";

function App() {
  const [cartData, setCartData] = useState([]);

  return (
    <MovieContext.Provider value={{ cartData, setCartData }}>
      <Header></Header>
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar></Sidebar>
          <MovieList></MovieList>
        </div>
      </main>
      <Footer></Footer>
    </MovieContext.Provider>
  );
}

export default App;
