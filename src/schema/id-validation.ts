import { query, param } from "express-validator";

const schemaQuery = [
  query("id")
    .isString()
    .withMessage("id must be an string")
    .notEmpty()
    .withMessage("id must not be empty"),
];

const schemaParam = [
  param("id")
    .isString()
    .withMessage("id must be an string")
    .notEmpty()
    .withMessage("id must not be empty"),
];

export default { schemaQuery, schemaParam };
