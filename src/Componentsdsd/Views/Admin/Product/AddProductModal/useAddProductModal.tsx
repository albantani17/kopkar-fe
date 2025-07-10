import useMediaHandling from "@/hooks/useMediaHandling";
import categoriesService from "@/service/category.service";
import productService from "@/service/product.service";
import { ICreateProduct } from "@/types/Product";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Nama produk wajib diisi"),
  description: Yup.string().required("Deskripsi wajib diisi"),
  image: Yup.mixed<FileList | string>().required("Gambar Produk wajib diisi"),
  price: Yup.string().required("Harga wajib diisi"),
  category_id: Yup.string().required("Kategori wajib diisi"),
});

const useAddProductModal = () => {
  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(addProductSchema) });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => {
      onChange(undefined);
      setValue("image", "");
    });
  };

  const addProduct = async (payload: ICreateProduct) => {
    const result = await productService.create(payload);
    return result.data;
  };

  const {
    mutate: mutateAddProduct,
    isPending: isPendingAddProduct,
    isSuccess: isSuccessAddProduct,
  } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Product Berhasil Ditambahkan",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleAddProduct = (data: ICreateProduct) => {
    const payload = { ...data, price: Number(data.price) };
    mutateAddProduct(payload);
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoriesService.find(),
    enabled: true,
  });

  return {
    control,
    handleSubmit,
    errors,
    reset,
    handleAddProduct,
    isPendingAddProduct,
    isSuccessAddProduct,

    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    preview,

    dataCategory,
  };
};

export default useAddProductModal;
