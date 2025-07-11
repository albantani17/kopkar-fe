import { ROLE } from "@/constants/role.constants";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { Montserrat } from "next/font/google";
import useAddKaryawanModal from "./useAddKaryawanModal";
import { Controller } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";
import { useEffect } from "react";
import { CABANG } from "@/constants/cabang.constant";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
}

const montserrat = Montserrat({ subsets: ["latin"] });

const AddKaryawanModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch } = props;
  const {
    control,
    handleSubmit,
    errors,
    handleAddKaryawan,
    isPendingAddKaryawan,
    isSuccessAddKaryawan,

    visiblePassword,
    handleVisiblePassword,
  } = useAddKaryawanModal();

  useEffect(() => {
    if (isSuccessAddKaryawan) {
      onClose();
      refetch();
    }
  }, [isSuccessAddKaryawan, onClose, refetch]);

  return (
    <Modal
      className={montserrat.className}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(handleAddKaryawan)}>
          <ModalHeader>Tambah Karyawan</ModalHeader>
          <ModalBody>
            <h2>Informasi Login</h2>
            <div className='flex flex-col gap-4 mb-4'>
              <Controller
                control={control}
                name='nik'
                render={({ field }) => (
                  <Input
                    {...field}
                    variant='bordered'
                    label='NIK'
                    autoFocus
                    errorMessage={errors.nik?.message}
                    isInvalid={!!errors.nik}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant='bordered'
                    type={visiblePassword.password ? "text" : "password"}
                    label='Password'
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                    endContent={
                      <button
                        type='button'
                        className='text-sm text-default-400'
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
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant='bordered'
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    label='Konfirmasi Password'
                    errorMessage={errors.confirmPassword?.message}
                    isInvalid={!!errors.confirmPassword}
                    endContent={
                      <button
                        type='button'
                        className='text-sm text-default-400'
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
              <Controller
                control={control}
                name='role'
                render={({ field }) => (
                  <Select
                    {...field}
                    variant='bordered'
                    aria-label='Role'
                    label='Role'
                    items={[
                      { label: "Admin", value: ROLE.ADMIN },
                      { label: "Karyawan", value: ROLE.KARYAWAN },
                    ]}
                    errorMessage={errors.role?.message}
                    isInvalid={!!errors.role}
                  >
                    {(item) => (
                      <SelectItem
                        className={montserrat.className}
                        key={item.value}
                        aria-labelledby='role'
                      >
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />
            </div>
            <h2>Informasi Lengkap</h2>
            <div className='flex flex-col gap-4 mb-4'>
              <Controller
                control={control}
                name='name'
                render={({ field }) => (
                  <Input
                    {...field}
                    variant='bordered'
                    label='Nama Lengkap'
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='cabang'
                render={({ field }) => (
                  <Select
                    {...field}
                    variant='bordered'
                    aria-label='Cabang'
                    label='Cabang'
                    items={[
                      { label: "PANDEGLANG", value: CABANG.PANDEGLANG },
                      { label: "PANIMBANG", value: CABANG.PANIMBANG },
                      { label: "CIBALIUNG", value: CABANG.CIBALIUNG },
                      { label: "MALINGPING", value: CABANG.MALINGPING },
                    ]}
                    isInvalid={!!errors.cabang}
                    errorMessage={errors.cabang?.message}
                  >
                    {(item) => (
                      <SelectItem
                        className={montserrat.className}
                        key={item.value}
                        aria-labelledby='cabang'
                      >
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name='departemen'
                render={({ field }) => (
                  <Input
                    {...field}
                    variant='bordered'
                    label='Nama departemen'
                    isInvalid={!!errors.departemen}
                    errorMessage={errors.departemen?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <Input
                    {...field}
                    variant='bordered'
                    label='Email'
                    type='email'
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <Input
                    {...field}
                    label='No. HP'
                    variant='bordered'
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='flex justify-end gap-2'>
              <Button
                color='danger'
                onPress={onClose}
                disabled={isPendingAddKaryawan}
              >
                Kembali
              </Button>
              <Button
                color='primary'
                type='submit'
                disabled={isPendingAddKaryawan}
                isLoading={isPendingAddKaryawan}
                spinnerPlacement='end'
                spinner={<Spinner color='white' size='sm' />}
              >
                Tambah
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddKaryawanModal;
