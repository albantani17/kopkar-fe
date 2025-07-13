import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Fragment, useEffect } from "react";
import { convertIDR } from "@/Utils/currency";
import PengajuanSimpananModal from "./PengajuanSimpananModal";
import useInformasi from "./useInformasi";
import PengajuanPinjamanModal from "./PengajuanPinjamanModal";

const Informasi = () => {
  const { dataProfile, control, setValue } = useInformasi();

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

  const pengajuanSimpananModal = useDisclosure();
  const pengajuanPinjamanModal = useDisclosure();

  return (
    <Fragment>
      <div className='my-8 flex flex-col lg:flex-row gap-4'>
        <Card className='pb-4'>
          <CardBody>
            <div className='py-4 px-24'>
              <Avatar size='lg' className='w-24 h-24' />
            </div>
            <div className='flex flex-col gap-4'>
              <Skeleton isLoaded={!!dataProfile?.nik} className='rounded-lg'>
                <Controller
                  control={control}
                  name='nik'
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant='underlined'
                      label='NIK'
                      disabled
                      autoFocus
                    />
                  )}
                />
              </Skeleton>
              <Skeleton className='rounded-lg' isLoaded={!!dataProfile?.name}>
                <Controller
                  control={control}
                  name='name'
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled
                      variant='underlined'
                      label='Nama Lengkap'
                    />
                  )}
                />
              </Skeleton>
              <Skeleton className='rounded-lg' isLoaded={!!dataProfile?.email}>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant='underlined'
                      label='Email'
                      disabled
                      type='email'
                    />
                  )}
                />
              </Skeleton>
              <Skeleton className='rounded-lg' isLoaded={!!dataProfile?.phone}>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <Input
                      {...field}
                      label='No. HP'
                      variant='underlined'
                      disabled
                    />
                  )}
                />
              </Skeleton>
              <Skeleton
                isLoaded={!!dataProfile?.simpanan}
                className='rounded-lg'
              >
                <Controller
                  control={control}
                  name='simpanan'
                  render={({ field }) => (
                    <Input
                      {...field}
                      label='Jumlah simpanan'
                      variant='underlined'
                      disabled
                    />
                  )}
                />
              </Skeleton>
              <Skeleton
                isLoaded={!!dataProfile?.pinjaman}
                className='rounded-lg'
              >
                <Controller
                  control={control}
                  name='pinjaman'
                  render={({ field }) => (
                    <Input
                      {...field}
                      label='Jumlah uang yang di pinjam'
                      variant='underlined'
                      disabled
                    />
                  )}
                />
              </Skeleton>
            </div>
          </CardBody>
        </Card>
        <div className='flex flex-col gap-4'>
          <Card className='px-4 py-6'>
            <CardHeader>Ajukan Pinjaman</CardHeader>
            <CardBody>
              <Button
                onPress={() => pengajuanPinjamanModal.onOpen()}
                fullWidth
                color='primary'
                variant='solid'
              >
                Klik Disini
              </Button>
            </CardBody>
          </Card>
          <Card className='px-4 py-6'>
            <CardHeader>Ajukan Penarikan Simpanan</CardHeader>
            <CardBody>
              <Button
                fullWidth
                color='primary'
                variant='solid'
                onPress={() => pengajuanSimpananModal.onOpen()}
              >
                Klik Disini
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
      <PengajuanSimpananModal {...pengajuanSimpananModal} refetch={() => {}} />
      <PengajuanPinjamanModal {...pengajuanPinjamanModal} />
    </Fragment>
  );
};

export default Informasi;
