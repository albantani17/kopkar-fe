import { cn } from "@/Utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

export interface SidebarItems {
  key: string;
  label: string;
  icon: JSX.Element;
  href: string;
}

interface PropType {
  sidebarItems: SidebarItems[];
  isOpen: boolean;
  isDashboard?: boolean;
}

const Sidebar = (props: PropType) => {
  const router = useRouter();
  const { sidebarItems, isOpen, isDashboard = false } = props;
  return (
    <div
      className={cn(
        "fixed z-50 lg:relative",
        "-translate-x-full transition-all",
        "h-screen w-full max-w-[300px]",
        "flex flex-col justify-between",
        "border-r-1 border-default-200",
        "bg-white px-4 py-6",
        { "translate-x-0": isOpen },
        { "lg:translate-x-0": isDashboard },
      )}
    >
      <div>
        <div className="flex flex-col items-center">
          <Link href={"/"}>
            <Image
              src="/image/Koperasi.jpeg"
              alt="logo"
              width={60}
              height={60}
              className="mb-2 w-28"
            />
            <h1 className="text-2xl font-bold">KOPKAR</h1>
          </Link>
        </div>
        <Listbox variant="solid" aria-label="Sidebar menu" items={sidebarItems}>
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-primary text-white": router.pathname.startsWith(item.href),
              })}
              startContent={item.icon}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small font-semibold">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          color="primary"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
          onPress={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
