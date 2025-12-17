import Image from "next/image";
import { string } from "zod";
import StraightVerticalLine from "../sections/StraightVerticalLine";

type LawyersBioProps = {
  about: string;
  credentials: string;
  education: string;
  name: string;
  role: string;
  specialities: string;
  imgUrl: string;
};

function LawyersBio({
  about,
  credentials,
  education,
  name,
  role,
  specialities,
  imgUrl,
}: LawyersBioProps) {
  return (
    <div>
      <div className=" mx-4 md:flex gap-x-16 ">
        {" "}
        <div className="rounded-2xl md:rounded-sm  mx -8 md:w-1/2 md:items-stretch  overflow-clip">
          <Image
            src={imgUrl}
            width={500}
            height={500}
            alt={name}
            className="h-[500px] md:full w-full object-cover object-top mx-auto"
          />
        </div>
        <div className=" md:w-1/2 md:h-stretch md:items-stretch md:flex md:flex-col md:justify-between">
          <StraightVerticalLine className="hidden md:flex w-8 ml-0 h-1 md:mb-0" />
          <div className=" mt-6 mb-12 md:mb-6 md:mt-0">
            <h4 className="font-semibold  ">{name}</h4>
            <p className="text-accent">{role}</p>
          </div>
          <div className="">
            <h5 className="font-semibold capitalize pb-2">Credentials</h5>
            <p className="text-black/60 mb-10 md:mb-6 text-sm  font-light">{credentials}</p>
          </div>
          <div className="">
            <h5 className="font-semibold capitalize pb-2">education</h5>
            <p className="text-black/60 mb-10 font-light md:mb-6 text-sm">{education}</p>
          </div>
          <div className="">
            <h5 className="font-semibold capitalize pb-2">specialities</h5>
            <p className="text-black/60 mb-10 font-light md:mb-6 text-sm">
              {specialities}
            </p>
          </div>
          <div className=" md:flex md:flex-col ">
            <h5 className="font-semibold capitalize pb-2">about</h5>
            <p className="text-black/60 mb-10 md:mb-0 md:h- text-sm">{about}</p>
            <div className="w-full h-px bg-black/30 mb-16 font-light md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyersBio;
