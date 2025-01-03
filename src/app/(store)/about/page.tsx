import AboutTitle from "@/components/aboutPage/AboutTitle";
import EmailSignupSection from "@/components/aboutPage/EmailSignupSection";
import Feature from "@/components/aboutPage/Feature";
import FeaturesSection from "@/components/homePage-V1/FeaturesSection";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <AboutTitle />
      <Feature
        orderClass="order-1"
        title="From a studio in London to a global brand with over 400 outlets"
        description={`When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. <br /><br /> Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.`}
        image="/about.png"
      />
      <Feature
        orderClass="order-2"
        title="Our service isn’t just personal, it’s actually hyper personally exquisite"
        description={`When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. <br /><br /> Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.`}
        image="/about.png"
      />
      <FeaturesSection alignText="justify-center" />
      <EmailSignupSection />
    </>
  );
};

export default AboutPage;
