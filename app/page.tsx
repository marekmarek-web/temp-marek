import { HomePageClient } from "@/components/home/HomePageClient";
import { HomeRestSections } from "@/components/home/HomeRestSections";

export default function HomePage() {
  return (
    <main className="main-with-header" id="home-main">
      <HomePageClient />
      <HomeRestSections />
    </main>
  );
}
