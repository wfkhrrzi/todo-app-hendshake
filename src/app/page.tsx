"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // list type options
  const typeOptions = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ];

  // list input state
  const [id, setId] = useState(Date.now());
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState(typeOptions[0]);
  const [booking, setBooking] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  type ListProps = {
    id: number;
    activity: string;
    price: number;
    type: string;
    booking: boolean;
    accessibility: number;
  };

  // list state
  const [list, setList] = useState<ListProps[]>([]);

  // fetch existing list from localStorage on mount
  useEffect(() => {
    const list = localStorage.getItem("list");
    if (list) {
      setList(JSON.parse(list));
    }
  }, []);

  // update list in localStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="flex flex-col gap-3 p-3 items-center">
      {/* input list */}
      <div className="flex flex-col gap-3">
        {/* activity input */}
        <div className="">
          <span className="mr-3">Activity:</span>
          <input
            type="text"
            className="outline-1"
            onInput={(value) => setActivity(value.currentTarget.value)}
          />
        </div>
        {/* price input */}
        <div className="">
          <span className="mr-3">Price: RM </span>
          <input
            type="number"
            className="outline-1"
            onInput={(value) => setPrice(Number(value.currentTarget.value))}
          />
        </div>
        {/* type input */}
        <div className="">
          <span className="mr-3">Type:</span>
          <select
            className="outline-1"
            onChange={(value) => setType(value.currentTarget.value)}
            value={type}
          >
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {/* booking input */}
        <div className="">
          <span className="mr-3">Booking required:</span>
          <input
            type="checkbox"
            onChange={(value) => setBooking(value.currentTarget.checked)}
          />
        </div>
        {/* accessibility input */}
        <div className="">
          <span className="mr-3">Accessibility: {accessibility}</span>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step={0.1}
            onChange={(value) =>
              setAccessibility(Number(value.currentTarget.value))
            }
          />
        </div>
        {/* add list button */}
        <div>
          <button
            className="outline-1 px-2"
            onClick={() => {
              setList([
                ...list,
                {
                  id,
                  accessibility,
                  activity,
                  booking,
                  price,
                  type,
                },
              ]);

              setId(Date.now());
            }}
          >
            Add list
          </button>
        </div>
      </div>

      {/* summarize list */}
      <div className="mt-3">Total number of list: {list.length}</div>

      {/* display list with remove button on the side */}
      <div>
        <div>List: {list.length == 0 ? "Empty" : ""}</div>
        <div className="flex flex-col gap-2">
          {list.map((lst, i) => (
            <div key={`list-${lst.id}`} className="flex gap-2">
              {/* list index */}
              <div>{i + 1}.</div>

              {/* list detail */}
              <div>
                <div>activity: {lst.activity} </div>
                <div>price: RM {lst.price} </div>
                <div>type: {lst.type} </div>
                <div>booking: {lst.booking ? "required" : "not required"}</div>
                <div>accessibility: {lst.accessibility}</div>
              </div>

              {/* delete button */}
              <div>
                <button
                  className="outline-1 px-2"
                  onClick={() => {
                    setList(list.filter(({ id }) => id != lst.id));
                  }}
                >
                  Delete list
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
