import ManageRestaurantForm from "@/Forms/managae-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  useUpdateMyRestaurant,
  userGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import { Skeleton } from "@/components/ui/skeleton";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant, isLoading: isGetLoading } = userGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const isEditing = !!restaurant;

  if (isGetLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
    );
  }
  if (!restaurant) {
    return <span>Unable to laod restaurant Detail</span>;
  }
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
