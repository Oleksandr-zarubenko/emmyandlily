
import Link from "next/link";

import { Logo } from "../../components/icons/Logo";
import LocaleSwitcher from "@/components/locale-switcher";
import { Bag } from "@/components/icons/Bag";
const Header = ({ lang, data }: any) => {
    // const [storedDataLength, setStoredDataLength] = useState(0);
    // const storedData = JSON.parse(localStorage.getItem('storedData') || '[]');

    // useEffect(() => {
    //     setStoredDataLength(storedData.length);
    // }, [storedData]);
    return (
        <header className="absolute inset-x-0 z-20 pt-6 pb-4 border-black border-b-2 px-[80px]">
            <div className="container invisible content-center items-center justify-between md:flex md:flex-row xl:visible smOnly:absolute">
                <div className="h-6 w-40">
                    <Link href={`/${lang}`}>
                        <Logo color="#333333" />
                    </Link>
                </div>
                <nav className="flex flex-col text-t16 items-center md:flex-row md:gap-4 xl:gap-10">
                    <h2 className="sr-only">Main navigation</h2>

                    <Link
                        className="duration-300 text-[#0B0605] hover:text-primary"
                        href={`/${lang}/#products`}

                    >
                        {data.navigation.ourproducts}
                    </Link>
                    <Link
                        className="duration-300 hover:text-primary"
                        href={`/${lang}/#about-us`}

                    >
                        {data.navigation.aboutus}
                    </Link>
                    <Link
                        className="duration-300 hover:text-primary"
                        href={`/${lang}/#contacts`}

                    >
                        {data.navigation.contacts}
                    </Link>
                    <LocaleSwitcher lang={lang} />
                    <Link className="duration-300 text-white hover:text-white flex" href={`/${lang}/basket`} >
                        {/* {storedDataLength > 0 && (<p className="relative left-[35px] w-5 h-5 text-t14 bg-white text-center text-black rounded-3xl border-solid border-2 border-black">{storedData.length}</p>)} */}
                        <Bag color="black" />
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;