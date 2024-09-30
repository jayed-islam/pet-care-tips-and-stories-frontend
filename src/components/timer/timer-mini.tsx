import React, { useEffect, useState } from "react";
import moment, { Duration } from "moment";

interface TimerMiniProps {
  endTime?: number | string | Date;
}

const TimerMini: React.FC<TimerMiniProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>(
    moment.duration().toISOString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const end = moment(endTime);
      const duration: Duration = moment.duration(end.diff(now));

      if (duration.asSeconds() > 0) {
        setTimeLeft(duration.toISOString());
      } else {
        clearInterval(timer);
        setTimeLeft(moment.duration().toISOString());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (value: number, label: string) => {
    return (
      <div className="mx-1 text-orange-600">
        <div className=" text-xs font-semibold">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
    );
  };

  const days: number = moment.duration(timeLeft).days();
  const hours: number = moment.duration(timeLeft).hours();
  const minutes: number = moment.duration(timeLeft).minutes();
  const seconds: number = moment.duration(timeLeft).seconds();

  return (
    <div className="">
      <div className="text-center flex w-full items-center justify-center">
        {days >= 1 && formatTime(days, "Days")}
        {days >= 1 && (
          <h3 className="text-sm font-semibold text-orange-700">:</h3>
        )}
        {formatTime(hours, "Hours")}
        <h3 className="text-sm font-semibold text-orange-700">:</h3>
        {formatTime(minutes, "Minutes")}
        <h3 className="text-sm font-semibold text-orange-700">:</h3>
        {formatTime(seconds, "Seconds")}
      </div>
    </div>
  );
};

export default TimerMini;
