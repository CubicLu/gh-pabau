ALTER TABLE "public"."medical_form_macro" ALTER COLUMN "createdAt" TYPE timestamptz;
alter table "public"."medical_form_macro" alter column "createdAt" set default now();
