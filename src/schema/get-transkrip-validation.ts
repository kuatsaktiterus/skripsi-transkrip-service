import { query } from "express-validator";

const schema = [
  query("id")
    .isString()
    .withMessage("id must be a string")
    .notEmpty()
    .withMessage("id must not be empty"),
];

export default schema;
