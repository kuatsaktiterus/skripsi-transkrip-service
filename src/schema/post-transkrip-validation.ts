import { body } from "express-validator";

const schemaBody = [
  body("id_mahasiswa")
    .isString()
    .withMessage("id_mahasiswa must be a string")
    .notEmpty()
    .withMessage("id_mahasiswa must not be empty"),
  body("id_mataKuliah")
    .isString()
    .withMessage("id_mataKuliah must be a string")
    .notEmpty()
    .withMessage("id_mataKuliah must not be empty"),
  body("id_nilai")
    .isString()
    .withMessage("id_nilai must be a string")
    .notEmpty()
    .withMessage("id_nilai must not be empty"),
];

export default schemaBody;
