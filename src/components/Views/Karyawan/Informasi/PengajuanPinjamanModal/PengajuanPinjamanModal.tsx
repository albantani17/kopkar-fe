import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import usePengajuanPinjamanModal from "./usePengajuanPinjamanModal";
import { ALASAN_PENGAJUAN } from "./PengajuanPinjamanModal.constant";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/Utils/cn";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

const PengajuanPinjamanModal = (props: PropTypes) => {
  const { isOpen, onOpenChange, onClose } = props;

  const {
    control,
    handleSubmit,
    errors,
    reset,
    handleCreatePengajuan,
    isPendingCreatePengajuan,
    isSuccessCreatePengajuan,
    setValue,
  } = usePengajuanPinjamanModal();

  const [keyAlasan, setKeyAlasan] = useState("");
  const [, setAlasan] = useState("");
  const [max, setMax] = useState(0);

  useEffect(() => {
    const find = ALASAN_PENGAJUAN.find((item) => item.key === keyAlasan);
    if (find) {
      if (find.key === "lainnya") {
        setAlasan("");
        setMax(10_000_000);
      } else {
        setValue("alasan", find.label);
        setAlasan(find.label);
        setMax(find.max);
        setValue("jumlah", find.max);
      }
    }
  }, [keyAlasan]);

  useEffect(() => {
    if (isSuccessCreatePengajuan) {
      onClose();
      reset();
    }
  }, [isSuccessCreatePengajuan, onClose, reset]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
      <ModalContent>
        <ModalHeader>Form Pengajuan Pinjaman</ModalHeader>
        <form onSubmit={handleSubmit(handleCreatePengajuan)}>
          <ModalBody>
            <Select
              aria-label='Pengajuan'
              items={ALASAN_PENGAJUAN}
              variant='bordered'
              label='Alasan Pengajuan'
              disallowEmptySelection
              isInvalid={!!errors.alasan}
              errorMessage={errors.alasan?.message}
              onSelectionChange={(key) => setKeyAlasan(key.currentKey!)}
            >
              {(item) => (
                <SelectItem key={item.key} textValue={item.label}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
            <Controller
              control={control}
              name='alasan'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Alasan Lainnya'
                  variant='bordered'
                  errorMessage={errors.alasan?.message}
                  isInvalid={!!errors.alasan}
                  className={cn({ hidden: keyAlasan !== "lainnya" })}
                />
              )}
            />
            <NumberInput
              label='Jumlah Pinjaman'
              variant='bordered'
              maxValue={max}
              startContent='Rp'
              step={100_000}
              errorMessage={errors.jumlah?.message}
              isInvalid={!!errors.jumlah}
              onValueChange={(value) => setValue("jumlah", value)}
            />
            <Controller
              control={control}
              name='noRekening'
              render={({ field }) => (
                <Input
                  {...field}
                  label='No Rekening'
                  variant='bordered'
                  errorMessage={errors.noRekening?.message}
                  isInvalid={!!errors.noRekening}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onPress={onClose}>
              Cancel
            </Button>
            <Button color='primary' type='submit'>
              {isPendingCreatePengajuan ? (
                <Spinner color='white' size='sm' />
              ) : (
                "Ajukan"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PengajuanPinjamanModal;
