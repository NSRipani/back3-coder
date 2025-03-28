import PetDTO from "../dto/pet.dto.js";
import { petsService } from '../service/index.js'
import __dirname from '../../utils.js';
import { logger } from './../utils/logger.js';

const getAllPets = async(req,res)=>{
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})
}

const getIdPets = async(req,res)=>{
    const {id} = req.params.pid;
    const petsId = await petsService.getBy(id);
    if(!petsId) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:petsId})
}

const createPet = async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}

const updatePet = async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}

const createPetWithImage = async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/assets/${file.filename}`
    });
    logger.info(pet);
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}
export default {
    getAllPets,
    getIdPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}