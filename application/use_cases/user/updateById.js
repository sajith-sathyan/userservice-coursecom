export default function updateUserById(userId, newData, userRepository) {
    return userRepository.findById(userId)
      .then((user) => {
        if (!user) {
          return new Error(`User with ID ${userId} not found`);
        }
        const updatedUser = { ...newData };
        return userRepository.updateById(userId, updatedUser);
      });
  }
  