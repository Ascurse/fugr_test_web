import React from "react";
import "./BookCard.css";

const mapArrayToStr = (arr, sep = ",") => {
  let el = arr.map((item) => {
    if (arr.indexOf(item) !== arr.length - 1) {
      return <span key={arr.indexOf(item)}>{item + sep + " "}</span>;
    } else {
      return <span key={arr.indexOf(item)}> {item} </span>;
    }
  });
  return el;
};

const BookCard = (props) => {
  return (
    <div className="bookcard">
      <img
        className="book__cover"
        alt="book cover"
        src={
          props.book.imageLinks?.smallThumbnail
            ? props.book.imageLinks.smallThumbnail
            : "https://bookshow.blurb.com/bookshow/cache/P11360640/md/cover_2.jpeg?access_key=675523b769268bce5b0b710b3d0e7841"
        }
      />
      <div className="book__info">
        <div className="book__category">
          {props.book.categories?.length > 0 ? props.book.categories[0] : ""}
        </div>
        <h3 className="book__title">
          {props.book.title ? props.book.title : ""}
        </h3>
        <div className="book__authors">
          {props.book.authors?.length > 0
            ? mapArrayToStr(props.book.authors, ",")
            : ""}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
