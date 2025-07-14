import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useBayarPinjamanModal from "./useBayarPinjamanModal";

interface PropTypes {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
  maxBayar: number;
}

const BayarPinjamanModal = (props: PropTypes) => {
  const { id, isOpen, onClose, onOpenChange, refetch, maxBayar } = props;

  const {
    control,
    handleSubmit,
    errors,
    isPendingBayarPinjaman,
    isSuccessBayarPinjaman,
    handleBayarPinjaman,
  } = useBayarPinjamanModal(id);

  useEffect(() => {
    if (isSuccessBayarPinjaman) {
      refetch();
      onClose();
    }
  }, [isSuccessBayarPinjaman, onClose, refetch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Bayar Pinjaman</ModalHeader>
        <form onSubmit={handleSubmit(handleBayarPinjaman)}>
          <ModalBody>
            <Controller
              control={control}
              name='pinjaman'
              render={({ field: { onChange, ...field } }) => (
                <NumberInput
                  {...field}
                  errorMessage={errors.pinjaman?.message}
                  label='Jumlah setor pinjaman'
                  isInvalid={!!errors.pinjaman}
                  variant='bordered'
                  startContent='Rp'
                  step={50_000}
                  minValue={50_000}
                  maxValue={maxBayar}
                  onValueChange={(value) => onChange(value)}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              onPress={onClose}
              isDisabled={isPendingBayarPinjaman}
            >
              Batal
            </Button>
            <Button
              type='submit'
              color='primary'
              isDisabled={isPendingBayarPinjaman}
            >
              {isPendingBayarPinjaman ? (
                <Spinner size='sm' color='white' />
              ) : (
                "Setor"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default BayarPinjamanModal;
