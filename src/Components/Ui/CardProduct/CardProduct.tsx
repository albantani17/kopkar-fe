import useCartStore from "@/store/useCartStore";
import { IProduct } from "@/types/Product";
import { convertIDR } from "@/Utils/currency";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface PropTypes {
  product: IProduct;
}

const CardProduct = (props: PropTypes) => {
  const { product } = props;
  const { cart, addToCart, decreaseFromCart } = useCartStore();

  return (
    <Card shadow="sm">
      <CardBody className="flex flex-col">
        <div className="flex justify-center">
          <Image
            src={`${product.image}`}
            alt={`${product.name}`}
            width={150}
            height={100}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 ">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 flex-grow" line-clamp-2>
            {product.description}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2">
        <span className="text-xl font-bold text-primary-600">
          {convertIDR(Number(product.price))}
        </span>
        {cart.find((item) => item.id === product.id) ? (
          <div className="flex justify-between w-full">
            <Button
              color="primary"
              isIconOnly
              onPress={() =>
                decreaseFromCart({
                  id: `${product.id}`,
                  name: `${product.name}`,
                  price: Number(product.price),
                  image: `${product.image}`,
                })
              }
            >
              <FaMinus />
            </Button>
            <p>{cart.find((item) => item.id === product.id)?.quantity}</p>
            <Button
              isIconOnly
              color="primary"
              onPress={() =>
                addToCart({
                  id: `${product.id}`,
                  name: `${product.name}`,
                  price: Number(product.price),
                  image: `${product.image}`,
                })
              }
            >
              <FaPlus />
            </Button>
          </div>
        ) : (
          <Button
            fullWidth
            startContent={<BiCartAdd size={20} />}
            color="primary"
            onPress={() =>
              addToCart({
                id: `${product.id}`,
                name: `${product.name}`,
                price: Number(product.price),
                image: `${product.image}`,
              })
            }
          >
            Tambah Ke Keranjang
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardProduct;
