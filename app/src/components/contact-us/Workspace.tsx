import ReactPlayer from "react-player";
export default function Workspace() {
  return (
    <section>
      <hr className=" w-[85%] mx-auto mb-16 mt-8 " />
      <h4 className="text-center mb-6 uppercase font-semibold">
        Our Workspace
      </h4>

      <div className="w-full relative">
        <ReactPlayer
          src="/videos/office.mp4"
          preload=""
          muted
          loop
          autoPlay
          controls={false}
          width={"100%"}
          height={"50vh"}
          className=" brightness-50 w-screen aspect-video object-cover pointer-events-none select-none cursor-progress"
        />
        <div className="flex flex-col absolute z- 10 px-6 max-w-sm bottom-16 ">
          <h5 className="text-accent mb-4 text-xl"> Virtual Office</h5>
          <p className="text-white ">
            We operate remotely to serve you better, anywhere
          </p>
        </div>
      </div>
    </section>
  );
}
