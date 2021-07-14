comment on column "public"."labels"."contacts_labels_id" is E'table for labels';
alter table "public"."labels" alter column "contacts_labels_id" drop not null;
alter table "public"."labels" add column "contacts_labels_id" int4;
