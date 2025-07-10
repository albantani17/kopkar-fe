import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Product from "@/components/Views/Admin/Product";

const ProductPage = () => {
  return (
    <DashboardLayout title="Produk" description="Manajemen Produk">
      <Product />
    </DashboardLayout>
  );
};

export default ProductPage;
