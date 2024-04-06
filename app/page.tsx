"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  PiArrowCounterClockwiseFill,
  PiArrowClockwiseFill,
} from "react-icons/pi";

export default function Home() {
  const [isClockwise, setIsClockwise] = useState(true);
  const [isRoundShow, setIsRoundShow] = useState(true);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const savedData = window.localStorage.getItem("savedData");
    if (savedData) {
      const { clockwise, roundShow, roundNumber } = JSON.parse(savedData);
      setIsClockwise(clockwise);
      setIsRoundShow(roundShow);
      setRound(roundNumber);
    }
  }, []);

  const { toast } = useToast();

  const iconTransition =
    "[transition:transform_500ms,opacity_1500ms] ease-in-out origin-bottom";
  const iconShow = "opacity-1 rotate-360";
  const iconHide = `opacity-0 h-0 ${
    isClockwise ? "rotate-180" : "-rotate-180"
  }`;

  const badgeTransition = "transition-[opacity] duration-500 ease-in-out";
  const badgeShow = "opacity-1";
  const badgeHide = "opacity-0 h-0";

  return (
    <>
      <header className="min-h-[10vh] w-full p-4">
        <nav>
          <ul className="flex justify-center items-center gap-2">
            <li>
              <Button
                variant="outline"
                onClick={() => {
                  setIsRoundShow(!isRoundShow);
                }}
              >
                {`${isRoundShow ? "Hide" : "Show"} Round`}
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                onClick={() => {
                  const dataToSave = {
                    clockwise: isClockwise,
                    roundShow: isRoundShow,
                    roundNumber: round,
                  };
                  window.localStorage.setItem(
                    "savedData",
                    JSON.stringify(dataToSave)
                  );
                  toast({
                    title: "Data saved",
                    description: "You've saved the data. Click Reset to clear.",
                  });
                }}
              >
                Save
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                onClick={() => {
                  setIsClockwise(true);
                  setRound(0);
                  window.localStorage.removeItem("savedData");
                  toast({
                    title: "All data cleared",
                    description: "You've cleared and reset the data.",
                  });
                }}
              >
                Reset
              </Button>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
        <Toaster />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-2 gap-12">
        <button
          className="flex flex-col items-center justify-center select-none cursor-pointer"
          onClick={() => {
            setIsClockwise(!isClockwise);
            setRound((prev) => prev + 1);
          }}
        >
          <span className="text-[clamp(15rem,20rem,min(100vw,30vh))]">
            <PiArrowClockwiseFill
              className={cn(iconTransition, isClockwise ? iconShow : iconHide)}
            />

            <PiArrowCounterClockwiseFill
              className={cn(iconTransition, !isClockwise ? iconShow : iconHide)}
            />
          </span>
          <span className="text-[clamp(2rem,3rem,min(100vw,10vh))] uppercase font-bold leading-tight">
            {isClockwise ? "Clockwise" : "Anti-clockwise"}
          </span>
        </button>
        {
          <Badge
            className={cn(badgeTransition, isRoundShow ? badgeShow : badgeHide)}
          >
            Round: {round}
          </Badge>
        }
      </main>
    </>
  );
}
