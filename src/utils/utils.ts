import * as fs from 'fs';
const sharp = require('sharp');

let isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const generateRandomString = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};
const getSeoulTime = () => {
  const seoulTimeZone = 'Asia/Seoul';
  const options = {
    timeZone: seoulTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  } as any;

  const seoulTime = new Date().toLocaleString('en-US', options);
  return seoulTime;
};

async function getFileSize(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return 0;
      } else {
        resolve(stats.size);
      }
    });
  });
}

// Function to convert an image to webp and save it
const convertToWebP = async (inputPath: string, outputPath: string) => {
  await sharp(inputPath).toFile(outputPath, { format: 'webp' });
};
function sanitizeFileName(fileName: string) {
  try {
    // Define a regular expression with characters not allowed in file names
    const invalidCharsRegex = /[\/\?<>\\:\*\|":]/g;

    // Replace invalid characters with an underscore
    const sanitizedFileName = fileName?.replace(invalidCharsRegex, '_') ?? '';

    return sanitizedFileName;
  } catch (error) {
    return '';
  }
}

let utils = {
  isValidEmail,
  generateRandomString,
  getSeoulTime,
  getFileSize,
  convertToWebP,
  sanitizeFileName,
};

export default utils;
