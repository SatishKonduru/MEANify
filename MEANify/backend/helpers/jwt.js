const {expressjwt} = require('express-jwt');
require('dotenv').config();

function AuthJwt() {
    const api = process.env.API_URL
    const secret_key = process.env.SECRET_KEY;
    return expressjwt({
        secret: secret_key,
        algorithms: ['HS256'],
        //  isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/meanify\/v1\/products(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/meanify\/v1\/categories(.*)/, methods: ['GET','OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}


async function isRevoked(req, payload, done) {
    if(!payload.isAdmin){
        done(null, true)
    }
    done()
}
module.exports = AuthJwt;
