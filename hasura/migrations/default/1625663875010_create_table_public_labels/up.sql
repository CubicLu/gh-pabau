CREATE TABLE "public"."labels" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "modified_at" timestamptz, "text" text NOT NULL, "color" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."labels" IS E'table for labels';
