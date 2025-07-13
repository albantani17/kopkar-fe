import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from "@heroui/react";
import useDetailPengajuanModal from "./useDetailPengajuanModal";
import { useEffect } from "react";
import { convertIDR } from "@/Utils/currency";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  id: string;
}

const DetailPengajuanModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, id } = props;

  const { control, setValue, dataDetailPengajuan } =
    useDetailPengajuanModal(id);

  useEffect(() => {
    if (dataDetailPengajuan) {
      setValue("name", `${dataDetailPengajuan?.user?.name}`);
      setValue("phone", `${dataDetailPengajuan?.user?.phone}`);
      setValue("jenisPengajuan", `${dataDetailPengajuan?.jenisPengajuan}`);
      setValue("jumlah", convertIDR(Number(dataDetailPengajuan?.jumlah)));
      setValue(
        "noRekening",
        `${
          dataDetailPengajuan?.noRekening ? dataDetailPengajuan.noRekening : "-"
        }`
      );
      setValue("alasan", `${dataDetailPengajuan?.alasan}`);
    }
  }, [dataDetailPengajuan, setValue]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Detail Pengajuan</ModalHeader>
        <ModalBody>
          <Skeleton
            isLoaded={!!dataDetailPengajuan?.user?.name}
            className='rounded-lg'
          >
            <Controller
              control={control}
              name='name'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Nama'
                  disabled
                  variant='bordered'
                  labelPlacement='outside'
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataDetailPengajuan?.user?.phone}
            className='rounded-lg'
          >
            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <Input
                  {...field}
                  label='No HP'
                  disabled
                  variant='bordered'
                  labelPlacement='outside'
                />
              )}
            />
          </Skeleton>
          <Skeleton
            className='rounded-lg'
            isLoaded={!!dataDetailPengajuan?.jenisPengajuan}
          >
            <Controller
              control={control}
              name='jenisPengajuan'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Jenis Pengajuan'
                  disabled
                  variant='bordered'
                  labelPlacement='outside'
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataDetailPengajuan?.jumlah}
            className='rounded-lg'
          >
            <Controller
              control={control}
              name='jumlah'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Jumlah'
                  disabled
                  variant='bordered'
                  labelPlacement='outside'
                />
              )}
            />
          </Skeleton>
          <Skeleton
            className='rounded-lg'
            isLoaded={!!dataDetailPengajuan}
          >
            <Controller
              control={control}
              name='noRekening'
              render={({ field }) => (
                <Input
                  {...field}
                  label='No Rekening'
                  disabled
                  variant='bordered'
                  labelPlacement='outside'
                />
              )}
            />
          </Skeleton>
          <Skeleton
            className='rounded-lg'
            isLoaded={!!dataDetailPengajuan?.alasan}
          >
            <Controller
              control={control}
              name='alasan'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Alasan'
                  disabled
                  variant='bordered'
                  labelPlacement='outside'
                />
              )}
            />
          </Skeleton>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onPress={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailPengajuanModal;
