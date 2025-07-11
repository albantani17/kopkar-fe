import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Pengajuan from "@/components/Views/Admin/Pengajuan";

const PengajuanPage = () => {
  return (
    <DashboardLayout
      title='Pengajuan'
      description='Lihat dan administrasi pengajuan'
    >
      <Pengajuan />
    </DashboardLayout>
  );
};

export default PengajuanPage;
