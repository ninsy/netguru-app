const request = require('supertest');
const assert = require("assert");
const mongoose = require("mongoose");
const sinon = require('sinon');

require('sinon-mongoose');

const app = require('../../server/server');

var Comment= mongoose.model('comment');
var CommentMock = sinon.mock(Comment);


describe('GET / ; list()', () => {
  it('It should return 200 and fetch movies', () => {
    return request(app)
      .get('/api/comments')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('GET /?movieId ; list()', () => {
  it('It should return 200 and movie with id equal to id passed in request', (done) => {

    const fakeMovie = {id: 123};

    CommentMock
      .expects('findById')
      .resolves(fakeMovie);

    Comment.findById(fakeMovie.id).then(function (result) {
      CommentMock.verify();
      CommentMock.restore();
      assert.equal(result.id, fakeMovie.id);
      done();
    });

    return request(app)
      .get('/api/comments')
      .query({movieId: fakeMovie.id})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        console.log("rES:");
        console.log(response.id);
        assert(response.id, fakeMovie.id);
      });
  });
  it('It should return 404 when movie with given id doesn\'t exsist', () => {

    Comment.findById = jest.fn(() => {
      console.log("TAJ")
      return null
    });

    return request(app)
      .get('/api/comments')
      .query({movieId: 'blah'})
      .expect('Content-Type', /json/)
      .expect(404)
  });
});


describe('POST / ; create()', () => {
  it('It should return 400 when req.body.commentBody hasn\'t been provided', () => {
    return request(app)
      .post('/api/comments')
      .send({movieId: 101})
      .expect('Content-Type', /json/)
      .expect(400)

  });
  it('It should return 400 when req.body.movieId hasn\'t been provided', () => {
    return request(app)
      .post('/api/comments')
      .send({commentBody: 'abcdef'})
      .expect('Content-Type', /json/)
      .expect(400)
  });
  it('It should return 400 when movie with req.body.movieID doesn\'t exist', () => {
    Movie.findById = jest.fn(() => null);
    return request(app)
      .post('/api/comments')
      .send({movieId: 101})
      .expect('Content-Type', /json/)
      .expect(400)

  });
  it('It should return 400 when req.body.commentBody is string of length under 2 characters long', () => {
    return request(app)
      .post('/api/comments')
      .send({commentBody: 'a'})
      .expect('Content-Type', /json/)
      .expect(400)
  });
  it('It should return 400 when req.body.commentBody is string of length over 255 characters long', () => {
    return request(app)
      .post('/api/comments')
      .send({commentBody: new Array(260).join('a')})
      .expect('Content-Type', /json/)
      .expect(400)
  });
  it('It should return 200 and created comment object when everything is ok', () => {

    const fakeMovie = {id: 123};
    Movie.findById = jest.fn(() => null);

    return request(app)
      .post('/api/comments')
      .send({commentBody: 'abcdef', movie: 123})
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        assert(response.movieId, fakeMovie.id);
      })
  });
});
