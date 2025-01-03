import Image from "next/image";
import { ButtonMedium } from "../buttons/buttons";

const Feature = ({
  orderClass,
  title,
  description,
  image,
}: {
  orderClass: string;
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center">
      <div className={`px-4 sm:px-20 flex flex-col ${orderClass}`}>
        <div className="flex-1">
          <h2 className="font-clash text-clash-20 text-[#2A254B] my-8">
            {title}
          </h2>
          <p
            className="font-satoshi text-satoshi-16 text-[#505977] mt-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="">
          <ButtonMedium text="Get in touch" href="/" />
        </div>
      </div>
      <div className={`order-${orderClass === "order-1" ? "2" : "1"}`}>
        <Image
          src={image}
          alt="about"
          height={600}
          width={720}
          className="lg:h-[100%] object-cover"
        />
      </div>
    </section>
  );
};
export default Feature;
