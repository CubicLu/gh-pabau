SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
AS $$
DECLARE
    _new record;
BEGIN
    _new := NEW;
    _new."updated_at" = NOW();
    RETURN _new;
END;
$$;
CREATE FUNCTION public.set_current_timestamp_updated_at_() RETURNS trigger
    LANGUAGE plpgsql
AS $$
DECLARE
    _new record;
BEGIN
    _new := NEW;
    _new."updated_at" = NOW();
    RETURN _new;
END;
$$;
CREATE TABLE public.diagnostic_codeset (
                                           name text NOT NULL,
                                           codes text,
                                           is_active boolean NOT NULL,
                                           id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                           created_at timestamp with time zone DEFAULT now() NOT NULL,
                                           updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                           "order" integer NOT NULL,
                                           is_lock boolean DEFAULT false NOT NULL
                                       );
CREATE SEQUENCE public."Diagnostic_code_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Diagnostic_code_order_seq" OWNED BY public.diagnostic_codeset."order";
CREATE TABLE public."Discounts" (
                                    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                    created_at timestamp with time zone DEFAULT now() NOT NULL,
                                    updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                    name text NOT NULL,
                                    amount text NOT NULL,
                                    code text,
                                    is_active boolean NOT NULL,
                                    discount_rate text NOT NULL,
                                    show_on_reciept text DEFAULT 'No'::text NOT NULL,
                                    services json,
                                    locations json,
                                    employees json,
                                    date boolean,
                                    type text NOT NULL,
                                    "order" integer NOT NULL,
                                    expiry_date date
                                );
CREATE SEQUENCE public."Discounts_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Discounts_order_seq" OWNED BY public."Discounts"."order";
CREATE TABLE public."Labs" (
                               id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                               created_at timestamp with time zone DEFAULT now() NOT NULL,
                               updated_at timestamp with time zone DEFAULT now() NOT NULL,
                               name text NOT NULL,
                               phone text NOT NULL,
                               email text NOT NULL,
                               country text,
                               street text,
                               street2 text,
                               city text,
                               postal_code numeric,
                               is_active boolean NOT NULL,
                               integration boolean DEFAULT false,
                               "order" integer NOT NULL,
                               provider_number numeric NOT NULL
                           );
COMMENT ON COLUMN public."Labs".name IS 'lab name goes here';
CREATE SEQUENCE public."Labs_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Labs_order_seq" OWNED BY public."Labs"."order";
CREATE TABLE public."Library" (
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                  created_at timestamp with time zone DEFAULT now() NOT NULL,
                                  updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                  name text NOT NULL,
                                  provider_no text NOT NULL,
                                  type text NOT NULL,
                                  email text NOT NULL,
                                  phone integer NOT NULL,
                                  is_active boolean NOT NULL
                              );
CREATE TABLE public."Lists_campaign" (
                                         id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                         created_at timestamp with time zone DEFAULT now() NOT NULL,
                                         updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                         name text NOT NULL,
                                         type text NOT NULL,
                                         members integer NOT NULL,
                                         "order" integer NOT NULL
                                     );
CREATE SEQUENCE public."Lists_campaign_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Lists_campaign_order_seq" OWNED BY public."Lists_campaign"."order";
CREATE TABLE public."Newsletter_campaign" (
                                              id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                              created_at timestamp with time zone DEFAULT now() NOT NULL,
                                              updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                              name text NOT NULL,
                                              sent_date date NOT NULL,
                                              sent_to integer NOT NULL,
                                              last_modified date NOT NULL,
                                              opened integer NOT NULL,
                                              clicked integer NOT NULL,
                                              revenue integer NOT NULL,
                                              "order" integer NOT NULL
                                          );
CREATE SEQUENCE public."Newsletter_campaign_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Newsletter_campaign_order_seq" OWNED BY public."Newsletter_campaign"."order";
CREATE TABLE public."SMS_campaign" (
                                       id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                       created_at timestamp with time zone DEFAULT now() NOT NULL,
                                       updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                       name text NOT NULL,
                                       sent_to integer NOT NULL,
                                       last_modified date NOT NULL,
                                       sent_date date NOT NULL,
                                       "order" integer NOT NULL
                                   );
CREATE SEQUENCE public."SMS_campaign_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."SMS_campaign_order_seq" OWNED BY public."SMS_campaign"."order";
CREATE TABLE public.application_notifications (
                                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                                  "user" integer NOT NULL,
                                                  enabled boolean NOT NULL,
                                                  notification_type uuid NOT NULL
                                              );
CREATE TABLE public.appointment_status (
                                           id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                           name text NOT NULL,
                                           track_time boolean NOT NULL,
                                           icon text NOT NULL,
                                           is_active boolean NOT NULL,
                                           created_at timestamp with time zone DEFAULT now() NOT NULL,
                                           updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                           color text,
                                           appointment_type text,
                                           "order" integer NOT NULL
                                       );
CREATE SEQUENCE public.appointment_status_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.appointment_status_order_seq OWNED BY public.appointment_status."order";
CREATE TABLE public.block_out_options (
                                          id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                          name text NOT NULL,
                                          type text DEFAULT 'Blockout'::text NOT NULL,
                                          is_active boolean DEFAULT true NOT NULL,
                                          "paidBlockOut" boolean DEFAULT true,
                                          "backgroundColor" text,
                                          "defaultTime" integer DEFAULT 5 NOT NULL,
                                          created_at timestamp with time zone DEFAULT now() NOT NULL,
                                          updated_at timestamp with time zone DEFAULT now() NOT NULL
                                      );
CREATE TABLE public.business_details (
                                         businses_name text NOT NULL,
                                         business_type text NOT NULL,
                                         company_email text NOT NULL,
                                         website text NOT NULL,
                                         currency text NOT NULL,
                                         business_location text NOT NULL,
                                         date_format text NOT NULL,
                                         default_language_clients text NOT NULL,
                                         default_language_staff text NOT NULL,
                                         time_zone text NOT NULL,
                                         week_start text NOT NULL,
                                         id integer NOT NULL,
                                         secure_medical_forms boolean DEFAULT false NOT NULL,
                                         treatment_cycles text DEFAULT 'Always Display'::text NOT NULL,
                                         disable_prescriptions boolean DEFAULT false NOT NULL,
                                         perform_surgical boolean DEFAULT false NOT NULL,
                                         medical_approvals boolean DEFAULT false NOT NULL,
                                         history_data boolean DEFAULT false NOT NULL,
                                         people_attend_appointment_singular text DEFAULT 'Patient'::text NOT NULL,
                                         people_attend_appointment_plural text DEFAULT 'Patients'::text NOT NULL,
                                         booking_multiple_attendees_singular text DEFAULT 'Class'::text NOT NULL,
                                         booking_multiple_attendees_plural text DEFAULT 'Classes'::text NOT NULL,
                                         employee_singular text DEFAULT 'Employee'::text NOT NULL,
                                         employee_plural text DEFAULT 'Employees'::text NOT NULL,
                                         teacher_singular text DEFAULT 'Teacher'::text NOT NULL,
                                         teacher_plural text DEFAULT 'Teachers'::text NOT NULL,
                                         client_postal text DEFAULT 'Whould you like to receive postal communications?'::text NOT NULL,
                                         client_sms text DEFAULT 'Whould you like to receive SMS messages from us?'::text NOT NULL,
                                         client_email text DEFAULT 'Whould you like to receive email communications?'::text NOT NULL,
                                         client_phone text DEFAULT 'Whould you like to receive phone calls?'::text NOT NULL,
                                         leads_postal text DEFAULT 'Whould you like to receive postal communications?'::text NOT NULL,
                                         leads_sms text DEFAULT 'Whould you like to receive SMS messages from us?'::text NOT NULL,
                                         leads_email text DEFAULT 'Whould you like to receive email communications?'::text NOT NULL,
                                         leads_phone text DEFAULT 'Whould you like to receive phone calls?'::text NOT NULL,
                                         vat text DEFAULT 'VAT'::text NOT NULL,
                                         phone text
                                     );
