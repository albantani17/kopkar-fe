import { ILogin } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";

const loginSchema = Yup.object().shape({
  nik: Yup.string().required("NIK wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const login = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result?.status == 401) {
      throw new Error(result?.error);
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      reset();
      addToast({
        title: "Success",
        description: "Login Berhasil",
        color: "success",
      });
      router.push(callbackUrl);
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "NIK atau Password Salah",
        color: "danger",
      });
    },
  });

  const handleLogin = (payload: ILogin) => mutateLogin(payload);

  return {
    control,
    handleSubmit,
    errors,
    toggleVisibility,
    isVisible,
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
