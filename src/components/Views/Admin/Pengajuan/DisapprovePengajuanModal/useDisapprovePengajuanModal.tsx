import pengajuanService from "@/service/pengajuan.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  alasanDitolak: Yup.string().required("Alasan Ditolak wajib diisi"),
});

const useDisapprovePengajuanModal = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const updatePengajuan = async (id: string, alasanDitolak: string) => {
    const result = await pengajuanService.updateStatus(id, {
      status: "ditolak",
      alasanDitolak,
    });
    return result.data;
  };

  const {
    mutate: mutateUpdatePengajuan,
    isPending: isPendingUpdatePengajuan,
    isSuccess: isSuccessUpdatePengajuan,
  } = useMutation({
    mutationFn: ({
      id,
      alasanDitolak,
    }: {
      id: string;
      alasanDitolak: string;
    }) => updatePengajuan(id, alasanDitolak),
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Pengajuan Berhasil Diupdate",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleDisapprovePengajuan = (id: string, alasanDitolak: string) => {
    mutateUpdatePengajuan({ id, alasanDitolak });
  };

  return {
    isPendingUpdatePengajuan,
    handleDisapprovePengajuan,
    isSuccessUpdatePengajuan,
    control,
    handleSubmit,
    reset,
    errors,
  };
};

export default useDisapprovePengajuanModal;
