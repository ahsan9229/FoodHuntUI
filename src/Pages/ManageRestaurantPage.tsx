import ManageRestaurantForm from "@/Forms/managae-restaurant-form/ManageRestaurantForm";
import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  );
};

export default ManageRestaurantPage;
