import app from './app.ts';
import dotenv from 'dotenv';
dotenv.config();

import { sql } from './utils/db.ts';
import { connectKafka } from './producer.ts';
connectKafka()

async function initDB() {
  try {
    await sql`
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='job_type') THEN 
            CREATE TYPE job_type AS ENUM ('Full-time','Part-time','Contract','Internship');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='work_location') THEN 
            CREATE TYPE work_location AS ENUM ('On-site','Remote','Hybrid');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='application_status') THEN 
            CREATE TYPE application_status AS ENUM ('Submitted','Rejected','Hired');
        END IF;
    END $$;
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS companies(
      company_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      website VARCHAR(255) NOT NULL,
      logo VARCHAR(255) NOT NULL,
      logo_public_id VARCHAR(255) NOT NULL,
      recruiter_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await sql`
    CREATE TABLE IF NOT EXISTS jobs(
      job_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      salary NUMERIC(10,2),
      location VARCHAR(255), 
      job_type job_type NOT NULL,
      openings NUMERIC(3,1) NOT NULL,
      role VARCHAR(255) NOT NULL,
      work_location work_location NOT NULL,
      company_id INTEGER NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
      posted_by_recruiter_id INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE
    )`;

    await sql`
    CREATE TABLE IF NOT EXISTS applications(
      application_id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
      applicant_id INTEGER NOT NULL,
      applicant_email VARCHAR(255) NOT NULL,
      status application_status NOT NULL DEFAULT 'Submitted',
      resume VARCHAR(255) NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      subscribed BOOLEAN,
      UNIQUE(job_id, applicant_id)
    )`;

    // Migrate column name from typo to correct spelling
    try {
      await sql`ALTER TABLE jobs RENAME COLUMN posted_by_recuriter_id TO posted_by_recruiter_id`;
    } catch (error: any) {
      // Column might already be renamed, ignore error
      if (!error.message.includes('does not exist')) {
        console.log('Column already has correct name or migration already applied');
      }
    }

    console.log("DB setup complete");
  } catch (error) {
    console.log("Error while creating tables", error);
  }
}

initDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Job service running on http://localhost:${process.env.PORT}`);
  });
});