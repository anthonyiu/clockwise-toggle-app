"use client";
import { useEffect, useState } from "react";
import nav from "@/const/nav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import {
  PiArrowCounterClockwiseFill,
  PiArrowClockwiseFill,
} from "react-icons/pi";

export default function Home() {
  const [isClockwise, setIsClockwise] = useState(true);
  const [round, setSound] = useState(0);

  useEffect(() => {
    const savedData = window.localStorage.getItem("savedData");
    if (savedData) {
      const { clockwise, roundNumber } = JSON.parse(savedData);
      setIsClockwise(clockwise);
      setSound(roundNumber);
    }
  }, []);
  return (
    <>
      <header className="min-h-[10vh] p-4 ">
        <nav>
          <ul className="flex justify-center items-center gap-2">
            {nav.map(({ text }) => (
              <li key={text}>
                <Button variant="outline">{text}</Button>
              </li>
            ))}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-6">
        <button
          className="flex flex-col items-center justify-center select-none cursor-pointer"
          onClick={() => {
            setIsClockwise(!isClockwise);
          }}
        >
          <span className="text-9xl">
            {isClockwise ? (
              <PiArrowClockwiseFill />
            ) : (
              <PiArrowCounterClockwiseFill />
            )}
          </span>
          <span className="text-4xl">
            {isClockwise ? "Clockwise" : "Anti-clockwise"}
          </span>
        </button>
      </main>
    </>
  );
}
