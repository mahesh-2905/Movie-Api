let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
let expect = chai.expect;
 chai.use(chaiHttp);

 describe('Testing the Rest APIs',()=>{
     it('Should return status 200 for healthcheck',(done)=>{
         chai.request('http://localhost:8900')
         .get('/healthcheck')
         .then((res)=>{
             expect(res).to.have.status(200)
             done();
         })
         .catch((err)=>{
             throw err;
         });
     });
     it('Should return status 200 for movies list',(done)=>{
         chai.request('http://localhost:8900')
         .get('/movies')
         .then((res)=>{
             expect(res).to.have.status(200)
             done();
         })
         .catch((err)=>{
             throw err;
         });
     });
     it('Should return status 200 for Latest movies list',(done)=>{
        chai.request('http://localhost:8900')
        .get('/latest')
        .then((res)=>{
            expect(res).to.have.status(200)
            done();
        })
        .catch((err)=>{
            throw err;
        });
    });
    it('Should return status 200 for Upcoming movies list',(done)=>{
        chai.request('http://localhost:8900')
        .get('/upcoming')
        .then((res)=>{
            expect(res).to.have.status(200)
            done();
        })
        .catch((err)=>{
            throw err;
        });
    });
    it('Should return status 200 for Movie types',(done)=>{
        chai.request('http://localhost:8900')
        .get('/movietype')
        .then((res)=>{
            expect(res).to.have.status(200)
            done();
        })
        .catch((err)=>{
            throw err;
        });
    });
    it('Should return status 200 for Movie languages',(done)=>{
        chai.request('http://localhost:8900')
        .get('/movietype')
        .then((res)=>{
            expect(res).to.have.status(200)
            done();
        })
        .catch((err)=>{
            throw err;
        });
    });
    it('Should return status 200 for bookings',(done)=>{
        chai.request('http://localhost:8900')
        .get('/bookings')
        .then((res)=>{
            expect(res).to.have.status(200)
            done();
        })
        .catch((err)=>{
            throw err;
        });
    });
 });