CREATE SEQUENCE public.business_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.business_details_id_seq OWNED BY public.business_details.id;
CREATE TABLE public.calendar_settings (
                                          id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                          created_at timestamp with time zone DEFAULT now() NOT NULL,
                                          updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                          time_slot_size integer NOT NULL,
                                          start_time time without time zone NOT NULL,
                                          end_time time without time zone NOT NULL,
                                          auto_lock integer NOT NULL,
                                          allow_appointments_to_overlap boolean NOT NULL,
                                          appointment_reminder boolean NOT NULL,
                                          email_confirmation boolean NOT NULL,
                                          sms_confirmation boolean NOT NULL,
                                          request_feedback boolean NOT NULL,
                                          enable_initials boolean NOT NULL,
                                          hide_surnames boolean NOT NULL,
                                          hide_appointment_times boolean NOT NULL,
                                          font_size text,
                                          raise_invoice_when_appointment_is_completed boolean NOT NULL,
                                          advanced_calendar_lockout boolean NOT NULL,
                                          disable_booking_from_package boolean NOT NULL,
                                          disable_filtering_by_service boolean NOT NULL,
                                          auto_complete boolean NOT NULL,
                                          ordering_the_employees_by_location boolean NOT NULL,
                                          hide_client_name_on_appointment_arrival_notification boolean NOT NULL,
                                          allow_service_without_contract_price boolean NOT NULL,
                                          hide_show_accounts boolean NOT NULL,
                                          group_user_columns_by_location boolean NOT NULL,
                                          revert_to_original_room_view boolean NOT NULL
                                      );
CREATE TABLE public.cancellation_reasons (
                                             id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                             name text NOT NULL,
                                             type text NOT NULL,
                                             cancellation_policy text NOT NULL,
                                             is_active boolean NOT NULL,
                                             created_at timestamp with time zone DEFAULT now() NOT NULL,
                                             updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                             "order" integer NOT NULL
                                         );
CREATE SEQUENCE public.cancellation_reasons_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.cancellation_reasons_order_seq OWNED BY public.cancellation_reasons."order";
CREATE TABLE public.candidate_list (
                                       id integer NOT NULL,
                                       first_name text NOT NULL,
                                       last_name text NOT NULL,
                                       rating integer NOT NULL,
                                       phone text NOT NULL,
                                       created_at timestamp with time zone DEFAULT now() NOT NULL,
                                       updated_at timestamp with time zone DEFAULT now() NOT NULL
                                   );
CREATE SEQUENCE public.candidate_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.candidate_list_id_seq OWNED BY public.candidate_list.id;
CREATE TABLE public.categories (
                                   id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                   created_at timestamp with time zone DEFAULT now() NOT NULL,
                                   updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                   "order" integer NOT NULL,
                                   is_active boolean DEFAULT true NOT NULL,
                                   name text NOT NULL,
                                   color text,
                                   image text,
                                   assigned text
                               );
CREATE SEQUENCE public.categories_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.categories_order_seq OWNED BY public.categories."order";
CREATE TABLE public.category (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 is_active boolean DEFAULT true NOT NULL,
                                 "order" integer NOT NULL,
                                 name text NOT NULL,
                                 "productsAssigned" integer NOT NULL,
                                 "groupName" text
                             );
CREATE SEQUENCE public.category_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.category_order_seq OWNED BY public.category."order";
CREATE TABLE public.chat (
                             id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                             created_at timestamp with time zone DEFAULT now() NOT NULL,
                             updated_at timestamp with time zone DEFAULT now() NOT NULL,
                             message text NOT NULL,
                             company_id integer NOT NULL,
                             "from" integer NOT NULL,
                             "to" integer NOT NULL
                         );
COMMENT ON TABLE public.chat IS 'Chat messages';
CREATE TABLE public.clients_data (
                                     id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                     name text,
                                     is_liked boolean DEFAULT false NOT NULL,
                                     is_locked boolean DEFAULT false NOT NULL,
                                     label text,
                                     format text,
                                     "fieldFor" text,
                                     category text,
                                     is_mendatory boolean DEFAULT false NOT NULL,
                                     is_private boolean DEFAULT false NOT NULL,
                                     is_active boolean DEFAULT true NOT NULL,
                                     created_date timestamp with time zone DEFAULT statement_timestamp() NOT NULL
                                 );
CREATE TABLE public.colors (
                               id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                               created_at timestamp with time zone DEFAULT now() NOT NULL,
                               updated_at timestamp with time zone DEFAULT now() NOT NULL,
                               color text NOT NULL
                           );
CREATE TABLE public.contacts (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 first_name text NOT NULL,
                                 last_name text NOT NULL,
                                 client_id text NOT NULL,
                                 mobile_number bigint NOT NULL
                             );
CREATE TABLE public.courses (
                                id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                created_at timestamp with time zone DEFAULT now() NOT NULL,
                                updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                name text,
                                service text,
                                session integer DEFAULT 0 NOT NULL,
                                is_active boolean DEFAULT true NOT NULL,
                                "order" integer NOT NULL
                            );
CREATE SEQUENCE public.courses_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.courses_order_seq OWNED BY public.courses."order";
CREATE TABLE public.courses_setup (
                                      id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                      created_at timestamp with time zone DEFAULT now() NOT NULL,
                                      updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                      "order" integer NOT NULL,
                                      name text NOT NULL,
                                      service text NOT NULL,
                                      session integer NOT NULL,
                                      is_active boolean NOT NULL
                                  );
CREATE TABLE public.credit_note_type (
                                         id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                         name text NOT NULL,
                                         invoice_prefix text NOT NULL,
                                         is_active boolean NOT NULL,
                                         created_at timestamp with time zone DEFAULT now() NOT NULL,
                                         updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                         "order" integer NOT NULL,
                                         code text
                                     );
CREATE SEQUENCE public.credit_note_type_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.credit_note_type_order_seq OWNED BY public.credit_note_type."order";
CREATE TABLE public.credit_notes (
                                     id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                     created_at timestamp with time zone DEFAULT now() NOT NULL,
                                     updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                     credit_no text NOT NULL,
                                     location text NOT NULL,
                                     credit_date date NOT NULL,
                                     customer text NOT NULL,
                                     debtor text NOT NULL,
                                     invoice_no numeric NOT NULL,
                                     total numeric NOT NULL,
                                     type text NOT NULL
                                 );
