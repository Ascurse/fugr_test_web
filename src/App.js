import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import BookList from "./pages/BookList/BookList";

function App() {
  return (
    <div className="App">
      <Header />
      <BookList />
    </div>
  );
}

export default App;
