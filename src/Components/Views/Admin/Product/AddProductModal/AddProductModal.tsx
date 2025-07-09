import {
  Autocomplete,
  AutocompleteItem,
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
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { montserrat } from "@/pages/_app";
import useAddProductModal from "./useAddProductModal";
import InputFile from "@/Components/Ui/InputFile";
import { ICategory } from "@/types/Category";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
}

const AddProductModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch } = props;
  const {
    control,
    handleSubmit,
    errors,
    reset,
    handleAddProduct,
    isPendingAddProduct,
    isSuccessAddProduct,

    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    preview,

    dataCategory,
  } = useAddProductModal();

  useEffect(() => {
    if (isSuccessAddProduct) {
      onClose();
      refetch();
      reset();
    }
  }, [isSuccessAddProduct, onClose, refetch, reset]);

  return (
    <Modal
      className={montserrat.className}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddProduct)}>
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
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  startContent="Rp"
                  type="number"
                  label="Harga"
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="category_id"
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  className={montserrat.className}
                  label="Kategori"
                  variant="bordered"
                  isInvalid={errors.category_id !== undefined}
                  errorMessage={errors.category_id?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Pilih Kategori"
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category.id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  label="Gambar Produk"
                  onUpload={(files) => handleUploadImage(files, onChange)}
                  onDelete={() => handleDeleteImage(onChange)}
                  preview={typeof preview === "string" ? preview : ""}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errors.image !== undefined}
                  errorMessage={errors.image?.message}
                  isDropable
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-2">
              <Button
                color="danger"
                onPress={onClose}
                disabled={isPendingAddProduct}
              >
                Kembali
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingAddProduct}
                isLoading={isPendingAddProduct}
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

export default AddProductModal;
