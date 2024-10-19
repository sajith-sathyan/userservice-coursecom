export default function login(email, password, userDbRepository, authService) {
  if (!email || !password) {
    const error = new Error('Email and password fields cannot be empty');
    error.statusCode = 401;
    throw error;
  }

  return userDbRepository.findByProperty({ email })
    .then((user) => {
      
      if (!user.length) {
        const error = new Error('Invalid email');
        error.statusCode = 401;
        throw error;
      }

      if (user[0].status === false) {
        const error = new Error('Your Account Was Blocked');
        error.statusCode = 401;
        throw error;
      }

      const isMatch = authService.compare(password, user[0].password);
      if (!isMatch) {
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error;
      }

      const payload = {
        user: {
          id: user[0].id,
        }
      };

      const token = authService.generateToken(payload);

      return { user: user[0], token };
    });
}
