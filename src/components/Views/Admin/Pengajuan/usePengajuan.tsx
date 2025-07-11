import useChangeUrl from "@/hooks/useChangeUrl";
import categoriesService from "@/service/category.service";
import pengajuanService from "@/service/pengajuan.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const usePengajuan = () => {
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();
  const [id, setId] = useState("");

  const getPengajuan = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;
    if (currentSearch) params += `&search=${currentSearch}`;
    const result = await pengajuanService.find(params);
    return result.data;
  };

  const {
    data: dataPengajuan,
    isLoading: isLoadingPengajuan,
    refetch: refetchPengajuan,
    isRefetching: isRefetchingPengajuan,
  } = useQuery({
    queryKey: ["Pengajuan", currentPage, currentLimit, currentSearch],
    queryFn: getPengajuan,
    enabled: !!currentLimit && !!currentPage,
  });

  const deletePengajuan = async () => {
    const result = await pengajuanService.delete(id);
    return result.data;
  };

  const {
    mutate: mutateDeletePengajuan,
    isPending: isPendingDeletePengajuan,
    isSuccess: isSuccessDeletePengajuan,
  } = useMutation({
    mutationFn: deletePengajuan,
    onSuccess() {
      addToast({
        title: "Success",
        description: "Kategori Berhasil Dihapus",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleDeletePengajuan = () => {
    mutateDeletePengajuan();
  };

  return {
    dataPengajuan,
    isLoadingPengajuan,
    refetchPengajuan,
    isRefetchingPengajuan,
    handleDeletePengajuan,
    isSuccessDeletePengajuan,
    isPendingDeletePengajuan,
    setId,
    id,
  };
};

export default usePengajuan;
