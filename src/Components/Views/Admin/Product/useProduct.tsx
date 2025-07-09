import useChangeUrl from "@/hooks/useChangeUrl";
import productService from "@/service/product.service";
import uploadService from "@/service/upload.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useProduct = () => {
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();
  const [id, setId] = useState("");

  const getProducts = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;
    if (currentSearch) params += `&search=${currentSearch}`;
    const result = await productService.find(params);
    return result.data;
  };

  const {
    data: dataProduct,
    isLoading: isLoadingProduct,
    refetch: refetchProduct,
    isRefetching: isRefetchingProduct,
  } = useQuery({
    queryKey: ["Product", currentPage, currentLimit, currentSearch],
    queryFn: getProducts,
    enabled: !!currentLimit && !!currentPage,
  });

  const deleteProduct = async () => {
    const result = await productService.delete(id);
    await uploadService.deleteFile(result.data.data.image);
    return result.data;
  };

  const {
    mutate: mutateDeleteProduct,
    isPending: isPendingDeleteProduct,
    isSuccess: isSuccessDeleteProduct,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess() {
      addToast({
        title: "Success",
        description: "Produk Berhasil Dihapus",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleDeleteProduct = () => {
    mutateDeleteProduct();
  };

  return {
    dataProduct,
    isLoadingProduct,
    refetchProduct,
    isRefetchingProduct,
    handleDeleteProduct,
    isSuccessDeleteProduct,
    isPendingDeleteProduct,
    setId,
    id,
  };
};

export default useProduct;
