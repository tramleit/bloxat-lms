import React, { useState } from "react";
import { AddIntegrationIdModal } from "@/components/modals/paymob-integration/add-integration-id-modal";
import { EditIntegrationIdModal } from "@/components/modals/paymob-integration/edit-integration-id";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";

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
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  // For Add Integration Id modal
  const [openAdd, setOpenAdd] = useState(false);
  // For Edit Integration Id modal
  const [openEdit, setOpenEdit] = useState(false);

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
  console.log("NOW", isEnabled);

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
      <Card className="p-6 h-full hover:shadow-md transition-all duration-150 ease-in-out">
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
                <>
                  <p className="text-muted-foreground text-sm">
                    Integration ID: {integrationID}
                  </p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="ml-2"
                    disabled={disabledInputs}
                    onClick={() => setOpenEdit(true)}
                  >
                    {/* <Edit className="h-4 w-4" /> */}
                    Edit
                  </Button>
                </>
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
