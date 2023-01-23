import mongoose from 'mongoose'


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  id: ObjectId,
  first: String,
  otherNames: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
//   indexing: { type: Number, min: 18, index: true },
});

const UserModel = mongoose.model('User', User);

export default UserModel;
