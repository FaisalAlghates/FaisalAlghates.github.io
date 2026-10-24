// ✏️ Edit everything about you here — the whole site reads from this file.
export const profile = {
  name: 'Faisal',
  fullName: 'Faisal Alghates',
  role: 'Software Engineer & Full-Stack Developer',
  roles: ['Software Engineer', 'Full-Stack Developer', 'Web & App Developer', 'Problem Solver'],
  tagline: 'I build reliable, scalable and user-focused web products — from healthcare APIs to modern, immersive interfaces.',
  about: [
    'Software Engineer and Full-Stack Developer from the University of Jeddah, with hands-on experience in web development, SaaS platforms and software solutions.',
    'I work with Angular, React, ASP.NET and Laravel, building responsive web apps, backend services and admin dashboards backed by REST APIs and MySQL — with a strong focus on debugging, testing and clean architecture.',
  ],
  location: 'Jeddah, Saudi Arabia',
  email: 'alghatesfaisal@gmail.com',
  github: 'https://github.com/FaisalAlghates',
  linkedin: 'https://www.linkedin.com/in/faisal-alghates/',
}

export const stats = [
  { value: '8+', label: 'Public projects' },
  { value: '2', label: 'Professional roles' },
  { value: '6+', label: 'Frameworks used' },
  { value: 'UJ', label: 'University of Jeddah' },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'Business Schema',
    period: 'Nov 2025 – May 2026',
    type: 'Full-time · Jeddah',
    points: [
      'Developed and supported Web API components within a healthcare information system.',
      'Updated AngularJS controllers and services to match revised API specifications.',
      'Improved performance through code optimization and better request processing.',
      'Worked with SQL stored procedures and repository layers to implement business logic.',
    ],
  },
  {
    role: 'Software Developer (Intern)',
    company: 'Brmaja | برمجة',
    period: 'Jun 2025 – Aug 2025',
    type: 'Internship · Jeddah',
    points: [
      'Built and tested Laravel web apps using Livewire and Redis caching.',
      'Designed and documented a Document Management System with Laravel 12 and MySQL.',
      'Modernized legacy features of the University of Jeddah business incubator website.',
    ],
  },
]

export const skills = [
  { group: 'Frontend', items: ['Angular / AngularJS', 'React', 'JavaScript', 'Tailwind CSS', 'Livewire'] },
  { group: 'Backend', items: ['ASP.NET Web API', 'Laravel', 'REST APIs', 'Redis', 'Next.js'] },
  { group: 'Databases', items: ['MySQL', 'SQL Server', 'Stored Procedures', 'Repository Pattern'] },
  { group: 'Practices', items: ['SDLC', 'Agile', 'Software Testing', 'Documentation', 'Git & GitHub'] },
]
// Pulled from github.com/FaisalAlghates — `live` is the GitHub Pages demo when one exists.
const gh = (r) => `https://github.com/FaisalAlghates/${r}`
const pages = (r, path = '') => `https://faisalalghates.github.io/${r}/${path}`

export const projects = [
  {
    title: 'Rasikh',
    tag: 'Proptech · AI',
    desc: 'Arabic-first platform for Saudi rental property, AI engineering-office drafts and brokerage.',
    stack: ['TypeScript', 'React', 'AI'],
    color: '#8b5cf6',
    link: gh('rasikh'),
    live: pages('rasikh', 'ar/'),
  },
  {
    title: 'RERS',
    tag: 'IoT · Safety',
    desc: 'IoT-enabled emergency monitoring system for real-time building safety, integrating sensor data.',
    stack: ['IoT', 'Sensors', 'Web'],
    color: '#f472b6',
    link: gh('RERS_TEAM'),
    live: pages('RERS_TEAM'),
  },
  {
    title: 'ROOM 13',
    tag: 'Game · Unity 6',
    desc: 'First-person psychological horror game with mod source, game design document and poster.',
    stack: ['Unity 6', 'C#', 'GDD'],
    color: '#a3e635',
    link: gh('ROOM13'),
    live: pages('ROOM13'),
  },
  {
    title: 'DOC',
    tag: 'AI · Platform',
    desc: 'AI-powered documentation platform for creating, managing, testing and organizing software docs.',
    stack: ['Laravel', 'Blade', 'AI'],
    color: '#5eead4',
    link: gh('DOC'),
    live: pages('DOC'),
  },
  {
    title: 'AIA',
    tag: 'AI · Agency',
    desc: 'AI automation agency platform showcasing services, solutions, analytics and resources.',
    stack: ['Laravel', 'Blade', 'Automation'],
    color: '#fbbf24',
    link: gh('AIA'),
    live: pages('AIA'),
  },
  {
    title: 'ParHub',
    tag: 'Web App',
    desc: 'Web-based presentation management platform built with Laravel, Livewire and Alpine.js.',
    stack: ['Laravel', 'Livewire', 'Alpine.js'],
    color: '#38bdf8',
    link: gh('par'),
    live: pages('par'),
  },
  {
    title: 'ALYA',
    tag: 'Corporate · Bilingual',
    desc: 'Modern bilingual corporate website built with Next.js and React, showcasing ALYA and its portfolio.',
    stack: ['Next.js', 'React', 'Tailwind'],
    color: '#fb923c',
    link: gh('Alya'),
  },
  {
    title: 'EventTech',
    tag: 'Events · Saudi',
    desc: 'Discover and book top events in Saudi Arabia — from concerts to art exhibits.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    color: '#e879f9',
    link: gh('EventTech'),
  },
  {
    title: 'Aegis AI',
    tag: 'AI · Research',
    desc: 'Local research and simulation platform for multi-sensor tracking, built on synthetic data only.',
    stack: ['TypeScript', 'Simulation', 'AI'],
    color: '#22d3ee',
    private: true,
  },
  {
    title: 'NOVARA: Project 23',
    tag: 'Game · Unity',
    desc: 'Arabic crime-investigation game built in Unity.',
    stack: ['Unity', 'C#', 'Game Design'],
    color: '#fbbf24',
    private: true,
  },
]
