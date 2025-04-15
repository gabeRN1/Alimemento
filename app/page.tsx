'use client';

import { useRef } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center py-20 px-6"
        style={{
          background: 'linear-gradient(135deg, #A2BF63, #BF0436, #36593F)',
        }}
      >
        <h1
          className="text-6xl font-extrabold mb-4"
          style={{
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-1px',
          }}
        >
          Alimemento 🍽️
        </h1>
        <p className="text-lg max-w-md mb-8" style={{ color: 'white' }}>
          Lembre-se de se alimentar bem, registre suas refeições e mantenha sua rotina saudável com facilidade.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <a
            href="/register"
            className="px-6 py-3 text-white rounded-full font-semibold transition-all hover:bg-[#A2BF63] hover:text-white hover:border-transparent border-2 border-transparent glow-btn"
            style={{
              backgroundColor: '#A2BF63', 
              borderRadius: '50px',
              border: '2px solid #A2BF63',
            }}
          >
            Crie sua conta já
          </a>
          <a
            href="/login"
            className="px-6 py-3 text-white rounded-full font-semibold transition-all hover:bg-[#BF0436] hover:text-white hover:border-transparent border-2 border-transparent glow-btn"
            style={{
              backgroundColor: '#BF0436',
              borderRadius: '50px',
              border: '2px solid #BF0436',
            }}
          >
            Faça login
          </a>
        </div>

        {/* Botão "Saiba Mais" com animação contínua de setinha */}
        <button
          onClick={scrollToAbout}
          className="text-[#5dbe75] font-semibold hover:text-[#A2BF63] transition-all flex items-center gap-1 mt-10"
          style={{
            background: 'none', // Sem fundo
            border: 'none', // Sem borda
            padding: '0', // Sem padding
            fontSize: '1.5rem', // Tamanho do texto
          }}
        >
          <span className="animate-bounce inline-block">Saiba mais</span>
          {/* Setinha aumentada */}
          <span className="animate-bounce text-4xl inline-block">↓</span>
        </button>
      </section>

      {/* Sobre o App */}
      <section
        ref={aboutRef}
        className="py-20 px-6 text-left border-t"
        style={{ backgroundColor: 'white', borderColor: 'var(--color-sand)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: '#36593F' }}>
              Seu aliado no dia a dia alimentar 🍽️
            </h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: '#36593F' }}>
              O <strong>Alimemento</strong> foi pensado para te acompanhar na rotina. Sabemos que nem sempre é fácil lembrar de comer bem com tanta correria, por isso criamos um app que ajuda você a:
            </p>

            <ul className="space-y-3 list-disc list-inside mb-8" style={{ color: '#36593F' }}>
              <li>⏰ Lembrar de cada refeição do dia</li>
              <li>📋 Registrar suas refeições em segundos</li>
              <li>🔥 Controlar suas calorias e metas diárias</li>
              <li>📅 Visualizar seu progresso ao longo da semana</li>
            </ul>

            <p className="font-semibold" style={{ color: '#A2BF63' }}>
              Seu bem-estar começa com o que você come. E o Alimemento vai te lembrar disso todos os dias.
            </p>
          </div>

          {/* Imagem */}
          <div className="flex justify-center">
            <Image
              src="/images/comida.png"
              alt="Prato de comida deliciosa"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contato */}
      <section
  className="py-20 px-6 text-center border-t"
  style={{
    backgroundColor: '#F0F4F1', // Fundo suave para a seção de contato
    borderColor: '#A2BF63', // Cor de borda para combinar com o tema
  }}
>
  <h2
    className="text-4xl font-extrabold mb-4"
    style={{
      color: '#36593F', // Cor do título em verde escuro
      fontFamily: 'Poppins, sans-serif',
      letterSpacing: '-0.5px',
    }}
  >
    Fale com a gente
  </h2>
  <p
    className="max-w-xl mx-auto mb-8"
    style={{
      color: '#4A4A4A', // Cor do texto em cinza escuro
      fontSize: '1.1rem',
      fontWeight: '500',
    }}
  >
    Tem sugestões, encontrou um problema ou quer colaborar? Entre em contato conosco!
  </p>

  <form className="max-w-md mx-auto space-y-6">
    {/* Campo de Nome */}
    <input
      type="text"
      placeholder="Seu nome"
      className="w-full px-6 py-3 border-2 border-[#A2BF63] rounded-lg focus:ring-2 focus:ring-[#A2BF63] focus:border-[#A2BF63] text-[#36593F] placeholder:text-[#A2BF63] transition-all"
      required
    />
    
    {/* Campo de E-mail */}
    <input
      type="email"
      placeholder="Seu e-mail"
      className="w-full px-6 py-3 border-2 border-[#A2BF63] rounded-lg focus:ring-2 focus:ring-[#A2BF63] focus:border-[#A2BF63] text-[#36593F] placeholder:text-[#A2BF63] transition-all"
      required
    />
    
    {/* Campo de Mensagem */}
    <textarea
      placeholder="Mensagem"
      rows={4}
      className=" resize-none w-full px-6 py-3 border-2 border-[#A2BF63] rounded-lg focus:ring-2 focus:ring-[#A2BF63] focus:border-[#A2BF63] text-[#36593F] placeholder:text-[#A2BF63] transition-all"
      required
      
    />
    
    {/* Botão de Envio */}
    <button
      type="submit"
      className="w-full px-6 py-3 text-white rounded-full font-semibold bg-[#A2BF63] hover:bg-[#7E9F4A] transition duration-300 transform hover:scale-105"
    >
      Enviar mensagem
    </button>
  </form>
</section>
    </main>
  );
}
