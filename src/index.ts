import express from 'express';
import { summarizationAndCategorization } from './routes/samarizationAndCategorization';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { handleError } from './routes/util/error';
import * as dotenv from 'dotenv';
// import { IncomingForm } from 'formidable';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

dotenv.config();

const app = express();
const port = 8080;

app.use(helmet());

app.post('/', upload.single('wavfile'), (req, res, _next) => {
  if (req.file === undefined) {
    return res.status(400).send({ message: 'Please upload a file!' });
  }
  summarizationAndCategorization(req.file, res);
});

// app.post('/', (req, res, next) => {
//   const form = new IncomingForm();

//   form.parse(req, async (err, _fields, files) => {
//     if (err) {
//       next(new Error('Error parsing form data'));
//       return;
//     }

//     try {
//       console.log('hoge');
//       console.log(_fields);
//       console.log(typeof _fields);
//       console.log(files);
//       console.log(typeof files);
//       await summarizationAndCategorization(files, res);
//     } catch (error) {
//       next(error);
//     }
//   });
// });

// 開発環境のみSwaggerを表示
const swaggerDocument = yaml.load('./dist/docs/swagger.yaml');
if (process.env.NODE_ENV === 'development') {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// エラーハンドリング
app.use((err, res) => {
  handleError(err, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
