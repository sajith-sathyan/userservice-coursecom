export default function userRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (user) => repository.add(user);
  const deleteById = (id) => repository.deleteById(id);
  const getAll = () => repository.getAll();
  const updateById = (id, newData) => repository.updateById(id, newData); 

  const findByIds = (ids) => repository.findByIds(ids); 

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteById,
    getAll,
    updateById,
    findByIds, 
  };
}
