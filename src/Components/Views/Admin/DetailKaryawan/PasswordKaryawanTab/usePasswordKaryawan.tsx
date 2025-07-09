import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password wajib diisi")
    .min(8, "Minimal 8 Characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Password tidak sama",
  ),
});

const usePasswordKaryawan = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(PasswordSchema) });

  return {
    control,
    handleSubmit,
    errors,
    reset,
    handleVisiblePassword,
    visiblePassword,
  };
};

export default usePasswordKaryawan;
