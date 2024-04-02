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
CREATE TABLE audit (
 id BIGSERIAL PRIMARY KEY
,tablename TEXT NOT NULL
,username TEXT NOT NULL
,timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
,action TEXT NOT NULL CHECK (action IN ('U','D'))
,oldvalues HSTORE
,newvalues HSTORE
,updatedcols TEXT[]
,query TEXT
);