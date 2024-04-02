import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOptions: string;
};
const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimaded Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({ onChange, sortOptions }: Props) => {
  const selectedSortLabel = SORT_OPTIONS.filter(
    (option) => option.value === sortOptions
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="w-full">
          Sorted by: {selectedSortLabel[0].label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            className="cursor-pointer "
            onClick={() => onChange(option.value)}
            key={index}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
