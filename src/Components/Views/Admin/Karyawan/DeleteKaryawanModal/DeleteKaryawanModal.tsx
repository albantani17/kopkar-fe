import { montserrat } from "@/pages/_app";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";

interface PropType {
  onDelete: () => void;
  refetch: () => void;
  onClose: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
  isSuccess: boolean;
  isPending: boolean;
  setId: (id: string) => void;
}

const DeleteKaryawanModal = (props: PropType) => {
  const {
    onDelete,
    refetch,
    onClose,
    isOpen,
    onOpenChange,
    isSuccess,
    isPending,
    setId,
  } = props;

  useEffect(() => {
    if (isSuccess) {
      onClose();
      refetch();
      setId("");
    }
  }, [isSuccess, onClose, refetch, setId]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={montserrat.className}
    >
      <ModalContent>
        <ModalHeader>Hapus Karyawan</ModalHeader>
        <ModalBody>
          <p>Apakah anda yakin ingin menghapus karyawan ini?</p>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2">
            <Button
              color="danger"
              isLoading={isPending}
              onPress={onClose}
              disabled={isPending}
            >
              Kembali
            </Button>
            <Button
              color="primary"
              isLoading={isPending}
              onPress={onDelete}
              disabled={isPending}
              spinnerPlacement="end"
              spinner={<Spinner size="sm" color="white" />}
            >
              Hapus
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteKaryawanModal;
