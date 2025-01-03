import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = ({ alignText }: { alignText: string }) => {
  return (
    <section className="px-4 sm:px-20 py-10">
      <div className="my-8">
        <h3
          className={`font-clash text-clash-20 sm:text-clash-24 text-left sm:text-center flex ${alignText}`}
        >
          What makes our brand different
        </h3>
      </div>
      <FeatureCard />
    </section>
  );
};

export default FeaturesSection;
