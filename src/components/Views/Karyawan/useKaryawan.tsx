import authServices from "@/service/auth.service";
import configurationService from "@/service/configuration.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  nik: Yup.string().required("NIK wajib diisi"),
  name: Yup.string().required("Name wajib diisi"),
  email: Yup.string().required("Email wajib diisi"),
  phone: Yup.string().required("Phone wajib diisi"),
  role: Yup.string().required("Role wajib diisi"),
  simpanan: Yup.string().required("Simpanan wajib diisi"),
  pinjaman: Yup.string().required("Pinjaman wajib diisi"),
});

const useKaryawan = () => {
  const { control, setValue } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const getProfile = async () => {
    const result = await authServices.getProfile();
    return result.data.data;
  };

  const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const getConfig = async () => {
    const result = await configurationService.findAll();
    return result.data.data;
  };

  const { data: dataConfig } = useQuery({
    queryKey: ["config"],
    queryFn: getConfig,
  });

  return {
    control,
    setValue,
    dataProfile,
    isLoadingProfile,

    dataConfig,
  };
};

export default useKaryawan;
