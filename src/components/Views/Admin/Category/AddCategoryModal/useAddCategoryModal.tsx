import categoriesService from "@/service/category.service";
import { ICreateCategory } from "@/types/Category";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const addCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name wajib diisi"),
  description: Yup.string().required("Description wajib diisi"),
});

const useAddCategoryModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addCategorySchema) });

  const addCategory = async (payload: ICreateCategory) => {
    const result = await categoriesService.create(payload);
    return result.data;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingAddCategory,
    isSuccess: isSuccessAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Category Berhasil Ditambahkan",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleAddCategory = (payload: ICreateCategory) => {
    mutateAddCategory(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    reset,
    handleAddCategory,
    isPendingAddCategory,
    isSuccessAddCategory,
  };
};

export default useAddCategoryModal;
