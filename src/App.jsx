import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './navBar/Navbar'
import emailjs from '@emailjs/browser'

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          // Optional: remove the class when element is out of view
          // entry.target.classList.remove('show');
        }
      });
    }, {
      threshold: 0.1 // 10% of the element needs to be visible
    });

    // Observe all elements with hidden class
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
    // Observe project cards
    document.querySelectorAll('.project-card').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const viewProject = () => {
    alert('Not available yet!')
  }

  const showContactModal = () => {
    document.querySelector('.contact-Modal').classList.add('show');
    document.querySelector('.modal-overlay').classList.add('show');
    document.body.classList.add('modal-open');
  }

  const closeContactModal = () => {
    document.querySelector('.contact-Modal').classList.remove('show');
    document.querySelector('.modal-overlay').classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    emailjs.sendForm(
      'service_zb6vhye', // Get this from EmailJS dashboard
      'template_joz4ik7', // Get this from EmailJS dashboard
      event.target,
      'AhU9h77nKrV6lf7ST' // Get this from EmailJS dashboard
    )
    .then((result) => {
      setSubmitStatus('success');
      event.target.reset();
      setTimeout(() => {
        closeContactModal();
        setSubmitStatus(null);
      }, 2000);
    })
    .catch((error) => {
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div>
      <div className="modal-overlay" onClick={closeContactModal}></div>
      <Navbar />  
      <main className='main'>
        <p>Hey, I'm DMA</p>
        <h1>A FULL TIME SOFTWARE DEVELOPER</h1>
        <button onClick={() => {
          document.querySelector('#projects').scrollIntoView({ 
            behavior: 'smooth'
          });
        }}>Projects <i className="fa-solid fa-arrow-right"></i></button>
        <button onClick={() => {
          document.querySelector('#about').scrollIntoView({ 
            behavior: 'smooth'
          });
        }}>About <i className="fa-solid fa-arrow-right"></i></button>
        <button onClick={() => {
          document.querySelector('#experience').scrollIntoView({ 
            behavior: 'smooth',
            animation: 'fadeIn 3s ease'
          });
        }}>Experience <i className="fa-solid fa-arrow-right"></i></button>
      </main>
      <section id='projects'>
        <h1 className="hidden">Projects<i className="fa-solid fa-folder-open"></i></h1>
        <div className='project-container'>
          <div className='project-card'>
            <h2>Unplug</h2>
            <p>An app that helps you reduce your screen time and improve your mental health.</p>
            <span>React Native</span>
            <span>Node.js</span>
            <span>SQL</span>
            <button className='project-button' onClick={viewProject}>View Project <i className="fa-solid fa-arrow-right"></i></button>
            <button className='code-button' onClick={viewProject}>Code <i className="fa-solid fa-code"></i></button>
          </div>
          <div className='project-card'>
            <h2>Ubudget</h2>
            <p>An app that helps you manage your finances and stay on top of your budget.</p>
            <span>React</span>
            <span>Node.js</span>
            <span>SQL</span>
            <button className='project-button' onClick={viewProject}>View Project <i className="fa-solid fa-arrow-right"></i></button>
            <button className='code-button' onClick={viewProject}>Code <i className="fa-solid fa-code"></i></button>
          </div>
          <div className='project-card'>
            <h2>BookCalc</h2>
            <p>An app that helps you calculate the amount of time you need to read to finish a book.</p>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <button className='project-button' onClick={viewProject}>View Project <i className="fa-solid fa-arrow-right"></i></button>
            <button className='code-button' onClick={viewProject}>Code <i className="fa-solid fa-code"></i></button>
          </div>
          <div className='project-card'>
            <h2>None, Yet!</h2>
            <p>Have any ideas? Let's talk about it! Scroll down to contact me.</p>
            <span>None</span>
            <span>None</span>
            <span>None</span>
            <span>None</span>
            <button className='project-button' onClick={viewProject}>View Project <i className="fa-solid fa-arrow-right"></i></button>
            <button className='code-button' onClick={viewProject}>Code <i className="fa-solid fa-code"></i></button>
          </div>
        </div>
      </section>
      <section id='about' className="hidden">
        <h1>About<i className="fa-solid fa-user"></i></h1>
        <div className='about-container'>
          <h2>Who am I?</h2>
          <p className='about-text'>I'm a full time software developer with a passion for creating innovative solutions to complex problems. I have experience in a variety of programming languages and technologies, and I'm always looking for new challenges to tackle.</p>
          <p className='about-contact'>Contact me for more information</p>
          <p className='about-email'>Email: dmnlaali@gmail.com</p>
          <button 
            onClick={() => window.open('/CV.pdf')} 
            className='about-cv'
          >
            <i className="fa-solid fa-file-pdf"></i>
            <span>Download CV</span>
            <i className="fa-solid fa-download"></i>
          </button>
          <button onClick={showContactModal} className='contact-button'>Contact Me</button>
        </div>
      </section>
      <div className="contact-Modal">
        <h2>Let's Talk</h2>
        <button onClick={closeContactModal} className="close-btn">
          <i className="fa-solid fa-times"></i>
        </button>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="user_name"
            placeholder="Your Name" 
            required 
            minLength="2"
          />
          <input 
            type="email" 
            name="user_email"
            placeholder="Your Email" 
            required 
          />
          <textarea 
            name="message"
            placeholder="Your Message" 
            required 
            minLength="10"
          ></textarea>
          <div className="modal-buttons">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={isSubmitting ? 'loading' : ''}
            >
              {isSubmitting ? (
                <>Sending... <i className="fa-solid fa-spinner fa-spin"></i></>
              ) : (
                <>Send Message <i className="fa-solid fa-paper-plane"></i></>
              )}
            </button>
            <button type="reset" className="clear-btn">
              Clear All <i className="fa-solid fa-eraser"></i>
            </button>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? 
                'Message sent successfully!' : 
                'Failed to send message. Please try again.'}
            </div>
          )}
        </form>
      </div>
      <section id='experience'>
        <h1 className="hidden">Experience<i className="fa-solid fa-briefcase"></i></h1>
        <p className='experience-text hidden'>Hover over the circles to see my skills</p>
        <p className='experience-total'>Total Years of Experience: <span>3</span></p>
        <div className="middle-line hidden">
          <div className="middle-line-circle">
            <p className='middle-line-circle-text'><i className="fa-brands fa-html5"></i>HTML + CSS</p>
          </div>
          <div className="middle-line-circle">
            <p className='middle-line-circle-text'><i className="fa-brands fa-js"></i>JavaScript</p>
          </div>
          <div className="middle-line-circle">
            <p className='middle-line-circle-text'><i className="fa-brands fa-react"></i>React</p>
          </div>
          <div className="middle-line-circle">
            <p className='middle-line-circle-text'><i className="fa-brands fa-node-js"></i>Node.js</p>
          </div>
          <div className="middle-line-circle">  
            <p className='middle-line-circle-text'>TypeScript</p>
          </div>
        </div>
      </section>
      <section id='certificates' className="hidden">
        <h1>Certificates<i className="fa-solid fa-certificate"></i></h1>
        <div className="certificates-container">
          <div className="certificate-card">
            <div className="certificate-logo">
              <i className="fa-brands fa-free-code-camp"></i>
            </div>
            <div className="certificate-content">
              <h3>Responsive Web Design</h3>
              <p>freeCodeCamp</p>
              <span className="certificate-date">2024</span>
              <button onClick={() => window.open('https://www.freecodecamp.org/certification/fcc3dbd622d-0814-4025-816d-b81a4b4824a6/responsive-web-design')}>
                View Certificate <i className="fa-solid fa-external-link-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
