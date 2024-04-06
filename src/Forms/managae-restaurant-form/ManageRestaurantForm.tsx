import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSections from "./DetailSections";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButtton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "City name is required",
    }),
    country: z.string({
      required_error: "Country name is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name Is Required"),
        price: z.coerce.number().min(1, "Price is Required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormFata: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    // price lowest domination of 100 = 100pence == 1GBP
    const DeliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((itemPrice) => ({
      ...itemPrice,
      price: parseInt((itemPrice.price / 100).toFixed(2)),
    }));

    const updaterestaurant = {
      ...restaurant,
      delievryPrice: DeliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };
    form.reset(updaterestaurant);
    // form.reset(restaurant);
  }, [form, restaurant]);

  const onSubmit = (FormDataJson: RestaurantFormData) => {
    //TODO - convert formdatajson to a new form data object

    const formData = new FormData();
    formData.append("restaurantName", FormDataJson.restaurantName);
    formData.append("city", FormDataJson.city);
    formData.append("country", FormDataJson.country);
    //formData.append("deliveryPrice", FormDataJson.deliveryPrice.toString());
    formData.append(
      "deliveryPrice",
      (FormDataJson.deliveryPrice * 100).toString()
    );

    formData.append(
      "estimatedDeliveryTime",
      FormDataJson.estimatedDeliveryTime.toString()
    );
    FormDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    FormDataJson.menuItems.forEach((menuItems, index) => {
      formData.append(`menuItems[${index}][name]`, menuItems.name);
      //  formData.append(`menuItems[${index}][price]`, menuItems.price.toString());
      formData.append(
        `menuItems[${index}][price]`,
        (menuItems.price * 100).toString()
      );
    });

    if (FormDataJson.imageFile) {
      formData.append(`imageFile`, FormDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  bg-gray-50 p-10 rounded-lg"
      >
        {" "}
        <DetailSections />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <ImageSection />
        <Separator />
        {isLoading ? <LoadingButtton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
