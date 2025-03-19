import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "../store/categoriesApi";

type FilterProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
};

const Filter = ({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: FilterProps) => {
  const { data: categories = [] } = useGetCategoriesQuery();

  return (
    <>
      <div className="align-center flex gap-5">
        <Select
          onValueChange={(category_id) =>
            setSelectedCategory(category_id === "all" ? null : category_id)
          }
          value={selectedCategory || "all"}
        >
          <SelectTrigger className="rounded-md border border-gray-300 p-2">
            <SelectValue>
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name ||
                  "Unknown"
                : "All categories"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedStatus} value={selectedStatus}>
          <SelectTrigger className="rounded-md border border-gray-300 p-2">
            <SelectValue>
              {selectedStatus === "all"
                ? "All status"
                : selectedStatus === "completed"
                  ? "Completed"
                  : "Not completed"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not_completed">Not completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
