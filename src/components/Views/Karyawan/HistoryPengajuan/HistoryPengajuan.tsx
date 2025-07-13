import DataTable from "@/components/Ui/DataTable";
import { Key, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import { ICategory } from "@/types/Category";
import useHistoryPengajuan from "./useHistoryPengajuan";
import { COLUMN_LIST } from "./HistoryPengajuan.constant";
import { convertIDR } from "@/Utils/currency";
import { Chip } from "@heroui/react";
import { capitalize } from "@/Utils/word";

const HistoryPengajuan = () => {
  const { isReady } = useRouter();
  const {
    dataHistoryPengajuan,
    isLoadingHistoryPengajuan,
    refetchHistoryPengajuan,
    isRefetchingHistoryPengajuan,
  } = useHistoryPengajuan();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const renderCell = useCallback((category: ICategory, columnKey: Key) => {
    const cellValue = category[columnKey as keyof typeof category];
    switch (columnKey) {
      case "jumlah":
        return `${convertIDR(cellValue as number)}`;
      case "status":
        if (cellValue === "Pending") {
          return (
            <Chip color='warning' size='lg'>
              {capitalize(cellValue)}
            </Chip>
          );
        } else if (cellValue === "diterima") {
          return (
            <Chip color='success' variant='flat' size='lg'>
              {capitalize(cellValue)}
            </Chip>
          );
        } else {
          return (
            <Chip color='danger' size='lg'>
              {capitalize(`${cellValue}`)}
            </Chip>
          );
        }
      default:
        return cellValue as React.ReactNode;
    }
  }, []);

  return (
    <>
      <div className='w-full px-4 lg:px-20 py-10'>
        <DataTable
          columns={COLUMN_LIST}
          data={dataHistoryPengajuan?.data || []}
          totalPages={dataHistoryPengajuan?.pagination?.totalPages || 1}
          isLoading={isLoadingHistoryPengajuan || isRefetchingHistoryPengajuan}
          emptyContent='Data Pengajuan Kosong'
          renderCell={renderCell}
          showSearch
          showLimit
          searchLabel='Cari Pengajuan'
        />
      </div>
    </>
  );
};

export default HistoryPengajuan;
