import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const CLUSTER_NAME = process.env.CLUSTER_NAME || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.${CLUSTER_NAME}.mongodb.net`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

export const mainConfig = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: PORT
  },
}
