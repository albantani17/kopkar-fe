import DataTable from "@/components/Ui/DataTable";
import { COLUMN_LIST } from "./Category.constant";
import { Key, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { montserrat } from "@/pages/_app";
import useCategory from "./useCategory";
import { ICategory } from "@/types/Category";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import DetailCategoryModal from "./DetailCategoryModal";

const Category = () => {
  const { isReady } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    refetchCategory,
    isRefetchingCategory,
    handleDeleteCategory,
    isSuccessDeleteCategory,
    isPendingDeleteCategory,
    setId,
    id,
  } = useCategory();

  const { setUrl } = useChangeUrl();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const detailCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady, setUrl]);

  const renderCell = useCallback(
    (category: ICategory, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "action":
          return (
            <div className="flex gap-4">
              <Tooltip content="Detail" className={montserrat.className}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  color="primary"
                  onPress={() => {
                    setId(`${category.id}`);
                    detailCategoryModal.onOpen();
                  }}
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
                    setId(`${category.id}`);
                    deleteCategoryModal.onOpen();
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
    [deleteCategoryModal, detailCategoryModal, setId],
  );

  return (
    <>
      <DataTable
        buttonTopContentLabel="Tambah Category"
        onClickButtonTopContent={addCategoryModal.onOpen}
        columns={COLUMN_LIST}
        data={dataCategory?.data || []}
        totalPages={dataCategory?.pagination?.totalPages || 1}
        isLoading={isLoadingCategory || isRefetchingCategory}
        emptyContent="Data Category Kosong"
        renderCell={renderCell}
        showSearch
        showLimit
        searchLabel="Cari Nama Kategori"
      />
      <AddCategoryModal {...addCategoryModal} refetch={refetchCategory} />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        refetch={refetchCategory}
        onDelete={handleDeleteCategory}
        isSuccess={isSuccessDeleteCategory}
        isPending={isPendingDeleteCategory}
        setId={setId}
      />
      <DetailCategoryModal
        {...detailCategoryModal}
        refetch={refetchCategory}
        setId={setId}
        id={id}
      />
    </>
  );
};

export default Category;