CREATE TABLE public.custom_fields_categories (
                                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                                 category text,
                                                 assigned_fields text,
                                                 created_date timestamp with time zone DEFAULT statement_timestamp() NOT NULL,
                                                 is_active boolean DEFAULT true NOT NULL
                                             );
CREATE TABLE public.debt (
                             id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                             created_at timestamp with time zone DEFAULT now() NOT NULL,
                             updated_at timestamp with time zone DEFAULT now() NOT NULL,
                             invoice_no numeric NOT NULL,
                             location text NOT NULL,
                             inv_date date NOT NULL,
                             customer text NOT NULL,
                             debtor text NOT NULL,
                             status boolean NOT NULL,
                             age numeric NOT NULL,
                             balance numeric NOT NULL,
                             last_action text NOT NULL
                         );
CREATE TABLE public.departments (
                                    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                    name text NOT NULL,
                                    created_at timestamp with time zone DEFAULT now() NOT NULL,
                                    updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                    is_active boolean NOT NULL,
                                    "order" integer NOT NULL
                                );
CREATE SEQUENCE public.departments_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.departments_order_seq OWNED BY public.departments."order";
CREATE TABLE public.diagnostic_codes (
                                         code text DEFAULT '-'::text NOT NULL,
                                         layer1 text DEFAULT '-'::text NOT NULL,
                                         layer2 text DEFAULT '-'::text NOT NULL,
                                         layer3 text DEFAULT '-'::text NOT NULL,
                                         description text DEFAULT '-'::text NOT NULL,
                                         id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                         created_at timestamp with time zone DEFAULT now() NOT NULL,
                                         updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                         "order" integer NOT NULL,
                                         layer4 text DEFAULT '-'::text NOT NULL,
                                         is_active boolean DEFAULT true NOT NULL,
                                         "ICD9_code" text,
                                         "ICD10_code" text,
                                         "OSICS10_code" text
                                     );
CREATE SEQUENCE public.diagnostic_codes_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.diagnostic_codes_order_seq OWNED BY public.diagnostic_codes."order";
CREATE TABLE public.drugs (
                              id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                              name text NOT NULL,
                              dosage text NOT NULL,
                              unit text NOT NULL,
                              frequency text NOT NULL,
                              route text NOT NULL,
                              comment text,
                              created_date timestamp with time zone DEFAULT statement_timestamp() NOT NULL,
                              is_active boolean DEFAULT false NOT NULL
                          );
CREATE TABLE public.family_relationships (
                                             created_at timestamp with time zone DEFAULT now() NOT NULL,
                                             updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                             relation_name text NOT NULL,
                                             is_active boolean NOT NULL,
                                             reserve_relation text,
                                             "order" integer NOT NULL,
                                             id uuid DEFAULT public.gen_random_uuid() NOT NULL
                                         );
COMMENT ON TABLE public.family_relationships IS 'family_relationships';
CREATE SEQUENCE public.family_relationships_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.family_relationships_order_seq OWNED BY public.family_relationships."order";
CREATE TABLE public.feature_flags (
                                      id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                      page_slug text NOT NULL,
                                      fallback_slug text NOT NULL,
                                      status boolean DEFAULT true NOT NULL
                                  );
COMMENT ON TABLE public.feature_flags IS 'If status flag is 0 id prevents the default page content and renders the fallback slug in iframe';
CREATE TABLE public.invoices (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 invoice_no integer NOT NULL,
                                 location text NOT NULL,
                                 inv_date date NOT NULL,
                                 customer text NOT NULL,
                                 status text NOT NULL,
                                 payment boolean NOT NULL,
                                 net numeric NOT NULL,
                                 vat numeric NOT NULL,
                                 gross numeric NOT NULL,
                                 paid numeric NOT NULL,
                                 balance numeric NOT NULL,
                                 debtor text,
                                 invoice_logo text
                             );
CREATE TABLE public.issuing_company (
                                        id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                        created_at timestamp with time zone DEFAULT now() NOT NULL,
                                        updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                        name text NOT NULL,
                                        is_active boolean,
                                        "order" integer NOT NULL,
                                        phone text,
                                        website text,
                                        country text,
                                        city text,
                                        street text,
                                        post_code numeric,
                                        invoice_template text,
                                        invoice_prefix text,
                                        invoice_starting_number numeric,
                                        vat_registered boolean DEFAULT false
                                    );
CREATE SEQUENCE public.issuing_company_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.issuing_company_order_seq OWNED BY public.issuing_company."order";
CREATE TABLE public.job_candidates (
                                       id integer NOT NULL,
                                       job_opening_id integer NOT NULL,
                                       candidate_id integer NOT NULL,
                                       status text NOT NULL,
                                       created_at timestamp with time zone DEFAULT now() NOT NULL,
                                       updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                       is_new boolean DEFAULT true NOT NULL
                                   );
CREATE SEQUENCE public.job_candidates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.job_candidates_id_seq OWNED BY public.job_candidates.id;
CREATE TABLE public.job_openings (
                                     title text NOT NULL,
                                     city text NOT NULL,
                                     country text NOT NULL,
                                     hiring_lead integer NOT NULL,
                                     is_active boolean DEFAULT false,
                                     id integer NOT NULL,
                                     created_at timestamp with time zone DEFAULT now() NOT NULL,
                                     updated_at timestamp with time zone DEFAULT now() NOT NULL
                                 );
CREATE SEQUENCE public.job_openings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.job_openings_id_seq OWNED BY public.job_openings.id;
CREATE TABLE public.job_title (
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                  name text NOT NULL,
                                  created_at timestamp with time zone DEFAULT now() NOT NULL,
                                  updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                  is_active boolean NOT NULL,
                                  "order" integer NOT NULL
                              );
CREATE SEQUENCE public.job_title_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.job_title_order_seq OWNED BY public.job_title."order";
CREATE TABLE public.labs_dashboard (
                                       "labNo" integer NOT NULL,
                                       client text NOT NULL,
                                       test text NOT NULL,
                                       requested text NOT NULL,
                                       "lastUpdate" text NOT NULL,
                                       lab text NOT NULL,
                                       requester text NOT NULL,
                                       public boolean DEFAULT true NOT NULL,
                                       id uuid DEFAULT public.gen_random_uuid() NOT NULL
                                   );
CREATE TABLE public.lead (
                             name text NOT NULL,
                             email text NOT NULL,
                             phone numeric NOT NULL,
                             age integer NOT NULL,
                             location text NOT NULL,
                             owner text NOT NULL,
                             status text NOT NULL,
                             source text NOT NULL,
                             interest text NOT NULL,
                             id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                             created_at date,
                             updated_at date,
                             "order" integer NOT NULL,
                             is_active boolean DEFAULT true NOT NULL
                         );
