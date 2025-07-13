import DataTable from "@/components/Ui/DataTable";
import { COLUMN_LIST } from "./Karyawan.constant";
import useKaryawan from "./useKaryawan";
import { Key, useCallback, useEffect } from "react";
import { IKaryawan } from "@/types/Karyawan";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { BiDetail } from "react-icons/bi";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import AddKaryawanModal from "./AddKaryawanModal";
import DeleteKaryawanModal from "./DeleteKaryawanModal";
import Link from "next/link";
import { convertIDR } from "@/Utils/currency";

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
          return `${convertIDR(Number(cellValue))}`;
        case "pinjaman":
          return `${convertIDR(Number(cellValue))}`;
        case "action":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button variant='flat' radius='full' isIconOnly color='primary'>
                  <MdOutlineArrowDropDownCircle size={25} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Dropdown menu'>
                <DropdownItem key={"detail"}>
                  <Button
                    fullWidth
                    variant='light'
                    startContent={<BiDetail size={20} />}
                    as={Link}
                    href={`/admin/karyawan/${karyawan.id}`}
                  >
                    Detail
                  </Button>
                </DropdownItem>
                <DropdownItem key={"delete"}>
                  <Button
                    variant='light'
                    fullWidth
                    color='danger'
                    startContent={<MdDelete size={20} />}
                    onPress={() => {
                      setId(`${karyawan.id}`);
                      deleteKaryawanModal.onOpen();
                    }}
                  >
                    Hapus
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [deleteKaryawanModal, setId]
  );

  return (
    <>
      <DataTable
        buttonTopContentLabel='Tambah Karyawan'
        onClickButtonTopContent={addKaryawanModal.onOpen}
        columns={COLUMN_LIST}
        data={dataKaryawan?.data || []}
        totalPages={dataKaryawan?.pagination?.totalPages || 1}
        isLoading={isLoadingKaryawan || isRefetchingKaryawan}
        emptyContent='Data Karyawan Kosong'
        renderCell={renderCell}
        showSearch
        showLimit
        searchLabel='Cari Nama, NIK, atau Email'
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
