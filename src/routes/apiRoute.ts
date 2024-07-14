import { Router } from "express";
import { transkripController } from "../controller/transkipController/transkipController";
import verifyAdmin from "../middleware/verify-admin";
import verifyUser from "../middleware/verify-user";
import { validateRequestSchema } from "../middleware/validate-request";
import getPaginateSchema from "../schema/get-paginate-validation";
import postTranskripSchema from "../schema/post-transkrip-validation";
import putTranskripSchema from "../schema/put-transkrip-validation";
import idSchema from "../schema/id-validation";

const router = Router();

router.get(
  "/transkrip",
  verifyAdmin,
  getPaginateSchema,
  validateRequestSchema,
  transkripController.get
);

// get by id
router.get(
  "/transkrip/:id",
  verifyAdmin,
  idSchema.schemaParam,
  validateRequestSchema,
  transkripController.getById
);

// get by mahasiswas id
router.get(
  "/transkrip/mahasiswa/:id",
  verifyUser,
  idSchema.schemaParam,
  validateRequestSchema,
  transkripController.getByIdMahasiswa
);

router.post(
  "/transkrip",
  verifyAdmin,
  postTranskripSchema,
  validateRequestSchema,
  transkripController.post
);

router.put(
  "/transkrip",
  verifyAdmin,
  putTranskripSchema,
  validateRequestSchema,
  transkripController.put
);

router.delete(
  "/transkrip",
  verifyAdmin,
  idSchema.schemaQuery,
  validateRequestSchema,
  transkripController.delete
);

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
