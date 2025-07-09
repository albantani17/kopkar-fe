import userServices from "@/service/user.service";
import { IKaryawan, IUpdateKaryawan } from "@/types/Karyawan";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailKaryawan = () => {
  const { query, isReady } = useRouter();

  const getDetailKaryawan: () => Promise<IKaryawan> = async () => {
    const { data } = await userServices.get(query.id as string);
    return data.data;
  };

  const { data: dataKaryawan, refetch: refetchKaryawan } = useQuery({
    queryKey: ["detail-karyawan", query.id],
    queryFn: getDetailKaryawan,
    enabled: isReady,
  });

  const updateKaryawan = async (payload: IUpdateKaryawan) => {
    const result = await userServices.update(query.id as string, payload);
    return result.data;
  };

  const {
    mutate: mutateUpdateKaryawan,
    isPending: isPendingUpdateKaryawan,
    isSuccess: isSuccessUpdateKaryawan,
  } = useMutation({
    mutationFn: updateKaryawan,
    onSuccess: () => {
      refetchKaryawan();
      addToast({
        title: "Success",
        description: "Karyawan Berhasil Diupdate",
        color: "success",
      });
    },
    onError: (error) => {
      errorResponse(error);
    },
  });

  const handleUpdateKaryawan = (data: IUpdateKaryawan) => {
    const payload: IUpdateKaryawan = { ...data };

    if (data.simpanan) payload.simpanan = Number(data.simpanan);
    if (data.pinjaman) payload.pinjaman = Number(data.pinjaman);

    delete payload.confirmPassword;

    mutateUpdateKaryawan(payload);
  };

  return {
    dataKaryawan,
    refetchKaryawan,
    handleUpdateKaryawan,
    isPendingUpdateKaryawan,
    isSuccessUpdateKaryawan,
  };
};

export default useDetailKaryawan;
