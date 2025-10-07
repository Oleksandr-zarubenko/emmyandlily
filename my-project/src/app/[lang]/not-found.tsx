import { redirect } from "@/i18n/navigation";

export default function NotFound() {
  redirect({ href: "/", locale: "uk" });
  // return (
  //   <div className=" flex flex-1 flex-col items-center justify-center gap-8">
  //     <h2>Не знайдено</h2>
  //     <p>Нажаль ми не змогли знайти дану сторінку</p>
  //     <Link href="/" className=" rounded-md border-[2px] border-black p-6">
  //       Повернутися на домашню
  //     </Link>
  //   </div>
  // );
}
