"use client";

import { useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import Button from "./Button";

export default function AddEvent() {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLInputElement | null>(null);
  const date = useRef<HTMLInputElement | null>(null);
  const location = useRef<HTMLInputElement | null>(null);

  function handleAddEvent(e: MouseEvent) {}

  return (
    <div>
      <Button
        type="button"
        label="Add Event"
        onClick={() => setModalVisibility(true)}
      />

      {modalVisibility && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white/10">
          Add Event
          <Button
            type="button"
            label="Close"
            onClick={() => setModalVisibility(false)}
          />
          <form action="">
            <LabelledInput type="text" label="Title" reference={title} />
            <LabelledInput
              type="text"
              label="Description"
              reference={description}
            />
            <LabelledInput type="date" label="Date" reference={date} />
            <LabelledInput type="text" label="Location" reference={location} />

            <Button type="submit" label="Add Event" onClick={handleAddEvent} />
          </form>
        </div>
      )}
    </div>
  );
}
