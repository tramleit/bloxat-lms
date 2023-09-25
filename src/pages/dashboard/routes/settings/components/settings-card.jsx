import { Card } from "@/components/ui/card";

const SettingsCard = ({ title, description, icon, color, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="p-5 hover:shadow-md transition-all duration-150 ease-in-out cursor-pointer dark:bg-[#141414]"
    >
      <div className="flex flex-row items-center">
        <div
          className={`flex items-center justify-center ${color} dark:text-black  p-3 w-[60px] h-[60px] rounded-xl`}
        >
          {/* bg-gray-100 dark:bg-[#141414] */}
          {icon}
        </div>
        <div className="flex flex-col items-start ml-4">
          <span className="text-lg font-semibold">{title}</span>
          <span className="text-muted-foreground text-sm">{description}</span>
        </div>
      </div>
    </Card>
  );
};

export default SettingsCard;