COMMENT ON TABLE public.lead IS 'lead view ';
CREATE TABLE public.lead_fields (
                                    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                    name text,
                                    label text,
                                    format text,
                                    "fieldFor" text,
                                    category text,
                                    is_mendatory boolean DEFAULT true NOT NULL,
                                    is_private boolean DEFAULT false NOT NULL,
                                    is_active boolean DEFAULT true NOT NULL,
                                    is_locked boolean DEFAULT false NOT NULL,
                                    created_date timestamp with time zone DEFAULT statement_timestamp() NOT NULL
                                );
CREATE TABLE public.library (
                                id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                created_at timestamp with time zone DEFAULT now() NOT NULL,
                                updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                name text NOT NULL,
                                provider_no text,
                                type text,
                                email text,
                                phone text,
                                is_active boolean NOT NULL,
                                "order" integer NOT NULL
                            );
CREATE TABLE public.library_installers (
                                           id integer NOT NULL,
                                           library_name text NOT NULL,
                                           library_description text NOT NULL,
                                           library_image text,
                                           library_location text,
                                           library_language text,
                                           data jsonb NOT NULL,
                                           created_date timestamp with time zone DEFAULT statement_timestamp() NOT NULL,
                                           is_plus boolean DEFAULT false NOT NULL
                                       );
CREATE SEQUENCE public.library_installers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.library_installers_id_seq OWNED BY public.library_installers.id;
CREATE SEQUENCE public.library_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.library_order_seq OWNED BY public.library."order";
CREATE TABLE public.lms_slugs (
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                  slug text NOT NULL,
                                  article_urls jsonb,
                                  webinar text,
                                  blogs jsonb,
                                  videos jsonb,
                                  created_date timestamp with time zone DEFAULT statement_timestamp() NOT NULL
                              );
CREATE TABLE public.locations (
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                  name text NOT NULL,
                                  img text NOT NULL,
                                  address text,
                                  "order" integer NOT NULL,
                                  is_active boolean NOT NULL,
                                  created_at timestamp with time zone DEFAULT now() NOT NULL,
                                  updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                  employees json,
                                  badges jsonb,
                                  phone text,
                                  email text,
                                  website text,
                                  "hasCalender" boolean DEFAULT false NOT NULL,
                                  bookable boolean DEFAULT false NOT NULL,
                                  "showOnline" boolean DEFAULT false NOT NULL,
                                  apt text,
                                  postcode text,
                                  "position" json
                              );
CREATE SEQUENCE public.locations_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.locations_order_seq OWNED BY public.locations."order";
CREATE TABLE public.marketing_campaign (
                                           id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                           created_at timestamp with time zone DEFAULT now() NOT NULL,
                                           updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                           name text NOT NULL,
                                           "order" integer NOT NULL
                                       );
CREATE SEQUENCE public.marketing_campaign_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.marketing_campaign_order_seq OWNED BY public.marketing_campaign."order";
CREATE TABLE public.marketing_referral (
                                           id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                           created_at timestamp with time zone DEFAULT now() NOT NULL,
                                           updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                           referer text NOT NULL,
                                           referee text NOT NULL,
                                           date date DEFAULT now() NOT NULL,
                                           spend numeric DEFAULT 0 NOT NULL,
                                           incentive boolean DEFAULT false NOT NULL,
                                           state text NOT NULL
                                       );
COMMENT ON TABLE public.marketing_referral IS 'Customer Referrals & Referrals Statistics';
CREATE TABLE public.marketing_source (
                                         id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                         created_at timestamp with time zone DEFAULT now() NOT NULL,
                                         updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                         name text NOT NULL,
                                         is_active boolean DEFAULT true NOT NULL,
                                         "order" integer NOT NULL
                                     );
CREATE SEQUENCE public.marketing_source_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.marketing_source_order_seq OWNED BY public.marketing_source."order";
CREATE TABLE public.news (
                             date date DEFAULT now() NOT NULL,
                             image text NOT NULL,
                             link text NOT NULL,
                             id integer NOT NULL,
                             title text NOT NULL,
                             description text NOT NULL
                         );
CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;
CREATE TABLE public.notification_toggle (
                                            id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                            "user" integer NOT NULL,
                                            company integer NOT NULL,
                                            notification_type uuid NOT NULL,
                                            enabled boolean DEFAULT false NOT NULL
                                        );
CREATE TABLE public.notification_types (
                                           id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                           type text NOT NULL,
                                           description text NOT NULL,
                                           permission_type text,
                                           notification_type text NOT NULL,
                                           title text,
                                           name text,
                                           destination text
                                       );
CREATE TABLE public.notification_types_enum (
                                                type text NOT NULL,
                                                description text NOT NULL
                                            );
CREATE TABLE public.notifications (
                                      id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                      created_at timestamp with time zone DEFAULT now() NOT NULL,
                                      updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                      "order" integer NOT NULL,
                                      sent_to jsonb,
                                      type uuid NOT NULL,
                                      is_read jsonb,
                                      variables jsonb,
                                      destination text,
                                      sent_by integer,
                                      loop integer
                                  );
CREATE SEQUENCE public.notifications_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.notifications_order_seq OWNED BY public.notifications."order";
CREATE TABLE public.packages (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 name text,
                                 quantity json,
                                 is_active boolean DEFAULT true NOT NULL,
                                 "order" integer NOT NULL
                             );
CREATE SEQUENCE public.packages_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.packages_order_seq OWNED BY public.packages."order";
CREATE TABLE public.packages_setup (
                                       id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                       created_at timestamp with time zone DEFAULT now() NOT NULL,
                                       updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                       "order" integer NOT NULL,
                                       name text NOT NULL,
                                       quantity json NOT NULL,
                                       is_active boolean NOT NULL
                                   );
CREATE TABLE public.payment_types (
                                      id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                      payment_type text NOT NULL,
                                      name text NOT NULL,
                                      description text NOT NULL,
                                      gl_code text NOT NULL,
                                      is_active boolean NOT NULL,
                                      created_at timestamp with time zone DEFAULT now() NOT NULL,
                                      updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                      "order" integer NOT NULL
                                  );
CREATE SEQUENCE public.payment_types_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.payment_types_order_seq OWNED BY public.payment_types."order";
CREATE TABLE public.payments (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 payment_no numeric NOT NULL,
                                 location text NOT NULL,
                                 inv_date date NOT NULL,
                                 account text NOT NULL,
                                 amount numeric NOT NULL,
                                 payment_method text NOT NULL,
                                 "user" text NOT NULL,
                                 against integer
                             );
CREATE TABLE public.peer_review (
                                    id integer NOT NULL,
                                    company_id integer NOT NULL,
                                    review_period date NOT NULL,
                                    email_sent_date date NOT NULL,
                                    users_sent_to text,
                                    user_id integer
                                );
CREATE SEQUENCE public.peer_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.peer_review_id_seq OWNED BY public.peer_review.id;
CREATE TABLE public.petty_cash_types (
                                         id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                         name text NOT NULL,
                                         is_active boolean NOT NULL,
                                         created_at timestamp with time zone DEFAULT now() NOT NULL,
                                         updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                         "order" integer NOT NULL
                                     );
