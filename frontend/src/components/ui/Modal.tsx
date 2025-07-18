import { forwardRef, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type ModalProps = {
  onConfirm: () => Promise<void>;
  children: React.ReactNode;
  closable?: boolean;
};

export const Modal = memo(
  forwardRef<HTMLDialogElement, ModalProps>(
    ({ children, onConfirm, closable }, ref) => {
      const [isLoading, setIsLoading] = useState(false);
      const { t } = useTranslation();

      const closeModal = useCallback(() => {
        setIsLoading(false);
        // @ts-ignore
        ref?.current?.close();
      }, [ref]);

      const handleConfirm = useCallback(async () => {
        try {
          setIsLoading(true);
          await onConfirm();
          closeModal();
        } catch (_e) {
          setIsLoading(false);
        }
      }, [onConfirm, closeModal]);

      return (
        <dialog ref={ref} className="modal" data-testid="modal">
          <div className="modal-box">
            {children}
            {closable && (
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                type="button"
                onClick={closeModal}
                data-testid="modal-close-button"
              >
                X
              </button>
            )}
            <div className="modal-action flex gap-2">
              <button
                type="button"
                className="btn btn-outline"
                data-testid="modal-cancel-button"
                onClick={closeModal}
              >
                {t("Cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={isLoading}
                data-testid="modal-confirm-button"
              >
                {isLoading ? (
                  <span className="loading loading-spinner" />
                ) : null}
                {t("Confirm")}
              </button>
            </div>
          </div>
        </dialog>
      );
    },
  ),
);
