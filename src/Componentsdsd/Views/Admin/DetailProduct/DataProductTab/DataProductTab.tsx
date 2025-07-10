import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useDataProductTab from "./useDataProductTab";
import { Controller } from "react-hook-form";
import { montserrat } from "@/pages/_app";
import { IProduct, IUpdateProduct } from "@/types/Product";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ICategory } from "@/types/Category";

interface PropTypes {
  dataProduct: IProduct;
  handleUpdateProduct: (payload: IUpdateProduct) => void;
  isPendingUpdateProduct: boolean;
  isSuccessUpdateProduct: boolean;
  isFetchedProduct: boolean;
}

const DataProductTab = (props: PropTypes) => {
  const router = useRouter();
  const {
    dataProduct,
    handleUpdateProduct,
    isPendingUpdateProduct,
    isFetchedProduct,
  } = props;

  const { control, handleSubmit, errors, reset, dataCategory } =
    useDataProductTab();

  useEffect(() => {
    if (dataProduct && isFetchedProduct) {
      reset({
        name: `${dataProduct.name}`,
        description: `${dataProduct.description}`,
        price: `${dataProduct.price}`,
        category_id: `${dataProduct?.category?.id}`,
      });
    }
  }, [dataProduct, isFetchedProduct, reset]);

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Produk</h1>
        <p className="w-full text-small text-default-400">
          Manage informasi produk
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit(handleUpdateProduct)}>
        <CardBody>
          <div className="flex flex-col gap-6 p-4">
            <Skeleton className="rounded-lg" isLoaded={!!dataProduct?.name}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    labelPlacement="outside"
                    label="Nama Produk"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              className="rounded-lg"
              isLoaded={!!dataProduct?.description}
            >
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    variant="bordered"
                    labelPlacement="outside"
                    label="Deskripsi"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton className="rounded-lg" isLoaded={!!dataProduct?.price}>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    labelPlacement="outside"
                    startContent="Rp"
                    label="Harga"
                    type="number"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataProduct?.category}>
              {dataProduct?.category && (
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      className={montserrat.className}
                      defaultSelectedKey={dataProduct?.category?.id}
                      label="Kategori"
                      variant="bordered"
                      labelPlacement="outside"
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
              )}
            </Skeleton>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button
            color="danger"
            onPress={() => router.back()}
            disabled={isPendingUpdateProduct}
          >
            Kembali
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isPendingUpdateProduct}
          >
            {isPendingUpdateProduct ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Simpan"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DataProductTab;
