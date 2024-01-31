import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnPatientIdToSchedulesTable1706728381661 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      //criar coluna patientId em schedules
      await queryRunner.addColumn(
         "schedules",
         new TableColumn({
            name: "patientId",
            type: "uuid",
            isNullable: false,
         }),
      );

      //adicionar chave estrangeira
      await queryRunner.createForeignKey(
         "schedules",
         new TableForeignKey({
            columnNames: ["patientId"],
            referencedColumnNames: ["id"],
            referencedTableName: "patients",
            onDelete: "CASCADE",
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      //desfazer adição de coluna e chave estrangeira
      await queryRunner.dropForeignKey("schedules", "patientId");
      await queryRunner.dropColumn("schedules", "patientId");
   }
}
