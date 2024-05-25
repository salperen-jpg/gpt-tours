import { MdLocationOn, MdOutlineChatBubble } from "react-icons/md";
import { FaGem } from "react-icons/fa";

type Service = {
  service: string;
  description: string;
  icon: React.ReactNode;
};

export const ourServices: Service[] = [
  {
    service: "Personalized Tour Creation",
    description:
      "Craft custom itineraries based on your preferences and interests for a unique travel experience.",
    icon: (
      <MdLocationOn className="service-icon  group-hover:text-violet-500 " />
    ),
  },
  {
    service: "AI Chat Support",
    description:
      "24/7 AI assistance for travel planning and inquiries, ensuring smooth and enjoyable trips.",
    icon: (
      <MdOutlineChatBubble className="service-icon group-hover:text-fuchsia-500" />
    ),
  },
  {
    service: "Local Experiences and Hidden Gems",
    description:
      "Discover unique local experiences and hidden gems curated by our AI to ensure you explore beyond the typical tourist attractions.",
    icon: <FaGem className="service-icon group-hover:text-fuchsia-900 " />,
  },
];
