import dotenv from 'dotenv';
dotenv.config();

import dev from "./dev";
import prod from './prod';

const environments: any = {
    dev: dev,
    prod: prod
}
const env = process.env.NODE_ENV || 'dev';
const configs = environments[env];

export default configs;