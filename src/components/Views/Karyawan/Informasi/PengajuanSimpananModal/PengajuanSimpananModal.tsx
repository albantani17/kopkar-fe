import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import usePegnajuanSimpananModal from "./usePengajuanSimpananModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
}

const PengajuanSimpananModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch } = props;
  const {
    control,
    handleSubmit,
    errors,
    reset,
    handleCreatePengajuan,
    isPendingCreatePengajuan,
    isSuccessCreatePengajuan,
  } = usePegnajuanSimpananModal();

  useEffect(() => {
    if (isSuccessCreatePengajuan) {
      onClose();
      reset();
      refetch();
    }
  }, [isSuccessCreatePengajuan, onClose, refetch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        <ModalHeader>Pengajuan Penarikan Simpanan</ModalHeader>
        <form onSubmit={handleSubmit(handleCreatePengajuan)}>
          <ModalBody>
            <Controller
              control={control}
              name='jumlah'
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  step={100}
                  label='Jumlah Penarikan'
                  errorMessage={errors.jumlah?.message}
                  isInvalid={!!errors.jumlah}
                  startContent='Rp'
                  labelPlacement='outside'
                  variant='underlined'
                />
              )}
            />
            <Controller
              control={control}
              name='noRekening'
              render={({ field }) => (
                <Input
                  label='No Rekening'
                  {...field}
                  errorMessage={errors.noRekening?.message}
                  isInvalid={!!errors.noRekening}
                  labelPlacement='outside'
                  variant='underlined'
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={onClose}
              disabled={isPendingCreatePengajuan}
              color='danger'
            >
              Batal
            </Button>
            <Button
              type='submit'
              disabled={isPendingCreatePengajuan}
              color='primary'
            >
              {isPendingCreatePengajuan ? (
                <Spinner size='sm' color='white' />
              ) : (
                "Simpan"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PengajuanSimpananModal;
