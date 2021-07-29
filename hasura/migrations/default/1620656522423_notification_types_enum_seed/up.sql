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
INSERT INTO public.notification_types_enum (type, description) VALUES ('lead_assigned', 'Receive notification whenever you assigned to new lead.');