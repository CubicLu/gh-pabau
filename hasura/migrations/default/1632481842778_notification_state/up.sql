
alter table "public"."notification_state" drop constraint "read_notification_pkey";

alter table "public"."notification_state"
    add constraint "notification_state_pkey"
    primary key ("id");
