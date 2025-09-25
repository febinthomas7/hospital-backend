// models/HospitalModel.js

const HospitalModel = {
  tableName: "Hospitals",
  columns: {
    hospital_id: "hospital_id",
    name: "name",
    location: "location",
    state: "state",
    country: "country",
    npi_id: "npi_id",
    org_issued_name: "org_issued_name",
    password: "password", // 🔹 Add this

    created_at: "created_at",
  },
};

module.exports = HospitalModel;
