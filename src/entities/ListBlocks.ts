import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("list_blocks_pkey", ["id"], { unique: true })
@Entity("list_blocks", { schema: "public" })
export class ListBlocks {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("integer", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("integer", { name: "list_id", nullable: true })
  listId: number | null;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
