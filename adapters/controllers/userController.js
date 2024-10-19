import addUserUseCase from "../../application/use_cases/user/add.js";
import getAllUsersUseCase from "../../application/use_cases/user/getAllUsers.js";
import updateUserByIdUseCase from "../../application/use_cases/user/updateById.js";
import findByIdsUseCase from "../../application/use_cases/user/findByIds.js";
export default function userController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const addNewUser = (req, res, next) => {
    const dbRepository = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    const { name, password, email, status, role, createdAt } = req.body;

    addUserUseCase(
      name,
      password,
      email,
      role,
      status,
      createdAt,
      dbRepository,
      authService
    )
      .then((user) => res.json(user))
      .catch((error) => {
        res.json({ error: error.message });
      });
  };
  const getAllUsers = (req, res, next) => {
    const dbRepository = userDbRepository(userDbRepositoryImpl());
    getAllUsersUseCase(dbRepository, authServiceImpl)
      .then((users) => res.json(users))
      .catch((error) => {
        res.json({ error: error.message });
      });
  };

  const updateById = (req, res, next) => {
    const dbRepository = userDbRepository(userDbRepositoryImpl());
    const userId = req.params.id;
    console.log(userId);
    console.log(req.body);
    const { username, password, email, status, role } = req.body;

    updateUserByIdUseCase(
      userId,
      { username, password, email, status, role },
      dbRepository
    )
      .then((updatedUser) => {
        console.log("updatedUser-->", updatedUser);
        res.json(updatedUser);
      })
      .catch((error) => res.json({ error: error.message }));
  };
  const findByIds = (req, res, next) => {
    const {ids} = req.body
   
    const dbRepository = userDbRepository(userDbRepositoryImpl());
    findByIdsUseCase(dbRepository,ids)
    .then((users) =>{ 
      res.json(users)
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
  };
  return {
    addNewUser,
    getAllUsers,
    updateById,
    findByIds,
  };
}
