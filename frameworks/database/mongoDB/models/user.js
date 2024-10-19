import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  
  
  },
  role: {
    type: String,
    default: 'user'
  },
  status: {
    type: Boolean,
   
  },
    
});

UserSchema.index({ role: 1 });

const UserModel = mongoose.model('User', UserSchema);

UserModel.createIndexes()
  .then(() => console.log('Indexes created successfully'))
  .catch((err) => console.error('Error creating indexes:', err));

export default UserModel;
