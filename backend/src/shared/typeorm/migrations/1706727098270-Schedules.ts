import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Schedules1706727098270 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "schedules",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "date",
                  type: "date",
                  isNullable: false,
               },

               {
                  name: "hour",
                  type: "time",
                  isNullable: false,
               },

               {
                  name: "description",
                  type: "text",
                  isNullable: false,
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("schedules");
   }
}
