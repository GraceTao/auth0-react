import { useEffect } from 'react';

const About = () => {
   useEffect(() => {
      const sections = document.querySelectorAll('.scroll-animation');
      
      const observerOptions = {
         root: null, // viewport
         threshold: 0.5, // Trigger when 10% of the section is visible
      };

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add('in-view');
            } else {
               entry.target.classList.remove('in-view');
            }
         });
      }, observerOptions);

      sections.forEach((section) => {
         observer.observe(section);
      });

      return () => {
         sections.forEach((section) => observer.unobserve(section));
      };
   }, []);

   return (
      <div style={styles.container}>
         <section style={styles.heroSection}>
            <h1 style={styles.heroHeader}>Team GAHSP</h1>
            <p style={styles.heroSubHeader}>
               Generating Algorithms for Hot Spots Policing
            </p>
         </section>

         {/* Our Mission Section */}
         <section className="scroll-animation" style={styles.section}>
            <h2 style={styles.subHeader}>Our Mission</h2>
            <p style={styles.text}>
               We develop advanced algorithms for predictive policing, helping law enforcement agencies anticipate and prevent crime in high-risk areas.
            </p>
         </section>

         {/* What We Do Section */}
         <section className="scroll-animation" style={styles.section}>
            <h2 style={styles.subHeader}>What We Do</h2>
            <p style={styles.text}>
               By leveraging machine learning and artificial intelligence, we create models that identify crime hotspots, enabling data-driven decisions to improve public safety.
            </p>
         </section>

         <section style={styles.teamSection}>
            <h2 style={styles.subHeader}>Meet Our Team</h2>
            <div style={styles.teamContainer}>
               <div style={styles.teamMember}>
                  <img src="https://via.placeholder.com/150" alt="Team Member 1" style={styles.image} />
                  <p style={styles.teamName}>Aaron Lin</p>
                  <p style={styles.teamRole}>Back end</p>
               </div>
               <div style={styles.teamMember}>
                  <img src="https://via.placeholder.com/150" alt="Team Member 2" style={styles.image} />
                  <p style={styles.teamName}>Alex Chen</p>
                  <p style={styles.teamRole}>Front end</p>
               </div>
               <div style={styles.teamMember}>
                  <img src="https://via.placeholder.com/150" alt="Team Member 3" style={styles.image} />
                  <p style={styles.teamName}>Andrea Maria</p>
                  <p style={styles.teamRole}>Research Team</p>
               </div>
            </div>
         </section>

         <section style={styles.contactSection}>
            <h2 style={styles.contactHeader}>Contact Us</h2>
            <p style={styles.contactText}>Let's work together to make our communities safer.</p>
            <div style={styles.contactInfo}>
               <p>Email: <a href="mailto:info@teamgahsp.com" style={styles.contactLink}>info@teamgahsp.com</a></p>
               <p>Phone: <a href="tel:123-456-7890" style={styles.contactLink}>(123) 456-7890</a></p>
            </div>
         </section>
      </div>
   );
}

// Inline styles
const styles = {
   container: {
      fontFamily: "'Helvetica Neue', sans-serif",
      color: '#1a1a1a',
      backgroundColor: '#fff',
      margin: '0 auto',
      padding: '0',
      maxWidth: '1200px',
      lineHeight: '1.8',
   },
   heroSection: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f4f6',
      textAlign: 'center',
   },
   heroHeader: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#1a1a1a',
   },
   heroSubHeader: {
      fontSize: '1.5rem',
      fontWeight: '300',
      color: '#666',
   },
   section: {
      padding: '60px 20px',
      textAlign: 'center',
      opacity: 0,
      transform: 'translateY(50px)', // Start position for scroll animation
      transition: 'opacity 1s ease-out, transform 1s ease-out',
   },
   subHeader: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '20px',
      color: '#1a1a1a',
   },
   text: {
      fontSize: '1.2rem',
      fontWeight: '300',
      maxWidth: '800px',
      margin: '0 auto',
      color: '#666',
   },
   teamSection: {
      padding: '60px 20px',
      textAlign: 'center',
   },
   teamContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
   },
   teamMember: {
      textAlign: 'center',
      marginBottom: '20px',
      width: '250px',
   },
   image: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      marginBottom: '15px',
      objectFit: 'cover',
      border: '3px solid #ccc',
   },
   teamName: {
      fontSize: '1.2rem',
      fontWeight: '500',
      color: '#1a1a1a',
   },
   teamRole: {
      fontSize: '1rem',
      fontWeight: '300',
      color: '#666',
   },
   contactSection: {
      backgroundColor: '#f3f4f6',
      padding: '60px 20px',
      textAlign: 'center',
   },
   contactHeader: {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#1a1a1a',
      marginBottom: '20px',
   },
   contactText: {
      fontSize: '1.2rem',
      fontWeight: '300',
      color: '#666',
      marginBottom: '20px',
   },
   contactInfo: {
      fontSize: '1rem',
      color: '#1a1a1a',
   },
   contactLink: {
      color: '#1a1a1a',
      textDecoration: 'underline',
   },
};

// Additional CSS (should be in a separate CSS file)
const globalStyles = `
   .scroll-animation.in-view {
      opacity: 1;
      transform: translateY(0);
   }
`;

export default About;