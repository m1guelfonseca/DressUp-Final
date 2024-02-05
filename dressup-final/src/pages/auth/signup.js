import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();
  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Por favor, insira seu nome");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameError("O seu nome apenas pode conter letras e espaços");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Por favor insira a sua senha");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula e um número"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Por favor insira um e-mail válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    /*
        console.log("----- Form Submitted ------");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
    */
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log("---- Signup API Response ---");
    console.log(data);
    if (res.ok) {
      // registro feito
      const { token } = data;
      // armazenar o token
      localStorage.setItem('token', token);

      // Redirecionar para dashboard
      router.push('/auth/login');
    } else {
      // registro falhow, adicionar aviso **********************
      console.error(data.message);
      setApiResponse(data.message);
    }
  };

  return (
    <body>
      <div style={{
        zIndex: -1,
        position: 'fixed',
        width: "100vw",
        height: "100vh"
      }}>
        <Image
          src="/images/background.jpg"
          alt="DressUp"
          fill
          cover
        />
      </div>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto">
          <div className=" flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full flex flex-col items-center justify-center">
              <img className='p-4 border-r'
                src="/images/roupa.jpg"
                alt="DressUp"
                width={400}
                height={400}
              />
            </div>
            <div className="w-full py-16 px-12">
              <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-4">Register</h2>
              <p className="mb-4">
                Create your account! Its free and only take a minute.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols gap-5">
                  <input
                    type="text"
                    id="name"
                    placeholder="Introduza o seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <div className="mt-5">
                  <input
                    id="email"
                    placeholder='E-mail'
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail( e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <div className="mt-5">
                  <input
                    id="password"
                    placeholder='Password'
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)
                    }
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <div className="mt-5">
                  <input
                    id="ConfirmPassword"
                    placeholder='Confirmar Password'
                    name="ConfirmPassword"
                    type="password"
                    autoComplete="ConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <div className="mt-5">
                  <button type="submit" className="w-full rounded bg-purple-500 hover:bg-purple-400 py-3 text-center text-white">Register Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Signup;