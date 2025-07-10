import Sidebar from "@/components/Ui/Sidebar";
import { ReactNode, useState } from "react";
import { SIDEBAR_ITEMS } from "./DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import PageHead from "@/components/Commons/PageHead";

interface PropType {
  children: ReactNode;
  title: string;
  description: string;
}
const DashboardLayout = (props: PropType) => {
  const { children, title, description } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <Sidebar sidebarItems={SIDEBAR_ITEMS || []} isOpen={open} isDashboard />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
