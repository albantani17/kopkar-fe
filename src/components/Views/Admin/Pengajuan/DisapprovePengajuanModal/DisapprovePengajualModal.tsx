import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import useDisapprovePengajuanModal from "./useDisapprovePengajuanModal";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
  id: string;
  setId: (id: string) => void;
}

const DisapprovePengajuanModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch, setId, id } = props;

  const {
    isPendingUpdatePengajuan,
    handleDisapprovePengajuan,
    isSuccessUpdatePengajuan,
    control,
    handleSubmit,
    reset,
    errors,
  } = useDisapprovePengajuanModal();

  useEffect(() => {
    if (isSuccessUpdatePengajuan) {
      onClose();
      refetch();
      reset();
      setId("");
    }
  }, [isSuccessUpdatePengajuan, onClose, refetch]);

  return (
    <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Tolak Pengajuan</ModalHeader>
        <form
          onSubmit={handleSubmit(({ alasanDitolak }) =>
            handleDisapprovePengajuan(id, alasanDitolak)
          )}
        >
          <ModalBody>
            <p>Apakah anda yakin ingin menolak pengajuan ini?</p>
            <Controller
              control={control}
              name='alasanDitolak'
              render={({ field }) => (
                <Textarea
                  {...field}
                  label='Alasan ditolak'
                  errorMessage={errors.alasanDitolak?.message}
                  isInvalid={!!errors.alasanDitolak}
                  minRows={5}
                  variant='faded'
                  isDisabled={isPendingUpdatePengajuan}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              onPress={onClose}
              isDisabled={isPendingUpdatePengajuan}
            >
              Batal
            </Button>
            <Button
              color='primary'
              type='submit'
              isDisabled={isPendingUpdatePengajuan}
            >
              {isPendingUpdatePengajuan ? <Spinner size='sm' /> : "Tolak"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DisapprovePengajuanModal;
