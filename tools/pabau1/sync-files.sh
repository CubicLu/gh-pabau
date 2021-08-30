#!/usr/bin/env bash

set -e

cp -f ../../../crm/conf/db/pabau_master_autogen.sql db_init/1.sql
cp -f ../../../crm/conf/pods/compose-images/node/nano.sql db_init/2.sql

