import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const carouselImages = [
  {
    src: "/icons/collaborateur.jpg",
    alt: "Collaboration d'équipe",
    title: "Plateforme de Gestion de Projet",
    description:
      "Collaborez efficacement avec votre équipe de développement dans un environnement intuitif et professionnel.",
  },
  {
    src: "/icons/second.jpeg",
    alt: "Travail d'équipe",
    title: "Gestion d'Équipe Simplifiée",
    description:
      "Organisez vos équipes et suivez leur progression en temps réel.",
  },
  {
    src: "/icons/trois.jpeg",
    alt: "Gestion de projet",
    title: "Suivi de Projet Avancé",
    description:
      "Visualisez l'avancement de vos projets avec des outils performants.",
  },
  {
    src: "/icons/quatre.jpg",
    alt: "Gestion des tâches",
    title: "Organisation des Tâches",
    description: "Gérez efficacement les tâches et les délais de votre équipe.",
  },
];

export const AuthCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 max-w-4xl w-full aspect-[4/3] px-4">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={carouselImages[currentIndex].src}
          alt={carouselImages[currentIndex].alt}
          width={500}
          height={500}
          className="w-full h-[600px] object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
          priority
        />

        <div className="text-center backdrop-blur-sm rounded-xl mt-4 p-4 bg-white/80">
          <h2 className="text-3xl font-bold text-black">
            {carouselImages[currentIndex].title}
          </h2>
          <p className="mt-4 text-gray-600 text-lg font-semibold leading-relaxed">
            {carouselImages[currentIndex].description}
          </p>
        </div>
      </motion.div>
      <div className="flex justify-center gap-2 mt-4">
        {carouselImages.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
