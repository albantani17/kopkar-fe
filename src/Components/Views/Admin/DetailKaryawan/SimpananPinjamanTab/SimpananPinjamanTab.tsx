import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useSimpananPinjaman from "./useSimpananPinjaman";
import { IKaryawan, IUpdateKaryawan } from "@/types/Karyawan";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface PropTypes {
  dataKaryawan: IKaryawan;
  handleUpdateKaryawan: (payload: IUpdateKaryawan) => void;
  isPendingUpdateKaryawan: boolean;
  isSuccessUpdateKaryawan: boolean;
}

const SimpananPinjamanTab = (props: PropTypes) => {
  const router = useRouter();
  const { dataKaryawan, handleUpdateKaryawan, isPendingUpdateKaryawan } = props;
  const { control, handleSubmit, errors, reset } = useSimpananPinjaman();

  useEffect(() => {
    if (dataKaryawan) {
      reset({
        simpanan: `${dataKaryawan.simpanan}`,
        pinjaman: `${dataKaryawan.pinjaman}`,
      });
    }
  }, [dataKaryawan, reset]);

  return (
    <Card className="w-full lg:w-1/2">
      <form onSubmit={handleSubmit(handleUpdateKaryawan)}>
        <CardBody className="flex flex-col gap-4">
          <Skeleton isLoaded={!!dataKaryawan?.simpanan} className="rounded-lg">
            <Controller
              control={control}
              name="simpanan"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Simpanan"
                  variant="bordered"
                  startContent="Rp"
                  errorMessage={errors.simpanan?.message}
                  isInvalid={!!errors.simpanan}
                  description="Tanpa pemisah ribuah, gunakan titik (.) untuk pecahan desimal"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataKaryawan?.pinjaman} className="rounded-lg">
            <Controller
              control={control}
              name="pinjaman"
              render={({ field }) => (
                <Input
                  {...field}
                  label="pinjaman"
                  startContent="Rp"
                  variant="bordered"
                  errorMessage={errors.pinjaman?.message}
                  isInvalid={!!errors.pinjaman}
                  description="Tanpa pemisah ribuah, gunakan titik (.) untuk pecahan desimal"
                />
              )}
            />
          </Skeleton>
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

export default SimpananPinjamanTab;
