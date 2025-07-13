import pengajuanService from "@/service/pengajuan.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useApprovePengajuanModal = () => {
  const updatePengajuan = async (id: string) => {
    const result = await pengajuanService.updateStatus(id, {
      status: "diterima",
    });
    return result.data;
  };

  const {
    mutate: mutateUpdatePengajuan,
    isPending: isPendingUpdatePengajuan,
    isSuccess: isSuccessUpdatePengajuan,
  } = useMutation({
    mutationFn: updatePengajuan,
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

  const handleApprovePengajuan = (id: string) => {
    mutateUpdatePengajuan(id);
  };

  return {
    isPendingUpdatePengajuan,
    handleApprovePengajuan,
    isSuccessUpdatePengajuan,
  };
};

export default useApprovePengajuanModal;
