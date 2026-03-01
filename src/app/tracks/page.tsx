import { redirect } from "next/navigation";

export default function TracksPage() {
    redirect("/shop?category=tracks");
}
