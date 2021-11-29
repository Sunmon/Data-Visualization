import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { default as indexRouter } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

app.use('/api', indexRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
