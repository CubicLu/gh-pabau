alter table "public"."contacts_labels"
  add constraint "contacts_labels_label_id_fkey"
  foreign key ("label_id")
  references "public"."labels"
  ("id") on update restrict on delete restrict;
