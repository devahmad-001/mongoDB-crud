"use client";
import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
export default function Reset({ params }: any) {
  let { register, handleSubmit } = useForm();
  const userData = async (data: any) => {
    const resetPassword = await fetch("/api/user/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // credentials: "include", // include cookies in the request
    });
    const res = await resetPassword.json();
    console.log(res);
    if (res.status === 200) {
      await emailjs
        .send(
          "service_e5krw4b",
          "template_tj94p9d",
          {
            from_name: "Shoehub",
            to_name: res.user.name,
            reset_link: `http://localhost:3000/user/reset-password/${res.user._id}`,
          },
          "bYuVNNuk06JLNEJ2k"
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("Reset Link Sent Successfully");
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(`${res.message + " " + res.status}`);
    }
  };

  return (
    <>
      <h1>Enyter Your Email </h1>
      <form onSubmit={handleSubmit(userData)}>
        <label>
          <span>Email Address</span>{" "}
        </label>
        <input placeholder="email" {...register("email")} />
        <button>Click Here </button>
      </form>
    </>
  );
}
