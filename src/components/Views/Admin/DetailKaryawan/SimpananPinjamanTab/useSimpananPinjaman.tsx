import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const simpananPinjamanSchema = Yup.object().shape({
  simpanan: Yup.string().required("Simpanan wajib diisi"),
  pinjaman: Yup.string().required("Pinjaman wajib diisi"),
});

const useSimpananPinjaman = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(simpananPinjamanSchema) });

  return { control, handleSubmit, errors, reset, setValue };
};

export default useSimpananPinjaman;
