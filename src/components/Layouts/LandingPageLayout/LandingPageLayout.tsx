import PageHead from "@/Components/Commons/PageHead";
import { Fragment } from "react";
import LandingPageNavbarLayout from "./LandingPageNavbarLayout/LandingPageNavbarLayout";
import LandingPageFooterLayout from "./LandingPageFooterLayout";

interface PropTypes {
  children: React.ReactNode;
  title?: string;
}

const LandingPageLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageNavbarLayout />
      <div className="pb-10">{children}</div>
      <LandingPageFooterLayout />
    </Fragment>
  );
};

export default LandingPageLayout;
