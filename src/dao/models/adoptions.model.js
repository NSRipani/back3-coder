import { Schema, model, Types} from "mongoose";


const collection = "Adoptions";

const schema = new Schema({
    owner:{ type: Types.ObjectId, ref:'Users' },
    pet:{ type: Types.ObjectId, ref:'Pets' }
})

const adoptionModel = model(collection,schema);

export default adoptionModel;