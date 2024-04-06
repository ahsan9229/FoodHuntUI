import { Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import HomePage from "./Pages/HomePage";
import AuthCallbackPage from "./Pages/AuthCallbackPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ManageRestaurantPage from "./Pages/ManageRestaurantPage";
import SearchPage from "./Pages/SearchPage";
import Detailpage from "./Pages/Detailpage";
import OrderStatusPage from "./Pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero title="Home">
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false} title="Search Page">
            {" "}
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false} title="Restaurant Detail">
            {" "}
            <Detailpage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout title="User Profile">
              <UserProfilePage />{" "}
            </Layout>
          }
        />
        <Route
          path="/order-status"
          element={
            <Layout title="Order Status">
              <OrderStatusPage />{" "}
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout title="Manage Restaurant">
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
