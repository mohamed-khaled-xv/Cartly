import { ImageSourcePropType } from "react-native";

export type FruitItem = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  price: number;
  unit: string;
  weight: number | null;
  isNew: boolean;
  discount: string | null;
  isFavorite: boolean;
  bgColor: string;
  accentColor: string;
};



// If your endpoint returns an array:
export type FruitsResponse = FruitItem[];
