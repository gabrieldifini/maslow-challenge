import { useState } from "react";
import SliderCard from "./components/SliderCard";
import ChartCard from "./components/ChartCard";
import TotalsCard from "./components/TotalsCard";
import Modal from "./components/Modal";

const DEFAULT_PALETTE = ["var(--green)", "var(--blue)", "var(--orange)"];

const DEFAULT_DATA = {
  values: [
    {
      title: "Sueldo base",
      subtitle: "Mensual",
      currency: "ARS",
      details: "Sueldo base",
      minValue: 500,
      maxValue: 2000,
      currentValue: 856,
      multiplier: 2,
    },
    {
      title: "Puntos Maslow",
      subtitle: "Mensual",
      currency: "ARS",
      details: "Puntos canjeables en un marketplace",
      minValue: 0,
      maxValue: 1000,
      currentValue: 500,
      multiplier: 1,
    },
    {
      title: "Bono anual",
      subtitle: "Mensual",
      currency: "ARS",
      details: "",
      minValue: 1000,
      maxValue: 3000,
      currentValue: 2000,
      multiplier: 0.5,
    },
  ],
  remainder: 72,
};

export default function Home() {
  const [state, setState] = useState(DEFAULT_DATA);
  const [modal, setModal] = useState({ content: "", visible: false });

  const colorsPalette = DEFAULT_DATA.values.map(
    (_item, i) =>
      DEFAULT_PALETTE[
        i >= DEFAULT_PALETTE.length ? i % DEFAULT_PALETTE.length : i
      ]
  );

  const handleClick = () => {
    const ModalContent = () => {
      return (
        <div className="flex flex-col justify-center gap-6">
          <div className="text-center">
            <i
              className="fa fa-check-circle fa-4 text-8xl"
              style={{ color: "var(--green)" }}
            />
          </div>
          <span>La actualización se realizó correctamente</span>
          <button
            type="button"
            className={
              "px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white submit-btn"
            }
            onClick={() => setModal({ content: "", visible: false })}
          >
            OK
          </button>
        </div>
      );
    };

    setModal({ content: <ModalContent />, visible: true });
  };

  return (
    <>
      <div className="p-6 h-fit">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 grid grid-rows-3 gap-6 lg:col-span-2 mt-6">
            {state.values.map((item, i) => (
              <SliderCard
                key={i}
                index={i}
                title={item.title}
                subtitle={item.subtitle}
                currency={item.currency}
                details={item.details}
                color={colorsPalette[i]}
                minValue={item.minValue}
                maxValue={item.maxValue}
                multiplier={item.multiplier}
                state={state}
                setState={setState}
                setModal={setModal}
              />
            ))}
          </div>
          <div className="col-span-3 lg:col-span-1 mt-0 lg:mt-6">
            <div className="pb-6">
              <ChartCard
                title={"Tu compensación"}
                subtitle={"Representación gráfica de tu compensación"}
                data={state.values}
                colorsPalette={colorsPalette}
              />
            </div>
            <TotalsCard
              currency={"ARS"}
              remainder={state.remainder}
              total={state.values.reduce(
                (acc, item) => acc + Number(item.currentValue),
                0
              )}
            />
            <div className="mb-16">
              <button
                type="button"
                className="transition-all px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white submit-btn mt-6 absolute right-0 mr-6"
                onClick={handleClick}
              >
                Enviar actualización
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} />
    </>
  );
}
