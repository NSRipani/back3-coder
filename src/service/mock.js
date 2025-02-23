import { faker } from "@faker-js/faker";
import { createHash } from "../../utils.js";

class ServiceMock{
    static async generateMockingPets(num) {
        const pets = [];

        // Especies de Mascotas validas
        const validSpecies = ["dog", "cat", "rabbit", "hamster"];
            
        for (let i = 0; pets.length < num; i++) {
            const specie = faker.animal.type();

            // Validamos la especie
            if (validSpecies.includes(specie)) {
                pets.push({
                    name: faker.animal.petName(),
                    specie: specie,
                    asopted: false,
                    birthDate: faker.date.past(),
                    image: "https://via.placeholder.com/150"
                });
            }
        }
        return pets;
    }

    static async generateMockingUsers(num) {
        
        const users = [];
        
        // const pet = pets

        for(let i = 0; i < num; i++) {
            users.push({
                first_name: faker.person.firstName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: []
            })
        }
        return users;
    }
}

export default ServiceMock;