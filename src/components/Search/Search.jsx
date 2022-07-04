import React from "react";
import {
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, setBookCount, setCurrentPage } from "../../app/bookReducer";
import { setTitle, setCategory, setSorting } from "../../app/searchParams";
import { setIsLoading, setOpen } from "../../app/loadReducer";
import { options } from "../../helpers/data";
import { APIkey } from "../../helpers/data";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.search.title);
  const category = useSelector((state) => state.search.category);
  const sorting = useSelector((state) => state.search.sorting);
  const currentPage = useSelector((state) => state.books.currentPage);

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

  return (
    <div className="search">
      <TextField
        placeholder="Search for books"
        defaultValue=""
        onChange={(e) => dispatch(setTitle(e.target.value))}
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
      <div className="search__filter">
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
    </div>
  );
};

export default Search;
