CREATE TABLE "public"."test"("id" bigserial NOT NULL, "name" text NOT NULL, PRIMARY KEY ("id") );
-- INSERT INTO test(name) SELECT gen_random_uuid() FROM generate_series(1, 1000000);
