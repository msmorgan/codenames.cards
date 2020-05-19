import Button from "../components/Button";
import { IGameOptions, defaultOptions } from "../lib/game";
import { useState } from "react";
import { useNewGame } from "../hooks/game";
import classnames from "classnames";

export default () => {
  const newGame = useNewGame();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<IGameOptions>(defaultOptions);

  return (
    // todo add options and stuff
    <div className="w-screen h-screen p-6 flex flex-col items-center bg-gray-100">
      <h1 className="h1 font-mono mt-6 mb-4">codenames.cards</h1>

      <h2 className="text-xl font-bold mt-6 mb-4">Choose your options</h2>
      <Form className="mb-4" options={options} setOptions={setOptions} />

      <Button
        className="p-6 flex items-center justify-center"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          try {
            await newGame(options);
          } catch (error) {
            setLoading(false);
          }
        }}
      >
        Create game
      </Button>
    </div>
  );
};

const Form = ({
  className,
  options,
  setOptions,
}: {
  className: string;
  options: IGameOptions;
  setOptions: (options: IGameOptions) => void;
}) => {
  return (
    <form className={className}>
      <div className="mb-2 w-64">
        <h2 className="mb-2">Dictionary</h2>
        <MultipleChoice
          options={[
            {
              label: "🇬🇧 English",
              value: "en",
            },
            {
              label: "🇫🇷 Français",
              value: "fr",
            },
            {
              label: "🇩🇪 Deutsch",
              value: "de",
            },
            {
              label: "🇪🇸 Español",
              value: "es",
            },
            {
              label: "🔥 Emoji",
              value: "emoji",
            }
          ]}
          onClick={(language) => setOptions({ ...options, language })}
          selected={options.language}
        />
      </div>
      <div className="mb-2 w-64">
        <h2 className="mb-2">Mode</h2>
        <MultipleChoice
          options={[
            { value: "duet", label: "👥 Duet" },
            { value: "classic", label: "👨‍👩‍👧‍👦 Classic" },
          ]}
          onClick={(mode) => setOptions({ ...options, mode })}
          selected={options.mode}
        />
      </div>
      <div className="mb-2 w-64">
        <h2 className="mb-2">Public game</h2>
        <MultipleChoice
          options={[
            { value: "private", label: "🔒 Private" },
            { value: "public", label: "🖖 Public" },
          ]}
          onClick={(p) => setOptions({ ...options, private: p })}
          selected={options.private}
        />
      </div>
    </form>
  );
};

interface IMultipleChoice {
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  selected: string;
}

const MultipleChoice = ({ options, onClick, selected }) => {
  return (
    <div className="grid gap-2 grid-cols-2">
      {options.map((opt) => (
        <div
          key={opt.value}
          className={classnames(
            "rounded px-2 py-1 cursor-pointer w-32 text-center font-bold text-white border-b-4 ",
            {
              "bg-green-600 border-green-800": selected === opt.value,
              "bg-blue-600 border-blue-800 hover:bg-blue-500 hover:border-blue-700":
                selected !== opt.value,
            }
          )}
          onClick={() => onClick(opt.value)}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};
