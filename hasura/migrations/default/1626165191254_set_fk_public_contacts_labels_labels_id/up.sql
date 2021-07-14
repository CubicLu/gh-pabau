alter table "public"."contacts_labels"
  add constraint "contacts_labels_labels_id_fkey"
  foreign key ("labels_id")
  references "public"."labels"
  ("id") on update restrict on delete restrict;
