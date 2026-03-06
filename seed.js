require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/userModel');
const HeroContent = require('./models/heroContentModel');
const Service = require('./models/serviceModel');
const TechStack = require('./models/techStackModel');
const Experience = require('./models/experienceModel');
const MarqueeText = require('./models/marqueeTextModel');
const Blog = require('./models/blogModel');
const Project = require('./models/projectModel');
const Contact = require('./models/contactModel');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // ── Admin User ────────────────────────────────────────────────────────────────
    const existing = await User.findOne({ username: 'admin' });
    if (!existing) {
        await User.create({ username: 'admin', password: 'admin123' });
        console.log('✅ Admin user created  →  admin / admin123');
    } else {
        console.log('ℹ️  Admin user already exists');
    }

    // ── Hero Content ──────────────────────────────────────────────────────────────
    await HeroContent.deleteMany({});
    await HeroContent.create({
        name: 'Imran Ahmad',
        title: 'Software Developer',
        headline: 'Build. Launch. Scale. Without the complexity.',
        subheadline: 'I specialize in building high-performance, scalable web applications that help businesses ship fast and grow without limits.',
        profileImage: '/prpic.jpeg',
        ctaPrimary: 'Have a Problem',
        ctaSecondary: "See What I've Built",
        logos: [
            { url: '/string.jfif', alt: 'String' },
            { url: '/navttc2.PNG', alt: 'NAVTTC' },
            { url: '/smit.png', alt: 'SMIT' },
            { url: '/certiport.webp', alt: 'Certiport' },
            { url: '/nccs.png', alt: 'NCCS' },
            { url: '/pearson.svg', alt: 'Pearson' },
        ],
    });
    console.log('✅ Hero content seeded');

    // ── Services ──────────────────────────────────────────────────────────────────
    await Service.deleteMany({});
    const services = ['Brand Identity', 'Websites', 'Ecommerce', 'Deployment', 'Business ERP'];
    await Service.insertMany(services.map((name, i) => ({ name, order: i })));
    console.log('✅ Services seeded');

    // ── Tech Stack ────────────────────────────────────────────────────────────────
    await TechStack.deleteMany({});
    const techs = [
        { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend' },
        { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend' },
        { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Frontend' },
        { name: 'Next.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Frontend' },
        { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend' },
        { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend' },
        { name: 'Tailwind', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', category: 'Frontend' },
        { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend' },
        { name: 'Express', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'Backend' },
        { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Backend' },
        { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Backend' },
        { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Tools' },
        { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'Tools' },
        { name: 'Figma', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'Tools' },
        { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Languages' },
    ];
    await TechStack.insertMany(techs.map((t, i) => ({ ...t, order: i })));
    console.log('✅ Tech stack seeded');

    // ── Experience ────────────────────────────────────────────────────────────────
    await Experience.deleteMany({});
    await Experience.insertMany([
        {
            role: 'Lecturer in Computer Science',
            company: 'Govt. College of Technology',
            logo: '/gct.png',
            period: '2022 – Present',
            description: 'Teaching web development, programming fundamentals, and software engineering to BTech & DAE students. Curriculum design and lab instruction.',
            large: true,
            order: 0,
        },
        {
            role: 'Full Stack Developer',
            company: 'Freelance',
            logo: '',
            period: '2020 – Present',
            description: 'Delivered 20+ client projects including e-commerce platforms, ERPs, and SaaS dashboards using MERN stack.',
            large: false,
            order: 1,
        },
        {
            role: 'Web Development Instructor',
            company: 'SMIT (Saylani Mass IT Training)',
            logo: '/smit.png',
            period: '2021 – 2022',
            description: 'Trained 100+ students in modern web development technologies including React.js, Node.js, and MongoDB.',
            large: false,
            order: 2,
        },
    ]);
    console.log('✅ Experience seeded');

    // ── Marquee Text ──────────────────────────────────────────────────────────────
    await MarqueeText.deleteMany({});
    await MarqueeText.create({ text: "Let's work together. Let's work together. Let's work together. Let's work together. " });
    console.log('✅ Marquee text seeded');

    // ── Blog Posts ────────────────────────────────────────────────────────────────
    await Blog.deleteMany({});
    await Blog.insertMany([
        {
            title: 'Building Scalable REST APIs with Node.js & Express',
            description: 'A deep dive into best practices for structuring production-ready REST APIs — authentication, rate limiting, error handling and more.',
            imageUrl: '/blog1.jpg',
            category: 'Backend',
            date: new Date('2024-11-01'),
            link: '#',
        },
        {
            title: 'React Performance Optimization Techniques',
            description: 'How to identify and fix performance bottlenecks in React apps using memoization, lazy loading, and virtualization.',
            imageUrl: '/blog2.jpg',
            category: 'Frontend',
            date: new Date('2024-10-15'),
            link: '#',
        },
        {
            title: 'From Design to Code: Figma to React Workflow',
            description: 'A practical guide to converting Figma designs into pixel-perfect React components efficiently.',
            imageUrl: '/blog3.jpg',
            category: 'Workflow',
            date: new Date('2024-09-20'),
            link: '#',
        },
    ]);
    console.log('✅ Blog posts seeded');

    // ── Projects ──────────────────────────────────────────────────────────────────
    await Project.deleteMany({});
    await Project.insertMany([
        {
            title: 'Business ERP System',
            bgimg: '/p1.jpg',
            description: 'Full-featured ERP with inventory management, HR, payroll, and analytics dashboard.',
            gradient: 'from-blue-600/40 via-black/50 to-black/80',
            link: '#',
            order: 0,
        },
        {
            title: 'E-Commerce Platform',
            bgimg: '/p2.jpg',
            description: 'Multi-vendor e-commerce with Stripe payments, real-time inventory, and admin dashboard.',
            gradient: 'from-purple-600/40 via-black/50 to-black/80',
            link: '#',
            order: 1,
        },
        {
            title: 'ICG Chemicals Website',
            bgimg: '/p3.jpg',
            description: 'Corporate website with dynamic content management, product catalog, and contact system.',
            gradient: 'from-green-600/40 via-black/50 to-black/80',
            link: 'https://icgchemicals.com',
            order: 2,
        },
        {
            title: 'Portfolio & Blog Platform',
            bgimg: '/p4.jpg',
            description: 'Developer portfolio with CMS-driven blog, project showcase, and admin dashboard.',
            gradient: 'from-orange-600/40 via-black/50 to-black/80',
            link: '#',
            order: 3,
        },
    ]);
    console.log('✅ Projects seeded');

    // ── Contact ───────────────────────────────────────────────────────────────────
    await Contact.deleteMany({});
    await Contact.create({
        phone: '0092 313 1240764',
        email: 'itsimran.dev@gmail.com',
        address: 'University Road, Peshawar, Pakistan',
        github: 'https://github.com/imranahmad537',
        linkedin: 'https://www.linkedin.com/in/imran-ahmad99',
    });
    console.log('✅ Contact info seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('   Login → admin / admin123');
    process.exit(0);
}

seed().catch((err) => { console.error('❌ Seed failed:', err); process.exit(1); });
