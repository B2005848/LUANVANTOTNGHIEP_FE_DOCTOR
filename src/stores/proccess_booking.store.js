import { defineStore } from "pinia";

export const useProccess = defineStore({
  id: "processStore",
  state: () => ({
    currentStep: 1,
  }),
  actions: {
    setStep(newStep) {
      this.currentStep = newStep;
    },
  },
});
