"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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

      router.push("/");
    } catch (e) {
      setError("Email alredy exists.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <form className="flex flex-col justify-center items-start h-screen gap-2">
        <label htmlFor="username" className="text-white">
          Username
        </label>
        <input type="text" name="username" id="username" ref={username} />

        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input type="text" name="email" id="email" ref={email} />

        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input type="text" name="password" id="password" ref={password} />
        {error && <span className="text-white">{error}</span>}

        <button
          type="submit"
          className="w-full text-center bg-white text-black"
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
