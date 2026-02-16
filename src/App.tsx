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
  Menu,
  X,
  Terminal,
  Download,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';

// Smooth Cursor Glow Effect - Optimized with throttling
const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return; // Skip if already scheduled
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        rafRef.current = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.03), transparent 80%)`,
        willChange: 'background'
      }}
    />
  );
};

// Animated Background Grid
const GridBackground = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
  </div>
);

// Floating Orbs - Static for better performance
const FloatingOrbs = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
  </div>
);

// Section Header Component
const SectionHeader = ({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <div className="flex items-center gap-4 mb-2">
      <span className="text-cyan-400 font-mono text-sm">{number}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent max-w-xs" />
    </div>
    {subtitle && <p className="text-slate-400 mt-2 max-w-2xl">{subtitle}</p>}
  </motion.div>
);

// Magnetic Button Component
const MagneticButton = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

// Skill Badge Component - Simplified animations
const SkillBadge = ({ name }: { name: string }) => (
  <span className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors duration-200 cursor-default">
    {name}
  </span>
);

// Project Card Component
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-500">
      {/* Project Image/Icon Area */}
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
        <img
          src={project.iconUrl}
          alt={project.title}
          className="w-20 h-20 rounded-2xl object-cover shadow-2xl group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
          >
            <ExternalLink size={16} className="text-slate-400 group-hover:text-cyan-400" />
          </a>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-slate-800/50 text-xs font-mono text-cyan-400/80 rounded-md border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Experience Card Component
const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
    className="relative pl-8 pb-12 last:pb-0"
  >
    {/* Timeline Line */}
    <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />
    
    {/* Timeline Dot */}
    <div className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-cyan-500 ring-4 ring-slate-950" />

    <div className="group bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {exp.title}
          </h3>
          <p className="text-cyan-400/80 font-medium">{exp.company}</p>
          <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
            <MapPin size={14} />
            <span>{exp.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
          <Calendar size={14} className="text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">{exp.period}</span>
        </div>
      </div>

      <ul className="space-y-2">
        {exp.highlights.map((highlight, i) => (
          <li key={i} className="flex gap-3 text-slate-400 text-sm">
            <ArrowRight size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

// Skills Data
const skillCategories = [
  {
    title: 'Backend & Architecture',
    icon: Server,
    skills: ['Spring Boot', 'Java', 'REST API', 'MVC', 'JPA/Hibernate', 'Authentication']
  },
  {
    title: 'Frontend Development',
    icon: Layers,
    skills: ['React.js', 'Angular.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3']
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    skills: ['Flutter', 'Dart', 'Android SDK', 'REST Integration', 'Android Studio']
  },
  {
    title: 'Database & Storage',
    icon: Database,
    skills: ['PostgreSQL', 'MySQL', 'Firebase', 'Realtime DB', 'Cloud Firestore']
  },
  {
    title: 'DevOps & Tools',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'CI/CD', 'Jenkins', 'Gradle', 'Play Console']
  },
  {
    title: 'AI & Machine Learning',
    icon: Cpu,
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Data Analysis']
  }
];

// Projects Data
const projects = [
  {
    title: 'Noteshala ERP WebView App',
    description: 'Flutter-based WebView app enabling seamless mobile access to ERP features. Implemented Flutter Flavors for multi-client deployment from single codebase.',
    tech: ['Flutter', 'WebView', 'Flavors', 'Play Store'],
    iconUrl: 'https://res.cloudinary.com/dygzdptij/image/upload/v1771268564/ns_gjqus2.png',
    link: 'https://play.google.com/store/apps/details?id=com.softiwa.noteshala'
  },
  {
    title: 'CircleBook App',
    description: 'Professional Committee Management app with Firebase authentication, real-time database sync, and published on Google Play Store.',
    tech: ['Flutter', 'Spring Boot', 'Firebase', 'REST API'],
    iconUrl: 'https://res.cloudinary.com/dygzdptij/image/upload/v1771268563/cb_vprach.png',
    link: 'https://play.google.com/store/apps/details?id=com.softiwa.circlebook'
  },
  {
    title: 'Shubhchintak Foundation Website',
    description: 'Responsive React.js website with dynamic routing, Formik forms, Yup validation, and custom page transition animations.',
    tech: ['React.js', 'React Router', 'Formik', 'Netlify'],
    iconUrl: 'https://res.cloudinary.com/dygzdptij/image/upload/v1771268564/shubh_yv66mi.png',
    link: 'https://shubhchintakfoundationtrust.netlify.app/'
  }
];

// Experiences Data
const experiences = [
  {
    title: 'Software Developer Intern',
    company: 'Softiwa Technologies Pvt. Ltd.',
    location: 'Remote · Faridabad',
    period: 'Jun 2025 – Present',
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
    period: 'Jan 2025 – Apr 2025',
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
    period: 'Jun 2024 – Aug 2024',
    highlights: [
      'Completed intensive 8-week ML/DL training program',
      'Applied ML algorithms to real-world datasets',
      'Developed innovative AI solutions using cutting-edge frameworks'
    ]
  }
];

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        
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
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <CursorGlow />
      <GridBackground />
      <FloatingOrbs />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group flex items-center gap-3"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden">
                <Terminal className="w-5 h-5 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-lg font-semibold hidden sm:block">
                <span className="text-slate-400">&lt;</span>
                <span className="text-white">Jatin</span>
                <span className="text-cyan-400"> /</span>
                <span className="text-slate-400">&gt;</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Resume Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://drive.usercontent.google.com/u/0/uc?id=1vHhBjHhbe6l8oCd1PSy4P5dVf5HXsBB9&export=download"
                target="_blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-cyan-500/50 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/10 transition-all"
              >
                <Download size={16} />
                Resume
              </motion.a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="https://drive.usercontent.google.com/u/0/uc?id=1vHhBjHhbe6l8oCd1PSy4P5dVf5HXsBB9&export=download"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-3 text-cyan-400 text-sm font-medium"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-full mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-slate-400">Open for opportunities</span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  <span className="text-slate-300">Hi, I'm</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Jatin Tyagi
                  </span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
                  <p className="text-xl text-slate-400 font-light">Software Developer</p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
              >
                Building exceptional digital experiences with modern technologies. 
                Specialized in <span className="text-cyan-400">Spring Boot</span>, <span className="text-cyan-400">Flutter</span>, and <span className="text-cyan-400">React.js</span>.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <MagneticButton
                  onClick={() => scrollToSection('contact')}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-medium flex items-center gap-2 hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
                >
                  Let's Talk
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </MagneticButton>
                <MagneticButton
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-slate-900/50 border border-slate-700 rounded-xl font-medium hover:border-slate-600 hover:bg-slate-900 transition-all"
                >
                  View Projects
                </MagneticButton>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <span className="text-slate-500 text-sm">Find me on</span>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: 'https://github.com/Jatintyagi090909/', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/jatin-tyagi-81b104198', label: 'LinkedIn' },
                    { icon: Mail, href: 'mailto:jatintyagi0909@gmail.com', label: 'Email' }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 group"
                      title={social.label}
                    >
                      <social.icon size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl" />
                
                {/* Profile Image Container */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                  {/* Rotating Border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin-slow" />
                  <div className="absolute inset-1 rounded-full bg-slate-950" />
                  
                  {/* Image */}
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-slate-800">
                    <img
                      src="https://res.cloudinary.com/dygzdptij/image/upload/v1771268567/profile_xjl2n5.png"
                      alt="Jatin Tyagi"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs text-slate-300">Available</span>
                  </div>
                </div>

                {/* Floating Tech Badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-8 top-8 px-4 py-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-cyan-400" />
                    <span className="text-sm text-white font-medium">Spring Boot</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-4 top-1/3 px-4 py-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Smartphone size={16} className="text-purple-400" />
                    <span className="text-sm text-white font-medium">Flutter</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute -left-4 bottom-16 px-4 py-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" />
                    <span className="text-sm text-white font-medium">React.js</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            number="01." 
            title="About Me" 
            subtitle="Get to know me better"
          />

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a results-driven <span className="text-cyan-400 font-medium">Software Developer</span> with hands-on experience in building scalable backend systems using Spring Boot and developing cross-platform mobile applications with Flutter.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Strong expertise in REST API development, database management, and end-to-end deployment. Committed to delivering efficient and high-performance software solutions.
              </p>
              <p className="text-slate-400 leading-relaxed">
                I enjoy transforming complex problems into practical solutions by designing clean architectures, integrating secure APIs, and delivering seamless user experiences across web and mobile platforms.
              </p>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                {[
                  { icon: MapPin, label: 'Location', value: 'Muzaffarnagar, UP' },
                  { icon: Mail, label: 'Email', value: 'jatintyagi0909@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 7906994533' },
                  { icon: GraduationCap, label: 'Degree', value: 'MCA Graduate' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl"
                  >
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <item.icon size={18} className="text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-500 text-xs uppercase tracking-wider">{item.label}</p>
                      <p className="text-white text-sm font-medium truncate">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '3+', label: 'Internships', icon: Briefcase },
                  { value: '3+', label: 'Projects', icon: FolderGit2 },
                  { value: '10+', label: 'Technologies', icon: Code2 },
                  { value: '2025', label: 'MCA Graduate', icon: GraduationCap }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-slate-900/30 border border-slate-800/50 rounded-2xl text-center hover:border-slate-700 transition-colors"
                  >
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-500 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Resume Download */}
              <motion.a
                href="https://drive.usercontent.google.com/u/0/uc?id=1vHhBjHhbe6l8oCd1PSy4P5dVf5HXsBB9&export=download"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 font-medium hover:border-cyan-500/50 transition-all"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            number="02." 
            title="Skills & Technologies" 
            subtitle="Technologies I work with"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="group p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    <category.icon size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            number="03." 
            title="Experience" 
            subtitle="My professional journey"
          />

          <div className="relative">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            number="04." 
            title="Featured Projects" 
            subtitle="Some things I've built"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            number="05." 
            title="Education & Certifications" 
          />

          {/* Education */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                degree: 'Master of Computer Applications',
                short: 'MCA',
                institution: 'Uttaranchal University, Dehradun',
                period: '2023 – 2025',
                color: 'cyan'
              },
              {
                degree: 'Bachelor of Computer Application',
                short: 'BCA',
                institution: 'Monad University, Hapur',
                period: '2020 – 2023',
                color: 'blue'
              }
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${edu.color}-500/10 rounded-xl`}>
                    <GraduationCap className={`w-6 h-6 text-${edu.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className="text-slate-400 text-sm">{edu.short}</p>
                    <p className={`text-${edu.color}-400 font-medium mt-2`}>{edu.institution}</p>
                    <p className="text-slate-500 text-sm">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <h3 className="flex items-center gap-3 text-xl font-semibold mb-6">
            <Award className="w-5 h-5 text-yellow-400" />
            Certifications
          </h3>
          <div className="grid gap-4">
            {[
              { title: 'Machine Learning', org: 'SWAYAM, NPTEL', date: 'March 2024' },
              { title: 'Learn Everything about AI, Bootcamp', org: 'DevTown', date: 'June 2024' },
              { title: 'Volunteer – 38th National Games', org: 'Dehradun', date: '2025' }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Award size={18} className="text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white">{cert.title}</h4>
                  <p className="text-slate-500 text-sm">{cert.org} • {cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader 
            number="06." 
            title="Get In Touch" 
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-slate-400 text-lg mb-12">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                { icon: Mail, label: 'Email', value: 'jatintyagi0909@gmail.com', href: 'mailto:jatintyagi0909@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 7906994533', href: 'tel:7906994533' },
                { icon: Linkedin, label: 'LinkedIn', value: 'Connect', href: 'https://www.linkedin.com/in/jatin-tyagi-81b104198' },
                { icon: Github, label: 'GitHub', value: 'Follow', href: 'https://github.com/Jatintyagi090909/' }
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
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 p-5 bg-slate-900/30 border border-slate-800/50 rounded-xl hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all group"
                >
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <contact.icon size={20} className="text-cyan-400" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-slate-500 text-sm">{contact.label}</p>
                    <p className="text-white font-medium truncate">{contact.value}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="mailto:jatintyagi0909@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
            >
              Say Hello
              <ArrowUpRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">
                <span className="text-slate-400">&lt;</span>
                <span className="text-white">Jatin Tyagi</span>
                <span className="text-cyan-400"> /</span>
                <span className="text-slate-400">&gt;</span>
              </span>
            </div>

            {/* Social Links */}
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

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Jatin Tyagi
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Built with React, TypeScript & Tailwind
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
