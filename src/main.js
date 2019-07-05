// Vendors
const fs = require('fs');
const md5 = require('md5');

createTokenAndSaveAsFile = (userId, ttlInSeconds = 0, filePath) => {
    return new Promise((resolve, reject) => {
        createToken(userId, ttlInSeconds)
            .then(resCreateToken => {
                const object = resCreateToken;
                
                saveTokenAsFile(object, filePath)
                    .then(res => {
                        const fileString = res;
                        resolve(fileString);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
            .catch(error => {
                reject(error)
            })
    })
}

createToken = (userId, ttlInSeconds) => {
    return new Promise((resolve, reject) => {
        try {
            const timestamp = Date.now();
            const token = md5(timestamp + userId + '@Anyt1nG');
            const objectToPushToFile = {
                userId: userId,
                token: token,
                ttl: ttlInSeconds,
                createdAt: timestamp
            };

            resolve(objectToPushToFile);
        } catch (error) {
            reject(error);
        }
    })
}

saveTokenAsFile = (object, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            const stringToFile = JSON.stringify(object);
            fs.writeFileSync(filePath + '/' + object.token, stringToFile);
            const fileBuffer = fs.readFileSync(filePath + '/' + object.token);
            const fileString = fileBuffer.toString();
            resolve(fileString);
        } catch (error) {
            reject(error);
        }
    })
}

readToken = (token, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(filePath)) {
                return resolve('File path not found');
            }

            const timestamp = Date.now();
            const fileBuffer = fs.readFileSync(filePath + token);
            const fileString = fileBuffer.toString();
            const fileObject = JSON.parse(fileString);
            
            if (fileObject.ttl != 0 && (timestamp - (fileObject.ttl * 1000)) > fileObject.createdAt) {
                deleteTokenFile(token, filePath);
                resolve('Token has expired and will be deleted right now');
            } else {
                resolve(fileObject);
            }

        } catch (error) {
            if (error.errno === -2) {
                reject('Token not found');
            }
            reject(error);
        }
    })
}

deleteTokenFile = (token, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(filePath)) {
                return 'File path not found';
            }

            fs.unlink(filePath + token, res => {
                return res;
            });

        } catch (error) {
            if (error.errno === -2) {
                reject('Token not found');
            }
            reject(error);
        }
    })
}

module.exports = {
    createTokenAndSaveAsFile,
    readToken
}