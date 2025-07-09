import { Tab, Tabs } from "@heroui/react";
import DataKaryawanTab from "./DataKaryawanTab";
import useDetailKaryawan from "./useDetailKaryawan";
import { IKaryawan } from "@/types/Karyawan";
import SimpananPinjamanTab from "./SimpananPinjamanTab";
import PasswordKaryawanTab from "./PasswordKaryawanTab";

const DetailKaryawan = () => {
  const {
    dataKaryawan,
    handleUpdateKaryawan,
    isPendingUpdateKaryawan,
    isSuccessUpdateKaryawan,
  } = useDetailKaryawan();
  return (
    <Tabs color="primary" aria-label="Options">
      <Tab title="Data Karyawan">
        <DataKaryawanTab
          dataKaryawan={dataKaryawan as IKaryawan}
          handleUpdateKaryawan={handleUpdateKaryawan}
          isPendingUpdateKaryawan={isPendingUpdateKaryawan}
          isSuccessUpdateKaryawan={isSuccessUpdateKaryawan}
        />
      </Tab>
      <Tab title="Simpanan dan Pinjaman">
        <SimpananPinjamanTab
          dataKaryawan={dataKaryawan as IKaryawan}
          handleUpdateKaryawan={handleUpdateKaryawan}
          isPendingUpdateKaryawan={isPendingUpdateKaryawan}
          isSuccessUpdateKaryawan={isSuccessUpdateKaryawan}
        />
      </Tab>
      <Tab title="Ubah Password">
        <PasswordKaryawanTab
          handleUpdateKaryawan={handleUpdateKaryawan}
          isPendingUpdateKaryawan={isPendingUpdateKaryawan}
          isSuccessUpdateKaryawan={isSuccessUpdateKaryawan}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailKaryawan;
