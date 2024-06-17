import { WhenPage } from './components/WhenPage';
import { db } from '../database/orm';
import { notFound } from 'next/navigation';

export default async function Page({ params: { when } }: { params: { when: string } }) {
  const current = await db.query.whens.findFirst({ where: (whens, { eq }) => eq(whens.slug, when) });
  if (!current) return notFound();

  return <WhenPage when={current} />;
}
