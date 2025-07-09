import configurationService from "@/service/configuration.service";
import useCartStore from "@/store/useCartStore";
import { convertIDR } from "@/Utils/currency";
import { useQuery } from "@tanstack/react-query";

const useCheckOutModal = () => {
  const { cart } = useCartStore();

  const getConfig = async () => {
    const result = await configurationService.findAll();
    return result.data.data;
  };

  const { data: dataConfig, isLoading } = useQuery({
    queryKey: ["config"],
    queryFn: getConfig,
  });

  const orderDetail = cart
    .map(
      (item) =>
        `- ${item.name} (${item.quantity} x Rp ${convertIDR(item.price)})`,
    )
    .join("\n");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const finalOrderString = `--- LIST PESANAN ---\n${orderDetail}\n\nTOTAL: Rp ${convertIDR(
    totalPrice,
  )}`;

  const handleCheckout = () => {
    while (true) {
      if (!isLoading) {
        const url = `https://wa.me/${dataConfig?.contact_phone}?text=${encodeURIComponent(
          finalOrderString,
        )}`;
        window.open(url, "_blank");
        break;
      }
    }
  };

  return { handleCheckout };
};

export default useCheckOutModal;
