import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import Karyawan from "@/Components/Views/Admin/Karyawan";

const KaryawanPage = () => {
  return (
    <DashboardLayout title="Karyawan" description="Manajemen Karyawan">
      <Karyawan />
    </DashboardLayout>
  );
};

export default KaryawanPage;
