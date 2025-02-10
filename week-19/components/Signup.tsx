"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import Button from "./Button";

export default function Signup() {
  const router = useRouter();
  const username = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username.current || !email.current || !password.current) {
      setError("Please provide credentials.");
      return;
    }

    try {
      const response = await axios.post(`api/auth/signup`, {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        router.push("/signin");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setError("Cannot sign up.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <form className="flex flex-col justify-center items-start h-screen gap-2">
        <LabelledInput type="text" label="Username" reference={username} />
        <LabelledInput
          type="text"
          label="Email"
          reference={email}
          placeholder="e.g. name@email.com"
        />
        <LabelledInput type="password" label="Password" reference={password} />

        {error && <span className="text-white">{error}</span>}

        <Button type="submit" label="Sign up" onClick={handleSubmit} />
      </form>
    </div>
  );
}
