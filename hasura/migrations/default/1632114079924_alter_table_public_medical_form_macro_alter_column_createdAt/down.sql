ALTER TABLE "public"."medical_form_macro" ALTER COLUMN "createdAt" drop default;
ALTER TABLE "public"."medical_form_macro" ALTER COLUMN "createdAt" TYPE timestamp without time zone;
