const PortfolioProjects = () => {
  const projects = [
    {
      title: 'gauraaj.org — E-Commerce Platform',
      tech: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Redis', 'AWS S3', 'Shiprocket'],
      description:
        'Full-stack e-commerce platform built from scratch for handmade and hand-grown organic products (e.g., sattu powder). Covers product catalog, cart, checkout, and order management. Integrated Shiprocket API for automated order logistics and real-time shipment tracking, used AWS S3 for scalable media storage, and Redis for caching to improve page load performance.',
      accent: 'var(--rose-deep)',
      link: 'https://gauraaj.org',
      linkLabel: 'gauraaj.org',
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      title: 'Aym Yoga School — Yoga School Website',
      tech: ['Next.js', 'Bootstrap', 'MongoDB', 'Express', 'Multer', 'Cloudinary'],
      description:
        'Full-stack platform for a Rishikesh-based yoga school to showcase YTT courses, batches, and schedules. Built dynamic course-listing and CMS features so course details, pricing, and batch info can be updated without code changes. Media handled via Cloudinary with structured MongoDB schemas for course, batch, and enquiry data.',
      accent: 'var(--moss, var(--rose-deep))',
      link: 'https://aymyogaschool.com',
      linkLabel: 'aymyogaschool.com',
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20 M2 12h20" />
        </svg>
      ),
    },
    // {
    //   title: 'Erika Henna Herbal — Herbal & Cosmetic E-Commerce',
    //   tech: ['React.js', 'Tailwind CSS', 'Express', 'MongoDB', 'Multer', 'Cloudinary', 'Shiprocket'],
    //   description:
    //     'Full-stack e-commerce site for a herbal and cosmetic brand selling lotions, shampoos, and mehani cones. Built REST APIs with Express for product catalog, cart, and order management on a MongoDB data layer. Integrated Shiprocket for delivery management and Cloudinary for optimized product image handling.',
    //   accent: 'var(--mustard)',
    //   link: 'https://erikahennaherbal.com',
    //   linkLabel: 'erikahennaherbal.com',
    //   icon: (
    //     <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    //       <path d="M12 2 C 6 8, 6 16, 12 22 C 18 16, 18 8, 12 2 Z" />
    //       <path d="M12 2 V 22" />
    //     </svg>
    //   ),
    // },
    // {
    //   title: 'Indian Yoga Association — Association Website',
    //   tech: ['Next.js', 'Bootstrap', 'MongoDB', 'Express', 'Multer', 'Cloudinary'],
    //   description:
    //     'Full-stack website for a Rishikesh-based yoga association offering teacher training programs to a global audience. Adapted the Next.js and Express architecture from prior projects, with Cloudinary-based media management and Multer uploads. Implemented program/course listing pages and a content workflow for schedules and announcements.',
    //   accent: 'var(--sky)',
    //   link: '#',
    //   linkLabel: 'view site',
    //   icon: (
    //     <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    //       <path d="M12 2 L 4 7 V 13 C 4 18, 8 21, 12 22 C 16 21, 20 18, 20 13 V 7 Z" />
    //       <polyline points="9 12 11 14 15 10" />
    //     </svg>
    //   ),
    // },
    {
      title: 'Burra Bungalow — Homestay Villa Showcase',
      tech: ['React.js', 'Tailwind CSS'],
      description:
        'Static, responsive frontend for a homestay villa in Mussoorie, focused on showcasing property photos, amenities, and booking contact details. Built a mobile-first, component-based layout for fast load times and clean visual presentation.',
      accent: 'var(--rose)',
      link: 'https://burrabungalow.com',
      linkLabel: 'burrabungalow.com',
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 9 L 12 2 L 21 9 V 21 H 3 Z" />
          <path d="M9 21 V 12 H 15 V 21" />
        </svg>
      ),
    },
  ];

  return (
    <section id="projects" style={{ padding: '60px 0' }}>
      <SectionHeader
        eyebrow="what i've built"
        title="projects"
        kicker="featured work"
      />

      <style>{`
        .project-pin-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .project-pin-card:hover {
          transform: translateY(-6px) rotate(0deg) !important;
          box-shadow: 6px 10px 0 rgba(0,0,0,0.08);
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: "'Kalam', cursive";
          font-size: 15px;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1.5px dashed var(--ink-soft);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .project-link:hover {
          color: var(--rose-deep);
          border-color: var(--rose-deep);
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 40,
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-pin-card"
            style={{
              position: 'relative',
              background: 'var(--paper, #fffdf8)',
              border: '2px solid var(--ink)',
              borderRadius: 4,
              padding: '32px 28px 28px',
              transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
              boxShadow: '3px 5px 0 rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Pushpin */}
            <div
              style={{
                position: 'absolute',
                top: -14,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: project.accent,
                border: '2px solid var(--ink)',
                boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.15)',
              }}
            />

            {/* Icon badge */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: project.accent,
                border: '2px solid var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 18,
              }}
            >
              {project.icon}
            </div>

            <h3
              className="marker"
              style={{
                fontSize: 26,
                color: 'var(--ink)',
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>

            <p
              className="hand"
              style={{
                fontSize: 18,
                color: 'var(--ink-soft)',
                lineHeight: 1.7,
                marginBottom: 20,
                paddingBottom: 18,
                borderBottom: '1.5px dashed var(--ink)',
                flex: 1,
              }}
            >
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '5px 12px',
                    background: 'transparent',
                    color: 'var(--ink)',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Kalam', cursive",
                    border: '1.5px dashed var(--ink)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project link */}
            <a
              href={project.link}
              target={project.link.startsWith('http') ? '_blank' : undefined}
              rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="project-link no-drag"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {project.linkLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { PortfolioProjects });