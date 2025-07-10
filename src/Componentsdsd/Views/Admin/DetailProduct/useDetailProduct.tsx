import productService from "@/service/product.service";
import uploadService from "@/service/upload.service";
import { IUpdateProduct } from "@/types/Product";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailProduct = () => {
  const { query, isReady } = useRouter();
  const getProduct = async () => {
    const { data } = await productService.findOne(`${query.id}`);
    return data.data;
  };

  const {
    data: dataProduct,
    refetch: refetchProduct,
    isFetched: isFetchedProduct,
  } = useQuery({
    queryKey: ["detail-product", query.id],
    queryFn: getProduct,
    enabled: isReady,
  });

  const updateProduct = async (payload: IUpdateProduct) => {
    const result = await productService.update(`${query.id}`, payload);
    return result.data;
  };

  const {
    mutate: mutateUpdateProduct,
    isPending: isPendingUpdateProduct,
    isSuccess: isSuccessUpdateProduct,
  } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      refetchProduct();
      addToast({
        title: "Success",
        description: "Product Berhasil Diupdate",
        color: "success",
      });
    },
    onError: (error) => {
      errorResponse(error);
    },
  });

  const handleUpdateProduct = (payload: IUpdateProduct) => {
    mutateUpdateProduct(payload);
  };

  const handleUpdateImage = (payload: IUpdateProduct) => {
    uploadService.deleteFile(dataProduct?.image);
    mutateUpdateProduct(payload);
  };

  return {
    dataProduct,
    refetchProduct,
    handleUpdateProduct,
    handleUpdateImage,
    isPendingUpdateProduct,
    isSuccessUpdateProduct,
    isFetchedProduct,
  };
};

export default useDetailProduct;
