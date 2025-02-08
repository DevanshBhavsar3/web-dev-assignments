"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Signin() {
  const router = useRouter();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!email.current || !password.current) {
      setError("Please provide credentials.");
      return;
    }

    const res = await signIn("credentials", {
      email: email.current.value,
      password: password.current.value,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid Credentials.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <form className="flex flex-col justify-center items-start h-screen gap-2">
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
          Sign in
        </button>
      </form>
    </div>
  );
}
