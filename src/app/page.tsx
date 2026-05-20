"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useState, useRef } from "react";
import LiveBackground from "@/components/LiveBackground";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Smooth scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", // Snappy easing to prevent choppiness
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Horizontal scroll gallery logic
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const walk = 400; // rough width of one item
    galleryRef.current.scrollBy({ left: direction === 'left' ? -walk : walk, behavior: 'smooth' });
  };

  return (
    <main className="flex flex-col min-h-screen relative overflow-x-hidden">
      <LiveBackground />
      {/* TopNavBar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full top-0 sticky z-50 bg-surface/90 backdrop-blur-md border-b border-primary"
      >
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md text-primary tracking-tighter uppercase whitespace-nowrap break-keep">
            EST. SALON
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {["Services", "Gallery", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-label-caps text-label-caps text-on-surface hover:text-secondary transition-colors duration-300 uppercase relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#book"
              className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 uppercase hover:bg-secondary transition-colors duration-300"
            >
              Book Now
            </motion.a>
          </div>
          <button
            aria-label="Toggle Menu"
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="relative pt-stack-lg pb-stack-xl md:py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center flex flex-col items-center justify-center min-h-[716px] w-full">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-display-xl text-[clamp(4rem,10vw,120px)] text-primary leading-none uppercase z-10 mix-blend-difference hidden md:block break-words"
        >
          THE SALON
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-headline-lg-mobile text-[clamp(3rem,8vw,60px)] text-primary leading-none uppercase z-10 md:hidden break-words"
        >
          THE SALON
        </motion.h1>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full mt-stack-md md:-mt-[150px] relative z-0"
        >
          <motion.div 
            variants={slideUpVariants}
            className="aspect-[4/5] bg-surface-container-high relative overflow-hidden group shadow-xl"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              alt="Portrait of a young man with a modern fade haircut."
              src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 left-4 font-headline-lg text-headline-lg text-surface mix-blend-difference uppercase break-words">
              FOR MEN
            </div>
          </motion.div>
          
          <motion.div 
            variants={slideUpVariants}
            className="aspect-[4/5] bg-surface-container-high relative overflow-hidden group shadow-xl"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              alt="Portrait of a young woman getting a haircut."
              src="https://images.pexels.com/photos/3993311/pexels-photo-3993311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 right-4 font-headline-lg text-headline-lg text-surface mix-blend-difference uppercase break-words">
              FOR WOMEN
            </div>
          </motion.div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="font-body-lg text-[clamp(1rem,2vw,18px)] text-primary mt-stack-md uppercase tracking-widest max-w-2xl mx-auto z-10 bg-surface/80 backdrop-blur-sm p-4 rounded shadow-sm break-words"
        >
          Generations of Style
        </motion.p>
      </header>

      {/* About Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        variants={slideUpVariants}
        id="about" 
        className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-primary/20 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-12">
            <h2 className="font-display-xl text-[clamp(3rem,8vw,120px)] text-primary leading-none uppercase mb-stack-md hidden md:block break-words">
              ABOUT
            </h2>
            <h2 className="font-headline-lg-mobile text-[clamp(2.5rem,6vw,40px)] text-primary leading-none uppercase mb-stack-md md:hidden break-words">
              ABOUT
            </h2>
          </div>
          <div className="md:col-span-8 bg-surface-container-high aspect-video relative overflow-hidden border border-primary group shadow-lg">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              alt="Wide shot of a modern hair salon interior."
              src="https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="md:col-span-4 flex items-end">
            <p className="font-body-lg text-body-lg text-on-surface uppercase tracking-wide leading-relaxed border-l-2 border-secondary pl-6 py-4 bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm break-words">
              Our philosophy revolves around celebrating your natural beauty and enhancing it through the latest trends and timeless techniques.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="bg-primary text-surface py-stack-xl px-margin-mobile md:px-margin-desktop w-full overflow-hidden relative z-10">
        <div className="max-w-container-max mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="font-headline-lg text-[clamp(2.5rem,6vw,64px)] md:font-display-xl md:text-[clamp(3rem,8vw,120px)] text-surface uppercase mb-stack-lg border-b border-surface/30 pb-4 break-words"
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Tabs */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              variants={staggerContainer}
              className="md:col-span-3 flex md:flex-col gap-4 overflow-x-auto pb-4 md:pb-0 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-surface/30"
            >
              <button className="font-label-caps text-label-caps text-secondary whitespace-nowrap text-left hover:text-surface transition-colors py-2 px-4 border border-secondary md:mr-8 bg-secondary/10">
                CUT & STYLING
              </button>
              {["COLOR & HIGHLIGHTS", "TREATMENTS & CARE", "TEXTURE & PERMS"].map((tab) => (
                <button key={tab} className="font-label-caps text-label-caps text-surface/50 whitespace-nowrap text-left hover:text-surface transition-colors py-2 px-4 md:mr-8 relative group">
                  {tab}
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-surface transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </motion.div>
            
            {/* Service Content */}
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                variants={staggerContainer}
                className="space-y-6"
              >
                {[
                  { title: "Precision Cut", desc: "Tailored to your facial structure and lifestyle.", price: "FROM $85" },
                  { title: "Blowout & Style", desc: "Signature wash, massage, and voluminous finish.", price: "FROM $55" },
                  { title: "Restyle / Transformation", desc: "A completely new look with in-depth consultation.", price: "FROM $120" }
                ].map((service, idx) => (
                  <motion.div 
                    variants={slideUpVariants}
                    key={idx} 
                    className="border-b border-surface/20 pb-4 flex justify-between items-baseline group hover:border-secondary transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="font-headline-md text-headline-md text-surface group-hover:text-secondary transition-colors break-words">
                        {service.title}
                      </h3>
                      <p className="font-body-md text-body-md text-surface/70 mt-2 break-words">
                        {service.desc}
                      </p>
                    </div>
                    <span className="font-label-caps text-label-caps text-secondary shrink-0 ml-4 whitespace-nowrap">
                      {service.price}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1 }}
                className="aspect-[3/4] relative overflow-hidden border border-surface/30 hidden md:block group"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  alt="Stylist working on a client."
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop"
                  className="object-cover w-full h-full opacity-80"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Typography Divider */}
      <div className="w-full overflow-hidden bg-secondary text-surface py-stack-md whitespace-nowrap border-y border-primary relative z-10">
        <div className="animate-[marquee_20s_linear_infinite] inline-block font-display-xl text-[clamp(3rem,8vw,120px)] uppercase tracking-tighter">
          GENERATIONS OF STYLE • GENERATIONS OF STYLE • GENERATIONS OF STYLE • 
        </div>
      </div>

      {/* Gallery Section */}
      <section id="gallery" className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-[100vw] overflow-hidden bg-transparent w-full">
        <div className="max-w-container-max mx-auto mb-stack-md flex justify-between items-end">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="font-headline-lg text-[clamp(2.5rem,6vw,64px)] md:font-display-xl md:text-[clamp(3rem,8vw,120px)] text-primary uppercase break-words"
          >
            Gallery
          </motion.h2>
          <div className="hidden md:flex gap-4">
            <button 
              aria-label="Previous" 
              onClick={() => scrollGallery('left')}
              className="w-12 h-12 border border-primary bg-surface/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-surface transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              aria-label="Next" 
              onClick={() => scrollGallery('right')}
              className="w-12 h-12 border border-primary bg-surface/50 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-surface transition-colors"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        
        <div 
          ref={galleryRef}
          className="horizontal-scroll gap-gutter pb-8 px-margin-mobile md:px-margin-desktop cursor-grab active:cursor-grabbing w-full"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {[
            { img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop", title: "Classic Wave", stylist: "ANNA" },
            { img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1200&auto=format&fit=crop", title: "Modern Fade", stylist: "MARCUS" },
            { img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop", title: "Short Texture", stylist: "SARAH" },
            { img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop", title: "Precision Bob", stylist: "ELENA" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0.5, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="scroll-item w-[80vw] md:w-[400px]"
            >
              <div className="aspect-[3/4] bg-surface-container-high overflow-hidden border border-primary mb-4 group relative shadow-lg">
                <img
                  alt={item.title}
                  src={item.img}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-label-caps text-label-caps text-primary uppercase break-words pr-2">{item.title}</h3>
                <span className="font-label-caps text-label-caps text-secondary whitespace-nowrap">STYLIST: {item.stylist}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking & Contact Section */}
      <section id="contact" className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-primary/20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            variants={staggerContainer}
          >
            <h2 className="font-headline-md text-headline-md text-primary uppercase mb-stack-md break-words">Client Voices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter mb-stack-lg">
              {[
                { quote: "The attention to detail here is unmatched. It feels less like a salon appointment and more like a tailored styling session.", author: "Sarah Jenkins" },
                { quote: "I've been bringing my son here for years. They manage to make him look sharp while keeping the experience completely stress-free.", author: "Michael T." }
              ].map((testimonial, i) => (
                <motion.div 
                  variants={slideUpVariants}
                  key={i} 
                  className="border border-primary p-6 bg-surface-container-lowest/80 backdrop-blur-sm relative hover:-translate-y-2 transition-transform duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined absolute top-4 right-4 text-secondary opacity-50 text-4xl">format_quote</span>
                  <p className="font-body-md text-[clamp(0.875rem,1.5vw,16px)] text-on-surface mb-4 relative z-10 italic break-words">"{testimonial.quote}"</p>
                  <p className="font-label-caps text-label-caps text-primary uppercase break-words">— {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={slideUpVariants} className="border-t border-primary pt-stack-md">
              <h3 className="font-label-caps text-label-caps text-primary uppercase mb-4 break-words">Location & Hours</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body-md text-body-md text-on-surface break-words">123 Heritage Lane<br/>Fashion District<br/>NY 10012</p>
                  <a href="mailto:hello@estsalon.com" className="font-body-md text-body-md text-secondary hover:underline block mt-2 break-all">hello@estsalon.com</a>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface break-words">Tue - Fri: 10am - 8pm<br/>Sat: 9am - 6pm<br/>Sun - Mon: Closed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            id="book" 
            className="bg-surface-container-high/90 backdrop-blur-md p-8 border border-primary relative overflow-hidden group shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest to-surface-container opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10">
              <h2 className="font-headline-md text-[clamp(1.5rem,4vw,32px)] text-primary uppercase mb-stack-md break-words">Book an Appointment</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Name</label>
                    <input type="text" placeholder="Your full name" className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary placeholder-surface-tint transition-colors" />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Phone</label>
                    <input type="tel" placeholder="Your phone number" className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary placeholder-surface-tint transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Service Needed</label>
                  <select className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary transition-colors">
                    <option>Select a service...</option>
                    <option>Precision Cut</option>
                    <option>Color & Highlights</option>
                    <option>Styling & Blowout</option>
                    <option>Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Preferred Date</label>
                  <input type="date" className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary transition-colors" />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 mt-4 hover:bg-secondary transition-colors duration-300 uppercase tracking-widest break-words"
                >
                  Request Appointment
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-stack-lg mt-stack-xl bg-surface/90 backdrop-blur-md border-t border-primary px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <div className="font-headline-md text-headline-md text-primary mb-4 uppercase tracking-tighter break-words">
              EST. SALON
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs break-words">
              Elevating family haircare to high-fashion standards. Generations of style, crafted with precision.
            </p>
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-x-12 gap-y-8 justify-between md:justify-end">
            <div className="flex flex-col gap-3">
              <span className="font-label-caps text-label-caps text-secondary mb-2 uppercase break-words">Menu</span>
              {["Services", "Gallery", "About", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors break-words">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-label-caps text-label-caps text-secondary mb-2 uppercase break-words">Legal</span>
              <a href="#" className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors break-words">Privacy Policy</a>
              <a href="#" className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors break-words">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-label-caps text-label-caps text-secondary mb-2 uppercase break-words">Social</span>
              <div className="flex gap-4">
                {/* Social Icons (SVG from original) */}
                <a href="#" aria-label="Instagram" className="text-primary hover:text-secondary transition-colors">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-primary hover:text-secondary transition-colors">
                  <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-12 mt-stack-md pt-6 border-t border-surface-container-highest">
            <p className="font-label-caps text-label-caps text-on-surface-variant text-center md:text-left break-words">
              © 2024 EST. SALON. GENERATIONS OF STYLE.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
