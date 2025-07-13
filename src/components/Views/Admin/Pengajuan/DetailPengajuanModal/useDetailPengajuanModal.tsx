import pengajuanService from "@/service/pengajuan.service";
import { IPengajuan } from "@/types/Pengajuan";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  name: Yup.string().required("Name wajib diisi"),
  phone: Yup.string().required("Phone wajib diisi"),
  jenisPengajuan: Yup.string().required("Jenis Pengajuan wajib diisi"),
  jumlah: Yup.string().required("Jumlah wajib diisi"),
  noRekening: Yup.string().required("No Rekening wajib diisi"),
  alasan: Yup.string().required("Alasan wajib diisi"),
});

const useDetailPengajuanModal = (id: string) => {
  const { control, setValue } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const getDetailPengajuan: () => Promise<IPengajuan> = async () => {
    const result = await pengajuanService.findOne(id);
    return result.data.data;
  };

  const { data: dataDetailPengajuan, isLoading } = useQuery({
    queryKey: ["detailPengajuan", id],
    queryFn: getDetailPengajuan,
    enabled: !!id,
  });

  return { control, setValue, dataDetailPengajuan, isLoading };
};

export default useDetailPengajuanModal;
