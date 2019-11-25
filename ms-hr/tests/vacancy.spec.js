const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const assert = require('assert');
const should = chai.should();

const server = require('..');

chai.use(chaiHttp);

describe('Test Vacancy', () => {
    describe('/Get Vacancies', () => {
        it('should return 404', (done => {
            chai
                .request(server)
                .get('/admin/v1/vacancies')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        }));
    });
});
