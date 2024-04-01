import ManageRestaurantForm from "@/Forms/managae-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  useUpdateMyRestaurant,
  userGetMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = userGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
