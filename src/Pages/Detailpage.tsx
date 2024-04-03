import { UserFormData } from "@/Forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItems from "@/components/MenuItems";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const Detailpage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const addToCart = (menuitem: MenuItem) => {
    setCartItems((prevCartItems) => {
      //1: if the items is already in the cart

      const existingCartItems = prevCartItems.find(
        (cartItems) => cartItems._id === menuitem._id
      );

      let updatedCartItems;

      //2: if item in cart , update the quantity
      if (existingCartItems) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuitem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        //3: if item is not in car, add it as a new item
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuitem._id,
            name: menuitem.name,
            price: menuitem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  // const onChekout = async (userFormData: UserFormData) => {
  //   if (!restaurant) {
  //     return;
  //   }

  //   const checkoutData = {
  //     cartItems: cartItems.map((cartItem) => ({
  //       menuItemId: cartItem._id,
  //       name: cartItem.name,
  //       quantity: cartItem.quantity.toString(),
  //     })),
  //     restaurantId: restaurant._id,
  //     deliveryDetails: {
  //       name: userFormData.name,
  //       addressLine: userFormData.addressLine,
  //       city: userFormData.city,
  //       country: userFormData.country,
  //       email: userFormData.email as string,
  //     },
  //   };
  //   const data = await createCheckoutSession(checkoutData);
  // };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine: userFormData.addressLine,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return "loading....";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuitem, index) => (
            <MenuItems
              menuitem={menuitem}
              key={index}
              addToCart={() => addToCart(menuitem)}
            />
          ))}
        </div>
        <div className="">
          {" "}
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>{" "}
        </div>
      </div>
    </div>
  );
};

export default Detailpage;
