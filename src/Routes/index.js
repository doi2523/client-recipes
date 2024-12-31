import AddRecipeForm from "../pages/AddRecipePage";
import RecipeGrid from "../pages/CookingRecipes";
import EditRecipe from "../pages/EditRecipe";
import Home from "../pages/HomeRecipe";
import RecipeDetail from "../pages/RecipeDetail";
import RecipeList from "../pages/RecipeList";

//Public routes
const publicRoutes = [
  { path: "/", component: Home, title: "Home Cooking Recipe" },
  // { path: "/search", component: RecipeSearchPage, title: "Search Cooking Recipe" },
  { path: "/addrecipe", component: AddRecipeForm, title: "Add Cooking Recipe" },
  { path: "/recipelist", component: RecipeList, title: "List Cooking Recipe" },
  { path: "/edit-recipe/:id", component: EditRecipe, title: "Edit Cooking Recipe" },
  { path: "/cooking-recipes", component: RecipeGrid, title: "Cooking Recipe" },
  { path: "/recipe-detail/:id", component: RecipeDetail, title: "Cooking Recipe Detail" },
];
export { publicRoutes };
