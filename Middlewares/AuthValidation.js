const Joi = require("joi");
const signinValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    gmail: Joi.string()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      .required(),
    password: Joi.string().min(4).max(100).required(),
    adhaar_no: Joi.string().min(12).max(20).required(), // optional validation
    phone_no: Joi.string().min(10).max(15).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
      message: "Invalid input",
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    adhaar_no: Joi.string().min(12).max(20).required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  signinValidation,
  loginValidation,
};
