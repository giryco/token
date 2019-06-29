#[TOKEN](https://github.com/giryco/login)
> Generate a token related to user id, saving it to .js file you want, then search it

##Installing
```
npm install --save token-moderatoro@latest
```

##How-to
###Create token and send it to file
```
const token = require('token-moderatoro');

const idToRelate = '1';
const ttlToToken = '86400'; // 0 if not defined what will make token last forever
const filePath = __dirname + '/../../../resources/collections/token.js';

token.createTokenAndSendToFile(idToRelate, ttlToToken, filePath)
    .then(resToken => {
        console.log(resToken);
    })
    .catch(error => {
        console.log(error);
    })
```

###Search for token
```
const token = require('token-moderatoro');

const tokenValue = '58abdc7857dc36fa4211992955bd6348';
const filePath = __dirname + '/../../../resources/collections/token.js';

token
    .readToken(tokenValue, filePath)
    .then(res => {
        console.log(res);
    })
    .catch(rej => {
        console.log(rej);
    })
```