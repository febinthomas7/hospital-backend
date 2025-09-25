const Joi = require("joi");

const hospitalSchema = Joi.object({
  hospital_id: Joi.number().integer().positive().required(),
  name: Joi.string().max(200).required(),
  location: Joi.string().allow(null, ""),         
  state: Joi.string().max(100).allow(null, ""),
  country: Joi.string().max(100).allow(null, ""),
  npi_id: Joi.string().max(50).required(),                
  org_issued_name: Joi.string().max(100).required(),
  created_at: Joi.date().default(() => new Date(), "time of creation"),
});


const reportSchema = Joi.object({
  report_id: Joi.number().integer().positive().required(),
  patient_adhaar: Joi.string().pattern(/^[0-9]{12}$/).required().required(),
  npi_id: Joi.string().max(50).required(),
  doctor_id: Joi.number().integer().positive().required(),
  date_of_issue: Joi.date().required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().allow(null, ""),
  category: Joi.string().max(100).allow(null, ""),
  created_at: Joi.date().default(() => new Date(), "time of creation"),
});



const patientSchema = Joi.object({
  name: Joi.string().max(100).required(),
  phone_no: Joi.string().pattern(/^[0-9]{10,15}$/).allow(null, ""),
  gmail: Joi.string().email().max(150).required(),
  adhaar_no: Joi.string().pattern(/^[0-9]{12}$/).required(),
  password_hash: Joi.string().max(255).required(),
  date_of_birth: Joi.date().less("now").allow(null),
  gender: Joi.string().valid("Male", "Female", "Other").allow(null, ""),
  address: Joi.string().allow(null, ""),
  emergency_contact_name: Joi.string().max(100).allow(null, ""),
  emergency_contact_relation: Joi.string().max(50).allow(null, ""),
  emergency_contact_phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow(null, ""),
  created_at: Joi.date().default(() => new Date(), "time of creation"),
});


const noticeSchema = Joi.object({
  article_id: Joi.number().integer().positive(),
  title: Joi.string().max(255).required(),
  url: Joi.string().uri().required(),
  date: Joi.date().required(),
  image: Joi.string().uri().allow(null, "")
});


const doctorSchema = Joi.object({
  doctor_id: Joi.number().integer().positive().required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(150).required(),
  password_hash: Joi.string().max(255).required(),
  phone_no: Joi.string().pattern(/^[0-9]{10,15}$/).allow(null, ""),
  date_of_birth: Joi.date().less("now").allow(null),
  address: Joi.string().allow(null, ""),
  specialization: Joi.string().max(100).allow(null, ""),
  npi_id: Joi.string().max(50),
  created_at: Joi.date().default(() => new Date(), "time of creation")
});


const advertisementSchema = Joi.object({
  ad_id: Joi.number().integer().positive(),
  image_url: Joi.string().uri().required(),
  company_name: Joi.string().max(200).required(),
  title: Joi.string().max(200).required(),
  rating: Joi.number().integer().min(1).max(5).default(5),
  website_url: Joi.string().uri().allow(null, ""),
  created_at: Joi.date().default(() => new Date(), "time of creation")
});

module.exports = {hospitalSchema,doctorSchema,reportSchema,noticeSchema,advertisementSchema,patientSchema};





