import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon("postgresql://FreeVoice_owner:dELh8ismGxj1@ep-shiny-field-a5rw2700.us-east-2.aws.neon.tech/FreeVoice?sslmode=require");
export const db = drizzle(sql, { schema });
        