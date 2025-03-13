import supertest from 'supertest';
import * as chai from 'chai';

const expect = chai.expect; 
const requester = supertest("http://localhost:8080"); 

describe("Router de Adopciones", () => {
    describe("GET /api/adoptions", () => {
        it("Deberia retornar una lista de adopciones", async () => {
            const {status} = await requester.get("/api/adoptions"); 

            expect(status).to.equal(200); 
        })

        it("Retorna 404 si la ruta no existe", async () => {
            const {status} = await requester.get("/adoptions/noexiste");
            expect(status).to.equal(404); 
        })  
        
        it("Debería devolver la respuesta como JSON", async () => {
            const { headers } = await requester.get("/api/adoptions");
            expect(headers["content-type"]).to.include("application/json");
        });
    })

    describe("GET /api/adoptions/:aid", () => {
        it("Retorna la info de una adopción existente", async () => {
            let aid = "6781e7e37c46d8258be2e4b6"; 

            const {status} = await requester.get(`/api/adoptions/${aid}`); 
            expect(status).to.equal(200); 
        })

        
        it("Retornar 404 si la adopcion no existe", async () => {
            let noExisteAid = "67626d05a3f6fa3a7145f729"; 
            const {status} = await requester.get(`/api/adoptions/${noExisteAid}`); 

            expect(status).to.equal(404);
        })

        it("Debería retornar un código de estado 200 para una adopción válida", async () => {
            const validAid = "6781e7e37c46d8258be2e4b6"; 
            const { status } = await requester.get(`/api/adoptions/${validAid}`);
            
            expect(status).to.equal(200);
        });

        it("Debería retornar un objeto con los datos de la adopción", async () => {
            const validAid = "6781e7e37c46d8258be2e4b6"; 
            const { body } = await requester.get(`/api/adoptions/${validAid}`);
        
            const adoption = body.payload;
        
            // Verificamos que el cuerpo de la respuesta tenga las propiedades correctas en "payload"
            expect(adoption).to.have.property("_id");
            expect(adoption).to.have.property("pet");
            expect(adoption).to.have.property("owner");
        });
        
    })

    describe("GET /api/adoptions/:uid/:pid", () => {
        it("Crear una adopción", async () => {
            
            let uid = "6756e6c749392f692fe0fd1d";
            let pid = "6756e6c849392f692fe0fd37";

            const {status} = await requester.post(`/api/adoptions/${uid}/${pid}`);

            expect(status).to.equal(200);
        })

        it("Devolver 404 si la mascota no existe", async () => {
            let nonExistentUid = "6756e6c749392f692fe0fd1d";
            let nonExistentPid = "000000000000000000000000";
            const {status} = await requester.post(`/api/adoptions/${nonExistentUid}/${nonExistentPid}`);
            expect(status).to.equal(404);
        });

        it("Devolver 404 si el usuario no existe", async () => {
            let nonExistentUid = "000000000000000000000000";
            let nonExistentPid = "6756e6c849392f692fe0fd37";
            const {status} = await requester.post(`/api/adoptions/${nonExistentUid}/${nonExistentPid}`);
            expect(status).to.equal(404);
        });

        it("Devolver 400 si la mascota ya fue adoptada", async () => {
            let uid = "6756e6c749392f692fe0fd1d";
            let pid = "6756e6c849392f692fe0fd37";
            const {status} = await requester.post(`/api/adoptions/${uid}/${pid}`);
            expect(status).to.equal(400);
        });

    })
})