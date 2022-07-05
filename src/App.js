import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import BookList from "./pages/BookList/BookList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./pages/BookDetail/BookDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={window.location.pathname || ""}>
        <Header />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/:title" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
