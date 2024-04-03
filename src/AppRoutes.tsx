import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import HomePage from "./Pages/HomePage";
import AuthCallbackPage from "./Pages/AuthCallbackPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ManageRestaurantPage from "./Pages/ManageRestaurantPage";
import SearchPage from "./Pages/SearchPage";
import Detailpage from "./Pages/Detailpage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            {" "}
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            {" "}
            <Detailpage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />{" "}
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />{" "}
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
