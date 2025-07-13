import pengajuanService from "@/service/pengajuan.service";
import { ICreatePengajuanSimpanan } from "@/types/Pengajuan";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  jumlah: Yup.string().required("Jumlah wajib diisi"),
  noRekening: Yup.string().required("No Rekening wajib diisi"),
});

const usePegnajuanSimpananModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validateSchema) });

  const createPengajuan = async (payload: ICreatePengajuanSimpanan) => {
    const result = await pengajuanService.createPengajuanSimpanan(payload);
    return result.data;
  };

  const {
    mutate: mutateCreatePengajuan,
    isPending: isPendingCreatePengajuan,
    isSuccess: isSuccessCreatePengajuan,
  } = useMutation({
    mutationFn: createPengajuan,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Pengajuan Berhasil Dibuat",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleCreatePengajuan = (payload: ICreatePengajuanSimpanan) => {
    payload.jumlah = Number(payload.jumlah);
    mutateCreatePengajuan(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    reset,
    handleCreatePengajuan,
    isPendingCreatePengajuan,
    isSuccessCreatePengajuan,
  };
};

export default usePegnajuanSimpananModal;
