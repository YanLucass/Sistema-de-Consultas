import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatientTable1706109191866 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "patients",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "name",
                  type: "varchar(30)",
                  isNullable: false,
               },

               {
                  name: "email",
                  type: "varchar(60)",
                  isNullable: false,
               },

               {
                  name: "phone",
                  type: "varchar(12)",
                  isNullable: false,
               },

               {
                  name: "cpf",
                  type: "varchar(11)",
                  isUnique: true,
                  isNullable: false,
               },

               {
                  name: "password",
                  type: "varchar(255)",
                  isNullable: false,
               },

               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("patients");
   }
}
