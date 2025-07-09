import { montserrat } from "@/pages/_app";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { cn } from "@/Utils/cn";
import { convertIDR } from "@/Utils/currency";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import useCheckOutModal from "./useCheckOutModal";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
}

const CheckOutModal = (props: PropTypes) => {
  const { cart, removeFromCart, decreaseFromCart, addToCart } = useCartStore();
  const { isOpen, onOpenChange } = props;
  const { handleCheckout } = useCheckOutModal();

  const totalPrice = cart.reduce(
    (total: number, item: CartItem) => total + item.price,
    0,
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      className={cn(montserrat.className)}
    >
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalBody>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-y-1 py-3">
              <div className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {item.quantity} x {convertIDR(Number(item.price))}
                </h3>
                <div className="flex justify-between w-full gap-1">
                  <Button
                    size="sm"
                    isIconOnly
                    color="primary"
                    onPress={() => removeFromCart({ ...item })}
                  >
                    <FaRegTrashAlt />
                  </Button>
                  <Button
                    size="sm"
                    isIconOnly
                    color="primary"
                    onPress={() => decreaseFromCart({ ...item })}
                  >
                    <FaMinus />
                  </Button>
                  <Button
                    size="sm"
                    isIconOnly
                    color="primary"
                    onPress={() => addToCart({ ...item })}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Total</h3>
              <h3 className="text-lg font-semibold">
                {convertIDR(totalPrice)}
              </h3>
            </div>
            <Button fullWidth color="primary" onPress={handleCheckout}>
              Checkout
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckOutModal;
