import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Karyawan from "@/components/Views/Admin/Karyawan";

const KaryawanPage = () => {
  return (
    <DashboardLayout title="Karyawan" description="Manajemen Karyawan">
      <Karyawan />
    </DashboardLayout>
  );
};

export default KaryawanPage;
