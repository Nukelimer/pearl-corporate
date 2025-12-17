import { cn } from "@/lib/utils"; // if you use shadcn/ui or similar
interface ContactItem {
  icon: React.ReactNode; // SVG or icon component
  title: string;
  details: string;
  subtitle: string;
}
interface ContactCardProps {
  item: ContactItem;
}

export const ContactCard: React.FC<ContactCardProps> = ({ item }) => {
  return (
    <div className=" rounded-2xl  p-6 flex items-start justify-center gap-5 hover:shadow-lg md:hover:shadow-none cursor-pointer transition-shadow">
      <div
        className={cn(
          "p-3 bg-gray-900 text-white rounded-xl shadow-black md:shadow-none md:drop-shadow-none drop-shadow-2xl ",
          item.title == "WhatsApp" ? "bg-accent" : ""
        )}>
        {item.icon}
      </div>
      <div className="flex-1">
        <h3 className="  text-gray-900">{item.title}</h3>
        <p className=" font-bold text-gray-800 mt-1">{item.details}</p>
        <p className="text-xs text-gray-600 mt-1">{item.subtitle}</p>
      </div>
    </div>
  );
};
