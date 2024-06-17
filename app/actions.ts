import { slugify } from '@/utils/sluggify';
import { db } from './database/orm';
import { whens } from './database/schema';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function createWhenAction(formData: FormData) {
  const { name, date, image } = Object.fromEntries(formData);
  if (!name || !date || !image) return;

  const imgFile = image as File;
  const imgBuffer = Buffer.from(await imgFile.arrayBuffer());

  const fileName = `${crypto.randomUUID()}_${imgFile.name}`;

  await Promise.all([
    writeFile(path.join(process.cwd(), 'public', fileName), imgBuffer),
    db
      .insert(whens)
      .values({ date: date.toString(), imageName: fileName, name: name.toString(), slug: slugify(name.toString()) }),
  ]);
}
