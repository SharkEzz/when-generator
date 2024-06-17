import { SubmitButton } from '@/components/SubmitButton';
import { createWhenAction } from './actions';
import { redirect } from 'next/navigation';

export default function Page() {
  async function createWhen(formData: FormData) {
    'use server';

    await createWhenAction(formData);

    const name = formData.get('name')?.toString();
    if (!name) return;

    redirect(name);
  }

  return (
    <form action={createWhen} className="w-full h-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl">
        Créer un{' '}
        <u>
          <b>when</b>
        </u>
      </h1>
      <input className="text-black" type="text" name="name" required placeholder="Nom" />
      <input className="text-black" type="date" name="date" required placeholder="Date" />
      <input className="text-black" type="file" name="image" required />
      <SubmitButton />
    </form>
  );
}
