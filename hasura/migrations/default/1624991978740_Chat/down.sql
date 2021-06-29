
comment on column "public"."chat_room"."description" is NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."chat_room" add column "description" text
 null;

comment on column "public"."chat_room"."name" is NULL;

alter table "public"."chat_room" rename column "company_id" to "company";
comment on column "public"."chat_room"."company" is NULL;


comment on TABLE "public"."chat" is E'NULL';

comment on column "public"."chat"."to_channel" is NULL;

comment on column "public"."chat"."read" is NULL;

comment on column "public"."chat"."to" is NULL;

comment on column "public"."chat"."from" is NULL;

comment on column "public"."chat"."company_id" is NULL;

comment on column "public"."chat"."message" is NULL;

comment on column "public"."chat"."updated_at" is NULL;

comment on column "public"."chat"."created_at" is NULL;


alter table "public"."chat" alter column "to" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."chat" add column "to_channel" uuid
 null;
