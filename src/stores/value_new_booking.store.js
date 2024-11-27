import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "main", // ID của store (bắt buộc)
  state: () => ({
    selectedDtoc: "",
    sub_name: "",
    first_name: "",
    name_mate: "",
    selectedRelate: "",
    phone_mate: "",
    selectedDay: "",
    selectedMonth: "",
    selectedYear: "",
    selectedGender: "",
    selectedMajor: "",
    selectedProvince: "",
    selectedDistrict: "",
    email: "",
    email_mate: "",
    number_phone: "",
    citizen_id: "",
    commune: "",
    address: "",
  }),
  actions: {
    updateValues(values) {
      Object.assign(this, values);
    },
  },
});
