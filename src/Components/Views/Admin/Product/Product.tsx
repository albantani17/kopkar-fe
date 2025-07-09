import DataTable from "@/Components/Ui/DataTable";
import { COLUMN_LIST } from "./Product.constant";
import { Key, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { montserrat } from "@/pages/_app";
import useProduct from "./useProduct";
import { IProduct } from "@/types/Product";
import AddProductModal from "./AddProductModal";
import Image from "next/image";
import { convertIDR } from "@/Utils/currency";
import DeleteProductModal from "./DeleteProductModal";

const Product = () => {
  const { push, isReady } = useRouter();
  const {
    dataProduct,
    isLoadingProduct,
    refetchProduct,
    isRefetchingProduct,
    handleDeleteProduct,
    isSuccessDeleteProduct,
    isPendingDeleteProduct,
    setId,
  } = useProduct();

  const { setUrl } = useChangeUrl();

  const addProductModal = useDisclosure();
  const deleteProductModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const renderCell = useCallback(
    (Product: IProduct, columnKey: Key) => {
      const cellValue = Product[columnKey as keyof typeof Product];
      switch (columnKey) {
        case "price":
          return `${convertIDR(Number(cellValue))}`;
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              width={120}
              height={120}
              alt={`${Product.name}`}
            ></Image>
          );
        case "category":
          return `${Product.category?.name}`;
        case "action":
          return (
            <div className="flex gap-4">
              <Tooltip content="Detail" className={montserrat.className}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  color="primary"
                  onPress={() => push(`/admin/produk/${Product.id}`)}
                >
                  <BiDetail size={20} />
                </Button>
              </Tooltip>
              <Tooltip content="Hapus" className={montserrat.className}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  color="danger"
                  onPress={() => {
                    setId(`${Product.id}`);
                    deleteProductModal.onOpen();
                  }}
                >
                  <MdDelete size={20} />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [push, deleteProductModal, setId],
  );

  return (
    <>
      <DataTable
        buttonTopContentLabel="Tambah Produk"
        onClickButtonTopContent={addProductModal.onOpen}
        columns={COLUMN_LIST}
        data={dataProduct?.data || []}
        totalPages={dataProduct?.pagination?.totalPages || 1}
        isLoading={isLoadingProduct || isRefetchingProduct}
        emptyContent="Data Produk Kosong"
        renderCell={renderCell}
        showSearch
        showLimit
        searchLabel="Cari Nama Produk"
      />
      <AddProductModal {...addProductModal} refetch={refetchProduct} />
      <DeleteProductModal
        {...deleteProductModal}
        refetch={refetchProduct}
        onDelete={handleDeleteProduct}
        isPending={isPendingDeleteProduct}
        isSuccess={isSuccessDeleteProduct}
        setId={setId}
      />
    </>
  );
};

export default Product;