CREATE SEQUENCE public.petty_cash_types_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.petty_cash_types_order_seq OWNED BY public.petty_cash_types."order";
CREATE TABLE public.product_lists (
                                      id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                      created_at timestamp with time zone DEFAULT now() NOT NULL,
                                      updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                      name text NOT NULL,
                                      category text NOT NULL,
                                      cost numeric NOT NULL,
                                      retail numeric NOT NULL,
                                      quantity integer NOT NULL,
                                      status text NOT NULL,
                                      "order" integer NOT NULL,
                                      is_active boolean NOT NULL
                                  );
CREATE SEQUENCE public.product_lists_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.product_lists_order_seq OWNED BY public.product_lists."order";
CREATE TABLE public.prototype (
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                  name text NOT NULL,
                                  "order" integer NOT NULL,
                                  is_active boolean NOT NULL,
                                  created_at timestamp with time zone DEFAULT now() NOT NULL,
                                  updated_at timestamp with time zone DEFAULT now() NOT NULL
                              );
CREATE SEQUENCE public.prototype_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.prototype_order_seq OWNED BY public.prototype."order";
CREATE TABLE public.purchase_order (
                                       id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                       created_at timestamp with time zone DEFAULT now() NOT NULL,
                                       updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                       po_number text NOT NULL,
                                       create_date text NOT NULL,
                                       supplier text NOT NULL,
                                       created_by text NOT NULL,
                                       location text NOT NULL,
                                       total_cost integer NOT NULL,
                                       is_active boolean NOT NULL
                                   );
CREATE TABLE public.resources (
                                  created_at timestamp with time zone DEFAULT now() NOT NULL,
                                  updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                  "order" integer NOT NULL,
                                  name text NOT NULL,
                                  location text DEFAULT true NOT NULL,
                                  is_active boolean DEFAULT true NOT NULL,
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL
                              );
CREATE SEQUENCE public.resources_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.resources_order_seq OWNED BY public.resources."order";
CREATE TABLE public.rooms (
                              id integer NOT NULL,
                              created_at timestamp with time zone DEFAULT now() NOT NULL,
                              updated_at timestamp with time zone DEFAULT now() NOT NULL,
                              "order" integer NOT NULL,
                              room_name text NOT NULL,
                              location text NOT NULL,
                              is_active boolean NOT NULL
                          );
CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;
CREATE SEQUENCE public.rooms_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.rooms_order_seq OWNED BY public.rooms."order";
CREATE TABLE public.rota_templates (
                                       created_at timestamp with time zone DEFAULT now() NOT NULL,
                                       updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                       name text NOT NULL,
                                       start_time time with time zone NOT NULL,
                                       end_time time with time zone NOT NULL,
                                       is_active boolean DEFAULT true NOT NULL,
                                       "order" integer DEFAULT nextval('public."Labs_order_seq"'::regclass) NOT NULL,
                                       id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                       days json
                                   );
COMMENT ON TABLE public.rota_templates IS 'rota_template';
CREATE TABLE public.salutation (
                                   id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                   created_at timestamp with time zone DEFAULT now() NOT NULL,
                                   updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                   salutation text NOT NULL,
                                   is_active boolean NOT NULL,
                                   "order" integer NOT NULL
                               );
CREATE SEQUENCE public.salutation_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.salutation_order_seq OWNED BY public.salutation."order";
CREATE TABLE public.service (
                                id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                created_at timestamp with time zone DEFAULT now() NOT NULL,
                                updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                is_active boolean DEFAULT true NOT NULL,
                                "order" integer NOT NULL,
                                service_name text NOT NULL,
                                duration text,
                                staff_assigned text,
                                price text,
                                type text NOT NULL,
                                code text,
                                category text,
                                color text,
                                image text,
                                sku text,
                                procedure_code text,
                                invoice_item_name text,
                                display_text_on_invoice text,
                                is_package_session boolean DEFAULT false NOT NULL,
                                pricing_type text NOT NULL,
                                service_price text,
                                tax text,
                                online_payment_type text NOT NULL,
                                online_payment_amount text,
                                is_online_booking boolean DEFAULT true NOT NULL,
                                is_payment_before_booking boolean DEFAULT true NOT NULL,
                                employees json,
                                resources json,
                                locations json,
                                is_service_online boolean DEFAULT true NOT NULL,
                                friendly_name text,
                                description text,
                                patient_booking_type text NOT NULL,
                                timing_rules json,
                                room_resources json,
                                equipment_resources json,
                                max_clients integer,
                                contracts json
                            );
CREATE TABLE public.service_categories (
                                           id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                           name text NOT NULL,
                                           color text,
                                           image text,
                                           assigned text DEFAULT '1'::text,
                                           is_active boolean DEFAULT true NOT NULL,
                                           "order" integer NOT NULL,
                                           created_at timestamp with time zone DEFAULT now() NOT NULL,
                                           updated_at timestamp with time zone DEFAULT now() NOT NULL
                                       );
CREATE SEQUENCE public.service_categories_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.service_categories_order_seq OWNED BY public.service_categories."order";
CREATE SEQUENCE public.service_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.service_order_seq OWNED BY public.service."order";
CREATE TABLE public.services (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 is_active boolean DEFAULT true NOT NULL,
                                 "order" integer NOT NULL,
                                 service_name text NOT NULL,
                                 duration text NOT NULL,
                                 staff_assigned text NOT NULL,
                                 price text NOT NULL,
                                 type text NOT NULL,
                                 code text NOT NULL,
                                 category text NOT NULL,
                                 color text NOT NULL,
                                 image text NOT NULL,
                                 sku text NOT NULL,
                                 procedure_code text NOT NULL,
                                 invoice_item_name text NOT NULL,
                                 display_text_on_invoice text NOT NULL,
                                 is_package_session boolean DEFAULT false NOT NULL,
                                 pricing_type text NOT NULL,
                                 service_price text NOT NULL,
                                 tax text NOT NULL,
                                 online_payment_type text NOT NULL,
                                 online_payment_amount text NOT NULL,
                                 is_online_booking boolean DEFAULT true NOT NULL,
                                 is_payment_before_booking boolean DEFAULT true NOT NULL,
                                 employees json NOT NULL,
                                 resources json NOT NULL,
                                 locations json NOT NULL,
                                 is_service_online boolean DEFAULT true NOT NULL,
                                 friendly_name text NOT NULL,
                                 description text NOT NULL,
                                 patient_booking_type text NOT NULL,
                                 timing_rules json NOT NULL,
                                 max_clients text NOT NULL
                             );
CREATE SEQUENCE public.services_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.services_order_seq OWNED BY public.services."order";
CREATE TABLE public.stock_take (
                                   id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                   created_at timestamp with time zone DEFAULT now() NOT NULL,
                                   updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                   count_no text NOT NULL,
                                   name text NOT NULL,
                                   start_date text NOT NULL,
                                   counted_by text NOT NULL,
                                   total numeric NOT NULL,
                                   location text NOT NULL,
                                   status text,
                                   "discrepanciesUp" integer DEFAULT 0,
                                   "discrepanciesDown" integer DEFAULT 0
                               );
