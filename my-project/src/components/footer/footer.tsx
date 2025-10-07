import { Link } from "@/i18n/navigation";
import { Logo } from "../../components/icons/Logo";
import { Cart } from "../Cart";
const Footer = ({ data }: { data: any }) => {
  return (
    <footer className="bg-black py-14">
      <div className="block items-center justify-between md:container xl:flex">
        <div className="mb-4 h-12 w-[60px] md:mb-0 smOnly:mx-auto notXl:mb-5 notXl:ml-auto notXl:mr-auto">
          <Link href="/" className="">
            <Logo color="white" />
          </Link>
        </div>
        <div>
          <nav className="mx-10 flex flex-wrap justify-between gap-4 text-center text-t12 md:flex-row md:gap-3 md:text-t16 xl:gap-8">
            <h2 className="sr-only text-white">Auxillary navigation</h2>
            <Link
              className="flex items-center text-white duration-300 hover:text-white"
              href="/#products"
            >
              {data.navigation.ourproducts}
            </Link>
            <Link
              className="flex items-center text-white duration-300 hover:text-white"
              href="/#about-us"
            >
              {data.navigation.aboutus}
            </Link>
            <Link
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/#contacts`}
            >
              {data.navigation.contacts}
            </Link>
            <Link
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/privacy-policy`}
            >
              {data.navigation.policy}
            </Link>
            <Link
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/offer`}
            >
              {data.navigation.offer}
            </Link>
            <Cart color="white" />
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
