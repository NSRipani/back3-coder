import {Schema, model, Types} from 'mongoose';

const collection = 'Users';

const schema = new Schema({
    first_name:{ type: String, required:true},
    last_name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    role: { type:String, default:'user' },
    pets:{ type:[
            { 
                _id:{ type: Types.ObjectId, ref:'Pets' }
            }
        ], default:[] }}
    )

const userModel = model(collection,schema);

export default userModel;