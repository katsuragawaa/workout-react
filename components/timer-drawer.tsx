"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCallback, useRef, useState } from "react";

type TimerDrawerProps = {
  trigger: React.ReactNode;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export function TimerDrawer({ trigger }: TimerDrawerProps) {
  const initialTime = 120;
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }

    setTime(initialTime);

    timerId.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    setIsRunning(true);
  }, [initialTime]);

  const pauseTimer = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }

    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    setIsRunning(true);
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild onClick={startTimer}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Descanso</DrawerTitle>
            <DrawerDescription>Pausa até a próxima atividade</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 text-center text-7xl font-bold tracking-tighter">{formatTime(time)}</div>
          <DrawerFooter>
            {isRunning ? <Button onClick={pauseTimer}>Pausar</Button> : <Button onClick={resumeTimer}>Retomar</Button>}
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
