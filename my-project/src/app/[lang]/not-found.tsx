import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="container flex grow flex-col items-center justify-center gap-6 py-32 text-center">
      <h1 className="text-t32 font-bold">404</h1>
      <p className="text-t18">Page not found.</p>
      <Link href="/" className="rounded border-2 border-black px-6 py-3 font-bold">
        Go to homepage
      </Link>
    </div>
  );
}
