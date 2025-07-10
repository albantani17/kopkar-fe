import userServices from "@/service/user.service";
import { ICreateKaryawan } from "@/types/Karyawan";
import { errorResponse } from "@/Utils/error";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const addKaryawanSchema = Yup.object().shape({
  nik: Yup.string().required("NIK wajib diisi"),
  password: Yup.string()
    .min(8, "Minimal 8 Characters")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Password tidak sama",
  ),
  name: Yup.string().required("Name wajib diisi"),
  email: Yup.string().required("Email wajib diisi"),
  phone: Yup.string().required("Phone wajib diisi"),
  role: Yup.string().required("Role wajib diisi"),
});

const useAddKaryawanModal = () => {
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
  } = useForm({ resolver: yupResolver(addKaryawanSchema) });

  const addKaryawan = async (payload: ICreateKaryawan) => {
    const result = await userServices.create(payload);
    return result.data;
  };

  const {
    mutate: mutateAddKaryawan,
    isPending: isPendingAddKaryawan,
    isSuccess: isSuccessAddKaryawan,
  } = useMutation({
    mutationFn: addKaryawan,
    onSuccess: () => {
      reset();
      addToast({
        title: "Success",
        description: "Karyawan Berhasil Ditambahkan",
        color: "success",
      });
    },
    onError: (error) => {
      errorResponse(error);
    },
  });

  const handleAddKaryawan = (payload: ICreateKaryawan) => {
    delete payload.confirmPassword;
    mutateAddKaryawan(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    handleAddKaryawan,
    isPendingAddKaryawan,
    isSuccessAddKaryawan,

    visiblePassword,
    handleVisiblePassword,
  };
};

export default useAddKaryawanModal;
