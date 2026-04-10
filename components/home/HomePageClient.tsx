"use client";

import { useCallback, useEffect, useState } from "react";
import { HeroHomeSection } from "./HeroHomeSection";
import { HomeVanillaInit } from "./HomeVanillaInit";
import { PageLoader } from "./PageLoader";

export function HomePageClient() {
  const [booted, setBooted] = useState(false);

  const onLoaderDone = useCallback(() => {
    setBooted(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("home-scroll-header-init");
    return () => {
      document.documentElement.classList.remove("home-scroll-header-init");
    };
  }, []);

  return (
    <>
      <PageLoader onDone={onLoaderDone} />
      <HeroHomeSection booted={booted} />
      <HomeVanillaInit enabled={booted} />
    </>
  );
}
