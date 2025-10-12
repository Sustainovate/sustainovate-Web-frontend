import CTA from "@/components/CTA";
import ExploreDomains from "@/components/Domains";
import Domain from "@/components/Domains2";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImgGal from "@/components/ImgGal";
import WhatIsSustainovate from "@/components/Sustainovate";
import TeamSection from "@/components/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <Domain />
      <ImgGal />
      <CTA />
      <TeamSection />
      <Footer />
    </>
  );
}
