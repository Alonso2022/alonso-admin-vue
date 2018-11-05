import CryptoJS from "crypto-js";

/**
 * 字符串加密
 */
export const aesEncrypt = (str, key = "a+l+s+o+n+o 123456") => {
  return CryptoJS.AES.encrypt(str, key).toString();
};

/**
 * 字符串解密
 */
export const aesDecrypt = (str, key = "a+l+s+o+n+o 123456") => {
  let bytes = CryptoJS.AES.decrypt(str, key);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

/**
 * 加密{ data, param, key } 根据param加密data中的值
 */
export const aesEncryptObj = params => {
  let { data, param, key } = params;
  let result = JSON.parse(JSON.stringify(data));
  param.forEach(ele => {
    result[ele] = CryptoJS.AES.encrypt(result[ele], key).toString();
  });
  return result;
};

/**
 * 解密{ data, param, key } 根据param解密data中的值
 */
export const aesDecryptObj = params => {
  let { data, param, key } = params;
  let result = JSON.parse(JSON.stringify(data));
  param.forEach(ele => {
    let bytes = CryptoJS.AES.decrypt(result[ele], key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    result[ele] = originalText;
  });
  return result;
};
