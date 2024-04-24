import Link from "next/link";

import { Logo } from "../../components/icons/Logo";
import { Bag } from "@/components/icons/Bag";
const Footer = ({ data, lang }: any) => {
    return (
        <footer className="bg-black py-14 grow">
            <div className="container flex items-center justify-between">
                <div className="mb-4 h-12 w-40 md:mb-0 md:w-[305px]">
                    <Link href="">
                        <Logo color="white" />
                    </Link>
                </div>
                <div>
                    <nav className="mx-10 flex flex-wrap justify-between gap-4 text-t12 text-center md:flex-row md:gap-10 md:text-t16 ">
                        <h2 className="sr-only text-white">Auxillary navigation</h2>

                        <Link className="flex items-center duration-300 text-white hover:text-white" href={`/${lang}/#products`}>
                            {data.navigation.ourproducts}
                        </Link>
                        <Link className=" flex items-center duration-300 text-white hover:text-white" href={`/${lang}/#about-us`}>
                            {data.navigation.aboutus}
                        </Link>
                        <Link className=" flex items-center duration-300 text-white hover:text-white" href={`/${lang}/#contacts`}>
                            {data.navigation.contacts}
                        </Link>
                        <Link className="flex items-center duration-300 text-white hover:text-white" href={`/${lang}/basket`}>
                            <Bag color="white" />
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer