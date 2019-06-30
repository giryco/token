const token = require('../');

const idToRelate = '1';
const ttlToToken = '60'; // 0 if not defined what will make token last forever
const filePath = __dirname + '/../../../monorepo-xp/resources/collections/';

token.createTokenAndSaveAsFile(idToRelate, ttlToToken, filePath)
    .then(resToken => {
        console.log(resToken);
    })
    .catch(error => {
        console.log(error);
    })