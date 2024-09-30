import React, { useEffect, useState } from "react";
import moment from "moment";

interface ITimerProps {
  value: number;
  label: string;
}

const Timer = ({ endTime }: { endTime: number | Date | string }) => {
  const [timeLeft, setTimeLeft] = useState(moment.duration().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const end = moment(endTime);
      const duration = moment.duration(end.diff(now));

      if (duration.asSeconds() > 0) {
        setTimeLeft(duration.toISOString());
      } else {
        clearInterval(timer);
        setTimeLeft(moment.duration().toISOString());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = ({ label, value }: ITimerProps) => {
    return (
      <div className="mx-1 px-2 py-2 border-2 rounded-lg border-orange-600 text-orange-600">
        <div className="leading-none text-xl text-orange-600">
          {value.toString().padStart(2, "0")}
        </div>
        {/* <div className="font-mono uppercase text-xs mt-1 leading-none">{label}</div> */}
      </div>
    );
  };

  const days = moment.duration(timeLeft).days();
  const hours = moment.duration(timeLeft).hours();
  const minutes = moment.duration(timeLeft).minutes();
  const seconds = moment.duration(timeLeft).seconds();

  return (
    <div className="text-yellow-100">
      <div className="text-center flex w-full items-center justify-center">
        {days >= 1 && formatTime({ value: days, label: "Days" })}
        {days >= 1 && (
          <h3
            className="text-[17px] font-semi
                bold text-orange-700"
          >
            :
          </h3>
        )}
        {formatTime({ value: hours, label: "Hours" })}
        <h3
          className="text-[17px] font-semi
                bold text-orange-700"
        >
          :
        </h3>
        {formatTime({ value: minutes, label: "Minutes" })}
        <div className="text-2xl text-slate-900 mx-1 font-extralight">and</div>
        {formatTime({ value: seconds, label: "Seconds" })}
      </div>
    </div>
  );
};

export default Timer;