CREATE TABLE public.supplier (
                                 id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                 is_active boolean NOT NULL,
                                 supplier_name text NOT NULL,
                                 products_assigned integer NOT NULL,
                                 "order" integer DEFAULT nextval('public.departments_order_seq'::regclass) NOT NULL
                             );
CREATE TABLE public.tax_rates (
                                  id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                  created_at time with time zone DEFAULT now() NOT NULL,
                                  updated_at time with time zone DEFAULT now() NOT NULL,
                                  name text NOT NULL,
                                  value real NOT NULL,
                                  is_active boolean NOT NULL,
                                  "glCode" text,
                                  "order" integer NOT NULL
                              );
CREATE SEQUENCE public.tax_rates_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.tax_rates_order_seq OWNED BY public.tax_rates."order";
CREATE TABLE public.third_parties (
                                      id uuid DEFAULT public.gen_random_uuid() NOT NULL,
                                      created_at timestamp with time zone DEFAULT now() NOT NULL,
                                      updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                      name text NOT NULL,
                                      provider_no text,
                                      type text,
                                      email text,
                                      phone text,
                                      is_active boolean NOT NULL,
                                      "order" integer NOT NULL,
                                      website text,
                                      health_code_identifier text,
                                      country text,
                                      city text,
                                      street text,
                                      post_code text
                                  );
CREATE SEQUENCE public.third_parties_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.third_parties_order_seq OWNED BY public.third_parties."order";
CREATE TABLE public.user_list (
                                  id numeric NOT NULL,
                                  company numeric NOT NULL,
                                  admin boolean NOT NULL,
                                  first_name text NOT NULL,
                                  last_name text NOT NULL
                              );
ALTER TABLE ONLY public."Discounts" ALTER COLUMN "order" SET DEFAULT nextval('public."Discounts_order_seq"'::regclass);
ALTER TABLE ONLY public."Labs" ALTER COLUMN "order" SET DEFAULT nextval('public."Labs_order_seq"'::regclass);
ALTER TABLE ONLY public."Lists_campaign" ALTER COLUMN "order" SET DEFAULT nextval('public."Lists_campaign_order_seq"'::regclass);
ALTER TABLE ONLY public."Newsletter_campaign" ALTER COLUMN "order" SET DEFAULT nextval('public."Newsletter_campaign_order_seq"'::regclass);
ALTER TABLE ONLY public."SMS_campaign" ALTER COLUMN "order" SET DEFAULT nextval('public."SMS_campaign_order_seq"'::regclass);
ALTER TABLE ONLY public.appointment_status ALTER COLUMN "order" SET DEFAULT nextval('public.appointment_status_order_seq'::regclass);
ALTER TABLE ONLY public.business_details ALTER COLUMN id SET DEFAULT nextval('public.business_details_id_seq'::regclass);
ALTER TABLE ONLY public.cancellation_reasons ALTER COLUMN "order" SET DEFAULT nextval('public.cancellation_reasons_order_seq'::regclass);
ALTER TABLE ONLY public.candidate_list ALTER COLUMN id SET DEFAULT nextval('public.candidate_list_id_seq'::regclass);
ALTER TABLE ONLY public.categories ALTER COLUMN "order" SET DEFAULT nextval('public.categories_order_seq'::regclass);
ALTER TABLE ONLY public.category ALTER COLUMN "order" SET DEFAULT nextval('public.category_order_seq'::regclass);
ALTER TABLE ONLY public.courses ALTER COLUMN "order" SET DEFAULT nextval('public.courses_order_seq'::regclass);
ALTER TABLE ONLY public.credit_note_type ALTER COLUMN "order" SET DEFAULT nextval('public.credit_note_type_order_seq'::regclass);
ALTER TABLE ONLY public.departments ALTER COLUMN "order" SET DEFAULT nextval('public.departments_order_seq'::regclass);
ALTER TABLE ONLY public.diagnostic_codes ALTER COLUMN "order" SET DEFAULT nextval('public.diagnostic_codes_order_seq'::regclass);
ALTER TABLE ONLY public.diagnostic_codeset ALTER COLUMN "order" SET DEFAULT nextval('public."Diagnostic_code_order_seq"'::regclass);
ALTER TABLE ONLY public.family_relationships ALTER COLUMN "order" SET DEFAULT nextval('public.family_relationships_order_seq'::regclass);
ALTER TABLE ONLY public.issuing_company ALTER COLUMN "order" SET DEFAULT nextval('public.issuing_company_order_seq'::regclass);
ALTER TABLE ONLY public.job_candidates ALTER COLUMN id SET DEFAULT nextval('public.job_candidates_id_seq'::regclass);
ALTER TABLE ONLY public.job_openings ALTER COLUMN id SET DEFAULT nextval('public.job_openings_id_seq'::regclass);
ALTER TABLE ONLY public.job_title ALTER COLUMN "order" SET DEFAULT nextval('public.job_title_order_seq'::regclass);
ALTER TABLE ONLY public.library ALTER COLUMN "order" SET DEFAULT nextval('public.library_order_seq'::regclass);
ALTER TABLE ONLY public.library_installers ALTER COLUMN id SET DEFAULT nextval('public.library_installers_id_seq'::regclass);
ALTER TABLE ONLY public.locations ALTER COLUMN "order" SET DEFAULT nextval('public.locations_order_seq'::regclass);
ALTER TABLE ONLY public.marketing_campaign ALTER COLUMN "order" SET DEFAULT nextval('public.marketing_campaign_order_seq'::regclass);
ALTER TABLE ONLY public.marketing_source ALTER COLUMN "order" SET DEFAULT nextval('public.marketing_source_order_seq'::regclass);
ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);
ALTER TABLE ONLY public.notifications ALTER COLUMN "order" SET DEFAULT nextval('public.notifications_order_seq'::regclass);
ALTER TABLE ONLY public.packages ALTER COLUMN "order" SET DEFAULT nextval('public.packages_order_seq'::regclass);
ALTER TABLE ONLY public.payment_types ALTER COLUMN "order" SET DEFAULT nextval('public.payment_types_order_seq'::regclass);
ALTER TABLE ONLY public.peer_review ALTER COLUMN id SET DEFAULT nextval('public.peer_review_id_seq'::regclass);
ALTER TABLE ONLY public.petty_cash_types ALTER COLUMN "order" SET DEFAULT nextval('public.petty_cash_types_order_seq'::regclass);
ALTER TABLE ONLY public.product_lists ALTER COLUMN "order" SET DEFAULT nextval('public.product_lists_order_seq'::regclass);
ALTER TABLE ONLY public.prototype ALTER COLUMN "order" SET DEFAULT nextval('public.prototype_order_seq'::regclass);
ALTER TABLE ONLY public.resources ALTER COLUMN "order" SET DEFAULT nextval('public.resources_order_seq'::regclass);
ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);
ALTER TABLE ONLY public.rooms ALTER COLUMN "order" SET DEFAULT nextval('public.rooms_order_seq'::regclass);
ALTER TABLE ONLY public.salutation ALTER COLUMN "order" SET DEFAULT nextval('public.salutation_order_seq'::regclass);
ALTER TABLE ONLY public.service ALTER COLUMN "order" SET DEFAULT nextval('public.service_order_seq'::regclass);
ALTER TABLE ONLY public.service_categories ALTER COLUMN "order" SET DEFAULT nextval('public.service_categories_order_seq'::regclass);
ALTER TABLE ONLY public.services ALTER COLUMN "order" SET DEFAULT nextval('public.services_order_seq'::regclass);
ALTER TABLE ONLY public.tax_rates ALTER COLUMN "order" SET DEFAULT nextval('public.tax_rates_order_seq'::regclass);
ALTER TABLE ONLY public.third_parties ALTER COLUMN "order" SET DEFAULT nextval('public.third_parties_order_seq'::regclass);
ALTER TABLE ONLY public.diagnostic_codeset
    ADD CONSTRAINT "Diagnostic_code_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Discounts"
    ADD CONSTRAINT "Discounts_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.lms_slugs
    ADD CONSTRAINT "LMS_slugs_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Labs"
    ADD CONSTRAINT "Labs_email_key" UNIQUE (email);
