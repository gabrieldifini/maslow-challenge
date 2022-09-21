import { useState, useEffect } from "react";
import Slider from "./Slider";

const SliderCard = ({
  title = "",
  subtitle = "",
  currency = "",
  details = "",
  color,
  minValue = 0,
  maxValue = 100,
  multiplier = 1,
  state,
  setState,
  index,
  setModal,
}) => {
  const [key, setKey] = useState(Math.random() * 100000);

  const handleClick = () => {
    const ModalContent = ({ setModal }) => {
      const [inputValue, setInputValue] = useState(
        state.values[index].currentValue
      );
      const [error, setError] = useState(false);
      const maxValue =
        Number(state.values[index].currentValue) +
        state.remainder / state.values[index].multiplier;

      const handleInput = (e) => {
        const value = Number(e.target.value);
        setError(value > maxValue || value < minValue);
        setInputValue(value);
      };

      const handleSubmit = () => {
        if (!error) {
          const { currentValue } = state.values[index];
          const variation = (inputValue - currentValue) * multiplier;
          const remainder = state.remainder - variation;
          setState((state) => ({
            remainder,
            values: state.values.map((item, i) =>
              i === index ? { ...item, currentValue: inputValue } : item
            ),
          }));
          setModal({ content: "", visible: false });
          setKey(Math.random() * 100000);
        }
      };

      return (
        <div className="flex flex-col justify-center gap-6">
          <h2 className="font-bold text-gray-800 text-lg h-100 text-center">
            {title.toUpperCase()}
          </h2>
          <input
            type="number"
            min={minValue}
            max={maxValue}
            value={inputValue}
            onChange={handleInput}
            className={`border border-solid rounded-lg p-1 m-auto mb-2 w-28 text-center shadow-md ${
              error ? "border-red-600" : "border-slate-300"
            }`}
          />
          <button
            type="button"
            className={`px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white ${
              error ? "disabled-btn" : "submit-btn"
            }`}
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </div>
      );
    };

    setModal({
      content: <ModalContent setModal={setModal} />,
      visible: true,
    });
  };

  return (
    <div className="border-solid bg-white border border-gray-100 rounded-lg px-12 py-6 relative shadow-md">
      <div className="pb-3">
        <h2 className="font-bold text-gray-800 text-lg">
          {title.toUpperCase()}
        </h2>
        <h3 className="text-gray-500">{subtitle}</h3>
        <h3 className="text-gray-500 font-bold text-sm">{currency}</h3>
        <h3 className="text-gray-500">{details}</h3>
      </div>
      <span className="absolute top-0 right-0 pr-12 pt-6 text-sm">
        {multiplier}x
      </span>
      <div className="pb-8">
        <Slider
          key={key}
          color={color}
          minValue={minValue}
          maxValue={maxValue}
          state={state}
          setState={setState}
          index={index}
        />
      </div>
      <div className="absolute bottom-0 right-0 pr-12 pb-6 ">
        <button
          className="text-gray-500 text-xl hover:text-black transition-all"
          onClick={handleClick}
        >
          <i className="fa fa-pencil" />
        </button>
      </div>
    </div>
  );
};

export default SliderCard;
