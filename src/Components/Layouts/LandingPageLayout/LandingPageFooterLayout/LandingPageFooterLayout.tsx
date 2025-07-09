import Image from "next/image";
import Link from "next/link";

const LandingPageFooterLayout = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-slate-900 px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
      <Image
        src={"/image/Koperasi.jpeg"}
        alt="logo"
        className="mb-4 w-40 lg:mb-0 lg:w-60 rounded-full"
        width={200}
        height={100}
      />
      <div className="mb-4 flex flex-col gap-4 lg:mb-0">
        <div>
          <h4 className="text-xl text-white">Kontak</h4>
          <p className="text-gray-600">
            {/* <Link href='mailto:hello@acara.id'>hello</Link> | */}
            <Link href="tel:+621234567890">+62 1234 5678 90</Link>
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Office</h4>
          <p className="text-gray-600">
            Palurahan, Kec. Kaduhejo, Kabupaten Pandeglang, Banten 42252
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooterLayout;
