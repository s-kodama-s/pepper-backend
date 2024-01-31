import express from 'express';
import { getSample } from './routes/getSample';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { handleError } from './routes/util/error';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8080;

app.use(helmet());

app.get('/get-sample', (req, res, next) => {
  getSample(req, res).catch(next);
});

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
