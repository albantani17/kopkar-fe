import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { NAVBAR_LIST } from "./KaryawanLayout.constant";
import Link from "next/link";
import { cn } from "@/Utils/cn";
import { useRouter } from "next/router";
import PageHead from "@/components/Commons/PageHead";

interface Props {
  children: React.ReactNode;
}

const KaryawanLayout = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  return (
    <>
      <PageHead title='Karyawan' />
      <div className='flex flex-col items-center justify-start min-h-screen'>
        <Navbar maxWidth='xl'>
          <NavbarContent justify='start'>
            <NavbarItem>
              <NavbarBrand className='gap-2'>
                <Image
                  src={"/image/Koperasi.jpeg"}
                  alt='logo'
                  width={60}
                  height={60}
                />
                <h1 className='text-2xl font-bold'>KOPKAR</h1>
              </NavbarBrand>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify='center' className='hidden lg:flex'>
            {NAVBAR_LIST.map((item) => (
              <NavbarItem
                className={cn(
                  "font-medium text-default-700 hover:border-primary-500 hover:border-b-4",
                  {
                    "font-bold border-primary-500 border-b-4":
                      router.pathname === item.href,
                  }
                )}
                key={item.label}
                as={Link}
                href={item.href}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify='end'>
            <NavbarItem>
              <Button variant='ghost' onPress={() => signOut()}>
                Logout
              </Button>
            </NavbarItem>

            <NavbarMenuToggle className='lg:hidden' />

            <NavbarMenu className='gap-4 bg-white'>
              {NAVBAR_LIST.map((item) => (
                <NavbarMenuItem key={`nav-${item.label}`}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-medium text-default-700 hover:border-primary-500 hover:border-b-4",
                      {
                        "font-bold border-primary-500 border-b-4":
                          router.pathname === item.href,
                      }
                    )}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </NavbarContent>
        </Navbar>
        {children}
      </div>
    </>
  );
};

export default KaryawanLayout;
