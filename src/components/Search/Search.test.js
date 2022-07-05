import { screen, render } from "@testing-library/react";
import Search from "./Search";
import { Provider } from "react-redux";
import { store } from "../../app/store";

test("search bar should be rendered", () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  const searchBar = screen.getByPlaceholderText(/Search for books/i);
  expect(searchBar).toBeInTheDocument();
});

test("search filters should be rendered", () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  const searchFilters = screen.getByRole(/search_filters/i);
  expect(searchFilters).toBeInTheDocument();
});

test("categories search filter should be rendered", () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  const categoriesSearchFilter = screen.getByLabelText(/Categories/i);
  expect(categoriesSearchFilter).toBeInTheDocument();
});

test("sorting search filter should be rendered", () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  const sortingSearchFilter = screen.getByLabelText(/Sorting/i);
  expect(sortingSearchFilter).toBeInTheDocument();
});
