import React, { useState } from "react";

const items = [
  { id: 1, num: 1 },
  { id: 2, num: 2 },
  { id: 3, num: 3 }
];

export default function App() {
  const [vals, setVals] = useState(items);
  const onClick = () => {
    setVals((vals) => {
      return [
        ...vals.slice(0, 1),
        { id: 2, num: Math.random() * 100 },
        ...vals.slice(2)
      ];
    });
  };

  return (
    <div>
      <button onClick={onClick}>update</button>
      {vals.map((v) => {
        return <p key={v.id}>{v.num}</p>;
      })}
    </div>
  );
}