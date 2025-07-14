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
import useSetorSimpananModal from "./useSetorSimpananModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
}

const SetorSimpananModal = (props: PropTypes) => {
  const { id, isOpen, onClose, onOpenChange, refetch } = props;

  const {
    control,
    errors,
    handleSubmit,
    isPendingSetorSimpanan,
    isSuccessSetorSimpanan,
    handleSetorSimpanan,
  } = useSetorSimpananModal(id);

  useEffect(() => {
    if (isSuccessSetorSimpanan) {
      refetch();
      onClose();
    }
  }, [isSuccessSetorSimpanan, onClose, refetch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Setor Simpanan</ModalHeader>
        <form onSubmit={handleSubmit(handleSetorSimpanan)}>
          <ModalBody>
            <Controller
              control={control}
              name='simpanan'
              render={({ field: { onChange, ...field } }) => (
                <NumberInput
                  {...field}
                  errorMessage={errors.simpanan?.message}
                  label='Jumlah setor simpanan'
                  isInvalid={!!errors.simpanan}
                  variant='bordered'
                  startContent='Rp'
                  step={50_000}
                  minValue={50_000}
                  onValueChange={(value) => onChange(value)}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              onPress={onClose}
              isDisabled={isPendingSetorSimpanan}
            >
              Batal
            </Button>
            <Button
              type='submit'
              color='primary'
              isDisabled={isPendingSetorSimpanan}
            >
              {isPendingSetorSimpanan ? (
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

export default SetorSimpananModal;
