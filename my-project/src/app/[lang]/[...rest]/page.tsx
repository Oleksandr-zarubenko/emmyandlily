import { redirect } from "next/navigation";

export default function GoToNotFoundPage() {
  redirect("/");
}
