import ContactDetailsSection from "../src/components/contact-us/ContactDetailsSelection";
import ConversationForm from "../src/components/contact-us/ConversationForm";
import { RetainershipPlans } from "../src/components/contact-us/Retainer";
import Workspace from "../src/components/contact-us/Workspace";
import { H_R_Header } from "../src/components/reusable/H_R_Header";

function page() {
  return (
    <section className="">
      {" "}
      <H_R_Header
        title="Get in Touch with <br/> Our <br/> <span class='flex justify-center  text-center mt-1 mx-auto text-white'>Legal Experts</span>"
        isLabelAvl={false}
        label="Professional Legal Service"
        className="mt-18 relative"
        labelStyles="text-white pt-16 "
        imgUrl="/contact-us/contact.jpg"
        imgStyles="w-full h-full aspect- video object-cover absolute blur-md backdrop-blur-md bg-white/20 brightness-30 object-bottom"
        titleStylesOveride="mb-0 pb-10 text-3xl font-normal px-3 font-semibold max-w-sm mx-auto"
        paragraph="Reach out for legal inquires or professional support. Our experienced team is here to help you navigate your legal needs with confidence and clarity"
        dangerouslySetHTML
        paragraphStyles="text-white px-6 pb-7"
      />
      <ConversationForm />
      <ContactDetailsSection />
      <Workspace />
      <RetainershipPlans />
    </section>
  );
}

export default page;
