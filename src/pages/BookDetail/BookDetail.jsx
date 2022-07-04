import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { arrayToStr } from "../../components/BookCard/BookCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import "./BookDetail.css";

const BookDetail = () => {
  const navigate = useNavigate();
  const book = useSelector((state) => state.books.currentBook);

  if (!book) navigate("/");

  return (
    <div className="book-details">
      <IconButton onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </IconButton>
      <div className="bookcover_container">
        <img
          className="bookcover__image"
          alt="Book Cover Large"
          src={
            book.imageLinks.thumbnail
              ? book.imageLinks.thumbnail
              : "https://bookshow.blurb.com/bookshow/cache/P11360640/md/cover_2.jpeg?access_key=675523b769268bce5b0b710b3d0e7841"
          }
        />
      </div>
      <div className="book-info">
        <div className="book-info__categories">
          {book.categories?.length > 0 ? arrayToStr(book.categories, "/") : ""}
        </div>
        <h2 className="book-info__title">{book.title ? book.title : ""}</h2>
        <div className="book-info__authors">
          {book.authors?.length > 0 ? arrayToStr(book.authors, ", ") : ""}
        </div>
        <div className="book-info__desc">
          {book.description ? book.description : ""}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
