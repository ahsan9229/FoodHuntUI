export type User = {
  _id: string;
  email: string;
  name: string;
  phone: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem={
  _id:string;
  name:string;
  price: number;
}
export type Restaurant ={
  _id: string,
  user: string,
  restaurantName:string;
  city: string;
  country:string;
  delievryPrice: number;
  estimaedDEliveryTime: number;
  cuisines:string[];
  meniItems:MenuItem[],
  imageUrl: string;
  lastupdate: string

}