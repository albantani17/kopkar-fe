import useChangeUrl from "@/hooks/useChangeUrl";
import categoriesService from "@/service/category.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useCategory = () => {
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();
  const [id, setId] = useState("");

  const getCategory = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;
    if (currentSearch) params += `&search=${currentSearch}`;
    const result = await categoriesService.find(params);
    return result.data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
    isRefetching: isRefetchingCategory,
  } = useQuery({
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: getCategory,
    enabled: !!currentLimit && !!currentPage,
  });

  const deleteCategory = async () => {
    const result = await categoriesService.delete(id);
    return result.data;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingDeleteCategory,
    isSuccess: isSuccessDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess() {
      addToast({
        title: "Success",
        description: "Kategori Berhasil Dihapus",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleDeleteCategory = () => {
    mutateDeleteCategory();
  };

  return {
    dataCategory,
    isLoadingCategory,
    refetchCategory,
    isRefetchingCategory,
    handleDeleteCategory,
    isSuccessDeleteCategory,
    isPendingDeleteCategory,
    setId,
    id,
  };
};

export default useCategory;
