import userServices from "@/service/user.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  pinjaman: Yup.number().required("Pinjaman wajib diisi"),
});

const useBayarPinjamanModal = (id: string) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(validateSchema) });

  const bayarPinjaman = async (pinjaman: number) => {
    const result = await userServices.updateSetor(id, "pinjaman", pinjaman);
    return result.data.data;
  };

  const {
    mutate: mutateBayarPinjaman,
    isPending: isPendingBayarPinjaman,
    isSuccess: isSuccessBayarPinjaman,
  } = useMutation({
    mutationFn: bayarPinjaman,
    onSuccess: () => {
      reset();
      setValue("pinjaman", 0);
      addToast({
        title: "Success",
        description: "Pinjaman Berhasil Dibayar",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleBayarPinjaman = ({ pinjaman }: { pinjaman: number }) => {
    mutateBayarPinjaman(pinjaman);
  };

  return {
    control,
    handleSubmit,
    errors,
    isPendingBayarPinjaman,
    isSuccessBayarPinjaman,
    handleBayarPinjaman,
  };
};

export default useBayarPinjamanModal;
