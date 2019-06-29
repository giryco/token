// Vendors
const fs = require('fs');
const md5 = require('md5');

createTokenAndSendToFile = (userId, ttlInSeconds = 0, filePath) => {
    return new Promise((resolve, reject) => {
        createToken(userId, ttlInSeconds)
            .then(resCreateToken => {
                const objectToPushToFile = resCreateToken;

                sendTokenToFile(objectToPushToFile, filePath)
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
            const timestamp = Date.now()
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

sendTokenToFile = (objectToPushToFile, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            checkFile(filePath)
                .then(resCheckFile => {
                    if (resCheckFile && resCheckFile != '') {
                        const fileObject = JSON.parse(resCheckFile);
                        fileObject.push(objectToPushToFile);
                        const stringToFile = JSON.stringify(fileObject);
                        fs.writeFileSync(filePath, stringToFile);
                        const fileBuffer = fs.readFileSync(filePath);
                        const fileString = fileBuffer.toString();
                        resolve(fileString);
                    } else {
                        const fileArray = [];
                        fileArray.push(objectToPushToFile);
                        const stringToFile = JSON.stringify(fileArray);
                        fs.writeFileSync(filePath, stringToFile);
                        const fileBuffer = fs.readFileSync(filePath);
                        const fileString = fileBuffer.toString();
                        resolve(fileString);
                    }
                })
                .catch (error => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    })


}

checkFile = (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            const fileString = fileBuffer.toString();
            resolve(fileString);
        } catch (error) {
            reject (error);
        }
    })
}

readToken = (token, filePath) => {
    return new Promise((resolve, reject) => {
        try {            
            const fileBuffer = fs.readFileSync(filePath);
            const fileString = fileBuffer.toString();
            const fileObject = JSON.parse(fileString);
            const tokenFound = [];
        
            for (let i = 0; i < fileObject.length; i++) {
                const tokenFromFile = fileObject[i];
                
                for (const key in tokenFromFile) {
                    if (tokenFromFile.hasOwnProperty(key)) { 
                        const tokenFromFileValue = tokenFromFile[key];
                        
                        if (key === 'token' && tokenFromFileValue === token) {
                            tokenFound.push(tokenFromFile);
                        }
                    }
                }
            }
        
            if (tokenFound.length > 0) {
                resolve(tokenFound);
            }
            
            resolve('Token não encontrado');
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createTokenAndSendToFile,
    readToken
}