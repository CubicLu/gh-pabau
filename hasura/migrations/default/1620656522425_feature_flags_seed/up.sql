SET check_function_bodies = false;
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