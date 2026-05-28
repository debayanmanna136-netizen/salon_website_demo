"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Script from "next/script";
import LiveBackground from "@/components/LiveBackground";

const servicesData = {
  "LADIES SERVICES": [
    { title: "Shampoo + Hair Cutting + Blow Dry", price: "Starting from ₹200" },
    { title: "Hair Spa", price: "Starting from ₹500" },
    { title: "Threading", price: "Starting from ₹30" },
    { title: "Global Colour", price: "Starting from ₹1200" },
    { title: "Highlight", price: "Starting from ₹200 per stick" },
    { title: "Straightening / Smoothening", price: "Starting from ₹3000" },
    { title: "Hair Treatment", price: "Starting from ₹3000" },
    { title: "Dandruff Treatment", price: "Starting from ₹800" },
    { title: "Ozone + Hairfall Treatment", price: "Starting from ₹500" }
  ],
  "GENTS SERVICES": [
    { title: "Hair Cut", price: "Starting from ₹80" },
    { title: "Beard", price: "Starting from ₹40" },
    { title: "Shaving", price: "Starting from ₹50" },
    { title: "Spa", price: "Starting from ₹200" },
    { title: "Straightening", price: "Starting from ₹800" },
    { title: "Global Colour", price: "Starting from ₹300" },
    { title: "Highlight", price: "Starting from ₹600" },
    { title: "Perming", price: "Starting from ₹1000" }
  ],
  "BEAUTY SERVICES": [
    { title: "Clean Up", price: "Starting from ₹100" },
    { title: "Pedicure", price: "Starting from ₹300" },
    { title: "Manicure", price: "Starting from ₹250" },
    { title: "D-Tan", price: "Starting from ₹300" },
    { title: "Waxing", price: "Starting from ₹300" },
    { title: "Facial", price: "Starting from ₹500" }
  ]
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<keyof typeof servicesData>("LADIES SERVICES");

  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookService, setBookService] = useState("");
  const [bookDate, setBookDate] = useState("");

  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState("5");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [lastSubmittedReview, setLastSubmittedReview] = useState<{ quote: string, rating: string } | null>(null);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewText) return;
    setLastSubmittedReview({ quote: reviewText, rating: reviewRating });
    setShowReviewModal(true);
    setReviewName("");
    setReviewText("");
    setReviewRating("5");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello, I would like to book an appointment at The Shine Hair & Beauty.\n\nName: ${bookName}\nPhone: ${bookPhone}\nService: ${bookService}\nPreferred Time: ${bookDate}\n\nPlease confirm availability.`;
    const url = `https://wa.me/918910276364?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };



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
        role="navigation"
        aria-label="Main Navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full top-0 sticky z-50 bg-surface/90 backdrop-blur-md border-b border-primary"
      >
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md text-primary tracking-tighter uppercase whitespace-nowrap break-keep">
            THE SHINE
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {["Services", "Gallery", "Stylist", "Contact"].map((item) => (
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
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 bg-surface/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {["Services", "Gallery", "Stylist", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="font-headline-md text-3xl text-primary hover:text-secondary transition-colors uppercase"
              >
                {item}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 uppercase hover:bg-secondary transition-colors duration-300 mt-4"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-stack-lg pb-stack-xl md:py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center flex flex-col items-center justify-center min-h-[716px] w-full">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-headline-lg-mobile text-[clamp(3rem,8vw,60px)] md:font-display-xl md:text-[clamp(4rem,10vw,120px)] text-primary leading-none uppercase z-10 md:mix-blend-difference break-words"
        >
          THE SHINE
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
          The Shine Hair & Beauty — Premium Unisex Salon in Konnagar
        </motion.p>
      </header>

      {/* Meet the Stylist Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        variants={slideUpVariants}
        id="stylist"
        className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-primary/20 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-12">
            <h2 className="font-display-xl text-[clamp(3rem,8vw,120px)] text-primary leading-none uppercase mb-stack-md hidden md:block break-words">
              MEET THE STYLIST
            </h2>
            <h2 className="font-headline-lg-mobile text-[clamp(2.5rem,6vw,40px)] text-primary leading-none uppercase mb-stack-md md:hidden break-words">
              MEET THE STYLIST
            </h2>
          </div>
          <div className="md:col-span-8 bg-surface-container-high aspect-square md:aspect-video relative overflow-hidden border border-primary group shadow-lg flex items-center justify-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              alt="Sujit Ojha - Stylist"
              src="/sujit.jpg"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <h3 className="font-headline-md text-headline-md text-primary uppercase mb-4 break-words">
              Sujit Ojha
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface uppercase tracking-wide leading-relaxed border-l-2 border-secondary pl-6 py-4 bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm break-words">
              With years of expertise, Sujit blends modern trends with classic techniques. From hair spa to professional hair treatments at the best unisex salon in Konnagar, Hooghly, experience personalized styling tailored just for you.
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
              {(Object.keys(servicesData) as (keyof typeof servicesData)[]).map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`font-label-caps text-label-caps whitespace-nowrap text-left transition-colors py-2 px-4 md:mr-8 relative group ${activeTab === tab ? "text-secondary border border-secondary bg-secondary/10" : "text-surface/50 hover:text-surface"}`}
                >
                  {tab}
                  {activeTab !== tab && <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-surface transition-all duration-300 group-hover:w-full"></span>}
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
                key={activeTab}
              >
                {servicesData[activeTab].map((service, idx) => (
                  <motion.div
                    variants={slideUpVariants}
                    key={idx}
                    className="border-b border-surface/20 pb-4 flex justify-between items-baseline group hover:border-secondary transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="font-headline-md text-headline-md text-surface group-hover:text-secondary transition-colors break-words">
                        {service.title}
                      </h3>
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
            { img: "/classic_wave.jpeg", title: "Classic Fade" },
            { img: "/salon_interior.jpeg", title: "Salon Interior" },
            { img: "/short_texture.jpeg", title: "De-tan + Facial" },
            { img: "/precision_bob.jpeg", title: "Precision Bob" },
            { img: "/burst_fade.jpeg", title: "Burst Fade" },
            { img: "/ladies_cut.jpeg", title: "Ladies Cut" },
            { img: "/perming.jpeg", title: "Perming" },
            { img: "/taper_fade.jpeg", title: "Taper Fade" }
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
            <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
            <h2 className="font-headline-md text-headline-md text-primary uppercase mb-stack-md break-words">Client Voices</h2>
            <div className="mb-stack-lg border border-primary p-6 bg-surface-container-lowest/80 backdrop-blur-sm shadow-sm overflow-hidden rounded-none">
              <div className="elfsight-app-fb85e395-f7b3-4eab-af99-f3854df46767" data-elfsight-app-lazy></div>
            </div>

            <motion.div variants={slideUpVariants} className="border-t border-primary pt-stack-md pb-stack-md mb-stack-md">
              <h3 className="font-headline-md text-headline-md text-primary uppercase mb-4 break-words">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary placeholder-surface-tint transition-colors" 
                  required
                />
                <textarea 
                  placeholder="Your Review" 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary placeholder-surface-tint transition-colors resize-none" 
                  rows={3}
                  required
                ></textarea>
                <div className="flex justify-between items-center">
                  <select 
                    value={reviewRating} 
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary transition-colors"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="bg-secondary/10 text-secondary border border-secondary font-label-caps text-label-caps px-6 py-2 hover:bg-secondary hover:text-surface transition-colors duration-300 uppercase tracking-widest break-words"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </motion.div>

            <motion.div variants={slideUpVariants} className="border-t border-primary pt-stack-md">
              <h3 className="font-label-caps text-label-caps text-primary uppercase mb-4 break-words">Location & Hours</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body-md text-body-md text-on-surface break-words">88/2, Lal Bahadur Sastri Rd<br />Rammohan Place, Konnagar<br />Hooghly, West Bengal 712235</p>
                  <a href="https://wa.me/918910276364" target="_blank" className="font-body-md text-body-md text-secondary hover:underline block mt-2 break-all">+91 8910276364</a>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface break-words">Tue - Fri: 10am - 8pm<br />Sat: 9am - 6pm<br />Sun - Mon: Closed</p>
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
              <form className="space-y-6" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Name</label>
                    <input type="text" required value={bookName} onChange={e => setBookName(e.target.value)} placeholder="Your full name" className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary placeholder-surface-tint transition-colors" />
                  </div>
                  <div>
                    <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Phone</label>
                    <input type="tel" required value={bookPhone} onChange={e => setBookPhone(e.target.value)} placeholder="Your phone number" className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary placeholder-surface-tint transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Service Needed</label>
                  <select required value={bookService} onChange={e => setBookService(e.target.value)} className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary transition-colors">
                    <option value="">Select a service...</option>
                    {Object.values(servicesData).flat().map((svc, i) => (
                      <option key={i} value={svc.title}>{svc.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-label-caps text-primary uppercase block mb-2 break-words">Preferred Date & Time</label>
                  <input type="datetime-local" required value={bookDate} onChange={e => setBookDate(e.target.value)} className="w-full bg-transparent border-b border-primary focus:border-secondary focus:ring-0 focus:outline-none px-0 py-2 font-body-md text-primary transition-colors" />
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

      {/* Map Section */}
      <section id="location" aria-labelledby="location-heading" className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-primary/20 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-4 flex flex-col justify-center mb-8 md:mb-0">
            <h2 id="location-heading" className="font-headline-md text-headline-md text-primary uppercase mb-4 break-words">
              Find Us in Konnagar
            </h2>
            <p className="font-body-md text-on-surface leading-relaxed mb-6 break-words">
              Conveniently located beauty salon near Konnagar station, Hooghly. Visit us for premium haircuts, beard styling and grooming, hair treatments, and professional salon care.
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://maps.google.com/?q=88/2,+Lal+Bahadur+Sastri+Rd,+Rammohan+Place,+Konnagar,+Hooghly,+West+Bengal+712235"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start bg-secondary text-surface font-label-caps text-label-caps px-6 py-3 uppercase hover:bg-primary hover:text-on-primary transition-colors duration-300 tracking-wider shadow-md"
            >
              Get Directions
            </motion.a>
          </div>
          <div className="md:col-span-8 aspect-video w-full bg-surface-container-high border border-primary relative overflow-hidden group shadow-lg">
            <iframe
              title="The Shine Hair & Beauty Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1235650130953!2d88.34994277598858!2d22.70014167586522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89b7fa5efd69d%3A0x6a05e2bfdf1fb66f!2s88%2F2%2C%20Lal%20Bahadur%20Shastri%20Rd%2C%20Rammohan%20Place%2C%20Konnagar%2C%20West%20Bengal%20712235!5e0!3m2!1sen!2sin!4v1716834000000!5m2!1sen!2sin"
              className="w-full h-full border-0 filter grayscale invert contrast-[0.9] opacity-80 group-hover:opacity-100 group-hover:filter-none transition-all duration-700 ease-out"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-stack-lg mt-stack-xl bg-surface/90 backdrop-blur-md border-t border-primary px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <div className="font-headline-md text-headline-md text-primary mb-4 uppercase tracking-tighter break-words">
              THE SHINE
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs break-words">
              Elevating family haircare to high-fashion standards. Generations of style, crafted with precision.
            </p>
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-x-12 gap-y-8 justify-between md:justify-end">
            <div className="flex flex-col gap-3">
              <span className="font-label-caps text-label-caps text-secondary mb-2 uppercase break-words">Menu</span>
              {["Services", "Gallery", "Stylist", "Contact"].map((item) => (
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
              © 2024 THE SHINE HAIR & BEAUTY. GENERATIONS OF STYLE.
            </p>
          </div>
        </div>
      </footer>

      {/* Google Review Funnel Modal */}
      <AnimatePresence>
        {showReviewModal && lastSubmittedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface-container-high border border-primary p-8 max-w-lg w-full relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest to-surface-container opacity-50 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-secondary text-5xl mb-4">favorite</span>
                <h2 className="font-headline-md text-2xl text-primary uppercase mb-2">Thank You For Your Feedback ❤️</h2>
                <p className="font-body-md text-on-surface-variant mb-6">
                  We’re so happy you enjoyed your experience at The Shine Hair & Beauty. Would you also like to support us with a Google Review?
                </p>
                
                {/* Styled Preview Card */}
                <div className="bg-surface-container-lowest/80 border border-primary/30 p-4 w-full mb-6 relative">
                  <div className="flex justify-center gap-1 mb-2 text-secondary text-xl">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>{idx < parseInt(lastSubmittedReview.rating) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="font-body-md text-on-surface italic break-words">&ldquo;{lastSubmittedReview.quote}&rdquo;</p>
                  <p className="text-xs text-primary/70 mt-3 font-label-caps uppercase">Your review is ready to post.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJYR1tSACd-DkR8j1ITbiK8K8"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 bg-primary text-on-primary font-label-caps text-label-caps py-3 px-4 hover:bg-secondary transition-colors duration-300 uppercase tracking-widest"
                  >
                    Post on Google
                  </a>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 bg-transparent border border-primary text-primary font-label-caps text-label-caps py-3 px-4 hover:bg-primary/10 transition-colors duration-300 uppercase tracking-widest"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
