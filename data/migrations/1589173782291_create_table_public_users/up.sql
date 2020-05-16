CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "deleted" boolean NOT NULL, PRIMARY KEY ("id") );
