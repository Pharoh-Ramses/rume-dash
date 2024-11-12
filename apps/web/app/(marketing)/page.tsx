import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, LayoutDashboard } from 'lucide-react';

import { PricingTable } from '@kit/billing-gateway/marketing';
import {
  CtaButton,
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
  FeatureShowcaseIconContainer,
  GradientSecondaryText,
  Hero,
  Pill,
  SecondaryHero,
} from '@kit/ui/marketing';
import { Trans } from '@kit/ui/trans';

import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';
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

function MainCallToActionButton() {
  return (
    <div className={'flex space-x-4'}>
      <CtaButton>
        <Link href={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>
              <Trans i18nKey={'common:getStarted'} />
            </span>

            <ArrowRightIcon
              className={
                'h-4 animate-in fade-in slide-in-from-left-8' +
                ' delay-1000 duration-1000 zoom-in fill-mode-both'
              }
            />
          </span>
        </Link>
      </CtaButton>

      <CtaButton variant={'link'}>
        <Link href={'/contact'}>
          <Trans i18nKey={'common:contactUs'} />
        </Link>
      </CtaButton>
    </div>
  );
}
