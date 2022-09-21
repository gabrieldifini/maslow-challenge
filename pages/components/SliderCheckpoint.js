import React from "react";

const SliderCheckpoint = ({
  rangePosition,
  color,
  sliderValue,
  checkpointLabel,
}) => {
  const checkpointPosition = {
    start: 0,
    middle: 50,
    end: 100,
  };

  return (
    <>
      <div
        className="checkpoint"
        style={{
          left: `${checkpointPosition[rangePosition]}%`,
          backgroundColor:
            sliderValue >= checkpointLabel ? color : "var(--gray)",
          transform: `translate(-${checkpointPosition[rangePosition]}%, 0%) rotate(45deg)`,
        }}
      />
      <span
        className="checkpointLabel"
        style={{
          transform: `translate(-${checkpointPosition[rangePosition]}%, 0%)`,
          left: `${checkpointPosition[rangePosition]}%`,
        }}
      >
        {checkpointLabel}
      </span>
    </>
  );
};

export default SliderCheckpoint;
