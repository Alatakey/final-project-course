import { useState } from "react";

interface InputValues {
  width: string;
  height: string;
  color: string;
  backgroundColor: string;
}

export default function PageBuilder() {
  const [divManager, setDivManager] = useState<JSX.Element[]>([]);
  const [inputValues, setInputValues] = useState<InputValues>({
    width: "",
    height: "",
    color: "",
    backgroundColor: "",
  });

  const colorOptions = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
    { label: "Purple", value: "purple" },
    { label: "Orange", value: "orange" },
    { label: "Pink", value: "pink" },
    { label: "Cyan", value: "cyan" },
    { label: "Magenta", value: "magenta" },
    { label: "Lime", value: "lime" },
    { label: "Teal", value: "teal" },
    { label: "Indigo", value: "indigo" },
    { label: "Brown", value: "brown" },
    { label: "Navy", value: "navy" },
    { label: "Maroon", value: "maroon" },
    { label: "Olive", value: "olive" },
    { label: "Sky Blue", value: "skyblue" },
    { label: "Salmon", value: "salmon" },
    { label: "Slate Gray", value: "slategray" },
    { label: "Dark Turquoise", value: "darkturquoise" },
  ];

  const backgroundColorOptions = [
    { label: "White", value: "white" },
    { label: "Gray", value: "gray" },
    { label: "Black", value: "black" },
    { label: "Silver", value: "silver" },
    { label: "Gold", value: "gold" },
    { label: "Violet", value: "violet" },
    { label: "Crimson", value: "crimson" },
    { label: "Dark Orange", value: "darkorange" },
    { label: "Firebrick", value: "firebrick" },
    { label: "Forest Green", value: "forestgreen" },
    { label: "Deep Pink", value: "deeppink" },
    { label: "Dark Orchid", value: "darkorchid" },
    { label: "Dark Cyan", value: "darkcyan" },
    { label: "Light Coral", value: "lightcoral" },
    { label: "Dark Slate Blue", value: "darkslateblue" },
    { label: "Chocolate", value: "chocolate" },
    { label: "Medium Sea Green", value: "mediumseagreen" },
    { label: "Tomato", value: "tomato" },
    { label: "Saddle Brown", value: "saddlebrown" },
    { label: "Steel Blue", value: "steelblue" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitButtonClicked = () => {
    const { width, height, color, backgroundColor } = inputValues;

    const newDivStyle: React.CSSProperties = {
      width: `${width}px`,
      height: `${height}px`,
      color,
      backgroundColor,
    };

    const newDiv = (
      <div
        className="border border-solid border-black p-4 m-2"
        style={newDivStyle}
        key={divManager.length}
      ></div>
    );

    setDivManager((prevState) => [...prevState, newDiv]);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <label className="mr-2">Width:</label>
          <input
            className="bg-gray-200 p-2 rounded-md"
            type="text"
            name="width"
            value={inputValues.width}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Height:</label>
          <input
            className="bg-gray-200 p-2 rounded-md"
            type="text"
            name="height"
            value={inputValues.height}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Color:</label>
          <select
            className="bg-gray-200 p-2 rounded-md"
            name="color"
            value={inputValues.color}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="">Select Color</option>
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Background Color:</label>
          <select
            className="bg-gray-200 p-2 rounded-md"
            name="backgroundColor"
            value={inputValues.backgroundColor}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="">Select Background Color</option>
            {backgroundColorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={submitButtonClicked}
        >
          Add Box
        </button>
      </div>
      <div className="flex flex-wrap mt-4">{divManager}</div>
    </div>
  );
}
