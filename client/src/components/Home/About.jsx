import { Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CollapsibleNavbar from "../CollapsibleNavbar";
import { Search, Shield, Code, BarChart } from 'lucide-react';
import ParticlesBackground from "./ParticlesBackground";

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
            height: 100vh;
            padding-top: 10rem;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
          }

          .hero-section h1,
          .hero-section h2,
          .hero-section h3,
          .hero-section p {
            position: relative;
            z-index: 10;
          }

          .hero-section h1 {
            color: rgb(51, 51, 51);
            font-size: 2rem;
            margin-bottom: -1rem;
            font-weight: 500;
          }

          .hero-section h2 {
            font-size: 4rem;
            color: rgb(25, 118, 211);
            margin-bottom: 1rem;
            font-family: 'Roboto Mono', monospace;
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid rgb(25, 118, 211);
            width: 10ch;
            animation: typing 2.5s steps(11, end), blink-caret 0.75s step-end infinite;
          }

          @keyframes typing {
            from { width: 0; }
            to { width: 11ch; }
          }

          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: rgb(0, 0, 0); }
          }

          .hero-section h3 {
            color: rgb(51, 51, 51);
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
          }

          .hero-section p {
            color: rgb(85, 85, 85);
            max-width: 600px;
            line-height: 1.6;
          }

          .hero-section .hero-button {
            padding: 1rem;
            border: 2px solidrgb(25, 118, 211);
            backgorund-color:rgb(25, 118, 211);
            border-radius: 8px;
            transition: background-color rgb(25, 118, 211) 0.3s ease;
          }

          .hero-section .hero-button:hover {
            background-color: rgb(25, 118, 211);
          }

          
          .section-title {
            text-align: center;
            font-size: 3rem;
            color: rgb(51, 51, 51);
            font-weight: 700;
            font-family: 'Roboto', sans-serif;
          }

          /* What We Do Section */
          .what-we-do-section {
            padding: 4rem 1rem;
            background-color: rgb(240, 245, 250);
            font-family: 'Roboto', sans-serif;
          }

          @media (min-width: 768px) {
            .what-we-do-section {
              padding: 6rem 2rem;
            }
          }

          .what-we-do-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .section-title {
            text-align: center;
            font-size: 2rem;
            color: rgb(51, 51, 51);
            font-weight: 700;
            margin-bottom: 1rem;
            font-family: 'Roboto', sans-serif;
          }

          @media (min-width: 768px) {
            .section-title {
              font-size: 2.5rem;
              margin-bottom: 1.5rem;
            }
          }

          .section-subtitle {
            text-align: center;
            font-size: 1rem;
            color: rgb(85, 85, 85);
            max-width: 800px;
            margin: 0 auto 2rem;
            line-height: 1.5;
            padding: 0 1rem;
          }

          @media (min-width: 768px) {
            .section-subtitle {
              font-size: 1.2rem;
              margin-bottom: 3rem;
              line-height: 1.6;
            }
          }

          .feature-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 0.5rem;
          }

          @media (min-width: 640px) {
            .feature-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }

          @media (min-width: 1024px) {
            .feature-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 2rem;
              padding: 0 1rem;
            }
          }

          .feature-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            padding: 1.5rem;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            height: 100%;
          }

          @media (min-width: 768px) {
            .feature-card {
              padding: 2rem;
            }
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          }

          .feature-icon {
            background-color: rgb(240, 245, 250);
            color: rgb(25, 118, 210);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
          }

          @media (min-width: 768px) {
            .feature-icon {
              width: 60px;
              height: 60px;
              margin-bottom: 1.5rem;
            }
          }

          .feature-title {
            font-weight: 600;
            font-size: 1.125rem;
            color: rgb(51, 51, 51);
            margin-bottom: 0.75rem;
          }

          @media (min-width: 768px) {
            .feature-title {
              font-size: 1.25rem;
              margin-bottom: 1rem;
            }
          }

          .feature-description {
            color: rgb(85, 85, 85);
            line-height: 1.5;
            font-size: 0.875rem;
          }

          @media (min-width: 768px) {
            .feature-description {
              font-size: 1rem;
              line-height: 1.6;
            }
          }

          /* Team Section */
          .team-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            padding: 2rem;
          }

          .team-card {
            background-color:rgb(25, 118, 211);
            border-radius: 12px;
            padding: 1.5rem;
            transition: transform 0.3s ease;
            width: 100%;
            max-width: 250px;
            flex: 1 1 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          @media (max-width: 992px) {
            .team-card {
              flex-basis: 200px;
              min-width: 200px;
            }
          }

          @media (max-width: 768px) {
            .team-card {
              flex-basis: 300px;
              min-width: 250px;
            }
          }

          @media (max-width: 500px) {
            .team-card {
              flex-basis: 100%;
              max-width: 100%;
            }
          }

          .team-card img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 1rem;
            object-fit: cover;
            border: 3px solid white;
          }

          .team-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: white;
            font-family: 'Roboto', sans-serif;
          }

          .team-card p {
            font-size: 0.9rem;
            color: #e0e0e0;
            font-family: 'Roboto', sans-serif;
          }

          .team-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }

          .section-title-team {
            text-align: center;
            font-size: 3rem;
            color: rgb(51, 51, 51);
            margin-bottom: 2rem;
            margin-top: 10rem;
            font-weight: 700;
            font-family: 'Roboto', sans-serif;
          }

          /* Contact Section - ADDED:Styling */
          .contact-section-container {
            padding: 4rem 1rem;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Roboto', sans-serif;
          }

          @media (min-width: 768px) {
            .contact-section-container {
              padding: 6rem 2rem;
            }
          }

          .contact-card {
            background-color: white;
            width: 100%;
            max-width: 600px;
            padding: 2rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s ease;
          }

          @media (min-width: 768px) {
            .contact-card {
              padding: 3rem;
            }
          }

          .contact-title {
            font-size: 2rem;
            font-weight: 700;
            color: rgb(51, 51, 51);
            margin-bottom: 1rem;
          }

          @media (min-width: 768px) {
            .contact-title {
              font-size: 2.5rem;
              margin-bottom: 1.5rem;
            }
          }

          .contact-description {
            font-size: 1rem;
            line-height: 1.6;
            color: rgb(85, 85, 85);
            margin-bottom: 1.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          @media (min-width: 768px) {
            .contact-description {
              font-size: 1.1rem;
              line-height: 1.7;
              margin-bottom: 2rem;
            }
          }

          .contact-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background-color: rgb(25, 118, 210);
            color: white;
            padding: 0.6rem 1.75rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(25, 118, 210, 0.25);
          }

          @media (min-width: 768px) {
            .contact-button {
              padding: 0.75rem 2rem;
              font-size: 1rem;
            }
          }

          .contact-button:hover {
            background-color: rgb(21, 101, 192);
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(25, 118, 210, 0.3);
          }

          .contact-button:active {
            transform: translateY(0);
          }

          .section-line {
            height: 4px;
            width: 40px;
            background-color: rgb(25, 118, 210);
            margin: 0 auto 1.5rem;
            border-radius: 2px;
          }

          @media (min-width: 768px) {
            .section-line {
              width: 60px;
              margin: 0 auto 2rem;
            }
          }

          /* Add also a media query for ultra-small devices */
          @media (max-width: 350px) {
            .feature-grid {
              gap: 1rem;
            }
            
            .feature-card {
              padding: 1.25rem;
            }
            
            .feature-icon {
              width: 40px;
              height: 40px;
              margin-bottom: 1rem;
            }
            
            .feature-title {
              font-size: 1rem;
              margin-bottom: 0.5rem;
            }
            
            .feature-description {
              font-size: 0.8rem;
              line-height: 1.4;
            }
            
            .contact-card {
              padding: 1.5rem 1rem;
            }
            
            .contact-title {
              font-size: 1.75rem;
            }
            
            .contact-description {
              font-size: 0.9rem;
            }
            
            .contact-button {
              padding: 0.5rem 1.5rem;
              font-size: 0.8rem;
            }
          }

          /* Add this to ensure the hero content is above particles */
          .hero-content {
            position: relative;
            z-index: 10;
          }
        `}
      </style>

      <div className="min-h-screen bg-white text-gray-800">
        {/* Navigation */}
        <CollapsibleNavbar />

        {/* Hero Section with Particles and typing animation */}
        <section className={`hero-section hero-animate ${isLoaded ? 'visible' : ''}`}>
          {/* Add the particles background */}
          <ParticlesBackground />
          
          {/* Original hero content with typing animation */}
          <h1>Hello, we are</h1>
          <h2>TEAM GAHSP</h2>
          <h3><b>G</b>enerating <b>A</b>lgorithms for <b>H</b>ot <b>S</b>pots <b>P</b>olicing</h3>
          <p>
            We are an undergraduate team developing an improved algorithm to correct for limitations and biases of existing predictive policing algorithms.
          </p>
        </section>

        {/* ADDED: What We Do boxes */}
        <section className="what-we-do-section">
          <div className="what-we-do-container">
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              We develop advanced algorithms and data-driven solutions to help law enforcement agencies better 
              allocate resources and prevent crime through strategic policing.
            </p>
            
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Search size={28} />
                </div>
                <h3 className="feature-title">Crime Analysis</h3>
                <p className="feature-description">
                  We analyze historical crime data to identify patterns, trends, and relationships that inform 
                  strategic decision-making for law enforcement agencies.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Code size={28} />
                </div>
                <h3 className="feature-title">Algorithm Development</h3>
                <p className="feature-description">
                  Our team creates specialized algorithms that predict crime hotspots, helping police departments 
                  allocate resources more efficiently.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <BarChart size={28} />
                </div>
                <h3 className="feature-title">Predictive Modeling</h3>
                <p className="feature-description">
                  Using machine learning and statistical techniques, we develop models that anticipate crime 
                  occurrences with increasing accuracy over time.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={28} />
                </div>
                <h3 className="feature-title">Resource Optimization</h3>
                <p className="feature-description">
                  We help police departments optimize patrol routes and staffing based on predicted crime 
                  patterns, improving response times and prevention efforts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto scroll-animate">
            <h2 className="section-title-team">Meet our team</h2>
            <div className="section-line" />
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.name} className="team-card">
                  <img src={`/imgs/${member.img}.jpg`} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Improved */}
        <section className="contact-section-container">
          <div className="contact-card">
            <h2 className="contact-title">Contact us</h2>
            <div className="section-line" />
            <p className="contact-description">
              Feel free to email us on further inquiries on our research or if you're interested in working with us.
            </p>
            <a href="mailto:teamgahsp.umd@gmail.com" className="contact-button">
              <Mail className="w-5 h-5" />
              <span>Say hi!</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

const teamMembers = [
  { name: "Aaron Lin", role: "Back End", img: "default" },
  { name: "Alex Chen", role: "Front End", img: "alex" },
  { name: "Andrea Maria", role: "Research | Data Collection", img: "andrea" },
  { name: "Allen Du", role: "Back End", img: "allen" },
  { name: "Coley Samuels", role: "Research | Data Collection", img: "coley" },
  { name: "Grace Tao", role: "Front End", img: "grace" },
  { name: "Rios Versace", role: "Research | Data Collection", img: "default" },
  { name: "Trina Arellano", role: "Front End", img: "default" },
  { name: "Zoya Tasneem", role: "Front End", img: "zoya" }
];

export default About;