import { useState } from "react";

export default function CartList() {
  const [listItem, setListItem] = useState<string[]>([]);
  const [inputInsertedItem, setInputInsertedItem] = useState<string>("");

  function addToList() {
    setListItem([...listItem, "" + inputInsertedItem]);
  }
  const listItemsElem = listItem.map((value) => {
    return (
      <div
        onClick={() => deleteItem(listItem.indexOf(value))}
        className="border border-black hover:bg-gray-400 mt-1 ml-14 text-lg justify-start w-1/3"
      >
        {value}
      </div>
    );
  });

  function deleteItem(index: number) {
    let newList = [...listItem];
    newList.splice(index, 1);
    setListItem(newList);
  }

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.currentTarget.value;
    setInputInsertedItem(newValue);
  }

  return (
    <div>
      <div className="border-b border-black w-full">
        <label className="font-semibold text-2xl mx-2 mr-6">List Items</label>
        <input
          onChange={inputChange}
          placeholder="Add item"
          className="bg-cyan-100 mx-4"
          value={inputInsertedItem}
          type="text"
        />
        <button className="text-blue-500 font-semibold" onClick={addToList}>
          Add to List
        </button>
      </div>
      <div>{listItemsElem}</div>
    </div>
  );
}

//method 1
// let newList = [...listItem];
// newList.push(2);
// setListItem(newList);

//method 2
// setListItem([...listItem, 2]);
