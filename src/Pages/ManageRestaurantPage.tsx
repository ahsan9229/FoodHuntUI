import ManageRestaurantForm from "@/Forms/managae-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
  userGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import DocumentTitle from "@/components/DocumentTitle";
import OrderItemCard from "@/components/OrderItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageRestaurantPage = () => {
  DocumentTitle("Manage Restaurant");
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant, isLoading: isGetLoading } = userGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

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
  // if (!restaurant) {
  //   return <span>Unable to laod restaurant Detail</span>;
  // }
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">{orders?.length} Orders</TabsTrigger>
        <TabsTrigger value="manage-retaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders
          ?.map((order, index) => <OrderItemCard order={order} key={index} />)
          .reverse()}
      </TabsContent>
      <TabsContent value="manage-retaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
