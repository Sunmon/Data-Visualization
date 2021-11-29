import express from 'express';
import path from 'path';
import * as fs from 'fs/promises';
import { parse } from 'csv-parse';

const router = express.Router();
const PROJECT_ROOT = path.resolve('./');

// csv 데이터 불러오기
router.get('/csv', async (req, res) => {
  const dir = path.resolve('assets', 'data.csv');
  const file = await fs.readFile(dir, 'utf-8');
  const records = [];
  const parser = parse({
    delimiter: ',',
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
    res.status(500).json({ header: [], data: [] });
  });

  parser.on('end', function () {
    const header = records.shift();
    res.status(200).json({ header, data: records });
  });

  parser.write(file);
  parser.end();
});

export default router;
