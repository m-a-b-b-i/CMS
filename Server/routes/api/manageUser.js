const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/manageUser");
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const upload = require("../../middleware/multer");

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.getAllUsers
);

router.get("/:id", registerController.getUser);

router.post("/", upload.single("file"), registerController.handleNewUser);

router.post(
  "/adminregister",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  upload.single("file"),
  registerController.handleNewUserByAdmin
);

router.put("/:id", upload.single("file"), registerController.updateUser);
router.delete(
  "/:user",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.deleteUser
);
router.patch("/changePassword", registerController.changePassword);
router.patch(
  "/verify",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.verifyUser
);

module.exports = router;
