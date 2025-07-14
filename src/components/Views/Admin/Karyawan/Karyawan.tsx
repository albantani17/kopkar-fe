import DataTable from "@/components/Ui/DataTable";
import { PiMoney } from "react-icons/pi";
import { COLUMN_LIST } from "./Karyawan.constant";
import useKaryawan from "./useKaryawan";
import { Key, useCallback, useEffect, useState } from "react";
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
import SetorSimpananModal from "./SetorSimpananModal";
import BayarPinjamanModal from "./BayarPinjamanModal";

const Karyawan = () => {
  const [maxBayarPinjaman, setMaxBayarPinjaman] = useState(0);
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
    id,
  } = useKaryawan();

  const { setUrl } = useChangeUrl();

  const addKaryawanModal = useDisclosure();
  const deleteKaryawanModal = useDisclosure();
  const setorSimpananModal = useDisclosure();
  const bayarPinjamanModal = useDisclosure();

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
                    startContent={<BiDetail size={20} />}
                    variant='light'
                    as={Link}
                    href={`/admin/karyawan/${karyawan.id}`}
                    className='flex justify-start'
                  >
                    Detail
                  </Button>
                </DropdownItem>
                <DropdownItem key={"setor-simpanan"}>
                  <Button
                    fullWidth
                    startContent={<PiMoney size={20} />}
                    variant='light'
                    className='flex justify-start'
                    onPress={() => {
                      setId(`${karyawan.id}`);
                      setorSimpananModal.onOpen();
                    }}
                  >
                    Setor Simpanan
                  </Button>
                </DropdownItem>
                <DropdownItem key={"bayar-pinjaman"}>
                  <Button
                    fullWidth
                    startContent={<PiMoney size={20} />}
                    variant='light'
                    className='flex justify-start'
                    onPress={() => {
                      setId(`${karyawan.id}`);
                      setMaxBayarPinjaman(Number(karyawan.pinjaman));
                      bayarPinjamanModal.onOpen();
                    }}
                  >
                    Bayar Pinjaman
                  </Button>
                </DropdownItem>
                <DropdownItem key={"delete"}>
                  <Button
                    variant='light'
                    startContent={<MdDelete size={20} />}
                    fullWidth
                    color='danger'
                    className='flex justify-start'
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
      <SetorSimpananModal
        {...setorSimpananModal}
        refetch={refetchKaryawan}
        id={id}
      />
      <BayarPinjamanModal
        {...bayarPinjamanModal}
        refetch={refetchKaryawan}
        id={id}
        maxBayar={maxBayarPinjaman}
      />
    </>
  );
};

export default Karyawan;
