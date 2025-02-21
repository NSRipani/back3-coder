import { Schema, model, Types} from 'mongoose';

const collection = 'Pets';

const schema = new Schema({
    name:{ type:String, required:true,},
    specie:{ type:String, required:true },
    birthDate:Date, adopted:{ type:Boolean, default:false },
    owner:{ type: Types.ObjectId, ref:'Users'},
    image:String
})

const petModel = model(collection,schema);

export default petModel;