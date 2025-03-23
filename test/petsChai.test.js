import * as chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest('http://localhost:3000');

describe('Testing Adoptme', () => {
    let idPet = null;
    const petMock = {
        name:"Gala",
        specie:"dog",
        birthDate:"2021-01-01"
    }
    describe('Test pets', () => {
        it('Debe crear una mascota (POST /api/pets)', async () => {

            const {statusCode, ok, _body} = await request.post('/api/pets').send(petMock);
            
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
            expect(_body.payload).to.have.property('adopted',false);
            
            idPet = _body.payload._id; // Corregido: Asignar idPet correctamente

        })

        it('Debe crear una mascota con imagen (POST /api/pets/withimage)', async () => {
            const {statusCode,ok,_body} = await request.post('/api/pets/withimage')
            .field('name',petMock.name)
            .field('specie',petMock.specie)
            .field('birthDate',petMock.birthDate)
            .attach('image','./assets/pet.jpg');
            
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
        })

        it('Debe devolver error 400 al crear una mascota sin nombre (POST /api/pets)', async () => {
            const petMock = {
                specie:"dog",
                birthDate:"2021-01-01"
            }
            const {statusCode, ok, _body} = await request.post('/api/pets').send(petMock);
            expect(statusCode).to.be.equal(400);
        })

        it('(GET /api/pets), debe tener los campos status y payload. Además, payload debe ser de tipo arreglo', async ()=>{
            const {statusCode, ok, _body} = await request.get('/api/pets');

            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status','success');
            expect(_body).to.have.property('payload');
            expect(Array.isArray(_body.payload)).to.be.true;            
        })

        it('PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos).', async () => {
            if (!idPet) throw new Error('No se ha creado una mascota');
            
            const updatePet = { name: "pepe" };
            
            const {statusCode, ok, _body} = await request.put(`/api/pets/${idPet}`).send(updatePet);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status', 'success');
            
            const {statusCode: statusCodeGet, ok: okGet, _body: _bodyGet} = await request.get(`/api/pets/${idPet}`);
            expect(statusCodeGet).to.be.equal(200);
            expect(okGet).to.be.equal(true);
            expect(_bodyGet.payload).to.have.property("name", "pepe");
        })

        it('Debe eliminar correctamente una mascota (DELETE /api/pets/:id)', async () => {
            if (!idPet) throw new Error('No se ha creado una mascota');
            
            const {statusCode, ok, _body} = await request.delete(`/api/pets/${idPet}`);
            expect(statusCode).to.be.equal(200);
            expect(ok).to.be.equal(true);
            expect(_body).to.have.property('status', 'success');
            
            const {statusCode: statusCodeGet, ok: okGet, _body: _bodyGet} = await request.get(`/api/pets/${idPet}`);
            expect(statusCodeGet).to.be.equal(404);
            expect(okGet).to.be.equal(false);
        })
    })
})