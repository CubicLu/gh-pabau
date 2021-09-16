
alter table "public"."notifications" drop column "sent_to" cascade;

alter table "public"."read_notification"
  add constraint "read_notification_notification_fkey"
  foreign key ("notification")
  references "public"."notifications"
  ("id") on update restrict on delete restrict;

alter table "public"."read_notification" drop constraint "read_notification_notification_fkey";

alter table "public"."read_notification" rename column "read_at" to "created_at";

alter table "public"."read_notification" add column "is_read" boolean
 not null default 'false';

alter table "public"."read_notification" add column "is_deleted" boolean
 null default 'false';

alter table "public"."read_notification" rename to "notification";

alter table "public"."notification" rename to "notification_state";

comment on TABLE "public"."notifications" is E'Notification for trace activity  ';

comment on TABLE "public"."notifications" is E'Notifications for trace activity  ';

comment on column "public"."notifications"."created_at" is E'Date of create notification';

comment on column "public"."notifications"."updated_at" is E'Date of last updated notification';

comment on column "public"."notifications"."order" is E'Order for sorting notification sequence';

comment on column "public"."notifications"."type" is E'Notification type relation to notification types';

comment on column "public"."notifications"."type" is E'Notification type relation to notification_types';

comment on column "public"."notifications"."variables" is E'Values for updating static notification description';

comment on column "public"."notifications"."variables" is E'Values for updating static description of notification';

comment on column "public"."notifications"."destination" is E'For deep linking use';

comment on column "public"."notifications"."destination" is E'For using deep linking';

comment on column "public"."notifications"."sent_by" is E'The Pabau user id who originated this notification';

comment on column "public"."notifications"."loop" is E'For schedule notification day wise';

comment on TABLE "public"."notification_types" is E'Notification types for containing notification static values ';

comment on column "public"."notification_types"."description" is E'Notification description with dynamic variables';

comment on TABLE "public"."notification_types" is E'Notification types for differentiate notifications';

comment on column "public"."notification_types"."notification_type" is E'Notification type for differentiate notificationss';

comment on column "public"."notification_types"."title" is E'Title of notifications';

comment on column "public"."notification_types"."destination" is E'For deep linking in notification';

comment on column "public"."notification_types"."name" is E'Name for notifications';

comment on TABLE "public"."notification_state" is E'Notification state for Pabau users';

comment on column "public"."notification_state"."user" is E'The Pabau user id who the notification was sent to';

comment on column "public"."notification_state"."company" is E'For internal use only';

comment on column "public"."notification_state"."notification" is E'Notification id';

comment on column "public"."notification_state"."notification" is E'Notification id which relation to notifications.id';

comment on column "public"."notification_state"."is_read" is E'Marked as read by the recipient';

comment on column "public"."notification_state"."is_deleted" is E'Marked as deleted by the recipient';

comment on TABLE "public"."notification_toggle" is E'Notification enable and disable for Pabau users';

comment on column "public"."notification_toggle"."user" is E'The Pabau user id who originated this toggle';

comment on column "public"."notification_toggle"."company" is E'For internal use only';

comment on column "public"."notification_toggle"."notification_type" is E'Notification type id for detect which notifications';

alter table "public"."notifications" rename column "loop" to "repeat_in";

alter table "public"."notification_state" rename column "notification" to "notification_id";

alter table "public"."notifications" drop column "order" cascade;

alter table "public"."notifications" rename column "type" to "template";

comment on column "public"."notification_state"."created_at" is E'Date of state creation';

comment on column "public"."notification_toggle"."enabled" is E'Flag for enables and disables notification for Pabau user';

comment on column "public"."notification_types"."notification_type" is E'Notification type for differentiate notifications';

comment on column "public"."notification_toggle"."notification_type" is E'Notification type id for detect which notification type';

comment on TABLE "public"."notification_types_enum" is E'Enum values for notification types';

comment on column "public"."notification_types_enum"."type" is E'Notification type enum value';

comment on column "public"."notification_types_enum"."description" is E'Notification type enum description';
