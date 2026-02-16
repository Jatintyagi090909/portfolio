import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  ChevronDown,
  Code2,
  Server,
  Smartphone,
  Database,
  GitBranch,
  GraduationCap,
  Award,
  Briefcase,
  FolderGit2,
  User,
  Menu,
  X,
  Terminal,
  Sparkles,
  Download,
  Zap,
  Globe,
  Play
} from 'lucide-react';

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// Typing Effect Component
const TypeWriter = ({ texts, speed = 100 }: { texts: string[]; speed?: number }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed]);

  return (
    <span className="text-cyan-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Glowing Card Component
const GlowCard = ({ children, className = '', glowColor = 'cyan' }: { children: React.ReactNode; className?: string; glowColor?: string }) => {
  const colors: Record<string, string> = {
    cyan: 'hover:shadow-cyan-500/20',
    blue: 'hover:shadow-blue-500/20',
    purple: 'hover:shadow-purple-500/20',
    green: 'hover:shadow-green-500/20',
    orange: 'hover:shadow-orange-500/20',
    pink: 'hover:shadow-pink-500/20'
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${glowColor}-500 to-${glowColor}-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
      <div className={`relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 group-hover:border-${glowColor}-500/50 transition-all duration-300 hover:shadow-2xl ${colors[glowColor]} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

// Code Block Component
const CodeBlock = () => {
  const code = `const developer = {
  name: "Jatin Tyagi",
  role: "Software Developer",
  skills: ["Java", "Flutter", "React"],
  passion: "Building amazing apps",
  coffee: true ☕
};`;

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-700/50 overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-slate-400 text-xs ml-2">developer.js</span>
      </div>
      <pre className="p-4 text-slate-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Stats Counter Component
const StatCounter = ({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-3">
        <Icon className="w-8 h-8 text-cyan-400" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{value}</div>
      <div className="text-slate-400 text-sm mt-1">{label}</div>
    </motion.div>
  );
};

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Terminal },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const skills = [
    {
      category: 'Backend & Architecture',
      icon: Server,
      color: 'cyan',
      items: ['Spring Boot (Java)', 'REST API Design', 'MVC Architecture', 'Auth & Security', 'JPA/Hibernate']
    },
    {
      category: 'Web Development',
      icon: Globe,
      color: 'blue',
      items: ['React.js', 'Angular.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3']
    },
    {
      category: 'Mobile Development',
      icon: Smartphone,
      color: 'purple',
      items: ['Flutter', 'Dart', 'Android SDK', 'REST Integration', 'Android Studio']
    },
    {
      category: 'Databases',
      icon: Database,
      color: 'green',
      items: ['PostgreSQL', 'MySQL', 'Firebase', 'Realtime DB', 'Cloud Firestore']
    },
    {
      category: 'DevOps & Tools',
      icon: GitBranch,
      color: 'orange',
      items: ['Git/GitHub', 'CI/CD', 'Jenkins', 'Gradle', 'Play Console', 'Build Automation']
    },
    {
      category: 'AI & Machine Learning',
      icon: Sparkles,
      color: 'pink',
      items: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Data Analysis']
    }
  ];

  const experiences = [
    {
      title: 'Software Developer Intern',
      company: 'Softiwa Technologies Pvt. Ltd.',
      location: 'Remote · Faridabad',
      period: 'June 2025 – Present',
      color: 'cyan',
      highlights: [
        'Building scalable apps with Angular frontend and Spring Boot backend',
        'Designing secure RESTful APIs for enhanced system performance',
        'Developing Flutter mobile apps with Firebase integration',
        'Implementing Agile workflows with Git version control'
      ]
    },
    {
      title: 'Web Developer Intern',
      company: 'Shubhchintak Foundation Trust',
      location: 'Remote · Pune',
      period: 'Jan 2025 – April 2025',
      color: 'blue',
      highlights: [
        'Architected and developed the official website using React.js',
        'Collaborated on mission-aligned branding and UX design',
        'Implemented fully responsive design patterns'
      ]
    },
    {
      title: 'AI/ML Intern',
      company: 'Ensino Research and Development Pvt. Ltd.',
      location: 'Remote · Dehradun',
      period: 'June 2024 – Aug 2024',
      color: 'purple',
      highlights: [
        'Completed intensive 8-week ML/DL training program',
        'Applied ML algorithms to real-world datasets',
        'Developed innovative AI solutions using cutting-edge frameworks'
      ]
    }
  ];

  const projects = [
    {
      title: 'Noteshala ERP WebView App',
      description: 'Flutter-based WebView app enabling seamless mobile access to ERP features. Implemented Flutter Flavors for multi-client deployment from single codebase.',
      tech: ['Flutter', 'WebView', 'Play Store', 'Flavors'],
      color: 'cyan',
      iconUrl: 'https://res.cloudinary.com/dvcsyodaw/image/upload/v1771247581/Picsart_26-02-16_18-42-18-490_fnuzrv.png',
      link: 'https://play.google.com/store/apps/details?id=com.softiwa.noteshala'
    },
    {
      title: 'CircleBook App',
      description: 'Professional Committee Management app with Firebase authentication, real-time database sync, and published on Google Play Store.',
      tech: ['Flutter', 'Spring Boot', 'REST API', 'Firebase', 'Play Store', 'Realtime DB'],
      color: 'blue',
      iconUrl: 'https://res.cloudinary.com/dvcsyodaw/image/upload/v1771247582/Picsart_26-02-16_18-42-42-221_devoy3.png',
      link: 'https://play.google.com/store/apps/details?id=com.softiwa.circlebook'
    },
    {
      title: 'Shubhchintak Foundation Website',
      description: 'Responsive React.js website with dynamic routing, Formik forms, Yup validation, and custom page transition animations.',
      tech: ['React.js', 'React Router', 'Formik', 'Netlify'],
      color: 'purple',
      iconUrl: 'https://res.cloudinary.com/dvcsyodaw/image/upload/v1771247963/shubh_png_2_fk0v5g.jpg',
      link: 'https://shubhchintakfoundationtrust.netlify.app/'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <ParticleBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-cyan-400">&lt;</span>
                JT
                <span className="text-cyan-400">/&gt;</span>
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-slate-300">Available for opportunities</span>
              </motion.div>

              {/* Name with Profile Image */}
              <div className="flex items-center gap-6 mb-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="text-slate-300">Hi, I'm</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Jatin Tyagi
                  </span>
                </motion.h1>

                {/* Circular Profile Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="relative flex-shrink-0"
                >
                  {/* Animated ring */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin-slow opacity-75 blur-sm"></div>
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-75"></div>
                  
                  {/* Profile image container */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-slate-950 bg-slate-800">
                    {/* Replace this src with your actual photo URL */}
                    <img
                      src="https://res.cloudinary.com/dvcsyodaw/image/upload/v1771247404/1771247211769_2_a2rbmq.jpg"
                      alt="Jatin Tyagi"
                      className="w-full h-full object-cover"
                    />
                    {/* Uncomment below and add your photo path to use your own image */}
                    {/* <img src="/your-photo.jpg" alt="Jatin Tyagi" className="w-full h-full object-cover" /> */}
                  </div>

                  {/* Status indicator */}
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-950">
                    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl text-slate-400 mb-6 h-8"
              >
                <TypeWriter texts={['Software Developer', 'Backend Developer', 'Mobile App Developer', 'Problem Solver']} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 text-lg mb-8 max-w-xl"
              >
                Building exceptional digital experiences with modern technologies. 
                Passionate about creating scalable applications that make a difference.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap size={20} />
                    Let's Connect
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 border border-slate-700 rounded-xl font-semibold hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-2"
                >
                  <Play size={20} />
                  View Work
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4"
              >
                {[
                  { icon: Github, href: 'https://github.com/Jatintyagi090909/', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/jatin-tyagi-81b104198', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:jatintyagi0909@gmail.com', label: 'Email' },
                  { icon: Phone, href: 'tel:7906994533', label: 'Phone' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.icon === Mail || social.icon === Phone ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-3 bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10"
                    title={social.label}
                  >
                    <social.icon size={20} className="text-slate-400 hover:text-cyan-400" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Code Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <CodeBlock />
              
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-3 gap-6 mt-8"
              >
                <StatCounter value="3+" label="Internships" icon={Briefcase} />
                <StatCounter value="3+" label="Projects" icon={FolderGit2} />
                <StatCounter value="10+" label="Technologies" icon={Code2} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-cyan-500/50" size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <User className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-slate-400">01.</span> About Me
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <GlowCard className="p-8" glowColor="cyan">
                   <p className="text-lg text-slate-300 leading-relaxed mb-6">
    Results-driven <span className="text-cyan-400 font-semibold">Software Developer</span> with hands-on experience in building scalable backend systems using Spring Boot and developing cross-platform mobile applications with Flutter. Strong expertise in REST API development, database management, and end-to-end deployment. Committed to delivering efficient and high-performance software solutions.
  </p>
  <p className="text-lg text-slate-300 leading-relaxed mb-8">
    I enjoy transforming complex problems into practical solutions by designing clean architectures, integrating secure APIs, and delivering seamless user experiences across web and mobile platforms.
  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: MapPin, text: 'Muzaffarnagar, UP', color: 'cyan' },
                      { icon: Mail, text: 'jatintyagi0909@gmail.com', color: 'blue' },
                      { icon: Phone, text: '+91 7906994533', color: 'green' },
                      { icon: GraduationCap, text: 'MCA Graduate', color: 'purple' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-slate-300 min-w-0"
                      >
                        <item.icon className={`text-${item.color}-400 flex-shrink-0`} size={18} />
                        <span className="text-sm break-words">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </div>

              <div className="space-y-6">
                <GlowCard className="p-6" glowColor="blue">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-cyan-500/20 flex-shrink-0">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-slate-400 font-mono text-sm truncate">~/jatin/tech-stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'Spring Boot', 'Flutter', 'React.js', 'Angular', 'PostgreSQL', 'Firebase', 'Git', 'Jenkins'].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-cyan-400 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlowCard>

                <div className="grid grid-cols-2 gap-4">
                  <GlowCard className="p-4 text-center" glowColor="purple">
                    <div className="text-3xl font-bold text-purple-400 mb-1">3+</div>
                    <div className="text-slate-400 text-sm">Internships</div>
                  </GlowCard>
                  <GlowCard className="p-4 text-center" glowColor="green">
                    <div className="text-3xl font-bold text-green-400 mb-1">3+</div>
                    <div className="text-slate-400 text-sm">Projects Built</div>
                  </GlowCard>
                </div>

                <motion.a
                  href="https://res-console.cloudinary.com/dvcsyodaw/thumbnails/v1/image/upload/v1771251803/SmF0aW5fVHlhZ2lfNzkwNjk5NDUzM18xNF9oc3dmcWk=/as_is/Jatin_Tyagi_7906994533_14_hswfqi"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 font-semibold hover:bg-cyan-500/20 transition-all duration-300"
                >
                  <Download size={20} />
                  View Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 relative bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-slate-400">02.</span> Tech Stack
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowCard className="p-6 h-full" glowColor={skill.color}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg bg-${skill.color}-500/20`}>
                        <skill.icon className={`w-5 h-5 text-${skill.color}-400`} />
                      </div>
                      <h3 className="font-semibold text-white">{skill.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className={`px-3 py-1.5 bg-slate-800/50 rounded-lg text-sm text-slate-300 border border-slate-700/50 hover:border-${skill.color}-500/50 hover:text-${skill.color}-400 transition-colors cursor-default`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-slate-400">03.</span> Experience
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500"></div>

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 top-0 w-5 h-5 rounded-full bg-${exp.color}-500 border-4 border-slate-950 shadow-lg shadow-${exp.color}-500/50`}></div>

                    <GlowCard className="p-6" glowColor={exp.color}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-bold text-white break-words">{exp.title}</h3>
                          <p className={`text-${exp.color}-400 font-medium break-words`}>{exp.company}</p>
                          <p className="text-slate-500 text-sm mt-1">{exp.location}</p>
                        </div>
                        <span className={`px-4 py-1.5 bg-${exp.color}-500/10 text-${exp.color}-400 rounded-full text-sm font-medium border border-${exp.color}-500/30 whitespace-nowrap flex-shrink-0`}>
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex gap-3 text-slate-300">
                            <span className={`text-${exp.color}-400 mt-1.5 flex-shrink-0`}>▹</span>
                            <span className="break-words">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 relative bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30">
                <FolderGit2 className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-slate-400">04.</span> Projects
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowCard className="h-full flex flex-col" glowColor={project.color}>
                    <div className={`h-40 bg-gradient-to-br from-${project.color}-500/10 to-${project.color}-600/10 flex items-center justify-center border-b border-slate-800 flex-shrink-0`}>
                      <project.icon className={`w-16 h-16 text-${project.color}-400`} />
                    </div>
                    <div className="p-6 flex-1 flex flex-col min-h-0">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <h3 className="text-lg font-bold text-white break-words min-w-0 flex-1">{project.title}</h3>
                        <a
                          href={project.link}
                          className={`p-2 rounded-lg bg-slate-800/50 hover:bg-${project.color}-500/20 transition-colors flex-shrink-0`}
                        >
                          <ExternalLink size={18} className="text-slate-400" />
                        </a>
                      </div>
                      <p className="text-slate-400 text-sm mb-4 flex-1 break-words">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 bg-${project.color}-500/10 text-${project.color}-400 rounded text-xs font-mono`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30">
                <GraduationCap className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-slate-400">05.</span> Education
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <GlowCard className="p-6 h-full" glowColor="cyan">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/20 flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white break-words">Master of Computer Applications</h3>
                      <p className="text-slate-400 text-sm">MCA</p>
                    </div>
                  </div>
                  <p className="text-cyan-400 font-medium break-words">Uttaranchal University, Dehradun</p>
                  <p className="text-slate-500 text-sm"> 2023 – 2025</p>
                </GlowCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <GlowCard className="p-6 h-full" glowColor="blue">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/20 flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white break-words">Bachelor of Computer Application</h3>
                      <p className="text-slate-400 text-sm">BCA</p>
                    </div>
                  </div>
                  <p className="text-blue-400 font-medium break-words">Monad University, Hapur</p>
                  <p className="text-slate-500 text-sm"> 2020 – 2023</p>
                </GlowCard>
              </motion.div>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>

            <div className="grid gap-4">
              {[
                { title: 'Machine Learning', org: 'SWAYAM, NPTEL Online Certification', date: 'March 2024', color: 'green' },
                { title: 'Learn Everything about AI, Bootcamp', org: 'DevTown', date: 'June 2024', color: 'purple' },
                { title: 'Volunteer – 38th National Games', org: 'Dehradun', date: '2025', color: 'orange' }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowCard className="p-4" glowColor={cert.color}>
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-${cert.color}-500/20 flex-shrink-0`}>
                        <Award className={`w-5 h-5 text-${cert.color}-400`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white break-words">{cert.title}</h4>
                        <p className="text-slate-400 text-sm break-words">{cert.org} | {cert.date}</p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                <Mail className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-slate-400">06.</span> Get In Touch
              </h2>
            </div>

            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                { icon: Mail, label: 'Email', value: 'jatintyagi0909@gmail.com', href: 'mailto:jatintyagi0909@gmail.com', color: 'cyan' },
                { icon: Phone, label: 'Phone', value: '+91 7906994533', href: 'tel:7906994533', color: 'green' },
                { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: 'https://www.linkedin.com/in/jatin-tyagi-81b104198', color: 'blue' },
                { icon: Github, label: 'GitHub', value: 'View my code', href: 'https://github.com/Jatintyagi090909/', color: 'purple' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={contact.icon === Mail || contact.icon === Phone ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GlowCard className="p-4" glowColor={contact.color}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-${contact.color}-500/20 flex-shrink-0`}>
                        <contact.icon className={`w-5 h-5 text-${contact.color}-400`} />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-slate-500 text-sm">{contact.label}</p>
                        <p className="font-medium text-white break-all">{contact.value}</p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="mailto:jatintyagi0909@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <Sparkles size={22} />
              Say Hello!
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">
                <span className="text-cyan-400">&lt;</span>
                Jatin Tyagi
                <span className="text-cyan-400">/&gt;</span>
              </span>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Github, href: 'https://github.com/Jatintyagi090909/' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/jatin-tyagi-81b104198' },
                { icon: Mail, href: 'mailto:jatintyagi0909@gmail.com' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.icon === Mail ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Jatin Tyagi. All rights reserved.
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Built with React.js, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
