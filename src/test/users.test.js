import Users from "../dao/user.dao.js"; // Importar el DAO de Usuarios
import mongoose from "mongoose"; // Importar mongoose para la conexión a la base de datos
import assert from "assert"; // Importar assert para las afirmaciones en las pruebas
import { describe, it, before, beforeEach } from "mocha"; // Importar funciones de Mocha para estructurar las pruebas

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb+srv://nsripani:backend3@dbbackend3coder.wr9ah.mongodb.net/?retryWrites=true&w=majority&appName=DBBackend3Coder");

describe("Users DAO", () => {
    before(function() {
        this.usersDao = new Users(); // Inicializar el DAO de Usuarios antes de las pruebas
    });

    beforeEach(function() {
        mongoose.connection.collections.users.drop(); // Eliminar la colección de usuarios antes de cada prueba
        this.timeout(5000); // Establecer el tiempo de espera a 5 segundos para cada prueba
    });

    it("El Dao debe poder obtener los usuarios en formato de arreglo", async function() {
        const result = await this.usersDao.get(); // Obtener todos los usuarios
        assert.strictEqual(Array.isArray(result), true); // Afirmar que el resultado es un arreglo
    });

    it("El Dao debe agregar correctamente un elemento a la base de datos", async function() {
        const user = {
            first_name: "Maxi",
            last_name: "Rosanda",
            email: "maxi_rosanda@hotmail.com",
            password: "123456"
        };
        const result = await this.usersDao.save(user); // Guardar un nuevo usuario
        assert.strictEqual(result.first_name, user.first_name); // Afirmar que el nombre del usuario guardado coincide
    });

    it("Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto", async function() {
        const user = {
            first_name: "Maxi",
            last_name: "Rosanda",
            email: "maxi_rosanda@hotmail.com",
            password: "123456"
        };
        const result = await this.usersDao.save(user); // Guardar un nuevo usuario
        assert.deepStrictEqual(result.pets, []); // Afirmar que el arreglo de mascotas del usuario está vacío por defecto
    });

    it("El Dao puede obtener a un usuario por email", async function() {
        const user = {
            first_name: "Maxi",
            last_name: "Rosanda",
            email: "maxi_rosanda@hotmail.com",
            password: "123456"
        };
        const userCreated = await this.usersDao.save(user); // Guardar un nuevo usuario
        const userFound = await this.usersDao.getBy({ email: userCreated.email }); // Obtener usuario por email
        assert.strictEqual(userFound.email, userCreated.email); // Afirmar que el email del usuario encontrado coincide
    });
});
