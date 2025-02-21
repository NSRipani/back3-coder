import Users from "../dao/user.dao.js";
import Pet from "../dao/pet.dao.js";
import Adoption from "../dao/adoption.dao.js";

import UserRepository from "../repository/userRepositor.js";
import PetRepository from "../repository/petRepository.js";
import AdoptionRepository from "../repository/adoptionRepository.js";

export const usersService = new UserRepository(new Users());
export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());