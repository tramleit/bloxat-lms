import { Icons } from "@/components/icons";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProviderCard = ({
  title,
  description,
  logo,
  onConnect,
  onEdit,
  onDisconnect,
  connected,
  loading,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // For Delete Alert Modal
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDisconnect}
        loading={loading}
      />
      <Card className="flex flex-col h-[155px] p-6 items-start justify-between hover:shadow-md transition-all duration-150 ease-in-out dark:bg-[#141414]">
        {/* h-[185px] */}
        <div className="flex flex-col items-start space-y-1.5">
          <img
            src={logo}
            alt={title}
            className="w-[100px] h-auto"
            draggable={false}
          />
          {/* <CardTitle className="text-base font-semibold">{title}</CardTitle> */}
        </div>
        <div className="h-2" />
        <CardDescription>{description}</CardDescription>

        <div className="mt-auto">
          {/* If the provier is connected show connected and the edit button */}
          {connected && (
            <div className="flex flex-row items-center space-x-3">
              {/* Connected */}

              {!isHovered && (
                <span
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="bg-[#effbf1] dark:bg-[#08290d] text-[#2c8e41] dark:text-green px-3 py-2 rounded-md text-sm select-none"
                >
                  {t("Connected")}
                </span>
              )}

              {/* Disconnect button */}
              {isHovered && (
                <Button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  variant="destructive"
                  onClick={() => setOpen(true)}
                  disabled={loading}
                >
                  {t("Disconnect")}
                </Button>
              )}
              <Button variant="outline" onClick={onEdit} disabled={loading}>
                {t("Edit")}
              </Button>
            </div>
          )}
          {/* If not connected then show the connect button */}
          {!connected && (
            <Button variant="outline" onClick={onConnect} disabled={loading}>
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("Connect")}
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default ProviderCard;
