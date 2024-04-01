import { useCreateModal } from "@/hooks/use-create-modal";
import Modal from "@/components/ui/modal";
import CreateForm from "./_components/form";

// import { useTranslation } from "react-i18next";

const CreateModal = () => {
  const createModal = useCreateModal();
  // const { t } = useTranslation();

  return (
    <Modal
      // title={t("Create course 🧩")}
      title="Create course 🚀"
      // description={t("Add a new course and start getting paid.")}
      description="Add a new course and start getting paid."
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
    >
      {/* Content */}
      <div>
        <CreateForm close={createModal.onClose} />
      </div>
    </Modal>
  );
};

export default CreateModal;
