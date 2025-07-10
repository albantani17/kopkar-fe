import categoriesService from "@/service/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const updateProductSchema = Yup.object().shape({
  name: Yup.string().required("Nama produk wajib diisi"),
  description: Yup.string().required("Deskripsi wajib diisi"),
  price: Yup.string().required("Harga wajib diisi"),
  category_id: Yup.string().required("Kategori wajib diisi"),
});

const useDataProductTab = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(updateProductSchema) });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoriesService.find(),
    enabled: true,
  });

  return { control, handleSubmit, errors, reset, setValue, dataCategory };
};

export default useDataProductTab;