ALTER TABLE ONLY public."Labs"
    ADD CONSTRAINT "Labs_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Library"
    ADD CONSTRAINT "Library_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Lists_campaign"
    ADD CONSTRAINT "Lists_campaign_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Newsletter_campaign"
    ADD CONSTRAINT "Newsletter_campaign_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."SMS_campaign"
    ADD CONSTRAINT "SMS_campaign_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.tax_rates
    ADD CONSTRAINT "Taxes_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.notification_types
    ADD CONSTRAINT application_notification_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.application_notifications
    ADD CONSTRAINT application_notifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.appointment_status
    ADD CONSTRAINT appointment_status_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.block_out_options
    ADD CONSTRAINT block_out_options_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.business_details
    ADD CONSTRAINT business_details_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.calendar_settings
    ADD CONSTRAINT calendar_settings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.cancellation_reasons
    ADD CONSTRAINT cancellation_reasons_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.candidate_list
    ADD CONSTRAINT candidate_list_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.clients_data
    ADD CONSTRAINT clients_data_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.courses_setup
    ADD CONSTRAINT courses_setup_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.credit_note_type
    ADD CONSTRAINT credit_note_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.credit_notes
    ADD CONSTRAINT credit_notes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.custom_fields_categories
    ADD CONSTRAINT custom_fields_categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.debt
    ADD CONSTRAINT debt_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.diagnostic_codes
    ADD CONSTRAINT diagnostic_codes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.drugs
    ADD CONSTRAINT drugs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.family_relationships
    ADD CONSTRAINT family_relationships_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.feature_flags
    ADD CONSTRAINT feature_flags_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.issuing_company
    ADD CONSTRAINT issuing_company_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job_candidates
    ADD CONSTRAINT job_candidates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job_openings
    ADD CONSTRAINT job_openings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job_title
    ADD CONSTRAINT job_title_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.labs_dashboard
    ADD CONSTRAINT labs_dashboard_id_key UNIQUE (id);
ALTER TABLE ONLY public.labs_dashboard
    ADD CONSTRAINT labs_dashboard_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lead_fields
    ADD CONSTRAINT lead_fields_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lead
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.library_installers
    ADD CONSTRAINT library_installers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.marketing_campaign
    ADD CONSTRAINT marketing_campaign_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.marketing_referral
    ADD CONSTRAINT marketing_referral_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.marketing_referral
    ADD CONSTRAINT marketing_referral_referee_key UNIQUE (referee);
ALTER TABLE ONLY public.marketing_source
    ADD CONSTRAINT marketing_source_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notification_toggle
    ADD CONSTRAINT notification_toggle_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notification_types_enum
    ADD CONSTRAINT notification_types_enum_pkey PRIMARY KEY (type);
ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.packages
    ADD CONSTRAINT packages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.packages_setup
    ADD CONSTRAINT packages_setup_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.payment_types
    ADD CONSTRAINT payment_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.peer_review
    ADD CONSTRAINT peer_review_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.petty_cash_types
    ADD CONSTRAINT petty_cash_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT product_list_purchase_order_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.stock_take
    ADD CONSTRAINT product_list_stock_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT product_list_supplier_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.product_lists
    ADD CONSTRAINT product_lists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prototype
    ADD CONSTRAINT prototype_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.rota_templates
    ADD CONSTRAINT rota_templates_id_key UNIQUE (id);
ALTER TABLE ONLY public.rota_templates
    ADD CONSTRAINT rota_templates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.salutation
    ADD CONSTRAINT salutation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service_categories
    ADD CONSTRAINT service_categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.third_parties
    ADD CONSTRAINT third_parties_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_list
    ADD CONSTRAINT user_list_pkey PRIMARY KEY (id);
