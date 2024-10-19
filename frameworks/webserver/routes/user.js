import userController from "../../../adapters/controllers/userController.js";
import userDbRepository from "../../../application/repositories/userDbRepository.js";
import userDbRepositoryMongoDB from "../../database/mongoDB/repositories/userRepositoryMongoDB.js";
import authServiceInterface from "../../../application/services/authService.js";
import authServiceImpl from "../../services/authService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export default function userRouter(express) {
  const router = express.Router();

  const controller = userController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // POST
  router.route("/").post(controller.addNewUser);
  router.route("/findByIds").post(controller.findByIds);

  // GET
  router.route("/").get(controller.getAllUsers);
 
  // PUT
  router.route("/:id").put(controller.updateById);

  return router;
}
