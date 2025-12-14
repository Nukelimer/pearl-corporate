import { Clock, Facebook, Instagram, Mail, MessageCircle, PhoneIcon } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { ContactCard } from "./ContactCard";



interface ContactItem {
  icon: React.ReactNode; 
  title: string;
  details: string;
  subtitle: string;
}
interface ContactCardProps {
  item: ContactItem;
}
const contactDetails: ContactItem[] = [
  {
    icon: <FaWhatsapp size={24} />,
    title: "WhatsApp",
    details: "+234 806 430 5645",
    subtitle: "Quick response available",
  },
  {
    icon: <PhoneIcon />,
    title: "Call Us",
    details: "+234 813 614 1666",
    subtitle: "Mon-Fri, 9AM-6PM EST",
  },
  {
    icon: <Mail />,
    title: "Email",
    details: "Contact@pearlaw.com",
    subtitle: "24-hour response time",
  },
  {
    icon: <Clock />,
    title: "Business Hours",
    details: "Mon-Fri: 9:00AM - 6:00PM",
    subtitle: "Closed on Sundays",
  },
];

const ContactDetailsSection: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl  text-center text-black mb-10">
        Contact Details
      </h2>

      <div className="grid gap-6 md:grid-cols-1">
        {contactDetails.map((item, index) => (
          <ContactCard key={index} item={item} />
        ))}
      </div>

      <div className="mt-16 text-c enter">
        <h3 className="text-xl md:text-2xl  text-black mb-8">
          Connect with Us
        </h3>
        <div className="flex  gap-6">
          <a
            href="https://facebook.com/pearlaw"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <Facebook className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://instagram.com/pearlaw"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 flex items-center bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <Instagram className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://tiktok.com/@pearlaw"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <FaTiktok className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactDetailsSection;
