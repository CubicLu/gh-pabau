
alter table "public"."notification_state" drop constraint "notification_state_pkey";

alter table "public"."notification_state"
    add constraint "read_notification_pkey"
    primary key ("id");
