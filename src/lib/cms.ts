export interface Speaker {
  id: string;
  name: string;
  role: string;
  institution: string;
  bio: string;
  image: string;
  category: "Keynote" | "Panelist" | "Workshop Lead" | "Featured Research" | "Advisory Council" | "Research Lead";
  socials: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface WorkshopEvent {
  id: string;
  slug: string;
  title: string;
  category: "Keynote" | "Workshop" | "Panel Discussion" | "Research Pitch";
  date: string;
  time: string;
  venue: string;
  description: string;
  speakerIds: string[];
  capacity: number;
  registeredCount: number;
  tags: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: "Research" | "Academic Writing" | "Summit News" | "Innovation";
  image: string;
}

// 80+ speakers are referenced, so we populate key featured speakers representing high-quality profiles
export const speakersData: Speaker[] = [
  {
    id: "dr-arundhati-sen",
    name: "Dr. Arundhati Sen",
    role: "Director of Artificial Intelligence",
    institution: "Nexus Institute of Advanced Sciences",
    bio: "Dr. Sen is a pioneer in NLP and cognitive robotics with over 15 years of research experience. She leads the collaborative neural networks project at NARI.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    category: "Advisory Council",
    socials: {
      linkedin: "https://linkedin.com/in/arundhati-sen-nari",
      twitter: "https://twitter.com/arundhatisen",
      website: "https://nari.world/experts/arundhati-sen"
    }
  },
  {
    id: "prof-rajesh-mehta",
    name: "Prof. Rajesh Mehta",
    role: "Dean of Innovation & Incubation",
    institution: "Greater Noida Technology Forum",
    bio: "Prof. Mehta focuses on sustainable tech and university-industry integration. He has successfully incubated over 45 academic startups in the Knowledge Park corridor.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    category: "Research Lead",
    socials: {
      linkedin: "https://linkedin.com/in/rajeshmehta",
      website: "https://nari.world/experts/rajesh-mehta"
    }
  },
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Senior Research Fellow",
    institution: "Global Climate & Energy Lab",
    bio: "Dr. Jenkins specializes in computational chemistry for clean energy cells. Her research has been cited over 12,000 times, and she joins the Summit 2026 from Geneva.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    category: "Advisory Council",
    socials: {
      linkedin: "https://linkedin.com/in/sarahjenkins",
      twitter: "https://twitter.com/sjenkins_chem"
    }
  },
  {
    id: "aditya-verma",
    name: "Aditya Verma",
    role: "VP of Deep Tech Initiatives",
    institution: "Sovereign Labs India",
    bio: "Aditya leads advanced infrastructure research, bridging academic theory with scalable developer tooling. He is a primary advisor for the NARI E-Catalogue catalog listings.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    category: "Panelist",
    socials: {
      linkedin: "https://linkedin.com/in/adityaverma",
      twitter: "https://twitter.com/aditya_deeptech"
    }
  },
  {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    role: "Head of Bio-Medical Systems",
    institution: "Knowledge Park Research Center",
    bio: "Dr. Sharma researches high-fidelity medical signal processing and wearable biosensors. She is hosting the hands-on medical devices workshop at Summit 2026.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    category: "Research Lead",
    socials: {
      linkedin: "https://linkedin.com/in/priyasharma",
      website: "https://nari.world/experts/priya-sharma"
    }
  }
];

export const eventsData: WorkshopEvent[] = [
  {
    id: "summit-2026-keynote",
    slug: "summit-2026-keynote",
    title: "Opening Keynote: The Next Frontier in Academic-Industry Collaboration",
    category: "Keynote",
    date: "2026-10-14",
    time: "09:30 AM - 11:00 AM",
    venue: "Main Auditorium, Block A, Knowledge Park III",
    description: "Join us for the official commencement of NARI Summit 2026. This keynote brings together leaders from top universities and global R&D firms to establish a new roadmap for sustainable innovation pipelines.",
    speakerIds: ["dr-arundhati-sen", "dr-sarah-jenkins"],
    capacity: 500,
    registeredCount: 412,
    tags: ["Collaboration", "AI", "Clean Energy", "Keynote"]
  },
  {
    id: "academic-writing-masterclass",
    slug: "academic-writing-masterclass",
    title: "Hands-on Masterclass: Writing High-Impact Research Papers",
    category: "Workshop",
    date: "2026-10-14",
    time: "01:30 PM - 04:30 PM",
    venue: "Seminar Room 204, Tech Wing, Knowledge Park III",
    description: "An intensive, practical workshop focused on structuring manuscripts, crafting robust research methodologies, navigating peer review processes, and getting published in prestigious scientific journals.",
    speakerIds: ["prof-rajesh-mehta"],
    capacity: 60,
    registeredCount: 58,
    tags: ["Academic Writing", "Methodology", "Publishing"]
  },
  {
    id: "deep-tech-commercialization",
    slug: "deep-tech-commercialization",
    title: "Panel: Patenting & Commercializing University Research Projects",
    category: "Panel Discussion",
    date: "2026-10-15",
    time: "10:00 AM - 12:30 PM",
    venue: "Innovation Center Hall, Knowledge Park III",
    description: "An open debate focusing on tech transfer, patent search strategies, drafting claims, licensing models, and scaling university lab prototypes into commercial deep-tech ventures.",
    speakerIds: ["prof-rajesh-mehta", "aditya-verma"],
    capacity: 120,
    registeredCount: 94,
    tags: ["IPR", "Patents", "Commercialization", "Startups"]
  },
  {
    id: "bio-sensors-lab",
    slug: "bio-sensors-lab",
    title: "Workshop: Building Low-Cost Smart Bio-Telemetry Wearables",
    category: "Workshop",
    date: "2026-10-15",
    time: "02:00 PM - 05:00 PM",
    venue: "Bio-Electronics Lab, Block C, Knowledge Park III",
    description: "Learn how to prototype biosensors using modern open hardware platforms. Participants will build functioning temperature and heart rate monitoring sensors during the session.",
    speakerIds: ["dr-priya-sharma"],
    capacity: 40,
    registeredCount: 39,
    tags: ["Bio-Tech", "IoT", "Hardware Prototyping"]
  }
];

