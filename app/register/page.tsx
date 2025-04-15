'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head"; 

export default function RegisterPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push('/login');
        } 
    };

    return (
        <>
        <Head>
            <title>Alimemento - Registro</title>
            <meta name="description" content="Alimemento um app para nunca mais se esquecer o que comeu ontem" /> 
            <meta name="viewport" content="width=device-width, initial-scale=1" /> 
            <link rel="icon" href="public/icon/icon-alimemento.ico" /> 
        </Head>

        <main
            className="min-h-screen flex items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #A2BF63, #BF0436, #36593F)',
            }}
        >
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-extrabold text-[#36593F] mb-2">Cadastro</h1>
                <p className="text-sm text-[#BF0436] mb-6">É um prazer te receber aqui! 💚</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-[#A2BF63] focus:border-[#BF0436] px-4 py-2 rounded-full outline-none transition duration-200 text-green-600 focus:text-black"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="w-full border border-[#A2BF63] focus:border-[#BF0436] px-4 py-2 rounded-full outline-none transition duration-200 text-green-600 focus:text-black"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#A2BF63] text-white px-6 py-3 rounded-full font-semibold transition-all hover:bg-[#36593F] hover:border-[#36593F] hover:text-white"
                    >
                        Registrar
                    </button>
                </form>

                <p className="mt-4 text-sm text-[#36593F]">
                    Já tem conta?{' '}
                    <a href="/login" className="text-[#BF0436] hover:text-[#A2BF63] underline">
                        Entre aqui
                    </a>
                </p>
            </div>
        </main>
    </>
    );
}
