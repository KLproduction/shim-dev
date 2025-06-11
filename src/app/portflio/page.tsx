import Image from "next/image";
import Hero from "./_components/Hero";

export default async function Home() {
  return (
    <div className="min-h-screen items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <section className="h-screen snap-start">
          <Hero />
        </section>
        <section className="h-screen snap-start bg-gray-800"></section>
        <section className="h-screen snap-start bg-red-800"></section>
        <section className="h-screen snap-start bg-blue-800"></section>
      </main>
    </div>
  );
}
