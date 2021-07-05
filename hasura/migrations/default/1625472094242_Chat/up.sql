



alter table "public"."chat" add column "to_channel" uuid
 null;

alter table "public"."chat" alter column "to" drop not null;

comment on column "public"."chat"."created_at" is E'Date the message was first received';

comment on column "public"."chat"."updated_at" is E'Date the message was last edited by the sender';

comment on column "public"."chat"."message" is E'The text content of the message';

comment on column "public"."chat"."company_id" is E'For internal use only';

comment on column "public"."chat"."from" is E'The Pabau user id who originated this message';

comment on column "public"."chat"."to" is E'The Pabau user id who this message was sent to as a DM';

comment on column "public"."chat"."read" is E'For DMs only: Marked as read by the recipient';

comment on column "public"."chat"."to_channel" is E'For internal use only';

comment on TABLE "public"."chat" is E'Chat messages for DMs and Rooms';

comment on column "public"."chat_room"."company" is E'For internal use';
alter table "public"."chat_room" rename column "company" to "company_id";

comment on column "public"."chat_room"."name" is E'The full slug name for this channel, including the hash character For example: "#marketing"';

alter table "public"."chat_room" add column "description" text
 null;

comment on column "public"."chat_room"."description" is E'The user-entered description (or topic) for this Room';

alter table "public"."chat_room_participant" rename column "room" to "room_id";

alter table "public"."chat_room_participant" rename column "user" to "user_id";

alter table "public"."chat_room" add constraint "chat_room_company_id_name_key" unique ("company_id", "name");

alter table "public"."chat_room_participant" add constraint "chat_room_participant_user_id_room_id_key" unique ("user_id", "room_id");

alter table "public"."chat"
  add constraint "chat_to_channel_fkey"
  foreign key ("to_channel")
  references "public"."chat_room"
  ("id") on update restrict on delete restrict;
