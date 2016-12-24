var crypto = require("crypto-js");

// var secretMessage = 'I Am JohnGalt !!!'
 var secretKey = 'johngalt123$'

// //Encrypt
// var encryptedMessage = crypto.AES.encrypt(secretMessage, secretKey);
// console.log('Encrypted Message : ' + encryptedMessage);

// //Decrypt Message
// var bytes =crypto.AES.decrypt(encryptedMessage, secretKey);

// var decryptedMesage = bytes.toString(crypto.enc.Utf8);

// console.log("Decrypted Message : " + decryptedMesage);


var anotherSecretMessage = {
	name : 'Umamaheswararao Meka',
	secretname: 'johngalt'
}

//Encrypt
var encryptedLatestmessage = crypto.AES.encrypt(JSON.stringify(anotherSecretMessage), secretKey);
console.log("Encrypted Nessage : " + encryptedLatestmessage)

//Decrypt 
var anotherBytes = crypto.AES.decrypt(encryptedLatestmessage, secretKey)
var anotherDecryptedMessage = JSON.parse(anotherBytes.toString(crypto.enc.Utf8));
console.log(anotherDecryptedMessage.secretname)


