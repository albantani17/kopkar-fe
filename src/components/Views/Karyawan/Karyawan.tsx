import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import useKaryawan from "./useKaryawan";
import { useEffect } from "react";
import { convertIDR } from "@/Utils/currency";
import Link from "next/link";

const Karyawan = () => {
  const { dataProfile, control, setValue, dataConfig } = useKaryawan();

  useEffect(() => {
    if (dataProfile) {
      setValue("nik", dataProfile.nik);
      setValue("name", dataProfile.name);
      setValue("email", dataProfile.email);
      setValue("phone", dataProfile.phone);
      setValue("role", dataProfile.role);
      setValue("simpanan", convertIDR(Number(dataProfile.simpanan)));
      setValue("pinjaman", convertIDR(Number(dataProfile.pinjaman)));
    }
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <Navbar>
        <NavbarContent justify="start">
          <NavbarItem>
            <NavbarBrand className="gap-2">
              <Image
                src={"/image/Koperasi.jpeg"}
                alt="logo"
                width={60}
                height={60}
              />
              <h1 className="text-2xl font-bold">KOPKAR</h1>
            </NavbarBrand>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="ghost" onPress={() => signOut()}>
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="my-8 flex flex-col lg:flex-row gap-4">
        <Card className="pb-4">
          <CardBody>
            <div className="py-4 px-24">
              <Avatar size="lg" className="w-24 h-24" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton isLoaded={!!dataProfile?.nik} className="rounded-lg">
                <Controller
                  control={control}
                  name="nik"
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="underlined"
                      label="NIK"
                      disabled
                      autoFocus
                    />
                  )}
                />
              </Skeleton>
              <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.name}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled
                      variant="underlined"
                      label="Nama Lengkap"
                    />
                  )}
                />
              </Skeleton>
              <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.email}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="underlined"
                      label="Email"
                      disabled
                      type="email"
                    />
                  )}
                />
              </Skeleton>
              <Skeleton className="rounded-lg" isLoaded={!!dataProfile?.phone}>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="No. HP"
                      variant="underlined"
                      disabled
                    />
                  )}
                />
              </Skeleton>
              <Skeleton
                isLoaded={!!dataProfile?.simpanan}
                className="rounded-lg"
              >
                <Controller
                  control={control}
                  name="simpanan"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Jumlah simpanan"
                      variant="underlined"
                      disabled
                    />
                  )}
                />
              </Skeleton>
              <Skeleton
                isLoaded={!!dataProfile?.pinjaman}
                className="rounded-lg"
              >
                <Controller
                  control={control}
                  name="pinjaman"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Jumlah uang yang di pinjam"
                      variant="underlined"
                      disabled
                    />
                  )}
                />
              </Skeleton>
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col gap-4">
          <Skeleton
            isLoaded={!!dataConfig?.simpanan_pdf}
            className="rounded-lg"
          >
            <Card className="px-4 py-6">
              <CardHeader>Ajukan Pinjaman</CardHeader>
              <CardBody>
                {dataConfig?.pinjaman_pdf && (
                  <Link
                    className="hover:text-primary"
                    href={dataConfig?.pinjaman_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download form pinjaman disini
                  </Link>
                )}
              </CardBody>
            </Card>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataConfig?.simpanan_pdf}
            className="rounded-lg"
          >
            <Card className="px-4 py-6">
              <CardHeader>Ajukan Simpanan</CardHeader>
              <CardBody>
                {dataConfig?.simpanan_pdf && (
                  <Link
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={dataConfig?.simpanan_pdf}
                  >
                    Download form simpanan disini
                  </Link>
                )}
              </CardBody>
            </Card>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default Karyawan;
