import { useState, useEffect } from "react";
import SliderCheckpoint from "./SliderCheckpoint";

const Slider = ({ color, minValue, maxValue, state, setState, index }) => {
  const [sliderValue, setSliderValue] = useState(
    state.values[index].currentValue
  );
  const [sliderStyle, setSliderStyle] = useState({});

  const setupSlider = () => {
    handleSliderUpdate(state.values[index].currentValue);
  }

  useEffect(() => {
    setupSlider()
  }, []);

  const handleSliderUpdate = (value, e) => {
    const { multiplier } = state.values[index];
    const variation = (value - sliderValue) * multiplier;
    const remainder = state.remainder - variation;
    if (remainder >= 0) {
      const percentage = ((value - minValue) * 100) / (maxValue - minValue);
      setSliderValue(value);
      setState((state) => ({
        remainder,
        values: state.values.map((item, i) =>
          i === index ? { ...item, currentValue: value } : item
        ),
      }));
      setSliderStyle({
        thumb: {
          left: `${percentage}%`,
          transform: `translate(-${percentage}%, -50%) rotate(45deg)`,
          backgroundColor: color,
        },
        thumbLabel: {
          left: `${percentage}%`,
          transform: `translate(-${percentage}%, -50%)`,
        },
        track: {
          width: `${percentage}%`,
          backgroundColor: color,
        },
      });
    } else {
      e && e.preventDefault();
      const maxPossibleValue = Number(state.values[index].currentValue) +
        state.remainder / state.values[index].multiplier;
      setSliderValue(maxPossibleValue);
      setState((state) => ({
        remainder: 0,
        values: state.values.map((item, i) =>
          i === index ? { ...item, currentValue: maxPossibleValue } : item
        ),
      }));
      const percentage = ((maxPossibleValue - minValue) * 100) / (maxValue - minValue);
      setSliderStyle({
        thumb: {
          left: `${percentage}%`,
          transform: `translate(-${percentage}%, -50%) rotate(45deg)`,
          backgroundColor: color,
        },
        thumbLabel: {
          left: `${percentage}%`,
          transform: `translate(-${percentage}%, -50%)`,
        },
        track: {
          width: `${percentage}%`,
          backgroundColor: color,
        },
      });
    }
  };

  return (
    <div className="wrap">
      <input
        type="range"
        className="range"
        min={minValue}
        max={maxValue}
        step="1"
        onChange={(e) => handleSliderUpdate(e.target.value, e)}
      />
      <SliderCheckpoint
        rangePosition={"start"}
        color={color}
        sliderValue={sliderValue}
        checkpointLabel={minValue}
      />
      <SliderCheckpoint
        rangePosition={"middle"}
        color={color}
        sliderValue={sliderValue}
        checkpointLabel={Math.trunc((minValue + maxValue) / 2)}
      />
      <SliderCheckpoint
        rangePosition={"end"}
        color={color}
        sliderValue={sliderValue}
        checkpointLabel={maxValue}
      />
      <div className="track">
        <div className="track-inner" style={sliderStyle.track} />
      </div>
      <div className="thumb" style={sliderStyle.thumb} />
      <span className="thumbLabel" style={sliderStyle.thumbLabel}>
        {sliderValue}
      </span>
    </div>
  );
};

export default Slider;
