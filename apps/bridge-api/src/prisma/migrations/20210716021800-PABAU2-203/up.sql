CREATE TABLE `medical_form_advanced_setting` (
  `id` int(11) NOT NULL,
  `medical_form` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `share_to_client` tinyint(4) NOT NULL COMMENT 'sharable with client via the connect portal',
  `reminder` int(4) NOT NULL COMMENT 'send a reminder to client if not completed in given amount of time',
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
ALTER TABLE `medical_form_advanced_setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `medical_form` (`medical_form`);
ALTER TABLE `medical_form` ADD `advanced_setting` INT NOT NULL AFTER `is_private`;