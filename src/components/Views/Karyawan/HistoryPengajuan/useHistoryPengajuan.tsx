import useChangeUrl from "@/hooks/useChangeUrl";
import pengajuanService from "@/service/pengajuan.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useHistoryPengajuan = () => {
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getHistoryPengajuan = async () => {
    let params = `page=${currentPage}&limit=${currentLimit}`;
    if (currentSearch) params += `&search=${currentSearch}`;
    const result = await pengajuanService.findByUser(params);
    return result.data;
  };

  const {
    data: dataHistoryPengajuan,
    isLoading: isLoadingHistoryPengajuan,
    refetch: refetchHistoryPengajuan,
    isRefetching: isRefetchingHistoryPengajuan,
  } = useQuery({
    queryKey: ["historyPengajuan", currentPage, currentLimit, currentSearch],
    queryFn: getHistoryPengajuan,
    enabled: !!currentLimit && !!currentPage,
  });

  return {
    dataHistoryPengajuan,
    isLoadingHistoryPengajuan,
    refetchHistoryPengajuan,
    isRefetchingHistoryPengajuan,
  };
};

export default useHistoryPengajuan;
