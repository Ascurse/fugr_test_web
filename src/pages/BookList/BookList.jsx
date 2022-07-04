import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, addMoreBooks } from "../../app/bookReducer";
import { setIsLoading, setOpen } from "../../app/loadReducer";
import BookCard from "../../components/BookCard/BookCard";
import Button from "@mui/material/Button";
import "./BookList.css";
import { APIkey } from "../../helpers/data";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.bookArray);
  const bookCount = useSelector((state) => state.books.bookCount);
  const title = useSelector((state) => state.search.title);
  const category = useSelector((state) => state.search.category);
  const sorting = useSelector((state) => state.search.sorting);
  const currentPage = useSelector((state) => state.books.currentPage);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const open = useSelector((state) => state.loading.isOpen);

  const loadMoreBooks = async (title, category, sorting, currentPage) => {
    let categorySortingParameter = "";
    if (category && category !== "all") {
      categorySortingParameter = "+subject:" + category;
    }

    let currentPageParameter = "";
    dispatch(setCurrentPage(currentPage + 1));
    if (currentPage) {
      currentPageParameter = "&startIndex=" + currentPage * 30;
    }

    dispatch(setIsLoading(true));
    dispatch(setOpen(true));
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}${categorySortingParameter}&orderBy=${sorting}&maxResults=30${currentPageParameter}${APIkey}`
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    dispatch(addMoreBooks(data.items));
    dispatch(setIsLoading(false));
    dispatch(setOpen(false));
  };

  return (
    <div className="booklist">
      <div className="booklist__counter">
        Found <b>{bookCount}</b> results
      </div>
      <div className="booklist__items">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard book={book.volumeInfo} key={book.etag} />
          ))
        ) : (
          <h1>Please enter search parameters!</h1>
        )}
      </div>
      {books.length !== 0 || (currentPage + 1) * 30 <= bookCount ? (
        <div className="load_button">
          <Button
            variant="contained"
            onClick={() => loadMoreBooks(title, category, sorting, currentPage)}
          >
            Load More
          </Button>
        </div>
      ) : null}
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </div>
  );
};

export default BookList;
