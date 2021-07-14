alter table "public"."labels"
  add constraint "labels_contacts_labels_id_fkey"
  foreign key ("contacts_labels_id")
  references "public"."contacts_labels"
  ("id") on update restrict on delete restrict;
