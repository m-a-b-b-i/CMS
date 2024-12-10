const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");

const {
  createNewTime,
  updateNamazTime,
  getAllNamazTime,
  getNamazTime,
} = require("../../controllers/MosqueController");

router
  .route("/")
  .get(getAllNamazTime)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    createNewTime
  )
  .put(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    updateNamazTime
  );

router
  .route("/:userId")
  .get(verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), getNamazTime);

module.exports = router;
