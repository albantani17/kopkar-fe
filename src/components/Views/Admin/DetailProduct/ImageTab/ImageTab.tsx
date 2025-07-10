import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import InputFile from "@/Components/Ui/InputFile";
import { IUpdateProduct } from "@/types/Product";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IUpdateProduct) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    resetUpdateImage,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate, resetUpdateImage]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Gambar Produk</h1>
        <p className="w-full text-small text-default-400">
          Upload gambar produk disini
        </p>
      </CardHeader>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmitUpdateImage(onUpdate)}
      >
        <CardBody>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>
            <Skeleton
              isLoaded={!!currentImage}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentImage}
                alt="Image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="!relative rounded-lg"
              />
            </Skeleton>
          </div>
          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteImage(onChange)}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateImage.image !== undefined}
                errorMessage={errorsUpdateImage.image?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload Gambar Produk
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ImageTab;
