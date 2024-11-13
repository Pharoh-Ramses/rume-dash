import { withI18n } from '~/lib/i18n/with-i18n';
import HeroSection from "~/components/hero-section";
import AboutUsSection from "~/components/about-us";
import FourImageSection from "~/components/four-image-section";
import PopularProductsSlider from "~/components/popular-product-slider";
import HowToGetStarted from "~/components/how-to-get-started";
import ClosingCTA from "~/components/closing-cta";

function Home() {
  return (
    <div className={' flex flex-col '}>
      <HeroSection />
      <AboutUsSection />
      <FourImageSection />
      <PopularProductsSlider />
      <HowToGetStarted />
        <ClosingCTA />

    </div>
  );
}

export default withI18n(Home);
