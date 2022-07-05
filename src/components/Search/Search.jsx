import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, setBookCount, setCurrentPage } from "../../app/bookReducer";
import { setTitle, setCategory, setSorting } from "../../app/searchParams";
import { setIsLoading, setOpen } from "../../app/loadReducer";
import { setError } from "../../app/errorReducer";
import { options, APIkey } from "../../helpers/data";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.search.title);
  const category = useSelector((state) => state.search.category);
  const sorting = useSelector((state) => state.search.sorting);
  const currentPage = useSelector((state) => state.books.currentPage);
  const error = useSelector((state) => state.error.error);
  const [errorText, setErrorText] = useState("");
  const [notification, setNotification] = useState(false);

  const searchBooks = async (title, category, sorting, currentPage) => {
    let categorySortingParameter = "";
    if (category && category !== "all") {
      categorySortingParameter = "+subject:" + category;
    }

    let currentPageParameter = "";
    if (currentPage) {
      currentPageParameter = "&startIndex=" + (currentPage + 1) * 30;
    }

    dispatch(setIsLoading(true));
    dispatch(setOpen(true));
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}${categorySortingParameter}&orderBy=${sorting}&maxResults=30${currentPageParameter}${APIkey}`
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      dispatch(setIsLoading(false));
      dispatch(
        setError(
          "Oops, something wrong with API. Please check if you filled search parameters"
        )
      );
      setNotification(true);
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data.items);
    dispatch(setBooks(data.items));
    dispatch(setBookCount(data.totalItems));
    dispatch(setIsLoading(false));
    dispatch(setOpen(false));
    dispatch(setCurrentPage(1));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBooks(title, category, sorting, currentPage);
    }
  };

  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      setErrorText("");
      dispatch(setTitle(event.target.value));
    } else {
      setErrorText("Can not be empty!");
      dispatch(setTitle(""));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification(false);
  };

  return (
    <div className="search">
      <TextField
        required
        helperText={errorText}
        error={!!errorText}
        variant="outlined"
        color="primary"
        placeholder="Search for books"
        defaultValue=""
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  searchBooks(title, category, sorting, currentPage)
                }
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="search__filter" role="search_filters">
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="categories-select">Categories</InputLabel>
          <Select
            defaultValue="all"
            labelId="categories-select"
            label="Categories"
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {options.categories.map((category) => (
              <MenuItem value={category.value} key={category.text}>
                {category.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sorting-select">Sorting by</InputLabel>
          <Select
            defaultValue="relevance"
            labelId="sorting-select"
            label="Sorting"
            onChange={(e) => dispatch(setSorting(e.target.value))}
          >
            {options.sortingBy.map((sorting) => (
              <MenuItem value={sorting.value} key={sorting.text}>
                {sorting.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Snackbar
        open={notification}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
      />
    </div>
  );
};

export default Search;
