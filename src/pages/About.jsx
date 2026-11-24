import { Helmet } from "react-helmet-async";
import AboutHero from "../components/about/AboutHero";
import MissionValues from "../components/about/MissionValues";
import BrandStory from "../components/about/BrandStory";
import TeamSection from "../components/about/TeamSection";
import StatsSection from "../components/about/StatsSection";
import AboutCTA from "../components/about/AboutCTA";

function About() {
  return (
    <>
      <Helmet>
        <title>درباره ما | پرایم شاپ</title>
        <meta
          name="description"
          content="داستان پرایم شاپ؛ از یک ایده ساده در سال ۱۳۹۵ تا فروشگاهی با بیش از ۵۰ هزار سفارش موفق. با ارزش‌ها، تیم و مسیر رشد ما آشنا شوید."
        />
        <meta property="og:title" content="درباره ما | پرایم شاپ" />
        <meta
          property="og:description"
          content="ماموریت پرایم شاپ ساده است: خرید آنلاین باید همان اطمینان خرید حضوری را بسازد."
        />
        <link rel="canonical" href="/about" />
      </Helmet>

      <main dir="rtl" lang="fa" className="min-h-screen w-full bg-white pb-10">
        <AboutHero />
        <MissionValues />
        <BrandStory />
        {/* <TeamSection /> */}
        <StatsSection />
        <AboutCTA />
      </main>
    </>
  );
}

export default About;
