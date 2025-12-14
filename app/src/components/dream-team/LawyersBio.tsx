import Image from "next/image";
import { string } from "zod";

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
      <div className=" mx-4">
        {" "}
        <div className="rounded-2xl  mx -8  overflow-clip">
          <Image
            src={imgUrl}
            width={500}
            height={500}
            alt={name}
            className="h-[500px] w-full object-cover object-top mx-auto"
          />
        </div>
        <div className=" mt-6 mb-12">
          <h4 className="font-semibold  ">{name}</h4>
          <p className="text-accent">{role}</p>
        </div>
        <div className="">
          <h5 className="font-semibold capitalize pb-2">Credentials</h5>
          <p className="text-black/60 mb-10 text-sm">{credentials}</p>
        </div>
        <div className="">
          <h5 className="font-semibold capitalize pb-2">education</h5>
          <p className="text-black/60 mb-10 text-sm">{education}</p>
        </div>
        <div className="">
          <h5 className="font-semibold capitalize pb-2">specialities</h5>
          <p className="text-black/60 mb-10 text-sm">{specialities}</p>
        </div>
        <div className="">
          <h5 className="font-semibold capitalize pb-2">about</h5>
                                  <p className="text-black/60 mb-10 text-sm">{about}</p>
                                  <div className="w-full h-px bg-black/30 mb-16"></div>
        </div>
      </div>
    </div>
  );
}

export default LawyersBio;
