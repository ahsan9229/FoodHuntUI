import { CartItem } from "@/Pages/Detailpage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash2 } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ cartItems, restaurant, removeFromCart }: Props) => {
  const getTotoalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotoalCost()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 ">
        {cartItems.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span>
              {" "}
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>{" "}
            <span className="flex items-center gap-1">
              <span>
                <Trash2
                  size={25}
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeFromCart(item)}
                />{" "}
              </span>
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
