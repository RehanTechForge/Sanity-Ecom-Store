import CardListing from "@/components/homePage-V1/CardListing";
import FeaturesSection from "@/components/homePage-V1/FeaturesSection";
import GetInTouch from "@/components/homePage-V1/GetInTouch";
import MainSection from "@/components/homePage-V1/MainSection";
import PopularProducts from "@/components/homePage-V1/PopularProducts";
import WishList from "@/components/homePage-V1/WishList";

export default function Home() {
  return (
    <>
      <MainSection />
      <FeaturesSection alignText="justify-center" />
      <CardListing />
      <PopularProducts />
      <WishList />
      <GetInTouch />
    </>
  );
}
