import {MigrationInterface, QueryRunner} from "typeorm";

export class createNotification1697370983615 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "notification_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "message" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "customer_custom_fields_notification_notification_item" ("customerId" integer NOT NULL, "notificationItemId" integer NOT NULL, PRIMARY KEY ("customerId", "notificationItemId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_abe895a39289ce0aae0e4818d3" ON "customer_custom_fields_notification_notification_item" ("customerId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d4919f7de35b4ab978507fcac2" ON "customer_custom_fields_notification_notification_item" ("notificationItemId") `, undefined);
        await queryRunner.query(`CREATE TABLE "notification_item_customer_customer" ("notificationItemId" integer NOT NULL, "customerId" integer NOT NULL, PRIMARY KEY ("notificationItemId", "customerId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_57d68c41f047be3430d4f8901d" ON "notification_item_customer_customer" ("notificationItemId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d6219175609739b6bd6c61f85b" ON "notification_item_customer_customer" ("customerId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_customer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFields__fix_relational_custom_fields__" boolean, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_customer"("createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId") SELECT "createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId" FROM "customer"`, undefined);
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_customer" RENAME TO "customer"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_abe895a39289ce0aae0e4818d3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d4919f7de35b4ab978507fcac2"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_customer_custom_fields_notification_notification_item" ("customerId" integer NOT NULL, "notificationItemId" integer NOT NULL, CONSTRAINT "FK_abe895a39289ce0aae0e4818d3f" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d4919f7de35b4ab978507fcac25" FOREIGN KEY ("notificationItemId") REFERENCES "notification_item" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("customerId", "notificationItemId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_customer_custom_fields_notification_notification_item"("customerId", "notificationItemId") SELECT "customerId", "notificationItemId" FROM "customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`DROP TABLE "customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_customer_custom_fields_notification_notification_item" RENAME TO "customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_abe895a39289ce0aae0e4818d3" ON "customer_custom_fields_notification_notification_item" ("customerId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d4919f7de35b4ab978507fcac2" ON "customer_custom_fields_notification_notification_item" ("notificationItemId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_57d68c41f047be3430d4f8901d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d6219175609739b6bd6c61f85b"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_notification_item_customer_customer" ("notificationItemId" integer NOT NULL, "customerId" integer NOT NULL, CONSTRAINT "FK_57d68c41f047be3430d4f8901df" FOREIGN KEY ("notificationItemId") REFERENCES "notification_item" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d6219175609739b6bd6c61f85b8" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("notificationItemId", "customerId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_notification_item_customer_customer"("notificationItemId", "customerId") SELECT "notificationItemId", "customerId" FROM "notification_item_customer_customer"`, undefined);
        await queryRunner.query(`DROP TABLE "notification_item_customer_customer"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_notification_item_customer_customer" RENAME TO "notification_item_customer_customer"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_57d68c41f047be3430d4f8901d" ON "notification_item_customer_customer" ("notificationItemId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d6219175609739b6bd6c61f85b" ON "notification_item_customer_customer" ("customerId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_d6219175609739b6bd6c61f85b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_57d68c41f047be3430d4f8901d"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification_item_customer_customer" RENAME TO "temporary_notification_item_customer_customer"`, undefined);
        await queryRunner.query(`CREATE TABLE "notification_item_customer_customer" ("notificationItemId" integer NOT NULL, "customerId" integer NOT NULL, PRIMARY KEY ("notificationItemId", "customerId"))`, undefined);
        await queryRunner.query(`INSERT INTO "notification_item_customer_customer"("notificationItemId", "customerId") SELECT "notificationItemId", "customerId" FROM "temporary_notification_item_customer_customer"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_notification_item_customer_customer"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d6219175609739b6bd6c61f85b" ON "notification_item_customer_customer" ("customerId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_57d68c41f047be3430d4f8901d" ON "notification_item_customer_customer" ("notificationItemId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d4919f7de35b4ab978507fcac2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_abe895a39289ce0aae0e4818d3"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer_custom_fields_notification_notification_item" RENAME TO "temporary_customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`CREATE TABLE "customer_custom_fields_notification_notification_item" ("customerId" integer NOT NULL, "notificationItemId" integer NOT NULL, PRIMARY KEY ("customerId", "notificationItemId"))`, undefined);
        await queryRunner.query(`INSERT INTO "customer_custom_fields_notification_notification_item"("customerId", "notificationItemId") SELECT "customerId", "notificationItemId" FROM "temporary_customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d4919f7de35b4ab978507fcac2" ON "customer_custom_fields_notification_notification_item" ("notificationItemId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_abe895a39289ce0aae0e4818d3" ON "customer_custom_fields_notification_notification_item" ("customerId") `, undefined);
        await queryRunner.query(`ALTER TABLE "customer" RENAME TO "temporary_customer"`, undefined);
        await queryRunner.query(`CREATE TABLE "customer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "customer"("createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId") SELECT "createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId" FROM "temporary_customer"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_customer"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d6219175609739b6bd6c61f85b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_57d68c41f047be3430d4f8901d"`, undefined);
        await queryRunner.query(`DROP TABLE "notification_item_customer_customer"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d4919f7de35b4ab978507fcac2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_abe895a39289ce0aae0e4818d3"`, undefined);
        await queryRunner.query(`DROP TABLE "customer_custom_fields_notification_notification_item"`, undefined);
        await queryRunner.query(`DROP TABLE "notification_item"`, undefined);
   }

}
