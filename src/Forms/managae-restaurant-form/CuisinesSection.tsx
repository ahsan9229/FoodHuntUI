import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold"> Cuisines</h2>
        <FormDescription>
          Select the Cuisinse that youe restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisines: string, index: number) => (
                <CuisineCheckBox
                  cuisines={cuisines}
                  field={field}
                  key={index}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};

export default CuisinesSection;