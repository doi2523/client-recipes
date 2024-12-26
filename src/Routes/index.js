import AddRecipeForm from "../pages/AddRecipePage";
import EditRecipe from "../pages/EditRecipe";
import Home from "../pages/HomeRecipe";
import RecipeList from "../pages/RecipeList";
import RecipeSearchPage from "../pages/RecipeSearchPage";

//Public routes
const publicRoutes = [
  { path: "/", component: Home, title: "Home Cooking Recipe" },
  { path: "/search", component: RecipeSearchPage, title: "Search Cooking Recipe" },
  { path: "/addrecipe", component: AddRecipeForm, title: "Add Cooking Recipe" },
  { path: "/recipelist", component: RecipeList, title: "List Cooking Recipe" },
  { path: "/edit-recipe/:id", component: EditRecipe, title: "Edit Cooking Recipe" },
];
export { publicRoutes };
