'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('userId', data.userId);
      router.push('/dashboard');
    } else {
      alert("Login Inválido");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #A2BF63, #BF0436, #36593F)',
      }}
    >
      <main className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold text-[#36593F] mb-2">🍽️ Que bom ver você por aqui novamente!</h2>
        <h1 className="text-3xl font-extrabold text-[#BF0436] mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-[#A2BF63] focus:border-[#BF0436] px-4 py-2 rounded-full outline-none transition duration-200  text-green-600 focus:text-black"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border border-[#A2BF63] focus:border-[#BF0436] px-4 py-2 rounded-full outline-none transition duration-200 text-green-600 focus:text-black"
            required
          />
          <button
            type="submit"
            className="w-full glow-btn bg-[#A2BF63] text-white font-semibold py-2 rounded-full hover:bg-[#36593F] hover:border-transparent transition-all"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-[#36593F]">
          Não tem conta?{' '}
          <a href="/register" className="text-[#BF0436] font-semibold hover:underline">
            Cadastre-se
          </a>
        </p>
      </main>
    </div>
  );
}
