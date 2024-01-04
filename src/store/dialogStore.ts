import { create } from "zustand";

type Dialogs = "createUser" | "editUser" | "createRent";

type DialogStore = {
  open?: Dialogs;
  isOpen: (dialog: Dialogs) => boolean;
  openDialog: (dialog: Dialogs) => void;
  closeDialog: () => void;
};

export const useDialog = create<DialogStore>((set, get) => ({
  open: undefined,
  isOpen: (dialog: Dialogs) => get().open === dialog,
  openDialog: (dialog: Dialogs) => {
    if (!get().open) {
      set(() => ({ open: dialog }));
    }
  },
  closeDialog: () => {
    set(() => ({ open: undefined }));
  },
}));
