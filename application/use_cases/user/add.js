import user from '../../../src/entities/user.js';

export default function addUser(
  username,
  password,
  email,
  role,
  status,
  createdAt,
  userRepository,
  authService
) {
  const newUser = user(
    username,
    authService.encryptPassword(password),
    email,
    role,
    status,
    createdAt
  );

  return userRepository
    .findByProperty({ username })
    .then((userWithUsername) => {
      if (userWithUsername.length) {
        throw new Error(`User with username: ${username} already exists`);
      }
      return userRepository.findByProperty({ email });
    })
    .then((userWithEmail) => {
      if (userWithEmail.length) {
        throw new Error(`User with email: ${email} already exists`);
      }
      return userRepository.add(newUser).then((addedUser) => {
    
        const payload = {
          user: {
            id: addedUser._id,
          }
        };
        const token = authService.generateToken(payload);
        return { user: addedUser, token };
      });
    });
}
