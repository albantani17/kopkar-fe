import DataTable from "@/components/Ui/DataTable";
import { COLUMN_LIST } from "./Pengajuan.constant";
import { Key, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import { BiDetail } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { montserrat } from "@/pages/_app";
import usePengajuan from "./usePengajuan";
import { IPengajuan } from "@/types/Pengajuan";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { convertIDR } from "@/Utils/currency";
import ApprovePengajuanModal from "./ApprovePengajuanModal";
import DisapprovePengajuanModal from "./DisapprovePengajuanModal";
import DetailPengajuanModal from "./DetailPengajuanModal";

const Pengajuan = () => {
  const { isReady } = useRouter();
  const {
    dataPengajuan,
    isLoadingPengajuan,
    refetchPengajuan,
    isRefetchingPengajuan,
    setId,
    id,
  } = usePengajuan();

  const { setUrl } = useChangeUrl();

  const approvePengajuanModal = useDisclosure();
  const disapprovePengajuanModal = useDisclosure();
  const detailPengajuanModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const renderCell = useCallback(
    (Pengajuan: IPengajuan, columnKey: Key) => {
      const cellValue = Pengajuan[columnKey as keyof typeof Pengajuan];
      switch (columnKey) {
        case "name":
          return (
            <Link
              href={`/admin/karyawan/${Pengajuan.user?.id}`}
              className='hover:underline hover:text-primary-600'
            >
              {Pengajuan.user?.name}
            </Link>
          );
        case "jumlah":
          return `${convertIDR(Number(Pengajuan.jumlah))}`;
        case "action":
          return (
            <div className='flex gap-4'>
              <Tooltip content='Detail' className={montserrat.className}>
                <Button
                  isIconOnly
                  radius='full'
                  variant='flat'
                  color='primary'
                  onPress={() => {
                    setId(`${Pengajuan.id}`);
                    detailPengajuanModal.onOpen();
                  }}
                >
                  <BiDetail size={20} />
                </Button>
              </Tooltip>
              {Pengajuan.status === "pending" && (
                <>
                  <Tooltip content='Tolak' className={montserrat.className}>
                    <Button
                      isIconOnly
                      radius='full'
                      variant='flat'
                      color='danger'
                      onPress={() => {
                        setId(`${Pengajuan.id}`);
                        disapprovePengajuanModal.onOpen();
                      }}
                    >
                      <ImCross size={20} />
                    </Button>
                  </Tooltip>
                  <Tooltip content='Setujui' className={montserrat.className}>
                    <Button
                      isIconOnly
                      radius='full'
                      variant='flat'
                      color='success'
                      onPress={() => {
                        setId(`${Pengajuan.id}`);
                        approvePengajuanModal.onOpen();
                      }}
                    >
                      <FaCheck size={20} />
                    </Button>
                  </Tooltip>
                </>
              )}
            </div>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [setId]
  );

  return (
    <>
      <DataTable
        columns={COLUMN_LIST}
        data={dataPengajuan?.data || []}
        totalPages={dataPengajuan?.pagination?.totalPages || 1}
        isLoading={isLoadingPengajuan || isRefetchingPengajuan}
        emptyContent='Data Pengajuan Kosong'
        renderCell={renderCell}
        showSearch
        showLimit
        searchLabel='Cari Nama Kategori'
      />
      <ApprovePengajuanModal
        {...approvePengajuanModal}
        id={id}
        setId={setId}
        refetch={refetchPengajuan}
      />
      <DisapprovePengajuanModal
        {...disapprovePengajuanModal}
        id={id}
        setId={setId}
        refetch={refetchPengajuan}
      />
      <DetailPengajuanModal {...detailPengajuanModal} id={id} />
    </>
  );
};

export default Pengajuan;
