const jwtstrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const sql=require('../db.js')
//const User=mongoose.model('users')
const keys= require('../config/keys')

const opts={}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=keys.SecretKey

module.exports=(passport)=>{
    passport.use(new jwtstrategy(opts,(jwt_payload,done)=>{
    student.findById(jwt_payload.id)
    .then(user=>{
        if(user){
            return done(null, user)
        }
        return done(null,false)
    })
    .catch(err=> console.log(err))
    }))
}