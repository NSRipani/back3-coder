import { petsService, usersService } from '../service/index.js';
import ServiceMock from '../service/mock.js'

const mockingPets = async (req, res) => {
    const pets = await ServiceMock.generateMockingPets(100);
    res.send({status: "success", payload: pets});
}

const mockingUsers = async (req, res) => {
    const users = await ServiceMock.generateMockingUsers(50);
    res.send({status: "success", payload: users});
}

const dataGenerated = async (req, res) => {
    const { users, pets } = req.body;

    try {
        // Validación
        if (!users || !pets || users <= 0 || pets <= 0) {
            return res.status(400).send({ status: "error", message: "Los parámetros de 'users' y 'pets' deben ser números positivos." });
        }

        // Generar datos simulados
        const mockedUsers = await ServiceMock.generateMockingUsers(users);
        const mockedPets = await ServiceMock.generateMockingPets(pets);

        // Guardar usuarios en la base de datos usando save
        for (const user of mockedUsers) {
            await usersService.create(user);
        }

        // Guardar mascotas en la base de datos usando save
        for (const pet of mockedPets) {
            await petsService.create(pet);
        }

        res.send({ status: "success", message: "Datos insertados correctamente en la DB." });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export default { mockingPets, mockingUsers, dataGenerated };