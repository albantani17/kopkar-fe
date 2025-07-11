import productService from "@/service/product.service";
import useCategoryStore from "@/store/useCategoryStore";
import useSearchStore from "@/store/useSearchStore";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const { categoryId } = useCategoryStore();
  const { search } = useSearchStore();

  const getProduct = async () => {
    let params = `page=1&limit=12`;
    if (search) params += `&search=${search}`;
    if (categoryId) params += `&category=${categoryId}`;
    const result = await productService.find(params);
    return result.data;
  };

  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    refetch: refetchProduct,
    isRefetching: isRefetchingProduct,
    isError: isErrorProduct,
  } = useQuery({
    queryKey: ["product", search, categoryId],
    queryFn: getProduct,
    enabled: true,
  });

  return {
    dataProduct,
    isLoadingProduct,
    refetchProduct,
    isRefetchingProduct,
    isErrorProduct,
  };
};

export default useHome;
