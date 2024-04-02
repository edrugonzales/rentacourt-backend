--liquibase formatted sql

--changeset ordishs:C0 stripComments:false runOnChange:false splitStatements:false
--comment:Make sure HSTORE extension is loaded.
DO $$
BEGIN
  CREATE EXTENSION HSTORE;
	CREATE EXTENSION PGCRYPTO;
EXCEPTION WHEN OTHERS THEN
  -- Do nothing
END
$$;

--changeset ordishs:C1 stripComments:false runOnChange:false splitStatements:false
--comment:Create audit table.
CREATE TABLE users (
 id TEXT PRIMARY KEY
,googleId TEXT NOT NULL
,firstName TEXT NOT NULL
,lastName TEXT NOT NULL
,image TEXT NOT NULL
,company TEXT NOT NULL
,position TEXT NULL
,email TEXT NOT NULL
,phone BIGINT NOT NULL
,verificationCode BIGINT NOT NULL
,hashed_password TEXT NOT NULL
,resetToken TEXT NULL
,role INT NOT NULL
,isVerified TEXT NOT NULL
,isOnBoarded TEXT NOT NULL
,createdAt DATE NOT NULL
,updatedAt DATE NOT NULL
,salt TEXT NOT NULL
,isArchived TEXT NOT NULL
,accesstoken TEXT NULL
);

CREATE TABLE role (
 id INT PRIMARY KEY
,user_role TEXT NOT NULL
);


CREATE TABLE employees (
 id TEXT PRIMARY KEY
,firstname TEXT NOT NULL
,lastname TEXT NOT NULL
,middlename TEXT NOT NULL
,position TEXT NOT NULL
,createdat TEXT NOT NULL
,isactive TEXT NOT NULL
,phone TEXT NOT NULL
,email TEXT NOT NULL
,company TEXT NOT NULL
,branch TEXT NOT NULL
);

CREATE TABLE stores (
 id TEXT PRIMARY KEY
,name TEXT NOT NULL
,phone TEXT NOT NULL
,email TEXT NOT NULL
,company TEXT NOT NULL
,isArchive TEXT NOT NULL
,createdA TEXT NOT NULL
,createdBy TEXT NOT NULL
);
