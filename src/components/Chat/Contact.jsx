//Contacts with whom chat room had been created
import React from "react";
import temp from "../../assets/logo.png";
export default function Contacts({ name, friend, choose }) {
  return (
    <div
      className="contact"
      onClick={() => {
        choose(friend);
      }}
      style={{ marginBottom: "12px" }}
    >
      <img
        src={temp}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: "20px",
        }}
      />
      <span>
        <strong>{name}</strong>
      </span>
    </div>
  );
}
