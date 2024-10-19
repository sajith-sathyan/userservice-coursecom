export default function findByIdsUseCase(userRepository, ids) {
  
    return userRepository.findByIds(ids);
  }
  