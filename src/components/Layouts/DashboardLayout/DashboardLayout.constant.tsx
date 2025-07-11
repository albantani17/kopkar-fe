import { SidebarItems } from "@/components/Ui/Sidebar/Sidebar";
import { CiShoppingTag } from "react-icons/ci";
import { FaShop, FaWpforms } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";

const SIDEBAR_ITEMS: SidebarItems[] = [
  {
    key: "karyawan",
    label: "Karyawan",
    icon: <MdPeople />,
    href: "/admin/karyawan",
  },
  {
    key: "pengajuan",
    label: "Pengajuan",
    icon: <FaWpforms />,
    href: "/admin/pengajuan",
  },
  {
    key: "kategori-produk",
    label: "Kategori Produk",
    icon: <CiShoppingTag />,
    href: "/admin/kategori",
  },
  {
    key: "produk",
    label: "Produk",
    icon: <FaShop />,
    href: "/admin/produk",
  },
];

export { SIDEBAR_ITEMS };
