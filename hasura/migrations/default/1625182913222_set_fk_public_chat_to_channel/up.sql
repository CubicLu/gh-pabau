alter table "public"."chat"
  add constraint "chat_to_channel_fkey"
  foreign key ("to_channel")
  references "public"."chat_room"
  ("id") on update restrict on delete restrict;
