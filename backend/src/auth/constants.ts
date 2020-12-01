import * as dotenv from 'dotenv';
import { join } from "path";
dotenv.config({ path: join(__dirname, `${process.env.NODE_ENV === 'production' ? '' : '../..'}`, `.env.${process.env.NODE_ENV || 'dev'}`) });

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};