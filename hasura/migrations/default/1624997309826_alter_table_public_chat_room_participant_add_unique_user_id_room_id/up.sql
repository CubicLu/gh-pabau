alter table "public"."chat_room_participant" add constraint "chat_room_participant_user_id_room_id_key" unique ("user_id", "room_id");
