import categoriesService from "@/service/category.service";
import { ICategory, IUpdateCategory } from "@/types/Category";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const updateCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name wajib diisi"),
  description: Yup.string().required("Description wajib diisi"),
});

const useDetailCategoryModal = (id: string) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(updateCategorySchema) });

  const getCategory = async () => {
    const { data } = await categoriesService.findOne(id);
    return data.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["detail-category", id],
    queryFn: getCategory,
    enabled: !!id,
  });

  const updateCategory = async (
    payload: IUpdateCategory,
  ): Promise<ICategory> => {
    const result = await categoriesService.update(id, payload);
    return result.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
  } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Kategori Berhasil Diubah",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleUpdateCategory = (payload: IUpdateCategory) => {
    mutateUpdateCategory(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    reset,
    setValue,

    dataCategory,
    refetchCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  };
};

export default useDetailCategoryModal;
