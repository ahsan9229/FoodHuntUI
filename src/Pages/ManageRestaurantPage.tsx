import ManageRestaurantForm from "@/Forms/managae-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  userGetMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = userGetMyRestaurant();

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
};

export default ManageRestaurantPage;
