import categoriesService from "@/service/category.service";
import { useQuery } from "@tanstack/react-query";

const useSearchWithCategory = () => {
  const getCategory = async () => {
    const { data } = await categoriesService.find();
    return data.data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  return { dataCategory };
};

export default useSearchWithCategory;
