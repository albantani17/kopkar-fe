import DashboardLayout from "@/components/Layouts/DashboardLayout";
import DetailKaryawan from "@/components/Views/Admin/DetailKaryawan";

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
