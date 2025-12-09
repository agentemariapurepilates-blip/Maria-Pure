/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, CheckCircle2, Globe2, Building2, Users, Trophy } from 'lucide-react';
import { StatsSection, DifferentialsSection } from './components/LandingSections';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Modelo', href: '#modelo' },
    { name: 'Números', href: '#numeros' },
    { name: 'Diferenciais', href: '#diferenciais' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer z-50 select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           {/* Recreated Vector Logo to match the provided image exactly */}
           <svg viewBox="0 0 240 80" className="h-12 md:h-16 w-auto" aria-label="Pure Pilates Franchising">
              {/* ICON GROUP */}
              <g transform="translate(10, 10) scale(0.6)">
                {/* Red Ball */}
                <circle cx="20" cy="20" r="16" fill="#D6001C" />
                
                {/* Person Silhouette (Black) */}
                {/* Simplified Pilates Pose: Legs up touching ball, body curved on floor */}
                <path d="M 22 36 
                         C 22 36, 25 50, 35 55 
                         C 45 60, 50 65, 48 75
                         C 46 85, 30 85, 25 75
                         C 20 65, 15 55, 22 36 Z" 
                      fill="#111" />
                {/* Head */}
                <circle cx="45" cy="80" r="6" fill="#111" />
                {/* Legs connecting to ball */}
                <path d="M 18 30 L 25 45 L 30 40 Z" fill="#111" />
              </g>

              {/* TEXT GROUP */}
              <g transform="translate(55, 15)">
                 {/* 'Pure' Text - Using the font loaded in index.html to approximate */}
                 <text x="0" y="35" fontFamily="'Montserrat', sans-serif" fontWeight="800" fontSize="42" fill="#D6001C" letterSpacing="-1">Pure</text>
                 
                 {/* 'FRANCHISING' Text */}
                 <text x="2" y="58" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="11" fill="#111" letterSpacing="2.5">FRANCHISING</text>
              </g>
           </svg>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className={`text-sm font-semibold uppercase tracking-wide transition-colors ${scrolled ? 'text-pure-dark hover:text-pure' : 'text-pure-dark/80 hover:text-pure'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato" 
            className="px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-pure text-white hover:bg-pure-accent"
          >
            Seja Franqueado
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 z-50 text-pure-dark" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 pt-20"
          >
             {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-serif text-pure-dark font-bold"
                >
                  {link.name}
                </a>
             ))}
             <a 
               href="#contato"
               onClick={() => setMenuOpen(false)}
               className="px-8 py-3 bg-pure text-white rounded-full font-bold shadow-lg"
             >
               Quero conversar
             </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingBall = ({ size, color, top, left, right, bottom, delay, duration, blur = '0px', zIndex = 0 }: any) => {
  const isRed = color === 'red';
  const bgGradient = isRed 
    ? 'radial-gradient(circle at 35% 35%, #FF4D5E, #D6001C, #850009)' 
    : 'radial-gradient(circle at 35% 35%, #555, #111, #000)';

  return (
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: duration, 
        ease: "easeInOut",
        delay: delay
      }}
      className="absolute rounded-full ball-shadow pointer-events-none"
      style={{
        width: size,
        height: size,
        top, left, right, bottom,
        background: bgGradient,
        filter: `blur(${blur})`,
        zIndex: zIndex
      }}
    />
  );
};

const HeroSection: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
       
       {/* Floating Pilates Balls Background - Repositioned around the center headline */}
       <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Top Left Cluster */}
          <FloatingBall size={180} color="red" top="10%" left="5%" duration={6} delay={0} blur="2px" />
          <FloatingBall size={60} color="black" top="25%" left="15%" duration={4} delay={1.5} blur="1px" />
          
          {/* Top Right Cluster */}
          <FloatingBall size={120} color="black" top="15%" right="8%" duration={7} delay={1} blur="3px" />
          <FloatingBall size={40} color="red" top="10%" right="20%" duration={5} delay={2} blur="1px" />
          
          {/* Bottom Left Cluster */}
          <FloatingBall size={80} color="black" bottom="20%" left="10%" duration={5.5} delay={0.5} blur="2px" />
          <FloatingBall size={250} color="red" bottom="-50px" left="-50px" duration={8} delay={2} blur="4px" />

          {/* Bottom Right Cluster */}
          <FloatingBall size={200} color="black" bottom="10%" right="-20px" duration={6.5} delay={1} blur="1px" />
          <FloatingBall size={70} color="red" bottom="30%" right="15%" duration={4.5} delay={3} blur="2px" />
       </div>

       <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative"
          >
             {/* Tiny balls very close to text for depth */}
             <div className="absolute -top-10 -left-10 hidden md:block">
                <FloatingBall size={30} color="red" top="0" left="0" duration={3} delay={0} blur="0px" />
             </div>
             <div className="absolute top-1/2 -right-20 hidden md:block">
                <FloatingBall size={40} color="black" top="0" left="0" duration={4} delay={1} blur="1px" />
             </div>

             <div className="inline-block px-4 py-1 bg-pure-light text-pure font-bold text-xs tracking-[0.2em] rounded-full mb-8 border border-pure/10 uppercase">
               Franchising
             </div>
             
             <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-pure-dark leading-tight mb-8">
                A maior rede de <span className="text-pure relative inline-block">
                  Pilates
                  {/* Underline decoration */}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-pure opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> <br className="hidden md:block" />
                da América Latina.
             </h1>
             
             <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
               Agora, sua próxima franquia. Conheça o modelo de negócios da Pure Pilates e faça parte de um ecossistema de bem-estar, tecnologia e escala.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contato" 
                  className="px-10 py-5 bg-pure text-white rounded-full font-bold text-lg hover:bg-pure-accent transition-all shadow-xl hover:shadow-pure/30 transform hover:-translate-y-1"
                >
                  Quero ser franqueado
                </a>
                <a 
                  href="#numeros" 
                  className="px-10 py-5 bg-white text-pure-dark border-2 border-gray-100 rounded-full font-bold text-lg hover:border-pure hover:text-pure transition-all shadow-sm hover:shadow-md"
                >
                  Conheça os números
                </a>
             </div>
          </motion.div>
       </div>

       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-pure animate-bounce">
          <ChevronRight className="rotate-90" size={32} />
       </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-pure-dark text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
           <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                 {/* Footer Logo - Simplified Text version or Image if needed */}
                 <div className="flex flex-col justify-center items-start">
                    <span className="font-serif font-extrabold text-3xl leading-none text-white tracking-tighter" style={{ fontFamily: '"Montserrat", sans-serif' }}>Pure</span>
                    <span className="font-sans text-[0.6rem] font-bold text-white/80 tracking-[0.25em] uppercase mt-1 pl-0.5">FRANCHISING</span>
                 </div>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Transformando vidas através do movimento. O maior ecossistema de Pilates da América Latina, unindo tecnologia, educação e gestão eficiente.
              </p>
           </div>
           <div>
              <h3 className="font-bold mb-6 text-white tracking-widest text-sm uppercase">Navegação</h3>
              <ul className="space-y-3 text-gray-400">
                 <li><a href="#modelo" className="hover:text-pure transition-colors">O Modelo</a></li>
                 <li><a href="#numeros" className="hover:text-pure transition-colors">Números</a></li>
                 <li><a href="#diferenciais" className="hover:text-pure transition-colors">Diferenciais</a></li>
              </ul>
           </div>
           <div>
              <h3 className="font-bold mb-6 text-white tracking-widest text-sm uppercase">Contato</h3>
              <ul className="space-y-3 text-gray-400">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pure rounded-full"></div> expansao@purepilates.com.br</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pure rounded-full"></div> (11) 99999-9999</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pure rounded-full"></div> São Paulo, SP</li>
              </ul>
           </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
           <div>&copy; {new Date().getFullYear()} Pure Pilates Franchising. Todos os direitos reservados.</div>
           <div className="flex gap-6 mt-4 md:mt-0">
              <span className="cursor-pointer hover:text-white transition-colors">Política de Privacidade</span>
              <span className="cursor-pointer hover:text-white transition-colors">Termos de Uso</span>
           </div>
        </div>
      </div>
    </footer>
  )
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pure selection:text-white">
      <Navbar />
      <HeroSection />
      
      <main>
        <section id="numeros" className="py-24 bg-white relative z-20">
           <StatsSection />
        </section>

        <section id="modelo" className="py-24 bg-gray-50">
           <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                 <h2 className="text-pure font-bold tracking-[0.2em] text-sm uppercase mb-3">Nossa Estrutura</h2>
                 <h3 className="text-3xl md:text-4xl font-serif font-bold text-pure-dark mb-6">
                    Um modelo validado para <span className="text-pure">alta performance</span>
                 </h3>
                 <p className="text-lg text-gray-600 leading-relaxed">
                    Não somos apenas estúdios de Pilates. Somos uma plataforma completa de gestão, educação e tecnologia desenhada para maximizar resultados e simplificar a operação do franqueado.
                 </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { icon: Building2, title: "Multilojas", desc: "Nossos franqueados crescem conosco. Mais de 40% da rede é composta por franqueados com mais de uma unidade." },
                    { icon: Globe2, title: "Expansão Internacional", desc: "Presença consolidada no Brasil e operações em crescimento na Europa (Portugal), provando a força da marca." },
                    { icon: Users, title: "Academy Própria", desc: "Formamos nossos próprios instrutores através da Pure Pilates Academy, garantindo qualidade técnica e reposição ágil." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-pure transition-all shadow-sm hover:shadow-xl group"
                    >
                       <div className="w-14 h-14 bg-pure-light rounded-xl flex items-center justify-center text-pure mb-6 group-hover:bg-pure group-hover:text-white transition-colors">
                          <item.icon size={28} />
                       </div>
                       <h4 className="text-xl font-bold text-pure-dark mb-3">{item.title}</h4>
                       <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                  ))}
              </div>
           </div>
        </section>

        <section id="diferenciais" className="py-24 bg-pure-dark relative overflow-hidden">
           {/* Decorative elements for dark section */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pure opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
               <div className="container mx-auto px-6 mb-16 text-center md:text-left">
                  <h2 className="text-pure font-bold tracking-[0.2em] text-sm uppercase mb-4">Diferenciais Competitivos</h2>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                        Tecnologia e suporte para você escalar
                  </h3>
               </div>
               <DifferentialsSection />
           </div>
        </section>

        <section id="contato" className="py-24 bg-white relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10">
              <div className="bg-gray-100 rounded-[2rem] p-8 md:p-20 text-center shadow-inner relative overflow-hidden border border-gray-200">
                  
                  {/* Background decoration circles */}
                  <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white rounded-full opacity-50 blur-2xl"></div>
                  <div className="absolute -right-20 -top-20 w-80 h-80 bg-pure-light rounded-full opacity-50 blur-2xl"></div>

                  <div className="relative z-10 max-w-4xl mx-auto">
                      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-pure-dark">
                        Pronto para liderar o mercado de bem-estar na sua região?
                      </h2>
                      <p className="text-lg text-gray-600 mb-10 font-medium">
                        Converse com nosso time de expansão e descubra as regiões disponíveis para abertura imediata.
                      </p>
                      <button className="px-12 py-5 bg-pure text-white rounded-full font-bold text-xl hover:bg-pure-accent transition-colors shadow-xl hover:shadow-2xl hover:shadow-pure/20 transform hover:-translate-y-1 w-full md:w-auto">
                         Quero conversar sobre a franquia
                      </button>
                      <p className="mt-8 text-sm text-gray-400 font-semibold tracking-wide uppercase">
                         Sem compromisso. Receba nossa apresentação comercial.
                      </p>
                  </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
