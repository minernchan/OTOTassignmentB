Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Messages", () => {
    describe("GET /api/messages", () => {
        // Test to get all message records
        it("should get all message records", (done) => {
            chai.request(app)
                .get('/api/messages')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to add a message record

         
    });

    describe("GET /api/messages/:message_id", () => {
        // Test to get a message record
        it("should get a single student record", (done) => {
            var url = window.location.pathname;
            var id = url.substring(url.lastIndexOf('/') + 1);
            chai.request(app)
                .get(`/api/messages/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        
        // Test to edit a message record

        // it("should get a single student record", (done) => {
        //     var url = window.location.pathname;
        //     var id = url.substring(url.lastIndexOf('/') + 1);
        //     chai.request(app)
        //         .get(`/api/messages/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             done();
        //         });
        // });

        // Test to delete a message record
        
        // Test to delete non existent message
        // it("should get a single student record", (done) => {
        //     var url = window.location.pathname;
        //     var id = url.substring(url.lastIndexOf('/') + 1);
        //     chai.request(app)
        //         .get(`/api/messages/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             done();
        //         });
        // });
    });
});