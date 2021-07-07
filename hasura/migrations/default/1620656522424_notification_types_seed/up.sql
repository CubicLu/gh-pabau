SET check_function_bodies = false;
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('ca39422d-8ed9-4e0f-ae31-5a4ae453d4b8', 'Rescheduled appointment via calendar', '[who] rescheduled a [service_name] appointment for [client_name] on [date] at [time]', NULL, 'rescheduled_appointment_via_calendar', 'Rescheduled appointment', 'Appointment', '/calendar');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('4625dba7-7901-42ac-a02a-e5791f19bf37', 'SMS campaign', '[campaign_name] was delivered. Check out the statistics', NULL, 'sms_campaign', '[campaign_name] was delivered', 'SMS campaign', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('5fcbef23-aaf3-40e1-b1b4-c087abd1ba48', 'Rescheduled appointment via pabau', '[who] rescheduled a [service_name] appointment on [date] at [time]', NULL, 'rescheduled_appointment_via_pabau', 'Rescheduled appointment', 'Appointment', '/calendar');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('c7f49ba6-b8ad-417e-8628-e4f50b7ba32e', 'Report', '[report_name] [report_category_name] has been  generated  and sent to you', NULL, 'report', 'New [report_category_name] report', 'Report', '/team/report');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('8581e2d6-f777-436a-8c18-592c5bb020b2', 'Cancelled appointment via pabau', '[who] cancelled a [service_name] appointment on [date] at [time]. Cancellation reason: [cancellation_reason]', 'general', 'cancelled_appointment_via_pabau', 'Cancelled appointment', 'Appointment', '/calendar');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('74a676fb-366b-44ed-9644-7d51eed9b3a5', 'Newsletter campaign', '[campaign_name] was delivered. Check out the statistics.', NULL, 'newsletter_campaign', '[campaign_name] was delivered', 'Newsletter campaign', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('82fd2ed6-230b-47cb-9b60-5252b57ebebd', 'Client arrived for appointment', '[client_name] has arrived for the appointment  [appointment_name]', NULL, 'client_arrived_for_appointment', '[client_name] has arrived.', 'Appointment', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('066cf097-4a4d-4a18-bcb6-8d489447ea81', 'Bookout', '[staff_name] invited you, and [staff_list]  to a bookout on [date] at [time]. Reason: [bookout_name]', NULL, 'bookout', 'You were invited to a bookout', 'Bookout', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('982c15a4-24f4-42e1-bafd-8601c24b3a56', 'Holiday request', 'Click here to review the request.', NULL, 'holiday_request', '[staff_name]  [surname] requested a holiday', 'Holiday request', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('c189e842-06f6-4702-b0de-550378d9f2bf', 'Referral', 'Click to learn more', NULL, 'referral', 'Someone refers into the business', 'Referral', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('cf47d97c-07ca-4b23-86b3-093eead93f60', 'New Appointment via calendar', '[who] booked a [service_name] appointment for [client_name] on [date]  at [time]', NULL, 'new_appointment_via_calendar', 'New appointment', 'Appointment', '/calendar');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('62958eda-7e8f-4f34-b929-64cab808b302', 'New lead', '[lead_name] has enquired about [treatment_interest] . Click here for more information', NULL, 'new_lead', 'New lead', 'New lead', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('b8e967c1-871b-4b20-a0de-39d050464591', 'Inventory', '[staff_name] performed an inventory count.  Click here to learn more.', NULL, 'inventory', 'An Inventory count has been performed', 'Inventory', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('711375ef-6efe-4772-9035-73f3e4a6a13a', 'Purchase order issued', '[staff_member] issued a purchase order [purchase_order_number] to [supplier_name]. Click here to learn more.', NULL, 'purchase_order_issued', 'A purchase order has been issued', 'Purchase order', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('60718b25-1919-4339-aea7-38892dbda4b9', 'Cancelled appointment via calendar', '[who] cancelled a [service_name] appointment for [client_name] on [date] at [time]. Cancellation reason: [cancellation_reason]', NULL, 'cancelled_appointment_via_calendar', 'Cancelled appointment', 'Appointment', '/calendar');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('03efb5c4-5ea6-4875-b63e-57a89a225d33', 'New feature release title', 'New Feature Release', 'application', 'new_feature_release', 'New feature release', 'New feature release', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('d86da054-1b2a-4597-a5df-0af3d3fc2fda', 'News and Announcements', 'News and Announcements', 'application', 'news_and_announcements', 'News and Announcements', 'News and Announcements', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('71f7d9f8-a0ba-46ae-93df-bc2457a016b6', 'New Blog Post', 'New Blog Posted by [someone]', 'application', 'new_blog_post', 'New Blog Post', 'New Blog Post', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('1d1a1816-ea93-46fc-b542-2ce209e586eb', 'Feed post via pabau', 'Receive a notification when someone makes a post to the buzzfeed.', 'general', 'feed_post', 'Feed post ', 'Feed post ', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('27967ce4-76d1-4b83-a955-d9ff657c4e01', 'Like post via pabau', 'Receive a notification when someone likes their wall post.', 'general', 'like_post', 'Like post', 'Like post', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('3569596f-3047-4adc-852d-4564f638c6e1', 'Scheduled report via pabau', 'Receive a notification when someone likes their wall post.', 'general', 'report_scheduled', 'Scheduled report', 'Scheduled report', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('582d4a42-af0c-4ac3-90e0-d0c16dcfec6a', 'Lead inquiry via pabau', 'Receive notification whenever you receive new Enquiry.', 'general', 'lead_inquiry', 'Lead inquiry', 'Lead inquiry', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('fa089bcb-b76e-48dc-99ea-ffa999a9cc11', 'Purchase order', 'The purchase order [purchase_order_number] issued by [staff_member] on [purchase_order_date] has arrived. Click here to learn more', NULL, 'purchase_order_arrived', 'A purchase order has arrived', 'Purchase order', NULL);
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('ea9662c3-4e66-4461-940b-0927dd357016', 'Review', 'A review has been published for [employee_name].  We encourage you to manage and respond to the review.', NULL, 'review', 'New Review', 'Review', '/marketing/reviews');
INSERT INTO public.notification_types (id, type, description, permission_type, notification_type, title, name, destination) VALUES ('6cdffbb5-b62c-4364-9738-f5017e345b00', 'New Appointment via pabau', '[who] booked [service_name] appointment  on [date] at [time]', 'general', 'new_appointment_via_pabau', 'New appointment', 'Appointment', '/calendar');
