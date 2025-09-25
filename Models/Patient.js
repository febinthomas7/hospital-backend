const PatientModel = {
  tableName: "Patients",
  columns: {
    patient_id: "patient_id",
    name: "name",
    phone_no: "phone_no",
    gmail: "gmail", // just the column name
    adhaar_no: "adhaar_no",
    password_hash: "password_hash",
    date_of_birth: "date_of_birth",
    gender: "gender",
    address: "address",
    blood_group: "blood_group",
    emergency_contact_name: "emergency_contact_name",
    emergency_contact_relation: "emergency_contact_relation",
    emergency_contact_phone: "emergency_contact_phone",
    created_at: "created_at",
  },
};

module.exports = PatientModel;
