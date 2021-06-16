import { createContext } from "react";

const CategoriesContext = createContext({
  categories: [],
  setCategories: () => {},
});

export default CategoriesContext;
