import pengajuanService from "@/service/pengajuan.service";
import { ICreatePengajuanPinjaman } from "@/types/Pengajuan";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  alasan: Yup.string().required("Alasan wajib diisi"),
  jumlah: Yup.number().required("Jumlah wajib diisi"),
  noRekening: Yup.string().required("No Rekening wajib diisi"),
});

const usePengajuanPinjamanModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(validateSchema) });

  const createPengajuan = async (payload: ICreatePengajuanPinjaman) => {
    const result = await pengajuanService.createPengajuanPinjaman(payload);
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

  const handleCreatePengajuan = (payload: ICreatePengajuanPinjaman) => {
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
    setValue,
  };
};

export default usePengajuanPinjamanModal;