CREATE TRIGGER "set_public_Diagnostic_code_updated_at" BEFORE UPDATE ON public.diagnostic_codeset FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Diagnostic_code_updated_at" ON public.diagnostic_codeset IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Discounts_updated_at" BEFORE UPDATE ON public."Discounts" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Discounts_updated_at" ON public."Discounts" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Library_updated_at" BEFORE UPDATE ON public."Library" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Library_updated_at" ON public."Library" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Lists_campaign_updated_at" BEFORE UPDATE ON public."Lists_campaign" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Lists_campaign_updated_at" ON public."Lists_campaign" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_Newsletter_campaign_updated_at" BEFORE UPDATE ON public."Newsletter_campaign" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Newsletter_campaign_updated_at" ON public."Newsletter_campaign" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_SMS_campaign_updated_at" BEFORE UPDATE ON public."SMS_campaign" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_SMS_campaign_updated_at" ON public."SMS_campaign" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_calendar_settings_updated_at BEFORE UPDATE ON public.calendar_settings FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_calendar_settings_updated_at ON public.calendar_settings IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_candidate_list_updated_at BEFORE UPDATE ON public.candidate_list FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_candidate_list_updated_at ON public.candidate_list IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_chat_updated_at BEFORE UPDATE ON public.chat FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_chat_updated_at ON public.chat IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_colors_updated_at BEFORE UPDATE ON public.colors FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_colors_updated_at ON public.colors IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_contacts_updated_at ON public.contacts IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_courses_setup_updated_at BEFORE UPDATE ON public.courses_setup FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_courses_setup_updated_at ON public.courses_setup IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_diagnostic_codes_updated_at BEFORE UPDATE ON public.diagnostic_codes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_diagnostic_codes_updated_at ON public.diagnostic_codes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_family_relationships_updated_at BEFORE UPDATE ON public.family_relationships FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_family_relationships_updated_at ON public.family_relationships IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_issuing_company_updated_at BEFORE UPDATE ON public.issuing_company FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_issuing_company_updated_at ON public.issuing_company IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_job_candidates_updated_at BEFORE UPDATE ON public.job_candidates FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_job_candidates_updated_at ON public.job_candidates IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_job_openings_updated_at BEFORE UPDATE ON public.job_openings FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_job_openings_updated_at ON public.job_openings IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_marketing_campaign_updated_at BEFORE UPDATE ON public.marketing_campaign FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_marketing_campaign_updated_at ON public.marketing_campaign IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_marketing_referral_updated_at BEFORE UPDATE ON public.marketing_referral FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_marketing_referral_updated_at ON public.marketing_referral IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_marketing_source_updated_at BEFORE UPDATE ON public.marketing_source FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_marketing_source_updated_at ON public.marketing_source IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_packages_setup_updated_at BEFORE UPDATE ON public.packages_setup FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_packages_setup_updated_at ON public.packages_setup IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_rota_templates_updated_at BEFORE UPDATE ON public.rota_templates FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_rota_templates_updated_at ON public.rota_templates IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_salutation_updated_at BEFORE UPDATE ON public.salutation FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_salutation_updated_at ON public.salutation IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_third_parties_updated_at BEFORE UPDATE ON public.third_parties FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_third_parties_updated_at ON public.third_parties IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.application_notifications
    ADD CONSTRAINT application_notifications_notification_type_fkey FOREIGN KEY (notification_type) REFERENCES public.notification_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.job_candidates
    ADD CONSTRAINT job_candidates_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate_list(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.job_candidates
    ADD CONSTRAINT job_candidates_job_opening_id_fkey FOREIGN KEY (job_opening_id) REFERENCES public.job_openings(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.notification_toggle
    ADD CONSTRAINT notification_toggle_notification_type_fkey FOREIGN KEY (notification_type) REFERENCES public.notification_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.notification_types
    ADD CONSTRAINT notification_types_type_fkey FOREIGN KEY (notification_type) REFERENCES public.notification_types_enum(type) ON UPDATE RESTRICT ON DELETE RESTRICT;
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('e668d4e1-bbe5-4e68-8b54-cb444c438f4b', 'reports', 'index.php?p=reportmodule&section=report&noheader', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('704ab09e-f164-495b-b6eb-9dcb449ddeb1', 'team/users', 'index.php?p=staffs&noheader', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('6234f784-ff28-4dd3-9545-c9acd6d0f5ec', 'leads', 'index.php?p=leads&noheader', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('b9934d6b-ab7a-4f79-8a35-97594ad02ff3', 'leads', 'index.php?p=leads&noheader	', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('845bab04-b09b-43b4-9b5d-8793df03b154', 'calendar', 'pages/cal/', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('abd187ca-b17d-42ed-b7fc-5349593e2916', 'schedule-manager', 'pages/rota/', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('dcc85fab-a8a6-471b-802c-48190b7b8b81', 'reports/9', 'index.php?p=reportmodule&inp=reportdetail&type=contacts&id=9&noheader', false);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('e52ebc75-9f29-4a95-a300-f62c7fd9f226', 'reports/FI000', 'index.php?p=reportmodule&inp=reportdetail&type=sales&id=7264&noheader', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('51b95c4b-f13e-4e49-8ee1-87526d418b01', 'reports/FI001', 'index.php?p=reportmodule&inp=reportdetail&type=sales&field=date&id=6019&noheader', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('8079e6a0-4bc6-4747-a2bd-0d6d20414611', 'reports/FI002', 'index.php?p=reportmodule&inp=reportdetail&type=sales&id=7311&noheader', true);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('64652ad1-edde-47c6-99a6-01ab5f05b2b0', 'setup/integration', 'index.php?p=settings_all#&tab-integrations', false);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('408603ec-d170-4f91-97d9-fc519728dffc', 'setup/custom-fields', 'index.php?p=settings_all#&tab-integrations', false);
INSERT INTO public.feature_flags (id, page_slug, fallback_slug, status) VALUES ('0cdf2b69-d2e5-431e-ac1e-147e48a23c8c', 'dashboard', 'index.php?p=news_feed', false);
INSERT INTO public.notification_types_enum (type, description) VALUES ('new_feature_release', 'New Feature Release');
INSERT INTO public.notification_types_enum (type, description) VALUES ('referral', 'Click to learn more');
INSERT INTO public.notification_types_enum (type, description) VALUES ('new_appointment_via_calendar', 'new_appointment_via_calendar');
INSERT INTO public.notification_types_enum (type, description) VALUES ('new_appointment_via_pabau', '[patientName] booked [serviceName] appointment on [date] at [time]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('cancelled_appointment_via_calendar', '[staffName] cancelled a [serviceName] appointment for [clientName] on [date] at [time]. Cancellation reason: [cancellationReason]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('cancelled_appointment_via_pabau', '[patientName] cancelled a [serviceName] appointment on [date] at [time]. Cancellation reason: [cancellationReason]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('rescheduled_appointment_via_calendar', '[staffName] rescheduled a [serviceName] appointment for [clientName] on [date] at [time]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('rescheduled_appointment_via_pabau', '[staffName] r[patientName] rescheduled a [serviceName] appointment on [date] at [time]escheduled a [serviceName] appointment for [clientName] on [date] at [time]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('client_arrived_for_appointment', '[clientName] has arrived for the appointment [appointmentName]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('bookout', '[clientNa[staffName] invited you, and [staffList] to a bookout on [date] at [time]. Reason: [bookoutName]me] has arrived for the appointment [appointmentName]');
INSERT INTO public.notification_types_enum (type, description) VALUES ('holiday_request', 'Click here to review the request.');
INSERT INTO public.notification_types_enum (type, description) VALUES ('new_lead', '[lead_name] has enquired about [treatment_interest] . Click here for more information');
INSERT INTO public.notification_types_enum (type, description) VALUES ('report', '[report_name] [report_category_name] has been generated and sent to you.');
INSERT INTO public.notification_types_enum (type, description) VALUES ('inventory', '[staff_name] performed an inventory count. Click here to learn more');
INSERT INTO public.notification_types_enum (type, description) VALUES ('purchase_order_issued', '[staff_member] issued a purchase order [purchase_order_number] to [supplier_name]. Click here to learn more.');
INSERT INTO public.notification_types_enum (type, description) VALUES ('purchase_order_arrived', 'The purchase order [purchase_order_number] issued by [staff_member] on [purchase_order_date] has arrived. Click here to learn more');
INSERT INTO public.notification_types_enum (type, description) VALUES ('new_blog_post', 'new blog posted');
INSERT INTO public.notification_types_enum (type, description) VALUES ('newsletter_campaign', '[campaign_name] was delivered. Check out the statistics');
INSERT INTO public.notification_types_enum (type, description) VALUES ('sms_campaign', '[campaign_name] was delivered. Check out the statistics');
INSERT INTO public.notification_types_enum (type, description) VALUES ('news_and_announcements', 'news announcement');
INSERT INTO public.notification_types_enum (type, description) VALUES ('review', 'A review has been published for someone We encourage you to manage and respond to the review');
INSERT INTO public.notification_types_enum (type, description) VALUES ('feed_post', 'Receive a notification when someone makes a post to the buzzfeed.');
INSERT INTO public.notification_types_enum (type, description) VALUES ('like_post', 'Receive a notification when someone likes their wall post.');
INSERT INTO public.notification_types_enum (type, description) VALUES ('report_scheduled', 'Receive a notification when someone likes their wall post.');
INSERT INTO public.notification_types_enum (type, description) VALUES ('lead_inquiry', 'Receive notification whenever you receive new Enquiry.');
