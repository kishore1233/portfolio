// data/portfolioData.js — single source of truth for both React & Next.js versions

export const meta = {
  name: 'Kishore Kumar K S',
  initials: 'Ks',
  title: 'Full-Stack Developer',
  tagline: 'B.Tech CSE student at SIETK Puttur, passionate about building immersive full-stack applications, automation tools, and secure systems. Open to internships and collaborative projects.',
  available: true,
  // Replace with your actual photo: place photo.jpg in /public, then set '/photo.jpg'
  // Or use a GitHub avatar: 'https://avatars.githubusercontent.com/u/YOUR_ID'
  photo: '/photo/photo.jpg',
  stats: [
    { num: '3+', label: 'Internships' },
    { num: '3',  label: 'Projects'   },
    { num: '12+',label: 'Tech Skills'},
    { num: '4',  label: 'Certs'      },
  ],
  techStack: ['React','Node.js','Java','Python','MongoDB','MySQL'],
};

export const contact = {
  email: 'Revathikishore90@gmail.com',
  phone: '+91 7981867796',
  linkedin: 'https://linkedin.com/in/kishore-kumar-ks',
  github: 'https://github.com/kishore-kumar-ks',
};

export const typewriterPhrases = [
  'Full-Stack Developer',
  'Java Enthusiast',
  'React Builder',
  'Python programmer',
  'Cyber Security Trainer',
  'Open for Internships',
];

export const experience = [
  {
    id: 1,
    color: 'cyan',
    period: 'July 2025 – August 2025',
    title: 'Cyber Security Trainer',
    company: 'Intern Certify',
    badge: 'Remote',
    link: 'https://drive.google.com/file/d/127s4YlrWutivWqLffGSGsSo1ZKH1rifM/view?usp=drive_link',
    linkLabel: 'View Certificate ↗',
    points: [
      'Developed and delivered comprehensive cyber security training for 50+ participants',
      'Created hands-on lab exercises covering network security, encryption & threat analysis',
      'Designed curriculum aligned with NIST and ISO 27001 frameworks',
    ],
  },
  {
    id: 2,
    color: 'purple',
    period: 'December 2024 – January 2025',
    title: 'Internship Trainee — Core Java',
    company: 'Internshala',
    badge: 'Remote',
    link: 'https://drive.google.com/file/d/1zfryXyoty6sRvD-Tc7kReKerGFDpfa7S/view?usp=drive_link',
    linkLabel: 'View Certificate ↗',
    points: [
      'Intensive Core Java training: OOP, collections, multithreading & exception handling',
      'Built GUI applications using Swing and JavaFX frameworks',
      'Implemented Singleton, Factory, and Observer design patterns in practice projects',
    ],
  },
  {
    id: 3,
    color: 'pink',
    period: 'January 2024 – February 2024',
    title: 'Python Developer',
    company: 'Aavanto',
    badge: 'Remote',
    link: 'https://drive.google.com/file/d/18fcZfPsn-B7OwAo48HmyNGg5-IHOyoej/view?usp=drive_link',
    linkLabel: 'View Details ↗',
    points: [
      'Automated workflows reducing manual processing time by 40%',
      'Leveraged pandas & NumPy for analysis on 10,000+ record datasets',
      'Maintained clean Git history and resolved merge conflicts collaboratively',
    ],
  },
];

export const projects = [
  {
    id: 0,
    color: 'cyan',
    icon: '🏥',
    name: 'DocSpot',
    subtitle: 'Doctor Appointment Booking Platform',
    description: 'Full-stack healthcare appointment booking platform enabling patients to browse doctors, filter by specialty/location, and schedule appointments in real time.',
    tech: ['React','Node.js','Express','MongoDB','JWT','Axios','Bootstrap'],
    year: 2026,
    github: 'https://github.com/kishore1233/DocSpot-Seamless-Appointment-Booking-for-Health',
    live: null,
    points: [
      'Built full-stack platform with real-time appointment booking and doctor browsing',
      'Implemented JWT-based role auth for Admin, Doctor, and Patient dashboards',
      'Developed RESTful APIs for booking, confirmation, rescheduling & status tracking',
      'Integrated MongoDB for scalable storage of user profiles and appointment history',
    ],
  },
  {
    id: 1,
    color: 'purple',
    icon: '🌤️',
    name: 'Weather Forecasting App',
    subtitle: 'Real-Time Weather & 5-Day Forecast',
    description: 'Web application with real-time weather data and 5-day forecasts via OpenWeather API integration.',
    tech: ['Python','Flask','OpenWeather API','HTML/CSS'],
    year: 2024,
    github: 'https://github.com/kishore1233/weather-app',
    live: 'https://kishore1233.github.io/weather-app/',
    points: [
      'Integrated OpenWeather API for real-time data and 5-day forecasts',
      'Implemented robust error handling and input validation',
      'Deployed with Flask backend and fully responsive frontend design',
    ],
  },
  {
    id: 2,
    color: 'pink',
    icon: '📊',
    name: 'Secure Data Governance & Analytics',
    subtitle: 'AI-Driven Marketing Analytics — Capstone',
    description: 'End-to-end AI-driven marketing analytics system with GDPR-compliant data governance for 100K+ customer records.',
    tech: ['Python','Random Forest','Gradient Boosting','ETL','GDPR'],
    year: 2025,
    points: [
      'Built AI-driven analytics with GDPR compliance for 100K+ customer records',
      'Achieved 89% prediction accuracy using Random Forest & Gradient Boosting',
      'Automated ETL pipelines reducing data prep time by 65%',
      'Created real-time dashboards tracking CTR, ROI, and conversions',
      'Improved campaign effectiveness by 32% through continuous model optimisation',
    ],
  },
];

export const skills = [
  { accent: 'cyan',   title: 'Languages',              pills: ['Java','Python','JavaScript','HTML5','CSS3','SQL'] },
  { accent: 'purple', title: 'Frameworks & Libraries',  pills: ['React','Node.js','Express.js','Bootstrap','jQuery','Flask'] },
  { accent: 'pink',   title: 'Developer Tools',         pills: ['Git','GitHub','VS Code','IntelliJ','Postman','MySQL'] },
  { accent: 'green',  title: 'Core Competencies',       pills: ['OOP','DSA','REST APIs','Agile','MVC','Version Control'] },
];

export const certifications = [
  { icon: '🌐', text: 'Web Development Internship — CSEdge Verified',          link: 'https://drive.google.com/file/d/12ykJcgVXtt7cHZPQ_0aJ-lFAWs1ukpSr/view?usp=drive_link' },
  { icon: '☕', text: 'Core Java Training — Internshala Trainings',             link: 'https://drive.google.com/file/d/1zfryXyoty6sRvD-Tc7kReKerGFDpfa7S/view?usp=drive_link' },
  { icon: '🐍', text: 'Python 101 for Data Science — Internshala',             link: null },
  { icon: '🔧', text: 'Git & GitHub Foundations — Microsoft Learn',            link: null },
  { icon: '💡', text: 'Ideathon Participation — Certificate of Participation', link: 'https://drive.google.com/file/d/1qXmpzByOLH4aeSmpmA3h8JkhRmDoDpYf/view?usp=drive_link' },
];
