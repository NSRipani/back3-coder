import { adoptionsService, petsService, usersService } from '../service/index.js'
import { logger } from './../utils/logger.js';

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({_id:adoptionId})
        if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
        res.send({status:"success",payload:adoption})
    } catch (error) {
        logger.error(error)
        res.status(500).send({status:"error",error:"Internal server error"})
    }
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.send({status:"success",message:"Pet adopted"})
    logger.info(`User ${user._id} adopted pet ${pet._id}`)
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}