import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Category from "@/components/Views/Admin/Category";

const CategoryPage = () => {
  return (
    <DashboardLayout title="Kategori" description="Manajemen Kategori Produk">
      <Category />
    </DashboardLayout>
  );
};

export default CategoryPage;
