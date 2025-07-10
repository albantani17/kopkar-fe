import DashboardLayout from "@/components/Layouts/DashboardLayout";
import DetailProduct from "@/components/Views/Admin/DetailProduct";

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
