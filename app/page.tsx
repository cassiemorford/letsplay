import MainNav from "@/components/MainNav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainNav />
      <div>
        <h1>Let's Play Foundation</h1>
        <p>Board Game Management</p>
      </div>
    </main>
  );
}
