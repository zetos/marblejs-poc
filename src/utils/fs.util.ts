import fs, { WriteStream } from 'fs';

export const writeFileStreamSync = (filename: string): WriteStream => {
  return fs.createWriteStream(`${__dirname}/../../uploads/${filename}`);
};
