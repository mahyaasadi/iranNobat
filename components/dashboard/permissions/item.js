import { useState, useEffect } from "react";

export default function Item({ item }) {
  return <div>{item.name}</div>;
}
