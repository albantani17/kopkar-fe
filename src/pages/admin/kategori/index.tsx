import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import Category from "@/Components/Views/Admin/Category";

const CategoryPage = () => {
  return (
    <DashboardLayout title="Kategori" description="Manajemen Kategori Produk">
      <Category />
    </DashboardLayout>
  );
};

export default CategoryPage;
