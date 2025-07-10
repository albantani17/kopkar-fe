import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useDataKaryawanTab from "./useDataKaryawanTab";
import { Controller } from "react-hook-form";
import { ROLE } from "@/constants/role.constants";
import { montserrat } from "@/pages/_app";
import { IKaryawan, IUpdateKaryawan } from "@/types/Karyawan";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PropTypes {
  dataKaryawan: IKaryawan;
  handleUpdateKaryawan: (payload: IUpdateKaryawan) => void;
  isPendingUpdateKaryawan: boolean;
  isSuccessUpdateKaryawan: boolean;
}

const DataKaryawanTab = (props: PropTypes) => {
  const router = useRouter();
  const { dataKaryawan, handleUpdateKaryawan, isPendingUpdateKaryawan } = props;

  const { control, handleSubmit, errors, reset } = useDataKaryawanTab();

  useEffect(() => {
    if (dataKaryawan) {
      reset({
        nik: dataKaryawan.nik,
        name: dataKaryawan.name,
        role: dataKaryawan.role,
        email: dataKaryawan.email,
        phone: dataKaryawan.phone,
      });
    }
  }, [dataKaryawan, reset]);

  return (
    <Card className="w-full lg:w-1/2">
      <form onSubmit={handleSubmit(handleUpdateKaryawan)}>
        <CardBody>
          <div className="flex justify-center items-center my-10">
            <Avatar size="lg" className="w-28 h-28" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton isLoaded={!!dataKaryawan?.nik} className="rounded-lg">
              <Controller
                control={control}
                name="nik"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="NIK"
                    autoFocus
                    errorMessage={errors.nik?.message}
                    isInvalid={!!errors.nik}
                  />
                )}
              />
            </Skeleton>
            <Skeleton className="rounded-lg" isLoaded={!!dataKaryawan?.name}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Nama Lengkap"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataKaryawan?.role} className="rounded-lg">
              {dataKaryawan?.role && (
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="bordered"
                      label="Role"
                      disallowEmptySelection
                      items={[
                        { label: "Admin", value: ROLE.ADMIN },
                        { label: "Karyawan", value: ROLE.KARYAWAN },
                      ]}
                      defaultSelectedKeys={[`${dataKaryawan?.role}`]}
                    >
                      {(item) => (
                        <SelectItem
                          className={montserrat.className}
                          key={item.value}
                          aria-labelledby="role"
                        >
                          {item.label}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
              )}
            </Skeleton>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  variant="bordered"
                  label="Email"
                  type="email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  label="No. HP"
                  variant="bordered"
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
          </div>
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

export default DataKaryawanTab;
