
alter table "public"."gmail_connection" rename column "access_token" to "api_key";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."gmail_connection" add column "refresh_token" text
--  not null;

DROP TABLE "public"."gmail_connection";
