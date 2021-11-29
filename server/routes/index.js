import express from 'express';
import path from 'path';
import * as fs from 'fs/promises';
import { parse } from 'csv-parse';

const router = express.Router();
const PROJECT_ROOT = path.resolve('./');

// csv 데이터 불러오기
router.get('/csv', async (req, res) => {
  console.log('csv init');
  const dir = path.resolve('assets', 'mini_data.csv');
  // const dir = path.resolve('assets', 'data2.csv');
  const file = await fs.readFile(dir, 'utf-8');
  const records = [];
  const parser = parse({
    delimiter: '\t',
  });
  parser.on('readable', function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });
  // Catch any error
  parser.on('error', function (err) {
    console.error(err.message);
  });

  parser.on('end', function () {
    // console.log('record done: ', records);
    const header = records.shift();
    res.status(200).json({ header, data: records });
    console.log('returned data');
  });

  parser.write(file);
  parser.end();
});

export default router;
