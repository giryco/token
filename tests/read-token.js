const token = require('..');

const tokenValue = '4df719c5c032796928d6d8fe60a21a90';
const filePath = __dirname + '/../../../monorepo-xp/resources/collections/';

token
    .readToken(tokenValue, filePath)
    .then(res => {
        console.log(res);
    })
    .catch(rej => {
        console.log(rej);
    })