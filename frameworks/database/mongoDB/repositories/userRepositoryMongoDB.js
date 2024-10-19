import UserModel from "../models/user.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function userRepositoryMongoDB() {
  const findByProperty = (params) =>
    UserModel.find(omit(params, "page", "perPage"))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const countAll = (params) =>
    UserModel.countDocuments(omit(params, "page", "perPage"));

  const findById = (id) => UserModel.findById(id).select("-password");

  const add = (userEntity) => {
    const newUser = new UserModel({
      username: userEntity.getUserName(),
      password: userEntity.getPassword(),
      email: userEntity.getEmail(),
      role: userEntity.getRole(),
      status: userEntity.getStatus(),
      createdAt: new Date(),
    });

    return newUser.save();
  };

  const getAll = () => UserModel.find();

  const updateById = (userId, newData) => {
    return UserModel.findByIdAndUpdate(userId, newData, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return new Error(`User with ID ${userId} not found`);
        }
        return updatedUser;
      })
      .catch((error) => {
        return new Error(`Error updating user with ID ${userId}: ${error.message}`);
      });
  };

  
  const findByIds =async(ids) => {
    return await UserModel.find({ _id: { $in: ids } });
  }

  return {
    findByProperty,
    countAll,
    findById,
    add,
    getAll,
    updateById,
    findByIds
  }
}
