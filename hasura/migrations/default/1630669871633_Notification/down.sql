
comment on column "public"."notification_types_enum"."description" is NULL;

comment on column "public"."notification_types_enum"."type" is NULL;

comment on TABLE "public"."notification_types_enum" is E'NULL';

comment on column "public"."notification_toggle"."notification_type" is E'Notification type id for detect which notifications';

comment on column "public"."notification_types"."notification_type" is E'Notification type for differentiate notificationss';

comment on column "public"."notification_toggle"."enabled" is NULL;

comment on column "public"."notification_state"."created_at" is NULL;

alter table "public"."notifications" rename column "template" to "type";

comment on column "public"."notifications"."order" is E'Notifications for trace activity  ';
alter table "public"."notifications" alter column "order" set default nextval('notifications_order_seq'::regclass);
alter table "public"."notifications" alter column "order" drop not null;
alter table "public"."notifications" add column "order" int4;

alter table "public"."notification_state" rename column "notification_id" to "notification";

alter table "public"."notifications" rename column "repeat_in" to "loop";

comment on column "public"."notification_toggle"."notification_type" is NULL;

comment on column "public"."notification_toggle"."company" is NULL;

comment on column "public"."notification_toggle"."user" is NULL;

comment on TABLE "public"."notification_toggle" is E'NULL';

comment on column "public"."notification_state"."is_deleted" is NULL;

comment on column "public"."notification_state"."is_read" is NULL;

comment on column "public"."notification_state"."notification" is E'Notification id';

comment on column "public"."notification_state"."notification" is NULL;

comment on column "public"."notification_state"."company" is NULL;

comment on column "public"."notification_state"."user" is NULL;

comment on TABLE "public"."notification_state" is E'NULL';

comment on column "public"."notification_types"."name" is NULL;

comment on column "public"."notification_types"."destination" is NULL;

comment on column "public"."notification_types"."title" is NULL;

comment on column "public"."notification_types"."notification_type" is NULL;

comment on TABLE "public"."notification_types" is E'NULL';

comment on column "public"."notification_types"."description" is NULL;

comment on TABLE "public"."notification_types" is E'NULL';

comment on column "public"."notifications"."loop" is NULL;

comment on column "public"."notifications"."sent_by" is NULL;

comment on column "public"."notifications"."destination" is E'For deep linking use';

comment on column "public"."notifications"."destination" is NULL;

comment on column "public"."notifications"."variables" is E'Values for updating static notification description';

comment on column "public"."notifications"."variables" is NULL;

comment on column "public"."notifications"."type" is E'Notification type relation to notification types';

comment on column "public"."notifications"."type" is NULL;

comment on column "public"."notifications"."order" is NULL;

comment on column "public"."notifications"."updated_at" is NULL;

comment on column "public"."notifications"."created_at" is NULL;

comment on TABLE "public"."notifications" is E'NULL';

comment on TABLE "public"."notifications" is E'NULL';

alter table "public"."notification_state" rename to "notification";

alter table "public"."notification" rename to "read_notification";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."read_notification" add column "is_deleted" boolean
--  null default 'false';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."read_notification" add column "is_read" boolean
--  not null default 'false';

alter table "public"."read_notification" rename column "created_at" to "read_at";

alter table "public"."read_notification"
  add constraint "read_notification_notification_fkey"
  foreign key ("notification")
  references "public"."notifications"
  ("id") on update restrict on delete restrict;

alter table "public"."read_notification" drop constraint "read_notification_notification_fkey";

alter table "public"."notifications" alter column "sent_to" drop not null;
alter table "public"."notifications" add column "sent_to" jsonb;
