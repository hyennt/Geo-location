import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

function startServer() {
    server.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
    }

startServer();