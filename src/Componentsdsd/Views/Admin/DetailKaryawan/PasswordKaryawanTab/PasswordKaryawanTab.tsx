import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useSimpananPinjaman from "./usePasswordKaryawan";
import { IUpdateKaryawan } from "@/types/Karyawan";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";

interface PropTypes {
  handleUpdateKaryawan: (payload: IUpdateKaryawan) => void;
  isPendingUpdateKaryawan: boolean;
  isSuccessUpdateKaryawan: boolean;
}

const PasswordKaryawanTab = (props: PropTypes) => {
  const router = useRouter();
  const {
    handleUpdateKaryawan,
    isPendingUpdateKaryawan,
    isSuccessUpdateKaryawan,
  } = props;
  const {
    control,
    handleSubmit,
    errors,
    reset,
    handleVisiblePassword,
    visiblePassword,
  } = useSimpananPinjaman();

  useEffect(() => {
    if (isSuccessUpdateKaryawan) {
      reset();
    }
  }, [isSuccessUpdateKaryawan, reset]);

  return (
    <Card className="w-full lg:w-1/2">
      <form onSubmit={handleSubmit(handleUpdateKaryawan)}>
        <CardBody className="flex flex-col gap-4">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                type={visiblePassword.password ? "text" : "password"}
                label="Password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                endContent={
                  <button
                    type="button"
                    className="text-sm text-default-400"
                    onClick={() => handleVisiblePassword("password")}
                  >
                    {visiblePassword.password ? (
                      <FaEye size={20} />
                    ) : (
                      <FiEyeOff size={20} />
                    )}
                  </button>
                }
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                variant="bordered"
                type={visiblePassword.confirmPassword ? "text" : "password"}
                label="Konfirmasi Password"
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
                endContent={
                  <button
                    type="button"
                    className="text-sm text-default-400"
                    onClick={() => handleVisiblePassword("confirmPassword")}
                  >
                    {visiblePassword.confirmPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FiEyeOff size={20} />
                    )}
                  </button>
                }
              />
            )}
          />
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button
            color="danger"
            onPress={() => router.back()}
            disabled={isPendingUpdateKaryawan}
          >
            Kembali
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isPendingUpdateKaryawan}
          >
            {isPendingUpdateKaryawan ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Simpan"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PasswordKaryawanTab;
