import { text, integer, sqliteTable, blob } from 'drizzle-orm/sqlite-core';

const whens = sqliteTable('whens', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  imageName: text('imageName').notNull(),
  date: text('date').notNull(),
});

export { whens };
