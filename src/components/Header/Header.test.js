import { screen, render } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "../../app/store";

test("header title should be rendered", () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const headerTitle = screen.getByText(/Book Finder/i);
  expect(headerTitle).toBeInTheDocument();
});
