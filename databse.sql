CREATE TABLE "List" ("id" serial primary key,"task" varchar(800),"isComplete" boolean default false);

INSERT INTO "List"("task","isComplete") VALUES('buy groceries',false);

SELECT * FROM "List";
