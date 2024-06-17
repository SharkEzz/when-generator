'use client';

import { Bodies, Common, Engine, World } from 'matter-js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FallingAlbums } from './FallingAlbums';

interface When {
  date: string;
  id: number;
  slug: string;
  name: string;
  imageName: string;
}

export function WhenPage({ when }: { when: When }) {
  const { date, imageName, name } = when;
  const finalDate = useMemo(() => new Date(date), [date]);

  const engineRef = useRef<Engine>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dateDiff, setDateDiff] = useState(finalDate.getTime() - Date.now());

  const handleAddAlbum = useCallback(() => {
    if (!engineRef.current) return;

    World.add(
      engineRef.current.world,
      Bodies.rectangle(Common.random(0, window.innerWidth), 0, 120, 120, {
        render: { sprite: { texture: `/${imageName}`, xScale: 0.3, yScale: 0.3 } },
        angle: Common.random(0, 3),
      }),
    );
  }, [imageName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateDiff(finalDate.getTime() - Date.now());

      const value = Common.random(0, 10);
      if (value < 5) return;

      handleAddAlbum();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [finalDate, handleAddAlbum]);

  const handleButtonClick = () => {
    handleAddAlbum();
  };

  return (
    <>
      <FallingAlbums buttonRef={buttonRef} engineRef={engineRef} />
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">
          When{' '}
          <u>
            <b>{name}</b>
          </u>{' '}
          ?
        </h1>
        <p>Dans {Math.floor(dateDiff / (1024 * 60 * 60 * 24))} jours</p>
        <p>{Math.floor(dateDiff / (1024 * 60 * 60))} heures</p>
        <p>{Math.floor(dateDiff / (1024 * 60))} minutes</p>
        <p>{Math.floor(dateDiff / 1024)} secondes</p>
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="py-3 px-4 mt-4 top-[60%] bg-slate-700 rounded absolute"
        >
          Donne 😢
        </button>
      </div>
    </>
  );
}
