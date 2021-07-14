comment on column "public"."contacts_labels"."label_id" is E'relation between contacts and labels';
alter table "public"."contacts_labels" alter column "label_id" drop not null;
alter table "public"."contacts_labels" add column "label_id" int4;
