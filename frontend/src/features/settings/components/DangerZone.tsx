import { Modal } from "@/components/ui";
import { Trash2 } from "lucide-react";
import { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteAccount } from "../api";

export const DangerZone: React.FC = memo(() => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { mutateAsync: deleteAccount } = useDeleteAccount();

  const showModal = useCallback(() => {
    modalRef.current?.showModal();
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    await deleteAccount();
  }, [deleteAccount]);

  return (
    <div
      className="flex flex-col gap-4 justify-center"
      data-testid="danger-zone"
    >
      <div className="flex gap-2 items-center justify-between">
        {t("Delete your account")}
        <button
          type="button"
          className="btn btn-error w-40 justify-self-end"
          onClick={showModal}
          data-testid="delete-account-button"
        >
          <Trash2 />
          {t("Delete")}
        </button>
      </div>

      <Modal ref={modalRef} onConfirm={handleConfirmDelete} closable>
        <h3 className="flex gap-2 items-center">
          <Trash2 />
          {t("Delete Account")}
        </h3>
        <p>
          {t(
            "Are you sure you want to delete your account? This action cannot be undone.",
          )}
        </p>
      </Modal>
    </div>
  );
});
