import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useApprovePengajuanModal from "./useApprovePengajuanModal";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
  id: string;
  setId: (id: string) => void;
}

const ApprovePengajuanModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch, setId, id } = props;

  const {
    isPendingUpdatePengajuan,
    handleApprovePengajuan,
    isSuccessUpdatePengajuan,
  } = useApprovePengajuanModal();

  useEffect(() => {
    if (isSuccessUpdatePengajuan) {
      onClose();
      refetch();
      setId("");
    }
  }, [isSuccessUpdatePengajuan, onClose, refetch]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Setujui Pengajuan</ModalHeader>
        <ModalBody>
          <p>Apakah anda yakin ingin menyetujui pengajuan ini?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            onPress={onClose}
            isDisabled={isPendingUpdatePengajuan}
          >
            Batal
          </Button>
          <Button
            color='primary'
            onPress={() => handleApprovePengajuan(id)}
            isDisabled={isPendingUpdatePengajuan}
          >
            {isPendingUpdatePengajuan ? <Spinner size='sm' /> : "Setujui"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApprovePengajuanModal;
