import { create } from "zustand";

type FeatureStore = {
  inViewFeatures: string | null;
  setInViewFeatures: (feature: string | null) => void;
  fullScreenFeatures: string | null;
  setFullScreenFeatures: (feature: string | null) => void;
  lastFullScreenFeatures: string | null;
  setLastFullScreenFeatures: (feature: string | null) => void;
};

export const useFeatureStore = create<FeatureStore>((set) => ({
  //init state
  inViewFeatures: null,
  fullScreenFeatures: null,
  lastFullScreenFeatures: null,

  //setters
  setInViewFeatures: (feature: string | null) =>
    set(() => ({ inViewFeatures: feature })),
  setFullScreenFeatures: (feature: string | null) => {
    set(() => ({ fullScreenFeatures: feature }));
    if (feature !== null) {
      set(() => ({ lastFullScreenFeatures: feature }));
    }
  },
  setLastFullScreenFeatures: (feature: string | null) =>
    set(() => ({ lastFullScreenFeatures: feature })),
}));

type ContactFormStore = {
  isContactFormOpen: boolean;
  openContactForm: () => void;
  closeContactForm: () => void;
  toggleContactForm: () => void;
  setContactFormOpen: (isOpen: boolean) => void;
};

export const useContactFormStore = create<ContactFormStore>((set) => ({
  isContactFormOpen: false,
  openContactForm: () => set(() => ({ isContactFormOpen: true })),
  closeContactForm: () => set(() => ({ isContactFormOpen: false })),
  toggleContactForm: () =>
    set((state) => ({ isContactFormOpen: !state.isContactFormOpen })),
  setContactFormOpen: (isOpen: boolean) =>
    set(() => ({ isContactFormOpen: isOpen })),
}));
