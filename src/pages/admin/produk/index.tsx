import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import Product from "@/Components/Views/Admin/Product";

const ProductPage = () => {
  return (
    <DashboardLayout title="Produk" description="Manajemen Produk">
      <Product />
    </DashboardLayout>
  );
};

export default ProductPage;
