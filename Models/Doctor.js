const DoctorModel = {
  tableName: "Doctors",
  columns: {
    doctor_id: "doctor_id",
    name: "name",
    email: "email",
    password_hash: "password_hash",
    phone_no: "phone_no",
    date_of_birth: "date_of_birth",
    address: "address",
    specialization: "specialization",
    hospital_id: "hospital_id",
    npi_id: "npi_id",
    created_at: "created_at",
  },
};

module.exports = DoctorModel;
