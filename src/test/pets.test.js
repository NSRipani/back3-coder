import Pet from '../dao/pet.dao.js';
import mongoose from "mongoose";
import { describe, it, before, beforeEach } from "mocha";
import assert from "assert"; 

mongoose.connect("mongodb+srv://nsripani:backend3@dbbackend3coder.wr9ah.mongodb.net/?retryWrites=true&w=majority&appName=DBBackend3Coder")

describe("Pets DAO", () => {
    before(function(){
        this.petsDao = new Pet();
    })
    beforeEach(function(){
        mongoose.connection.collections.pets.drop()
        this.timeout(5000)
    })

    it("El Dao debe poder obtener las mascotas en formato de arreglo",async function(){
        const result = await this.petsDao.get();
        assert.strictEqual(Array.isArray(result), true); 

    })
    it("El Dao debe agregar correctamente un elemento a la base de datos",async function(){
        const pet = {
            name: "Tom",
            specie: "Cat",
            birthDate: new Date()
        }
        const result = await this.petsDao.save(pet);
        assert.strictEqual(result.name, pet.name); 
    })
    it("Al agregar una nueva mascota, éste debe crearse con un arreglo de mascotas vacío por defecto",async function(){
        const pet = {
            name: "Tom",
            specie: "Cat",
            birthDate: new Date()
        }
        const result = await this.petsDao.save(pet);
        const raza = await this.petsDao.getBy({ specie: result.specie })
        assert.strictEqual(raza.specie, result.specie);

    })
})