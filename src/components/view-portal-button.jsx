import { Button } from "@/components/ui/button";
import { PORTAL_URL } from "@/config/url-config";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

function ViewPortalButton({ brandSlug }) {
  const { t } = useTranslation();

  return (
    <Button
      // disabled={loading}
      variant="outline"
      className="md:space-x-2"
      onClick={() => {
        // Open portal of the brand in a new tab
        window.open(`${PORTAL_URL}/${brandSlug}`, "_blank");
      }}
    >
      <Eye className="h-4 w-4" />
      <span className="md:flex hidden">{t("View Portal")}</span>
    </Button>
  );
}

export default ViewPortalButton;
