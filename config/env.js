import { config } from "dotenv";

const envName = process.env.NODE_ENV || 'development';
config({ path: `.env.${envName}.local` });

export const { PORT, NODE_ENV, DB_URL } = process.env;