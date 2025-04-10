import { Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CollapsibleNavbar from "../CollapsibleNavbar"

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    document.querySelectorAll('.scroll-animate').forEach((elem) => {
      observer.observe(elem);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          .scroll-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease-out;
          }

          .scroll-animate.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .hero-animate {
            opacity: 0;
            transform: scale(0.95);
            transition: all 1s ease-out;
          }

          .hero-animate.visible {
            opacity: 1;
            transform: scale(1);
          }

          .team-card {
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }

          .mint-gradient {
            background: linear-gradient(90deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .section-line {
            height: 1px;
            background: linear-gradient(90deg, rgba(100, 255, 218, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(100, 255, 218, 0) 100%);
            margin: 2rem 0;
          }

          /* General adjustments */
          body {
            background-color:rgb(255, 255, 255);
            color:rgb(255, 255, 255);
            font-family: 'Inter', sans-serif;
          }

          h1, h2, h3 {
            text-align: center;
          }

          p {
            text-align: center;
            color:rgb(25, 118, 211);
          }

          /* Hero Section adjustments */
          .hero-section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
            padding-top: 4rem;
          }

          .hero-section h1 {
            color:rgb(25, 118, 211);
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }

          .hero-section h2 {
            font-size: 3rem;
            color:rgb(25, 118, 211);
            margin-bottom: 1rem;
            white-space: nowrap;
            overflow: hidden;
            border-right: 2px solid rgb(25, 118, 211);
            width: 12ch; /* Set to match the length of "Team GAHSP" */
            animation: typing 2.5s steps(9, end), blink-caret 0.75s step-end infinite;
          }

          @keyframes typing {
            from { width: 0; }
            to { width: 11ch; } /* Matches the number of characters */
          }

          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color:rgb(0, 0, 0); }
          }

          .hero-section h3 {
            font-size: 2rem;
            color:rgb(0, 0, 0);
            margin-bottom: 1.5rem;
          }

          .hero-section p {
            max-width: 700px;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .hero-section .hero-button {
            padding: 1rem 2rem;
            border: 2px solidrgb(25, 118, 211);
            backgorund-color:rgb(25, 118, 211);
            border-radius: 8px;
            transition: background-color rgb(25, 118, 211) 0.3s ease;
          }

          .hero-section .hero-button:hover {
            background-color: rgb(25, 118, 211);
          }

          /* What We Do Section */
          .section-title {
            text-align: center;
            font-size: 3rem;
            color: rgb(25, 118, 211);
            margin-bottom: 2rem;
          }

          .what-we-do {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2rem;
          }

          .what-we-do div {
            background-color: rgb(25, 118, 211);
            border-color: rgb(255, 255, 255);
            border-radius: 12px;
            padding: 2rem;
            transition: transform 0.3s ease;
            width: 100%;
            max-width: 600px;
          }

          .what-we-do div:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          .what-we-do p{
            font-size: 1rem;
            color:rgb(255, 255, 255);
          }

          /* Team Section */
          .team-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            justify-items: center;
            padding: 2rem;
          }

          .team-card {
            background-color:rgb(25, 118, 211);
            border-radius: 12px;
            padding: 1.5rem;
            transition: transform 0.3s ease;
            width: 100%;
            max-width: 250px;
          }

          .team-card img {
            margin: 0 auto;
            border-radius: 50%;
            border: 2px solidrgb(129, 100, 255);
            width: 120px;
            height: 120px;
            margin-bottom: 1.5rem;
          }

          .team-card h3 {
            font-size: 1.25rem;
            color:rgb(201, 221, 241);
            margin-bottom: 0.5rem;
          }

          .team-card p {
            font-size: 1rem;
            color:rgb(255, 255, 255);
          }

          /* Contact Section */
          .contact-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background-color:rgb(255, 255, 255);
            border-radius: 12px;
            max-width: 700px;
            margin: 0 auto;
            padding: 2rem;
          }

          .contact-button {
            margin-top: 1rem;
            padding: 1rem 2rem;
            border: 2px solid rgb(25, 118, 211);
            color: rgb(25, 118, 211);
            border-radius: 8px;
            transition: background-color 0.3s ease;
          }

          .contact-button:hover {
            background-color: rgb(25, 118, 211);
          }
          .contact-section .section-title {
            margin-bottom: 0.5rem;
          }

          .contact-section .section-line {
            margin: 0.5rem 0;
          }
        `}
      </style>

      <div className="min-h-screen bg-[#0a192f] text-gray-300">
        {/* Navigation */}
        <CollapsibleNavbar />

        {/* Hero Section */}
        <section className={`hero-section hero-animate ${isLoaded ? 'visible' : ''}`}>
          <h1>Hello, we are</h1>
          <h2>Team GAHSP</h2> {/* Typewriter effect applied here */}
          <h3>Generating Algorithms for Hot Spots Policing</h3>
          <p>
            We develop advanced algorithms for predictive policing, helping law enforcement agencies
            anticipate and prevent crime in high-risk areas.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto scroll-animate">
            <h2 className="section-title">What we do</h2>
            <div className="section-line" />
            <div className="what-we-do">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Machine Learning</h3>
                <p className="text-gray-400">
                  Leveraging advanced AI algorithms to identify patterns and predict potential crime hotspots.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Data Analysis</h3>
                <p className="text-gray-400">
                  Processing and analyzing large datasets to enable data-driven decisions for public safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto scroll-animate">
            <h2 className="section-title">Meet our team</h2>
            <div className="section-line" />
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.name} className="team-card">
                  <img 
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" 
                    alt={member.name} 
                  />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="contact-section">
            <h2 className="section-title">Contact us</h2>
            <div className="section-line" />
            <p>
              Let's work together to make our communities safer.
            </p>
            <a href="mailto:teamgahsp.umd@gmail.com" className="contact-button flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span> Say hi!</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

const teamMembers = [
  { name: "Aaron Lin", role: "Back end" },
  { name: "Alex Chen", role: "Front end" },
  { name: "Andrea Maria", role: "Research Team" },
  { name: "Allen Du", role: "Back end" },
  { name: "Coley Samuels", role: "Research Team" },
  { name: "Grace Tao", role: "Front End" },
  { name: "Rios Versace", role: "Research Team" },
  { name: "Trina Arellano", role: "Front End" },
  { name: "Zoya Tasneem", role: "Front End" }
];

export default About;