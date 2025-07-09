import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { montserrat } from "@/pages/_app";
import useDetailCategoryModal from "./useDetailCategoryModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
  id: string;
  setId: (id: string) => void;
}

const DetailCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch, id, setId } = props;
  const {
    control,
    handleSubmit,
    errors,
    reset,
    setValue,

    dataCategory,
    refetchCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  } = useDetailCategoryModal(id);

  useEffect(() => {
    if (dataCategory) {
      setValue("name", dataCategory?.name);
      setValue("description", dataCategory?.description);
    }
  });

  useEffect(() => {
    if (isSuccessUpdateCategory) {
      refetch();
      refetchCategory();
      reset();
    }
  }, [isSuccessUpdateCategory, refetch, refetchCategory, reset]);

  return (
    <Modal
      className={montserrat.className}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
          <ModalHeader>Detail dan Edit Kategori</ModalHeader>
          <ModalBody>
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
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
            </Skeleton>
            <Skeleton
              isLoaded={!!dataCategory?.description}
              className="rounded-lg"
            >
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
            </Skeleton>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                onPress={() => {
                  onClose();
                  setId("");
                  refetch();
                }}
                disabled={isPendingUpdateCategory}
              >
                Kembali
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingUpdateCategory}
                isLoading={isPendingUpdateCategory}
                spinnerPlacement="end"
                spinner={<Spinner color="white" size="sm" />}
              >
                Simpan
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DetailCategoryModal;
