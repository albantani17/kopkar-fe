import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const addKaryawanSchema = Yup.object().shape({
  nik: Yup.string().required("NIK wajib diisi"),
  name: Yup.string().required("Name wajib diisi"),
  email: Yup.string().required("Email wajib diisi"),
  phone: Yup.string().required("Phone wajib diisi"),
  role: Yup.string().required("Role wajib diisi"),
});

const useDataKaryawanTab = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(addKaryawanSchema) });

  return { control, handleSubmit, errors, reset, setValue };
};

export default useDataKaryawanTab;
