import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { montserrat } from "@/pages/_app";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch } = props;
  const {
    control,
    handleSubmit,
    errors,
    reset,
    handleAddCategory,
    isPendingAddCategory,
    isSuccessAddCategory,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();
      refetch();
      reset();
    }
  }, [isSuccessAddCategory, onClose, refetch, reset]);

  return (
    <Modal
      className={montserrat.className}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <ModalHeader>Tambah Kategori</ModalHeader>
          <ModalBody>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Nama Kategori"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  variant="bordered"
                  label="Deskripsi"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                onPress={onClose}
                disabled={isPendingAddCategory}
              >
                Kembali
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingAddCategory}
                isLoading={isPendingAddCategory}
                spinnerPlacement="end"
                spinner={<Spinner color="white" size="sm" />}
              >
                Tambah
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
