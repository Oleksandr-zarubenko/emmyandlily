import { Logo } from "../../components/icons/Logo";
import { Cart } from "../Cart";
import { DatoLayoutData } from "@/types/dato";
import { TrackedLink } from "../TrackedLink";
const Footer = ({ data }: { data: DatoLayoutData }) => {
  return (
    <footer className="bg-black py-14">
      <div className="block items-center justify-between md:container xl:flex">
        <div className="mb-4 h-12 w-[60px] md:mb-0 smOnly:mx-auto notXl:mb-5 notXl:ml-auto notXl:mr-auto">
          <TrackedLink
            href="/"
            className=""
            eventName="footer_logo_click"
            eventParams={{ page: "global" }}
          >
            <Logo color="white" />
          </TrackedLink>
        </div>
        <div>
          <nav className="mx-10 flex flex-wrap justify-between gap-4 text-center text-t12 md:flex-row md:gap-3 md:text-t16 xl:gap-8">
            <h2 className="sr-only text-white">Auxillary navigation</h2>
            <TrackedLink
              className="flex items-center text-white duration-300 hover:text-white"
              href="/#products"
              eventName="footer_nav_click"
              eventParams={{ target: "products" }}
            >
              {data.navigation.ourproducts}
            </TrackedLink>
            <TrackedLink
              className="flex items-center text-white duration-300 hover:text-white"
              href="/#about-us"
              eventName="footer_nav_click"
              eventParams={{ target: "about_us" }}
            >
              {data.navigation.aboutus}
            </TrackedLink>
            <TrackedLink
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/#contacts`}
              eventName="footer_nav_click"
              eventParams={{ target: "contacts" }}
            >
              {data.navigation.contacts}
            </TrackedLink>
            <TrackedLink
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/privacy-policy`}
              eventName="footer_nav_click"
              eventParams={{ target: "privacy_policy" }}
            >
              {data.navigation.policy}
            </TrackedLink>
            <TrackedLink
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/offer`}
              eventName="footer_nav_click"
              eventParams={{ target: "offer" }}
            >
              {data.navigation.offer}
            </TrackedLink>
            <Cart color="white" source="footer" />
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