export const blogsData: BlogPost[] = [
  {
    id: "academic-writing-guide",
    slug: "how-to-write-high-impact-abstract",
    title: "How to Write a High-Impact Abstract for Scopus Indexed Journals",
    excerpt: "An abstract is your paper's elevator pitch. Learn the exact 5-sentence formula that will capture reviewers' attention instantly.",
    content: `<p>A high-impact abstract is the single most crucial factor in whether your research paper gets read, let alone cited. Most researchers make the mistake of treating the abstract as an afterthought. Instead, you should craft it like a highly polished elevator pitch.</p>
    
    <h3>The 5-Sentence Formula</h3>
    <ol>
      <li><strong>The Context:</strong> What is the broad field and why does it matter?</li>
      <li><strong>The Gap:</strong> What is the specific problem that remains unsolved in existing literature?</li>
      <li><strong>The Contribution:</strong> What did you do or build to address this specific gap?</li>
      <li><strong>The Methodology:</strong> Briefly explain how you executed your experiment or research design.</li>
      <li><strong>The Impact:</strong> What do your findings mean for the future of this academic field?</li>
    </ol>

    <p>By keeping your abstract between 150 and 250 words and strictly following this structure, you assure editorial review boards that your paper is focused, structured, and statistically sound.</p>`,
    author: {
      name: "Prof. Rajesh Mehta",
      role: "Dean of Innovation",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=40"
    },
    date: "2026-05-18",
    readTime: "5 min read",
    category: "Academic Writing",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "nari-summit-2026-announcement",
    slug: "nari-summit-2026-key-themes",
    title: "NARI Summit 2026 Key Themes Announced: Bridging Academic Gaps",
    excerpt: "NARI Nexus announces the official theme roadmap for the 2026 Summit at Knowledge Park III, focusing on green tech, AI ethics, and commercial translation platforms.",
    content: `<p>The Executive Committee of NARI (Nexus for Academic Research & Innovation) has officially finalized the structural track lines for our upcoming flagship event, the NARI Summit 2026.</p>
    
    <h3>Three Major Core Tracks</h3>
    <ul>
      <li><strong>Track A: Green Tech & Sustainability</strong> - Addressing low-carbon battery technologies, microgrids, and decentralized water management solutions suitable for smart urban ecosystems.</li>
      <li><strong>Track B: Conversational AI and Ethical Robotics</strong> - A deep dive into regulatory sandboxes, local LLMs for Indian languages, and privacy-preserving federated learning systems.</li>
      <li><strong>Track C: Incubation & Venture Architecture</strong> - Connecting institutional researchers with global venture capital, intellectual property specialists, and regulatory pathways for early-stage deep-tech startups.</li>
    </ul>

    <p>With 80+ confirmed speakers from 14 countries, this summit promises to be the most comprehensive academic exposition in North India.</p>`,
    author: {
      name: "Dr. Arundhati Sen",
      role: "AI Lead",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=40"
    },
    date: "2026-05-12",
    readTime: "7 min read",
    category: "Summit News",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "deep-tech-incubation-trends",
    slug: "deep-tech-incubation-in-universities",
    title: "Deep Tech Incubation: Translating Institutional Research into Products",
    excerpt: "Why universities must evolve from simple publishing mills into advanced incubation ecosystems, and how NARI Nexus is facilitating this shift.",
    content: `<p>For decades, institutional success has been measured solely by the volume of publications and index citation metrics. However, in the modern landscape, the translation of intellectual capital into real-world impact is of paramount importance.</p>

    <h3>The 'Valley of Death' in Research</h3>
    <p>Most university research papers end up archived on academic shelves because of a fundamental translation gap. There is a lack of alignment between engineering prototypes and commercial product requirements. The NARI Nexus program targets this gap directly by offering research groups:</p>
    <ul>
      <li>Prototype seed-funding grants</li>
      <li>Dedicated legal counsel for patent drafting</li>
      <li>Venture capital pitch coaching</li>
      <li>Industrial sandboxes for test deployments</li>
    </ul>
    
    <p>By empowering academic researchers with commercial skillsets, we accelerate the birth of life-saving medical devices, cleaner energy storage, and more robust computing networks.</p>`,
    author: {
      name: "Aditya Verma",
      role: "VP of Deep Tech Initiatives",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40"
    },
    date: "2026-04-29",
    readTime: "6 min read",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
  }
];

// Helper Query Functions
export function getSpeakers() {
  return speakersData;
}

export function getSpeakerById(id: string) {
  return speakersData.find(s => s.id === id);
}

export function getEvents() {
  return eventsData;
}

export function getEventBySlug(slug: string) {
  return eventsData.find(e => e.slug === slug);
}

export function getBlogs() {
  return blogsData;
}

export function getBlogBySlug(slug: string) {
  return blogsData.find(b => b.slug === slug);
}
