-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: william_entourage
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-1~jessie

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `2fa_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `2fa_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `passcode` varchar(8) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request_date` datetime NOT NULL,
  `is_confirmed` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `3rd_party_access`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `3rd_party_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passcode` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `access_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `System_Alert`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `System_Alert` (
  `alertid` int(10) NOT NULL AUTO_INCREMENT,
  `cid` bigint(20) NOT NULL COMMENT 'Company ID',
  `uid` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `entrydate` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `browser_id` int(11) NOT NULL,
  PRIMARY KEY (`alertid`),
  KEY `company_id_index` (`cid`),
  KEY `entrydate` (`entrydate`),
  KEY `uid` (`uid`),
  KEY `user_date` (`uid`,`entrydate`),
  KEY `message` (`message`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `System_Notifications`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `System_Notifications` (
  `alertid` int(10) NOT NULL AUTO_INCREMENT,
  `cid` bigint(20) NOT NULL COMMENT 'Company ID',
  `uid` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `entrydate` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `owner_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`alertid`),
  KEY `message_check` (`uid`,`entrydate`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `System_Read`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `System_Read` (
  `id` int(11) NOT NULL,
  `proper_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`proper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sql_output` longtext COMMENT 'The output from the .sql execution. NULL if not executed.',
  `sql_result` tinyint(1) DEFAULT NULL,
  `php_output` longtext COMMENT 'The output from the .php execution. NULL if not executed.',
  `php_result` tinyint(1) DEFAULT NULL,
  `name` char(14) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This supports the pod db migration system. See James or Nenad for more info.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ac_log_actions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ac_log_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pabauid` varchar(25) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  `action_status` tinyint(1) NOT NULL,
  `command` varchar(50) NOT NULL,
  `table_aff` varchar(50) NOT NULL,
  `row_aff` int(11) NOT NULL,
  `row_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `action_status` (`action_status`),
  KEY `command` (`command`),
  KEY `table_aff` (`table_aff`),
  KEY `action_name` (`action_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ac_log_urls`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ac_log_urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `file` varchar(100) NOT NULL,
  `referer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `url` (`url`),
  KEY `file` (`file`),
  KEY `referer` (`referer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ac_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ac_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_id` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `critical` tinyint(1) NOT NULL,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `humanize` text,
  `user_agent` varchar(255) NOT NULL,
  `ipv4` int(11) NOT NULL,
  `row_aff` int(11) NOT NULL,
  `row_id` int(11) NOT NULL,
  `row_data` longtext,
  PRIMARY KEY (`id`),
  KEY `url_id` (`url_id`,`action_id`),
  KEY `row_aff` (`row_aff`),
  KEY `row_id` (`row_id`),
  KEY `user_id` (`user_id`),
  KEY `occupier` (`occupier`),
  KEY `action` (`action_id`),
  FULLTEXT KEY `humanize` (`humanize`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accept_email_token`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accept_email_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_balance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_balance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `insurance_company_id` int(11) NOT NULL COMMENT 'id of `insurance_details` table',
  `balance` decimal(8,2) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_id` (`contact_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_balance_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_balance_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `insurance_company_id` int(11) NOT NULL COMMENT 'id of `insurance_details` table',
  `amount` decimal(8,2) NOT NULL,
  `date_time` int(11) NOT NULL COMMENT 'timestamp',
  `product_id` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `sale_id` int(11) NOT NULL COMMENT 'ambassadors_project',
  `referral_id` int(11) NOT NULL COMMENT 'ambassadors_project',
  `imported` int(11) NOT NULL,
  `ref_sale_id` int(11) NOT NULL COMMENT 'inv_sales.id ACCOUNT PAYMENT',
  PRIMARY KEY (`id`),
  KEY `comnpany_id` (`company_id`),
  KEY `company_time` (`company_id`,`date_time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_manager`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organisation_name` varchar(500) DEFAULT NULL,
  `organisation_status` int(11) NOT NULL,
  `organisation_type` int(11) DEFAULT NULL,
  `organisation_number` varchar(50) DEFAULT NULL,
  `organisation_owner` int(11) DEFAULT NULL,
  `address1` varchar(500) DEFAULT NULL,
  `address2` varchar(500) DEFAULT NULL,
  `address3` varchar(500) DEFAULT NULL,
  `town` varchar(200) DEFAULT NULL,
  `county` varchar(200) DEFAULT NULL,
  `post_code` varchar(25) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `tel` varchar(25) DEFAULT NULL,
  `alt_tel` varchar(25) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `fax` varchar(500) DEFAULT NULL,
  `website` varchar(300) DEFAULT NULL,
  `sla_contract` int(11) DEFAULT NULL,
  `vat_reg_id` varchar(191) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `con_per_1` varchar(100) NOT NULL,
  `con_num_1` varchar(100) NOT NULL,
  `con_per_2` varchar(100) NOT NULL,
  `con_num_2` varchar(100) NOT NULL,
  `con_per_3` varchar(100) NOT NULL,
  `con_num_3` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `admin`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `digit8` int(20) NOT NULL,
  `admin` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `image` varchar(100) NOT NULL,
  `slug` varchar(255) DEFAULT NULL COMMENT 'cross_domain_login',
  `remote_url` varchar(255) DEFAULT NULL COMMENT 'remote_url_login',
  `remote_connect` varchar(255) DEFAULT NULL,
  `cron_enabled` tinyint(1) DEFAULT NULL COMMENT 'NULL default, 0 will not run, 1 will run crons',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advanced_marketing_free_trials`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advanced_marketing_free_trials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'do not update end_date after the record has been inserted',
  `cancelled` smallint(6) NOT NULL DEFAULT '0' COMMENT 'set to 1 to cancel free trial before end_date',
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `advanced_marketing_free_trials_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advanced_marketing_pricing_plans`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advanced_marketing_pricing_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subscription_name` varchar(25) NOT NULL COMMENT 'subscription name should match company_subscription.subscription_name',
  `subscription_price` double unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT '2030-01-01 00:00:00',
  `gc_plan_id` varchar(255) DEFAULT NULL,
  `stripe_plan_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `advert_campaign`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advert_campaign` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `advert_name` varchar(255) NOT NULL,
  `advert_type` varchar(255) NOT NULL,
  `campaign_budget` varchar(100) NOT NULL,
  `campaign_interval` varchar(255) NOT NULL,
  `campaign_audience` varchar(255) NOT NULL,
  `campaign_id` int(50) NOT NULL,
  `cid` int(25) NOT NULL,
  `attach_id` int(40) NOT NULL,
  `engagement` varchar(100) NOT NULL,
  `advert_reach` int(200) NOT NULL,
  `Clicks` int(100) NOT NULL,
  `start` varchar(100) NOT NULL,
  `end` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `attached_by` varchar(100) NOT NULL,
  `attach_time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `api_debug`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_debug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_received` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `api_code` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `data_type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `api_key`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_key` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `api_key` varchar(120) NOT NULL,
  `app_type` varchar(20) NOT NULL,
  `created_date` date NOT NULL,
  `contacts` smallint(6) NOT NULL DEFAULT '0' COMMENT '0 for no, 1 for read, 2 for read and write',
  `bookings` smallint(6) NOT NULL DEFAULT '0',
  `invoices` smallint(6) NOT NULL DEFAULT '0',
  `locations` smallint(6) NOT NULL DEFAULT '0',
  `services` smallint(6) NOT NULL DEFAULT '0',
  `staff` smallint(6) NOT NULL DEFAULT '0',
  `financials` smallint(6) NOT NULL,
  `leads` smallint(6) NOT NULL,
  `medical_forms` smallint(6) NOT NULL,
  `reports` smallint(6) NOT NULL DEFAULT '0' COMMENT '1 - read only,  2  cannot be read and write',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_before_after`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_before_after` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `before_img` varchar(200) NOT NULL,
  `after_img` varchar(200) NOT NULL,
  `pass_key` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_permissions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `appid` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_company` (`appid`,`company`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_subscriptions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_value` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `price` decimal(18,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `key_value` (`key_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_subscriptions_company_prices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_subscriptions_company_prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `app_key_value` varchar(255) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_key_value` (`app_key_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_answers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_answers2`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_answers2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_concern_choices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_concern_choices` (
  `company_id` int(11) NOT NULL,
  `concern_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_concern_relations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_concern_relations` (
  `company_id` int(11) NOT NULL,
  `concern_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_concerns`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_concerns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `region` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_question_relations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_question_relations` (
  `company_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`company_id`,`answer_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_questions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `order` int(11) NOT NULL,
  `region` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_questions2`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_questions2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_quiz_takes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_quiz_takes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `take_date` datetime NOT NULL,
  `answers` varchar(200) NOT NULL,
  `concerns` varchar(200) NOT NULL,
  `answers2` text NOT NULL,
  `products` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `background` varchar(255) NOT NULL,
  `font_family` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `at_treatments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `at_treatments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `attachment_helper_lite`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attachment_helper_lite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(6) NOT NULL,
  `f` varchar(100) NOT NULL,
  `x` varchar(100) NOT NULL,
  `type` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `automation_actions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automation_actions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `trigger_id` int(10) unsigned NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `code` char(64) NOT NULL,
  `action_data` text NOT NULL,
  `order` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `automation_delay`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automation_delay` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action_rows` text NOT NULL,
  `data_array` text NOT NULL,
  `code` text NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `delay` int(11) NOT NULL,
  `date_queued` datetime NOT NULL,
  `appointment_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`),
  KEY `date_queued` (`date_queued`),
  KEY `delay` (`delay`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `automation_folders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automation_folders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `automation_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automation_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` int(10) unsigned NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` text NOT NULL,
  `parent_id` int(11) DEFAULT NULL COMMENT 'Reference to this same table. The initial logged entry for each trigger occurance becomes the ''parent'' for all subsequent lines',
  `uid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `automation_rules`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automation_rules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `source` varchar(255) NOT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `needs_config` int(2) NOT NULL,
  `folder_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `company` (`company`),
  KEY `active` (`active`),
  KEY `date_start` (`date_start`),
  KEY `date_end` (`date_end`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `automation_triggers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automation_triggers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rule_id` int(10) unsigned NOT NULL,
  `name` text NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `code` char(64) NOT NULL,
  `trigger_data` text NOT NULL,
  `order` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`),
  KEY `rule_id` (`rule_id`),
  KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `available_dates_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `available_dates_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `uid` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bacs_account`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bacs_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_tag` varchar(50) NOT NULL,
  `comp_id` int(11) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `account_holder` varchar(100) NOT NULL,
  `account_no` int(20) NOT NULL,
  `sort_code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `batch_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `batch_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `usage_date` date NOT NULL,
  `patient_id` int(11) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `qty` int(5) NOT NULL DEFAULT '0',
  `appointment_id` int(11) NOT NULL,
  `batch_flag` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `batches`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `batches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL DEFAULT '0',
  `order_item_id` text,
  `batch_no` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `expiry_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `order_id` (`order_id`),
  FULLTEXT KEY `batch_no` (`batch_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `block_reason`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `block_reason` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reason_name` varchar(100) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `is_active` int(11) NOT NULL,
  `block_color` varchar(255) NOT NULL,
  `is_paid` int(11) NOT NULL,
  `default_time` varchar(50) DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `custom_id` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bnf_drugs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bnf_drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1023) COLLATE utf8_unicode_ci NOT NULL,
  `page` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `drug_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `indications_dosage` text COLLATE utf8_unicode_ci,
  `contra_indications` text COLLATE utf8_unicode_ci,
  `cautions` text COLLATE utf8_unicode_ci,
  `side_effects` text COLLATE utf8_unicode_ci,
  `pregnancy` text COLLATE utf8_unicode_ci,
  `breast_feeding` text COLLATE utf8_unicode_ci,
  `prescribing_info` text COLLATE utf8_unicode_ci,
  `patient_advice` text COLLATE utf8_unicode_ci,
  `directions` text COLLATE utf8_unicode_ci,
  `specific_info` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `body_chart_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `body_chart_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(255) NOT NULL,
  `template_url` varchar(500) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chart_order` int(11) NOT NULL DEFAULT '0',
  `template_type` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` varchar(250) NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `booking_date` varchar(250) DEFAULT NULL,
  `payment_status` enum('0','1') NOT NULL COMMENT '0=not done,1=done',
  `cancel_status` enum('0','1') NOT NULL COMMENT '0=not cancel,1=cancel',
  `cancel_date` varchar(256) NOT NULL,
  `company_id` varchar(256) NOT NULL,
  `class_currency` varchar(256) DEFAULT NULL,
  `class_price` varchar(256) DEFAULT NULL,
  `checked_in` int(11) NOT NULL,
  `payed_by` varchar(100) NOT NULL,
  `waiting` int(11) NOT NULL COMMENT '1=waiting list',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `class_id` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking_status_changes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_status_changes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking_statuses`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `value` varchar(200) NOT NULL,
  `icon` varchar(200) NOT NULL,
  `icon_color` varchar(20) NOT NULL,
  `company_id` int(11) NOT NULL,
  `indicator` enum('LINE','ICON','','') DEFAULT '',
  `basic_field` tinyint(1) NOT NULL,
  `ord` float NOT NULL,
  `track_time` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookings_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `email_mode` int(11) NOT NULL,
  `sms_mode` int(11) NOT NULL,
  `email_id` int(11) DEFAULT NULL,
  `email_confirm_id` int(11) NOT NULL,
  `sms_id` int(11) NOT NULL,
  `email_reminder_id` int(11) NOT NULL,
  `auto_cal` int(11) DEFAULT NULL,
  `auto_email` int(11) DEFAULT NULL,
  `auto_sms` int(11) DEFAULT NULL,
  `auto_con` int(11) DEFAULT NULL,
  `feedback_mode` int(10) NOT NULL,
  `feedback_id` int(200) NOT NULL,
  `sms_name` varchar(50) NOT NULL,
  `feedback_days_after` int(11) NOT NULL,
  `feedback_send_time` time NOT NULL,
  `reminder_mode` int(11) NOT NULL,
  `days_before` int(11) NOT NULL DEFAULT '0',
  `send_time` time NOT NULL,
  `sms_days_before` int(11) NOT NULL,
  `sms_send_time` time NOT NULL,
  `class_sms_days_before` int(11) NOT NULL,
  `class_sms_send_time` time NOT NULL,
  `room_support` int(11) NOT NULL DEFAULT '0',
  `feedback_fromemail` varchar(255) NOT NULL,
  `confirm_fromemail` varchar(255) NOT NULL,
  `sms_from` varchar(255) DEFAULT NULL,
  `reminder_fromemail` varchar(255) NOT NULL,
  `send_sms` int(11) NOT NULL,
  `send_email` int(11) NOT NULL,
  `send_reminder` int(11) NOT NULL,
  `send_feedback` int(11) NOT NULL,
  `attach_invoice` int(11) NOT NULL,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `booking_emails` varchar(500) NOT NULL,
  `slot_interval` int(11) NOT NULL DEFAULT '15',
  `font_color` varchar(100) NOT NULL,
  `disable_second_cal` int(11) NOT NULL,
  `font_size` int(11) NOT NULL DEFAULT '13',
  `disable_time` int(11) NOT NULL,
  `lock_timer` int(11) NOT NULL DEFAULT '120' COMMENT 'In minutes',
  `disable_surname` int(11) NOT NULL,
  `arrived_color` varchar(20) NOT NULL DEFAULT '#FF0000',
  `complete_color` varchar(20) NOT NULL DEFAULT '#00ff00',
  `cancel_sms_notify` int(11) NOT NULL,
  `cancel_email_notify` int(11) NOT NULL DEFAULT '1',
  `reschedule_sms_notify` int(11) NOT NULL,
  `reschedule_email_notify` int(11) NOT NULL DEFAULT '1',
  `noshow_email_notify` int(11) NOT NULL,
  `class_noshow_email_notify` int(11) NOT NULL,
  `class_reschedule_email_notify` int(11) NOT NULL,
  `class_reminder_email_notify` int(11) NOT NULL,
  `class_noshow_sms_notify` int(11) NOT NULL,
  `class_reschedule_sms_notify` int(11) NOT NULL,
  `class_reminder_sms_notify` int(11) NOT NULL,
  `noshow_sms_notify` int(11) NOT NULL,
  `location_support` int(11) NOT NULL DEFAULT '1',
  `noshow_count` int(11) NOT NULL DEFAULT '3',
  `reschedule_sms_from` varchar(100) NOT NULL,
  `reschedule_sms_tmpl` int(11) NOT NULL,
  `reschedule_email_from` varchar(200) NOT NULL,
  `reschedule_email_tmpl` int(11) NOT NULL,
  `cancel_sms_from` varchar(200) NOT NULL,
  `cancel_sms_tmpl` int(11) NOT NULL,
  `cancel_email_from` varchar(255) NOT NULL,
  `cancel_email_tmpl` int(11) NOT NULL,
  `sms_confirm_id` int(11) NOT NULL,
  `noshow_email_from` varchar(255) NOT NULL,
  `noshow_email_tmpl` int(11) NOT NULL,
  `class_noshow_email_tmpl` int(11) NOT NULL,
  `class_reschedule_email_tmpl` int(11) NOT NULL,
  `class_reminder_email_tmpl` int(11) NOT NULL,
  `class_noshow_sms_tmpl` int(11) NOT NULL,
  `class_reschedule_sms_tmpl` int(11) NOT NULL,
  `class_reminder_sms_tmpl` int(11) NOT NULL,
  `noshow_sms_from` varchar(255) NOT NULL,
  `noshow_sms_tmpl` int(11) NOT NULL,
  `column_total` tinyint(4) NOT NULL,
  `tooltip_head` varchar(100) NOT NULL DEFAULT 'full_name',
  `tooltip_body` varchar(255) NOT NULL DEFAULT '["service_name","employee","appt_duration","created_by","modified_by","appt_note"]',
  `appt_head` varchar(100) NOT NULL DEFAULT 'full_name',
  `appt_body` varchar(255) NOT NULL DEFAULT '["service_name","appt_loc","appt_note"]',
  `holiday_reset_date` tinyint(4) DEFAULT NULL,
  `holiday_usual_day` varchar(15) DEFAULT NULL,
  `holiday_per_month` varchar(15) DEFAULT NULL,
  `holiday_default` varchar(15) DEFAULT NULL,
  `group_booking_change_email_enable` int(11) DEFAULT NULL,
  `group_booking_change_template_id` int(11) DEFAULT NULL,
  `group_booking_cancel_email_enable` tinyint(1) NOT NULL,
  `group_booking_cancel_template_id` int(11) NOT NULL,
  `package_used_email_enable` int(11) NOT NULL,
  `package_used_template_id` int(11) NOT NULL,
  `disable_ics` tinyint(4) DEFAULT '0',
  `initials` tinyint(4) NOT NULL DEFAULT '0',
  `disable_service_filter` tinyint(4) NOT NULL DEFAULT '0',
  `disable_book_by_package` int(11) NOT NULL DEFAULT '0',
  `allow_overlapping_appts` tinyint(4) NOT NULL DEFAULT '0',
  `modified_by` int(11) NOT NULL,
  `modified_date` datetime NOT NULL,
  `conference_reminder_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `email_id` (`email_id`),
  KEY `email_reminder_id` (`email_reminder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookitpro_general`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookitpro_general` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(10) NOT NULL,
  `advance_time` varchar(100) NOT NULL,
  `enable_payments` varchar(100) NOT NULL,
  `paypal_address` varchar(100) NOT NULL,
  `receive_email` varchar(30) NOT NULL,
  `create_invoice` varchar(100) NOT NULL,
  `deposit` float NOT NULL,
  `show_prices` varchar(20) NOT NULL,
  `show_duration` varchar(11) NOT NULL,
  `show_description` tinyint(1) NOT NULL DEFAULT '0',
  `header_color` varchar(20) NOT NULL,
  `booking_emails` varchar(500) NOT NULL,
  `online_color` varchar(100) NOT NULL,
  `warning_message` text NOT NULL,
  `allow_cancel` int(11) NOT NULL,
  `disable_facebook` int(11) NOT NULL,
  `interval` int(11) NOT NULL DEFAULT '15',
  `disable_extra_information` int(11) NOT NULL,
  `coupon_active` int(11) NOT NULL,
  `payment_api_url` varchar(255) NOT NULL,
  `account_deposit` decimal(8,2) NOT NULL,
  `replace_job_titles` int(11) NOT NULL,
  `hide_facebook_share` int(11) NOT NULL,
  `enable_bookings` int(11) NOT NULL,
  `default_payment` varchar(50) NOT NULL DEFAULT 'Card',
  `registration_optional` int(11) NOT NULL,
  `consultations_only` tinyint(1) DEFAULT '0' COMMENT 'limit services to only ones containing the word consultation',
  `only_existing` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'allow booking only of previously booked services',
  `stripe_reciever` int(11) NOT NULL COMMENT '0 is Pabau, 1 is Company',
  `stripe_public_key` varchar(200) NOT NULL,
  `stripe_private_key` varchar(200) NOT NULL,
  `offline_message` text NOT NULL,
  `disable_locations` tinyint(4) NOT NULL,
  `theme` varchar(50) NOT NULL DEFAULT 'classic',
  `promo_codes` tinyint(1) NOT NULL DEFAULT '1',
  `terms_conditions` longtext NOT NULL,
  `ga_analytics` varchar(20) NOT NULL,
  `gt_manager` varchar(20) DEFAULT NULL,
  `fb_code` varchar(50) NOT NULL,
  `fb_event` varchar(50) NOT NULL,
  `doc_shared_template` int(11) NOT NULL,
  `classes_email_confirm` int(11) NOT NULL,
  `sage_vendor` varchar(100) NOT NULL,
  `sage_username` varchar(255) NOT NULL,
  `sage_password` varchar(255) NOT NULL,
  `gc_public_key` varchar(255) NOT NULL,
  `gc_private_key` varchar(255) NOT NULL,
  `enable_title` tinyint(4) DEFAULT '0',
  `group_by_region` tinyint(1) NOT NULL DEFAULT '0',
  `use_new_connect` tinyint(1) NOT NULL DEFAULT '0',
  `disable_reviews` int(2) NOT NULL,
  `allow_rating` tinyint(1) NOT NULL DEFAULT '1',
  `show_cat_photos` tinyint(1) NOT NULL DEFAULT '1',
  `class_columns` varchar(200) NOT NULL,
  `no_vat_prices` tinyint(1) NOT NULL DEFAULT '0',
  `integration_method` enum('sagepay','stripe','cardsave') DEFAULT NULL,
  `rolling_deposit` int(2) NOT NULL,
  `one_touch_book` tinyint(1) NOT NULL DEFAULT '0',
  `new_stripe` int(2) NOT NULL DEFAULT '1',
  `enable_master_cat` tinyint(1) NOT NULL DEFAULT '1',
  `stripe_fee` decimal(8,2) NOT NULL DEFAULT '1.00',
  `reccuring_search_btn` varchar(15) NOT NULL DEFAULT 'default',
  `force_new_existing_patient` tinyint(1) NOT NULL DEFAULT '0',
  `redirect_url` varchar(255) NOT NULL,
  `connect_url` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookitpro_slider`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookitpro_slider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slider1` varchar(80) NOT NULL,
  `slider2` varchar(80) NOT NULL,
  `slider3` varchar(80) NOT NULL,
  `slider4` varchar(80) NOT NULL,
  `occupier` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookmarked_pages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarked_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `link` varchar(150) NOT NULL,
  `companyid` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `icon` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bug_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bug_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bug_message` text NOT NULL,
  `datetime` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `related_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cal_range_requests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cal_range_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minutes` bigint(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `calendar_views`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `viewMode` varchar(255) NOT NULL,
  `dayViewMode` varchar(255) NOT NULL,
  `employeesViewMode` text,
  `employeeGroupsViewMode` text NOT NULL,
  `locationsViewMode` text,
  `roomsViewMode` text,
  `serviceMastersViewMode` text NOT NULL,
  `serviceGroupsViewMode` text,
  `servicesViewMode` text NOT NULL,
  `appointmentSize` int(10) NOT NULL DEFAULT '15',
  `favorite_name` varchar(255) NOT NULL,
  `favorite_shared` int(1) NOT NULL DEFAULT '0',
  `favorite` int(1) NOT NULL DEFAULT '0',
  `favorite_id` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campaign_attachments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_id` int(11) NOT NULL,
  `occupier` int(255) NOT NULL,
  `attach_time` varchar(255) NOT NULL,
  `attach_user_name` varchar(255) NOT NULL,
  `attachment_type` varchar(50) NOT NULL,
  `attach_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cancel_reason`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancel_reason` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reason_name` varchar(100) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `late_cancel` int(11) NOT NULL,
  `apply_cancellation_policy` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cancellation_policy`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancellation_policy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(4) NOT NULL,
  `policy_type` tinyint(4) NOT NULL DEFAULT '0',
  `policy_action` tinyint(4) NOT NULL,
  `policy_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `policy_notice` int(11) NOT NULL,
  `policy_message` text,
  `policy_override` tinyint(4) NOT NULL,
  `payment_protection` int(11) NOT NULL,
  `advanced_cancellation_fee` int(11) NOT NULL COMMENT 'this value is used as %',
  `no_show_fee` int(11) NOT NULL COMMENT 'this value is used as %',
  `occupier` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `candidate`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `opening_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '1' COMMENT 'Candidate Rating',
  `candidate_status` varchar(255) CHARACTER SET utf16 COLLATE utf16_bin DEFAULT 'WAITING' COMMENT '0 = in progress, 1 = hired, 2 = declined',
  `job_references` text NOT NULL,
  `how_heard` varchar(100) NOT NULL,
  `referred_by` varchar(100) NOT NULL,
  `cover_letter` varchar(200) NOT NULL,
  `resume` varchar(100) NOT NULL,
  `date_available` date NOT NULL,
  `linkedin` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `card_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `mastercard` int(5) NOT NULL,
  `visa` int(5) NOT NULL,
  `amex` int(5) NOT NULL,
  `visa_credit` int(5) NOT NULL,
  `maestro` int(5) NOT NULL,
  `worldpay` int(5) NOT NULL,
  `visa_credit_charge` decimal(8,2) NOT NULL,
  `amex_credit_charge` decimal(8,2) NOT NULL,
  `mastercard_credit_charge` decimal(8,2) NOT NULL,
  `enable_reference` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cashup_report`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cashup_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `float_amount` decimal(8,2) NOT NULL,
  `opening_balance` decimal(8,2) NOT NULL,
  `cash_amount` decimal(8,2) NOT NULL,
  `cash_actual` decimal(8,2) NOT NULL,
  `cash_difference` decimal(8,2) NOT NULL,
  `cheque_amount` decimal(8,2) NOT NULL,
  `cheque_actual` decimal(8,2) NOT NULL,
  `cheque_difference` decimal(8,2) NOT NULL,
  `card_amount` decimal(8,2) NOT NULL,
  `card_actual` decimal(8,2) NOT NULL,
  `card_difference` decimal(8,2) NOT NULL,
  `giftvoucher_amount` decimal(8,2) NOT NULL,
  `giftvoucher_actual` decimal(8,2) NOT NULL,
  `giftvoucher_difference` decimal(8,2) NOT NULL,
  `comments` text NOT NULL,
  `cashup_date` date NOT NULL,
  `finance_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cashup_date` (`cashup_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cashup_report_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cashup_report_custom` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `cashup_date` date NOT NULL,
  `custom_type` varchar(100) NOT NULL,
  `custom_amount` decimal(8,2) NOT NULL,
  `custom_actual` decimal(8,2) NOT NULL,
  `custom_difference` decimal(8,2) NOT NULL,
  `card_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checkin_appts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkin_appts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `appt_id` int(10) unsigned NOT NULL COMMENT 'foreign key to salon_bookings.id',
  `spotify_uri` char(40) NOT NULL COMMENT 'eg spotify:track:1234567890abcdefghij',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checkin_averages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkin_averages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL COMMENT 'foreign key to users.ID',
  `product_id` int(10) unsigned NOT NULL COMMENT 'foreign key to inv_category.id',
  `avg_time_seconds` int(10) unsigned NOT NULL COMMENT 'average time to do this inv_category.id',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `product_id` (`product_id`),
  KEY `uid_product` (`uid`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checkin_averages_idle`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkin_averages_idle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(128) NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `avg` float DEFAULT NULL,
  `retailutilisation_avg` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checkin_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkin_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `queue_id` int(10) unsigned NOT NULL COMMENT 'foreign key to checkin_queue.id used in join for a ''services contained in a checkin ticket''',
  `product_id` int(10) unsigned NOT NULL COMMENT 'foreign key to inv_category.id',
  `date_start` datetime DEFAULT NULL COMMENT 'set to a NOW() when staff clicks to start a service',
  `date_end` datetime DEFAULT NULL COMMENT 'set to NOW() when a checkin_queue is closed off - or if another service is started',
  `inv_product_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `queue_id` (`queue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checkin_queue`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checkin_queue` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL COMMENT 'foreign key to users.ID',
  `been_before` tinyint(1) unsigned NOT NULL COMMENT 'true for been before, false for not been before. Populated directly from customer-checkin first screen',
  `date_start` datetime NOT NULL COMMENT 'set to NOW() when the customer subbmitted this ticket',
  `accepted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'not too sure! ask James',
  `is_lunch` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'true if the queue item was a break or lunch. As to whether it was a break or lunch, that is in the `name` field - "break" for break, "lunch" for lunch',
  `name` char(127) NOT NULL COMMENT 'name of customer, as typed by the customer on checkin (or "break" or "lunch")',
  `date_accepted` datetime DEFAULT NULL COMMENT 'set to NOW() when staff clicks to accept the next customer',
  `date_end` datetime DEFAULT NULL COMMENT 'set to NOW() when the pos is loaded at end of services for a customer',
  `was_anyone` tinyint(1) NOT NULL COMMENT 'true if the user clicked ''any barber'', otherwise they chose the uid explicitly',
  `finalise` tinyint(1) DEFAULT NULL,
  `sms_number` varchar(13) DEFAULT NULL,
  `sms_sent` datetime DEFAULT NULL,
  `sms_wanted` tinyint(1) DEFAULT NULL,
  `skips` int(11) NOT NULL DEFAULT '0',
  `connect_id` int(10) unsigned DEFAULT NULL COMMENT 'foreign key to user_master.id',
  `order` int(11) NOT NULL,
  `spotify_uri` text,
  `date_binned` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `accepted` (`accepted`),
  KEY `date_start` (`date_start`),
  KEY `date_end` (`date_end`),
  KEY `date_accepted` (`date_accepted`),
  KEY `finalise` (`finalise`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(55) NOT NULL,
  `name` varchar(55) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_guests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_guests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guest_name` varchar(100) NOT NULL,
  `signing_date` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `company_id` int(111) NOT NULL,
  `cancel_status` int(11) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_master` (
  `c_id` int(100) NOT NULL AUTO_INCREMENT,
  `c_companyid` int(100) DEFAULT NULL,
  `c_type` int(100) DEFAULT NULL,
  `c_teacher` int(100) DEFAULT NULL,
  `c_location` int(100) DEFAULT NULL,
  `c_room` int(100) DEFAULT NULL,
  `c_slots` varchar(256) DEFAULT NULL,
  `c_price` decimal(25,2) DEFAULT NULL,
  `c_date` varchar(256) DEFAULT NULL,
  `c_time` varchar(256) DEFAULT NULL,
  `c_duration` varchar(256) DEFAULT NULL,
  `c_day` varchar(256) DEFAULT NULL,
  `c_exptime` varchar(256) DEFAULT NULL,
  `c_book` varchar(256) DEFAULT NULL,
  `c_empty` varchar(256) DEFAULT NULL,
  `c_formattime` varchar(256) DEFAULT NULL,
  `c_startformattime` varchar(256) DEFAULT NULL,
  `class_pay` enum('0','1') DEFAULT NULL COMMENT '0=Free,1=Pay',
  `cancel_status` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sign_in_type` varchar(10) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int(11) NOT NULL,
  `note` text COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `public` int(11) NOT NULL,
  `avatar` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `post_date` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` char(255) NOT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `size` varchar(55) NOT NULL,
  `product_order` int(11) DEFAULT NULL,
  `um` varchar(55) NOT NULL,
  `cost` decimal(25,2) DEFAULT NULL,
  `price` decimal(25,2) NOT NULL,
  `alert_quantity` int(11) NOT NULL DEFAULT '20',
  `image` varchar(255) DEFAULT 'no_image.jpg',
  `category_id` int(11) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `product_desc` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_sms_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_sms_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(150) NOT NULL,
  `datetime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `class_template_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_template_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `class_wait_list_template_enable` tinyint(4) DEFAULT '0',
  `class_wait_list_template_id` int(11) DEFAULT '0',
  `class_wait_list_sms_template_enable` int(11) NOT NULL DEFAULT '0',
  `class_wait_list_sms_template_id` int(11) NOT NULL DEFAULT '0',
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classtype_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classtype_master` (
  `ctype_id` int(100) NOT NULL AUTO_INCREMENT,
  `ctype_name` varchar(256) DEFAULT NULL,
  `ctype_compid` varchar(256) NOT NULL,
  `ctype_date` varchar(256) NOT NULL,
  `ctype_color` varchar(100) NOT NULL,
  `ctype_description` varchar(255) NOT NULL,
  `payment_option_disabled` int(11) NOT NULL,
  `credit_option_disabled` int(11) NOT NULL,
  PRIMARY KEY (`ctype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cleverpin_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cleverpin_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` text NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `client_form_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_form_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `enable_medical` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `not_seen_months` int(11) NOT NULL COMMENT 'Number of months since last visit',
  `enable_new_and_old` int(11) NOT NULL,
  `checked_by_default` int(11) NOT NULL,
  `new_client_template` int(11) NOT NULL,
  `not_seen_template` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clinical_softwares`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinical_softwares` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `difficulty` tinyint(4) NOT NULL COMMENT '0-Easy, 1-Medium, 2-Hard',
  `frequency` tinyint(4) NOT NULL COMMENT '0-Low, 1-Medium, 2-High',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clockin_break`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clockin_break` (
  `break_time_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `clock_id` bigint(20) NOT NULL COMMENT 'Foreign Key for this table & Primary key of clockin_timesheets table',
  `break_time_start` bigint(20) NOT NULL DEFAULT '0' COMMENT 'time stamp in second',
  `break_time_out` bigint(20) NOT NULL DEFAULT '0' COMMENT 'time stamp in second',
  PRIMARY KEY (`break_time_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clockin_longpoll`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clockin_longpoll` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `clocked_out` tinyint(1) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `occupier` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clockin_timesheets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clockin_timesheets` (
  `clock_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_uid` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `clockin` int(11) NOT NULL,
  `clockout` int(11) NOT NULL,
  `total_break_time` bigint(20) NOT NULL DEFAULT '0' COMMENT 'Total Break Time Taken',
  `total_working_time` bigint(20) NOT NULL DEFAULT '0' COMMENT 'Total Working Time',
  `notes` varchar(255) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `staff_name` varchar(100) NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  PRIMARY KEY (`clock_id`),
  KEY `company_id` (`company_id`),
  KEY `uid_occupier` (`company_id`,`staff_uid`),
  KEY `staff_uid` (`staff_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_account_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_account_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `AccountID` int(10) unsigned NOT NULL,
  `Note` varchar(255) NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_appointment_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_appointment_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_id` (`appointment_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_field_id` (`custom_field_id`),
  KEY `custom_field_value` (`custom_field_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_appointments_custom_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_appointments_custom_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_appointment_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_field_name` varchar(255) NOT NULL,
  `custom_field_value` varchar(255) DEFAULT NULL,
  `added` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_appointment_id` (`custom_appointment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_authorization`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_authorization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `total_sessions` int(2) NOT NULL,
  `diagnosis_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_booking_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_booking_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `AppointmentID` int(10) unsigned NOT NULL,
  `Note` varchar(255) NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_case_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_case_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `CaseID` int(10) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_case_replies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_case_replies` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `CaseID` int(10) unsigned NOT NULL,
  `Description` text NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `CompanyID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_cases`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `case_number` varchar(20) NOT NULL,
  `occupier` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `request` varchar(255) DEFAULT NULL,
  `critical` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `related_to` int(11) DEFAULT NULL,
  `module_type` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `module2_type` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `priority` varchar(100) DEFAULT NULL,
  `reason` varchar(150) DEFAULT NULL,
  `reported_by` varchar(250) DEFAULT NULL,
  `comments` varchar(250) DEFAULT NULL,
  `CreatedDate` int(19) DEFAULT NULL,
  `IpAddress` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_compaign_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_compaign_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `BookingID` int(10) unsigned NOT NULL,
  `Note` varchar(255) NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_compaigns`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_compaigns` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` varchar(100) NOT NULL,
  `Occupier` varchar(100) NOT NULL,
  `CompaignName` varchar(200) NOT NULL,
  `Type` int(20) NOT NULL,
  `Status` int(20) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `ExpectedRevenue` varchar(200) NOT NULL,
  `BudgetedCost` varchar(100) NOT NULL,
  `ActualCost` varchar(10) NOT NULL,
  `ExpectedResponse` varchar(100) NOT NULL,
  `NumSent` varchar(10) NOT NULL,
  `Description` text NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contact_alerts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contact_alerts` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `ContactID` int(10) unsigned NOT NULL,
  `Note` varchar(150) NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `Critical` int(4) NOT NULL,
  `medical_conditions_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ContactID` (`ContactID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contact_medical_conditions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contact_medical_conditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `medical_condition_id` int(11) NOT NULL,
  `medical_record_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contact_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contact_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `ContactID` int(10) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` varchar(30) NOT NULL,
  `imported` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ContactID` (`ContactID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contact_view_staff`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contact_view_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `view_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contact_views`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contact_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `view_name` varchar(255) NOT NULL,
  `view_data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Avatar` varchar(500) NOT NULL,
  `OwnerID` int(11) NOT NULL,
  `Salutation` varchar(100) NOT NULL DEFAULT 'None',
  `Fname` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Occupier` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `Email` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Phone` varchar(20) CHARACTER SET utf8 NOT NULL,
  `OtherPhone` varchar(20) NOT NULL,
  `Mobile` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Assistant` varchar(20) NOT NULL,
  `ReportsTo` varchar(500) NOT NULL,
  `LeadSource` varchar(100) NOT NULL,
  `Lname` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Department` varchar(100) NOT NULL,
  `HomePhone` varchar(20) NOT NULL,
  `Fax` varchar(20) NOT NULL,
  `DOB` date DEFAULT NULL,
  `AsstPhone` varchar(20) NOT NULL,
  `EmailOptOut` enum('Yes','No') NOT NULL DEFAULT 'No',
  `SkypeId` varchar(100) NOT NULL,
  `AddToQuickBooks` enum('Yes','No') NOT NULL DEFAULT 'No',
  `SecondaryEmail` varchar(100) NOT NULL,
  `Twitter` varchar(100) NOT NULL,
  `MailingStreet` varchar(200) NOT NULL,
  `OtherStreet` varchar(200) NOT NULL,
  `MailingCity` varchar(100) NOT NULL,
  `OtherCity` varchar(100) NOT NULL,
  `MailingProvince` varchar(100) NOT NULL,
  `OtherProvince` varchar(100) NOT NULL,
  `MailingPostal` varchar(200) NOT NULL,
  `OtherPostal` varchar(200) NOT NULL,
  `MailingCountry` varchar(100) NOT NULL,
  `OtherCountry` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `fbimg` varchar(255) NOT NULL,
  `MarketingSource` int(11) NOT NULL,
  `RefferalSource` varchar(500) DEFAULT NULL,
  `LeadID` bigint(20) NOT NULL,
  `group_tag` text NOT NULL,
  `polite_notice` varchar(100) NOT NULL,
  `custom_id` varchar(50) CHARACTER SET utf8 NOT NULL,
  `gender` varchar(100) NOT NULL,
  `MarketingOptInAll` int(11) DEFAULT NULL,
  `MarketingOptInEmail` int(11) DEFAULT NULL,
  `MarketingOptInPhone` int(11) DEFAULT NULL,
  `MarketingOptInPost` int(11) DEFAULT NULL,
  `MarketingOptInText` int(11) DEFAULT NULL,
  `notes_drop` text NOT NULL,
  `imported` int(11) NOT NULL,
  `alerts_drop` text NOT NULL,
  `MarketingSourceRelated` int(11) NOT NULL,
  `customer_reference` varchar(50) NOT NULL,
  `MarketingOptInNewsletter` int(11) NOT NULL DEFAULT '1',
  `custom_marketing_source` varchar(255) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `xero_contact_id` varchar(255) NOT NULL,
  `is_ambassador` int(11) NOT NULL DEFAULT '0',
  `UpdatedDate` datetime NOT NULL,
  `xero_updated_date` datetime NOT NULL,
  `discount_type` int(11) NOT NULL,
  `custom_clinic_id` int(11) NOT NULL,
  `ambassador_id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  `privacy_policy` varchar(20) NOT NULL,
  `need_to_knows` tinyint(1) NOT NULL DEFAULT '0',
  `contact_type` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `LeadID` (`LeadID`),
  KEY `owner_company` (`OwnerID`,`Occupier`),
  KEY `cm_leads_index` (`Fname`,`Lname`,`Occupier`),
  KEY `customer_reference` (`customer_reference`),
  KEY `Mobile` (`Mobile`),
  KEY `Fname` (`Fname`),
  KEY `Lname` (`Lname`),
  KEY `OwnerID` (`OwnerID`),
  KEY `Email` (`Email`),
  KEY `custom_id` (`custom_id`),
  KEY `contract_id` (`contract_id`),
  KEY `CreatedDate` (`CreatedDate`),
  KEY `Occupier` (`Occupier`),
  KEY `is_active` (`is_active`),
  KEY `Occupier_2` (`Occupier`,`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_alerts_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_alerts_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_custom_id` int(11) NOT NULL,
  `alert` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `imported` int(11) NOT NULL,
  `custom_user_id` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_custom_id` (`contact_custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_backup_hb`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_backup_hb` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Avatar` varchar(500) NOT NULL,
  `OwnerID` int(11) NOT NULL,
  `Salutation` varchar(100) NOT NULL DEFAULT 'None',
  `Fname` varchar(200) NOT NULL,
  `Occupier` int(11) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `OtherPhone` varchar(20) NOT NULL,
  `Mobile` varchar(20) NOT NULL,
  `Assistant` varchar(20) NOT NULL,
  `ReportsTo` varchar(500) NOT NULL,
  `LeadSource` varchar(100) NOT NULL,
  `Lname` varchar(200) NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Department` varchar(100) NOT NULL,
  `HomePhone` varchar(20) NOT NULL,
  `Fax` varchar(20) NOT NULL,
  `DOB` date DEFAULT NULL,
  `AsstPhone` varchar(20) NOT NULL,
  `EmailOptOut` enum('Yes','No') NOT NULL DEFAULT 'No',
  `SkypeId` varchar(100) NOT NULL,
  `AddToQuickBooks` enum('Yes','No') NOT NULL DEFAULT 'No',
  `SecondaryEmail` varchar(100) NOT NULL,
  `Twitter` varchar(100) NOT NULL,
  `MailingStreet` varchar(200) NOT NULL,
  `OtherStreet` varchar(200) NOT NULL,
  `MailingCity` varchar(100) NOT NULL,
  `OtherCity` varchar(100) NOT NULL,
  `MailingProvince` varchar(100) NOT NULL,
  `OtherProvince` varchar(100) NOT NULL,
  `MailingPostal` varchar(200) NOT NULL,
  `OtherPostal` varchar(200) NOT NULL,
  `MailingCountry` varchar(100) NOT NULL,
  `OtherCountry` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `fbimg` varchar(255) NOT NULL,
  `MarketingSource` int(11) NOT NULL,
  `RefferalSource` varchar(500) DEFAULT NULL,
  `LeadID` bigint(20) NOT NULL,
  `group_tag` varchar(100) NOT NULL,
  `polite_notice` varchar(100) NOT NULL,
  `custom_id` bigint(50) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `MarketingOptInAll` int(11) DEFAULT NULL,
  `MarketingOptInEmail` int(11) DEFAULT NULL,
  `MarketingOptInPhone` int(11) DEFAULT NULL,
  `MarketingOptInPost` int(11) DEFAULT NULL,
  `MarketingOptInText` int(11) DEFAULT NULL,
  `notes_drop` text NOT NULL,
  `imported` int(11) NOT NULL,
  `alerts_drop` text NOT NULL,
  `MarketingSourceRelated` int(11) NOT NULL,
  `customer_reference` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `LeadID` (`LeadID`),
  KEY `Occupier` (`Occupier`),
  KEY `CustomIDBusiness` (`Occupier`,`custom_id`),
  KEY `owner_company` (`OwnerID`,`Occupier`),
  KEY `cm_leads_index` (`Fname`,`Lname`,`Occupier`),
  FULLTEXT KEY `contact_smart` (`Fname`,`Lname`,`Phone`,`Mobile`),
  FULLTEXT KEY `smart_search_primary` (`Fname`,`Lname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `occupier` int(9) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_label` text NOT NULL,
  `custom_field_value` text NOT NULL,
  `imported` int(11) NOT NULL,
  `old_value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_field_id` (`custom_field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_custom_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_custom_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_field_name` varchar(255) NOT NULL,
  `custom_field_value` varchar(255) DEFAULT NULL,
  `added` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_contact_name` (`custom_contact_name`),
  KEY `custom_field_value` (`custom_field_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_import_disabled`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_import_disabled` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `disabled` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_import_helper2`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_import_helper2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Salutation` varchar(255) NOT NULL,
  `First Name` varchar(255) NOT NULL,
  `Last Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `Home` varchar(255) NOT NULL,
  `OtherPhone` varchar(255) NOT NULL,
  `Fax` varchar(255) NOT NULL,
  `Address1` varchar(255) NOT NULL,
  `Address2` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `County` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL,
  `Postcode` varchar(255) NOT NULL,
  `DOB` varchar(255) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `Notes` text NOT NULL,
  `group_tag` varchar(255) NOT NULL,
  `custom_id` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `imported` int(11) NOT NULL,
  `MarketingOptInAll` int(11) NOT NULL,
  `MarketingOptInEmail` int(11) NOT NULL,
  `MarketingOptInPhone` int(11) NOT NULL,
  `MarketingOptInPost` int(11) NOT NULL,
  `MarketingOptInText` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `patient_no` varchar(255) NOT NULL,
  `marketing_source` varchar(255) NOT NULL,
  `alerts` text NOT NULL,
  `next_of_kin` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime NOT NULL,
  `Insurer` text NOT NULL,
  `GP Name` text NOT NULL,
  `GP Address` text NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `custom_user_name` varchar(255) NOT NULL,
  `marketing_source_other` varchar(255) NOT NULL,
  `date_closed` varchar(100) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_id_2` (`custom_id`,`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_json`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_json` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `clients_json` longtext NOT NULL,
  `date_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_locations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_notes_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_notes_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_custom_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `imported` int(11) NOT NULL,
  `custom_user_id` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_custom_id` (`contact_custom_id`),
  KEY `custom_user_name` (`custom_user_name`),
  KEY `custom_contact_name` (`custom_contact_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_search`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_search` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `string` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `result` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `string` (`company`,`string`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_travels`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_travels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL COMMENT 'countries.country_id',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `company_id` int(11) NOT NULL,
  `duration` varchar(25) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `uid` int(11) NOT NULL,
  `medical_record_id` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_contacts_viewed`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_contacts_viewed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_coupon_claimed`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_coupon_claimed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_id` int(11) NOT NULL,
  `claim_date` date NOT NULL,
  `claim_full_name` varchar(100) NOT NULL,
  `claim_email` varchar(100) NOT NULL,
  `active` int(11) NOT NULL COMMENT '1= it can still be used; 0 = can not be used.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_coupon_clicks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_coupon_clicks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `coupon_id` bigint(20) NOT NULL,
  `click_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_coupons`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_title` varchar(100) NOT NULL,
  `coupon_details` text NOT NULL,
  `coupon_image` varchar(100) NOT NULL,
  `coupon_start_date` varchar(50) NOT NULL,
  `coupon_expiry_date` varchar(50) NOT NULL,
  `coupon_code` varchar(50) NOT NULL,
  `coupon_amount` varchar(10) NOT NULL,
  `coupon_rate_type` varchar(50) NOT NULL COMMENT 'This can either be ''flat rate'' or ''percentage''',
  `coupon_created_date` datetime NOT NULL,
  `company` varchar(100) NOT NULL COMMENT 'the id of the company',
  `created_by` int(11) NOT NULL COMMENT 'The $UID of the user',
  `coupon_impressions` bigint(100) NOT NULL,
  `coupons_sent` bigint(11) NOT NULL,
  `coupon_max_amount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_drugs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `occupier` int(11) NOT NULL,
  `dosage` varchar(20) NOT NULL,
  `units` varchar(15) NOT NULL,
  `frequency` varchar(200) NOT NULL,
  `route` varchar(50) NOT NULL,
  `comment` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `product_id` int(11) NOT NULL,
  `lot_number` varchar(200) NOT NULL,
  `expiry_date` date NOT NULL,
  `field_order` int(3) DEFAULT '0',
  `is_vaccine` int(2) NOT NULL,
  `is_required` int(2) NOT NULL COMMENT 'This is used when linked with diseases',
  `custom_id` varchar(255) NOT NULL,
  `max_age` int(11) NOT NULL,
  `min_age` int(11) NOT NULL,
  `nathnac_link` varchar(255) NOT NULL,
  `travax_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_extra_gym`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_extra_gym` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `primary_goal` varchar(255) NOT NULL,
  `intro_class` varchar(100) NOT NULL,
  `age_group` varchar(100) NOT NULL,
  `occupier` int(11) NOT NULL,
  `skill_level` varchar(50) NOT NULL,
  `membership` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_extra_patient`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_extra_patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `nhs_number` int(11) NOT NULL,
  `gp` varchar(100) NOT NULL,
  `surgeon` varchar(100) NOT NULL,
  `occupier` int(11) NOT NULL,
  `date_of_death` varchar(50) NOT NULL,
  `external_clinic` varchar(100) NOT NULL,
  `assigned_clinic` varchar(100) NOT NULL,
  `treatment_group` int(11) NOT NULL,
  `assigned_diary` int(11) NOT NULL,
  `marketing_source` int(11) NOT NULL,
  `referral_source` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_extra_salon`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_extra_salon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `primary_service` varchar(255) NOT NULL,
  `hair_length` varchar(100) NOT NULL,
  `hair_texture` varchar(100) NOT NULL,
  `occupier` int(11) NOT NULL,
  `skin_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_invoice_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_invoice_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `InvoiceID` int(10) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_lead_group_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_lead_group_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_lead_group_staff`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_lead_group_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_lead_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_lead_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `LeadID` int(10) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `OwnerID` (`OwnerID`),
  KEY `LeadID` (`LeadID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_leads`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_leads` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Avatar` varchar(255) NOT NULL,
  `OwnerID` int(11) NOT NULL,
  `ContactID` int(11) NOT NULL,
  `Salutation` varchar(20) NOT NULL,
  `Fname` varchar(200) NOT NULL,
  `Lname` varchar(200) NOT NULL,
  `DOB` date NOT NULL,
  `Title` varchar(200) CHARACTER SET utf8 NOT NULL,
  `LeadCompany` varchar(200) NOT NULL,
  `Occupier` int(11) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Fax` varchar(20) NOT NULL,
  `Mobile` varchar(20) NOT NULL,
  `Website` varchar(50) NOT NULL,
  `LeadSource` int(5) NOT NULL,
  `LeadStatus` int(5) NOT NULL,
  `Industry` varchar(20) NOT NULL,
  `NoOfEmp` varchar(20) NOT NULL,
  `AnualRevenue` varchar(20) NOT NULL,
  `Rating` int(5) NOT NULL,
  `EmailOptOut` enum('Yes','No') NOT NULL DEFAULT 'No',
  `SkypeId` varchar(100) NOT NULL,
  `SecondaryEmail` varchar(100) NOT NULL,
  `Twitter` varchar(100) NOT NULL,
  `MailingStreet` varchar(200) NOT NULL,
  `MailingCity` varchar(100) NOT NULL,
  `MailingProvince` varchar(100) NOT NULL,
  `MailingPostal` varchar(200) NOT NULL,
  `MailingCountry` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `EnumStatus` enum('Open','Converted','Junk') NOT NULL DEFAULT 'Open',
  `Status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `MarketingOptInAll` int(11) NOT NULL,
  `MarketingOptInEmail` int(11) NOT NULL,
  `MarketingOptInPhone` int(11) NOT NULL,
  `MarketingOptInPost` int(11) NOT NULL,
  `MarketingOptInText` int(11) NOT NULL,
  `MarketingOptInNewsletter` int(11) NOT NULL,
  `IpAddress` varchar(100) NOT NULL,
  `fbimg` varchar(100) NOT NULL,
  `LastUpdated` varchar(100) NOT NULL,
  `custom_tag1` varchar(255) NOT NULL,
  `online_capture` int(5) NOT NULL,
  `capture_id` int(11) NOT NULL,
  `old_LeadStatus` int(11) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `imported` int(11) NOT NULL,
  `ConvertDate` datetime NOT NULL,
  `group_id` int(11) NOT NULL,
  `first_interaction` datetime NOT NULL,
  `latest_interaction` datetime NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `need_to_knows` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  KEY `occupier` (`Occupier`),
  KEY `cm_contacts_index` (`Fname`,`Lname`,`Occupier`),
  KEY `OwnerID` (`OwnerID`),
  KEY `LeadStatus` (`LeadStatus`),
  KEY `Email` (`Email`),
  KEY `Fname` (`Fname`),
  KEY `Lname` (`Lname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_leads_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_leads_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lead_id` int(11) NOT NULL,
  `occupier` int(9) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_label` varchar(255) NOT NULL,
  `custom_field_value` text NOT NULL,
  `imported` int(11) NOT NULL,
  `old_value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_id` (`lead_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_field_id` (`custom_field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_leads_fields_order`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_leads_fields_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  `field_name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `is_more` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_leads_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_leads_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `default_view` int(11) NOT NULL,
  `restrict_view` tinyint(1) NOT NULL,
  `auto_assign_user` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_linkprw`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_linkprw` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postId` int(10) unsigned NOT NULL,
  `url` varchar(150) NOT NULL,
  `video` enum('0','1') NOT NULL DEFAULT '0',
  `videoIframe` varchar(1000) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` varchar(500) NOT NULL,
  `thumb` varchar(150) NOT NULL,
  `hrefurl` varchar(150) NOT NULL,
  `imageId` varchar(150) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_locations_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_locations_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_medical_conditions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_medical_conditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `is_common` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_notes_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_notes_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_label` varchar(100) NOT NULL,
  `custom_field_value` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imported` tinyint(1) NOT NULL DEFAULT '0',
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_opportunity`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_opportunity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `status` int(3) NOT NULL DEFAULT '0' COMMENT '0= None; 1=Open; 2=Completed; 3= Closed;',
  `pipeline_id` int(11) NOT NULL,
  `current_stage_id` int(11) NOT NULL,
  `closure_id` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_payments_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_payments_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_id` (`payment_id`),
  KEY `custom_field_id` (`custom_field_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_field_value` (`custom_field_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_poll`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_poll` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Question` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_poll_answer`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_poll_answer` (
  `cm_poll_answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `pollId` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `optionId` int(10) unsigned NOT NULL,
  `time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cm_poll_answer_id`),
  KEY `poll_user` (`pollId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_poll_option`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_poll_option` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pollId` int(10) unsigned NOT NULL,
  `Answer` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_potential_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_potential_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `PotentialID` int(10) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_potential_stages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_potential_stages` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PotentialID` varchar(100) NOT NULL,
  `Amount` varchar(200) NOT NULL,
  `ClosingDate` varchar(20) NOT NULL,
  `Stage` int(10) NOT NULL,
  `Probability` varchar(10) NOT NULL,
  `ExpectedRevenue` varchar(50) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_potentials`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_potentials` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` varchar(100) NOT NULL,
  `Occupier` varchar(100) NOT NULL,
  `PotentialName` varchar(200) NOT NULL,
  `Amount` varchar(200) NOT NULL,
  `ClosingDate` varchar(20) NOT NULL,
  `PotentialCompany` varchar(200) NOT NULL,
  `Stage` int(10) NOT NULL,
  `Probability` varchar(10) NOT NULL,
  `Type` varchar(20) NOT NULL,
  `NextStep` varchar(50) NOT NULL,
  `ExpectedRevenue` varchar(50) NOT NULL,
  `LeadSource` int(5) NOT NULL,
  `ContactID` int(5) NOT NULL,
  `Description` text NOT NULL,
  `Status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `LeadID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `LeadID` (`LeadID`),
  KEY `occupier` (`Occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_products_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_products_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_field_id` (`custom_field_id`),
  KEY `product_id` (`product_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_purchase_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_purchase_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cost_price` float unsigned DEFAULT NULL,
  `amount_received` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_purchase_order`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_purchase_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) NOT NULL,
  `date` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `company_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `supplier_status` varchar(20) NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `notes` text NOT NULL,
  `is_hidden` int(11) NOT NULL DEFAULT '0',
  `destination_arrival` varchar(191) NOT NULL,
  `freight_terms` mediumtext NOT NULL,
  `terms_of_payment` mediumtext NOT NULL,
  `currency` varchar(11) NOT NULL,
  `tags` varchar(191) NOT NULL,
  `category_id` int(11) NOT NULL,
  `lpo_number` varchar(191) NOT NULL,
  `grn_number` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_refs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_refs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refby` int(11) NOT NULL,
  `refto` int(100) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `occupier` int(11) NOT NULL DEFAULT '0',
  `sent_to_email` varchar(200) NOT NULL,
  `sent_to_sms` int(21) NOT NULL,
  `refferer_thanked_email` int(3) NOT NULL,
  `refferer_thanked_sms` int(5) NOT NULL,
  `refferer_thanked_voucher` int(11) NOT NULL,
  `refferee_thanked_email` int(11) NOT NULL,
  `refferee_thanked_sms` int(11) NOT NULL,
  `referee_thanked_voucher` int(11) NOT NULL,
  `sent_to_name` varchar(50) NOT NULL,
  `referred_by_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_rota_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_rota_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rota_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rota_id` (`rota_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_sales_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_sales_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sale_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `custom_field_value` (`custom_field_value`),
  KEY `custom_field_id` (`custom_field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_services_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_services_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_field_id` (`custom_field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_solution_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_solution_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `SolutionID` int(10) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_commission`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_commission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL COMMENT 'This is the `ID` from cm_staff_general (or $_GET[id] if you are on index.php?p=staffs)',
  `pabau_id` int(11) NOT NULL COMMENT 'the UID of the person logged in.',
  `employee_name` varchar(500) NOT NULL,
  `commission_type` varchar(20) NOT NULL COMMENT 'retail or service',
  `tier_1_from` decimal(8,2) NOT NULL,
  `tier_1_to` decimal(8,2) NOT NULL,
  `tier_1_percent` varchar(11) NOT NULL,
  `tier_2_from` decimal(8,2) NOT NULL,
  `tier_2_to` decimal(8,2) NOT NULL,
  `tier_2_percent` varchar(11) NOT NULL,
  `tier_3_from` decimal(8,2) NOT NULL,
  `tier_3_to` decimal(8,2) NOT NULL,
  `tier_3_percent` decimal(8,2) NOT NULL,
  `tier_4_from` decimal(8,2) NOT NULL,
  `tier_4_to` decimal(8,2) NOT NULL,
  `tier_4_percent` varchar(11) NOT NULL,
  `tier_5_from` decimal(8,2) NOT NULL,
  `tier_5_to` decimal(8,2) NOT NULL,
  `tier_5_percent` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_custom`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_custom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `occupier` int(9) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_label` varchar(255) NOT NULL,
  `custom_field_value` text NOT NULL,
  `imported` int(11) NOT NULL,
  `old_value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_id` (`staff_id`),
  KEY `occupier` (`occupier`),
  KEY `custom_field_id` (`custom_field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_documents`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_documents` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Type` int(5) NOT NULL,
  `File` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_emergency`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_emergency` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `ContactName` varchar(100) NOT NULL,
  `Relationship` varchar(100) NOT NULL,
  `Address1` varchar(100) NOT NULL,
  `Address2` varchar(100) NOT NULL,
  `City` varchar(50) NOT NULL,
  `St` varchar(20) NOT NULL,
  `Zip` varchar(30) NOT NULL,
  `HomePhone` varchar(20) NOT NULL,
  `WorkPhone` varchar(20) NOT NULL,
  `CellPhone` varchar(20) NOT NULL,
  `ContactName2` varchar(100) NOT NULL,
  `Relationship2` varchar(100) NOT NULL,
  `Address12` varchar(100) NOT NULL,
  `Address22` varchar(100) NOT NULL,
  `City2` varchar(50) NOT NULL,
  `St2` varchar(20) NOT NULL,
  `Zip2` varchar(30) NOT NULL,
  `HomePhone2` varchar(20) NOT NULL,
  `WorkPhone2` varchar(20) NOT NULL,
  `CellPhone2` varchar(20) NOT NULL,
  `PhysicianName` varchar(200) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `SpecialNotes` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `StaffID` (`StaffID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_evaluation_cats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_evaluation_cats` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `EvalID` int(11) NOT NULL,
  `EvalCatID` int(11) NOT NULL,
  `Comments` varchar(500) NOT NULL,
  `Score` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `EvalID` (`EvalID`,`EvalCatID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_evaluations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_evaluations` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Initials` varchar(10) NOT NULL,
  `Comments` varchar(500) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_general`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_general` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` varchar(100) NOT NULL,
  `Occupier` varchar(100) NOT NULL,
  `Avatar` varchar(189) NOT NULL,
  `Fname` varchar(100) NOT NULL,
  `Lname` varchar(155) NOT NULL,
  `MI` varchar(20) NOT NULL,
  `Birthdate` date DEFAULT NULL,
  `SSN` varchar(100) NOT NULL,
  `Address1` varchar(100) NOT NULL,
  `Address2` varchar(100) NOT NULL,
  `City` varchar(50) NOT NULL,
  `St` varchar(20) NOT NULL,
  `Zip` varchar(30) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `HomePhone` varchar(20) NOT NULL,
  `WorkPhone` varchar(20) NOT NULL,
  `CellPhone` varchar(20) NOT NULL,
  `Fax` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Status` int(5) NOT NULL,
  `EmployeeNumber` varchar(200) NOT NULL,
  `HireDate` date NOT NULL,
  `RenewalDate` date NOT NULL,
  `max_vacation_days` int(11) DEFAULT NULL,
  `Location` text NOT NULL,
  `Position` int(5) NOT NULL,
  `Department` int(5) NOT NULL,
  `Manager` int(5) NOT NULL,
  `W4Status` int(5) NOT NULL,
  `Exemptions` varchar(100) NOT NULL,
  `Gender` int(3) NOT NULL,
  `EEOCode` int(5) NOT NULL,
  `EEOCategory` int(5) NOT NULL,
  `NextReview` date NOT NULL,
  `EnumStatus` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `pabau_id` int(11) NOT NULL,
  `DefaultLocation` int(11) NOT NULL,
  `consultation_fee` decimal(11,0) NOT NULL,
  `deleted_on` varchar(100) NOT NULL,
  `secretary` varchar(255) NOT NULL,
  `secretary_enable` tinyint(1) NOT NULL,
  `Salutation` varchar(10) NOT NULL,
  `commission_sheet_id` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `id_index` (`pabau_id`),
  KEY `occupier` (`Occupier`),
  KEY `Position` (`Position`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_incidents`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_incidents` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Date` varchar(50) NOT NULL,
  `Type` enum('Accident','Warning','Late','Sickness','Complaint','Discrepancy') NOT NULL DEFAULT 'Accident',
  `Title` varchar(200) NOT NULL,
  `late_by` int(11) DEFAULT '0',
  `Notes` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_notes` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Dependents` text NOT NULL,
  `Education` text NOT NULL,
  `Hobbies` text NOT NULL,
  `Training` text NOT NULL,
  `Volunteer` text NOT NULL,
  `Prescription` text NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `StaffID` (`StaffID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_payrolls`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_payrolls` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `StartDate` date NOT NULL,
  `Transaction` int(10) NOT NULL,
  `TransactionRate` decimal(10,2) NOT NULL,
  `TransactionTime` decimal(10,2) NOT NULL,
  `Note` varchar(1000) NOT NULL,
  `PostedBy` varchar(100) NOT NULL,
  `NewBalance` decimal(20,2) NOT NULL,
  `AccountType` enum('sick','vacation','payroll') NOT NULL DEFAULT 'vacation',
  `LengthOfAbsence` varchar(100) NOT NULL,
  `LengthOfAbsenceVal` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_separation`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_separation` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Rehire` varchar(10) NOT NULL,
  `SeparationReason` int(5) NOT NULL,
  `Comments` varchar(500) NOT NULL,
  `EnrolDate` date NOT NULL,
  `DeclinedDate` date NOT NULL,
  `PaymentAmount` varchar(10) NOT NULL,
  `EndDate` date NOT NULL,
  `Notes` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `StaffID` (`StaffID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_trainings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_trainings` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Title` varchar(200) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Type` varchar(100) NOT NULL,
  `StartDate` varchar(50) NOT NULL,
  `EndDate` varchar(50) NOT NULL,
  `Hours` varchar(50) NOT NULL,
  `Cost` varchar(50) NOT NULL,
  `Note` varchar(1000) NOT NULL,
  `Agency` varchar(200) NOT NULL,
  `Location` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_users` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Field1` varchar(50) NOT NULL,
  `Value1` varchar(200) NOT NULL,
  `Field2` varchar(50) NOT NULL,
  `Value2` varchar(200) NOT NULL,
  `Field3` varchar(50) NOT NULL,
  `Value3` varchar(200) NOT NULL,
  `Field4` varchar(50) NOT NULL,
  `Value4` varchar(200) NOT NULL,
  `Field5` varchar(50) NOT NULL,
  `Value5` varchar(200) NOT NULL,
  `Field6` varchar(50) NOT NULL,
  `Value6` varchar(200) NOT NULL,
  `Field7` varchar(50) NOT NULL,
  `Value7` varchar(200) NOT NULL,
  `Field8` varchar(50) NOT NULL,
  `Value8` varchar(200) NOT NULL,
  `Field9` varchar(50) NOT NULL,
  `Value9` varchar(200) NOT NULL,
  `Field10` varchar(50) NOT NULL,
  `Value10` varchar(200) NOT NULL,
  `Field11` varchar(50) NOT NULL,
  `Value11` date NOT NULL,
  `Field12` varchar(50) NOT NULL,
  `Value12` date NOT NULL,
  `Field13` varchar(50) NOT NULL,
  `Value13` date NOT NULL,
  `Field14` varchar(50) NOT NULL,
  `Value14` date NOT NULL,
  `Field15` varchar(50) NOT NULL,
  `Value15` date NOT NULL,
  `Field16` varchar(50) NOT NULL,
  `Value16` varchar(50) NOT NULL,
  `Field17` varchar(50) NOT NULL,
  `Value17` varchar(50) NOT NULL,
  `Field18` varchar(50) NOT NULL,
  `Value18` varchar(50) NOT NULL,
  `Field19` varchar(50) NOT NULL,
  `Value19` varchar(50) NOT NULL,
  `Field20` varchar(50) NOT NULL,
  `Value20` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `StaffID` (`StaffID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_staff_wages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_staff_wages` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `StaffID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Position` int(5) NOT NULL,
  `Rate` varchar(50) NOT NULL,
  `Type` enum('Hourly','Salary','Retail','Service') NOT NULL DEFAULT 'Hourly',
  `Note` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_tagging`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_tagging` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postId` int(10) unsigned NOT NULL,
  `type` varchar(100) NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_task_assignment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_task_assignment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `taskid` int(11) NOT NULL,
  `assignedby` varchar(100) NOT NULL,
  `assignedto` varchar(100) NOT NULL,
  `taskStatus` enum('Pending','Done') NOT NULL DEFAULT 'Pending',
  `CreatedDate` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_task_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_task_notes` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `TaskID` int(10) unsigned NOT NULL,
  `Note` varchar(255) NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_tasks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_tasks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `userid` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `attachment` varchar(100) NOT NULL,
  `status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `EditedDate` datetime NOT NULL,
  `custom_task_name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_vaccine_disease`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_vaccine_disease` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `vaccine_id` int(11) NOT NULL COMMENT 'cm_drugs.id',
  `disease_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `is_required` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_vaccines`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_vaccines` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `cm_drugs_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `schedule_day` varchar(255) NOT NULL,
  `cover_months` varchar(255) NOT NULL,
  `recall_type_ids` varchar(100) NOT NULL,
  `administration_date` date NOT NULL,
  `last_modified` date NOT NULL,
  `modified_by` int(255) NOT NULL,
  `company_id` int(255) NOT NULL,
  `field_order` int(11) NOT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `vaccine_id` (`cm_drugs_id`,`name`,`company_id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_vaccines_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_vaccines_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `field_order` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_voucher_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_voucher_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `voucher_id` int(11) NOT NULL,
  `amount_used` decimal(8,2) NOT NULL,
  `sale_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_vouchers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_vouchers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `type` enum('amount','percent') DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `amount` decimal(9,2) unsigned DEFAULT NULL,
  `valid` enum('fixed','period','recurring') DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `time_from` time DEFAULT NULL,
  `time_to` time DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `every` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `purchased_for` varchar(200) NOT NULL,
  `purchased_by` varchar(250) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `remaining_balance` decimal(8,2) NOT NULL,
  `lead_id` int(11) NOT NULL,
  `voucher_contact_email` varchar(100) NOT NULL,
  `voucher_contact_mobile` int(15) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `purchaser_contact_id` int(11) NOT NULL,
  `purchased_for_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `voucher_type` int(11) NOT NULL,
  `sales_id` int(11) NOT NULL,
  `sms_campaign_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `purchaser_contact_id` (`purchaser_contact_id`),
  KEY `occupier` (`occupier`),
  KEY `purchased_for_id` (`purchased_for_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_vouchers_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_vouchers_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_id` varchar(255) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `remaining` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `date_sold` datetime NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_wallpost_comment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_wallpost_comment` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `activitytId` int(11) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `comment` varchar(10000) NOT NULL,
  `time` int(11) unsigned NOT NULL,
  `ipAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_wallpost_files`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_wallpost_files` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `postId` int(11) unsigned NOT NULL,
  `filetype` tinyint(1) unsigned NOT NULL,
  `filename` varchar(1000) NOT NULL,
  `original` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_wallpost_pinned`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_wallpost_pinned` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_posted` int(11) NOT NULL,
  `user_target` int(11) NOT NULL COMMENT 'to whic user to apper if null then to all from the occupier',
  `from_pabau` varchar(255) DEFAULT NULL COMMENT 'if its from pabaua',
  `from_source` varchar(255) NOT NULL COMMENT 'from where did this post is created.',
  `title` varchar(255) NOT NULL,
  `message` text,
  `url` varchar(255) NOT NULL,
  `date_expires` date NOT NULL,
  `date_created` datetime NOT NULL,
  `color_background` varchar(10) NOT NULL,
  `color_text` varchar(10) NOT NULL,
  `icon_image` varchar(255) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cm_wallposts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cm_wallposts` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `description` varchar(3000) NOT NULL,
  `attachment` tinyint(1) unsigned NOT NULL,
  `linkprw` enum('0','1') NOT NULL DEFAULT '0',
  `post_time` int(11) unsigned NOT NULL,
  `status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `ipAddress` int(11) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `code_set`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code_set` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `set_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  `layers` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `column_filter`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `column_filter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `filter_type` varchar(255) NOT NULL,
  `filter_data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commission_amendment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commission_amendment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `partner_company_id` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `partner_company_id` (`partner_company_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commission_sheet`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commission_sheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sheet_name` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - flat, 1 - percentage ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commission_sheet_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commission_sheet_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `products_col` varchar(250) DEFAULT NULL,
  `charge_client_col` varchar(250) DEFAULT NULL,
  `facility_fee_col` varchar(250) DEFAULT NULL,
  `facility_fee2_col` varchar(250) DEFAULT NULL,
  `deduct_consum_col` varchar(250) DEFAULT NULL,
  `payout_emp_col` varchar(250) DEFAULT NULL,
  `products_active` tinyint(4) DEFAULT '1',
  `charge_client_active` tinyint(4) DEFAULT '1',
  `facility_fee_active` tinyint(4) DEFAULT '1',
  `facility_fee2_active` tinyint(4) DEFAULT '1',
  `deduct_consum_active` tinyint(4) DEFAULT '1',
  `payout_emp_active` tinyint(4) DEFAULT '1',
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_id_pairs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_id_pairs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `old_id` int(11) NOT NULL,
  `new_id` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL COMMENT '1 for contact, 2 for lead',
  `failed` int(1) NOT NULL,
  `call_log_fixed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `old_id` (`old_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='see Floki';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `subject` varchar(70) NOT NULL,
  `sentby` varchar(60) NOT NULL,
  `source` varchar(100) NOT NULL,
  `to` varchar(100) NOT NULL COMMENT 'This can be the UID',
  `companyid` int(11) NOT NULL,
  `email_by` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `date` int(50) NOT NULL,
  `communication_type` varchar(30) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `site_section` varchar(50) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `contact_custom_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `Practitioner_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `email_read` int(11) NOT NULL,
  `result_log` text NOT NULL,
  `template_id` int(11) NOT NULL,
  `header` varchar(255) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `sms_delivery_status` varchar(2) NOT NULL COMMENT 'W=Waiting; U=Undelivered; D=Delivered; I=Invalid ',
  `mandrill_email_id` varchar(255) NOT NULL,
  `mandril_status` varchar(2) NOT NULL COMMENT 'HB=HardBounce;SB=SoftBounce;D=Delivered',
  `sensitive_data` tinyint(1) NOT NULL,
  `cc` varchar(100) NOT NULL,
  `booking_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_index` (`companyid`),
  KEY `contact_custom_id` (`contact_custom_id`),
  KEY `contact_id_in` (`contact_id`),
  KEY `mandrill_email_id` (`mandrill_email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_log_appointments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_log_appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `communication_id` int(11) NOT NULL,
  `appt_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_log_attachments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_log_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `communication_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `communication_id` (`communication_id`),
  KEY `occupier` (`occupier`),
  KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_log_email`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_log_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_email_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `sent_date` datetime NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_log_fails`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_log_fails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sql_query` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_log_letter_recipient`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_log_letter_recipient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `communication_id` int(11) NOT NULL,
  `recipient_type` varchar(50) NOT NULL,
  `recipient` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communication_receipient`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communication_receipient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `communication_id` int(11) DEFAULT NULL,
  `receipient_id` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communications`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `from_address` varchar(50) NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `location_id` int(11) NOT NULL,
  `type` enum('Email','SMS','Letter','Comment','Reminder','Call','Voice','Call_Reminder') NOT NULL,
  `secure` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Is Secure (bool): if email, it forces connect login. if sms, it sends a short url. if comment, don''t show to customer.',
  `date` datetime NOT NULL,
  `communications_content_id` int(10) unsigned NOT NULL,
  `related_id` int(11) DEFAULT NULL COMMENT 'id of the relation to this communication',
  `related_type` enum('INVOICE','APPOINTMENT','NEWSLETTER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`,`uid`),
  KEY `date` (`date`),
  KEY `communications_content_id` (`communications_content_id`),
  CONSTRAINT `communications_ibfk_1` FOREIGN KEY (`communications_content_id`) REFERENCES `communications_content` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communications_content`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communications_content` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `hash` char(40) NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `body` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`,`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communications_hashes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communications_hashes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comm_recipient_id` int(10) unsigned NOT NULL,
  `hash` varchar(32) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `communications_hashes_fk` (`comm_recipient_id`),
  KEY `hash` (`hash`),
  CONSTRAINT `communications_hashes_fk` FOREIGN KEY (`comm_recipient_id`) REFERENCES `communications_recipients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communications_providers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communications_providers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` char(16) NOT NULL COMMENT 'The short lowercase name of the sending provider eg "mandrill" or "txtlocal"',
  `name` tinytext NOT NULL COMMENT 'The full name of provider',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `communications_recipients`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `communications_recipients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `communications_id` int(10) unsigned NOT NULL,
  `recipient_id` int(10) unsigned NOT NULL,
  `recipient_type` enum('CONTACT','LEAD','USER') NOT NULL,
  `remote_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `delivered_result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
  `read_count` int(11) NOT NULL DEFAULT '0',
  `to_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `cc` varchar(255) NOT NULL,
  `provider_id` int(10) unsigned NOT NULL,
  `status` enum('D','queued','sent','rejected','1','0','draft','HB','SB') DEFAULT NULL COMMENT 'error | queued &gt; sent &gt; delivered',
  `merge_values` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `communications_id` (`communications_id`),
  KEY `contact_id` (`recipient_id`),
  KEY `communications_provider_id` (`provider_id`),
  KEY `remote_key` (`remote_key`),
  CONSTRAINT `communications_recipients_ibfk_1` FOREIGN KEY (`communications_id`) REFERENCES `communications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `communications_recipients_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `communications_providers` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comp_emails_send_criteria`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comp_emails_send_criteria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `interest_area` enum('master_category','location_id') NOT NULL DEFAULT 'master_category',
  `area_item_id` int(11) NOT NULL,
  `comm_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comp_sms_send_criteria`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comp_sms_send_criteria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `interest_area` enum('master_category','location_id') NOT NULL DEFAULT 'master_category',
  `area_item_id` int(11) NOT NULL,
  `comm_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_app_subscriptions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_app_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `app_key_value` varchar(255) NOT NULL,
  `gc_app_plan_id` varchar(255) NOT NULL,
  `app_fee` decimal(18,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_attached_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_attached_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_services_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pro_id` (`product_id`),
  KEY `ser` (`company_services_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_bday_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_bday_settings` (
  `bday_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bday_cid` bigint(20) NOT NULL,
  `bday_before` tinyint(4) NOT NULL,
  `bday_file` varchar(64) NOT NULL,
  `bday_update` bigint(20) NOT NULL,
  `bday_eSender` int(11) DEFAULT NULL,
  `bday_eSubject` varchar(48) NOT NULL,
  `bday_eMessage` text NOT NULL,
  `status` enum('enabled','disabled') NOT NULL,
  `email_activated` int(11) NOT NULL,
  `sms_activated` int(11) NOT NULL,
  `bday_sMessage` varchar(255) NOT NULL,
  `bday_sName` varchar(11) NOT NULL,
  `bday_before_sms` tinyint(4) NOT NULL,
  `module` varchar(100) NOT NULL DEFAULT 'contacts',
  `email_template_id` int(11) NOT NULL,
  `sms_template_id` int(11) NOT NULL,
  PRIMARY KEY (`bday_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_branch_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_branch_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(128) DEFAULT NULL COMMENT 'not currently used in frontend',
  `shared_data` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_branch_variables`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_branch_variables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` int(11) NOT NULL COMMENT 'foreign key to company_branches.id',
  `key` char(32) NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `branch_id` (`branch_id`,`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_branches`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_branches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL COMMENT 'foreign key to company_branch_groups.id',
  `company_id` int(10) unsigned NOT NULL COMMENT 'foreign key to company_details.company_id',
  `address` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `county` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `postcode` varchar(10) NOT NULL,
  `online_bookings` int(11) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `website` varchar(100) NOT NULL,
  `is_active` int(11) NOT NULL,
  `bookable_online` int(11) NOT NULL,
  `calendar_bookable` int(11) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `custom_id` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `send_conf_email` int(2) NOT NULL,
  `show_online` int(11) NOT NULL DEFAULT '1',
  `loc_order` int(11) NOT NULL,
  `region` varchar(255) NOT NULL,
  `invoice_template_id` int(10) NOT NULL DEFAULT '0',
  `color` varchar(255) NOT NULL,
  `notify_on_lead` tinyint(1) NOT NULL DEFAULT '0',
  `notice` longtext,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_branches_attachments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_branches_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `location_id` int(11) NOT NULL DEFAULT '0',
  `type` enum('badge') NOT NULL,
  `url` varchar(500) NOT NULL,
  `description` varchar(535) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_branches_merge_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_branches_merge_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `location_id` int(11) NOT NULL DEFAULT '0',
  `tag_name` varchar(500) NOT NULL,
  `tag_value` varchar(500) NOT NULL,
  `tag_type` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_departments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_departments` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `department` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_details` (
  `details_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription` varchar(255) NOT NULL,
  `industry_sector` varchar(255) NOT NULL,
  `employees` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `county` varchar(25) NOT NULL,
  `post_code` varchar(25) NOT NULL,
  `country` varchar(50) NOT NULL DEFAULT 'United Kingdom',
  `phone` varchar(20) NOT NULL,
  `fax` varchar(30) NOT NULL,
  `info_email` varchar(50) NOT NULL,
  `admin` int(11) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `currency` varchar(200) NOT NULL DEFAULT 'GBP',
  `facebook_page` varchar(180) NOT NULL,
  `twitter_page` varchar(30) NOT NULL,
  `head_office` int(11) NOT NULL,
  `footer_logo` varchar(255) NOT NULL,
  `header_logo` varchar(255) NOT NULL,
  `vat` varchar(50) NOT NULL,
  `date_format` varchar(10) NOT NULL DEFAULT 'd/m/Y',
  `week_start_day` varchar(45) NOT NULL DEFAULT 'sunday',
  `auto_sms` int(11) NOT NULL DEFAULT '1',
  `sms_active` int(11) NOT NULL,
  `db_lock` int(11) NOT NULL,
  `stock_manager` varchar(100) NOT NULL COMMENT 'This is the email address of the admin who approves stock',
  `company_notes` text NOT NULL,
  `timezone_id` bigint(20) unsigned DEFAULT '511',
  `converted_value` decimal(20,2) NOT NULL,
  `enable_2fa` int(11) NOT NULL,
  `enable_ad` int(11) NOT NULL DEFAULT '0',
  `enable_ad_code` varchar(4) DEFAULT NULL,
  `enable_ip_filter` int(11) DEFAULT NULL,
  `demo_mode` int(11) NOT NULL,
  `linkedin_page` varchar(180) NOT NULL,
  `youtube_page` varchar(180) NOT NULL,
  `is_surgical` int(11) NOT NULL,
  `private_treatment_notes` int(11) NOT NULL,
  `accept_insurance` int(3) NOT NULL,
  `phone_prefix` int(10) NOT NULL,
  `tax_name` enum('VAT','GST') NOT NULL DEFAULT 'VAT',
  `secure_medical_forms` int(11) NOT NULL DEFAULT '1',
  `debrand_logo` int(10) NOT NULL,
  `default_search` varchar(255) NOT NULL DEFAULT 'contact',
  `calendar_version` varchar(11) NOT NULL,
  `contact_term_singular` varchar(30) NOT NULL DEFAULT 'Patient',
  `contact_term_plural` varchar(30) NOT NULL DEFAULT 'Patients',
  `flag_enabled` tinyint(4) NOT NULL DEFAULT '1',
  `lock_prescription` tinyint(4) NOT NULL,
  `show_report_logo` tinyint(1) NOT NULL DEFAULT '0',
  `rota_version` varchar(255) NOT NULL,
  `use_google_auth` tinyint(1) NOT NULL DEFAULT '0',
  `employee_clock_track` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(100) DEFAULT NULL,
  `default_inv_template_id` int(11) NOT NULL,
  `diagnosis_codes_type` varchar(20) NOT NULL DEFAULT 'icd10',
  `append_client_pref` tinyint(4) NOT NULL,
  `capital_surname` tinyint(1) NOT NULL DEFAULT '0',
  `disable_prescriptions` int(11) NOT NULL,
  `cycles_display` tinyint(4) NOT NULL DEFAULT '0',
  `enable_sens_data` int(3) NOT NULL,
  `class_term_singular` varchar(20) NOT NULL DEFAULT 'Class',
  `class_term_plural` varchar(20) NOT NULL DEFAULT 'Classes',
  `sensitive_data_question` int(2) NOT NULL DEFAULT '2',
  `legacy_consultations` tinyint(1) NOT NULL DEFAULT '0',
  `class_teacher_singular` varchar(20) NOT NULL DEFAULT 'Teacher',
  `employee_term_singular` varchar(20) NOT NULL DEFAULT 'Employee',
  `employee_term_plural` varchar(20) NOT NULL DEFAULT 'Employees',
  `medical_approvals` int(2) NOT NULL,
  `new_reports` tinyint(4) NOT NULL,
  `merge_bookings_tabs` tinyint(1) NOT NULL DEFAULT '0',
  `preferences_sms` tinyint(4) NOT NULL DEFAULT '1',
  `preferences_email` tinyint(4) NOT NULL DEFAULT '1',
  `preferences_post` tinyint(4) NOT NULL DEFAULT '1',
  `preferences_newsletters` tinyint(4) NOT NULL DEFAULT '1',
  `healthcode_live` tinyint(1) DEFAULT NULL,
  `lock_export` int(2) NOT NULL,
  `language` varchar(50) NOT NULL,
  `completed_setup` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'has completed self-setup?',
  PRIMARY KEY (`details_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `company_id` (`company_id`),
  KEY `timezone_id` (`timezone_id`),
  CONSTRAINT `company_details_ibfk_1` FOREIGN KEY (`timezone_id`) REFERENCES `timezone` (`timezone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /* 50017 DEFINER=`maxscale`@`%`*/ /*!50003 TRIGGER `on_update_company_details` AFTER UPDATE ON `company_details` FOR EACH ROW BEGIN
    IF
                NEW.company_name <> OLD.company_name OR
                NEW.subscription <> OLD.subscription OR
                NEW.street <> OLD.street OR
                NEW.city <> OLD.city OR
                NEW.county <> OLD.county OR
                NEW.post_code <> OLD.post_code OR
                NEW.country <> OLD.country OR
                NEW.phone <> OLD.phone OR
                NEW.info_email <> OLD.info_email OR
                NEW.currency <> OLD.currency OR
                NEW.vat <> OLD.vat OR
                NEW.auto_sms <> OLD.auto_sms OR
                NEW.sms_active <> OLD.sms_active OR
                NEW.timezone_id <> OLD.timezone_id OR
                NEW.enable_2fa <> OLD.enable_2fa OR
                NEW.enable_ad <> OLD.enable_ad OR
                NEW.demo_mode <> OLD.demo_mode OR
                NEW.tax_name <> OLD.tax_name OR
                NEW.use_google_auth <> OLD.use_google_auth OR
                NEW.slug <> OLD.slug OR
                NEW.enable_sens_data <> OLD.enable_sens_data OR
                NEW.medical_approvals <> OLD.medical_approvals OR
                NEW.healthcode_live <> OLD.healthcode_live OR
                NEW.language <> OLD.language
    THEN
        INSERT INTO `company_details_trigger`(
            `details_id`,
            `company_id` ,
            `company_name`,
            `subscription` ,
            `industry_sector` ,
            `employees` ,
            `website` ,
            `street`,
            `city` ,
            `county`,
            `post_code`,
            `country` ,
            `phone` ,
            `fax` ,
            `info_email`,
            `admin` ,
            `logo`,
            `currency`,
            `facebook_page`,
            `twitter_page`,
            `head_office`,
            `footer_logo`,
            `header_logo`,
            `vat`,
            `date_format`,
            `week_start_day`,
            `auto_sms`,
            `sms_active`,
            `db_lock`,
            `stock_manager`,
            `company_notes`,
            `timezone_id`,
            `converted_value`,
            `enable_2fa`,
            `enable_ad`,
            `enable_ad_code`,
            `enable_ip_filter`,
            `demo_mode`,
            `linkedin_page`,
            `youtube_page`,
            `is_surgical`,
            `private_treatment_notes`,
            `accept_insurance`,
            `phone_prefix`,
            `tax_name`,
            `secure_medical_forms`,
            `debrand_logo`,
            `default_search`,
            `calendar_version`,
            `contact_term_singular`,
            `contact_term_plural`,
            `flag_enabled`,
            `lock_prescription`,
            `show_report_logo`,
            `rota_version`,
            `use_google_auth`,
            `employee_clock_track`,
            `slug`,
            `default_inv_template_id`,
            `diagnosis_codes_type`,
            `append_client_pref`,
            `capital_surname`,
            `disable_prescriptions`,
            `cycles_display`,
            `enable_sens_data`,
            `class_term_singular`,
            `class_term_plural`,
            `sensitive_data_question`,
            `legacy_consultations`,
            `class_teacher_singular`,
            `employee_term_singular`,
            `employee_term_plural`,
            `medical_approvals`,
            `new_reports`,
            `merge_bookings_tabs`,
            `preferences_sms`,
            `preferences_email`,
            `preferences_post`,
            `preferences_newsletters`,
            `healthcode_live`,
            `lock_export`,
            `language`,
            `completed_setup`)
            VALUES(
                      OLD.`details_id`,
                      OLD.`company_id` ,
                      OLD.`company_name`,
                      OLD.`subscription` ,
                      OLD.`industry_sector` ,
                      OLD.`employees` ,
                      OLD.`website` ,
                      OLD.`street`,
                      OLD.`city` ,
                      OLD.`county`,
                      OLD.`post_code`,
                      OLD.`country` ,
                      OLD.`phone` ,
                      OLD.`fax` ,
                      OLD.`info_email`,
                      OLD.`admin`,
                      OLD.`logo`,
                      OLD.`currency`,
                      OLD.`facebook_page`,
                      OLD.`twitter_page`,
                      OLD.`head_office`,
                      OLD.`footer_logo`,
                      OLD.`header_logo`,
                      OLD.`vat`,
                      OLD.`date_format`,
                      OLD.`week_start_day`,
                      OLD.`auto_sms`,
                      OLD.`sms_active`,
                      OLD.`db_lock`,
                      OLD.`stock_manager`,
                      OLD.`company_notes`,
                      OLD.`timezone_id`,
                      OLD.`converted_value`,
                      OLD.`enable_2fa`,
                      OLD.`enable_ad`,
                      OLD.`enable_ad_code`,
                      OLD.`enable_ip_filter`,
                      OLD.`demo_mode`,
                      OLD.`linkedin_page`,
                      OLD.`youtube_page`,
                      OLD.`is_surgical`,
                      OLD.`private_treatment_notes`,
                      OLD.`accept_insurance`,
                      OLD.`phone_prefix`,
                      OLD.`tax_name`,
                      OLD.`secure_medical_forms`,
                      OLD.`debrand_logo`,
                      OLD.`default_search`,
                      OLD.`calendar_version`,
                      OLD.`contact_term_singular`,
                      OLD.`contact_term_plural`,
                      OLD.`flag_enabled`,
                      OLD.`lock_prescription`,
                      OLD.`show_report_logo`,
                      OLD.`rota_version`,
                      OLD.`use_google_auth`,
                      OLD.`employee_clock_track`,
                      OLD.`slug`,
                      OLD.`default_inv_template_id`,
                      OLD.`diagnosis_codes_type`,
                      OLD.`append_client_pref`,
                      OLD.`capital_surname`,
                      OLD.`disable_prescriptions`,
                      OLD.`cycles_display`,
                      OLD.`enable_sens_data`,
                      OLD.`class_term_singular`,
                      OLD.`class_term_plural`,
                      OLD.`sensitive_data_question`,
                      OLD.`legacy_consultations`,
                      OLD.`class_teacher_singular`,
                      OLD.`employee_term_singular`,
                      OLD.`employee_term_plural`,
                      OLD.`medical_approvals`,
                      OLD.`new_reports`,
                      OLD.`merge_bookings_tabs`,
                      OLD.`preferences_sms`,
                      OLD.`preferences_email`,
                      OLD.`preferences_post`,
                      OLD.`preferences_newsletters`,
                      OLD.`healthcode_live`,
                      OLD.`lock_export`,
                      OLD.`language`,
                      OLD.`completed_setup`);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `company_details_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_details_trigger` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_synced` tinyint(2) NOT NULL DEFAULT '0' COMMENT 'Is current row due for a sync?',
  `details_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription` varchar(255) NOT NULL,
  `industry_sector` varchar(255) NOT NULL,
  `employees` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `county` varchar(25) NOT NULL,
  `post_code` varchar(25) NOT NULL,
  `country` varchar(50) NOT NULL DEFAULT 'United Kingdom',
  `phone` varchar(20) NOT NULL,
  `fax` varchar(30) NOT NULL,
  `info_email` varchar(50) NOT NULL,
  `admin` int(11) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `currency` varchar(200) NOT NULL DEFAULT 'GBP',
  `facebook_page` varchar(180) NOT NULL,
  `twitter_page` varchar(30) NOT NULL,
  `head_office` int(11) NOT NULL,
  `footer_logo` varchar(255) NOT NULL,
  `header_logo` varchar(255) NOT NULL,
  `vat` varchar(50) NOT NULL,
  `date_format` varchar(10) NOT NULL DEFAULT 'd/m/Y',
  `week_start_day` varchar(45) NOT NULL DEFAULT 'sunday',
  `auto_sms` int(11) NOT NULL DEFAULT '1',
  `sms_active` int(11) NOT NULL,
  `db_lock` int(11) NOT NULL,
  `stock_manager` varchar(100) NOT NULL COMMENT 'This is the email address of the admin who approves stock',
  `company_notes` text NOT NULL,
  `timezone_id` bigint(20) unsigned DEFAULT '511',
  `converted_value` decimal(20,2) NOT NULL,
  `enable_2fa` int(11) NOT NULL,
  `enable_ad` int(11) NOT NULL DEFAULT '0',
  `enable_ad_code` varchar(4) DEFAULT NULL,
  `enable_ip_filter` int(11) DEFAULT NULL,
  `demo_mode` int(11) NOT NULL,
  `linkedin_page` varchar(180) NOT NULL,
  `youtube_page` varchar(180) NOT NULL,
  `is_surgical` int(11) NOT NULL,
  `private_treatment_notes` int(11) NOT NULL,
  `accept_insurance` int(3) NOT NULL,
  `phone_prefix` int(10) NOT NULL,
  `tax_name` enum('VAT','GST') NOT NULL DEFAULT 'VAT',
  `secure_medical_forms` int(11) NOT NULL DEFAULT '1',
  `debrand_logo` int(10) NOT NULL,
  `default_search` varchar(255) NOT NULL DEFAULT 'contact',
  `calendar_version` varchar(11) NOT NULL,
  `contact_term_singular` varchar(30) NOT NULL DEFAULT 'Patient',
  `contact_term_plural` varchar(30) NOT NULL DEFAULT 'Patients',
  `flag_enabled` tinyint(4) NOT NULL DEFAULT '1',
  `lock_prescription` tinyint(4) NOT NULL,
  `show_report_logo` tinyint(1) NOT NULL DEFAULT '0',
  `rota_version` varchar(255) NOT NULL,
  `use_google_auth` tinyint(1) NOT NULL DEFAULT '0',
  `employee_clock_track` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(100) DEFAULT NULL,
  `default_inv_template_id` int(11) NOT NULL,
  `diagnosis_codes_type` varchar(20) NOT NULL DEFAULT 'icd10',
  `append_client_pref` tinyint(4) NOT NULL,
  `capital_surname` tinyint(1) NOT NULL DEFAULT '0',
  `disable_prescriptions` int(11) NOT NULL,
  `cycles_display` tinyint(4) NOT NULL DEFAULT '0',
  `enable_sens_data` int(3) NOT NULL,
  `class_term_singular` varchar(20) NOT NULL DEFAULT 'Class',
  `class_term_plural` varchar(20) NOT NULL DEFAULT 'Classes',
  `sensitive_data_question` int(2) NOT NULL DEFAULT '2',
  `legacy_consultations` tinyint(1) NOT NULL DEFAULT '0',
  `class_teacher_singular` varchar(20) NOT NULL DEFAULT 'Teacher',
  `employee_term_singular` varchar(20) NOT NULL DEFAULT 'Employee',
  `employee_term_plural` varchar(20) NOT NULL DEFAULT 'Employees',
  `medical_approvals` int(2) NOT NULL,
  `new_reports` tinyint(4) NOT NULL,
  `merge_bookings_tabs` tinyint(1) NOT NULL DEFAULT '0',
  `preferences_sms` tinyint(4) NOT NULL DEFAULT '1',
  `preferences_email` tinyint(4) NOT NULL DEFAULT '1',
  `preferences_post` tinyint(4) NOT NULL DEFAULT '1',
  `preferences_newsletters` tinyint(4) NOT NULL DEFAULT '1',
  `healthcode_live` tinyint(1) DEFAULT NULL,
  `lock_export` int(2) NOT NULL,
  `language` varchar(50) NOT NULL,
  `completed_setup` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'has completed self-setup?',
  PRIMARY KEY (`id`),
  KEY `fk_company_details_details_id` (`details_id`),
  KEY `fk_company_details_company_id` (`company_id`),
  CONSTRAINT `fk_company_details_company_id` FOREIGN KEY (`company_id`) REFERENCES `company_details` (`company_id`),
  CONSTRAINT `fk_company_details_details_id` FOREIGN KEY (`details_id`) REFERENCES `company_details` (`details_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_emails`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_emails` (
  `company_id` int(200) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `added_by` varchar(200) NOT NULL,
  `email_id` int(11) NOT NULL AUTO_INCREMENT,
  `senders_name` varchar(100) NOT NULL,
  `confirmed` int(100) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `default_email` int(11) NOT NULL,
  `enterprise_email` tinyint(4) NOT NULL,
  `merge_tags` text NOT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_form_builder_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_form_builder_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(11) unsigned NOT NULL,
  `form_name` text,
  `form_dir_name` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_ga_filtering`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_ga_filtering` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `ipv4_range_start` int(10) unsigned NOT NULL,
  `ipv4_range_end` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_range_per_company` (`company_id`,`ipv4_range_start`,`ipv4_range_end`) COMMENT 'jc'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_groups` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `category_product_id` bigint(20) NOT NULL,
  `cat_order` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `online_enabled` int(11) NOT NULL,
  `group_color` varchar(10) NOT NULL,
  `import_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `deposit_amount` decimal(8,2) NOT NULL,
  `tax_id` int(11) NOT NULL,
  `master_cat_id` int(11) NOT NULL,
  `company_position_id` int(12) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_hits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_hits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `hits` int(11) NOT NULL,
  `file` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_ip_filtering`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_ip_filtering` (
  `ip_filtering_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `ipv4_range_start` varchar(15) NOT NULL,
  `ipv4_range_end` varchar(15) NOT NULL,
  PRIMARY KEY (`ip_filtering_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_lic_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_lic_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_locations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_locations` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `location` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `log_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` text NOT NULL,
  `category` char(32) NOT NULL,
  `severe` tinyint(1) NOT NULL,
  `company` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_mailserver`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_mailserver` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) NOT NULL,
  `host` varchar(100) NOT NULL,
  `port` int(11) NOT NULL,
  `secure` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_master` (
  `comp_id` int(100) NOT NULL AUTO_INCREMENT,
  `comp_username` varchar(256) DEFAULT NULL,
  `comp_password` varchar(256) DEFAULT NULL,
  `comp_title` varchar(256) DEFAULT NULL,
  `comp_currency` varchar(256) DEFAULT NULL,
  `comp_logo` varchar(256) DEFAULT NULL,
  `comp_paypalemail` varchar(256) DEFAULT NULL,
  `comp_background` varchar(256) DEFAULT NULL,
  `login_timeout` int(11) NOT NULL,
  `default_page` varchar(255) NOT NULL,
  PRIMARY KEY (`comp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_meta`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `meta_name` varchar(100) NOT NULL,
  `meta_value` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`,`meta_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_migration_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_migration_details` (
  `company_id` int(11) NOT NULL,
  `node_name` char(48) COLLATE utf8mb4_unicode_ci NOT NULL,
  `node_id` smallint(6) NOT NULL,
  `pod_id` smallint(6) NOT NULL,
  PRIMARY KEY (`company_id`),
  CONSTRAINT `fk_company_details` FOREIGN KEY (`company_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_alert` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_permissions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `companyid` int(5) NOT NULL,
  `section` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`companyid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_policies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_policies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `privacy_policy` longtext CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_positions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_positions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `position` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_rooms`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_rooms` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `description` varchar(400) NOT NULL,
  `slots` int(11) NOT NULL,
  `all_services` int(11) NOT NULL,
  `is_active` int(11) NOT NULL,
  `all_locations` tinyint(1) NOT NULL DEFAULT '1',
  `field_order` int(3) NOT NULL,
  `room_fee_type` varchar(20) NOT NULL,
  `room_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `prod_id` int(11) NOT NULL DEFAULT '0',
  `imported` int(11) NOT NULL DEFAULT '0',
  `custom_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_rooms_locations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_rooms_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_rooms_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_rooms_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `priority_order` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `room_id` (`room_id`),
  KEY `room_id_2` (`room_id`),
  KEY `service_id_2` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `service` varchar(255) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `description` varchar(400) NOT NULL,
  `price` decimal(25,2) NOT NULL,
  `disabledusers` text,
  `color` varchar(20) DEFAULT NULL,
  `group_id` bigint(20) NOT NULL,
  `online_book` int(11) NOT NULL DEFAULT '1',
  `product_id` bigint(20) NOT NULL,
  `imported` int(11) NOT NULL,
  `communication_template` int(11) NOT NULL,
  `service_order` int(11) NOT NULL,
  `sms_mode` int(11) NOT NULL,
  `sms_name` varchar(255) NOT NULL,
  `sms_days_after` int(11) NOT NULL,
  `sms_send_time` varchar(255) NOT NULL,
  `sms_id` int(11) NOT NULL,
  `treatment_group_id` int(11) NOT NULL,
  `custom_id` varchar(200) NOT NULL,
  `pos_only` int(11) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `finish_time` int(11) NOT NULL,
  `deposit_amount` decimal(8,2) NOT NULL,
  `friendly_name` varchar(70) NOT NULL,
  `max_clients` int(5) NOT NULL DEFAULT '0',
  `default_room_id` int(11) NOT NULL,
  `follow_up_period` int(11) NOT NULL,
  `deposit_type` enum('amount','percent','free','inherit') NOT NULL DEFAULT 'inherit',
  `max_models` int(11) NOT NULL,
  `availability` enum('ANY','BOOK','SELL') NOT NULL DEFAULT 'ANY',
  `force_credit_payment` int(11) NOT NULL DEFAULT '0',
  `disabled_locations` varchar(767) NOT NULL,
  `addon_services` varchar(255) NOT NULL,
  `service_participants` text,
  `with_summary_title` varchar(500) DEFAULT NULL,
  `online_book_type` enum('ALL','NEW','EXISTING') NOT NULL DEFAULT 'ALL',
  `proc_code` varchar(100) NOT NULL,
  `duration_day` int(11) NOT NULL DEFAULT '0',
  `invoice_text` text,
  `invoice_item_name` varchar(255) DEFAULT NULL,
  `online_only_service` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_index` (`company`),
  KEY `group_index` (`group_id`),
  KEY `product_index` (`product_id`),
  KEY `service` (`service`),
  KEY `pos_only` (`pos_only`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_backup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_backup` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `service` varchar(255) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `description` varchar(400) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `disabledusers` text,
  `color` varchar(20) DEFAULT NULL,
  `group_id` bigint(20) NOT NULL,
  `online_book` int(11) NOT NULL DEFAULT '1',
  `product_id` bigint(20) NOT NULL,
  `imported` int(11) NOT NULL,
  `communication_template` int(11) NOT NULL,
  `service_order` int(11) NOT NULL,
  `sms_mode` int(11) NOT NULL,
  `sms_name` varchar(255) NOT NULL,
  `sms_days_after` int(11) NOT NULL,
  `sms_send_time` varchar(255) NOT NULL,
  `sms_id` int(11) NOT NULL,
  `treatment_group_id` int(11) NOT NULL,
  `custom_id` varchar(200) NOT NULL,
  `pos_only` int(11) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `finish_time` int(11) NOT NULL,
  `deposit_amount` decimal(8,2) NOT NULL,
  `friendly_name` varchar(70) NOT NULL,
  `max_clients` int(5) NOT NULL DEFAULT '0',
  `default_room_id` int(11) NOT NULL,
  `follow_up_period` int(11) NOT NULL,
  `deposit_type` enum('amount','percent','free') NOT NULL,
  `max_models` int(11) NOT NULL,
  `availability` enum('ANY','BOOK','SELL') NOT NULL DEFAULT 'ANY',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_bundle_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_bundle_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `item_type` varchar(45) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_qty` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `service_id` (`service_id`),
  KEY `item_type` (`item_type`),
  KEY `item_id` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_default_rooms`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_default_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `default_rooms` text,
  `occupier` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_equipment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` varchar(100) NOT NULL,
  `service_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `equipment_quantity` int(11) NOT NULL,
  `priority_order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service` varchar(255) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `color` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_medical_forms`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_medical_forms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL DEFAULT '0',
  `form_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_position_price`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_position_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_services_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `position_name` varchar(450) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_services_id` (`company_services_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_position_timings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_position_timings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_services_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `position_name` varchar(450) DEFAULT NULL,
  `duration` varchar(450) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_services_id` (`company_services_id`),
  KEY `occupier` (`occupier`),
  KEY `position_id` (`position_id`),
  KEY `position_name` (`position_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_priority_rooms`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_priority_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `priority_order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `service_id` (`service_id`),
  KEY `room_id` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_retail_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_retail_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `consumable_deduction` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `service_id` (`service_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_services_users_tiers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_services_users_tiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `price` decimal(25,2) DEFAULT NULL,
  `duration` varchar(10) NOT NULL,
  `staff_commission` decimal(15,2) DEFAULT '0.00',
  `participant_commission` decimal(15,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_subscription`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_subscription` (
  `license_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(25) NOT NULL,
  `license_type` int(10) NOT NULL,
  `license_expiry` date NOT NULL,
  `active` int(2) NOT NULL,
  `code` varchar(30) NOT NULL,
  `max_user_count` int(200) NOT NULL,
  `uid` int(50) NOT NULL,
  `suspend_sms` int(11) NOT NULL,
  `sms_rate` decimal(18,3) NOT NULL DEFAULT '0.080',
  `setup_stage` varchar(100) NOT NULL,
  `disable_sms` int(11) NOT NULL,
  `payment_id` varchar(100) NOT NULL,
  `warning_level` varchar(10) NOT NULL,
  `subscription_name` varchar(20) NOT NULL,
  `subscription_fee` decimal(8,2) NOT NULL,
  `suspended_on` varchar(20) NOT NULL COMMENT 'the date of suspension',
  `demo_account` int(11) NOT NULL,
  `suspension_reason` varchar(20) NOT NULL,
  `pabau_score` int(11) NOT NULL,
  `gc_email` varchar(100) NOT NULL,
  `payment_bounces` int(11) NOT NULL,
  `training_status` int(5) NOT NULL COMMENT '0; Waiting; 1=Booked; 2=Complete;',
  `setup_status` int(2) NOT NULL COMMENT '0=Waiting; 1=Received; 2=Imported',
  `order_sheet` int(11) NOT NULL COMMENT '0=Waiting; 1=Complete',
  `complete_account` int(11) NOT NULL,
  `complete_notes` text NOT NULL,
  `details_status` int(11) NOT NULL COMMENT '0=Waiting; 1=Done;',
  `training_date` varchar(20) NOT NULL,
  `bill_cycle` date NOT NULL,
  `renew_interval` varchar(50) NOT NULL DEFAULT 'month' COMMENT 'year,month,none',
  `exclude_reports` int(11) NOT NULL,
  `sub_start_date` date NOT NULL,
  `price_range` varchar(11) NOT NULL DEFAULT 'uk_pricing',
  `stripe_customer_id` varchar(200) NOT NULL,
  `stripe_subscription_id` varchar(200) NOT NULL,
  `trial` tinyint(1) NOT NULL DEFAULT '0',
  `storage` decimal(8,2) NOT NULL DEFAULT '2000.00',
  `free_users` int(11) NOT NULL,
  `gc_customer_id` varchar(255) NOT NULL,
  `low_credit_amount` int(10) NOT NULL DEFAULT '5',
  `low_sms_action` int(5) NOT NULL DEFAULT '2' COMMENT '1=SendEmail;2=Topup500;3=TopUp2000',
  `activity_logs` int(11) NOT NULL,
  `account_live` int(11) NOT NULL,
  `discount` decimal(8,2) NOT NULL,
  `gc_plan_id` varchar(255) NOT NULL,
  `support_plan` varchar(255) NOT NULL,
  `support_fee` decimal(18,2) NOT NULL,
  `gc_support_plan_id` varchar(255) NOT NULL,
  `enterprise_user_cost` decimal(9,2) NOT NULL DEFAULT '12.00',
  `gc_enterprise_plan_id` varchar(255) NOT NULL,
  `enterprise_fee` decimal(18,2) NOT NULL,
  `gc_amount` decimal(18,2) NOT NULL,
  `leave_alert` tinyint(1) NOT NULL DEFAULT '0',
  `stripe_fee` decimal(25,2) NOT NULL DEFAULT '1.60',
  `stripe_fee_type` varchar(10) NOT NULL DEFAULT 'percentage',
  `previous_system` varchar(20) NOT NULL,
  `am_group` varchar(2) NOT NULL,
  `phone_support` int(2) NOT NULL DEFAULT '1',
  `slack_support` int(2) NOT NULL DEFAULT '0',
  `whatsapp_support` int(2) NOT NULL DEFAULT '0',
  `multiple_locations` int(2) NOT NULL,
  `commission_rate` decimal(8,2) NOT NULL,
  `live_server` varchar(255) NOT NULL DEFAULT 'crm.pabau.com',
  `sandbox_server` varchar(255) NOT NULL,
  `server_comp_id` int(11) NOT NULL,
  `partner_id` varchar(30) NOT NULL,
  `advanced_marketing_addon` int(2) NOT NULL,
  `advanced_marketing_plan_id` varchar(255) DEFAULT NULL,
  `free_months` int(11) DEFAULT '0',
  `hide_in_comps` tinyint(1) DEFAULT '0',
  `am_start_date` date DEFAULT NULL,
  `trainer_id` int(4) DEFAULT NULL,
  `onboarder_id` int(4) DEFAULT NULL,
  `is_referral` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`license_id`),
  KEY `company_id` (`company_id`),
  KEY `lic_type` (`license_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /* 50017 DEFINER=`maxscale`@`%`*/ /*!50003 TRIGGER `on_update_company_subscription` AFTER UPDATE ON `company_subscription` FOR EACH ROW BEGIN
    IF
                NEW.license_expiry <> OLD.license_expiry OR
                NEW.max_user_count <> OLD.max_user_count OR
                NEW.active <> OLD.active OR
                NEW.sms_rate <> OLD.sms_rate OR
                NEW.subscription_name <> OLD.subscription_name OR
                NEW.subscription_fee <> OLD.subscription_fee OR
                NEW.bill_cycle <> OLD.bill_cycle OR
                NEW.renew_interval <> OLD.renew_interval OR
                NEW.sub_start_date <> OLD.sub_start_date OR
                NEW.stripe_customer_id <> OLD.stripe_customer_id OR
                NEW.trial <> OLD.trial OR
                NEW.low_credit_amount <> OLD.low_credit_amount OR
                NEW.low_sms_action <> OLD.low_sms_action OR
                NEW.gc_customer_id <> OLD.gc_customer_id OR
                NEW.gc_plan_id <> OLD.gc_plan_id OR
                NEW.support_plan <> OLD.support_plan OR
                NEW.support_fee <> OLD.support_fee OR
                NEW.enterprise_user_cost <> OLD.enterprise_user_cost OR
                NEW.gc_enterprise_plan_id <> OLD.gc_enterprise_plan_id OR
                NEW.enterprise_fee <> OLD.enterprise_fee OR
                NEW.stripe_fee <> OLD.stripe_fee OR
                NEW.stripe_fee_type <> OLD.stripe_fee_type OR
                NEW.multiple_locations <> OLD.multiple_locations OR
                NEW.free_months <> OLD.free_months OR
                NEW.advanced_marketing_addon <> OLD.advanced_marketing_addon OR
                NEW.advanced_marketing_plan_id <> OLD.advanced_marketing_plan_id
    THEN
        INSERT INTO `company_subscription_trigger`(
            `license_id`,
            `company_id`,
            `license_type`,
            `license_expiry`,
            `active`,
            `code`,
            `max_user_count`,
            `suspend_sms`,
            `sms_rate`,
            `setup_stage`,
            `disable_sms`,
            `payment_id`,
            `warning_level`,
            `subscription_name`,
            `subscription_fee`,
            `suspended_on`,
            `demo_account`,
            `suspension_reason`,
            `pabau_score`,
            `gc_email`,
            `payment_bounces`,
            `training_status`,
            `setup_status`,
            `order_sheet`,
            `complete_account`,
            `complete_notes`,
            `details_status`,
            `training_date`,
            `bill_cycle`,
            `renew_interval`,
            `exclude_reports`,
            `sub_start_date`,
            `price_range`,
            `stripe_customer_id`,
            `stripe_subscription_id`,
            `trial`,
            `storage`,
            `free_users`,
            `gc_customer_id`,
            `low_credit_amount`,
            `low_sms_action`,
            `activity_logs`,
            `account_live`,
            `discount`,
            `gc_plan_id`,
            `support_plan`,
            `support_fee`,
            `gc_support_plan_id`,
            `enterprise_user_cost`,
            `gc_enterprise_plan_id`,
            `enterprise_fee`,
            `gc_amount`,
            `leave_alert`,
            `stripe_fee`,
            `stripe_fee_type`,
            `previous_system`,
            `am_group`,
            `phone_support`,
            `slack_support`,
            `whatsapp_support`,
            `multiple_locations`,
            `commission_rate`,
            `live_server`,
            `sandbox_server`,
            `server_comp_id`,
            `partner_id`,
            `advanced_marketing_addon`,
            `advanced_marketing_plan_id`,
            `free_months`,
            `hide_in_comps`,
            `am_start_date`,
            `trainer_id`,
            `onboarder_id`,
            `is_referral`
        )
            VALUES(
                      OLD.license_id,
                      OLD.company_id,
                      OLD.license_type,
                      OLD.license_expiry,
                      OLD.active,
                      OLD.code,
                      OLD.max_user_count,
                      OLD.suspend_sms,
                      OLD.sms_rate,
                      OLD.setup_stage,
                      OLD.disable_sms,
                      OLD.payment_id,
                      OLD.warning_level,
                      OLD.subscription_name,
                      OLD.subscription_fee,
                      OLD.suspended_on,
                      OLD.demo_account,
                      OLD.suspension_reason,
                      OLD.pabau_score,
                      OLD.gc_email,
                      OLD.payment_bounces,
                      OLD.training_status,
                      OLD.setup_status,
                      OLD.order_sheet,
                      OLD.complete_account,
                      OLD.complete_notes,
                      OLD.details_status,
                      OLD.training_date,
                      OLD.bill_cycle,
                      OLD.renew_interval,
                      OLD.exclude_reports,
                      OLD.sub_start_date,
                      OLD.price_range,
                      OLD.stripe_customer_id,
                      OLD.stripe_subscription_id,
                      OLD.trial,
                      OLD.storage,
                      OLD.free_users,
                      OLD.gc_customer_id,
                      OLD.low_credit_amount,
                      OLD.low_sms_action,
                      OLD.activity_logs,
                      OLD.account_live,
                      OLD.discount,
                      OLD.gc_plan_id,
                      OLD.support_plan,
                      OLD.support_fee,
                      OLD.gc_support_plan_id,
                      OLD.enterprise_user_cost,
                      OLD.gc_enterprise_plan_id,
                      OLD.enterprise_fee,
                      OLD.gc_amount,
                      OLD.leave_alert,
                      OLD.stripe_fee,
                      OLD.stripe_fee_type,
                      OLD.previous_system,
                      OLD.am_group,
                      OLD.phone_support,
                      OLD.slack_support,
                      OLD.whatsapp_support,
                      OLD.multiple_locations,
                      OLD.commission_rate,
                      OLD.live_server,
                      OLD.sandbox_server,
                      OLD.server_comp_id,
                      OLD.partner_id,
                      OLD.advanced_marketing_addon,
                      OLD.advanced_marketing_plan_id,
                      OLD.free_months,
                      OLD.hide_in_comps,
                      OLD.am_start_date,
                      OLD.trainer_id,
                      OLD.onboarder_id,
                      OLD.is_referral
                  );
    END IF;END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `company_subscription_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_subscription_trigger` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_synced` tinyint(2) NOT NULL DEFAULT '0' COMMENT 'Is current row due for a sync?',
  `license_id` int(11) NOT NULL,
  `company_id` int(25) NOT NULL,
  `license_type` int(10) NOT NULL,
  `license_expiry` date NOT NULL,
  `active` int(2) NOT NULL,
  `code` varchar(30) NOT NULL,
  `max_user_count` int(200) NOT NULL,
  `uid` int(50) NOT NULL,
  `suspend_sms` int(11) NOT NULL,
  `sms_rate` decimal(18,3) NOT NULL DEFAULT '0.080',
  `setup_stage` varchar(100) NOT NULL,
  `disable_sms` int(11) NOT NULL,
  `payment_id` varchar(100) NOT NULL,
  `warning_level` varchar(10) NOT NULL,
  `subscription_name` varchar(20) NOT NULL,
  `subscription_fee` decimal(8,2) NOT NULL,
  `suspended_on` varchar(20) NOT NULL COMMENT 'the date of suspension',
  `demo_account` int(11) NOT NULL,
  `suspension_reason` varchar(20) NOT NULL,
  `pabau_score` int(11) NOT NULL,
  `gc_email` varchar(100) NOT NULL,
  `payment_bounces` int(11) NOT NULL,
  `training_status` int(5) NOT NULL COMMENT '0; Waiting; 1=Booked; 2=Complete;',
  `setup_status` int(2) NOT NULL COMMENT '0=Waiting; 1=Received; 2=Imported',
  `order_sheet` int(11) NOT NULL COMMENT '0=Waiting; 1=Complete',
  `complete_account` int(11) NOT NULL,
  `complete_notes` text NOT NULL,
  `details_status` int(11) NOT NULL COMMENT '0=Waiting; 1=Done;',
  `training_date` varchar(20) NOT NULL,
  `bill_cycle` date NOT NULL,
  `renew_interval` varchar(50) NOT NULL DEFAULT 'month' COMMENT 'year,month,none',
  `exclude_reports` int(11) NOT NULL,
  `sub_start_date` date NOT NULL,
  `price_range` varchar(11) NOT NULL DEFAULT 'uk_pricing',
  `stripe_customer_id` varchar(200) NOT NULL,
  `stripe_subscription_id` varchar(200) NOT NULL,
  `trial` tinyint(1) NOT NULL DEFAULT '0',
  `storage` decimal(8,2) NOT NULL DEFAULT '2000.00',
  `free_users` int(11) NOT NULL,
  `gc_customer_id` varchar(255) NOT NULL,
  `low_credit_amount` int(10) NOT NULL DEFAULT '5',
  `low_sms_action` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=SendEmail;2=Topup500;3=TopUp2000;4=TopUp5000;5=TopUp10000;6=TopUp20000;',
  `activity_logs` int(11) NOT NULL,
  `account_live` int(11) NOT NULL,
  `discount` decimal(8,2) NOT NULL,
  `gc_plan_id` varchar(255) NOT NULL,
  `support_plan` varchar(255) NOT NULL,
  `support_fee` decimal(18,2) NOT NULL,
  `gc_support_plan_id` varchar(255) NOT NULL,
  `enterprise_user_cost` decimal(9,2) NOT NULL DEFAULT '12.00',
  `gc_enterprise_plan_id` varchar(255) NOT NULL,
  `enterprise_fee` decimal(18,2) NOT NULL,
  `gc_amount` decimal(18,2) NOT NULL,
  `leave_alert` tinyint(1) NOT NULL DEFAULT '0',
  `stripe_fee` decimal(25,2) NOT NULL DEFAULT '1.60',
  `stripe_fee_type` varchar(10) NOT NULL DEFAULT 'percentage',
  `previous_system` varchar(20) NOT NULL,
  `am_group` varchar(2) NOT NULL,
  `phone_support` int(2) NOT NULL DEFAULT '1',
  `slack_support` int(2) NOT NULL DEFAULT '0',
  `whatsapp_support` int(2) NOT NULL DEFAULT '0',
  `multiple_locations` int(2) NOT NULL,
  `commission_rate` decimal(8,2) NOT NULL,
  `live_server` varchar(255) NOT NULL DEFAULT 'crm.pabau.com',
  `sandbox_server` varchar(255) NOT NULL,
  `server_comp_id` int(11) NOT NULL,
  `partner_id` varchar(30) NOT NULL,
  `advanced_marketing_addon` int(2) NOT NULL,
  `advanced_marketing_plan_id` varchar(255) DEFAULT NULL,
  `free_months` int(11) DEFAULT '0',
  `hide_in_comps` tinyint(1) DEFAULT '0',
  `am_start_date` date DEFAULT NULL,
  `trainer_id` int(4) DEFAULT NULL,
  `onboarder_id` int(4) DEFAULT NULL,
  `is_referral` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_company_subscription_license_id` (`license_id`),
  KEY `fk_company_subscription_company_id` (`company_id`),
  CONSTRAINT `fk_company_subscription_company_id` FOREIGN KEY (`company_id`) REFERENCES `company_subscription` (`company_id`),
  CONSTRAINT `fk_company_subscription_license_id` FOREIGN KEY (`license_id`) REFERENCES `company_subscription` (`license_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_treatment_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_treatment_products` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `occupier` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_variables`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_variables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company` int(10) unsigned NOT NULL,
  `key` char(64) NOT NULL,
  `value` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company` (`company`,`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `config`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `value` text NOT NULL,
  `occupier` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `configure_voucher_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configure_voucher_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(18,2) DEFAULT NULL,
  `expiry_date` varchar(50) DEFAULT NULL,
  `enable` tinyint(4) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_bookings_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_bookings_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `mobile` int(11) NOT NULL,
  `browser` varchar(250) NOT NULL,
  `date_tracked` datetime NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_id` (`appointment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_card`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expiry` varchar(50) NOT NULL,
  `name` varchar(80) NOT NULL,
  `cvv` int(10) NOT NULL,
  `uid` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `card` varchar(20) NOT NULL,
  `card_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `mobile` varchar(30) NOT NULL,
  `address` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `county` varchar(30) NOT NULL,
  `postcode` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_general`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_general` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `advance` varchar(10) NOT NULL,
  `notify` varchar(1) NOT NULL,
  `login` varchar(1) NOT NULL,
  `employee` varchar(1) NOT NULL,
  `date` varchar(1) NOT NULL,
  `occupier` varchar(10) NOT NULL,
  `paypal_address` varchar(255) NOT NULL,
  `paypal_currency` varchar(100) NOT NULL,
  `template_id` int(11) NOT NULL,
  `from_email` varchar(100) NOT NULL,
  `payment_api_url` varchar(255) NOT NULL,
  `signature` varchar(255) NOT NULL,
  `service_order` varchar(100) NOT NULL,
  `sms_template_id` int(11) NOT NULL,
  `enable_email_notification` int(11) NOT NULL,
  `enable_sms_notification` int(11) NOT NULL,
  `password_template_id` int(11) NOT NULL,
  `client_template_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_registration_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_registration_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `fields_data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_stats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `ip_address` varchar(75) NOT NULL,
  `step_location` int(11) NOT NULL DEFAULT '0',
  `step_service` int(11) NOT NULL DEFAULT '0',
  `step_employee` int(11) NOT NULL DEFAULT '0',
  `step_date` int(11) NOT NULL DEFAULT '0',
  `step_login` int(11) NOT NULL DEFAULT '0',
  `converted` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_theme`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `bgcolor` varchar(10) NOT NULL,
  `bgimage` varchar(200) NOT NULL,
  `logoimage` varchar(100) NOT NULL,
  `customtitle` varchar(15) NOT NULL,
  `customcontent` varchar(1000) NOT NULL,
  `headercolor` varchar(11) NOT NULL,
  `footercolor` varchar(11) NOT NULL,
  `buttoncolor` varchar(11) NOT NULL,
  `boxshadowcolor` varchar(100) NOT NULL,
  `timecolor` varchar(100) NOT NULL,
  `fontcolor` varchar(20) NOT NULL,
  `buttontextcolor` varchar(11) NOT NULL,
  `linkcolor` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `connect_user_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connect_user_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `ip_address` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consultation_theme`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consultation_theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `header_theme` varchar(20) NOT NULL,
  `logo` varchar(500) NOT NULL,
  `button_col` varchar(10) NOT NULL,
  `background_image` varchar(500) NOT NULL,
  `video_url` varchar(200) NOT NULL,
  `intro_message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_attachment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `linkref` varchar(255) NOT NULL,
  `contact_id` int(255) NOT NULL,
  `company_id` int(255) NOT NULL,
  `date` int(200) NOT NULL,
  `attach_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `attachment_type` varchar(100) NOT NULL,
  `connect_public` int(11) NOT NULL,
  `website_public` int(11) NOT NULL,
  `attachment_title` varchar(60) NOT NULL,
  `cloud` tinyint(1) NOT NULL DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `original_path` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `photo_type` varchar(15) NOT NULL,
  `attachment_size` varchar(255) NOT NULL COMMENT 'KB',
  `broken` int(11) NOT NULL,
  `broken_check` int(11) NOT NULL,
  `old_linkref` varchar(255) NOT NULL,
  `in_folder` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `medical_form_id` int(11) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `medical_uniqid` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cloud` (`cloud`),
  KEY `contact_id` (`contact_id`),
  KEY `linkref` (`linkref`),
  KEY `custom_id` (`custom_id`),
  KEY `booking_id` (`booking_id`),
  KEY `medical_uniqid` (`medical_uniqid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_attachment_backup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_attachment_backup` (
  `id` int(11) NOT NULL,
  `linkref` varchar(255) NOT NULL,
  `contact_id` int(255) NOT NULL,
  `company_id` int(255) NOT NULL,
  `date` int(200) NOT NULL,
  `attach_name` varchar(100) NOT NULL,
  `attachment_type` varchar(100) NOT NULL,
  `connect_public` int(11) NOT NULL,
  `website_public` int(11) NOT NULL,
  `attachment_title` varchar(60) NOT NULL,
  `cloud` tinyint(1) NOT NULL DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `original_path` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `photo_type` varchar(15) NOT NULL,
  `attachment_size` varchar(255) NOT NULL COMMENT 'KB',
  `broken` int(11) NOT NULL,
  `broken_check` int(11) NOT NULL,
  `old_linkref` varchar(255) NOT NULL,
  `in_folder` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cloud` (`cloud`),
  KEY `contact_id` (`contact_id`),
  KEY `linkref` (`linkref`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_attachment_history_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_attachment_history_trigger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(255) NOT NULL,
  `contact_attachment_id` int(11) NOT NULL,
  `linkref` varchar(255) NOT NULL,
  `contact_id` int(255) NOT NULL,
  `company_id` int(255) NOT NULL,
  `date` int(200) NOT NULL,
  `attach_name` varchar(100) NOT NULL,
  `attachment_type` varchar(100) NOT NULL,
  `connect_public` int(11) NOT NULL,
  `website_public` int(11) NOT NULL,
  `attachment_title` varchar(60) NOT NULL,
  `cloud` tinyint(1) NOT NULL DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `original_path` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `photo_type` varchar(15) NOT NULL,
  `attachment_size` varchar(255) NOT NULL COMMENT 'KB',
  `broken` int(11) NOT NULL,
  `broken_check` int(11) NOT NULL,
  `old_linkref` varchar(255) NOT NULL,
  `in_folder` int(11) NOT NULL,
  `date_changed` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_attachment_missing`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_attachment_missing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `file_name` text NOT NULL,
  `date` varchar(255) NOT NULL,
  `missing` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_attachment_restore`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_attachment_restore` (
  `id` int(11) NOT NULL,
  `linkref` varchar(255) NOT NULL,
  `contact_id` int(255) NOT NULL,
  `company_id` int(255) NOT NULL,
  `date` int(200) NOT NULL,
  `attach_name` varchar(100) NOT NULL,
  `attachment_type` varchar(100) NOT NULL,
  `connect_public` int(11) NOT NULL,
  `website_public` int(11) NOT NULL,
  `attachment_title` varchar(60) NOT NULL,
  `cloud` tinyint(1) NOT NULL DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `original_path` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `photo_type` varchar(15) NOT NULL,
  `attachment_size` varchar(255) NOT NULL COMMENT 'KB',
  `broken` int(11) NOT NULL,
  `broken_check` int(11) NOT NULL,
  `old_linkref` varchar(255) NOT NULL,
  `in_folder` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cloud` (`cloud`),
  KEY `contact_id` (`contact_id`),
  KEY `linkref` (`linkref`),
  KEY `custom_id` (`custom_id`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_images_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_images_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_contact_id` int(11) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `not_found` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_insurance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_insurance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `provider_number` int(20) NOT NULL,
  `auth_code` varchar(50) NOT NULL,
  `membership_number` varchar(50) NOT NULL,
  `charge_type` varchar(20) NOT NULL,
  `company_id` int(11) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_insurer`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_insurer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_meta`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `meta_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `meta_value` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_id` (`contact_id`,`meta_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_package_used`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_package_used` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contact_package_id` bigint(20) NOT NULL,
  `date_created` datetime NOT NULL,
  `booking_id` bigint(20) NOT NULL,
  `status` varchar(100) NOT NULL,
  `book_take` tinyint(4) NOT NULL,
  `cancel_take` tinyint(4) NOT NULL,
  `occupier` int(11) NOT NULL,
  `booking_master_id` bigint(20) NOT NULL,
  `old_booking_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `booking_id` (`booking_id`),
  KEY `contact_package_id` (`contact_package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_packages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_packages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contact_id` bigint(20) NOT NULL,
  `package_id` bigint(20) NOT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `activation_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `sold_by` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `voided` int(11) NOT NULL,
  `voided_by` int(11) NOT NULL,
  `custom_status` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  `package_code` varchar(255) NOT NULL,
  `old_invoice_id` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `package_id` (`package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_relations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main_contact_id` int(11) NOT NULL,
  `rel_contact_id` int(11) NOT NULL,
  `relation_id` int(11) NOT NULL,
  `imported` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_relations_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_relations_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reverse_is` int(11) NOT NULL,
  `relation_name` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `minimal_fields` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_zip_files`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_zip_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `linkhref` varchar(255) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0=Unprocessed,1=Processing, 2=Processed',
  `user_id` int(11) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_processing` datetime NOT NULL,
  `date_processed` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contract_folders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contract_folders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `converted_balances`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `converted_balances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `countries`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `CountryCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `country_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Currency` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Continent` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_prefix` int(11) NOT NULL,
  `sms_base_rate` decimal(8,2) NOT NULL,
  `date_format` varchar(10) NOT NULL,
  `tax_name` varchar(50) NOT NULL,
  `sms_multiplier` decimal(8,2) NOT NULL,
  `general_information` text NOT NULL,
  `vaccine_recommendations` text NOT NULL,
  `other_risks` text NOT NULL,
  `outbreaks` text NOT NULL,
  `malaria` text NOT NULL,
  `nathnac_url` varchar(255) NOT NULL,
  `travax_url` varchar(255) NOT NULL,
  `gmaps_url` varchar(500) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `iso2` varchar(2) NOT NULL,
  `iso3` varchar(3) NOT NULL,
  `iso3_number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country_disease`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_disease` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `disease_id` int(11) NOT NULL,
  `risk_level` varchar(20) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) NOT NULL,
  `course_description` text NOT NULL,
  `section_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `duration` varchar(10) NOT NULL,
  `video_link` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `audio` int(11) NOT NULL,
  `coming_soon` int(11) NOT NULL,
  `created_date` varchar(10) NOT NULL,
  `zendesk_article` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `order` int(11) NOT NULL,
  `description` text NOT NULL,
  `hidden` int(11) NOT NULL,
  `course_goal` text NOT NULL,
  `coming_soon` int(11) NOT NULL,
  `pre_cat` int(11) NOT NULL,
  `category_section` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_complete`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_complete` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `complete_date` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_section`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_name` varchar(100) NOT NULL,
  `order` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_taken`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_taken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `date_started` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_user_seen`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_user_seen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_seen` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_video_watched`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_video_watched` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `complete_date` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cp_pathways`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cp_pathways` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pathway_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `is_active` int(2) NOT NULL,
  `order` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cp_pathways_taken`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cp_pathways_taken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pathway_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `started_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('CANCELLED','ACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `comment` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pathway_id` (`pathway_id`,`contact_id`),
  CONSTRAINT `cp_pathways_taken_ibfk_1` FOREIGN KEY (`pathway_id`) REFERENCES `cp_pathways` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cp_steps`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cp_steps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `created_date` datetime NOT NULL,
  `step` enum('questionnaire','consent','treatment','prescription','lab','recall','aftercare','timeline','summary','video','photo','details') NOT NULL,
  `order` int(2) NOT NULL,
  `item_id` int(11) NOT NULL COMMENT 'This will be the form_id or any other related id',
  `pathway_id` int(11) NOT NULL COMMENT 'The id from cp_pathways table',
  `can_skip` int(2) NOT NULL,
  `display_time` tinyint(4) NOT NULL DEFAULT '0',
  `other_value` varchar(50) NOT NULL COMMENT 'This can be anything else, such as video URL etc',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Description of Step',
  `who_does_this` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pathway_id` (`pathway_id`),
  CONSTRAINT `cp_steps_ibfk_1` FOREIGN KEY (`pathway_id`) REFERENCES `cp_pathways` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cp_steps_taken`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cp_steps_taken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `step_id` int(11) NOT NULL,
  `path_taken_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time` varchar(5) DEFAULT NULL,
  `status` enum('completed','skipped') NOT NULL,
  `record_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `step_id_3` (`step_id`,`path_taken_id`),
  KEY `step_id` (`step_id`,`contact_id`),
  KEY `path_taken_id` (`path_taken_id`),
  KEY `step_id_2` (`step_id`),
  CONSTRAINT `cp_steps_taken_ibfk_1` FOREIGN KEY (`step_id`) REFERENCES `cp_steps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cp_steps_taken_ibfk_2` FOREIGN KEY (`path_taken_id`) REFERENCES `cp_pathways_taken` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credit_balance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_balance` (
  `credit_balance_id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(255) NOT NULL,
  `balance` decimal(8,2) NOT NULL DEFAULT '5.00',
  `balance_currency` decimal(8,2) NOT NULL,
  `auto` tinyint(4) NOT NULL,
  PRIMARY KEY (`credit_balance_id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credit_note_type`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_note_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` int(11) NOT NULL,
  `prefix` varchar(10) DEFAULT 'CN',
  `quick_access` tinyint(1) NOT NULL DEFAULT '0',
  `credit_note_type` tinyint(1) NOT NULL DEFAULT '0',
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credit_tracking`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_tracking` (
  `ct_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `ct_uid` bigint(20) NOT NULL COMMENT 'Unique User ID',
  `ct_amount` float(8,2) NOT NULL COMMENT 'Amount Either Taken/Gained',
  `ct_date` bigint(16) NOT NULL COMMENT 'Unix Timestamp',
  `ct_txid` varchar(32) NOT NULL COMMENT 'Unique Transaction ID Assoc.',
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`ct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `crm_db_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crm_db_logs` (
  `id` int(191) NOT NULL AUTO_INCREMENT,
  `sql_query` varchar(255) NOT NULL,
  `wait_time` float NOT NULL DEFAULT '0' COMMENT 'time waited on for DB response',
  `total_hits` int(11) NOT NULL,
  `request_uri` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`),
  UNIQUE KEY `sql_query` (`sql_query`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company` int(10) unsigned NOT NULL COMMENT 'Foreign key to admin.id / company_details.company_id',
  `user` int(10) unsigned NOT NULL,
  `settings` text NOT NULL,
  `file` text NOT NULL,
  `status` enum('Queued','Executing','Finished','Questions','Scanning') NOT NULL DEFAULT 'Queued',
  `date_updated` datetime DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='[Created by JC] Stores "long jobs" that will get executed by a background thread';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_jobs_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_jobs_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_updated` datetime DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `company` int(10) unsigned NOT NULL,
  `text` text NOT NULL,
  `severity` int(11) NOT NULL DEFAULT '0',
  `ref` int(10) unsigned NOT NULL COMMENT 'foreign key to cron_jobs.id',
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currencies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currencies` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `plural` varchar(100) NOT NULL,
  `decimaldigits` int(11) NOT NULL,
  `rounding` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `custom_codes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `code_set_id` int(11) NOT NULL,
  `code` varchar(11) NOT NULL,
  `layer_1` varchar(100) NOT NULL,
  `layer_2` varchar(100) NOT NULL,
  `layer_3` varchar(100) NOT NULL,
  `layer_4` varchar(100) NOT NULL,
  `layer_5` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `icd9` varchar(10) NOT NULL,
  `icd10` varchar(10) NOT NULL,
  `osics10` varchar(10) NOT NULL,
  `is_fav` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `custom_field_actions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_field_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  `trigger_value` varchar(255) NOT NULL COMMENT 'input_completed = on any input, otherwise on specific values',
  `template_id` int(11) NOT NULL,
  `additional_data` varchar(511) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `trigger_value` (`trigger_value`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `custom_fields_display`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_fields_display` (
  `field_id` int(11) NOT NULL,
  `depends_on` int(11) NOT NULL,
  `value` varchar(200) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `type` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `mobile` varchar(22) NOT NULL,
  `active` int(11) NOT NULL,
  `country` varchar(40) NOT NULL,
  `uid` int(200) NOT NULL,
  `fb_active` int(11) NOT NULL,
  `companyid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cycle_appointment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cycle_appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cycle_id` int(11) NOT NULL,
  `appt_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cycle_id` (`cycle_id`),
  KEY `appt_id` (`appt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cycles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cycles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `cycle_name` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `diagnosis_code_id` int(11) NOT NULL,
  `medical_form_contact_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `auth_code` varchar(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `daily_report_temp`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_report_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `type` int(2) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dashboard`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dashboard` (
  `userID` int(11) NOT NULL,
  `jdashStorage` text NOT NULL,
  `page` varchar(100) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `data_debug`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data_debug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `output` text CHARACTER SET utf8,
  `cont_format` varchar(256) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `event_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `debt_manage_communication`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debt_manage_communication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `communication_id` int(11) NOT NULL,
  `letter_no` tinyint(4) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `occupier` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delete_track`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delete_track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `details` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `ip` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `diagnosis_code`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnosis_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `osics10_code` varchar(10) NOT NULL,
  `osics10_region` varchar(100) NOT NULL,
  `osics10_parent` varchar(100) NOT NULL,
  `oscis10_specific` varchar(100) NOT NULL,
  `osics10_detail` varchar(100) NOT NULL,
  `icd_injury_code` varchar(10) NOT NULL,
  `icd_injury_description` varchar(100) NOT NULL,
  `icd_parent` varchar(10) NOT NULL,
  `icd10` varchar(10) NOT NULL,
  `company_id` int(11) NOT NULL,
  `is_favourite` int(11) NOT NULL,
  `icd9` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `digest_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `digest_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `enabled` int(2) NOT NULL,
  `frequency` varchar(10) NOT NULL,
  `included_users` varchar(255) NOT NULL,
  `LastSent` date NOT NULL,
  `end_week` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `disable_contact_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disable_contact_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `gender` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `disease`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disease` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `disease_name` varchar(100) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comments` text NOT NULL,
  `deleted` int(11) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `imported` int(11) NOT NULL,
  `travax_link` varchar(255) NOT NULL,
  `nathnac_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dont_birthday_me`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dont_birthday_me` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `drinks_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drinks_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `drink_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `drugs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drugs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dosage` text COLLATE utf8_unicode_ci,
  `legalClass` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sortOrder` int(5) DEFAULT NULL,
  `sectionName` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subSectionName` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manufacturerName` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pharmaClass` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ingredients` text COLLATE utf8_unicode_ci,
  `price` text COLLATE utf8_unicode_ci,
  `quantities` text COLLATE utf8_unicode_ci,
  `generic` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `indications` text COLLATE utf8_unicode_ci,
  `warning` text COLLATE utf8_unicode_ci,
  `interactions` text COLLATE utf8_unicode_ci,
  `contraint` text COLLATE utf8_unicode_ci,
  `sideEffects` text COLLATE utf8_unicode_ci,
  `term` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `efficiency_report_temp`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `efficiency_report_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `uname` char(127) NOT NULL,
  `date` date NOT NULL,
  `total_time` int(5) NOT NULL DEFAULT '0',
  `work_start` datetime NOT NULL,
  `customers_total` int(5) NOT NULL DEFAULT '0',
  `customers_9_10` int(5) NOT NULL DEFAULT '0',
  `customers_10_11` int(5) NOT NULL DEFAULT '0',
  `customers_11_12` int(5) NOT NULL DEFAULT '0',
  `customers_12_13` int(5) NOT NULL DEFAULT '0',
  `customers_13_14` int(5) NOT NULL DEFAULT '0',
  `customers_14_15` int(5) NOT NULL DEFAULT '0',
  `customers_15_16` int(5) NOT NULL DEFAULT '0',
  `customers_16_17` int(5) NOT NULL DEFAULT '0',
  `customers_17_18` int(5) NOT NULL DEFAULT '0',
  `customers_18_19` int(5) NOT NULL DEFAULT '0',
  `break_9_10` int(5) NOT NULL DEFAULT '0',
  `break_10_11` int(5) NOT NULL DEFAULT '0',
  `break_11_12` int(5) NOT NULL DEFAULT '0',
  `break_12_13` int(5) NOT NULL DEFAULT '0',
  `break_13_14` int(5) NOT NULL DEFAULT '0',
  `break_14_15` int(5) NOT NULL DEFAULT '0',
  `break_15_16` int(5) NOT NULL DEFAULT '0',
  `break_16_17` int(5) NOT NULL DEFAULT '0',
  `break_17_18` int(5) NOT NULL DEFAULT '0',
  `break_18_19` int(5) NOT NULL DEFAULT '0',
  `idle_9_10` int(5) NOT NULL DEFAULT '60',
  `idle_10_11` int(5) NOT NULL DEFAULT '60',
  `idle_11_12` int(5) NOT NULL DEFAULT '60',
  `idle_12_13` int(5) NOT NULL DEFAULT '60',
  `idle_13_14` int(5) NOT NULL DEFAULT '60',
  `idle_14_15` int(5) NOT NULL DEFAULT '60',
  `idle_15_16` int(5) NOT NULL DEFAULT '60',
  `idle_16_17` int(5) NOT NULL DEFAULT '60',
  `idle_17_18` int(5) NOT NULL DEFAULT '60',
  `idle_18_19` int(5) NOT NULL DEFAULT '60',
  `avail_9_10` int(5) NOT NULL DEFAULT '0',
  `avail_10_11` int(5) NOT NULL DEFAULT '0',
  `avail_11_12` int(5) NOT NULL DEFAULT '0',
  `avail_12_13` int(5) NOT NULL DEFAULT '0',
  `avail_13_14` int(5) NOT NULL DEFAULT '0',
  `avail_14_15` int(5) NOT NULL DEFAULT '0',
  `avail_15_16` int(5) NOT NULL DEFAULT '0',
  `avail_16_17` int(5) NOT NULL DEFAULT '0',
  `avail_17_18` int(5) NOT NULL DEFAULT '0',
  `avail_18_19` int(5) NOT NULL DEFAULT '0',
  `work_9_10` int(5) NOT NULL DEFAULT '0',
  `work_10_11` int(5) NOT NULL DEFAULT '0',
  `work_11_12` int(5) NOT NULL DEFAULT '0',
  `work_12_13` int(5) NOT NULL DEFAULT '0',
  `work_13_14` int(5) NOT NULL DEFAULT '0',
  `work_14_15` int(5) NOT NULL DEFAULT '0',
  `work_15_16` int(5) NOT NULL DEFAULT '0',
  `work_16_17` int(5) NOT NULL DEFAULT '0',
  `work_17_18` int(5) NOT NULL DEFAULT '0',
  `work_18_19` int(5) NOT NULL DEFAULT '0',
  `late_9_10` int(5) NOT NULL DEFAULT '0',
  `late_10_11` int(5) NOT NULL DEFAULT '0',
  `late_11_12` int(5) NOT NULL DEFAULT '0',
  `late_12_13` int(5) NOT NULL DEFAULT '0',
  `late_13_14` int(5) NOT NULL DEFAULT '0',
  `late_14_15` int(5) NOT NULL DEFAULT '0',
  `late_15_16` int(5) NOT NULL DEFAULT '0',
  `late_16_17` int(5) NOT NULL DEFAULT '0',
  `late_17_18` int(5) NOT NULL DEFAULT '0',
  `late_18_19` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email_blacklist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_blacklist` (
  `email_id` int(11) NOT NULL AUTO_INCREMENT,
  `email_address` varchar(50) NOT NULL,
  `email_action` varchar(8) NOT NULL,
  `notify_company` int(11) NOT NULL,
  PRIMARY KEY (`email_id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailtemplate_attachments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailtemplate_attachments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `template_id` bigint(20) NOT NULL,
  `file` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `template_id` (`template_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_closure_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_closure_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meter_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_connects`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_connects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `send_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_connects_followup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_connects_followup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `send_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_custom_meters`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_custom_meters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_followups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_followups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `sms_template` int(11) NOT NULL,
  `email_template` int(11) NOT NULL,
  `followup_period` int(11) NOT NULL,
  `followup_method` varchar(50) NOT NULL,
  `contacts` text NOT NULL,
  `created_date` date NOT NULL,
  `completed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_general_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_general_settings` (
  `company_id` int(11) NOT NULL,
  `auto_engage` tinyint(1) NOT NULL,
  `auto_followup` tinyint(1) NOT NULL,
  `revenue_since` int(11) NOT NULL,
  `default_view` varchar(20) NOT NULL DEFAULT 'categories',
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` int(11) NOT NULL,
  `succeeded` int(11) NOT NULL,
  `skipped` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `event_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `test` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_meter_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_meter_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meter_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `engage_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engage_settings` (
  `service_id` int(11) NOT NULL,
  `setting_type` varchar(100) NOT NULL DEFAULT 'category',
  `company_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `sms_template` int(11) NOT NULL,
  `email_template` int(11) NOT NULL,
  `lost_period` int(11) NOT NULL,
  `method` varchar(50) NOT NULL,
  `customer_since` date NOT NULL,
  `negative_feedback` int(1) NOT NULL,
  `ignore_sms_optout` tinyint(1) NOT NULL DEFAULT '1',
  `no_appts_min` int(11) NOT NULL,
  `no_appts_max` int(11) NOT NULL,
  `amount_paid_min` int(11) NOT NULL,
  `amount_paid_max` int(11) NOT NULL,
  `client_status` varchar(50) NOT NULL DEFAULT 'any',
  `last_engaged` int(11) NOT NULL,
  `customer_of` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(10) NOT NULL DEFAULT 'any',
  `age_min` int(11) NOT NULL,
  `age_max` int(11) NOT NULL,
  `notes` text NOT NULL,
  `fw_sms_template` int(11) NOT NULL,
  `fw_email_template` int(11) NOT NULL,
  `fw_period` int(11) NOT NULL,
  `fw_method` varchar(50) NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `equipment_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `is_active` int(11) NOT NULL,
  `field_order` int(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `events`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `eventid` int(100) NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` blob NOT NULL,
  `imgid` int(10) NOT NULL,
  `featured` int(1) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `address` varchar(70) NOT NULL,
  `start` varchar(50) NOT NULL,
  `end` varchar(50) NOT NULL,
  `price` int(20) NOT NULL,
  `postcode` varchar(10) NOT NULL,
  `city` varchar(30) NOT NULL,
  `cover_photo` varchar(200) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`eventid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `external_guest`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `external_guest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `Name` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `face_body_diagram_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `face_body_diagram_settings` (
  `id` int(11) NOT NULL,
  `face_diagram_url` varchar(350) DEFAULT NULL,
  `body_diagram_url` varchar(350) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `facebook_pages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facebook_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fb_page_id` double NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fb_page_id` (`fb_page_id`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `failed_import`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_import` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(100) NOT NULL,
  `col0` varchar(100) NOT NULL,
  `col1` varchar(100) NOT NULL,
  `col2` varchar(100) NOT NULL,
  `col3` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file_hits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_hits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(255) NOT NULL,
  `hits` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `file` (`file`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `finance_accounts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `finance_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `account_name` varchar(500) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `finance_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `finance_history` (
  `FinanceID` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `Record_Type` varchar(255) DEFAULT NULL,
  `Date` date NOT NULL,
  `Linked_Document` varchar(255) DEFAULT NULL,
  `Reference` varchar(255) DEFAULT NULL,
  `Amount` float(8,2) NOT NULL,
  `Company` int(255) NOT NULL,
  `tax_id` int(11) DEFAULT '0',
  `status` tinyint(4) DEFAULT '1',
  `invoice_id` int(11) DEFAULT NULL,
  `commission_sheet_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT '0',
  `debtor` varchar(500) DEFAULT NULL,
  `who_expense` varchar(500) DEFAULT NULL,
  `what_expense` varchar(500) DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  `bank_ref` varchar(500) DEFAULT NULL,
  `comments` text,
  `matched_with` varchar(500) DEFAULT NULL,
  `dispute_flag` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`FinanceID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `finance_history_payment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `finance_history_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(8,2) NOT NULL,
  `payment_type_id` varchar(20) NOT NULL,
  `company_id` int(11) NOT NULL,
  `entry_date` datetime NOT NULL,
  `finance_id` int(11) NOT NULL,
  `comments` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `financial_statements`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financial_statements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement_no` int(191) NOT NULL,
  `url` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `insurer_id` int(11) NOT NULL DEFAULT '0',
  `occupier` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fingerprints_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fingerprints_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL COMMENT 'foreign key to users.ID',
  `fingerprint` text COMMENT 'raw data received from the FS-88 fp reader - just store this and load it back into memory to be able to identify a human fingerprint',
  `enrolled` datetime DEFAULT NULL COMMENT 'set to NOW() when this row was written',
  `last_scanned` datetime DEFAULT NULL COMMENT 'set to NOW() whenever the user pressed thumb on fingerprint scanner',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flagged_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flagged_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `target_id` int(11) NOT NULL COMMENT 'The id of the item in question',
  `type` varchar(200) NOT NULL COMMENT 'Item type',
  `description` varchar(200) NOT NULL,
  `raised_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follow_notif`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follow_notif` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `user_id` int(200) NOT NULL,
  `campaign_id` int(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `follow_date` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_builder_detail`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_builder_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `occupier` int(11) unsigned NOT NULL,
  `form_id` int(11) unsigned NOT NULL,
  `field_name` varchar(255) DEFAULT '',
  `field_value` text,
  `input_id` int(255) NOT NULL COMMENT 'The ID of the user input',
  `entrydate` int(200) NOT NULL,
  `ref` int(20) NOT NULL,
  `ip` varchar(30) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gift_card_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gift_card_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `start_date` int(11) NOT NULL,
  `end_date` int(11) NOT NULL,
  `default_price` decimal(8,2) NOT NULL,
  `default_value` decimal(8,2) NOT NULL,
  `template_theme` varchar(100) NOT NULL,
  `is_active` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `terms` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gl_codes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gl_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `description` enum('payment_type','discount','tax_rate','location_code','service_code','product_code','setup') NOT NULL,
  `related_to` int(11) NOT NULL COMMENT 'This is an ID for the relation',
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `related_to` (`related_to`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `global_meta`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `global_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'Name of the Meta',
  `value` text NOT NULL COMMENT 'Value of the Meta',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gocardless_bills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gocardless_bills` (
  `primary_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `gocardless_fees` decimal(8,2) NOT NULL,
  `partner_fees` decimal(8,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `other_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `paid_at` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `merchant_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `source_type` varchar(50) NOT NULL,
  `source_id` varchar(50) NOT NULL,
  `uri` varchar(255) NOT NULL,
  `can_be_retried` varchar(100) NOT NULL,
  `payout_id` varchar(100) NOT NULL,
  `is_setup_fee` varchar(50) NOT NULL,
  `charge_customer_at` varchar(50) NOT NULL,
  PRIMARY KEY (`primary_id`),
  UNIQUE KEY `id_index` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gocardless_events`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gocardless_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `payment_status` text NOT NULL,
  `dtime` datetime NOT NULL,
  `gc_email` varchar(100) NOT NULL,
  `payment_id` varchar(500) DEFAULT NULL,
  `after_bank_transver` int(11) NOT NULL DEFAULT '0',
  `sale_id` int(11) NOT NULL,
  `event_data` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_id` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gocardless_merchants`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gocardless_merchants` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `access_token` char(127) DEFAULT NULL,
  `merchant_id` char(127) DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `biller_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gocardless_merchants3`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gocardless_merchants3` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `access_token` char(127) NOT NULL,
  `merchant_id` char(127) NOT NULL,
  `event_log_id` char(127) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gocardless_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gocardless_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inv_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gocardless_subscriptions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gocardless_subscriptions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subscription_url` char(255) DEFAULT NULL,
  `bills_url` char(255) DEFAULT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `plan_id` int(10) unsigned DEFAULT NULL,
  `amount` int(10) unsigned NOT NULL,
  `interval_length` int(10) unsigned NOT NULL,
  `interval_unit` char(16) NOT NULL,
  `interval_count` int(10) unsigned NOT NULL,
  `name` char(255) NOT NULL,
  `description` char(255) DEFAULT NULL,
  `setup_fee` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `currency` char(3) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `merchant_id` char(64) NOT NULL,
  `next_interval_start` datetime DEFAULT NULL,
  `start_at` datetime DEFAULT NULL,
  `initiated_at` datetime DEFAULT NULL,
  `status` char(64) DEFAULT NULL,
  `go_user_id` char(64) DEFAULT NULL,
  `go_subscription_id` char(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gp_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gp_details` (
  `gp_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `gp_name` varchar(200) NOT NULL,
  `gp_surgery` varchar(200) DEFAULT NULL,
  `gp_address1` varchar(200) NOT NULL,
  `gp_address2` varchar(200) NOT NULL,
  `gp_address3` varchar(200) NOT NULL,
  `gp_address4` varchar(200) NOT NULL,
  `gp_address5` varchar(200) NOT NULL,
  `gp_postcode` varchar(10) NOT NULL,
  `gp_email` varchar(255) DEFAULT NULL,
  `gp_phone` varchar(20) NOT NULL,
  `gp_ratings` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`gp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gp_details_old`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gp_details_old` (
  `gp_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `gp_name` varchar(200) NOT NULL,
  `gp_address1` varchar(200) NOT NULL,
  `gp_address2` varchar(200) NOT NULL,
  `gp_address3` varchar(200) NOT NULL,
  `gp_address4` varchar(200) NOT NULL,
  `gp_address5` varchar(200) NOT NULL,
  `gp_postcode` varchar(10) NOT NULL,
  `gp_phone` varchar(20) NOT NULL,
  `gp_ratings` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`gp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gp_details_temp`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gp_details_temp` (
  `gp_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `gp_name` varchar(200) NOT NULL,
  `gp_address1` varchar(200) NOT NULL,
  `gp_address2` varchar(200) NOT NULL,
  `gp_address3` varchar(200) NOT NULL,
  `gp_address4` varchar(200) NOT NULL,
  `gp_address5` varchar(200) NOT NULL,
  `gp_postcode` varchar(10) NOT NULL,
  `gp_phone` varchar(20) NOT NULL,
  `gp_ratings` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`gp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `fb_user_id` bigint(20) DEFAULT NULL,
  `fb_group_id` bigint(20) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `group_data` text,
  `auth_date` datetime DEFAULT NULL,
  `group_postable` enum('YES','NO') DEFAULT 'YES',
  `group_bookmark_order` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `fb_group_id` (`fb_group_id`,`fb_user_id`,`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `guestlist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guestlist` (
  `guestlistid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `nop` int(30) NOT NULL,
  `date` date NOT NULL,
  `ip` varchar(255) NOT NULL,
  `occupier` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `submission_date` date NOT NULL,
  PRIMARY KEY (`guestlistid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `guru_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guru_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `days` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `healthcode_insurers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `healthcode_insurers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `code` char(4) NOT NULL COMMENT 'Three character identifier for this insurer',
  `name` char(32) NOT NULL COMMENT 'Insurer friendly name',
  `edi` tinyint(1) NOT NULL COMMENT 'Does this insurer support EDI?',
  `me` tinyint(1) NOT NULL COMMENT 'Does this insurer support ME?',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `healthcode_payee_codes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `healthcode_payee_codes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `practitioner_id` int(10) unsigned NOT NULL COMMENT 'foreign key is users.id',
  `insurer_id` int(10) unsigned NOT NULL COMMENT 'foreign key is insurance_details.id',
  `code` char(32) NOT NULL,
  `location_id` int(10) unsigned NOT NULL COMMENT 'foreign key is company_branches.id',
  `company_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `the_unqiueness` (`practitioner_id`,`insurer_id`,`location_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `healthcode_remittances`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `healthcode_remittances` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `Status` varchar(255) NOT NULL,
  `MsgId` varchar(255) NOT NULL,
  `MsgIssueDate` varchar(255) NOT NULL,
  `MsgSender` varchar(255) NOT NULL,
  `MsgRecipient` varchar(255) NOT NULL,
  `Insurer` varchar(255) NOT NULL,
  `ProviderNo` varchar(255) NOT NULL,
  `PaymentReference` varchar(255) NOT NULL,
  `ProcessDate` varchar(255) NOT NULL,
  `PaymentDate` varchar(255) NOT NULL,
  `PaymentMethod` varchar(255) NOT NULL,
  `BankAccountHash` varchar(16) NOT NULL,
  `Cuid` varchar(255) NOT NULL,
  `CHClaimNo` varchar(255) NOT NULL,
  `PayorClaimNo` varchar(255) NOT NULL,
  `InvoiceNo` varchar(255) NOT NULL,
  `InvoiceDate` varchar(255) NOT NULL,
  `ClaimAmt` varchar(255) NOT NULL,
  `PaidAmt` varchar(255) NOT NULL,
  `PrevPaidAmt` varchar(255) NOT NULL,
  `ShortAmt` varchar(255) NOT NULL,
  `InvoiceRef` varchar(255) NOT NULL,
  `RegistrationNo` varchar(255) NOT NULL,
  `PatientInitials` varchar(255) NOT NULL,
  `PatientName_FamilyName` varchar(255) NOT NULL,
  `PatientName_MiddleName` varchar(255) DEFAULT NULL,
  `PatientName_GivenName` varchar(255) DEFAULT NULL,
  `BankSortCode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MsgId` (`MsgId`,`ProviderNo`,`Cuid`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `healthcode_submittals`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `healthcode_submittals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `data_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Holds json data for the form to be submitted',
  `data_xml` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `data_soap` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `date_inserted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Pending','Submitted','Submitted*','Error','Remitted','') NOT NULL DEFAULT 'Pending',
  `response_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Response from the endpoint gets stored here',
  `invoice_id` int(10) unsigned NOT NULL COMMENT 'Link to inv_sales.id',
  `date_updated` datetime DEFAULT NULL,
  `structured_errors` longtext,
  `healthcode_id` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_id` (`invoice_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `holiday_requests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holiday_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `holiday_from` date NOT NULL,
  `holiday_to` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `leave_type` varchar(30) NOT NULL,
  `approved_by` int(11) NOT NULL,
  `staff_comments` text NOT NULL,
  `seen` int(11) NOT NULL,
  `rejected_by` int(11) DEFAULT NULL,
  `approve_comments` text,
  `reject_comments` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hourly_report_temp`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hourly_report_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `uname` char(127) NOT NULL,
  `date` date NOT NULL,
  `customers_total` int(5) NOT NULL DEFAULT '0',
  `customers_9_10` int(5) NOT NULL DEFAULT '0',
  `customers_10_11` int(5) NOT NULL DEFAULT '0',
  `customers_11_12` int(5) NOT NULL DEFAULT '0',
  `customers_12_13` int(5) NOT NULL DEFAULT '0',
  `customers_13_14` int(5) NOT NULL DEFAULT '0',
  `customers_14_15` int(5) NOT NULL DEFAULT '0',
  `customers_15_16` int(5) NOT NULL DEFAULT '0',
  `customers_16_17` int(5) NOT NULL DEFAULT '0',
  `customers_17_18` int(5) NOT NULL DEFAULT '0',
  `customers_18_19` int(5) NOT NULL DEFAULT '0',
  `haircuts_total` int(5) NOT NULL DEFAULT '0',
  `haircuts_9_10` int(5) NOT NULL DEFAULT '0',
  `haircuts_10_11` int(5) NOT NULL DEFAULT '0',
  `haircuts_11_12` int(5) NOT NULL DEFAULT '0',
  `haircuts_12_13` int(5) NOT NULL DEFAULT '0',
  `haircuts_13_14` int(5) NOT NULL DEFAULT '0',
  `haircuts_14_15` int(5) NOT NULL DEFAULT '0',
  `haircuts_15_16` int(5) NOT NULL DEFAULT '0',
  `haircuts_16_17` int(5) NOT NULL DEFAULT '0',
  `haircuts_17_18` int(5) NOT NULL DEFAULT '0',
  `haircuts_18_19` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_total` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_9_10` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_10_11` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_11_12` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_12_13` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_13_14` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_14_15` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_15_16` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_16_17` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_17_18` int(5) NOT NULL DEFAULT '0',
  `haircuts_p_18_19` int(5) NOT NULL DEFAULT '0',
  `shaves_total` int(5) NOT NULL DEFAULT '0',
  `shaves_9_10` int(5) NOT NULL DEFAULT '0',
  `shaves_10_11` int(5) NOT NULL DEFAULT '0',
  `shaves_11_12` int(5) NOT NULL DEFAULT '0',
  `shaves_12_13` int(5) NOT NULL DEFAULT '0',
  `shaves_13_14` int(5) NOT NULL DEFAULT '0',
  `shaves_14_15` int(5) NOT NULL DEFAULT '0',
  `shaves_15_16` int(5) NOT NULL DEFAULT '0',
  `shaves_16_17` int(5) NOT NULL DEFAULT '0',
  `shaves_17_18` int(5) NOT NULL DEFAULT '0',
  `shaves_18_19` int(5) NOT NULL DEFAULT '0',
  `beards_total` int(5) NOT NULL DEFAULT '0',
  `beards_9_10` int(5) NOT NULL DEFAULT '0',
  `beards_10_11` int(5) NOT NULL DEFAULT '0',
  `beards_11_12` int(5) NOT NULL DEFAULT '0',
  `beards_12_13` int(5) NOT NULL DEFAULT '0',
  `beards_13_14` int(5) NOT NULL DEFAULT '0',
  `beards_14_15` int(5) NOT NULL DEFAULT '0',
  `beards_15_16` int(5) NOT NULL DEFAULT '0',
  `beards_16_17` int(5) NOT NULL DEFAULT '0',
  `beards_17_18` int(5) NOT NULL DEFAULT '0',
  `beards_18_19` int(5) NOT NULL DEFAULT '0',
  `avg_wait_time_9_10` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_10_11` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_11_12` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_12_13` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_13_14` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_14_15` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_15_16` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_16_17` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_17_18` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avg_wait_time_18_19` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_9_10` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_10_11` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_11_12` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_12_13` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_13_14` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_14_15` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_15_16` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_16_17` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_17_18` decimal(10,2) NOT NULL DEFAULT '0.00',
  `revenue_18_19` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `icd10`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icd10` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `full_description` varchar(200) NOT NULL,
  `hf_exclude` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `icd11`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icd11` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `layer_1` varchar(255) NOT NULL,
  `layer_2` varchar(255) NOT NULL,
  `layer_3` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `icd9`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icd9` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `import_contacts_hb`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_contacts_hb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Mobile` varchar(255) NOT NULL,
  `OtherPhone` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `Note` text NOT NULL,
  `gender` varchar(100) NOT NULL,
  `MailingStreet` varchar(255) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `inserted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `import_custom_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_custom_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` varchar(30) NOT NULL,
  `custom_name` varchar(100) NOT NULL,
  `helper_type` varchar(10) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_name` (`custom_name`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `import_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `import_type` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `old_name` varchar(255) NOT NULL,
  `entries` int(11) NOT NULL,
  `empty_rows` int(11) NOT NULL,
  `key` int(11) NOT NULL,
  `linkref` text NOT NULL,
  `json_data` text NOT NULL,
  `import_status` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `ins_match` int(2) NOT NULL,
  `con_match` int(2) NOT NULL,
  `pro_match` int(2) NOT NULL,
  `dob_match` int(2) NOT NULL,
  `mem_match` int(2) NOT NULL,
  `appt_proc` int(2) NOT NULL,
  `treat_match` int(2) NOT NULL,
  `appt_issue` int(2) NOT NULL,
  `appt_room` int(2) NOT NULL,
  `appt_con` int(2) NOT NULL,
  `appt_ser` int(2) NOT NULL,
  `appt_use` int(2) NOT NULL,
  `rota_proc` int(2) NOT NULL,
  `rota_use` int(2) NOT NULL,
  `rota_loc` int(2) NOT NULL,
  `rota_room` int(2) NOT NULL,
  `class_proc` int(2) NOT NULL,
  `classm_proc` int(2) NOT NULL,
  `serv_cat` int(2) NOT NULL,
  `prod_cat` int(2) NOT NULL,
  `appt_loc` int(2) NOT NULL,
  `appt_bookout` int(2) NOT NULL,
  `left_to_match` int(11) NOT NULL,
  `con_mar` int(2) NOT NULL,
  `inv_proc` int(2) NOT NULL,
  `inv_loc` int(2) NOT NULL,
  `inv_help` int(2) NOT NULL,
  `inv_biller` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `import_helper_attachment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_helper_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `col0` varchar(200) NOT NULL,
  `col1` varchar(200) NOT NULL,
  `col2` varchar(200) NOT NULL,
  `col3` varchar(200) NOT NULL,
  `col4` varchar(200) NOT NULL,
  `col5` varchar(200) NOT NULL,
  `col6` varchar(200) NOT NULL,
  `col7` varchar(200) NOT NULL,
  `col8` varchar(200) NOT NULL,
  `company_id` int(11) NOT NULL,
  `batch_no` varchar(50) NOT NULL,
  `full_url` varchar(200) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `sync` int(11) NOT NULL,
  `attach_id` int(11) NOT NULL,
  `system_id` int(11) NOT NULL COMMENT 'this is the id from the previous system (ex: e-clinic)',
  `attach_date` date NOT NULL,
  `col15` varchar(50) NOT NULL,
  `col9` varchar(50) NOT NULL,
  `uploader_id` int(11) NOT NULL,
  `col16` varchar(200) NOT NULL,
  `col17` varchar(200) NOT NULL,
  `col18` varchar(200) NOT NULL,
  `col19` varchar(200) NOT NULL,
  `col20` varchar(200) NOT NULL,
  `actual_file_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `id` (`id`),
  KEY `company_id_2` (`company_id`),
  KEY `company_id_3` (`company_id`),
  KEY `col3` (`col3`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `importer_configuration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `importer_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `software_name` varchar(100) NOT NULL,
  `client_module` int(2) NOT NULL,
  `staff_module` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `income_track`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `income_track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `revenue` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `indicators`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indicators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `description` text,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `sql` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `insurance_cp_amount`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurance_cp_amount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(25,2) NOT NULL,
  `price_0` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for SUN',
  `price_1` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for MON',
  `price_2` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for TUE',
  `price_3` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for WED',
  `price_4` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for THU',
  `price_5` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for FRI',
  `price_6` decimal(25,2) NOT NULL DEFAULT '0.00' COMMENT 'for SAT',
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `insurance_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurance_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `insurer_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `website` varchar(100) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(100) NOT NULL,
  `county` varchar(30) NOT NULL,
  `post_code` varchar(10) NOT NULL,
  `email` varchar(150) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `image` varchar(200) NOT NULL,
  `country` varchar(50) NOT NULL,
  `street2` varchar(100) NOT NULL,
  `provider_no` varchar(50) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  `healthcode_id` int(10) unsigned DEFAULT NULL COMMENT 'Link to healthcode_insurers.id',
  `cycle_quantity` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `company_type` varchar(15) NOT NULL,
  `hc_identifier` varchar(15) NOT NULL,
  `xero_contact_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `insurer_contracts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurer_contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL DEFAULT '1',
  `contract_type` enum('INSURANCE','EMPLOYEE') NOT NULL DEFAULT 'INSURANCE' COMMENT 'as of contracts revision insurer_id can point to an employee too.',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `show_bank_details` tinyint(1) NOT NULL DEFAULT '1',
  `bank_account` varchar(100) NOT NULL,
  `bank_number` varchar(100) NOT NULL,
  `sort_code` varchar(100) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `iban` varchar(100) NOT NULL,
  `swift` varchar(100) NOT NULL,
  `vat_number` varchar(100) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  `private_contract` tinyint(1) NOT NULL DEFAULT '0',
  `employee_id` int(11) NOT NULL,
  `full_address` text NOT NULL,
  `registered_company_address` varchar(255) NOT NULL,
  `default_address_to` tinyint(1) NOT NULL DEFAULT '0',
  `invoice_template_id` int(11) DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  `last_update` datetime NOT NULL,
  `mp_rule_name` varchar(50) NOT NULL,
  `rule_type` int(2) NOT NULL,
  `second_service` decimal(8,2) NOT NULL,
  `further_service` decimal(8,2) NOT NULL,
  `action_tax_id` int(11) NOT NULL,
  `custom_id_template` varchar(255) DEFAULT NULL,
  `invoice_prefix` varchar(10) DEFAULT NULL,
  `invoice_starting_num` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `insurer_id` (`insurer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `insurer_validation`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insurer_validation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(4) NOT NULL,
  `rule` varchar(50) NOT NULL,
  `regex` varchar(30) NOT NULL,
  `reference` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `intelli_goal_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `intelli_goal_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `goal_type` tinyint(4) NOT NULL,
  `type_id` int(11) NOT NULL,
  `jan` varchar(200) DEFAULT NULL,
  `feb` varchar(200) DEFAULT NULL,
  `mar` varchar(200) DEFAULT NULL,
  `april` varchar(200) DEFAULT NULL,
  `may` varchar(200) DEFAULT NULL,
  `june` varchar(200) DEFAULT NULL,
  `july` varchar(200) DEFAULT NULL,
  `august` varchar(200) DEFAULT NULL,
  `sept` varchar(200) DEFAULT NULL,
  `oct` varchar(200) DEFAULT NULL,
  `nov` varchar(200) DEFAULT NULL,
  `dec` varchar(200) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `intelli_tiles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `intelli_tiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unique_name` varchar(255) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `order_number` int(11) NOT NULL,
  `value_type` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `tile_type` varchar(255) NOT NULL,
  `type_data` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `intelli_tiles_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `intelli_tiles_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `order_number` int(11) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `intelli_user_tiles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `intelli_user_tiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tile_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `related_id` int(11) NOT NULL,
  `order_number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_billers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_billers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `cui` varchar(55) NOT NULL,
  `reg` varchar(55) NOT NULL,
  `cnp` varchar(55) NOT NULL,
  `serie` varchar(55) NOT NULL,
  `account_no` varchar(55) NOT NULL,
  `bank` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(55) NOT NULL,
  `state` varchar(55) NOT NULL,
  `postal_code` varchar(8) NOT NULL,
  `country` varchar(55) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `invoice_footer` varchar(1000) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `custom_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `qualification` varchar(50) NOT NULL,
  `is_disabled` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(55) NOT NULL,
  `name` varchar(100) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `category_type` varchar(100) DEFAULT 'retail',
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `custom_id` int(11) NOT NULL,
  `PriceListGroup_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `technical` int(11) NOT NULL,
  `image` varchar(250) NOT NULL,
  `disabled` int(11) NOT NULL,
  `tax_id` int(11) NOT NULL,
  `master_cat_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier_index` (`occupier`),
  KEY `uid_index` (`uid`),
  KEY `category_type` (`category_type`),
  KEY `master_cat_id` (`master_cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_container`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_container` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(155) NOT NULL,
  `container_name` varchar(355) NOT NULL,
  `note` text NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_ins_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_ins_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL DEFAULT '0',
  `amount` decimal(10,2) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `payment_type` varchar(200) DEFAULT '0',
  `paid_amount` decimal(10,2) DEFAULT '0.00',
  `remaining` decimal(10,2) DEFAULT '0.00',
  `ref_number` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_lots`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_lots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(155) NOT NULL,
  `lot_name` varchar(355) NOT NULL,
  `note` text,
  `color` varchar(155) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `rolls` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_movement`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_movement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `date` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `new_quantity` int(11) NOT NULL,
  `entered_by` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `room_id` int(11) NOT NULL,
  `sale_item_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `company_id` (`company_id`),
  KEY `room_id` (`room_id`),
  KEY `sale_id` (`sale_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_payment_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_payment_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(800) DEFAULT NULL,
  `epos_display` tinyint(4) DEFAULT NULL,
  `description` text,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `is_active` int(11) NOT NULL,
  `is_money` int(11) NOT NULL,
  `type` varchar(100) NOT NULL DEFAULT 'money',
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(255) NOT NULL,
  `date` int(12) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `invoice` int(11) NOT NULL,
  `pmethod` varchar(255) NOT NULL,
  `account_balance` tinyint(4) DEFAULT '0',
  `contact_id` int(11) DEFAULT '0',
  `occupier` int(5) NOT NULL,
  `order_id` int(11) DEFAULT '0',
  `uid` int(11) NOT NULL,
  `card_type` varchar(200) NOT NULL,
  `charge_amount` decimal(20,2) NOT NULL,
  `card_digits` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `note` varchar(255) NOT NULL,
  `new_way2` int(11) NOT NULL,
  `new_way3` int(11) NOT NULL,
  `ref_num` varchar(200) NOT NULL,
  `custom_pmethod` varchar(255) NOT NULL,
  `xero_payment_id` varchar(255) NOT NULL,
  `is_insurance` tinyint(4) DEFAULT '0',
  `payment_id` int(11) DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_invoice_id` int(11) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  `is_credit_note` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `contact_id` (`contact_id`),
  KEY `pmethod` (`pmethod`),
  KEY `date` (`date`),
  KEY `invoice` (`invoice`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_payments_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_payments_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(255) NOT NULL,
  `date` int(12) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `invoice` int(11) NOT NULL,
  `pmethod` varchar(255) NOT NULL,
  `account_balance` tinyint(4) DEFAULT '0',
  `contact_id` int(11) DEFAULT '0',
  `occupier` int(5) NOT NULL,
  `order_id` int(11) DEFAULT '0',
  `uid` int(11) NOT NULL,
  `card_type` varchar(200) NOT NULL,
  `charge_amount` decimal(20,2) NOT NULL,
  `new_way` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `note` varchar(255) NOT NULL,
  `new_way2` int(11) NOT NULL,
  `new_way3` int(11) NOT NULL,
  `ref_num` varchar(200) NOT NULL,
  `custom_pmethod` varchar(255) NOT NULL,
  `xero_payment_id` varchar(255) NOT NULL,
  `is_insurance` tinyint(4) DEFAULT '0',
  `payment_id` int(11) DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_invoice_id` int(11) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice` (`invoice`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_payments_unallocated`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_payments_unallocated` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `pmethod` varchar(255) NOT NULL,
  `date` int(12) NOT NULL,
  `insurer_id` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_insurer_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `reference` varchar(255) NOT NULL,
  `charge_amount` decimal(20,2) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `custom_contact_name` (`custom_contact_name`),
  KEY `custom_insurer_id` (`custom_insurer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` char(255) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `size` varchar(55) NOT NULL,
  `product_order` int(11) DEFAULT NULL,
  `um` varchar(55) NOT NULL,
  `cost` decimal(25,2) DEFAULT NULL,
  `price` decimal(25,2) NOT NULL,
  `alert_quantity` int(11) NOT NULL DEFAULT '20',
  `show_on_website` varchar(4) DEFAULT 'No',
  `image` varchar(255) DEFAULT 'no_image.jpg',
  `category_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT '0',
  `note` text,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `Description` longtext NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `category_custom_id` int(11) NOT NULL,
  `PriceListGroup_id` int(11) NOT NULL,
  `VATRate_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `old_barcode` varchar(50) NOT NULL,
  `max_level` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `product_points` int(11) NOT NULL,
  `open_sale` int(11) NOT NULL,
  `new_imported` int(11) NOT NULL,
  `sage_nominal_code` varchar(10) NOT NULL,
  `procedure_date` datetime NOT NULL,
  `product_account_code_xero` varchar(255) NOT NULL,
  `allow_negative_qty` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'This is the check to allow negative quantity in stock for this product',
  PRIMARY KEY (`id`),
  KEY `company_index` (`occupier`),
  KEY `category_index` (`category_id`),
  KEY `name` (`name`),
  KEY `is_active` (`is_active`),
  KEY `product_order` (`product_order`),
  KEY `VATRate_id` (`VATRate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_products_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_products_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_products_test`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_products_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` char(255) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `size` varchar(55) NOT NULL,
  `product_order` int(11) DEFAULT NULL,
  `um` varchar(55) NOT NULL,
  `cost` decimal(25,2) DEFAULT NULL,
  `price` decimal(25,2) NOT NULL,
  `alert_quantity` int(11) NOT NULL DEFAULT '20',
  `show_on_website` varchar(4) DEFAULT 'No',
  `image` varchar(255) DEFAULT 'no_image.jpg',
  `category_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT '0',
  `note` text,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `Description` varchar(255) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `category_custom_id` int(11) NOT NULL,
  `PriceListGroup_id` int(11) NOT NULL,
  `VATRate_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `old_barcode` varchar(50) NOT NULL,
  `max_level` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `product_points` int(11) NOT NULL,
  `open_sale` int(11) NOT NULL,
  `new_imported` int(11) NOT NULL,
  `sage_nominal_code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_purchase_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_purchase_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(25,2) NOT NULL,
  `tax_amount` decimal(25,2) DEFAULT NULL,
  `gross_total` decimal(25,2) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_purchases`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(55) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(55) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(1000) NOT NULL,
  `total` decimal(25,2) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_quote_preview`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_quote_preview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quote_id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `distribution_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `url` varchar(255) NOT NULL,
  `form_data` text,
  `comments` text CHARACTER SET utf8 NOT NULL,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_quotes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_quotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `guid` text NOT NULL,
  `booking_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `total` decimal(18,2) NOT NULL,
  `occupier` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `customer_id` (`customer_id`),
  KEY `location_id` (`location_id`),
  KEY `occupier` (`occupier`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_quotes_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_quotes_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quote_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL,
  `product_code` varchar(55) CHARACTER SET utf8 DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `product_unit` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(18,2) NOT NULL,
  `qty` int(11) NOT NULL,
  `sold_by` int(11) DEFAULT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quote_id` (`quote_id`),
  KEY `product_id` (`product_id`),
  KEY `service_id` (`service_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_rolls`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_rolls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lot_id` int(11) DEFAULT NULL,
  `lot_reference_no` varchar(250) DEFAULT NULL,
  `color` varchar(250) DEFAULT NULL,
  `weight` varchar(250) DEFAULT NULL,
  `meters` varchar(250) DEFAULT NULL,
  `fabric` int(11) DEFAULT NULL,
  `rolls` int(11) DEFAULT NULL,
  `product_code` varchar(300) DEFAULT NULL,
  `note` text,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sale_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sale_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(55) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_unit` varchar(50) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `tax` varchar(55) NOT NULL,
  `quantity` float NOT NULL,
  `unit_price` decimal(25,2) NOT NULL,
  `gross_total` decimal(25,2) NOT NULL,
  `val_tax` decimal(25,2) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `staff_purchase` tinyint(4) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `custom_id` int(11) NOT NULL,
  `sale_custom_id` bigint(20) NOT NULL,
  `contact_custom_id` int(11) NOT NULL,
  `product_custom_id` int(11) NOT NULL,
  `Practitioner_id` int(11) NOT NULL,
  `Threatment_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `VAT_id` int(11) NOT NULL,
  `LineDiscount` decimal(25,2) NOT NULL,
  `imported` int(11) NOT NULL,
  `UnitDiscount` decimal(25,2) NOT NULL,
  `discount_reason` varchar(255) DEFAULT NULL,
  `product_category_id` int(11) DEFAULT NULL,
  `product_category_name` varchar(255) DEFAULT NULL,
  `product_category_type` varchar(255) DEFAULT NULL,
  `from_pos` int(11) NOT NULL,
  `tax_total` decimal(18,3) NOT NULL,
  `custom_product_name` varchar(255) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_index` (`product_id`),
  KEY `sale_id_index` (`sale_id`),
  KEY `uid_index` (`uid`),
  KEY `created_date_index` (`created_date`),
  KEY `product_name` (`product_name`),
  KEY `custom_id` (`custom_id`),
  KEY `sale_custom_id_index` (`sale_custom_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sale_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sale_notes` (
  `inv_sale_id` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`inv_sale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sale_refund_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sale_refund_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(55) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_unit` varchar(50) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `tax` varchar(55) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(25,2) NOT NULL,
  `gross_total` decimal(25,2) NOT NULL,
  `val_tax` decimal(25,2) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(55) NOT NULL,
  `warehouse_id` int(11) DEFAULT NULL,
  `biller_id` int(11) NOT NULL,
  `biller_name` varchar(55) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `inv_total` decimal(25,2) NOT NULL,
  `total_tax` decimal(25,2) NOT NULL,
  `total` decimal(25,2) NOT NULL,
  `paid_amount` decimal(25,2) DEFAULT NULL,
  `store_discount` decimal(25,2) DEFAULT NULL,
  `discount_amount` decimal(25,2) NOT NULL DEFAULT '0.00',
  `account_amount` decimal(25,2) DEFAULT NULL,
  `loyalty_card_num` varchar(100) DEFAULT NULL,
  `loyalty_card_amount` varchar(100) DEFAULT NULL,
  `voucher_no` varchar(150) DEFAULT NULL,
  `voucher_amount` decimal(25,2) DEFAULT NULL,
  `invoice_type` int(11) NOT NULL,
  `in_type` varchar(55) NOT NULL,
  `total_tax2` decimal(25,2) NOT NULL,
  `tax_rate2_id` int(11) NOT NULL,
  `shipping_rate` decimal(18,2) NOT NULL,
  `shipping_rate_id` int(11) NOT NULL,
  `delivery` tinyint(4) DEFAULT '0',
  `delivery_date` datetime DEFAULT NULL,
  `by_email` tinyint(4) DEFAULT '0',
  `by_sms` tinyint(4) DEFAULT '0',
  `tip` decimal(25,2) DEFAULT '0.00',
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `paid_by` varchar(55) DEFAULT NULL,
  `booking_id` int(11) NOT NULL,
  `quaser_booking_id` int(11) NOT NULL COMMENT 'DEPOSIT ID',
  `invoice_bit` int(11) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `contact_custom_id` varchar(50) NOT NULL,
  `Practitioner_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Treatment_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `VAT_drop` decimal(25,2) NOT NULL,
  `order_id` int(11) DEFAULT '0',
  `void` tinyint(1) NOT NULL DEFAULT '0',
  `guid` varchar(100) DEFAULT NULL,
  `old_paid_by` varchar(100) NOT NULL,
  `loyalty_points` int(11) NOT NULL,
  `xero_invoice_id` varchar(255) NOT NULL,
  `xero_updated_date` datetime NOT NULL,
  `split_count` int(11) NOT NULL DEFAULT '1',
  `split_guid` varchar(100) NOT NULL,
  `insurer_contract_id` int(11) NOT NULL DEFAULT '0',
  `lock_sale` tinyint(4) NOT NULL,
  `location_id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  `is_ok` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'flagged transactions',
  `refund_to` int(11) NOT NULL,
  `credit_ref_id` int(11) NOT NULL DEFAULT '0',
  `credit_amount` decimal(25,2) NOT NULL,
  `credit_type` int(11) NOT NULL DEFAULT '0',
  `issuer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_date_index` (`created_date`),
  KEY `customer_id` (`customer_id`),
  KEY `biller_id_index` (`biller_id`),
  KEY `warehouse_id_index` (`warehouse_id`),
  KEY `custom_id` (`custom_id`),
  KEY `contact_custom_id` (`contact_custom_id`),
  KEY `guid` (`guid`),
  KEY `booking_id` (`booking_id`),
  KEY `paid_by` (`paid_by`),
  KEY `occupier` (`occupier`),
  KEY `date` (`date`),
  KEY `order_id` (`order_id`),
  KEY `uid` (`uid`),
  KEY `occupier_2` (`occupier`,`date`),
  KEY `insurer_contract_id` (`insurer_contract_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales_audit`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales_audit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(100) NOT NULL,
  `guid` varchar(255) DEFAULT NULL,
  `sale_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `date_deleted` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales_import`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales_import` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `imported` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `biller_name` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(18,2) NOT NULL,
  `reference_no` varchar(255) NOT NULL,
  `custom_contact_id` varchar(50) NOT NULL,
  `unit_price` varchar(255) NOT NULL,
  `custom_practitioner_id` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `val_tax` decimal(18,2) NOT NULL,
  `discount` decimal(20,2) NOT NULL,
  `custom_id2` int(11) NOT NULL,
  `custom_category_name` varchar(255) NOT NULL,
  `payed_amount` decimal(18,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  `note` text NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `custom_clinic_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `invoice_due` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `biller_name` (`biller_name`),
  KEY `customer_name` (`customer_name`),
  KEY `custom_id` (`custom_id`),
  KEY `custom_contact_id` (`custom_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales_import_eclinic`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales_import_eclinic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales_part_pay`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales_part_pay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `amount` decimal(25,2) DEFAULT NULL,
  `order_id` int(11) DEFAULT '0',
  `occupier` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `inv_sales_part_pay_sales_id_index` (`sales_id`),
  KEY `occupier` (`occupier`),
  KEY `order_id` (`order_id`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales_refund`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales_refund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(55) NOT NULL,
  `warehouse_id` int(11) DEFAULT NULL,
  `biller_id` int(11) NOT NULL,
  `biller_name` varchar(55) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(55) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `refund_note` text,
  `inv_total` decimal(25,2) NOT NULL,
  `total_tax` decimal(25,2) NOT NULL,
  `total` decimal(25,2) NOT NULL,
  `paid_amount` decimal(25,2) DEFAULT NULL,
  `store_discount` decimal(25,2) DEFAULT NULL,
  `discount_amount` varchar(25) DEFAULT NULL,
  `account_amount` decimal(25,2) DEFAULT NULL,
  `loyalty_card_num` varchar(100) DEFAULT NULL,
  `loyalty_card_amount` varchar(100) DEFAULT NULL,
  `voucher_no` varchar(150) DEFAULT NULL,
  `voucher_amount` decimal(25,2) DEFAULT NULL,
  `invoice_type` int(11) NOT NULL,
  `in_type` varchar(55) NOT NULL,
  `total_tax2` decimal(25,2) NOT NULL,
  `tax_rate2_id` int(11) NOT NULL,
  `shipping_rate` decimal(18,2) DEFAULT NULL,
  `shipping_rate_id` int(11) DEFAULT NULL,
  `delivery` tinyint(4) DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `tip` decimal(25,2) DEFAULT '0.00',
  `by_email` tinyint(4) DEFAULT NULL,
  `by_sms` tinyint(4) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `paid_by` varchar(55) DEFAULT NULL,
  `refund_by` int(11) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_sales_refund_product`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_sales_refund_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_refund_item_id` int(11) DEFAULT NULL,
  `refund_amount` decimal(25,2) DEFAULT NULL,
  `qty` varchar(35) DEFAULT NULL,
  `note` text,
  `payment_mode` varchar(50) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_settings` (
  `setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) NOT NULL,
  `site_name` varchar(55) NOT NULL,
  `language` varchar(20) NOT NULL,
  `default_warehouse` int(2) NOT NULL,
  `currency_prefix` varchar(3) NOT NULL,
  `default_invoice_type` int(2) NOT NULL,
  `default_tax_rate` int(2) NOT NULL,
  `rows_per_page` int(2) NOT NULL,
  `no_of_rows` int(2) NOT NULL,
  `total_rows` int(2) NOT NULL,
  `order_by` tinyint(4) DEFAULT '1',
  `product_order_by` tinyint(4) DEFAULT '1',
  `version` varchar(5) NOT NULL DEFAULT '1.2',
  `default_tax_rate2` int(11) NOT NULL DEFAULT '0',
  `calculate_vat` varchar(5) DEFAULT NULL,
  `vat` varchar(50) DEFAULT '20',
  `tab_print` varchar(4) DEFAULT NULL,
  `tip` tinyint(4) DEFAULT '0',
  `unpaid_invoice` tinyint(4) DEFAULT '0',
  `redirect_url` varchar(300) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `enable_taxes` int(11) NOT NULL,
  `enable_online_payment` int(11) NOT NULL,
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_shipping_rates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_shipping_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `rate` decimal(4,2) NOT NULL,
  `type` varchar(50) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_split_sale`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_split_sale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `biller_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_tax_rates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_tax_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `rate` decimal(8,2) NOT NULL,
  `type` varchar(50) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `is_active` int(2) NOT NULL,
  `description` text NOT NULL,
  `date_constrained` tinyint(1) NOT NULL DEFAULT '0',
  `start_date` int(11) NOT NULL,
  `end_date` int(11) NOT NULL,
  `show_on_receipt` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_warehouses`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_warehouses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(55) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_warehouses_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_warehouses_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `expiry_date` date NOT NULL,
  `batch_code` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `occupier` (`occupier`),
  KEY `location_id` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inventory_count`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `date_started` int(15) NOT NULL,
  `date_committed` int(11) NOT NULL,
  `date_completed` int(11) NOT NULL,
  `notes` text NOT NULL,
  `count_type` varchar(20) NOT NULL,
  `count_name` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `counting_categories` text NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inventory_discrepancy`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_discrepancy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `overage` varchar(11) NOT NULL,
  `shortage` varchar(11) NOT NULL,
  `count_id` int(11) NOT NULL,
  `draft` int(11) NOT NULL DEFAULT '0',
  `counted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoice_companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `payable_to` text NOT NULL,
  `logo` varchar(255) NOT NULL,
  `company_details` text NOT NULL,
  `larger_logo` varchar(200) NOT NULL,
  `branch_location_id` int(11) NOT NULL,
  `logo_position` varchar(10) NOT NULL DEFAULT 'left',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoice_dist_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_dist_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL,
  `dist_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `tax` int(11) DEFAULT '0',
  `fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `occupier` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoice_distributions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_distributions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `description` text,
  `allow_edit` tinyint(4) NOT NULL DEFAULT '0',
  `set_as_default` tinyint(4) NOT NULL DEFAULT '0',
  `occupier` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoice_distributions_sub_cat`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_distributions_sub_cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `distribution_id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `description` text,
  `occupier` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoice_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` tinyint(4) DEFAULT '1',
  `description` varchar(200) CHARACTER SET utf8 NOT NULL,
  `style` longtext CHARACTER SET utf8 NOT NULL,
  `activity` longtext CHARACTER SET utf8 NOT NULL,
  `appearance` longtext CHARACTER SET utf8 NOT NULL,
  `payment_information` longtext CHARACTER SET utf8 NOT NULL,
  `header` longtext CHARACTER SET utf8 NOT NULL,
  `footer` longtext CHARACTER SET utf8 NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `occupier` int(11) NOT NULL,
  `stripe_button` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invoices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `client_phone` varchar(255) NOT NULL,
  `client_address` text NOT NULL,
  `client_location` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `vat` int(11) NOT NULL,
  `total` varchar(32) NOT NULL,
  `currency` varchar(32) NOT NULL,
  `date` int(11) NOT NULL,
  `occupier` varchar(255) NOT NULL,
  `ref` int(11) NOT NULL,
  `due_date` varchar(100) NOT NULL,
  `deposit` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_admission`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_admission` (
  `id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL DEFAULT '0',
  `contact_id` int(11) NOT NULL,
  `bed_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `admitted_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_bed_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_bed_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `floor_id` int(11) DEFAULT '0' COMMENT 'ip_floors.id',
  `location_id` int(11) NOT NULL DEFAULT '0',
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `rmo_uid` int(11) NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bed_type` (`name`(191)),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_beds`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_beds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bed_name` varchar(50) NOT NULL,
  `location_id` varchar(100) NOT NULL,
  `room_id` int(11) NOT NULL,
  `bed_type_id` int(11) NOT NULL DEFAULT '0',
  `speciality_ids` int(11) NOT NULL DEFAULT '0',
  `company_id` int(11) NOT NULL,
  `description` text,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_bookings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL DEFAULT '0',
  `code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `patient_id` int(11) NOT NULL,
  `eoc_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `duration` tinyint(4) NOT NULL,
  `until` time NOT NULL DEFAULT '00:00:00',
  `admitted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `discharced_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `location_id` int(11) NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('waiting','arrived','admitted','discharged') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'waiting',
  `observation_frq` tinyint(4) NOT NULL,
  `contract_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `patient_id` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_crisis_mgmt_config`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_crisis_mgmt_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL COMMENT 'medical_form.id',
  `score` smallint(4) NOT NULL,
  `response_label` varchar(150) DEFAULT NULL,
  `answer` text,
  `frequency` smallint(4) NOT NULL DEFAULT '0',
  `color` varchar(7) DEFAULT NULL,
  `escalation` tinyint(4) NOT NULL DEFAULT '0',
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mid` (`mid`),
  KEY `company_id` (`company_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_floor_plan`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_floor_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `floor_id` int(11) NOT NULL,
  `bed_id` int(11) NOT NULL,
  `plan_info` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_floors`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_floors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `floor_url` varchar(500) NOT NULL,
  `floor_thumbnail` varchar(500) NOT NULL,
  `company_id` int(11) NOT NULL,
  `floor_order` int(111) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_hits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_hits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `hits` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_patient_configuration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_patient_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `observation_form_id` int(11) NOT NULL,
  `admission_form_id` int(2) NOT NULL,
  `discharge_form_id` int(11) NOT NULL,
  `handover_form_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_procedure_booked`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_procedure_booked` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `procedure_id` int(11) NOT NULL COMMENT 'ip_service_procedure.id',
  `salon_booking_id` int(11) NOT NULL,
  `ip_booking_id` int(11) NOT NULL COMMENT 'ip_bookings.id',
  `site` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `laterality` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `note` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `salon_booking_id` (`salon_booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_procedure_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_procedure_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` text,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_service_procedure`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_service_procedure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL COMMENT 'company_services.id',
  `name` varchar(250) NOT NULL,
  `sites` varchar(250) DEFAULT NULL,
  `external_code` varchar(250) DEFAULT NULL,
  `notes` text,
  `procedure_group_id` int(11) DEFAULT '0' COMMENT 'ip_procedure_groups.id',
  `modality_type` varchar(250) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_specialities`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_specialities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_specialities_members`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ip_specialities_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `specialities_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `specialities_id` (`specialities_id`),
  KEY `member_id` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ipaddress_vote_map`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ipaddress_vote_map` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `voting_id` int(8) NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `vote_rank` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `isc`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `isc` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` char(8) NOT NULL,
  `description` text NOT NULL,
  `chapter` char(64) NOT NULL,
  `category` char(64) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `gender` enum('Both','Female','Male','') NOT NULL DEFAULT 'Both',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `chapter` (`chapter`,`category`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='[JC] Healthcode Integration: ISC code database';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issuing_companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issuing_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `abbreviation` varchar(16) NOT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postcode` varchar(50) NOT NULL,
  `website` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `vat_registered` varchar(191) NOT NULL DEFAULT '0',
  `invoice_template_id` int(191) NOT NULL DEFAULT '0',
  `custom_id` int(11) NOT NULL,
  `invoice_prefix` varchar(10) DEFAULT NULL,
  `invoice_starting_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `iza_appt_matcher`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iza_appt_matcher` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `appt_id` int(11) NOT NULL,
  `fixed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `iza_credit_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iza_credit_notes` (
  `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_price` float NOT NULL,
  `comments` text NOT NULL,
  `raised_by_invoice_id` int(11) NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_configuration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `about_us` text NOT NULL,
  `color_scheme` varchar(8) NOT NULL,
  `opening_blurb` varchar(255) NOT NULL,
  `page_title` varchar(200) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postal` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `cover_letter` varchar(20) NOT NULL,
  `resume` varchar(20) NOT NULL,
  `date_available` varchar(50) NOT NULL,
  `linkedin` varchar(200) NOT NULL,
  `reference` varchar(200) NOT NULL,
  `how_did_hear` varchar(200) NOT NULL,
  `who_referred` varchar(200) NOT NULL,
  `default_reply` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_openings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_openings` (
  `openingid` int(11) NOT NULL AUTO_INCREMENT,
  `opening_title` varchar(200) NOT NULL,
  `hiring_manager` varchar(200) NOT NULL,
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `status` varchar(200) NOT NULL,
  `published` int(20) NOT NULL,
  `occupier` int(255) NOT NULL,
  `description` text NOT NULL,
  `attached_forms` int(255) NOT NULL,
  `created_date` varchar(100) NOT NULL,
  PRIMARY KEY (`openingid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_status`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = In Progress; 1= Hired; 2= Not Hired',
  `order` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` date NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `closing_date` date NOT NULL,
  `opening_title` varchar(100) NOT NULL,
  `job_location` varchar(100) NOT NULL,
  `what_you_do` text NOT NULL,
  `is_closed` int(11) NOT NULL COMMENT '0=Open;1=Closed',
  `department` varchar(50) NOT NULL,
  `job_country` varchar(50) NOT NULL,
  `opening_job_blurb` text NOT NULL,
  `employment_type` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  `experience` varchar(20) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jw_aesthetic_contacts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jw_aesthetic_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `patient_no` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `kp_setting`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kp_setting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `fixed_cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_product_template`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_product_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` text NOT NULL,
  `code` varchar(10) NOT NULL,
  `sample_reqs` varchar(100) NOT NULL,
  `tat` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_request_delivery_result`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_request_delivery_result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lab_requests_id` int(11) NOT NULL COMMENT 'lab_requests.id',
  `result_status` tinyint(4) NOT NULL DEFAULT '0',
  `message` text,
  `delivery_type` varchar(10) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `lab_requests_id` (`lab_requests_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_request_inbound`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_request_inbound` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `lab_request_id` int(11) NOT NULL,
  `email_from` varchar(100) NOT NULL,
  `pending_review` int(11) NOT NULL COMMENT '0=Waiting; 1=Matched; 2= No Match; 3= Duplicate',
  `email_subject` varchar(100) NOT NULL,
  `attachment_name` varchar(50) NOT NULL,
  `received_date` datetime NOT NULL,
  `attachment_url` varchar(255) NOT NULL,
  `matched_on` int(2) NOT NULL COMMENT '1= Id 2= Name; 3 = Manual',
  `channel` int(2) NOT NULL COMMENT '0 = Email; 1 = Upload',
  `matched_by_id` int(11) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  `tdl_response` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`,`lab_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_request_result_followup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_request_result_followup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_id` int(11) NOT NULL COMMENT 'lab_request_delivery_result.id',
  `lab_request_id` int(11) NOT NULL DEFAULT '0',
  `company_id` int(11) NOT NULL DEFAULT '0',
  `type` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `delivery_id` (`delivery_id`),
  KEY `company_id` (`company_id`),
  KEY `lab_request_id` (`lab_request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_requests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `request_date` date NOT NULL,
  `last_update` date NOT NULL,
  `request_by_id` int(11) NOT NULL,
  `request_status` int(11) NOT NULL COMMENT '-1 = Cancel; -2= Processing; 0 = Requested; 1 = Received; 2=Sent; 3 Reviewed;',
  `request_lab_id` varchar(20) NOT NULL COMMENT 'This is a random 10 digit number generated by the inserter',
  `lab_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL COMMENT 'This is the ID from medical_form_contact',
  `received_id` int(11) NOT NULL COMMENT 'the contact_attachment ID',
  `communication_id` int(11) NOT NULL COMMENT 'This is the communication log ID',
  `send_result` text,
  `receive_result` mediumtext,
  `receive_raw` longtext COMMENT 'base64 encoded version of the raw hl7 file',
  `receive_date` datetime NOT NULL,
  `sent_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_requests_pref_delivery`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_requests_pref_delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lab_requests_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lab_test_comment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_test_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` varchar(100) NOT NULL,
  `high_comment` text NOT NULL,
  `low_comment` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `label_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `label_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `column_count` int(11) NOT NULL,
  `row_count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `labs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `is_active` int(11) NOT NULL,
  `lab_name` varchar(30) NOT NULL,
  `lab_email` varchar(40) NOT NULL,
  `lab_street` varchar(50) NOT NULL,
  `lab_street2` varchar(100) NOT NULL,
  `lab_city` varchar(20) NOT NULL,
  `lab_county` varchar(50) NOT NULL,
  `lab_postal` varchar(20) NOT NULL,
  `lab_phone` varchar(20) NOT NULL,
  `lab_provider_no` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `latest_information`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `latest_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `entry_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_attachment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(50) NOT NULL,
  `lead_id` int(50) NOT NULL,
  `date` int(100) NOT NULL COMMENT 'unix timestamp',
  `linkref` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_capture_automated`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_capture_automated` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_field` int(11) NOT NULL,
  `capture_form_id` int(11) NOT NULL,
  `from_email` varchar(100) NOT NULL,
  `template_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_capture_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_capture_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lead_capture_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `home_phone` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `post_code` varchar(10) NOT NULL,
  `company_id` int(11) NOT NULL,
  `how_heard` int(11) NOT NULL,
  `dob` varchar(100) NOT NULL,
  `custom_dropdown` varchar(100) NOT NULL,
  `custom_textarea` varchar(200) NOT NULL,
  `custom_date` varchar(20) NOT NULL,
  `yesorno` varchar(100) NOT NULL,
  `custom_textfield` varchar(100) NOT NULL,
  `custom_textfield2` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_capture_id` (`lead_capture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_capture_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_capture_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `capture_name` varchar(100) NOT NULL,
  `page_title` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `background_image` varchar(200) NOT NULL,
  `header1` varchar(100) NOT NULL,
  `sub_heading` text NOT NULL,
  `submission_counts` bigint(200) NOT NULL,
  `impression_counts` bigint(100) NOT NULL,
  `right_description` varchar(100) NOT NULL,
  `thanks_message` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `from_email` varchar(250) NOT NULL,
  `message_id` int(11) NOT NULL,
  `to_email` varchar(130) NOT NULL,
  `facebook_url` varchar(255) NOT NULL,
  `twitter_url` varchar(255) NOT NULL,
  `back_button_url` varchar(255) NOT NULL,
  `top_header` int(11) NOT NULL,
  `redirect_link` varchar(255) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `top_header_color` varchar(10) NOT NULL,
  `gym_pass` int(11) NOT NULL,
  `default_rating` varchar(50) NOT NULL,
  `default_lead_status` varchar(50) NOT NULL,
  `from_subject` varchar(50) NOT NULL,
  `client_email` int(11) NOT NULL,
  `from_email_message` text NOT NULL,
  `disable_lead_creation` int(11) NOT NULL,
  `disable_duplicates` int(11) NOT NULL,
  `disable_spam_filter` int(11) NOT NULL,
  `send_business_sms` int(2) NOT NULL,
  `send_business_sms_to` varchar(15) NOT NULL,
  `google_tracking_code` text NOT NULL,
  `send_business_sms_to_2` varchar(15) NOT NULL,
  `send_business_sms_to_3` varchar(100) NOT NULL,
  `auto_assign_id` int(11) NOT NULL COMMENT 'the id of the user to assign to',
  `junk_numbers` int(11) NOT NULL,
  `junk_long_text` int(11) NOT NULL,
  `photo_uploader_hits` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_dropdown_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_dropdown_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `capture_id` int(11) NOT NULL,
  `price_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_scoring_acitivity_mode_code`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_scoring_acitivity_mode_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_mode` varchar(255) NOT NULL,
  `code` text NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_scoring_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_scoring_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `code_name` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `activity_mode` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `user_added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_status`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `status_name` varchar(50) NOT NULL,
  `status_order` int(11) NOT NULL,
  `email_template_id` int(11) NOT NULL,
  `email_template_from` varchar(255) NOT NULL,
  `is_default` int(11) NOT NULL,
  `is_convert` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_status_array`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_status_array` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_status_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_status_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_id` int(11) NOT NULL,
  `keyword` varchar(100) NOT NULL,
  `template_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_tracking`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_tracking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `ip_address` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_tracking_activities`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_tracking_activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `page_url` text NOT NULL,
  `ip_address` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `description` text NOT NULL,
  `lead_id` int(11) NOT NULL,
  `date_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lead_id` (`lead_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_trigger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trigger_name` varchar(100) NOT NULL,
  `field_id` int(11) NOT NULL,
  `field_value` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL,
  `assigned_to_1` int(11) NOT NULL,
  `assigned_to_2` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `round_robin` tinyint(4) NOT NULL DEFAULT '0',
  `source_id` int(11) NOT NULL,
  `postcode` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lead_views`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lead_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `view_name` varchar(100) NOT NULL,
  `view_data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `letter_queue`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `letter_queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `letter_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `letter_to_id` int(11) NOT NULL,
  `communication_id` int(11) NOT NULL,
  `status` int(2) NOT NULL COMMENT '0=Pending; 1=Printed; 2=Sent; 3=Pending Review; 4 = Approved',
  `queued_by_id` int(11) NOT NULL,
  `printed_by_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `printed_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `letter_recipient_data`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `letter_recipient_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `communication_id` int(11) NOT NULL,
  `recipient_data` varchar(150) DEFAULT NULL,
  `letter_body` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `invoice_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `letter_saved_merge_tags`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `letter_saved_merge_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `communication_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `merge_tags` text,
  `merge_tags_val` text,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levels_indicator`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levels_indicator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `indicator_id` int(11) DEFAULT '0',
  `level` varchar(50) DEFAULT NULL,
  `level_value` varchar(500) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `indicator_id_2` (`indicator_id`,`level`,`occupier`),
  KEY `indicator_id` (`indicator_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lms_credit_balance_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_credit_balance_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `referral_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `cashable` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_master` (
  `loc_id` int(100) NOT NULL AUTO_INCREMENT,
  `loc_comp_id` int(100) DEFAULT NULL,
  `loc_name` varchar(256) DEFAULT NULL,
  `loc_date` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`loc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location_service_price`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_service_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) NOT NULL DEFAULT '0',
  `service_id` int(11) NOT NULL DEFAULT '0',
  `price` decimal(25,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `foreign` (`location_id`,`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `log_call`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_call` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(550) DEFAULT NULL,
  `call_type` tinyint(4) DEFAULT NULL,
  `call_purpose` int(11) DEFAULT NULL,
  `call_from_or_to` tinyint(4) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `related_to` int(11) DEFAULT NULL,
  `reminder_id` int(11) NOT NULL DEFAULT '0' COMMENT 'metro_reminder table id',
  `related_to_text` varchar(500) DEFAULT NULL,
  `call_detail_type` tinyint(4) DEFAULT NULL,
  `call_start_date` date DEFAULT NULL,
  `call_time_hour` tinyint(4) DEFAULT NULL,
  `call_time_min` tinyint(4) DEFAULT NULL,
  `call_time_format` tinyint(4) DEFAULT NULL,
  `call_duration_hr` int(11) DEFAULT '0',
  `call_duration_min` int(11) DEFAULT '0',
  `call_duration_sec` int(11) DEFAULT '0',
  `description` text,
  `billable` bit(1) DEFAULT NULL,
  `call_result` varchar(500) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `site_section` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_attempts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `last_attempt` datetime NOT NULL,
  `count` varchar(191) NOT NULL,
  `phone_attempt_count` int(11) NOT NULL,
  `client_ip` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `USERNAME` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `login_datetime` datetime NOT NULL,
  `logout_datetime` datetime NOT NULL,
  `ip_address` varchar(100) NOT NULL,
  `is_mobile` int(11) NOT NULL,
  `user_agent` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_backend`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_backend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `logo_image` text NOT NULL,
  `page_title` text NOT NULL,
  `tab1_title` text NOT NULL,
  `tab2_title` text NOT NULL,
  `tab3_title` text NOT NULL,
  `tab4_title` text NOT NULL,
  `tab5_title` text NOT NULL,
  `tab1_content` text CHARACTER SET utf8 NOT NULL,
  `tab2_content` text NOT NULL,
  `tab3_content` text NOT NULL,
  `tab4_content` text NOT NULL,
  `tab5_content` text NOT NULL,
  `privacy_policy` text NOT NULL,
  `terms_and_conditions` text NOT NULL,
  `faq` text NOT NULL,
  `cookies` text NOT NULL,
  `bg_color` varchar(100) NOT NULL,
  `bt_bg_color` varchar(100) NOT NULL,
  `foot_bg_color` varchar(100) NOT NULL,
  `main_bg_color` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_campaign`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_campaign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_name` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `type` enum('LOYALTY','AMBASSADOR') NOT NULL DEFAULT 'LOYALTY',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_definitions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_definitions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promotion_type` varchar(50) NOT NULL,
  `promotion_description` text NOT NULL,
  `sub_description` varchar(100) NOT NULL,
  `promotion_name` varchar(100) NOT NULL,
  `disabled` int(11) NOT NULL,
  `type` enum('LOYALTY','AMBASSADOR') NOT NULL DEFAULT 'LOYALTY',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `amount` decimal(25,2) NOT NULL,
  `promotion_type` varchar(60) NOT NULL,
  `sale_id` int(11) NOT NULL COMMENT '(Where applicable)',
  `date` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `contact_id` (`contact_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_point_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_point_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `points_value` decimal(8,3) NOT NULL,
  `show_on_receipt` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_points`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `points` decimal(25,2) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_promotion`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_promotion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `promotion_type` varchar(100) NOT NULL,
  `start_date` int(11) NOT NULL,
  `end_date` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `is_active` int(11) NOT NULL,
  `custom_amount` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_rewards`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_rewards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` enum('POINTS','PRODUCT') NOT NULL DEFAULT 'PRODUCT',
  `amount` int(11) NOT NULL,
  `package_id` int(11) NOT NULL COMMENT 'or number of points if type is points',
  `repeat` tinyint(1) NOT NULL,
  `repeat_every` int(11) NOT NULL,
  `email_template` int(11) NOT NULL,
  `sms_template` int(11) NOT NULL,
  `sms_sender` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loyalty_rewards_awards`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyalty_rewards_awards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `date_awarded` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mailchimp_api`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mailchimp_api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `api_key` varchar(100) NOT NULL,
  `email_type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `autosync_list` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manage_bills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage_bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(350) DEFAULT NULL,
  `biller_id` int(11) DEFAULT NULL,
  `biller_name` varchar(350) DEFAULT NULL,
  `count` int(11) NOT NULL,
  `tax1` float(25,2) NOT NULL,
  `tax2` float(25,2) NOT NULL,
  `total` float(25,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manage_custom_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage_custom_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_label` text CHARACTER SET utf8,
  `field_type` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `location_id` int(15) NOT NULL DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `treatment_interest` int(11) NOT NULL,
  `show_in_leads` tinyint(4) NOT NULL,
  `field_for` enum('CONTACT','LEAD','CONTACTLEAD','PRODUCT','SERVICE','APPOINTMENT','STAFF','INVOICE','PAYMENT','ROTA','NOTE','INSURANCE','STAGE','CONSUMABLEINJECTABLES','LOCATION') CHARACTER SET utf8 NOT NULL,
  `flagged` tinyint(1) NOT NULL,
  `is_required` tinyint(4) NOT NULL,
  `disable_app` int(11) NOT NULL DEFAULT '1',
  `is_active` int(5) NOT NULL DEFAULT '1',
  `field_order` tinyint(4) NOT NULL DEFAULT '125',
  `display_in_invoice` tinyint(4) NOT NULL DEFAULT '0',
  `default_in_reports` tinyint(4) NOT NULL DEFAULT '0',
  `category_id` int(11) NOT NULL,
  `in_cc_toolbar` tinyint(1) NOT NULL DEFAULT '0',
  `favorite` tinyint(1) NOT NULL DEFAULT '0',
  `show_in_cal` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manage_custom_fields_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage_custom_fields_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manage_custom_fields_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage_custom_fields_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `item_label` varchar(255) NOT NULL,
  `item_value` varchar(255) NOT NULL,
  `item_order` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manage_fields_order`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage_fields_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` int(11) NOT NULL,
  `field_name` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `order_id` int(11) NOT NULL,
  `pinned` int(11) NOT NULL,
  `is_more` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `occupier` (`occupier`),
  KEY `pinned` (`pinned`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manage_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suspend_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(55) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_unit` varchar(50) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `tax` varchar(55) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(25,2) NOT NULL,
  `gross_total` decimal(25,2) NOT NULL,
  `val_tax` decimal(25,2) NOT NULL,
  `staff_purchase` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `marketing_sources`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marketing_sources` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `source_name` varchar(100) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `public` int(11) NOT NULL,
  `imported` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `public` (`public`),
  KEY `source_name` (`source_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `media_library_attachments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media_library_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `communication_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'communication_log.id',
  `medical_form_contact_id` int(11) NOT NULL DEFAULT '0',
  `contact_attachment_id` int(11) NOT NULL DEFAULT '0',
  `sales_id` int(11) NOT NULL DEFAULT '0',
  `statement_id` int(11) NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `contact_id` (`contact_id`),
  KEY `communication_id` (`communication_id`) USING BTREE,
  KEY `medical_form_contact_id` (`medical_form_contact_id`),
  KEY `contact_attachment_id` (`contact_attachment_id`),
  KEY `sales_id` (`sales_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_approval_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_approval_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `actioned_by` int(11) NOT NULL COMMENT 'person who changed the status',
  `path_taken_id` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `response` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0=Pending, 1=Accepted, 2=Declined',
  `requested_by` int(11) NOT NULL,
  `response_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_approval_notes_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_approval_notes_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medical_approval_id` int(11) NOT NULL COMMENT 'medical_approval_notes.id',
  `company_id` int(11) NOT NULL,
  `actioned_by` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0=Pending, 1=Accepted, 2=Declined',
  `response` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_attr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `occupier` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_contact_attr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_contact_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attr_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `value` text CHARACTER SET utf8,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `group_label` varchar(45) DEFAULT NULL,
  `medical_form_contact_id` int(11) DEFAULT NULL,
  `attachment_size` decimal(18,2) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient` (`contact_id`),
  KEY `medical_form_contact_id` (`medical_form_contact_id`),
  KEY `attr_id` (`attr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_contra`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_contra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_enabled` tinyint(4) NOT NULL,
  `condition` varchar(32) NOT NULL,
  `created_date` datetime NOT NULL,
  `contra_code` varchar(255) NOT NULL,
  `question_label` varchar(1024) NOT NULL,
  `question_answer` varchar(200) NOT NULL,
  `product_id` int(11) NOT NULL,
  `services_ids` varchar(511) NOT NULL,
  `form_id` int(11) NOT NULL,
  `age` int(3) NOT NULL,
  `medical_condition` varchar(511) NOT NULL,
  `contra_title` varchar(20) NOT NULL,
  `alert_text` varchar(255) NOT NULL,
  `prevent_forward` tinyint(4) NOT NULL,
  `custom_id` varchar(50) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_custom_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_custom_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `form_id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `medical_condition` tinyint(4) NOT NULL DEFAULT '0',
  `type` varchar(20) DEFAULT NULL,
  `active` tinyint(4) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_deleted` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `data` longtext,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `nhs_procedure_id` int(11) DEFAULT NULL,
  `locked` int(11) NOT NULL,
  `printout` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `user_created` int(11) NOT NULL,
  `encoded` int(11) NOT NULL,
  `form_type` varchar(100) NOT NULL,
  `service_id` varchar(1024) NOT NULL,
  `ipad_only` tinyint(4) DEFAULT '0',
  `heading_setting` tinyint(4) DEFAULT '0',
  `temp_static` int(11) NOT NULL,
  `old_data` longtext NOT NULL,
  `form_category` varchar(100) NOT NULL,
  `author` varchar(50) NOT NULL,
  `diagnosis_code` varchar(255) NOT NULL,
  `is_fav` int(2) NOT NULL,
  `diagnosis_code_enabled` int(11) NOT NULL,
  `lab_id` int(11) NOT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `form_type` (`form_type`),
  KEY `service_id` (`service_id`(767)),
  KEY `deleted_at` (`deleted_at`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_access`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `request_id` varchar(255) NOT NULL,
  `generated_code` int(11) NOT NULL,
  `expiry_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_contact`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `complete` tinyint(4) NOT NULL,
  `locked` int(11) NOT NULL,
  `user_created` int(11) NOT NULL,
  `user_updated` int(11) NOT NULL,
  `related_to` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `prescriber` int(11) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `pharmacy_id` int(11) NOT NULL,
  `form_status` int(5) NOT NULL,
  `comments` text,
  `urgent` tinyint(4) DEFAULT NULL,
  `imported` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `approved_triggers` text,
  `actioned_by` int(11) DEFAULT NULL,
  `form_contact_number` int(10) NOT NULL DEFAULT '0',
  `diagnosis_code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `form_id` (`form_id`),
  KEY `related_to` (`related_to`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_contact_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_contact_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(100) NOT NULL,
  `medical_form_contact_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `update_changes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_contact_restore`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_contact_restore` (
  `id` int(11) NOT NULL,
  `form_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `complete` tinyint(4) NOT NULL,
  `locked` int(11) NOT NULL,
  `user_created` int(11) NOT NULL,
  `user_updated` int(11) NOT NULL,
  `related_to` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `prescriber` int(11) NOT NULL,
  `priority` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `form_id` (`form_id`),
  KEY `related_to` (`related_to`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_epaper_images`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_epaper_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `linkhref` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `form_id` (`form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_pinned`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_pinned` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pinned` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_psfs_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_psfs_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) DEFAULT NULL,
  `psfs_start` tinyint(4) DEFAULT NULL,
  `interval_mode` tinyint(4) DEFAULT NULL,
  `interval_no` tinyint(4) DEFAULT NULL,
  `psfs_end` tinyint(4) DEFAULT NULL,
  `post_treatment_mode` tinyint(4) DEFAULT NULL,
  `post_treatment_no` tinyint(4) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_psfs_treat_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_psfs_treat_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) DEFAULT NULL,
  `post_interval_mode` tinyint(4) DEFAULT NULL,
  `post_interval_no` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `prescriptions_email_id` int(11) NOT NULL,
  `treatments_email_id` int(11) NOT NULL,
  `consents_email_id` int(11) NOT NULL,
  `col_drug_name` tinyint(1) NOT NULL DEFAULT '1',
  `col_drug_dose` tinyint(1) NOT NULL DEFAULT '1',
  `col_drug_units` tinyint(1) NOT NULL DEFAULT '1',
  `col_drug_freq` tinyint(1) NOT NULL DEFAULT '1',
  `col_drug_lot` tinyint(1) NOT NULL DEFAULT '0',
  `col_drug_exp` tinyint(1) NOT NULL DEFAULT '0',
  `col_drug_route` tinyint(1) NOT NULL DEFAULT '1',
  `col_drug_comm` tinyint(1) NOT NULL DEFAULT '1',
  `col_drug_name_label` varchar(50) NOT NULL DEFAULT 'Drug',
  `col_drug_dose_label` varchar(50) NOT NULL DEFAULT 'Dose',
  `col_drug_units_label` varchar(50) NOT NULL DEFAULT 'Units',
  `col_drug_freq_label` varchar(50) NOT NULL DEFAULT 'Freq',
  `col_drug_lot_label` varchar(50) NOT NULL DEFAULT 'Lot Num.',
  `col_drug_exp_label` varchar(50) NOT NULL DEFAULT 'Expiry Date',
  `col_drug_route_label` varchar(50) NOT NULL DEFAULT 'Route',
  `col_drug_comm_label` varchar(50) NOT NULL DEFAULT 'Comments',
  `delivery_address` text NOT NULL,
  `show_delivery_address` tinyint(1) NOT NULL,
  `headings_on_top` tinyint(1) NOT NULL DEFAULT '1',
  `presc_stat_text_ontop` tinyint(1) DEFAULT '1',
  `treatment_plan_email_id` int(11) NOT NULL,
  `prepopulate` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_special_instructions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_special_instructions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `instruction` text,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_theme_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_theme_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medical_form_id` int(11) DEFAULT NULL,
  `formHeadercolor` varchar(200) DEFAULT NULL,
  `formSectioncolor` varchar(200) DEFAULT NULL,
  `formCheckboxcolor` varchar(200) DEFAULT NULL,
  `formButtontext` varchar(200) DEFAULT NULL,
  `formButtoncolor` varchar(200) DEFAULT NULL,
  `formFontstyle` varchar(200) DEFAULT NULL,
  `formFontcolor` varchar(200) DEFAULT NULL,
  `formDropdowncolor` varchar(200) DEFAULT NULL,
  `formThankyoumsg` text,
  `formCompanylogo` tinyint(4) DEFAULT NULL,
  `formRedirecturl` varchar(300) DEFAULT NULL,
  `formBackgroundcolor` varchar(75) DEFAULT NULL,
  `formResultemail` text,
  `formnotriggers` text,
  `formsubmissiontrigger` text,
  `formformulaetrigger` int(11) DEFAULT '0',
  `formPullpreviousanswers` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_form_triggers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_form_triggers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trigger_name` varchar(500) DEFAULT NULL,
  `action` varchar(500) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `medical_triggers` varchar(500) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `form_status` tinyint(4) DEFAULT NULL,
  `form_email` text,
  `form_email_subject` varchar(500) DEFAULT NULL,
  `form_email_body` text,
  `form_alert_note` text,
  `form_task_name` varchar(500) DEFAULT NULL,
  `form_task_description` text,
  `form_assigned_to` int(11) DEFAULT NULL,
  `medical_form_prescriber` text,
  `form_task_priority` tinyint(4) DEFAULT NULL,
  `form_sms_no` text,
  `form_sms_body` text,
  `formulae_operation` tinyint(4) DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `medical_condition` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medical_forms_ios_data`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_forms_ios_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `form_id` int(11) DEFAULT NULL,
  `ref_name` varchar(200) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membership_app_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_app_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `membership_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membership_cards`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_cards` (
  `memberid` int(255) NOT NULL AUTO_INCREMENT,
  `details_id` int(255) NOT NULL,
  PRIMARY KEY (`memberid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membership_contact`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_contact` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contact_id` bigint(20) NOT NULL,
  `membership_id` bigint(20) NOT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `activation_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `LastUpdated` datetime NOT NULL,
  `suspended` tinyint(4) NOT NULL,
  `first_payment` double NOT NULL,
  `UID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membership_package`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_package` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `membership_id` bigint(20) NOT NULL,
  `package_id` bigint(20) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` double NOT NULL,
  `type` varchar(100) NOT NULL,
  `membership_total` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `memberships`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memberships` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `autopay_mode` varchar(100) NOT NULL,
  `payment_every` varchar(100) NOT NULL,
  `number_payments` int(11) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `description` text NOT NULL,
  `from_time` varchar(100) NOT NULL,
  `to_time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_templates` (
  `template_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `template_name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` longtext CHARACTER SET utf8 NOT NULL,
  `created_by` int(255) NOT NULL,
  `template_type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_changed_at` timestamp NULL DEFAULT NULL,
  `template_sub_type` int(11) NOT NULL,
  `template_sub_type_service` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `header` varchar(255) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `exclude_margins` int(11) NOT NULL,
  `template_group` varchar(50) NOT NULL DEFAULT 'general',
  `subtype_letter` varchar(255) NOT NULL,
  `word_template` varchar(255) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `folder_id` int(11) NOT NULL COMMENT 'This is id from template_folders.id',
  PRIMARY KEY (`template_id`),
  KEY `company_id` (`company_id`),
  KEY `parent_id` (`parent_id`),
  KEY `template_name` (`template_name`),
  KEY `folder_id` (`folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message_templates_locale`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_templates_locale` (
  `template_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `template_name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_by` int(255) NOT NULL,
  `template_type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_changed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`template_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message_templates_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_templates_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `metro_reminders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metro_reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT 'The ID of the user',
  `company` int(11) NOT NULL COMMENT 'The ID of the company',
  `title` varchar(150) NOT NULL COMMENT 'The title ex: Call Billy',
  `description` varchar(250) NOT NULL COMMENT 'The description for the reminder: Example: To discuss an oppertunity in sales within our company',
  `reminder_date` int(11) NOT NULL,
  `notification` int(11) DEFAULT NULL,
  `reminder_type` varchar(50) DEFAULT NULL,
  `item_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_index` (`uid`),
  KEY `company_index` (`company`),
  KEY `item_id` (`item_id`),
  KEY `notification` (`notification`),
  KEY `reminder_date` (`reminder_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mobile_widgets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_widgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `widget_type` varchar(50) NOT NULL,
  `widget_order` int(11) NOT NULL,
  `widget_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `multiple_companies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `multiple_companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `head_office_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news2_configuration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news2_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `medical_form_id` int(11) NOT NULL,
  `respirations` varchar(30) NOT NULL,
  `spo2_scale_1` varchar(30) NOT NULL,
  `spo2_scale_2` varchar(30) NOT NULL,
  `air_or_oxygen` varchar(30) NOT NULL,
  `blood_pressure` varchar(30) NOT NULL,
  `pulse` varchar(30) NOT NULL,
  `consciousness` varchar(30) NOT NULL,
  `temperature` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news_score_configuration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_score_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL COMMENT 'medical_form.id',
  `label` varchar(500) NOT NULL COMMENT 'medical form field label',
  `set_class` varchar(250) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mid` (`mid`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news_score_formula`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_score_formula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_score_id` int(11) NOT NULL COMMENT 'news_score_configuration.id',
  `formula` varchar(50) NOT NULL,
  `single_val` decimal(18,2) NOT NULL,
  `from_val` decimal(18,2) NOT NULL DEFAULT '0.00',
  `to_val` decimal(18,2) NOT NULL DEFAULT '0.00',
  `score` tinyint(4) NOT NULL DEFAULT '0',
  `color` varchar(10) DEFAULT NULL,
  `alert_rmo_ios` tinyint(4) NOT NULL DEFAULT '0',
  `alert_rmo_email` tinyint(4) NOT NULL DEFAULT '0',
  `alert_rmo_sms` tinyint(4) NOT NULL DEFAULT '0',
  `alert_rmo_web` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `news_score_id` (`news_score_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newsletter_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_body` text NOT NULL,
  `template_group` varchar(50) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `internal_name` varchar(20) NOT NULL,
  `automated_campaign` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_adjust_attr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_adjust_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_attr_id` int(11) DEFAULT NULL,
  `nhs_risk_adjust_id` int(11) DEFAULT NULL,
  `start` varchar(255) DEFAULT NULL,
  `end` varchar(255) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attr` (`nhs_attr_id`),
  KEY `risk` (`nhs_risk_adjust_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_attr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attr` (`name`),
  KEY `locum` (`nhs_locum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_form`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_deleted` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `data` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `nhs_procedure_id` int(11) DEFAULT NULL,
  `locked` int(11) NOT NULL,
  `printout` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_import`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_import` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_locum`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_locum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `date_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_outcome_profile_attr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_outcome_profile_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_outcome_profile_id` int(11) DEFAULT NULL,
  `nhs_attr_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `nhs_number` varchar(45) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `notes` text,
  `nhs_import_id` int(11) DEFAULT NULL,
  `user_created` int(11) NOT NULL DEFAULT '0',
  `user_updated` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_attr`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_attr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_attr_id` int(11) DEFAULT NULL,
  `nhs_patient_id` int(11) DEFAULT NULL,
  `value` varchar(512) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `group_label` varchar(45) DEFAULT NULL,
  `nhs_patient_record_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient` (`nhs_patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_patient_id` int(11) DEFAULT NULL,
  `note` text,
  `created_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `nhs_patient_procedure_id` int(11) DEFAULT NULL,
  `chart` tinyint(4) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_number`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_number` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_patient_id` int(11) DEFAULT NULL,
  `number` varchar(64) DEFAULT NULL,
  `nhs_hospital_id` int(11) DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nhs_patient_id` (`nhs_patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_procedure`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_procedure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_patient_id` int(11) DEFAULT NULL,
  `nhs_procedure_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `notes` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `follow_up` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_procedure_outcome`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_procedure_outcome` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_patient_procedure_id` int(11) DEFAULT NULL,
  `nhs_procedure_outcome_id` int(11) DEFAULT NULL,
  `actual_outcome` double DEFAULT NULL,
  `predicted_outcome` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `follow_up` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_procedure_team`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_procedure_team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_patient_procedure_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_patient_record`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_patient_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_patient_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_form_id` int(11) DEFAULT NULL,
  `complete` tinyint(4) NOT NULL,
  `locked` int(11) NOT NULL,
  `user_created` int(11) NOT NULL,
  `user_updated` int(11) NOT NULL,
  `related_to` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_procedure`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_procedure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `nhs_procedure_type_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `nhs_outcome_profile_id` int(11) DEFAULT NULL,
  `subname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_procedure_chart`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_procedure_chart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_chart_type_id` int(11) DEFAULT NULL,
  `nhs_procedure_id` int(11) DEFAULT NULL,
  `positive` tinyint(4) DEFAULT NULL,
  `negative` tinyint(4) DEFAULT NULL,
  `positive_limit` int(11) DEFAULT NULL,
  `negative_limit` int(11) DEFAULT NULL,
  `reset` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `median` tinyint(4) NOT NULL,
  `order_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_procedure_outcome`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_procedure_outcome` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_procedure_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `nhs_risk_adjust_id` int(11) DEFAULT NULL,
  `definition` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` varchar(45) DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nhs_risk_adjust`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhs_risk_adjust` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nhs_procedure_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `formula` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `nhs_locum_id` int(11) DEFAULT NULL,
  `type` varchar(28) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `procedure` (`nhs_procedure_id`),
  KEY `locum` (`nhs_locum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_order_approval_email` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_campaign`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_campaign` (
  `campaign_id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_name` varchar(255) NOT NULL,
  `create_date` date NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_campaign_member`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_campaign_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `current_newsletter_id` int(11) NOT NULL,
  `join_time` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_id` (`campaign_id`,`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_campaign_newsletter`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_campaign_newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_id` int(11) NOT NULL,
  `newsletter_id` int(11) NOT NULL,
  `send_time` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_id` (`campaign_id`,`newsletter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_group`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  `public` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  `temp` int(11) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_image`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_image` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` text NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_link`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_link` (
  `link_id` int(11) NOT NULL AUTO_INCREMENT,
  `link_url` text NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`link_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_link_open`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_link_open` (
  `link_open_id` int(11) NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `send_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`link_open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_member`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `join_date` date NOT NULL,
  `ip_address` varchar(15) NOT NULL,
  `unsubscribe_date` date NOT NULL DEFAULT '0000-00-00',
  `unsubscribe_send_id` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  `temp` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`member_id`),
  KEY `company` (`company`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_member_group`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_member_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  `temp` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`),
  KEY `group_id` (`group_id`),
  KEY `member_id` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_newsletter`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_newsletter` (
  `newsletter_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` date NOT NULL,
  `template` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `from_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `from_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'noreply@pabau.com',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `bounce_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `company` int(5) NOT NULL,
  `grroup_id` int(11) NOT NULL,
  `campaign_type` varchar(30) NOT NULL,
  `groups_recipients` varchar(255) NOT NULL,
  `sent_by` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `groups_prerecipients` varchar(255) NOT NULL,
  `campaign_status` varchar(255) NOT NULL,
  `send_date` datetime NOT NULL,
  `finished_date` datetime NOT NULL,
  `total_recips` int(11) NOT NULL,
  `body_content` longtext NOT NULL,
  PRIMARY KEY (`newsletter_id`),
  KEY `company` (`company`),
  KEY `campaign_status` (`campaign_status`),
  KEY `send_date` (`send_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_newsletter_backup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_newsletter_backup` (
  `newsletter_id` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `template` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `from_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `from_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'noreply@pabau.com',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `bounce_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `company` int(5) NOT NULL,
  `grroup_id` int(11) NOT NULL,
  `campaign_type` varchar(30) NOT NULL,
  `groups_recipients` varchar(255) NOT NULL,
  `sent_by` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `groups_prerecipients` varchar(255) NOT NULL,
  `campaign_status` varchar(255) NOT NULL,
  `send_date` datetime NOT NULL,
  `finished_date` datetime NOT NULL,
  `total_recips` int(11) NOT NULL,
  `body_content` longtext NOT NULL,
  PRIMARY KEY (`newsletter_id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_newsletter_images`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_newsletter_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `linkhref` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_newsletter_member`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_newsletter_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `send_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `sent_time` int(11) NOT NULL,
  `status` int(1) NOT NULL COMMENT '0 = queued; 1 = delivered; 2 = hard_bounce; 3 = soft_bounce',
  `open_time` int(11) NOT NULL,
  `click_time` int(11) NOT NULL,
  `bounce_time` int(11) NOT NULL,
  `company` int(5) NOT NULL,
  `newsletter_id` int(11) NOT NULL,
  `communication_log_id` int(11) NOT NULL,
  `mandrill_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `open_time` (`open_time`),
  KEY `company` (`company`),
  KEY `member_id` (`member_id`),
  KEY `status` (`status`),
  KEY `send_id` (`send_id`),
  KEY `newsletter_id` (`newsletter_id`),
  KEY `communication_log_id` (`communication_log_id`),
  KEY `mandrill_id` (`mandrill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_newsletter_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_newsletter_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `newsletter_id` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `template_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `newsletter_id` (`newsletter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_send`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_send` (
  `send_id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `finish_time` int(11) NOT NULL,
  `newsletter_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `template_html` text NOT NULL,
  `full_html` text NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`send_id`),
  KEY `newsletter_id` (`newsletter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nws_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nws_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `val` varchar(255) NOT NULL,
  `company` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`,`company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `old_passwords`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `old_passwords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `online_bookings_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `online_bookings_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `signature` varchar(100) NOT NULL,
  `json_data` text NOT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `signature` (`signature`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opportunity_closure_reason`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opportunity_closure_reason` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `occupier` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(120) NOT NULL,
  `reference` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `p_method` varchar(50) NOT NULL,
  `quantity` int(50) NOT NULL,
  `total` float(8,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `occupier` int(100) NOT NULL,
  `eventid` int(255) NOT NULL,
  `t_type` varchar(200) NOT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_care_stats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_care_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `entry_date` date NOT NULL,
  `general_clients` int(2) NOT NULL,
  `general_leads` int(2) NOT NULL,
  `general_financials` int(2) NOT NULL,
  `general_emails` int(2) NOT NULL,
  `general_sms` int(2) NOT NULL,
  `general_total` int(2) NOT NULL,
  `marketing_sms` int(2) NOT NULL,
  `marketing_newsletter` int(2) NOT NULL,
  `marketing_survey` int(2) NOT NULL,
  `marketing_birthday` int(2) NOT NULL,
  `marketing_total` int(2) NOT NULL,
  `paperless_consent` int(2) NOT NULL,
  `paperless_medical` int(2) NOT NULL,
  `paperless_treatment` int(2) NOT NULL,
  `paperless_precare` int(2) NOT NULL,
  `paperless_aftercare` int(2) NOT NULL,
  `paperless_online` int(2) NOT NULL,
  `paperless_photo` int(2) NOT NULL,
  `paperless_documents` int(2) NOT NULL,
  `paperless_total` int(2) NOT NULL,
  `website_leads` int(2) NOT NULL,
  `website_online` int(11) NOT NULL,
  `stock_inventory` int(2) NOT NULL,
  `stock_purchase` int(2) NOT NULL,
  `stock_total` int(2) NOT NULL,
  `pabau_score` int(2) NOT NULL,
  `manual_service_satisfaction` int(11) NOT NULL,
  `manual_training_satisfaction` int(2) NOT NULL,
  `overall_satisfaction` int(11) NOT NULL,
  `green_flags` int(2) NOT NULL,
  `red_flags` int(2) NOT NULL,
  `amber_flags` int(2) NOT NULL,
  `grand_total_score` int(11) NOT NULL,
  `money_stripe` int(2) NOT NULL,
  `money_recall` int(2) NOT NULL,
  `money_sms` int(2) NOT NULL,
  `contact_count` int(11) NOT NULL,
  `consent_count` int(11) NOT NULL,
  `medical_history_count` int(11) NOT NULL,
  `treatment_note_count` int(11) NOT NULL,
  `precare_count` int(11) NOT NULL,
  `aftercare_count` int(11) NOT NULL,
  `photos_count` int(11) NOT NULL,
  `online_form_count` int(11) NOT NULL,
  `documents_count` int(11) NOT NULL,
  `bookings_count` int(11) NOT NULL,
  `leads_count` int(11) NOT NULL,
  `bookings_create_count` int(11) NOT NULL,
  `finance_count` int(11) NOT NULL,
  `stripe_fees_count` decimal(8,2) NOT NULL,
  `stripe_fees_activity` int(11) NOT NULL,
  `full_contact_count` int(11) NOT NULL,
  `total_sms_campaign` int(11) NOT NULL,
  `total_newsletter_campaign` int(11) NOT NULL,
  `total_surveys` int(11) NOT NULL,
  `total_recalls` int(11) NOT NULL,
  `total_birthdays` int(11) NOT NULL,
  `tickets_total_created` int(11) NOT NULL,
  `tickets_total_solved` int(11) NOT NULL,
  `tickets_total_open` int(11) NOT NULL,
  `tickets_01` int(11) NOT NULL,
  `tickets_18` int(11) NOT NULL,
  `tickets_824` int(11) NOT NULL,
  `tickets_24` int(11) NOT NULL,
  `survey_hits` int(11) NOT NULL,
  `photo_uploader_hits` int(11) NOT NULL,
  `sms_refer` int(11) NOT NULL,
  `sms_referee` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_config`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cal_live` int(11) NOT NULL,
  `cal_beta` int(11) NOT NULL,
  `pos_beta` int(11) NOT NULL,
  `pos_live` int(11) NOT NULL,
  `rota_live` int(11) NOT NULL,
  `rota_beta` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_coupons`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `type` varchar(20) NOT NULL,
  `redeemed` int(10) NOT NULL,
  `redeem_date` date NOT NULL,
  `produced_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_debug_tue`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_debug_tue` (
  `company_id` int(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `hits` int(255) NOT NULL,
  `peak_memory` int(255) NOT NULL,
  `cpu_usage_time` double NOT NULL COMMENT 'milliseconds',
  `exec_usage_time` double NOT NULL COMMENT 'milliseconds',
  `id` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_id` (`company_id`,`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_feedback_stats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_feedback_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `sent_to_email_sms` varchar(200) NOT NULL,
  `sent_date` int(11) NOT NULL,
  `related_id` int(11) NOT NULL,
  `converted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_news`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_news` (
  `alertid` int(10) NOT NULL AUTO_INCREMENT,
  `cid` bigint(20) NOT NULL COMMENT 'Company ID',
  `uid` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `entrydate` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `owner_id` varchar(20) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`alertid`),
  KEY `message_check` (`uid`,`entrydate`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_order`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `training_fee` decimal(8,2) NOT NULL,
  `previous_system` varchar(100) NOT NULL,
  `support_plan` varchar(50) NOT NULL,
  `order_notes` varchar(100) NOT NULL,
  `subscription_fee` decimal(8,2) NOT NULL,
  `support_fee` decimal(8,2) NOT NULL,
  `date_created` datetime NOT NULL,
  `terms_signed` datetime NOT NULL,
  `subscription_name` varchar(100) NOT NULL,
  `lead_source` varchar(100) NOT NULL,
  `signed_contract` varchar(200) NOT NULL,
  `proposal_sent` varchar(200) NOT NULL,
  `setup_fee` decimal(8,2) NOT NULL,
  `waive_setup_fee` int(2) NOT NULL,
  `training_fee_done` tinyint(1) DEFAULT NULL,
  `setup_fee_done` tinyint(1) DEFAULT NULL,
  `support_fee_done` tinyint(1) DEFAULT NULL,
  `subscription_fee_done` tinyint(1) DEFAULT NULL,
  `summary_order` text NOT NULL,
  `discounts` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_paymentplan`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_paymentplan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `description` varchar(180) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `interval` varchar(100) NOT NULL,
  `payment_day` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_pos_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_pos_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `disable_service` int(11) NOT NULL,
  `disable_products` int(11) NOT NULL,
  `disable_packages` int(11) NOT NULL,
  `disable_giftcards` int(11) NOT NULL,
  `disable_account` int(11) NOT NULL,
  `disable_price_override` int(11) NOT NULL,
  `print_mode` varchar(10) NOT NULL DEFAULT 'receipt',
  `disable_discount` int(11) NOT NULL,
  `email_receipt_text` text NOT NULL,
  `theme_col` varchar(15) NOT NULL,
  `bank_account` varchar(100) NOT NULL,
  `bank_number` varchar(25) NOT NULL,
  `sort_code` varchar(10) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `iban` varchar(120) NOT NULL,
  `swift` varchar(50) NOT NULL,
  `cashup_settings` int(11) NOT NULL,
  `default_payment_type` varchar(10) NOT NULL,
  `disable_loyalty` int(5) NOT NULL,
  `email_receipt_template` int(11) NOT NULL,
  `enable_bank_details` int(11) NOT NULL,
  `vat` varchar(20) NOT NULL,
  `enable_biller_settings` int(11) NOT NULL,
  `display_taxes` int(11) NOT NULL,
  `use_pabau_id` int(11) NOT NULL COMMENT 'This will use the pabau sale IDs for invoice numbers',
  `starting_invoice_number` int(11) NOT NULL DEFAULT '1',
  `enable_next_appointment` int(2) NOT NULL,
  `show_paid_label` int(11) NOT NULL,
  `paid_label` varchar(20) NOT NULL,
  `display_quantity` int(11) NOT NULL,
  `display_unit_cost` int(11) NOT NULL,
  `logo_position` varchar(8) NOT NULL DEFAULT 'left',
  `force_discount_reason` tinyint(1) NOT NULL DEFAULT '0',
  `automatic_booking` tinyint(4) NOT NULL,
  `gift_msg_template_id` int(11) NOT NULL,
  `gift_sms_template_id` int(11) NOT NULL,
  `package_use_by_date` tinyint(4) DEFAULT NULL,
  `locked` tinyint(4) NOT NULL,
  `cron_day` tinyint(4) DEFAULT '1',
  `lock_sale_date` date DEFAULT NULL,
  `stock_mode` int(2) NOT NULL,
  `inv_template` varchar(255) DEFAULT NULL,
  `lock_invoice_edit` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_shortener`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_shortener` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `redirect_code` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `redirect_code` (`redirect_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pabau_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pabau_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_trainer` int(2) DEFAULT '0',
  `is_admin` int(2) DEFAULT '0',
  `is_onboarder` int(2) DEFAULT '0',
  `slack_id` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `page_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `visible` int(1) NOT NULL,
  `url` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `page_hits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_hits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(250) NOT NULL,
  `hits` varchar(250) NOT NULL,
  `memory_usage` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `file` (`file`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(22) NOT NULL,
  `link` varchar(100) NOT NULL,
  `parent` int(5) NOT NULL,
  `category` varchar(100) NOT NULL COMMENT 'Retail,Sales,Finance,Health,Fitness,Medical',
  `showcase` int(11) NOT NULL,
  `description` text NOT NULL,
  `features` varchar(500) NOT NULL,
  `new` int(11) NOT NULL,
  `img` varchar(155) NOT NULL,
  `admin` int(1) NOT NULL,
  `order` int(100) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `tickier_order` int(30) NOT NULL,
  `friendly_name` varchar(100) NOT NULL,
  `app_weight` int(9) NOT NULL,
  `video_link` varchar(90) NOT NULL,
  `large_thumb` varchar(100) NOT NULL,
  `inactive` int(11) NOT NULL,
  `private_key` varchar(200) NOT NULL,
  `new_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`),
  KEY `admin` (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partner_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `charge_date` date NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `description` varchar(200) NOT NULL,
  `partner_id` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partner_rates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) NOT NULL,
  `60_rate` decimal(8,2) NOT NULL,
  `95_rate` decimal(8,2) NOT NULL,
  `125_rate` decimal(8,2) NOT NULL,
  `240_rate` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partner_track`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(2) NOT NULL,
  `created_date` datetime NOT NULL,
  `from_date` datetime NOT NULL,
  `to_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partners_amendment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners_amendment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `from_date` datetime NOT NULL,
  `to_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partners_partner`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners_partner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_name` varchar(20) NOT NULL,
  `partner_email` varchar(100) NOT NULL,
  `status` int(2) NOT NULL COMMENT '0 = Pending DD; 1= Active',
  `created_date` datetime NOT NULL,
  `partner_type` varchar(2) NOT NULL COMMENT '1 = Customer Advocate; 2= Reseller; 3= Industry Partner',
  `include_sms` int(2) NOT NULL,
  `recurring` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_reset_auth`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_code` varchar(200) NOT NULL,
  `username` varchar(100) NOT NULL,
  `old_password` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment_protection_stripe`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_protection_stripe` (
  `id` int(191) NOT NULL AUTO_INCREMENT,
  `stripe_customer_id` varchar(191) NOT NULL,
  `payment_method_id` varchar(191) DEFAULT NULL,
  `contact_id` int(191) NOT NULL COMMENT 'cm_contacts.id',
  `booking_id` int(191) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `company_id` int(191) NOT NULL,
  `charged` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Is clinic charged for this payment-protection row',
  PRIMARY KEY (`id`),
  KEY `BOOKINGID` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(255) NOT NULL,
  `date` int(12) NOT NULL,
  `amount` varchar(32) NOT NULL,
  `invoice` int(7) NOT NULL,
  `pmethod` varchar(255) NOT NULL,
  `occupier` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payroll`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `period_type` tinyint(4) DEFAULT '1',
  `period_from` date NOT NULL,
  `period_to` date NOT NULL,
  `position` int(11) NOT NULL DEFAULT '0',
  `locations` int(11) DEFAULT '0',
  `total_hours` varchar(50) NOT NULL,
  `wage_pay` decimal(8,2) NOT NULL,
  `salary_pay` decimal(8,2) NOT NULL,
  `commission_pay` decimal(8,2) NOT NULL DEFAULT '0.00',
  `total_pay` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `employees` text NOT NULL,
  `invoice_ids` text,
  `pending_invoice_ids` text,
  `finance_ids` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permission_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `app_permissions` text NOT NULL,
  `user_permissions` text NOT NULL,
  `mobile_permissions` varchar(255) NOT NULL,
  `mobile_widgets` varchar(255) NOT NULL,
  `disabled_services` text NOT NULL,
  `alerts` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `enabled_reports` text NOT NULL,
  `all_reports` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `petty_cash_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `petty_cash_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `default_price` decimal(8,2) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pg_appointment_status`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_appointment_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `patient_details` int(11) NOT NULL,
  `medical_history` int(11) NOT NULL,
  `patient_consent` int(11) NOT NULL,
  `photos` int(11) NOT NULL,
  `treatment_notes` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `consent_1` int(11) NOT NULL,
  `consent_2` int(11) NOT NULL,
  `consent_3` int(11) NOT NULL,
  `aftercare_sent` int(11) NOT NULL,
  `aftercare_template_ids` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_id` (`appointment_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phi_assesment_entries`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phi_assesment_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `interest_area` varchar(20) NOT NULL,
  `interests` varchar(255) NOT NULL,
  `date_taken` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photo_album`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo_album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `modified_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phpbirthday`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phpbirthday` (
  `Name` varchar(50) DEFAULT NULL,
  `Address` varchar(150) DEFAULT NULL,
  `City` varchar(60) DEFAULT NULL,
  `entrydate` varchar(60) DEFAULT NULL,
  `Postal` varchar(60) DEFAULT NULL,
  `Country` varchar(80) DEFAULT NULL,
  `B_Date` varchar(255) DEFAULT NULL,
  `IP_Address` varchar(50) DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `H_Phone` varchar(25) DEFAULT NULL,
  `M_Phone` varchar(25) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `University` varchar(70) DEFAULT NULL,
  `Group` varchar(255) DEFAULT NULL,
  `Occupier` varchar(255) DEFAULT NULL,
  `fb_id` varchar(255) DEFAULT NULL,
  `Gender` varchar(20) DEFAULT NULL,
  `visible` int(11) NOT NULL,
  `bday_email` tinyint(1) NOT NULL DEFAULT '0',
  `bday_sms` tinyint(1) NOT NULL DEFAULT '0',
  `bday_letter` int(11) NOT NULL,
  `bday_email_date` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Name` (`Name`),
  KEY `occupier` (`Occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pipeline`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pipeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `status` int(3) NOT NULL DEFAULT '0',
  `services_ids` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `restrict_stages` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pipeline_stage_custom_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pipeline_stage_custom_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `opportunity_id` int(11) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `custom_field_id` int(11) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pipeline_stages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pipeline_stages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `pipeline_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `stage_order` int(3) NOT NULL DEFAULT '0' COMMENT '0 = Unassigned; 999 = Finished',
  `custom_field_ids` varchar(511) NOT NULL,
  `note` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pos2_queries`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pos2_queries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` int(10) unsigned NOT NULL,
  `query` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pos2_transactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pos2_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `guid` char(64) NOT NULL,
  `bill_date` datetime NOT NULL,
  `php_date` datetime NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `bill` text NOT NULL,
  `result` tinyint(1) DEFAULT NULL,
  `result_text` text,
  `hold` int(1) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `receipt` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guid_2` (`guid`),
  KEY `guid` (`guid`),
  KEY `bill_date` (`bill_date`),
  KEY `uid` (`uid`),
  KEY `company` (`company`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pos_log_guid`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pos_log_guid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` text,
  `company` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pos_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pos_settings` (
  `pos_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_limit` int(11) NOT NULL,
  `pro_limit` int(11) NOT NULL,
  `default_category` int(11) NOT NULL,
  `default_customer` int(11) NOT NULL,
  `default_biller` int(11) NOT NULL,
  `display_time` varchar(3) NOT NULL DEFAULT 'yes',
  `display_avatar` tinyint(4) DEFAULT '0',
  `display_account` tinyint(4) DEFAULT '0',
  `services_filter` tinyint(4) DEFAULT '0',
  `retail_filter` tinyint(4) DEFAULT '0',
  `salesbtn_left_disabled` tinyint(4) DEFAULT '0',
  `cancelbtn_bottom_disabled` tinyint(4) DEFAULT '0',
  `occupier` int(11) DEFAULT NULL,
  `cashup_settings` int(11) NOT NULL COMMENT '0= Non Blind; 2= Manager Only; 3=Blind',
  PRIMARY KEY (`pos_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pract_charge_amount`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pract_charge_amount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `company_id` int(11) NOT NULL,
  `commission_sheet_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL,
  `charge_amount` int(11) NOT NULL,
  `facility_fee` decimal(10,2) DEFAULT '0.00',
  `facility_fee2` decimal(10,2) DEFAULT '0.00',
  `deduct_consumables` tinyint(4) DEFAULT '0',
  `payout_employee` decimal(10,2) DEFAULT '0.00',
  `payout_business` decimal(10,2) NOT NULL DEFAULT '0.00',
  `c_deductions` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'consumable deductions amount',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preview_letter_template`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preview_letter_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `header` varchar(255) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `template_id` int(11) NOT NULL,
  `exclude_margins` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `price_level_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_level_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day_name` varchar(50) DEFAULT NULL,
  `day_start_time` varchar(50) DEFAULT NULL,
  `day_end_time` varchar(50) DEFAULT NULL,
  `discount_type` varchar(10) DEFAULT NULL,
  `discount` decimal(25,2) DEFAULT NULL,
  `discount_mode` varchar(10) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `other_name_1` varchar(100) NOT NULL,
  `other_name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profit_loss_report_temp`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profit_loss_report_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weekdate` int(10) unsigned NOT NULL,
  `company_id` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `staffId` int(10) unsigned NOT NULL,
  `employee` char(127) NOT NULL,
  `Sunday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Sunday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Sunday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Monday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Monday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Monday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Tuesday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Tuesday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Tuesday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Wednesday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Wednesday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Wednesday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Thursday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Thursday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Thursday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Friday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Friday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Friday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Saturday_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Saturday_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Saturday_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Total_Week_Cost_Net` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Total_Week_Cost_Gross` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Total_Week_hours` decimal(10,2) NOT NULL DEFAULT '0.00',
  `xp` decimal(10,2) NOT NULL DEFAULT '0.00',
  `wages` decimal(10,2) NOT NULL DEFAULT '0.00',
  `FC` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Total_Working_Count` int(2) unsigned NOT NULL DEFAULT '0',
  `botw` int(2) unsigned NOT NULL DEFAULT '0',
  `botw_level` int(2) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `psfs_followup_email_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `psfs_followup_email_trigger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `initial_id` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `type` tinyint(4) DEFAULT '1',
  `email_type` varchar(25) NOT NULL DEFAULT 'follow up',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `psfs_initial_email_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `psfs_initial_email_trigger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `cycle_id` int(11) NOT NULL DEFAULT '0',
  `form_id` int(11) NOT NULL DEFAULT '0',
  `date_time` datetime DEFAULT NULL,
  `discharge` tinyint(4) DEFAULT '0',
  `discharge_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `psfs_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `psfs_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `psfs_initial_template_id` int(11) NOT NULL DEFAULT '0',
  `psfs_followup_template_id` int(11) NOT NULL DEFAULT '0',
  `psfs_initial_enable` tinyint(4) NOT NULL DEFAULT '0',
  `psfs_followup_enable` tinyint(4) NOT NULL DEFAULT '0',
  `psfs_form_id` int(11) NOT NULL DEFAULT '0',
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchase`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(255) NOT NULL,
  `items` int(11) NOT NULL,
  `price` decimal(25,2) NOT NULL,
  `date` varchar(255) NOT NULL,
  `customer_name` varchar(250) NOT NULL,
  `currency` varchar(256) NOT NULL,
  `comp_id` int(100) NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quick_tools`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quick_tools` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `parentid` int(10) NOT NULL,
  `secondaryid` int(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `ordering` int(100) NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parentid` (`parentid`),
  KEY `secondaryid` (`secondaryid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quotation_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotation_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_plan_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subscription_plan_price` decimal(10,2) DEFAULT NULL,
  `support_plan_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support_price` decimal(10,2) DEFAULT NULL,
  `education_plan_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education_plan_price` decimal(10,2) DEFAULT NULL,
  `migration_plan_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `migration_plan_price` decimal(10,2) DEFAULT NULL,
  `upfront_payment` decimal(10,2) DEFAULT NULL,
  `sub_discount` int(11) DEFAULT NULL,
  `sup_discount` int(11) DEFAULT NULL,
  `edu_discount` int(11) DEFAULT NULL,
  `set_discount` int(11) DEFAULT NULL,
  `previous_system` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `radio_tracks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `radio_tracks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company` int(10) unsigned NOT NULL,
  `filename` text NOT NULL,
  `title` text NOT NULL,
  `is_spotify` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rate_limiter`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate_limiter` (
  `ip` varchar(64) NOT NULL,
  `count` int(11) NOT NULL,
  `last_access` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recall_schedule`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recall_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `recall_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `scheduled_date` date NOT NULL,
  `notes` varchar(255) NOT NULL,
  `sms_sent` int(11) NOT NULL COMMENT '0=None; 1=Scheduled; 2=Sent;',
  `recalled_by` int(11) NOT NULL,
  `recalled_on` int(11) NOT NULL,
  `email_sent` int(11) NOT NULL COMMENT '0=None; 1=Scheduled; 2=Sent;',
  `deleted` tinyint(4) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `error_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `recall_id` (`recall_id`),
  KEY `contact_id` (`contact_id`),
  KEY `recalled_by` (`recalled_by`),
  KEY `date` (`date`),
  KEY `company_id` (`company_id`),
  KEY `scheduled_date` (`scheduled_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recall_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recall_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `mandatory` int(11) NOT NULL,
  `only_working_day` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recall_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recall_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recall_name` varchar(50) NOT NULL,
  `recall_mode` varchar(10) NOT NULL COMMENT 'Day; Week; Month;',
  `recall_period` varchar(11) NOT NULL COMMENT '0-9 (example: a mode ''month'' and period 1 would equate to 1 month)',
  `company_id` int(11) NOT NULL,
  `send_sms` int(11) NOT NULL,
  `recall_category_id` int(11) NOT NULL,
  `send_email` int(11) NOT NULL,
  `auto_recall` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:None,1:Services,2:Products',
  `auto_recall_products_ids` text NOT NULL,
  `auto_recall_trigger` varchar(30) NOT NULL,
  `auto_recall_services_ids` text NOT NULL,
  `email_from` int(11) NOT NULL DEFAULT '0' COMMENT 'company_emails.email_id',
  `sms_from` int(11) NOT NULL DEFAULT '0' COMMENT 'sms_senders.smsd_id',
  PRIMARY KEY (`id`),
  KEY `recall_category_id` (`recall_category_id`),
  KEY `email_from` (`email_from`,`sms_from`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recent_searches`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recent_searches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referral_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referral_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `thanks_msg_id` int(11) NOT NULL,
  `auto_reward` int(1) NOT NULL,
  `reward_value` decimal(8,2) NOT NULL,
  `voucher_expiry_days` int(11) NOT NULL,
  `reward_type` varchar(9) NOT NULL,
  `reward_options` enum('both','referee','referrer') NOT NULL DEFAULT 'both',
  `sms_notify` int(11) NOT NULL,
  `email_notify` int(11) NOT NULL,
  `connect_wording` text NOT NULL,
  `blind_ref_email` text NOT NULL,
  `post_buzzfeed` int(11) NOT NULL DEFAULT '1',
  `reward_refee_value` decimal(8,2) NOT NULL,
  `reward_client` int(11) NOT NULL,
  `reward_referer` int(11) NOT NULL,
  `thanks_msg_id_referee` int(2) NOT NULL,
  `email_id_referrer` int(11) NOT NULL,
  `email_id_referee` int(11) NOT NULL,
  `enable_sms_referee` int(11) NOT NULL,
  `enable_email_referee` int(11) NOT NULL,
  `voucher_template_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `related_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `related_services` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `service_id` bigint(20) NOT NULL,
  `service` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reminder_contact_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reminder_contact_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `contact_id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `occupier` varchar(100) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `colour` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_custom_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_custom_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_id` varchar(100) NOT NULL,
  `field_name` varchar(100) NOT NULL,
  `field_type` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `group_name` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `order_number` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_custom_fields_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_custom_fields_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `is_active` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_custom_fields_combine`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_custom_fields_combine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `field_1` varchar(30) NOT NULL,
  `operator` varchar(20) NOT NULL,
  `field_2` varchar(30) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_filters`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_filters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `column_names` text NOT NULL,
  `filter_type` varchar(255) NOT NULL,
  `filter_select_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_pdf`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_pdf` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `datetime` datetime NOT NULL,
  `unique_id` int(11) NOT NULL,
  `guid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `guid` (`guid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_pdf_messages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_pdf_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `report_pdf_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_scheduled_csv`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_scheduled_csv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `unique_key` varchar(255) NOT NULL,
  `get_data` text NOT NULL,
  `post_data` text NOT NULL,
  `scheduled` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `url_link` varchar(255) NOT NULL,
  `file_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reports`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `report_category_id` bigint(20) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `occupier` varchar(100) DEFAULT NULL,
  `group_field` varchar(100) DEFAULT NULL,
  `link` varchar(250) DEFAULT NULL,
  `send` tinyint(4) DEFAULT '0',
  `date_limit` varchar(100) NOT NULL,
  `filter` varchar(100) DEFAULT NULL,
  `search_result` varchar(100) NOT NULL,
  `column_names` text NOT NULL,
  `preview_image` varchar(200) NOT NULL,
  `exc_vat_column` varchar(255) NOT NULL,
  `filter_json` text NOT NULL,
  `grand_total` int(11) NOT NULL,
  `report_code` varchar(20) NOT NULL,
  `show_hide_columns` varchar(255) NOT NULL,
  `users_mode` int(11) NOT NULL DEFAULT '0',
  `filter_user` varchar(255) DEFAULT NULL,
  `iframe` int(11) NOT NULL DEFAULT '0',
  `iframe_url` varchar(255) NOT NULL,
  `package_usage` int(11) NOT NULL,
  `show_package_usage` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `marketing` int(11) NOT NULL,
  `has_summary` int(11) NOT NULL COMMENT '0=None; 1=Default Detailed; 2= Default Summary;',
  `filter_summary` int(11) DEFAULT NULL,
  `admin_only` int(11) NOT NULL,
  `thumbnail_preview` varchar(200) NOT NULL,
  `total_revenue` int(11) NOT NULL,
  `show_custom_ids` int(11) NOT NULL COMMENT '1=(contacts or leads) 2=(users)',
  `show_custom_fields` int(11) NOT NULL,
  `custom_fields_defined` text NOT NULL,
  `show_in_leads` int(11) NOT NULL,
  `other_custom_fields` text NOT NULL,
  `custom_fields_group` varchar(255) NOT NULL,
  `custom_filter` varchar(255) NOT NULL,
  `sub_category` varchar(30) NOT NULL,
  `easy_filters` text NOT NULL,
  `easy_filters_advanced` text NOT NULL,
  `show_accounting` int(11) NOT NULL,
  `show_revenue` int(11) NOT NULL,
  `support_location_filter` int(11) NOT NULL,
  `checks_complete` int(2) NOT NULL,
  `custom_ids_checked` tinyint(4) NOT NULL,
  `flag_video` varchar(100) NOT NULL,
  `flag_video_2` varchar(100) NOT NULL,
  `checks_complete_2` int(11) NOT NULL,
  `companies_included` varchar(255) NOT NULL,
  `checks_complete_3` int(11) NOT NULL,
  `flag_video_3` varchar(200) NOT NULL,
  `checks_complete_4` int(11) NOT NULL,
  `flag_video_4` varchar(200) NOT NULL,
  `subscribed_filter` varchar(255) DEFAULT NULL,
  `print_page_size` varchar(255) NOT NULL DEFAULT 'portrait',
  `sort_columns` text NOT NULL,
  `group_column` varchar(255) NOT NULL,
  `mask_client_name` tinyint(4) NOT NULL,
  `core_report` int(2) NOT NULL,
  `hide_columns` text NOT NULL,
  `summary_mode` int(2) NOT NULL,
  `graph_mode` int(2) NOT NULL,
  `detailed_mode` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `report_category_id` (`report_category_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reports_favourite`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports_favourite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `report_id` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reportschedule_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reportschedule_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_id` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `reports` varchar(100) NOT NULL,
  `datetime` datetime NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `is_test` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reportschedule_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reportschedule_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `enabled` int(2) NOT NULL,
  `frequency` varchar(10) NOT NULL,
  `custom_day` varchar(100) NOT NULL,
  `custom_mode` varchar(100) NOT NULL,
  `last_current_from` varchar(100) NOT NULL,
  `last_current_to` varchar(100) NOT NULL,
  `period_from` varchar(100) NOT NULL,
  `period_to` varchar(100) NOT NULL,
  `reports` varchar(255) NOT NULL,
  `included_users` varchar(255) NOT NULL,
  `LastSent` date NOT NULL,
  `end_week` int(11) NOT NULL,
  `time` varchar(50) NOT NULL,
  `report_subject` varchar(100) NOT NULL,
  `sales_summary` int(11) NOT NULL,
  `print_page_size` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `request_permission`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `type` varchar(8) NOT NULL,
  `name` varchar(100) NOT NULL,
  `target_id` int(11) NOT NULL,
  `approved` int(2) NOT NULL,
  `approved_by_id` int(11) NOT NULL,
  `approved_on` datetime NOT NULL,
  `requested_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rest_bookings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_bookings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `table_id` bigint(20) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `UID` bigint(20) NOT NULL,
  `contact_id` bigint(20) NOT NULL,
  `guest_count` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `create_date` date NOT NULL,
  `status` varchar(100) NOT NULL,
  `Online` tinyint(4) NOT NULL,
  `invoice_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rest_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_categories` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rest_tables`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_tables` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `rest_category_id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Size` int(11) NOT NULL,
  `Covers` int(11) NOT NULL,
  `Occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_master` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_comp_id` int(11) DEFAULT NULL,
  `r_loc_id` int(11) DEFAULT NULL,
  `r_room` varchar(256) DEFAULT NULL,
  `r_date` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rota_repeats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rota_repeats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `shift_start` int(10) NOT NULL,
  `shift_end` int(10) NOT NULL,
  `repeat_start` int(10) NOT NULL,
  `repeat_end` int(10) NOT NULL,
  `day_sun` tinyint(1) unsigned NOT NULL,
  `day_mon` tinyint(1) unsigned NOT NULL,
  `day_tue` tinyint(1) unsigned NOT NULL,
  `day_wed` tinyint(1) unsigned NOT NULL,
  `day_thu` tinyint(1) unsigned NOT NULL,
  `day_fri` tinyint(1) unsigned NOT NULL,
  `day_sat` tinyint(1) unsigned NOT NULL,
  `every` tinyint(10) unsigned NOT NULL,
  `unit` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rota_shifts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rota_shifts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `start` bigint(20) NOT NULL,
  `end` bigint(20) NOT NULL,
  `occupier` int(10) unsigned NOT NULL,
  `notes` text,
  `last_seen` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_notified` datetime DEFAULT NULL,
  `last_published` datetime DEFAULT NULL,
  `first_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_created` int(11) NOT NULL,
  `repeat_id` int(10) unsigned DEFAULT NULL,
  `reason_code` char(16) DEFAULT '',
  `reason_data` text,
  `holiday_id` int(11) NOT NULL DEFAULT '0',
  `cal_id` int(11) DEFAULT NULL,
  `is_cal` int(11) NOT NULL DEFAULT '0',
  `note_color` varchar(20) NOT NULL DEFAULT '',
  `location_id` int(11) NOT NULL DEFAULT '0',
  `request` tinyint(4) DEFAULT '0',
  `sickness` int(11) DEFAULT '0',
  `imported` int(11) NOT NULL DEFAULT '0',
  `tag_name` varchar(255) NOT NULL DEFAULT '',
  `room_id` int(11) NOT NULL DEFAULT '0',
  `force_created` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `last_published` (`last_published`),
  KEY `reason_code` (`reason_code`),
  KEY `repeat_id` (`repeat_id`),
  KEY `location_id` (`location_id`),
  KEY `occupier` (`occupier`),
  KEY `start` (`start`),
  KEY `uid` (`uid`),
  KEY `end` (`end`),
  KEY `holiday_id` (`holiday_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rota_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rota_templates` (
  `rota_template_id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` int(11) NOT NULL,
  `template_name` varchar(250) NOT NULL,
  `start_time` varchar(250) NOT NULL,
  `end_time` varchar(250) NOT NULL,
  `days` varchar(250) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`rota_template_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `seller` int(5) NOT NULL,
  `date` date NOT NULL,
  `tickets_dispensed` int(10) NOT NULL,
  `tickets_returned` int(10) NOT NULL,
  `paid_by` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_meta`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) NOT NULL,
  `meta_key` varchar(100) CHARACTER SET utf8 NOT NULL,
  `meta_value` text CHARACTER SET utf8,
  PRIMARY KEY (`id`),
  KEY `sales_id` (`sales_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_pitches`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_pitches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pitch_name` varchar(100) NOT NULL,
  `pitch_description` text NOT NULL,
  `pitch_type` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `start_date` bigint(20) DEFAULT NULL,
  `end_date` bigint(20) DEFAULT NULL,
  `start_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `UID` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `backgroudcolor` varchar(255) DEFAULT NULL,
  `create_date` bigint(20) DEFAULT NULL,
  `update_date` bigint(20) DEFAULT NULL,
  `status` varchar(200) NOT NULL,
  `estimated_cost` decimal(8,2) NOT NULL,
  `tips` decimal(8,2) NOT NULL,
  `discounts` decimal(8,2) NOT NULL,
  `where` varchar(150) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `unique_id` varchar(50) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `booking_id` int(11) NOT NULL,
  `Online` tinyint(4) DEFAULT '0',
  `package_id` bigint(20) NOT NULL,
  `cancel_take` tinyint(4) NOT NULL,
  `book_take` tinyint(4) NOT NULL,
  `class_master_id` bigint(20) NOT NULL,
  `unavailable` tinyint(4) NOT NULL,
  `coupon_claim_id` varchar(185) NOT NULL,
  `related_id` bigint(20) NOT NULL,
  `service_id` int(11) NOT NULL,
  `rebook` int(11) NOT NULL,
  `repeat_id` int(11) NOT NULL,
  `requested` int(11) NOT NULL,
  `sent_sms` int(11) NOT NULL COMMENT '0=None;1=Scheduled;2=Sent.',
  `sent_email` int(11) NOT NULL COMMENT 'sent_sms 0=None;1=Scheduled;2=Sent.',
  `sent_survey` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) DEFAULT NULL,
  `custom_user_id` varchar(200) NOT NULL,
  `custom_user_name` varchar(255) DEFAULT NULL,
  `custom_service_id` varchar(200) NOT NULL,
  `imported` int(11) NOT NULL,
  `client_confirmed` int(11) NOT NULL,
  `hold_guid` varchar(255) NOT NULL,
  `created_by_uid` int(11) NOT NULL,
  `marketing_source` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `custom_room_name` varchar(255) DEFAULT NULL,
  `custom_created_by_user_name` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  `modified_by_uid` int(11) NOT NULL,
  `sent_email_reminder` tinyint(1) NOT NULL DEFAULT '0',
  `disable_locations` int(11) NOT NULL,
  `participant_master_uid` int(11) DEFAULT '0',
  `participant_master_booking_id` int(11) NOT NULL DEFAULT '0',
  `participant_slave_uids` varchar(255) NOT NULL,
  `participant_slave_booking_ids` varchar(255) NOT NULL,
  `private` int(1) NOT NULL DEFAULT '0',
  `external_guest_ids` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `issued_to` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  `all_day` int(1) NOT NULL DEFAULT '0',
  `interlinked_master_uid` int(11) NOT NULL DEFAULT '0',
  `all_day_start_date` bigint(20) NOT NULL DEFAULT '0',
  `all_day_end_date` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `UID` (`UID`),
  KEY `start_date` (`start_date`),
  KEY `end_date` (`end_date`),
  KEY `occupier_uniqueid` (`occupier`,`unique_id`),
  KEY `related_id` (`related_id`),
  KEY `company_time` (`occupier`,`start_date`),
  KEY `room_id` (`room_id`),
  KEY `status` (`status`),
  KEY `service_id` (`service_id`),
  KEY `location_id` (`location_id`),
  KEY `resource_id` (`resource_id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `repeat_id` (`repeat_id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `create_date` (`create_date`),
  KEY `service` (`service`),
  KEY `contact_id` (`contact_id`),
  KEY `participant_master_uid` (`participant_master_uid`),
  KEY `participant_master_booking_id` (`participant_master_booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_apt_cancel`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_apt_cancel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `reason_type` varchar(200) DEFAULT NULL,
  `reason` text,
  `created_date` datetime DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL,
  `cancel_by` int(11) NOT NULL,
  `cancel_reason_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_id` (`appointment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_changelog`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_changelog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL COMMENT 'id on salon_bookings',
  `changelog` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'JSON on changes for that booking_id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_id` (`booking_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_clinics_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_clinics_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_confirmation`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_confirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `confirmation_date` datetime NOT NULL,
  `is_confirmed` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_confirmation2`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_confirmation2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `confirmation_date` datetime NOT NULL,
  `is_confirmed` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `contact_id` (`contact_id`),
  KEY `occupier` (`occupier`),
  KEY `is_confirmed` (`is_confirmed`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_external`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_external` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `max_clients` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `models_count` int(11) NOT NULL,
  `models_req_count` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `delegates` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_groups_alerts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_groups_alerts` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `CourseID` int(11) unsigned NOT NULL,
  `Note` varchar(150) NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  `Critical` int(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `CourseID` (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_groups_detailed`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_groups_detailed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `custom_contact_email` varchar(255) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `booking_id` (`booking_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_groups_detailed_backup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_groups_detailed_backup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `custom_contact_email` varchar(255) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_groups_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_groups_notes` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `CourseID` int(11) unsigned NOT NULL,
  `Note` text NOT NULL,
  `Status` enum('Enable','Disable') NOT NULL DEFAULT 'Enable',
  `CreatedDate` datetime NOT NULL,
  `IpAddress` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `CourseID` (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `old_booking_id` bigint(20) NOT NULL,
  `new_booking_id` bigint(20) NOT NULL,
  `before_startdate` bigint(20) NOT NULL,
  `before_enddate` bigint(20) NOT NULL,
  `after_startdate` bigint(20) NOT NULL,
  `after_enddate` bigint(20) NOT NULL,
  `before_status` varchar(100) NOT NULL,
  `after_status` varchar(100) NOT NULL,
  `before_service` varchar(255) NOT NULL,
  `after_service` varchar(255) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `UID` int(11) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `new_booking_id` (`new_booking_id`),
  KEY `old_booking_id` (`old_booking_id`),
  KEY `occupier` (`occupier`),
  KEY `mode` (`mode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_history_trigger`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_history_trigger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(100) DEFAULT NULL,
  `booking_id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `start_date` bigint(20) DEFAULT NULL,
  `end_date` bigint(20) DEFAULT NULL,
  `start_time` bigint(20) DEFAULT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `UID` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `backgroudcolor` varchar(255) DEFAULT NULL,
  `create_date` bigint(20) DEFAULT NULL,
  `update_date` bigint(20) DEFAULT NULL,
  `status` varchar(200) NOT NULL,
  `estimated_cost` decimal(8,2) NOT NULL,
  `tips` decimal(8,2) NOT NULL,
  `discounts` decimal(8,2) NOT NULL,
  `where` varchar(150) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `unique_id` varchar(50) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `Online` tinyint(4) DEFAULT '0',
  `package_id` bigint(20) NOT NULL,
  `cancel_take` tinyint(4) NOT NULL,
  `book_take` tinyint(4) NOT NULL,
  `class_master_id` bigint(20) NOT NULL,
  `unavailable` tinyint(4) NOT NULL,
  `coupon_claim_id` varchar(185) NOT NULL,
  `related_id` bigint(20) NOT NULL,
  `service_id` int(11) NOT NULL,
  `rebook` int(11) NOT NULL,
  `repeat_id` int(11) NOT NULL,
  `requested` int(11) NOT NULL,
  `sent_sms` int(11) NOT NULL COMMENT '0=None;1=Scheduled;2=Sent.',
  `sent_email` int(11) NOT NULL COMMENT 'sent_sms 0=None;1=Scheduled;2=Sent.',
  `sent_survey` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) DEFAULT NULL,
  `custom_user_id` int(11) NOT NULL,
  `custom_user_name` varchar(255) DEFAULT NULL,
  `custom_service_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `client_confirmed` int(11) NOT NULL,
  `hold_guid` varchar(255) NOT NULL,
  `created_by_uid` int(11) NOT NULL,
  `marketing_source` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `date_changed` datetime DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  `modified_by_uid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `UID` (`UID`),
  KEY `contact_index` (`contact_id`),
  KEY `start_date` (`start_date`),
  KEY `end_date` (`end_date`),
  KEY `occupier_uniqueid` (`occupier`,`unique_id`),
  KEY `related_id` (`related_id`),
  KEY `company_time` (`occupier`,`start_date`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` bigint(20) NOT NULL,
  `end_date` bigint(20) NOT NULL,
  `service` varchar(255) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `imported` int(11) NOT NULL,
  `taken` varchar(255) NOT NULL,
  `custom_contact_id` varchar(50) NOT NULL,
  `custom_user_id` int(11) NOT NULL,
  `create_date` varchar(255) NOT NULL,
  `custom_room_name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `Atended` varchar(255) NOT NULL,
  `CancellationReq` varchar(255) NOT NULL,
  `ReqReason` varchar(255) NOT NULL,
  `DNA` varchar(255) NOT NULL,
  `custom_created_by_user_name` varchar(255) NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `updated_date` varchar(255) NOT NULL,
  `cancel_date` varchar(255) NOT NULL,
  `noshow_date` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  `custom_service_id` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `sms_confirmation` int(11) NOT NULL,
  `sms_reminder` int(11) NOT NULL,
  `custom_type_name` varchar(255) NOT NULL,
  `custom_deposit_name` varchar(255) NOT NULL,
  `custom_subject` varchar(255) NOT NULL,
  `custom_body` varchar(255) NOT NULL,
  `custom_title` varchar(255) NOT NULL,
  `custom_title_final` text NOT NULL,
  `custom_treatment_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `custom_treatment_group_id` int(11) NOT NULL,
  `custom_treatment_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_user_id` (`custom_user_id`),
  KEY `custom_room_name` (`custom_room_name`),
  KEY `custom_user_name` (`custom_user_name`),
  KEY `custom_created_by_user_name` (`custom_created_by_user_name`),
  KEY `custom_treatment_id` (`custom_treatment_id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `start_date` (`start_date`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_invitation`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_invitation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL DEFAULT '0',
  `guest_id` int(11) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_prep_finish`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_prep_finish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `finish_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_repeats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_repeats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL,
  `start` int(10) NOT NULL,
  `end` int(10) NOT NULL,
  `repeat_start` int(10) NOT NULL,
  `repeat_end` int(10) NOT NULL,
  `day_sun` tinyint(1) unsigned NOT NULL,
  `day_mon` tinyint(1) unsigned NOT NULL,
  `day_tue` tinyint(1) unsigned NOT NULL,
  `day_wed` tinyint(1) unsigned NOT NULL,
  `day_thu` tinyint(1) unsigned NOT NULL,
  `day_fri` tinyint(1) unsigned NOT NULL,
  `day_sat` tinyint(1) unsigned NOT NULL,
  `every` tinyint(10) unsigned NOT NULL,
  `unit` char(1) NOT NULL,
  `repeat_until` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_resources`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `booking_id` (`booking_id`),
  KEY `resource_id` (`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salon_bookings_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_bookings_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text,
  `createdate` bigint(20) DEFAULT NULL,
  `updatedate` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salutations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salutations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scanner_batches`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scanner_batches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `batch_id` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `category_card` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scanner_cards`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scanner_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `card_number` bigint(20) NOT NULL,
  `date_created` datetime NOT NULL,
  `date_activated` datetime NOT NULL,
  `card_points` float NOT NULL,
  `batch_id` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `validated` int(11) NOT NULL DEFAULT '0',
  `contact_id` int(11) NOT NULL,
  `category_card` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scanner_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scanner_history` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `member_id` int(11) NOT NULL,
  `type` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `sales_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scanner_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scanner_settings` (
  `occupier` int(11) NOT NULL,
  `defaultpoints` int(11) NOT NULL,
  `rule1` int(11) NOT NULL,
  `rule1occurance` int(11) NOT NULL,
  `rule1campaign` text NOT NULL,
  `rule2` int(11) NOT NULL,
  `rule2occurance` text NOT NULL,
  `rule2campaign` text NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedule_invoice_template`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_invoice_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sch_inv_temp_dtl_id` int(11) DEFAULT NULL,
  `interval_type` tinyint(4) DEFAULT NULL,
  `day` varchar(20) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `time` int(11) NOT NULL,
  `duration` tinyint(4) DEFAULT NULL,
  `occurance` int(11) DEFAULT '0',
  `end_after_occurrences` int(11) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedule_invoice_template_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_invoice_template_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(500) DEFAULT NULL,
  `template_type` tinyint(4) DEFAULT NULL,
  `terms` tinyint(4) DEFAULT NULL,
  `all_amounts_are` tinyint(4) DEFAULT NULL,
  `is_vat` int(11) DEFAULT '0',
  `discount` decimal(10,2) DEFAULT NULL,
  `customer_message` text,
  `memo` text,
  `to_be_emailed` int(11) DEFAULT '1',
  `occupier` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedule_invoice_template_product_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_invoice_template_product_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sch_inv_temp_dtl_id` int(11) DEFAULT NULL,
  `invoice_to` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `description` text,
  `qty` int(11) DEFAULT NULL,
  `unite_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scheduler`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `subject` varchar(70) NOT NULL,
  `sentby` varchar(60) NOT NULL,
  `source` varchar(100) NOT NULL,
  `to` varchar(100) NOT NULL,
  `companyid` int(255) NOT NULL,
  `email_by` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `date` int(50) NOT NULL,
  `communication_type` varchar(30) NOT NULL,
  `contact_id` int(100) NOT NULL,
  `site_section` varchar(50) NOT NULL,
  `sch_date` int(50) NOT NULL,
  `sch_time` int(50) NOT NULL,
  `the_status` varchar(100) NOT NULL,
  `template_id` bigint(20) NOT NULL,
  `relate_id` int(11) NOT NULL,
  `unique_id` varchar(50) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `companyid` (`companyid`),
  KEY `templateid` (`template_id`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scheduler_backup`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler_backup` (
  `id` bigint(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `subject` varchar(70) NOT NULL,
  `sentby` varchar(60) NOT NULL,
  `source` varchar(100) NOT NULL,
  `to` varchar(100) NOT NULL,
  `companyid` int(255) NOT NULL,
  `email_by` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `date` int(50) NOT NULL,
  `communication_type` varchar(30) NOT NULL,
  `contact_id` int(100) NOT NULL,
  `site_section` varchar(50) NOT NULL,
  `sch_date` int(50) NOT NULL,
  `sch_time` int(50) NOT NULL,
  `the_status` varchar(100) NOT NULL,
  `template_id` bigint(20) NOT NULL,
  `relate_id` int(11) NOT NULL,
  `unique_id` varchar(50) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `selected_profiles_compose_message`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `selected_profiles_compose_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `main` text COLLATE utf8_unicode_ci NOT NULL,
  `other` text COLLATE utf8_unicode_ci NOT NULL,
  `uid` bigint(20) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seller`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seller` (
  `sellerid` int(100) NOT NULL AUTO_INCREMENT,
  `start` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `halls` varchar(255) NOT NULL,
  `number` varchar(20) NOT NULL,
  `fbid` varchar(255) NOT NULL,
  `Block` varchar(50) NOT NULL,
  `year` int(11) NOT NULL,
  `occupier` varchar(20) NOT NULL,
  `university` varchar(20) NOT NULL,
  `visible` int(1) NOT NULL,
  `job_title` varchar(48) NOT NULL,
  PRIMARY KEY (`sellerid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seller_pay`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seller_pay` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Seller Wage Id',
  `visible` int(11) NOT NULL COMMENT 'Old Wage',
  `uid` bigint(20) NOT NULL COMMENT 'Sellers ID',
  `amount` float(6,2) NOT NULL COMMENT 'Hourly Wage',
  `timestampe` bigint(20) NOT NULL COMMENT 'Timestamp Of Change',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `server_urls`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `order` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `service_product_loyalty`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_product_loyalty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `service_reminders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id` int(11) NOT NULL,
  `email_reminder_id` int(11) NOT NULL,
  `sms_reminder_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `services_master_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_master_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `ord` int(11) NOT NULL DEFAULT '0',
  `type` enum('SERVICE','PRODUCT') NOT NULL DEFAULT 'SERVICE',
  `image` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_packages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_packages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `session_count` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `price` decimal(25,2) NOT NULL,
  `activities` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `imported` int(11) NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` int(11) NOT NULL,
  `product_id` int(11) NOT NULL DEFAULT '0',
  `service_product_id` int(11) NOT NULL,
  `hard_deleted` int(11) NOT NULL,
  `session_package_master_id` int(11) NOT NULL,
  `tax_id` int(11) NOT NULL,
  `custom_service_name` varchar(255) NOT NULL,
  `custom_price_item` decimal(18,2) NOT NULL,
  `empty_name` int(11) NOT NULL,
  `old_price` decimal(18,2) NOT NULL,
  `old_duration` varchar(100) NOT NULL,
  `disabledusers` text NOT NULL,
  `sold_online` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `company_id` (`occupier`),
  KEY `service_product_id` (`service_product_id`),
  KEY `session_package_master_id` (`session_package_master_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_packages_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_packages_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `share_image`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_url` text NOT NULL,
  `passcode` varchar(8) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `share_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `site_widget_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_widget_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `classes` int(2) NOT NULL,
  `online_store` int(2) NOT NULL,
  `appointments` int(2) NOT NULL,
  `loyalty` int(2) NOT NULL,
  `dashboard` int(2) NOT NULL,
  `takeaway` int(11) NOT NULL,
  `tablebooking` int(11) NOT NULL,
  `guestlist` int(11) NOT NULL,
  `opening` int(5) NOT NULL,
  `callus` int(5) NOT NULL,
  `website` int(5) NOT NULL,
  `location` int(5) NOT NULL,
  `your_cuts` int(11) NOT NULL,
  `documents` int(11) NOT NULL,
  `refer` int(11) NOT NULL,
  `package_history` tinyint(4) NOT NULL,
  `lab_history` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `slow_query_raw`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slow_query_raw` (
  `query_id` int(11) NOT NULL AUTO_INCREMENT,
  `sql_text` longtext NOT NULL,
  `db` text NOT NULL,
  `server_host` varchar(255) NOT NULL,
  `request_uri` text NOT NULL,
  `get_data` text NOT NULL,
  `post_data` text NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `query_time` varchar(100) NOT NULL,
  PRIMARY KEY (`query_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_blacklist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_blacklist` (
  `sms_id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_number` varchar(50) NOT NULL,
  `sms_action` varchar(8) NOT NULL,
  `notify_company` int(11) NOT NULL,
  PRIMARY KEY (`sms_id`),
  UNIQUE KEY `email_address` (`sms_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_campaign`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_campaign` (
  `sms_id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_campaign_name` varchar(100) NOT NULL DEFAULT 'Untitled Campaign',
  `create_date` datetime NOT NULL,
  `from_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `company` int(5) NOT NULL,
  `list_id` int(11) NOT NULL,
  `campaign_type` varchar(30) NOT NULL,
  `groups_recipients` varchar(255) NOT NULL,
  `sent_by` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `groups_prerecipients` varchar(255) NOT NULL,
  `campaign_status` varchar(100) NOT NULL,
  `send_date` datetime NOT NULL,
  `gift_voucher` varchar(11) NOT NULL,
  `gift_expiry` int(11) NOT NULL,
  `total_recips` int(11) NOT NULL,
  `weblink` varchar(255) NOT NULL,
  `campaign_cost` decimal(8,2) NOT NULL,
  `all_products_services` int(11) NOT NULL,
  `finished_date` datetime NOT NULL,
  PRIMARY KEY (`sms_id`),
  KEY `campaign_status` (`campaign_status`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_campaign_list`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_campaign_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_campaign_id` int(11) NOT NULL,
  `sms_group_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `communication_log_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `communication_log_id` (`communication_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_campaign_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_campaign_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_campaign_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `related_type` varchar(255) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sms_campaign_id` (`sms_campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_delivery`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_delivery` (
  `smsd_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `smsd_number` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `smsd_status` varchar(10) NOT NULL,
  `smsd_cid` varchar(255) NOT NULL,
  `smsd_customID` varchar(255) NOT NULL,
  `error_code` int(11) NOT NULL,
  PRIMARY KEY (`smsd_id`),
  KEY `smsd_cid` (`smsd_cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_group_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_group_log` (
  `smsg_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `smsg_statsid` bigint(20) NOT NULL,
  `smsg_groupid` bigint(20) NOT NULL,
  PRIMARY KEY (`smsg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_groups` (
  `sms_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sms_uid` bigint(20) NOT NULL,
  `sms_group` varchar(32) NOT NULL,
  `sms_number` varchar(128) NOT NULL,
  `sms_blank` int(11) NOT NULL COMMENT 'Number of Blank Lines Removed',
  `sms_dup` int(11) NOT NULL COMMENT 'Number of Duplicates Removed',
  `sms_delete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sms_id`),
  KEY `sms_uid` (`sms_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_groups_list`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_groups_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_group_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `mobile_number` varchar(100) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sms_group_id_2` (`sms_group_id`,`mobile_number`,`occupier`),
  KEY `mobile_number` (`mobile_number`),
  KEY `sms_group_id` (`sms_group_id`),
  KEY `occupier` (`occupier`),
  KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_inbox`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_inbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `number` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `action` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_purchases`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` int(11) NOT NULL,
  `sms_amount` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `profit` decimal(8,2) NOT NULL,
  `purchase_type` varchar(8) NOT NULL,
  `status` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_senders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_senders` (
  `smsd_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `smsd_name` varchar(12) NOT NULL,
  `smsd_cid` bigint(20) NOT NULL,
  `smsd_delete` int(11) NOT NULL DEFAULT '0',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `merge_tags` text NOT NULL,
  PRIMARY KEY (`smsd_id`),
  KEY `smsd_cid` (`smsd_cid`),
  KEY `smsd_delete` (`smsd_delete`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_stats`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_stats` (
  `smss_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Sms Stats Unique ID',
  `smss_uid` bigint(20) NOT NULL COMMENT 'Unique User ID',
  `smss_camp` varchar(64) NOT NULL COMMENT 'Sms Stats Campaign Name',
  `smss_time` varchar(16) NOT NULL COMMENT 'Time of Excecution',
  `smss_count` bigint(20) NOT NULL COMMENT 'Total Sms''s sent',
  PRIMARY KEY (`smss_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_temp_table`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_temp_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `sent_sms` int(5) NOT NULL,
  `status` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_test`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `response` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `social_survey`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_survey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` bigint(100) NOT NULL,
  `company` int(11) NOT NULL,
  `twitter_id` bigint(200) NOT NULL,
  `disable_email` int(11) NOT NULL,
  `disable_sms` int(11) NOT NULL,
  `sms_message_id` int(11) NOT NULL,
  `from_name` varchar(12) NOT NULL,
  `sms_days_after` int(11) DEFAULT NULL,
  `sms_send_time` varchar(100) DEFAULT NULL,
  `feedback_title` varchar(100) NOT NULL,
  `feedback_subtitle` text NOT NULL,
  `feedback_question` text NOT NULL,
  `auto_facebook` int(11) NOT NULL,
  `auto_twitter` int(11) NOT NULL,
  `after_page` varchar(100) NOT NULL,
  `google_plus_link` varchar(255) NOT NULL,
  `google_review` tinyint(4) NOT NULL DEFAULT '0',
  `google_review_url` varchar(255) NOT NULL,
  `aweber_code` text NOT NULL,
  `score_indicator` int(11) NOT NULL,
  `add_note` int(11) NOT NULL,
  `post_buzzfeed` int(11) NOT NULL DEFAULT '1',
  `post_website` int(11) NOT NULL,
  `email_message_id` int(11) NOT NULL,
  `redirect_url` varchar(255) NOT NULL,
  `feedback_name` varchar(20) NOT NULL,
  `ty_enable_email` int(11) NOT NULL,
  `ty_enable_sms` int(11) NOT NULL,
  `ty_email_id` int(11) NOT NULL,
  `ty_sms_id` int(11) NOT NULL,
  `color_1` varchar(20) NOT NULL DEFAULT '#52acca',
  `color_2` varchar(20) NOT NULL DEFAULT '#61b7d4',
  `google_review_redirect` int(11) NOT NULL DEFAULT '0',
  `show_reviews_above` float NOT NULL,
  `logo_position` varchar(255) NOT NULL,
  `logo_height` int(11) DEFAULT NULL,
  `hits` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `social_survey_answers`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_survey_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feedback_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feedback_id` (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `social_survey_feedback`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_survey_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `feedback_source` varchar(100) NOT NULL,
  `company` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `feedback_comment` text CHARACTER SET utf8mb4 NOT NULL,
  `feedback_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `feedback_status` varchar(25) CHARACTER SET utf8mb4 NOT NULL,
  `related_id` int(11) NOT NULL,
  `related_to` varchar(100) NOT NULL,
  `feedback_for` int(11) NOT NULL,
  `service` varchar(100) NOT NULL,
  `public_use` tinyint(4) NOT NULL DEFAULT '1',
  `service_id` int(11) NOT NULL,
  `owner_response` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`),
  KEY `related_id` (`related_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `social_survey_questions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_survey_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `solutions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solutions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `IpAddress` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spam_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spam_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `reason` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `date` int(20) NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sql_failed_transactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sql_failed_transactions` (
  `fail_id` int(11) NOT NULL AUTO_INCREMENT,
  `request_uri` text NOT NULL,
  `get_data` text NOT NULL,
  `post_data` text NOT NULL,
  `sql_query` text NOT NULL,
  `resp_array` text NOT NULL,
  PRIMARY KEY (`fail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_application_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_application_settings` (
  `occupier` int(11) NOT NULL,
  `staff_rotta_setting_mode` int(11) NOT NULL,
  `staff_rotta_setting_password` text NOT NULL,
  `staff_clockin_setting_mode` int(11) NOT NULL,
  `staff_clockin_setting_password` text NOT NULL,
  `staff_clockin_setting_location` text NOT NULL,
  `staff_clockin_setting_message` text NOT NULL,
  `staff_manager_setting_mode` int(11) NOT NULL,
  `staff_manager_setting_password` text NOT NULL,
  `staff_manager_setting_location` text NOT NULL,
  `staff_manager_setting_message` text NOT NULL,
  `staff_clockin_setting_manualt` int(10) NOT NULL,
  `staff_clockin_setting_ccontact` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_categories_targets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_categories_targets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `value` varchar(500) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_hours_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_hours_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day_name` varchar(100) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `slider_openning` int(11) DEFAULT NULL,
  `closing_hours` varchar(100) DEFAULT NULL,
  `slider_closing` int(11) DEFAULT NULL,
  `closed` tinyint(4) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_limit_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_limit_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day_name` varchar(150) DEFAULT NULL,
  `min_value` int(11) DEFAULT NULL,
  `max_value` int(11) DEFAULT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_meta`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `meta_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `meta_value` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`staff_id`,`meta_name`,`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `staff_id` (`staff_id`,`meta_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_performance_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_performance_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `enabled` int(2) NOT NULL,
  `frequency` varchar(10) NOT NULL,
  `excluded_users` varchar(255) NOT NULL,
  `LastSent` date NOT NULL,
  `end_week` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_profiles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_profiles` (
  `sellerid` int(11) NOT NULL AUTO_INCREMENT,
  `start` date NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `number` varchar(20) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `occupier` varchar(20) NOT NULL,
  `visible` int(1) NOT NULL,
  `job_title` varchar(48) NOT NULL,
  `birthdate` date NOT NULL,
  `city` varchar(50) NOT NULL,
  `postcode` varchar(8) NOT NULL,
  `country` varchar(30) NOT NULL,
  `homephone` varchar(20) NOT NULL,
  `workphone` varchar(20) NOT NULL,
  `manager` int(11) NOT NULL,
  PRIMARY KEY (`sellerid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_service_commission`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_service_commission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL DEFAULT '0',
  `staff_id` int(11) NOT NULL,
  `commission` decimal(8,2) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `service_id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staff_id`),
  KEY `service_id` (`service_id`),
  KEY `quote_id` (`quote_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_shift_roles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_shift_roles` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `role_cid` bigint(20) NOT NULL COMMENT 'Company ID',
  `role_name` varchar(32) NOT NULL COMMENT 'Shift role name',
  `role_colour` varchar(7) DEFAULT NULL,
  `role_delete` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_shifts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_shifts` (
  `ss_uid` bigint(20) NOT NULL AUTO_INCREMENT,
  `ss_sid` bigint(20) NOT NULL,
  `ss_sweek` varchar(10) NOT NULL,
  `ss_start` int(11) NOT NULL DEFAULT '0',
  `ss_duration` int(11) NOT NULL DEFAULT '3600',
  `ss_rate` float(6,2) NOT NULL DEFAULT '0.00',
  `ss_added` int(11) NOT NULL,
  `ss_role` bigint(20) NOT NULL COMMENT 'staff_shift_role.role_id',
  PRIMARY KEY (`ss_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_shifts_new`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_shifts_new` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `staff_id` bigint(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `ss_rate` float NOT NULL,
  `staff_role_id` bigint(20) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `occupier` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_targets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_targets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` varchar(100) NOT NULL,
  `retail_sales` decimal(10,0) NOT NULL,
  `service_sales` decimal(10,0) NOT NULL,
  `new_clients` decimal(10,0) NOT NULL,
  `utilization` decimal(10,0) NOT NULL,
  `UID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_page`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_page` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stencil`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stencil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `stencil_order` int(10) NOT NULL,
  `angle` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stripe_events`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stripe_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `date` datetime NOT NULL,
  `event_data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stripe_transactions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stripe_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `currency` varchar(3) NOT NULL,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0=Failed;1=Success;2=Refund',
  `amount_after_fee` decimal(8,2) NOT NULL,
  `charge_id` varchar(200) DEFAULT NULL,
  `payment_intent_id` varchar(191) DEFAULT NULL,
  `error_code` varchar(191) DEFAULT NULL,
  `reciever` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 is Pabau, 1 is Company',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supplier_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supplier_details`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `other_name_1` varchar(100) NOT NULL,
  `other_name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `support_guides`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `support_guides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suspended_bills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suspended_bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `tax1` float(25,2) NOT NULL,
  `tax2` float(25,2) NOT NULL,
  `total` float(25,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suspended_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suspended_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suspend_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(55) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_unit` varchar(50) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `tax` varchar(55) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(25,2) NOT NULL,
  `gross_total` decimal(25,2) NOT NULL,
  `val_tax` decimal(25,2) NOT NULL,
  `staff_purchase` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tab_bills`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tab_bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `table_no` varchar(100) DEFAULT NULL,
  `count` int(11) NOT NULL,
  `tax1` float(25,2) NOT NULL,
  `tax2` float(25,2) NOT NULL,
  `total` float(25,2) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tab_items`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tab_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suspend_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(55) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_unit` varchar(50) NOT NULL,
  `tax_rate_id` int(11) NOT NULL,
  `tax` varchar(55) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(25,2) NOT NULL,
  `gross_total` decimal(25,2) NOT NULL,
  `val_tax` decimal(25,2) NOT NULL,
  `staff_purchase` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `table_views`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL COMMENT 'Which source uses the view',
  `name` varchar(150) NOT NULL,
  `columns` text NOT NULL COMMENT 'JSON string of selected columns',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tanning_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tanning_history` (
  `trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` int(20) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `type` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `sales_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`trans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tanning_pro`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tanning_pro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(8,2) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_manager`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_owner` int(11) DEFAULT NULL,
  `subject` text,
  `due_date` date DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `module_type` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `lead_id` int(11) DEFAULT NULL COMMENT '`cm_leads` ID',
  `module2_type` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `send_notification_email` varchar(4) DEFAULT NULL,
  `recurring_activity` varchar(4) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `repeat_type` bigint(4) DEFAULT NULL,
  `description` text,
  `occupier` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `closed_date` int(11) NOT NULL,
  `nhs_patient_id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `notify_on_complete` tinyint(1) NOT NULL DEFAULT '0',
  `imported` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `task_owner` (`task_owner`),
  KEY `occupier` (`occupier`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_manager_lists`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_manager_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `by_uid` int(11) NOT NULL,
  `uid` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `task_targets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_targets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `target_type` varchar(100) NOT NULL,
  `target_number` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `target_name` varchar(150) NOT NULL,
  `from_date` varchar(100) NOT NULL,
  `to_date` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tax_disabled_locations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tax_disabled_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_id` (`tax_id`,`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tax_disabled_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tax_disabled_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_id` (`tax_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tax_disabled_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tax_disabled_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_id` (`tax_id`,`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tax_disabled_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tax_disabled_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tax_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tax_id` (`tax_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taxes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taxes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `value` varchar(32) NOT NULL,
  `rate` decimal(18,2) NOT NULL,
  `hidden` int(1) NOT NULL DEFAULT '0',
  `default` int(1) NOT NULL DEFAULT '0',
  `occupier` int(5) NOT NULL,
  `custom_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_contract_images`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_contract_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) NOT NULL,
  `image` text NOT NULL,
  `signed_contract_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_contract_signatures`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_contract_signatures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) NOT NULL,
  `signature_title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_contracts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_contracts` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `OwnerID` varchar(100) NOT NULL,
  `contract_title` varchar(255) NOT NULL,
  `contract_description` text NOT NULL,
  `contract_signature` text NOT NULL,
  `create_date_time` datetime NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `number_signatures` int(11) NOT NULL,
  `show_logo` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `related_items` varchar(255) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_module_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_module_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) DEFAULT NULL,
  `field_name` varchar(300) DEFAULT NULL,
  `field_label` varchar(500) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_module_fields_setting`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_module_fields_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) DEFAULT NULL,
  `field_name` varchar(300) DEFAULT NULL,
  `field_label` varchar(500) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `is_required` tinyint(4) NOT NULL,
  `occupier` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `is_required` (`is_required`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_signed_contracts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_signed_contracts` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `contract_id` int(30) NOT NULL,
  `contract_signature` text NOT NULL,
  `contract_status` int(30) NOT NULL DEFAULT '0',
  `update_date_time` datetime NOT NULL,
  `create_date_time` datetime NOT NULL,
  `contact_id` int(11) NOT NULL,
  `contract_signature2` text NOT NULL,
  `booking_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_master` (
  `teach_id` int(11) NOT NULL AUTO_INCREMENT,
  `teach_name` varchar(256) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`teach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `technical_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `technical_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` int(11) NOT NULL,
  `last_edit` int(11) NOT NULL,
  `notes` text NOT NULL,
  `uid` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temp_ivan`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temp_ivan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_id` int(11) NOT NULL,
  `second_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `first_id` (`first_id`),
  KEY `second_id` (`second_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `template_folders`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_folders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `folder_name` varchar(255) NOT NULL,
  `folder_description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `template_sample_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_sample_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `template_id` int(11) NOT NULL,
  `treatment_description` varchar(100) NOT NULL,
  `treatment_category` varchar(50) NOT NULL,
  `form_type` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `template_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `template_type` varchar(100) NOT NULL,
  `css_name` varchar(255) NOT NULL,
  `css_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` longtext,
  `preview` varchar(255) DEFAULT NULL,
  `fields` longtext,
  `parse_css` tinyint(1) NOT NULL DEFAULT '0',
  `fields_array` longtext,
  `comment_array` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='templatescol';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temporary_token`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temporary_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `test_creation_date`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_creation_date` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `test_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `theatre_list`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theatre_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `theatre_date` date NOT NULL,
  `tci_datetime` datetime NOT NULL,
  `admission` varchar(20) NOT NULL,
  `room` varchar(100) NOT NULL,
  `anesthetist` varchar(100) NOT NULL,
  `discharged` datetime NOT NULL,
  `comments` text NOT NULL,
  `session` int(11) NOT NULL,
  `episode` varchar(20) NOT NULL,
  `code` text NOT NULL,
  `indications` varchar(200) NOT NULL,
  `duration` int(11) NOT NULL,
  `ord` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `theatre_list_anesthetists`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theatre_list_anesthetists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `theatre_list_date_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theatre_list_date_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `anesthetist_id` int(11) NOT NULL,
  `start_time` varchar(10) NOT NULL,
  `end_time` varchar(10) NOT NULL,
  `notes` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`,`anesthetist_id`),
  KEY `anesthetist_id` (`anesthetist_id`),
  CONSTRAINT `theatre_list_date_settings_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `theatre_list_hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `theatre_list_date_settings_ibfk_2` FOREIGN KEY (`anesthetist_id`) REFERENCES `theatre_list_anesthetists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='date';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `theatre_list_hospitals`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `theatre_list_hospitals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `ticketid` int(20) NOT NULL AUTO_INCREMENT,
  `price` float(8,2) NOT NULL,
  `email` varchar(200) NOT NULL,
  `isvalid` varchar(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `eventid` int(10) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `occupier` varchar(50) NOT NULL,
  `STATUS` varchar(255) NOT NULL,
  `ticket_type` bigint(255) NOT NULL,
  PRIMARY KEY (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_events`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_events` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `eventid` int(11) NOT NULL,
  `ticket_type` int(50) NOT NULL,
  `sold` int(11) NOT NULL,
  `available_tickets` int(255) NOT NULL,
  `deleted` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eventid` (`eventid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_type_name` varchar(100) NOT NULL,
  `ticket_price` float(10,2) NOT NULL,
  `ticket_description` varchar(500) NOT NULL,
  `tickets_available` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `deleted` int(5) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tiles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `category` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timezone`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timezone` (
  `timezone_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(48) NOT NULL,
  `php_format` varchar(48) NOT NULL,
  `db_format` varchar(48) NOT NULL,
  `offset_seconds` int(11) NOT NULL,
  `supported` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`timezone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tm_subtasks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_subtasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `task_name` varchar(50) NOT NULL COMMENT 'name of the task',
  `task_description` text NOT NULL,
  `delivery_date` int(11) NOT NULL,
  `payments` varchar(100) NOT NULL,
  `assigned_to` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tmax_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tmax_jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company` int(10) unsigned NOT NULL,
  `date_added` datetime NOT NULL,
  `slot` int(11) NOT NULL COMMENT 'The slot number to turn on',
  `delay` int(11) NOT NULL COMMENT 'time in mins to delay before turning the bed on',
  `time` int(11) NOT NULL COMMENT 'time in mins to run the slot on for',
  PRIMARY KEY (`id`),
  KEY `company` (`company`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tokens`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `uid` int(11) NOT NULL,
  `push_token` varchar(255) NOT NULL,
  `deviceos` varchar(100) NOT NULL,
  PRIMARY KEY (`uid`,`push_token`),
  KEY `uid_token_idx` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tourbuilder`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tourbuilder` (
  `uid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `status1` int(11) NOT NULL DEFAULT '1',
  `status2` int(11) NOT NULL DEFAULT '1',
  `status3` int(11) NOT NULL DEFAULT '1',
  `status4` int(11) NOT NULL DEFAULT '1',
  `status5` int(11) NOT NULL DEFAULT '1',
  `status6` int(11) NOT NULL DEFAULT '1',
  `status7` int(11) NOT NULL DEFAULT '1',
  `status8` int(11) NOT NULL DEFAULT '1',
  `status9` int(11) NOT NULL DEFAULT '1',
  `status10` int(11) NOT NULL DEFAULT '1',
  `status11` int(11) NOT NULL DEFAULT '1',
  `status12` int(11) NOT NULL DEFAULT '1',
  `status13` int(11) NOT NULL DEFAULT '1',
  `status14` int(11) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_course`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) NOT NULL,
  `course_tag` varchar(50) NOT NULL,
  `custom_field_id` int(2) NOT NULL,
  `duration` int(10) NOT NULL,
  `description` text NOT NULL,
  `premium` int(2) NOT NULL,
  `encore` int(2) NOT NULL,
  `category` varchar(60) DEFAULT 'Getting Started',
  `difficulty` enum('Beginner','Advanced','Pro') NOT NULL DEFAULT 'Beginner',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_course_bookings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_course_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `webinar_id` int(255) NOT NULL,
  `course_date` datetime NOT NULL,
  `trainer` varchar(20) NOT NULL,
  `encore` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `train_course_dates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `train_course_dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'id from users',
  `company_id` int(11) NOT NULL,
  `status` enum('0','1') NOT NULL COMMENT 'Is completed?',
  `course_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `training_guides`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `training_guides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `category` enum('GETTING_STARTED','SETTING','EVERYDAY_USE') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `training_guides_completion`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `training_guides_completion` (
  `user_id` int(11) NOT NULL,
  `training_id` int(11) NOT NULL,
  `date_completed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `user_id` (`training_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `training_prices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `training_prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addon_order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `training_titles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `training_titles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `category` varchar(250) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `occupier` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `treatment_notes_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_notes_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_appt_id` int(11) NOT NULL,
  `custom_contact_email` varchar(255) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `Subject` varchar(255) NOT NULL,
  `Note` text NOT NULL,
  `created_date` datetime NOT NULL,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `old_id` int(11) NOT NULL,
  `old_note` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Fname` (`Fname`),
  KEY `custom_user_name` (`custom_user_name`),
  KEY `old_id` (`old_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `treatment_plans`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `form_contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `plan_data` text NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `status` enum('OPEN','COMPLETE') NOT NULL DEFAULT 'OPEN',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `treatment_sample_templates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_sample_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `treatment_template_id` int(11) NOT NULL,
  `treatment_description` varchar(100) NOT NULL,
  `treatment_category` varchar(50) NOT NULL,
  `form_type` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `treatment_summary`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treatment_summary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `treatment_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `number_of_measures` decimal(8,2) NOT NULL,
  `numbers_of_injects` int(11) NOT NULL,
  `batch_number` varchar(50) NOT NULL,
  `expiry_date` date NOT NULL,
  `other` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trial_mode`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trial_mode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` int(11) NOT NULL,
  `date_tracked` datetime NOT NULL,
  `trial_tracked` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trusted_browser`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trusted_browser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `browser_stamp` varchar(200) NOT NULL,
  `country` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `ip_address` varchar(15) NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'The ID of the user who authorized',
  `is_authorized` tinyint(1) NOT NULL DEFAULT '0',
  `authorization_hash` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tutorial_system`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorial_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `tutorial_section` varchar(100) NOT NULL,
  `tutorial_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tutorials`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tutorial_name` varchar(100) NOT NULL,
  `video_id` varchar(255) NOT NULL COMMENT 'this is courses.id',
  `section` varchar(50) NOT NULL COMMENT 'The tutorial type (or page)',
  `tutorial_order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `uk_city`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uk_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_prefix` varchar(5) NOT NULL,
  `city_name` varchar(30) NOT NULL,
  `company_id` int(11) NOT NULL,
  `nearest_clinic` varchar(50) NOT NULL,
  `assign_to_name` varchar(100) NOT NULL,
  `nearest_clinic_2` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unit_purchase`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit_purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p_id` int(11) NOT NULL,
  `product_id` varchar(256) NOT NULL,
  `product_price` decimal(25,2) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `customer_id` int(100) DEFAULT NULL,
  `currency` varchar(256) DEFAULT NULL,
  `date` varchar(256) DEFAULT NULL,
  `comp_id` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unsubscribe_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unsubscribe_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `activity` varchar(10) NOT NULL,
  `activity_date` datetime NOT NULL,
  `sub_status` int(2) NOT NULL,
  `contact_id_type` enum('CONTACT','LEAD') NOT NULL DEFAULT 'CONTACT',
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `url_shortener`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_shortener` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shortcode` varchar(100) NOT NULL,
  `full_url` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `clicks` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `url_tracking`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_tracking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `sms_campaign_id` int(11) NOT NULL,
  `hits` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `url_tracking_hits`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_tracking_hits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `sms_campaign_id` int(11) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sms_campaign_id` (`sms_campaign_id`),
  KEY `mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_activities_likes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_activities_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `actid` int(11) NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `actid` (`actid`),
  KEY `actid_user` (`actid`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_activities_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_activities_log` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `accessId` int(11) unsigned NOT NULL,
  `type` varchar(100) NOT NULL,
  `template` varchar(500) NOT NULL,
  `time` int(11) unsigned NOT NULL,
  `status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `ipAddress` int(11) unsigned NOT NULL,
  `pabau_annoucement` int(11) NOT NULL,
  `location_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `fetch_activity` (`company`,`time`),
  KEY `user_specific` (`userId`,`time`),
  KEY `company_type` (`company`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_activities_log_tz`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_activities_log_tz` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned NOT NULL,
  `company` int(10) unsigned NOT NULL,
  `accessId` int(11) unsigned NOT NULL,
  `type` varchar(100) NOT NULL,
  `template` varchar(500) NOT NULL,
  `time` int(11) unsigned NOT NULL,
  `time_tz` timestamp NULL DEFAULT NULL,
  `status` enum('Enable','Disable','Delete') NOT NULL DEFAULT 'Enable',
  `ipAddress` int(11) unsigned NOT NULL COMMENT 'INET_NTOA to decode',
  PRIMARY KEY (`ID`),
  KEY `fetch_activity` (`company`,`time`),
  KEY `user_specific` (`userId`,`time`),
  KEY `company_type` (`company`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_alerts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `email_template_id` int(11) NOT NULL,
  `ios_message` varchar(255) NOT NULL,
  `sms_message` varchar(255) NOT NULL,
  `pabau_message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_alerts_cc`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_alerts_cc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `cc_name` varchar(255) NOT NULL,
  `cc_email` varchar(255) NOT NULL,
  `cc_phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_alerts_permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_alerts_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `alert_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `ios_notification` int(2) NOT NULL,
  `email_notification` int(2) NOT NULL,
  `sms_notification` int(2) NOT NULL,
  `pabau_notification` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_availability`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_availability` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `break` int(11) DEFAULT NULL,
  `start_break` time DEFAULT NULL,
  `end_break` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_available_times`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_available_times` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user` bigint(20) NOT NULL,
  `occupier` int(11) NOT NULL,
  `date` date NOT NULL,
  `day` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `location_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `date` (`date`),
  KEY `location_id` (`location_id`),
  KEY `start_time` (`start_time`),
  KEY `occupier` (`occupier`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_contact_access`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_contact_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `access_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_default_views`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_default_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `custom_notes` int(11) NOT NULL DEFAULT '0',
  `appointments` enum('ALL','UPCOMING','HISTORY','CANCELLED','NOSHOW','CYCLES') NOT NULL DEFAULT 'ALL',
  `default_cal_user` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_detail`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_detail` (
  `userId` int(11) NOT NULL,
  `about` varchar(1000) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_failed_login`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_failed_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `hash` varchar(100) NOT NULL,
  `hash_algor` int(11) unsigned NOT NULL DEFAULT '1',
  `attempt_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_group_members`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_groups`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `group_description` text NOT NULL,
  `restrict_clients` int(11) NOT NULL,
  `restrict_locations` varchar(255) NOT NULL,
  `restrict_calendar` tinyint(4) NOT NULL DEFAULT '1',
  `restrict_data` tinyint(4) NOT NULL,
  `limit_contacts` tinyint(4) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_leads_access`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_leads_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lead_id` int(11) NOT NULL,
  `access_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`lead_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_main_permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_main_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `delete_alert_notes` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_master`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(250) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `country` varchar(250) NOT NULL,
  `postalcode` varchar(250) NOT NULL,
  `prefloc` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `pass` varchar(250) NOT NULL,
  `oauth_provider` varchar(250) NOT NULL,
  `oauth_id` varchar(256) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enc_key` varchar(250) NOT NULL,
  `pic` varchar(256) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `last_login` datetime NOT NULL,
  `is_suspended` tinyint(1) NOT NULL DEFAULT '0',
  `session_hash` char(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `email` (`email`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_master_password_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_master_password_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `user_master_id` int(11) NOT NULL,
  `pass` varchar(250) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_mobile_permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_mobile_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `cal` int(11) NOT NULL DEFAULT '1' COMMENT '0=Disable;1=All;2=Own;',
  `reviews` int(11) NOT NULL DEFAULT '1',
  `reports` int(11) NOT NULL DEFAULT '1',
  `contacts` int(11) NOT NULL DEFAULT '1' COMMENT '0=None;1=All;2=Own',
  `journey` int(11) NOT NULL DEFAULT '1',
  `register` int(11) NOT NULL DEFAULT '1',
  `dashboard` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_notes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `added_by` int(11) NOT NULL,
  `date` date NOT NULL,
  `date_added` datetime NOT NULL,
  `updated_by` int(11) NOT NULL,
  `date_updated` datetime NOT NULL,
  `rota_id` int(11) NOT NULL,
  `note_color` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_notes_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_notes_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_user_id` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `date` datetime NOT NULL,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_old_password`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_old_password` (
  `user_old_password_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hash` varchar(255) CHARACTER SET latin1 NOT NULL,
  `hash_algor` int(11) NOT NULL DEFAULT '1',
  `salt` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_old_password_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_old_passwords`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_old_passwords` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_permissions`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `user` int(5) NOT NULL,
  `page` int(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `page` (`page`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_products`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount_tier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_reports`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `report_id` (`report_id`),
  KEY `occupier` (`occupier`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_requests`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_requests` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `date` date NOT NULL,
  `company` int(11) NOT NULL,
  `hash` varchar(50) NOT NULL,
  `job_title` varchar(20) NOT NULL,
  `department` varchar(20) NOT NULL,
  `division` varchar(20) NOT NULL,
  `template` int(11) NOT NULL,
  `admin` int(11) NOT NULL,
  `staff_manager` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_security_questions_answer`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_security_questions_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `question` varchar(15) NOT NULL,
  `question_no` int(3) NOT NULL COMMENT 'question_no is key of array declared in TwoFactorAuth.php',
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_security_questions_answer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_targets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_targets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `indicator_id` int(11) NOT NULL,
  `date` datetime NOT NULL COMMENT 'Time this sample was taken',
  `value` int(11) NOT NULL COMMENT 'Expected values: 1-5',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='created by JC 22.04.16 - for Adam - stores hourly samples of target values';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_tracking`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tracking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entry_date` date NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_count` int(11) NOT NULL,
  `subscription_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_variables`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_variables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `key` char(32) CHARACTER SET latin1 NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_xp`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_xp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `xp` int(11) NOT NULL,
  `notes` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`,`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='created by JC 22.04.16 - for Adam';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_xp_new`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_xp_new` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  `xp` int(10) unsigned NOT NULL,
  `date` char(127) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `password_algor` int(11) DEFAULT '1',
  `salt` varchar(100) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `company` int(5) NOT NULL,
  `hash` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `admin` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `timezone` varchar(100) NOT NULL,
  `locale` varchar(100) NOT NULL,
  `language` varchar(30) NOT NULL,
  `job_title` varchar(150) NOT NULL,
  `department` varchar(70) NOT NULL,
  `division` varchar(100) NOT NULL,
  `super` int(11) NOT NULL,
  `default_page` varchar(255) NOT NULL,
  `signature` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `position` varchar(30) NOT NULL,
  `location` varchar(30) NOT NULL,
  `deleted` int(11) NOT NULL,
  `pass_code` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `hide_online_bookings` int(11) NOT NULL,
  `passcode` varchar(100) NOT NULL,
  `last_loaded_page` varchar(255) NOT NULL,
  `temporary_password` tinyint(1) NOT NULL,
  `custom_id` varchar(200) NOT NULL,
  `hide_calendar` int(11) NOT NULL,
  `calendar_order` int(11) NOT NULL,
  `clocked_in` datetime DEFAULT NULL,
  `clocked_out` datetime DEFAULT NULL,
  `last_password_reset` int(11) NOT NULL,
  `force_password` int(2) NOT NULL,
  `limited_user` int(11) NOT NULL,
  `can_void` int(11) NOT NULL DEFAULT '1',
  `can_refund` tinyint(1) NOT NULL DEFAULT '1',
  `can_report` int(11) NOT NULL DEFAULT '1',
  `can_rota` int(11) NOT NULL DEFAULT '1',
  `staff_read_only` int(11) NOT NULL,
  `stock_read_only` int(11) NOT NULL,
  `all_reports` int(11) NOT NULL DEFAULT '1',
  `performance_stats` int(11) NOT NULL,
  `disable_tutorial` int(2) NOT NULL,
  `all_services` int(11) NOT NULL DEFAULT '1',
  `delete_treatment` int(11) NOT NULL DEFAULT '0',
  `admin_tasks` int(11) NOT NULL,
  `admin_leads` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `login_fail_count` int(11) NOT NULL,
  `can_edit_booking_time` int(11) NOT NULL DEFAULT '1',
  `user_color` varchar(15) NOT NULL,
  `disable_multiple_clinics` int(11) NOT NULL,
  `is_hcp` int(11) NOT NULL DEFAULT '0',
  `login_disabled` int(5) NOT NULL,
  `can_patient_appoint` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_communicatons` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_photos` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_fiancials` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_treatments` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_docs` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_packages` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_prescription` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_consents` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_giftvoucher` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_loyalty` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_recall` tinyint(4) NOT NULL DEFAULT '1',
  `can_patient_memberships` tinyint(4) NOT NULL DEFAULT '1',
  `can_cancel_booking` tinyint(4) NOT NULL DEFAULT '1',
  `notify_on_booking` tinyint(1) NOT NULL,
  `can_edit_communications` tinyint(1) NOT NULL DEFAULT '1',
  `can_delete_communications` tinyint(1) NOT NULL DEFAULT '1',
  `can_view_full_cal` tinyint(1) NOT NULL DEFAULT '1',
  `permission_last_role` varchar(30) NOT NULL DEFAULT '',
  `can_merge` tinyint(1) NOT NULL DEFAULT '1',
  `can_discount` int(11) DEFAULT '1',
  `can_discount_single` tinyint(1) NOT NULL DEFAULT '1',
  `restored` int(11) NOT NULL,
  `google_auth_secret` char(16) DEFAULT NULL,
  `default_contract_id` int(11) NOT NULL,
  `can_see_personal` int(2) NOT NULL DEFAULT '1',
  `appear_on_rota` int(2) NOT NULL DEFAULT '1',
  `can_patient_medical_history` tinyint(4) NOT NULL DEFAULT '1',
  `can_lab_requests` tinyint(1) NOT NULL DEFAULT '0',
  `detailed_view` tinyint(4) NOT NULL,
  `can_make_blockout` int(11) NOT NULL DEFAULT '1',
  `can_delete_blockout` int(11) NOT NULL DEFAULT '1',
  `can_move_blockout` int(11) NOT NULL DEFAULT '1',
  `main_contact` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company` (`company`),
  KEY `hash_index` (`hash`),
  KEY `email` (`email`),
  KEY `username` (`username`),
  KEY `deleted` (`deleted`),
  KEY `calendar_order` (`calendar_order`),
  KEY `full_name` (`full_name`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_hours`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `clock_in` datetime NOT NULL,
  `clock_out` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vaccine_disease_coverage`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaccine_disease_coverage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cm_vaccine_id` int(11) NOT NULL DEFAULT '0',
  `disease_id` int(11) NOT NULL DEFAULT '0',
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vaccine_schedule`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaccine_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL COMMENT 'cm_contacts.id',
  `company_id` int(11) NOT NULL,
  `vaccine_id` int(11) NOT NULL COMMENT 'cm_vaccines.id',
  `recall_id` int(2) NOT NULL COMMENT 'If a recall is scheduled to be sent.',
  `scheduled_admin_date` date NOT NULL COMMENT 'The date the vaccine is scheduled to be adinistered',
  `actual_admin_date` date NOT NULL,
  `coverage_end_date` date NOT NULL,
  `schedule_cover_length` int(11) NOT NULL COMMENT 'In months, the period the vaccine will cover for (taken from the vaccine schedule)',
  `medical_record_id` int(11) NOT NULL COMMENT 'medical_form_contact.id',
  `disease_id` int(11) NOT NULL,
  `is_administered` int(2) NOT NULL,
  `batch_no` varchar(100) NOT NULL,
  `source` enum('Patient(verbal)','Patient(record)','Web submission by Patient(unverified)','Web submission by Patient(verified)','Other source') NOT NULL DEFAULT 'Patient(record)' COMMENT 'This field is represents the source of the information for this schedule',
  `created_by` int(2) NOT NULL,
  `created_on` datetime NOT NULL,
  `path_taken_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vaccine_schedule_coverage`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaccine_schedule_coverage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vaccine_schedule_id` int(11) NOT NULL DEFAULT '0',
  `disease_id` int(11) NOT NULL DEFAULT '0',
  `coverage_end_date` date NOT NULL,
  `cover_length` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_call_log`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_call_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `extra` longtext,
  `mins_used` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_conferencing_tos_acceptance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_conferencing_tos_acceptance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `accepted_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `visit_history`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visit_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `datetime` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `visit_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voided_sales`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voided_sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(55) NOT NULL,
  `custom_id` varchar(50) NOT NULL COMMENT 'inv_sales.custom_id',
  `biller_name` varchar(55) NOT NULL,
  `customer_name` varchar(55) NOT NULL,
  `date` int(11) NOT NULL,
  `reason` varchar(1000) DEFAULT NULL,
  `inv_total` decimal(25,2) NOT NULL,
  `items` text NOT NULL,
  `contact_id` int(11) NOT NULL,
  `insurance_company_id` int(11) NOT NULL COMMENT 'id of `insurance_details` table',
  `issuer_id` int(11) DEFAULT NULL,
  `xero_invoice_id` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `xero_updated_date` datetime NOT NULL,
  `xero_not_exist` int(11) NOT NULL,
  `xero_error` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `date_index` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voting_comments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voting_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `voting_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `occupier` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voting_results`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voting_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `datetime` datetime NOT NULL,
  `score` int(11) NOT NULL,
  `up_vote` int(11) NOT NULL,
  `down_vote` int(11) NOT NULL,
  `buzz_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voucher_print_app`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voucher_print_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `company_id` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voucher_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voucher_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `sms_mode` int(11) NOT NULL,
  `sms_name` varchar(255) NOT NULL,
  `sms_id` int(11) NOT NULL,
  `voucher_color_theme` varchar(11) NOT NULL,
  `terms` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wait_list_notifications`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wait_list_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waiting_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waiting_finance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waiting_finance` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `company` int(5) NOT NULL,
  `amount` float NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waiting_list`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waiting_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `expires_on` datetime DEFAULT NULL COMMENT 'Time stamp of expiry date from popup modal',
  `remove_on` tinyint(4) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `appointment` int(11) DEFAULT NULL,
  `monday` tinyint(4) DEFAULT '0',
  `tuesday` tinyint(4) DEFAULT '0',
  `wednesday` tinyint(4) DEFAULT '0',
  `thursday` tinyint(4) DEFAULT '0',
  `friday` tinyint(4) DEFAULT '0',
  `saturday` tinyint(4) DEFAULT '0',
  `sunday` tinyint(4) DEFAULT '0',
  `comments` text,
  `notify_sms` tinyint(4) DEFAULT '0',
  `notify_email` tinyint(1) NOT NULL DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `available_from` date NOT NULL,
  `available_to` date NOT NULL,
  `preference` int(11) NOT NULL,
  `urgent` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `contact_id` (`contact_id`),
  KEY `appointment` (`appointment`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waiting_list_invites`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waiting_list_invites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `last_invite` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `contact_id` (`contact_id`),
  KEY `last_invite` (`last_invite`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waiting_list_options`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waiting_list_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waiting_list_id` int(11) NOT NULL,
  `options` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `waiting_list_id` (`waiting_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waiting_list_preferences`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waiting_list_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `waiting_list_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `employee_id` (`employee_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `waiting_list_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waiting_list_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `sms_template_id` int(11) NOT NULL,
  `email_template_id` int(11) NOT NULL,
  `class_sms_template_id` int(11) NOT NULL DEFAULT '0',
  `class_email_template_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `warning_scripts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warning_scripts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `report_date` date NOT NULL,
  `contact_count` int(11) NOT NULL,
  `sale_count` int(11) NOT NULL,
  `payment_count` int(11) NOT NULL,
  `appointment_count` int(11) NOT NULL,
  `old_count` int(11) NOT NULL,
  `trigger_alert` int(11) NOT NULL,
  `inv_sale_item_count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `webhook_integration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webhook_integration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `webhook_url` varchar(200) NOT NULL,
  `module` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `widget_targets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `widget_targets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `appointment_target_day` int(11) NOT NULL,
  `appointment_target_week` int(11) NOT NULL,
  `appointment_target_month` int(11) NOT NULL,
  `appointment_target_year` int(11) NOT NULL,
  `client_target_day` int(11) NOT NULL,
  `client_target_week` int(11) NOT NULL,
  `client_target_month` int(11) NOT NULL,
  `client_target_year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_error_logs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_error_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `type` varchar(25) NOT NULL,
  `company_id` int(11) NOT NULL,
  `error` varchar(250) NOT NULL,
  `status_response` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_integration`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_integration` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `company_id` int(255) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  `tenant_id` varchar(255) NOT NULL,
  `client_secret` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `redirect_uri` varchar(255) NOT NULL,
  `default_tax_method` varchar(191) DEFAULT NULL,
  `payments_account_code` varchar(255) NOT NULL,
  `items_account_code` varchar(255) NOT NULL,
  `payments_enabled` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Are payments enabled to sync with xero invoices',
  `tracking_categories_enabled` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Are Tracking Categories enabled',
  `default_invoice_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `enabled` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `COMPANYID` (`company_id`),
  KEY `REFRESHTOKEN` (`refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_integration_accounts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_integration_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_account_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PMETHOD` (`payment_method`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_integration_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_integration_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `invoice_guid` varchar(255) NOT NULL COMMENT 'inv_sales.guid',
  `xero_invoice_id` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 - to be synced, 1 - has errors, 2 - is synced to xero',
  `response` text COMMENT 'JSON response',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `xero_invoice_id` (`xero_invoice_id`),
  KEY `INVOICEID` (`invoice_guid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_integration_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_integration_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `xero_payment_id` varchar(255) NOT NULL,
  `xero_invoice_id` varchar(255) NOT NULL,
  `status` enum('created','deleted') NOT NULL DEFAULT 'created' COMMENT 'created, or deleted(refund from pabau)',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_integration_tracking_categories`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_integration_tracking_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `xero_id` varchar(255) NOT NULL,
  `target` varchar(255) NOT NULL COMMENT 'Can be &amp;quot;employee&amp;quot; or &amp;quot;location&amp;quot;',
  `company_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `XEROTRACKINGID` (`xero_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_invoices_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_invoices_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `xero_manual_job_id` int(11) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `invoice_guid` varchar(255) NOT NULL,
  `xero_synced` tinyint(4) NOT NULL,
  `date_created` datetime NOT NULL,
  `xero_updated_date` datetime NOT NULL,
  `result_text` text NOT NULL,
  `xero_error` tinyint(4) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `force` int(11) NOT NULL,
  `counter` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `xero_manual_job_id` (`xero_manual_job_id`),
  KEY `occupier` (`occupier`),
  KEY `xero_synced` (`xero_synced`),
  KEY `xero_error` (`xero_error`),
  KEY `occupier_2` (`occupier`,`xero_synced`,`xero_error`),
  KEY `invoice_id` (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `sales_updated` int(11) NOT NULL,
  `result_text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_manual_jobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_manual_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `ref_start_date` datetime NOT NULL,
  `ref_end_date` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_settings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `disabled` int(11) NOT NULL,
  `consumer_key` varchar(255) NOT NULL,
  `shared_secret` varchar(255) NOT NULL,
  `rsa_private_key` varchar(255) NOT NULL,
  `rsa_public_key` varchar(255) NOT NULL,
  `status_invoice` varchar(255) NOT NULL,
  `invoice_account_code` varchar(255) NOT NULL,
  `payment_account_code` varchar(255) NOT NULL,
  `employee_tracking_category` varchar(255) NOT NULL,
  `location_tracking_category` varchar(255) NOT NULL,
  `employee_tracking_category_name` varchar(255) NOT NULL,
  `location_tracking_category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_settings_invoice_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_settings_invoice_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `invoice_type` varchar(255) NOT NULL,
  `invoice_account_code` varchar(255) NOT NULL,
  `disabled` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xero_settings_payment_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xero_settings_payment_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_account_code` varchar(255) NOT NULL,
  `disabled` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zaesteticyou_contacts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zaesteticyou_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `A` varchar(255) NOT NULL,
  `B` varchar(255) NOT NULL,
  `C` varchar(255) NOT NULL,
  `D` varchar(255) NOT NULL,
  `E` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `status_client` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `custom_user` varchar(255) NOT NULL,
  `custom_user_name2` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zcosmetica_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zcosmetica_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zdoctor_invoice_patient`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zdoctor_invoice_patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` varchar(255) NOT NULL,
  `patient_id` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `nettotal` decimal(20,2) NOT NULL,
  `taxtotal` decimal(20,2) NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `occupier` int(11) NOT NULL,
  `user_custom_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zdoctor_services_type`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zdoctor_services_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zdoctor_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zdoctor_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zen_send`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zen_send` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zenith_contact_dates`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zenith_contact_dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zenith_contact_marketing`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zenith_contact_marketing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_marketing_source` int(11) NOT NULL,
  `custom_marketing_category` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `custom_contact_name` (`custom_contact_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zenith_marketing_sources`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zenith_marketing_sources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `marketing_source` varchar(255) NOT NULL,
  `custom_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `marketing_source` (`marketing_source`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zenith_treatment_interest`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zenith_treatment_interest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `treatment_interest` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zenith_treatment_interest_divided`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zenith_treatment_interest_divided` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `treatment_interest` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zfrances_documents`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zfrances_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientId` int(11) NOT NULL,
  `dateCreated` varchar(255) NOT NULL,
  `sessionNOtes` text NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zha_import_services`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zha_import_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_service_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_service_id` (`custom_service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_account_balance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_account_balance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `added` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `custom_contact_name` (`custom_contact_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_appts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_appts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(255) NOT NULL,
  `custom_id` varchar(255) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `custom_category` varchar(255) NOT NULL,
  `custom_service` varchar(255) NOT NULL,
  `custom_room` varchar(255) NOT NULL,
  `custom_type` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_bookings_omniya`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_bookings_omniya` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `title` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_bookings_rooms`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_bookings_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_booking_id` int(11) NOT NULL,
  `custom_room_id` int(11) NOT NULL,
  `custom_room_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_booking_id` (`custom_booking_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_bookings_status`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_bookings_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_bookings_title`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_bookings_title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_booking_id` int(11) NOT NULL,
  `title` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_booking_id` (`custom_booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_communications`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_communications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `date_created` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `communication_type` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `added` tinyint(4) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `custom_modified_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `custom_id` (`custom_id`),
  KEY `custom_contact_name` (`custom_contact_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_companies_six`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_companies_six` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_compare_bookings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_compare_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) NOT NULL,
  `thingie` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `cust` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `imported` int(11) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `date` (`date`),
  KEY `thingie` (`thingie`),
  KEY `time` (`time`),
  KEY `cust` (`cust`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_contact_packages`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_contact_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `custom_contact_id` varchar(255) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `package_code` varchar(255) NOT NULL,
  `date_created` date NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `activation_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `remaining` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `contact_package_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `price_item` decimal(18,2) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_name` (`package_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_documents`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `orig_filename` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filetype` varchar(255) NOT NULL,
  `contact_custom_id` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL,
  `custom_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `old_filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_custom_id` (`contact_custom_id`),
  KEY `orig_filename` (`orig_filename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_documents_fix`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_documents_fix` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_elixir_invoices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_elixir_invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `sum_invoice` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_name` (`client_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_inv_sales_invoice_no`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_inv_sales_invoice_no` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_sale_id` int(11) NOT NULL,
  `ref_no` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `custom_sale_id` (`custom_sale_id`),
  KEY `custom_contact_id` (`custom_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_invoice_bookings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_invoice_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_invoices_contracts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_invoices_contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_id2` int(11) NOT NULL,
  `custom_contract_id` int(11) NOT NULL,
  `custom_contract_name` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_loyalty`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_loyalty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `points` decimal(18,2) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `occupier` (`occupier`),
  KEY `custom_contact_name` (`custom_contact_name`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_newsletter_member`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_newsletter_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `opens` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `newsletter_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_package_used`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_package_used` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_package_id` int(11) NOT NULL,
  `custom_booking_id` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_booking_id` (`custom_booking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` int(11) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `pmethod` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  `imported` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_payments_allocation_type`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_payments_allocation_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_field_name` varchar(255) NOT NULL,
  `custom_field_value` varchar(255) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `from_type` int(11) NOT NULL,
  `to_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`),
  KEY `payment_id` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_payments_custom_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_payments_custom_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_payment_id` int(11) NOT NULL,
  `custom_field_name` varchar(255) NOT NULL,
  `custom_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_photos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `linkhref` varchar(255) NOT NULL,
  `contact_custom_id` varchar(255) NOT NULL,
  `contact_custom_name` varchar(255) NOT NULL,
  `contact_custom_email` varchar(255) NOT NULL,
  `custom_consultation_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `linkhref` (`linkhref`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_practitioners`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_practitioners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_rota`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_rota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `break_start` time NOT NULL,
  `break_end` time NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `custom_user_id` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `custom_location_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_rota_milenium`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_rota_milenium` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `date_week` date NOT NULL,
  `monday` varchar(255) NOT NULL,
  `tuesday` varchar(255) NOT NULL,
  `wednesday` varchar(255) NOT NULL,
  `thursday` varchar(255) NOT NULL,
  `friday` varchar(255) NOT NULL,
  `saturday` varchar(255) NOT NULL,
  `sunday` varchar(255) NOT NULL,
  `added` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_sales_clinico`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_sales_clinico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `outstanding_amount` decimal(18,2) NOT NULL,
  `issue_date` date NOT NULL,
  `date_closed` date NOT NULL,
  `deleted` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`),
  KEY `custom_contact_id` (`custom_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_sales_custom_fields`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_sales_custom_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `custom_sale_id` int(11) NOT NULL,
  `custom_field_name` varchar(255) NOT NULL,
  `custom_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_sales_payments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_sales_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_sale_id` int(11) NOT NULL,
  `custom_user_id` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `paymentDate` varchar(255) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `left_amount` decimal(20,2) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_contact_id` (`custom_contact_id`),
  KEY `occupier` (`occupier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_sales_payments2`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_sales_payments2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_sale_id` int(11) NOT NULL,
  `custom_user_id` int(11) NOT NULL,
  `custom_user_name` varchar(255) NOT NULL,
  `custom_contact_id` int(11) NOT NULL,
  `custom_contact_name` varchar(255) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `paymentDate` varchar(255) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `added` int(11) NOT NULL,
  `left_amount` decimal(20,2) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `custom_sale_id2` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_sales_payments_deleted`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_sales_payments_deleted` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `paymentDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_treatments`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_treatments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `treatment_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zimport_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimport_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `occupier` int(11) NOT NULL,
  `custom_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zpatient_dobs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zpatient_dobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_contact_id` int(11) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_contact_id` (`custom_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zproducts_barcode`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zproducts_barcode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `barcode` varchar(255) NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_name` (`product_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zroom_import_helper`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zroom_import_helper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_id` varchar(255) NOT NULL,
  `room_name` text NOT NULL,
  `occupier` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_id` (`custom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ztest_db_class`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ztest_db_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'william_entourage'
--

--
-- Dumping routines for database 'william_entourage'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-21  4:01:28
