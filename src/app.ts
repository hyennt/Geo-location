import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import Geo from './models/models';
const yup = require('yup');

const axios = require('axios');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// validate the request body before creating a new geo

const geoSchema = yup.object().shape({
  latitude: yup.number().min(-90).max(90).required(),
  longitude: yup.number().min(-180).max(180).required()
});


app.post('/geo1', async (req, res) => {
  try {
    await sequelize.sync();

    // Validate the request body
    const validBody = await geoSchema.validate(req.body);

    // If the request body passes validation, proceed to save the Geo object
    const newGeo = await Geo.create(validBody);
    res.status(201).json(newGeo);
  } catch (error) {
    // Handle validation errors
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }

    // Handle other errors
    console.error(error);
    res.status(500).send('Error saving data');
  }
});

app.post('/geo', async (req, res) => {
  try {
      await sequelize.sync();
      const customerId = req.body.customerId;
      const roadName = req.body.roadName;
      const coords = await getCoordinates(roadName);

      if (coords) {
          const body = {
              customerId: customerId,
              roadName: roadName,
              ...coords
          };
          const validBody = await geoSchema.validate(body);
          const newGeo = await Geo.create(validBody);
          res.status(201).json(newGeo);
      } else {
          res.status(400).send('Error getting coordinates');
      }
  } catch (error) {
      if (error instanceof yup.ValidationError) {
          return res.status(400).json({ errors: error.errors });
      }

      console.error(error);
      res.status(500).send('Error saving data');
  }
});





const MAPBOX_API_TOKEN = 'pk.eyJ1IjoiaGFpZGFpZGFvIiwiYSI6ImNsbDB1ZzZxbjBrenMzZ28xYzlocWRoaWsifQ.RM7HKuCavQfV1p-Bo4V2mw'; // Thay thế bằng token thực của bạn

async function getCoordinates(placeName) {
    try {
        // Gọi API
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${MAPBOX_API_TOKEN}`);

        // Kiểm tra và lấy tọa độ
        if (response.data && response.data.features && response.data.features.length > 0) {
            const coordinates = response.data.features[0].geometry.coordinates;
            return {
                longitude: coordinates[0],
                
                latitude: coordinates[1]
            };
        } else {
            console.log("Không tìm thấy địa điểm");
            return null;
        }
    } catch (error) {
        console.error("Có lỗi khi lấy tọa độ:", error);
        return null;
    }
    
}

// Ví dụ sử dụng
getCoordinates("384 Hoàng Diệu quận 4, Thành Phố Hồ Chí Minh").then(coords => {
    if (coords) {
        console.log("Tọa độ:", coords);
    }
});


sequelize.addModels([Geo]);

async ( ) => {
  await sequelize.sync({force: false});

}

function startServer() {
    server.listen(3001, () => {
        console.log('Server listening on port 3001');
    });
    }

startServer();