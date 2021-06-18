import { createContext } from "react";

const CategoriesContext = createContext({
  categories: [
    { category_id: 1, name: "Beaches", emoji: "🏖️" },
    { category_id: 2, name: "Restaurants", emoji: "🍔" },
  ],
  setCategories: () => {},
});

export default CategoriesContext;
