import { Tab, Tabs } from "@heroui/react";
import useDetailProduct from "./useDetailProduct";
import DataProductTab from "./DataProductTab/DataProductTab";
import { IProduct } from "@/types/Product";
import ImageTab from "./ImageTab";

const DetailProduct = () => {
  const {
    dataProduct,
    handleUpdateProduct,
    handleUpdateImage,
    isPendingUpdateProduct,
    isSuccessUpdateProduct,
    isFetchedProduct,
  } = useDetailProduct();

  return (
    <Tabs color="primary" aria-label="Options">
      <Tab title="Gambar Produk">
        <ImageTab
          currentImage={dataProduct?.image as string}
          onUpdate={handleUpdateImage}
          isPendingUpdate={isPendingUpdateProduct}
          isSuccessUpdate={isSuccessUpdateProduct}
        />
      </Tab>
      <Tab title="Data Produk">
        <DataProductTab
          isFetchedProduct={isFetchedProduct}
          dataProduct={dataProduct as IProduct}
          handleUpdateProduct={handleUpdateProduct}
          isPendingUpdateProduct={isPendingUpdateProduct}
          isSuccessUpdateProduct={isSuccessUpdateProduct}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailProduct;
