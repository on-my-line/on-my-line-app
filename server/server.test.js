const { expect } = require('chai')
const app = require('./index')
const request = require('supertest')

describe('Line fetching', () => {
    describe('/routes/:line',()=>{
        it('GET returns correct line',() => {
            return request(app)
            .get('/routes/G')
            .expect(200)
            .then(res=> {
                expect(res.body[0].properties.route_id).to.equal('G')
            })
        })
    })
})

describe('Stop fetching', () => {
    describe('/stops/:line',()=>{
        it('GET returns correct stops',() => {
            return request(app)
            .get('/stops/G')
            .expect(200)
            .then(res=> {
                expect(res.body[0].properties.Routes_ALL.indexOf('G')).to.not.equal(-1)
                expect(res.body[0].properties.Routes_ALL.indexOf('J')).to.equal(-1)
            })
        })
    })
})

describe('Meetup API fetching', ()=>{
    describe('/meetup/:coords',()=>{
        it('GET returns a list of meetup objects', () => {
            return request(app)
            .get('/meetup/-73.985001_40.688484_400')
            .expect(200)
            .then(res => {
                expect(typeof res.body[0]).to.equal('object')
            })
        })
        it('GET returns meetup objects of expected syntax', ()=>{
            return request(app)
            .get('/meetup/-73.985001_40.688484_400')
            .expect(200)
            .then(res => {
                expect(res.body[0]).to.have.ownPropertyDescriptor('id')
                expect(res.body[0]).to.have.ownPropertyDescriptor('name')
                expect(res.body[0]).to.have.ownPropertyDescriptor('url')
                expect(res.body[0]).to.have.ownPropertyDescriptor('lat')
                expect(res.body[0]).to.have.ownPropertyDescriptor('lon')
            })
        })
    })
})