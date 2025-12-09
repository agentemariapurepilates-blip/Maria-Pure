/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform, animate } from 'framer-motion';
import { Smartphone, Award, Users2, LineChart, GraduationCap, CheckCircle } from 'lucide-react';

// --- ANIMATED COUNTER ---
const Counter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    
    useEffect(() => {
        if (isInView) {
            // Animate from 0 to value over 2.5 seconds
            // FIXED: Used `animate` directly instead of `motion.animate`
            const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
            return controls.stop;
        }
    }, [isInView, value, count]);

    return (
        <div ref={ref} className="flex flex-col items-center p-6 text-center group">
            <div className="text-4xl md:text-6xl font-serif font-bold text-pure mb-2 flex items-baseline group-hover:scale-110 transition-transform duration-300">
                <motion.span>{rounded}</motion.span>
                <span>{suffix}</span>
            </div>
            <div className="text-sm font-bold tracking-widest text-gray-800 uppercase border-b-2 border-transparent group-hover:border-pure pb-1 transition-all">{label}</div>
        </div>
    );
};

export const StatsSection: React.FC = () => {
    return (
        <div className="container mx-auto px-6">
            <div className="bg-white rounded-2xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <Counter value={300} label="Estúdios Ativos" suffix="+" />
                    <Counter value={15} label="Anos de História" suffix="" />
                    <Counter value={50} label="Cidades" suffix="+" />
                    <Counter value={98} label="Satisfação (NPS)" suffix="%" />
                </div>
            </div>
        </div>
    );
};

// --- DIFFERENTIALS GRID ---
const DifferentialCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay }}
            className="flex flex-col items-start p-6 bg-pure-dark/40 backdrop-blur-sm rounded-xl border border-white/10 hover:border-pure/50 transition-all duration-300 group hover:bg-pure-dark/60"
        >
            <div className="p-3 bg-pure rounded-lg text-white mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-pure/30">
                <Icon size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
                {desc}
            </p>
        </motion.div>
    )
}

export const DifferentialsSection: React.FC = () => {
    const differentials = [
        {
            icon: Smartphone,
            title: "App Exclusivo de Gestão",
            desc: "Tecnologia proprietária para agendamentos, pagamentos e gestão financeira. O aluno agenda pelo app, você gerencia com um clique."
        },
        {
            icon: Award,
            title: "Marca Líder",
            desc: "Reconhecimento de mercado que atrai alunos organicamente. Ser Pure Pilates é sinônimo de qualidade técnica."
        },
        {
            icon: Users2,
            title: "Suporte Operacional",
            desc: "Equipe de consultores de campo dedicada a analisar seus KPIs e sugerir melhorias constantes de performance."
        },
        {
            icon: GraduationCap,
            title: "Universidade Corporativa",
            desc: "Treinamento contínuo para recepcionistas, gestores e instrutores através de nossa plataforma EAD."
        },
        {
            icon: LineChart,
            title: "Marketing Digital Centralizado",
            desc: "Estratégias de tráfego pago e branding geridas pela franqueadora para gerar leads qualificados para sua unidade."
        },
        {
            icon: CheckCircle,
            title: "Implantação Chave na Mão",
            desc: "Suporte completo na escolha do ponto, projeto arquitetônico e negociação com fornecedores homologados."
        }
    ];

    return (
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {differentials.map((item, index) => (
                    <DifferentialCard 
                        key={index}
                        {...item}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </div>
    );
};