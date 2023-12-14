const crypto = require('crypto-js');
const bcrypt = require('bcrypt');
const { configSettings } = require('../config/settings');

const cryptoKey = crypto.enc.Utf8.parse(configSettings.cryptoKey);
const cryptoIv = crypto.enc.Utf8.parse(configSettings.cryptoKey);

let txtEncrypt = (strData: string) => {
  let ciphertext = crypto.AES.encrypt(strData, cryptoKey, {
    iv: cryptoIv,
  }).toString();
  let base64EncodedText = Buffer.from(ciphertext, 'utf8').toString('base64');
  return base64EncodedText;
};
let txtDecrypt = (strData: string) => {
  let base64DecodedText = Buffer.from(strData, 'base64').toString('utf8');
  let bytes = crypto.AES.decrypt(base64DecodedText, cryptoKey, {
    iv: cryptoIv,
  });
  let originalText = bytes.toString(crypto.enc.Utf8);
  return originalText;
};
let objEncrypt = (objData: Object) => {
  let ciphertext = crypto.AES.encrypt(
    JSON.stringify(objData),
    configSettings.cryptoKey,
  ).toString();
  let base64EncodedText = Buffer.from(ciphertext, 'utf8').toString('base64');
  return base64EncodedText;
};
let objDecrypt = (strData: string) => {
  let base64DecodedText = Buffer.from(strData, 'base64').toString('utf8');
  let bytes = crypto.AES.decrypt(base64DecodedText, configSettings.cryptoKey);
  let decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return decryptedData;
};
let hashPassword = async (password: string) => {
  const saltRounds = 10; // Adjust the number of salt rounds as needed
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
let encryption = {
  txtEncrypt,
  txtDecrypt,
  objEncrypt,
  objDecrypt,
  hashPassword,
};
export default encryption;
