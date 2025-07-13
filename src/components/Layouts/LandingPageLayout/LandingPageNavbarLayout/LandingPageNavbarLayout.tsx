import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { NAV_ITEMS } from "../LandingPageLayout.constant";
import Link from "next/link";
import { cn } from "@/Utils/cn";
import { useRouter } from "next/router";
import { BsCart4 } from "react-icons/bs";
import useCartStore from "@/store/useCartStore";
import { montserrat } from "@/pages/_app";
import { convertIDR } from "@/Utils/currency";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { Fragment } from "react";
import CheckOutModal from "./CheckOutModal";

const LandingPageNavbarLayout = () => {
  const router = useRouter();
  const { cart, addToCart, decreaseFromCart, removeFromCart } = useCartStore();
  const checkoutModal = useDisclosure();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Fragment>
      <Navbar
        maxWidth="full"
        shouldHideOnScroll
        isBlurred={false}
        isBordered
        className="bg-white"
      >
        <NavbarBrand className="gap-2">
          <Image src="/image/Koperasi.jpeg" alt="logo" width={60} height={60} />
          <h1 className="text-2xl font-bold">KOPKAR</h1>
        </NavbarBrand>
        <NavbarContent justify="center" className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={item.label}
              as={Link}
              href={item.href}
              className={cn(
                "font-medium text-default-700 hover:border-primary-500 hover:border-b-4",
                {
                  "font-bold border-primary-500 border-b-4":
                    router.pathname === item.href,
                },
              )}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Badge
              color="primary"
              placement="bottom-left"
              content={totalQuantity}
            >
              <Popover placement="left-start">
                <PopoverTrigger>
                  <Button isIconOnly variant="bordered">
                    <BsCart4 size={25} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={cn(montserrat.className, "w-80 gap-2 p-4")}
                >
                  <h1 className="font-bold">Keranjang Belanja</h1>
                  {cart.length === 0 ? (
                    <p className="font-semibold">Keranjang belanja kosong</p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-2 w-full"
                      >
                        <h1>{item.name}</h1>
                        <div className="flex flex-col items-start">
                          <p>
                            {item.quantity} x {convertIDR(Number(item.price))}
                          </p>
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
                    ))
                  )}
                  {cart.length > 0 && (
                    <>
                      <div className="flex justify-between w-full font-semibold">
                        <h1>Total</h1>
                        <p>
                          {convertIDR(
                            cart.reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0,
                            ),
                          )}
                        </p>
                      </div>
                      <Button
                        fullWidth
                        color="primary"
                        onPress={checkoutModal.onOpen}
                      >
                        Checkout
                      </Button>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </Badge>
          </NavbarItem>
          <NavbarMenuToggle className="lg:hidden" />

          <NavbarMenu className="gap-4 bg-white">
            {NAV_ITEMS.map((item) => (
              <NavbarMenuItem key={`nav-${item.label}`}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-medium text-default-700 hover:text-primary",
                    {
                      "font-bold text-primary": router.pathname === item.href,
                    },
                  )}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </NavbarContent>
      </Navbar>
      <CheckOutModal {...checkoutModal} />
    </Fragment>
  );
};

export default LandingPageNavbarLayout;
