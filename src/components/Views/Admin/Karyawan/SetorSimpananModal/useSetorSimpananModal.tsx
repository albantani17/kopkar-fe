import userServices from "@/service/user.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  simpanan: Yup.number().required("Setor wajib diisi"),
});

const useSetorSimpananModal = (id: string) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(validateSchema) });

  const setorSimpanan = async (simpanan: number) => {
    const result = await userServices.updateSetor(id, "simpanan", simpanan);
    return result.data.data;
  };

  const {
    mutate: mutateSetorSimpanan,
    isPending: isPendingSetorSimpanan,
    isSuccess: isSuccessSetorSimpanan,
  } = useMutation({
    mutationFn: setorSimpanan,
    onSuccess: () => {
      reset();
      setValue("simpanan", 0);
      addToast({
        title: "Success",
        description: "Simpanan Berhasil Disetor",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleSetorSimpanan = ({ simpanan }: { simpanan: number }) => {
    mutateSetorSimpanan(simpanan);
  };

  return {
    control,
    errors,
    setValue,
    handleSubmit,
    isPendingSetorSimpanan,
    isSuccessSetorSimpanan,
    handleSetorSimpanan,
  };
};

export default useSetorSimpananModal;
