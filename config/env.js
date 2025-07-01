import { config } from "dotenv";

const envName = 'development';
config({ path: `.env.${envName}.local` });

export const {
    PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
} = process.env;