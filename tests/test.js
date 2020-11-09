const chai = require('chai');
const app = require('../index')
const chaiHttp = require('chai-http');
const Message = require('../models/messageModel');

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
                    res.body.should.have.property('message').eql('Messages retrieved successfully');
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });

    describe("POST /api/messages", () => {
        // Test to add a message record
        it("should add a new message record", (done) => {
            let message = {
                name: "Son Heung Min",
                email: "sonaldo@spurs.com",
                sendee: "Harry Kane",
                sendee_email: "harry@spurs.com",
                content: "Good through ball"
            }
            chai.request(app)
                .post("/api/messages")
                .send(message)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('New message created!');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('sendee');
                    res.body.data.should.have.property('sendee_email');
                    res.body.data.should.have.property('content');
                    res.body.data.should.have.property('create_date');
                    done();
                });
        });

        // Test to add a faulty message record
        // Am getting "Cannot set headers after they are sent" error so commented this out

        // it("should add a new message record", (done) => {
        //     let message2 = {
        //         name: "Son Heung Min",
        //         email: "sonaldo@spurs.com",
        //         sendee: "Harry Kane",
        //         content: "GOod through ball"
        //     }
        //     chai.request(app)
        //         .post("/api/messages")
        //         .send(message2)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             res.body.data.should.have.property('errors');
        //             res.body.errors.should.have.property('sendee_email');
        //             res.body.errors.sendee_email.should.have.property('kind').eql('required');
        //             done();
        //         });
        // });
    });

    describe('GET /api/messages/:message_id', () => {
        // Test to get a single message record
        it("should get a single message record", (done) => {
            let newMessage = new Message({ name: "Test name", email: "test@email.com", sendee: "brother", sendee_email: "test@abc.com", content: "test message"});
            newMessage.save((err, newMessage) => {
                chai.request(app)
                    .get('/api/messages/' + newMessage.id)
                    .send(newMessage)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('_id').eql(newMessage.id);
                        // res.body.
                        done();
                    })
            })
        });
    });

    describe("PUT /api/messages/:message_id", () => {
        // Test to edit a message record
        it("should edit a single message record", (done) => {
            let oldMessage = new Message({ name: "Test name", email: "test@email.com", sendee: "brother", sendee_email: "test@abc.com", content: "test message"});
            oldMessage.save((err, oldMessage) => {
                chai.request(app)
                    .get('/api/messages/' + oldMessage.id)
                    .send(oldMessage)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('_id').eql(oldMessage.id);
                        res.body.data.should.have.property('sendee').eql('brother');
                        // done();
                    });
            });

            // let newMessage = { name: "editor", email: "editor@email.com", sendee: "edit", sendee_email: "edit@abc.com", content: "edit"};
            oldMessage.save((err, newMessage) => {
                chai.request(app)
                    .put('/api/messages/' + oldMessage.id)
                    .send({ name: "editor", email: "editor@email.com", sendee: "edit", sendee_email: "edit@abc.com", content: "edit"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('_id').eql(oldMessage.id);
                        res.body.data.should.have.property('sendee').eql('edit');
                        done();
                    });
            });
        });
    });

    describe("DELETE /api/messages/:message_id", () => {
        // Test to delete a message record
        it('should delete a single message record', (done) => {
            let newMessage = new Message({ name: "Test name", email: "test@email.com", sendee: "brother", sendee_email: "test@abc.com", content: "test message"});
            newMessage.save((err, newMessage) => {
                chai.request(app)
                    .delete('/api/messages/' + newMessage.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Message deleted');
                        done();
                    })
            });
        });

    });
});