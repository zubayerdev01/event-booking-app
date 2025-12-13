"use client";
import { performLogin } from "@/app/actions";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const found = await performLogin(formData);

      if (found) {
        setAuth(found);
        router.push("/");
      } else {
        setError("Please provide valid credentials");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="my-2">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <form onSubmit={onSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
