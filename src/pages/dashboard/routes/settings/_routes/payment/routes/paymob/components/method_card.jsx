import { useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AddIntegrationIdModal } from "@/components/modals/paymob-integration/add-integration-id-modal";
import { EditIntegrationIdModal } from "@/components/modals/paymob-integration/edit-integration-id";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { EditIntegrationIFrameModal } from "@/components/modals/paymob-integration/edit-integration-iframe";

const MethodCard = ({
  title,
  icon,
  width,
  enabled,
  integrationID,
  switchMethod,
  disabledInputs,
  switchId,
  enabledName,
  iframeRequired,
  initialIFrameID,
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  // For Add Integration Id modal
  const [openAdd, setOpenAdd] = useState(false);
  // For Edit Integration Id modal
  const [openEdit, setOpenEdit] = useState(false);
  // For Edit Integration Id + Iframe modal
  const [openEditBoth, setOpenEditBoth] = useState(false);

  const { t } = useTranslation();

  const handleSwitchToggle = () => {
    // if there's an integration id then we can toggle

    if (integrationID) {
      // Toggle the switch state
      setIsEnabled(!isEnabled);
      switchMethod();
    } else {
      // if there's no integration id then we'll add one first and enable after it's added
      setOpenAdd(true);
    }
  };
  // console.log("NOW", isEnabled);

  return (
    <>
      <AddIntegrationIdModal
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        title={`Add ${title} Live ID`}
        idName={switchId}
        enabledName={enabledName}
        initialIDValue={integrationID}
        // onConfirm={onDisconnect}
        // loading={loading}
      />
      <EditIntegrationIdModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        title={`Edit ${title} Live ID`}
        idName={switchId}
        initialIDValue={integrationID}
        // onConfirm={onDisconnect}
        // loading={loading}
      />
      {/* Edit Integration and Iframe if a method requries both */}

      <EditIntegrationIFrameModal
        isOpen={openEditBoth}
        onClose={() => setOpenEditBoth(false)}
        title={`Edit ${title} Live ID`}
        idName={switchId}
        initialIDValue={integrationID}
        initialIFrameID={initialIFrameID}
        // onConfirm={onDisconnect}
        // loading={loading}
      />
      <Card className="p-6 h-full hover:shadow-md transition-all duration-150 ease-in-out dark:bg-[#141414]">
        <div className="flex flex-row items-start justify-between h-full">
          <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-col items-start space-y-3">
              <h2 className="text-md font-semibold">{title}</h2>
              <img
                src={icon}
                alt="Cards"
                draggable={false}
                className={`${width} bg-white rounded-md px-2 py-2`}
              />
            </div>
            <div className="h-2"></div>
            <div className="flex flex-row items-center mt-auto">
              {/* If there's an integration id already then edit */}

              {integrationID && (
                <Button
                  variant="ghost"
                  size="small"
                  className="p-2"
                  disabled={disabledInputs}
                  onClick={() => {
                    if (iframeRequired) {
                      setOpenEditBoth(true);
                    } else {
                      setOpenEdit(true);
                    }
                  }}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  {t("Edit")}
                </Button>
              )}
            </div>
          </div>
          <Switch
            className={isEnabled ? "data-[state=checked]:bg-green" : ""}
            id={switchId}
            checked={isEnabled}
            onCheckedChange={handleSwitchToggle}
            disabled={disabledInputs}
          />
        </div>
      </Card>
    </>
  );
};

export default MethodCard;
