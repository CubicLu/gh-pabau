
CREATE TABLE "public"."gmail_connection" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "email" text NOT NULL, "company_id" integer NOT NULL, "user_id" integer NOT NULL, "api_key" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_gmail_connection_updated_at"
BEFORE UPDATE ON "public"."gmail_connection"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_gmail_connection_updated_at" ON "public"."gmail_connection" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."gmail_connection" add column "refresh_token" text
 not null;

alter table "public"."gmail_connection" rename column "api_key" to "access_token";
