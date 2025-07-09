import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import DetailProduct from "@/Components/Views/Admin/DetailProduct";

const DetailProductPage = () => {
  return (
    <DashboardLayout
      title="Detail Produk"
      description="Manage informasi produk."
    >
      <DetailProduct />
    </DashboardLayout>
  );
};

export default DetailProductPage;
