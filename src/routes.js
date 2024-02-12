import CoinPage from "./pages/CoinPage/CoinPage";
import MainPage from "./pages/MainPage/MainPage";

export const publicRoutes = [
  {
    path: "/",
    element: <MainPage />
  },
  {
    path: "/coin/:id",
    element: <CoinPage />
  },
]