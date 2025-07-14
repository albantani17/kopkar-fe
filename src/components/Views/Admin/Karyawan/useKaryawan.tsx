import useChangeUrl from "@/hooks/useChangeUrl";
import userServices from "@/service/user.service";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useKaryawan = () => {
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();
  const [id, setId] = useState("");

  const getKaryawan = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;
    if (currentSearch) params += `&search=${currentSearch}`;
    const result = await userServices.getAll(params);
    return result.data;
  };

  const {
    data: dataKaryawan,
    isLoading: isLoadingKaryawan,
    refetch: refetchKaryawan,
    isRefetching: isRefetchingKaryawan,
  } = useQuery({
    queryKey: ["karyawan", currentPage, currentLimit, currentSearch],
    queryFn: getKaryawan,
    enabled: !!currentLimit && !!currentPage,
  });

  const deleteKaryawan = async () => {
    const result = await userServices.delete(id);
    return result.data;
  };

  const {
    mutate: mutateDeleteKaryawan,
    isPending: isPendingDeleteKaryawan,
    isSuccess: isSuccessDeleteKaryawan,
  } = useMutation({
    mutationFn: deleteKaryawan,
    onSuccess() {
      addToast({
        title: "Success",
        description: "Karyawan Berhasil Dihapus",
        color: "success",
      });
    },
    onError(error) {
      errorResponse(error);
    },
  });

  const handleDeleteKaryawan = () => {
    mutateDeleteKaryawan();
  };

  return {
    dataKaryawan,
    isLoadingKaryawan,
    refetchKaryawan,
    isRefetchingKaryawan,
    handleDeleteKaryawan,
    isSuccessDeleteKaryawan,
    isPendingDeleteKaryawan,
    setId,
    id,
  };
};

export default useKaryawan;
