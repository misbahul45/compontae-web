'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HELP_QUESTION, LIST_CONTACT } from '@/constants';
import { Instagram, Mail, MoveUpRight, Phone } from 'lucide-react'
import Image from 'next/image';
import React, { useRef } from 'react'
import FormHelp from './FormHelp';

const icons=[
            <Mail key={1} className='size-6'/>, 
            <Phone key={2} className='size-6'/>,
            <Instagram key={3} className='size-6'/>
        ]
const Content = () => {
    const helpRef=useRef<HTMLDivElement>(null);
    const goHelp=()=>{
        helpRef.current?.scrollIntoView({behavior:'smooth'})
    }
  return (
    <div className='pb-32 pt-12 space-y-8 overflow-hidden'>
        <section className="w-full md:h-screen h-96 py-8 bg-[url('/bg-help.jpg')] bg-cover bg-blend-normal space-y-4 flex flex-col justify-center md:pl-12 pl-4">
            <div>
                <h1 className='md:text-6xl text-3xl font-bold text-white'>Butuh bantuan?</h1>
                <h2 className='md:text-5xl text-xl font-bold text-white/95'>Berikut adalah pusat bantuan untuk Anda</h2>
            </div>
            <button onClick={goHelp} className='px-6 py-2.5 rounded-md w-fit bg-green-500 text-white flex items-center hover:bg-green-700 group font-semibold transition-all duration-100'>
                <p>Selengkapnya</p>
                <MoveUpRight className='ml-1 w-4 group-hover:w-5 transition-all duration-100'/>
            </button>
        </section>
        <section>
            <h1 ref={helpRef} className='md:text-5xl text-2xl font-bold text-center'>Pertanyaan Yang Sering diajukan</h1>
            <div className='mt-4 w-full mx-auto max-w-2xl space-y-4'>
                {HELP_QUESTION.map((question, index) => (
                    <Accordion type="single" key={index} collapsible className='px-4 py-2 shadow-xl rounded-lg bg-white border-2 border-slate-400'>
                        <AccordionItem value={question.title}>
                            <AccordionTrigger className='font-semibold text-lg'>{question.title}</AccordionTrigger>
                            <AccordionContent className='text-slate-700'>
                                {question.description}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>                  
                ))}
            </div>
        </section>
        <section>
            <h1 className='md:text-5xl text-2xl font-bold text-center'>Posisi kami saat ini</h1>
            <iframe
                className='mt-4 w-full mx-auto max-w-4xl'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.754881342098!2d112.78165930918064!3d-7.268710871388214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa21a3515291%3A0x3edf1522ff735924!2sAirlangga%20University%20-%20Campus%20MERR%20(C)!5e0!3m2!1sen!2sid!4v1730973936447!5m2!1sen!2sid"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
        <section className='flex lg:flex-row px-4 flex-col w-full max-w-6xl mx-auto gap-8 items-center'>
            <div className="w-full max-w-xl bg-green-600 p-8 rounded-xl space-y-3 shadow-xl shadow-slate-400/20">
                <Image src={'/logo.png'} alt="Compontae Logo" width={150} height={150} className='rounded-full mx-auto' />
                <h1 className='font-bold text-3xl text-center text-white'>Compontae</h1>
                <h2 className='text-2xl text-white font-semibold'>Jaga Bumi Dengan Tindakan Nyata!!</h2>
                <p className='text-lg text-white'>Jl. Dr. Ir. H. Soekarno, Mulyorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60115</p>
                {LIST_CONTACT.map((contact, index) => (
                    <div key={index} className='flex gap-4'>
                        <div className='p-4 rounded-full bg-white text-black'>
                          {icons[index]}
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold text-white'>{contact.title}</h1>
                            <p className='text-slate-200'>{contact.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-1 space-y-4">
                <h1 className='text-3xl font-bold text-center'>Have a question?</h1>
                <FormHelp />
            </div>
        </section>
    </div>
  )
}

export default Content