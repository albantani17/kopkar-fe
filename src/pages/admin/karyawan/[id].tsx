import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import DetailKaryawan from "@/Components/Views/Admin/DetailKaryawan";

const DetailKaryawanPage = () => {
  return (
    <DashboardLayout
      title="Detail Karyawan"
      description="Manage informasi karyawan."
    >
      <DetailKaryawan></DetailKaryawan>
    </DashboardLayout>
  );
};

export default DetailKaryawanPage;
