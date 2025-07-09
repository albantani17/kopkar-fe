import DataTable from "@/Components/Ui/DataTable";
import { COLUMN_LIST } from "./Karyawan.constant";
import useKaryawan from "./useKaryawan";
import { Key, useCallback, useEffect } from "react";
import { IKaryawan } from "@/types/Karyawan";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import AddKaryawanModal from "./AddKaryawanModal";
import DeleteKaryawanModal from "./DeleteKaryawanModal";
import { montserrat } from "@/pages/_app";
import Link from "next/link";

const Karyawan = () => {
  const { isReady } = useRouter();
  const {
    dataKaryawan,
    isLoadingKaryawan,
    refetchKaryawan,
    isRefetchingKaryawan,

    handleDeleteKaryawan,
    isSuccessDeleteKaryawan,
    isPendingDeleteKaryawan,
    setId,
  } = useKaryawan();

  const { setUrl } = useChangeUrl();

  const addKaryawanModal = useDisclosure();
  const deleteKaryawanModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const renderCell = useCallback(
    (karyawan: IKaryawan, columnKey: Key) => {
      const cellValue = karyawan[columnKey as keyof typeof karyawan];
      switch (columnKey) {
        case "simpanan":
          return `Rp. ${cellValue?.toLocaleString("id-ID")}`;
        case "pinjaman":
          return `Rp. ${cellValue?.toLocaleString("id-ID")}`;
        case "action":
          return (
            <div className="flex gap-4">
              <Tooltip content="Detail" className={montserrat.className}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  color="primary"
                  as={Link}
                  href={`/admin/karyawan/${karyawan.id}`}
                >
                  <BiDetail size={20} />
                </Button>
              </Tooltip>
              <Tooltip content="Hapus" className={montserrat.className}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  color="danger"
                  onPress={() => {
                    setId(`${karyawan.id}`);
                    deleteKaryawanModal.onOpen();
                  }}
                >
                  <MdDelete size={20} />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [deleteKaryawanModal, setId],
  );

  return (
    <>
      <DataTable
        buttonTopContentLabel="Tambah Karyawan"
        onClickButtonTopContent={addKaryawanModal.onOpen}
        columns={COLUMN_LIST}
        data={dataKaryawan?.data || []}
        totalPages={dataKaryawan?.pagination?.totalPages || 1}
        isLoading={isLoadingKaryawan || isRefetchingKaryawan}
        emptyContent="Data Karyawan Kosong"
        renderCell={renderCell}
        showSearch
        showLimit
        searchLabel="Cari Nama, NIK, atau Email"
      />
      <AddKaryawanModal {...addKaryawanModal} refetch={refetchKaryawan} />
      <DeleteKaryawanModal
        {...deleteKaryawanModal}
        refetch={refetchKaryawan}
        onDelete={handleDeleteKaryawan}
        isSuccess={isSuccessDeleteKaryawan}
        isPending={isPendingDeleteKaryawan}
        setId={setId}
      />
    </>
  );
};

export default Karyawan;
