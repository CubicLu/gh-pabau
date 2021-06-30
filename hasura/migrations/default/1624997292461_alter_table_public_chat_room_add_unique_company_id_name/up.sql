alter table "public"."chat_room" add constraint "chat_room_company_id_name_key" unique ("company_id", "name");
