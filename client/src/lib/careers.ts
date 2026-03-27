export interface Career {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  salary: string;
  education: string;
  skills: string[];
  nextSteps: string[];
  subjectMatch: string[];
  environmentMatch: string[];
  strengthsMatch: string[];
  motivationMatch: string[];
  personalityMatch: string[];
}

export const CAREERS: Career[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    icon: "💻",
    category: "Technology",
    description: "Design, develop and maintain software systems, applications and platforms that power the modern world.",
    salary: "$100k – $180k",
    education: "Bachelor's Degree",
    skills: ["Programming", "Problem Solving", "System Design", "Debugging", "Algorithms"],
    nextSteps: [
      "Learn a programming language (Python, JavaScript, Java)",
      "Build personal projects and a GitHub portfolio",
      "Pursue a CS degree or coding bootcamp",
      "Apply for internships and entry-level positions",
      "Contribute to open-source projects"
    ],
    subjectMatch: ["Technology", "Science & Research", "Engineering"],
    environmentMatch: ["Remote/Home", "Office/Corporate", "Flexible/Hybrid"],
    strengthsMatch: ["Problem Solving", "Analytical Thinking", "Attention to Detail"],
    motivationMatch: ["Solving hard problems", "Building things", "Learning constantly"],
    personalityMatch: ["Independent Worker", "Detail-Oriented", "Team Player"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "📊",
    category: "Technology",
    description: "Extract insights from complex data using statistical models, machine learning, and visualization to guide business decisions.",
    salary: "$95k – $165k",
    education: "Master's or higher",
    skills: ["Python/R", "Statistics", "Machine Learning", "Data Visualization", "SQL"],
    nextSteps: [
      "Learn Python and statistics fundamentals",
      "Complete data science courses (Coursera, edX)",
      "Practice on Kaggle datasets",
      "Build a portfolio of analysis projects",
      "Pursue a graduate degree in data science or statistics"
    ],
    subjectMatch: ["Technology", "Science & Research", "Business & Finance"],
    environmentMatch: ["Remote/Home", "Office/Corporate", "Flexible/Hybrid"],
    strengthsMatch: ["Analytical Thinking", "Problem Solving", "Attention to Detail"],
    motivationMatch: ["Solving hard problems", "Learning constantly", "Making an impact"],
    personalityMatch: ["Independent Worker", "Detail-Oriented", "Adaptable/Flexible"]
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    icon: "🎨",
    category: "Arts & Design",
    description: "Create intuitive, beautiful digital experiences by researching users and designing interfaces that are both functional and delightful.",
    salary: "$75k – $140k",
    education: "Bachelor's Degree",
    skills: ["User Research", "Wireframing", "Figma", "Prototyping", "Visual Design"],
    nextSteps: [
      "Learn design tools (Figma, Adobe XD)",
      "Study human-computer interaction principles",
      "Build a portfolio of design projects",
      "Conduct usability studies",
      "Apply for junior UX roles or internships"
    ],
    subjectMatch: ["Arts & Design", "Technology", "Social Work"],
    environmentMatch: ["Office/Corporate", "Creative Studio", "Remote/Home", "Flexible/Hybrid"],
    strengthsMatch: ["Creativity", "Empathy", "Attention to Detail"],
    motivationMatch: ["Creative expression", "Helping others", "Building things"],
    personalityMatch: ["Team Player", "Adaptable/Flexible", "Detail-Oriented"]
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    icon: "✏️",
    category: "Arts & Design",
    description: "Communicate ideas visually through logos, illustrations, layouts, and branding for digital and print media.",
    salary: "$45k – $90k",
    education: "Associate Degree",
    skills: ["Adobe Creative Suite", "Typography", "Branding", "Illustration", "Color Theory"],
    nextSteps: [
      "Master Adobe Photoshop, Illustrator, InDesign",
      "Build a diverse design portfolio",
      "Freelance on Fiverr or Upwork",
      "Pursue a design degree or certificate",
      "Network with creative professionals"
    ],
    subjectMatch: ["Arts & Design"],
    environmentMatch: ["Creative Studio", "Remote/Home", "Flexible/Hybrid"],
    strengthsMatch: ["Creativity", "Attention to Detail"],
    motivationMatch: ["Creative expression", "Building things"],
    personalityMatch: ["Independent Worker", "Adaptable/Flexible"]
  },
  {
    id: "doctor",
    title: "Medical Doctor",
    icon: "🏥",
    category: "Healthcare",
    description: "Diagnose and treat illnesses, injuries, and conditions to improve and maintain patient health across all ages.",
    salary: "$200k – $400k+",
    education: "Master's or higher",
    skills: ["Clinical Diagnosis", "Patient Care", "Medical Knowledge", "Communication", "Decision Making"],
    nextSteps: [
      "Excel in science subjects in high school",
      "Complete a pre-med undergraduate degree",
      "Score well on the MCAT",
      "Attend medical school (4 years)",
      "Complete residency program (3–7 years)"
    ],
    subjectMatch: ["Healthcare", "Science & Research"],
    environmentMatch: ["Hospital/Lab"],
    strengthsMatch: ["Problem Solving", "Empathy", "Attention to Detail"],
    motivationMatch: ["Helping others", "Making an impact", "Learning constantly"],
    personalityMatch: ["Leader", "Detail-Oriented", "Adaptable/Flexible"]
  },
  {
    id: "nurse",
    title: "Registered Nurse",
    icon: "💊",
    category: "Healthcare",
    description: "Provide direct patient care, administer medications, and coordinate with physicians to ensure patient wellbeing and recovery.",
    salary: "$60k – $110k",
    education: "Bachelor's Degree",
    skills: ["Patient Care", "Medical Procedures", "Communication", "Critical Thinking", "Compassion"],
    nextSteps: [
      "Complete a nursing degree (BSN preferred)",
      "Pass the NCLEX-RN licensing exam",
      "Gain clinical experience during education",
      "Choose a specialization (ER, pediatrics, etc.)",
      "Pursue advanced nursing certifications"
    ],
    subjectMatch: ["Healthcare", "Social Work"],
    environmentMatch: ["Hospital/Lab"],
    strengthsMatch: ["Empathy", "Attention to Detail", "Communication"],
    motivationMatch: ["Helping others", "Making an impact"],
    personalityMatch: ["Team Player", "Adaptable/Flexible", "Detail-Oriented"]
  },
  {
    id: "teacher",
    title: "Teacher / Educator",
    icon: "📚",
    category: "Education",
    description: "Inspire and educate students by creating engaging lessons that build knowledge, critical thinking, and lifelong learning habits.",
    salary: "$40k – $75k",
    education: "Bachelor's Degree",
    skills: ["Communication", "Curriculum Design", "Patience", "Classroom Management", "Subject Expertise"],
    nextSteps: [
      "Choose a subject area or grade level",
      "Complete a teaching degree or education major",
      "Earn a teaching license/certification",
      "Complete student teaching practicum",
      "Apply for teaching positions in schools"
    ],
    subjectMatch: ["Education", "Social Work", "Science & Research"],
    environmentMatch: ["Office/Corporate", "Flexible/Hybrid"],
    strengthsMatch: ["Communication", "Empathy", "Leadership"],
    motivationMatch: ["Helping others", "Making an impact", "Learning constantly"],
    personalityMatch: ["Leader", "Team Player", "Adaptable/Flexible"]
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    icon: "💰",
    category: "Business & Finance",
    description: "Analyze financial data, market trends, and investment opportunities to guide business decisions and maximize returns.",
    salary: "$65k – $130k",
    education: "Bachelor's Degree",
    skills: ["Excel/Financial Modeling", "Accounting", "Market Analysis", "Forecasting", "Reporting"],
    nextSteps: [
      "Study finance, accounting, or economics",
      "Learn Excel and financial modeling",
      "Pursue a CFA or CPA certification",
      "Intern at banks or investment firms",
      "Network through professional finance associations"
    ],
    subjectMatch: ["Business & Finance", "Science & Research"],
    environmentMatch: ["Office/Corporate", "Flexible/Hybrid"],
    strengthsMatch: ["Analytical Thinking", "Attention to Detail", "Problem Solving"],
    motivationMatch: ["Making money", "Solving hard problems", "Learning constantly"],
    personalityMatch: ["Detail-Oriented", "Independent Worker", "Adaptable/Flexible"]
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    icon: "🚀",
    category: "Business & Finance",
    description: "Build and lead your own business ventures, turning innovative ideas into products or services that create value.",
    salary: "Variable / Unlimited",
    education: "Any level",
    skills: ["Leadership", "Risk Management", "Networking", "Product Development", "Sales"],
    nextSteps: [
      "Identify a problem you're passionate about solving",
      "Research your target market thoroughly",
      "Build an MVP (minimum viable product)",
      "Seek mentors and join startup communities",
      "Apply for startup accelerators or funding"
    ],
    subjectMatch: ["Business & Finance", "Technology", "Arts & Design"],
    environmentMatch: ["Remote/Home", "Flexible/Hybrid", "Office/Corporate"],
    strengthsMatch: ["Leadership", "Problem Solving", "Creativity"],
    motivationMatch: ["Making money", "Building things", "Making an impact"],
    personalityMatch: ["Leader", "Adaptable/Flexible"]
  },
  {
    id: "psychologist",
    title: "Psychologist",
    icon: "🧠",
    category: "Healthcare",
    description: "Study human behavior and mental processes to help individuals overcome challenges, improve wellbeing, and achieve their goals.",
    salary: "$75k – $140k",
    education: "Master's or higher",
    skills: ["Active Listening", "Empathy", "Assessment", "Therapy Techniques", "Research"],
    nextSteps: [
      "Study psychology at the undergraduate level",
      "Pursue a master's or doctoral degree",
      "Complete supervised clinical hours",
      "Pass state licensing examinations",
      "Choose a specialization (clinical, counseling, forensic)"
    ],
    subjectMatch: ["Healthcare", "Social Work", "Science & Research"],
    environmentMatch: ["Office/Corporate", "Hospital/Lab", "Flexible/Hybrid"],
    strengthsMatch: ["Empathy", "Communication", "Analytical Thinking"],
    motivationMatch: ["Helping others", "Making an impact", "Learning constantly"],
    personalityMatch: ["Team Player", "Adaptable/Flexible", "Independent Worker"]
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    icon: "🏗️",
    category: "Engineering",
    description: "Design, plan, and oversee the construction of infrastructure like roads, bridges, buildings, and water systems.",
    salary: "$70k – $130k",
    education: "Bachelor's Degree",
    skills: ["AutoCAD", "Structural Analysis", "Project Management", "Mathematics", "Problem Solving"],
    nextSteps: [
      "Study civil engineering at university",
      "Complete internships with engineering firms",
      "Pass the Fundamentals of Engineering (FE) exam",
      "Gain experience towards Professional Engineer (PE) license",
      "Specialize in structural, environmental, or transportation"
    ],
    subjectMatch: ["Engineering", "Science & Research"],
    environmentMatch: ["Outdoors/Field", "Office/Corporate"],
    strengthsMatch: ["Problem Solving", "Analytical Thinking", "Attention to Detail"],
    motivationMatch: ["Building things", "Solving hard problems", "Making an impact"],
    personalityMatch: ["Detail-Oriented", "Team Player", "Leader"]
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    icon: "📣",
    category: "Business & Finance",
    description: "Develop and execute marketing strategies to build brand awareness, attract customers, and drive business growth.",
    salary: "$60k – $130k",
    education: "Bachelor's Degree",
    skills: ["Campaign Strategy", "Digital Marketing", "Analytics", "Content Creation", "Brand Management"],
    nextSteps: [
      "Study marketing, communications, or business",
      "Learn digital marketing (SEO, social media, email)",
      "Earn Google Analytics or HubSpot certifications",
      "Build a portfolio of marketing campaigns",
      "Start with coordinator/specialist roles"
    ],
    subjectMatch: ["Business & Finance", "Arts & Design", "Technology"],
    environmentMatch: ["Office/Corporate", "Remote/Home", "Flexible/Hybrid"],
    strengthsMatch: ["Creativity", "Communication", "Analytical Thinking"],
    motivationMatch: ["Creative expression", "Making money", "Making an impact"],
    personalityMatch: ["Leader", "Team Player", "Adaptable/Flexible"]
  },
  {
    id: "social-worker",
    title: "Social Worker",
    icon: "🤝",
    category: "Social Work",
    description: "Support vulnerable individuals and communities by connecting them with resources, advocacy, and counseling services.",
    salary: "$40k – $75k",
    education: "Bachelor's Degree",
    skills: ["Empathy", "Case Management", "Crisis Intervention", "Advocacy", "Communication"],
    nextSteps: [
      "Earn a Bachelor's or Master's in Social Work",
      "Complete supervised field placements",
      "Obtain state social work license (LCSW/LSW)",
      "Specialize (child welfare, mental health, medical)",
      "Join the National Association of Social Workers"
    ],
    subjectMatch: ["Social Work", "Education", "Healthcare"],
    environmentMatch: ["Office/Corporate", "Outdoors/Field", "Hospital/Lab"],
    strengthsMatch: ["Empathy", "Communication", "Leadership"],
    motivationMatch: ["Helping others", "Making an impact"],
    personalityMatch: ["Team Player", "Adaptable/Flexible"]
  },
  {
    id: "researcher",
    title: "Research Scientist",
    icon: "🔬",
    category: "Science & Research",
    description: "Conduct systematic investigations to expand scientific knowledge, develop new technologies, or solve complex real-world problems.",
    salary: "$65k – $140k",
    education: "Master's or higher",
    skills: ["Research Methodology", "Data Analysis", "Laboratory Techniques", "Scientific Writing", "Critical Thinking"],
    nextSteps: [
      "Excel in science and math subjects",
      "Pursue an undergraduate research degree",
      "Gain laboratory experience through internships",
      "Complete a graduate degree (MS or PhD)",
      "Publish research and build your academic profile"
    ],
    subjectMatch: ["Science & Research", "Technology", "Healthcare"],
    environmentMatch: ["Hospital/Lab", "Office/Corporate"],
    strengthsMatch: ["Analytical Thinking", "Attention to Detail", "Problem Solving"],
    motivationMatch: ["Learning constantly", "Solving hard problems", "Making an impact"],
    personalityMatch: ["Independent Worker", "Detail-Oriented"]
  },
  {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    category: "Engineering",
    description: "Install, maintain, and repair electrical systems in homes, businesses, and industrial facilities.",
    salary: "$50k – $100k",
    education: "Trade/Vocational",
    skills: ["Electrical Systems", "Blueprint Reading", "Troubleshooting", "Safety Protocols", "Physical Dexterity"],
    nextSteps: [
      "Complete an electrician vocational program",
      "Start an apprenticeship (4–5 years)",
      "Pass the journeyman electrician exam",
      "Gain experience in various electrical work",
      "Earn master electrician license"
    ],
    subjectMatch: ["Engineering", "Science & Research"],
    environmentMatch: ["Outdoors/Field", "Office/Corporate"],
    strengthsMatch: ["Physical Dexterity", "Problem Solving", "Attention to Detail"],
    motivationMatch: ["Building things", "Making money"],
    personalityMatch: ["Independent Worker", "Detail-Oriented", "Adaptable/Flexible"]
  },
  {
    id: "content-creator",
    title: "Content Creator",
    icon: "🎬",
    category: "Arts & Design",
    description: "Produce engaging videos, articles, podcasts, or social media content that entertains, educates, or inspires audiences online.",
    salary: "$30k – $200k+",
    education: "High School only",
    skills: ["Video Editing", "Storytelling", "Social Media", "Photography", "Audience Engagement"],
    nextSteps: [
      "Choose your niche and content format",
      "Learn video editing and production basics",
      "Start creating content consistently",
      "Grow your audience on one platform first",
      "Monetize through ads, sponsorships, or products"
    ],
    subjectMatch: ["Arts & Design", "Technology", "Education"],
    environmentMatch: ["Remote/Home", "Creative Studio", "Flexible/Hybrid"],
    strengthsMatch: ["Creativity", "Communication"],
    motivationMatch: ["Creative expression", "Making money"],
    personalityMatch: ["Independent Worker", "Adaptable/Flexible"]
  }
];

export const CATEGORIES = [...new Set(CAREERS.map(c => c.category))].sort();

export interface QuizAnswers {
  subjects: string | null;
  environment: string | null;
  strengths: string[];
  motivation: string | null;
  education: string | null;
  personality: string | null;
}

export interface CareerMatch {
  career: Career;
  score: number;
  percentage: number;
  matchReasons: string[];
}

export function calculateMatches(answers: QuizAnswers): CareerMatch[] {
  const results: CareerMatch[] = CAREERS.map(career => {
    let score = 0;
    const matchReasons: string[] = [];

    if (answers.subjects && career.subjectMatch.includes(answers.subjects)) {
      score += 30;
      matchReasons.push(`Aligns with your interest in ${answers.subjects}`);
    }

    if (answers.environment && career.environmentMatch.includes(answers.environment)) {
      score += 20;
      matchReasons.push(`Fits your preferred ${answers.environment} work environment`);
    }

    const strengthHits = answers.strengths.filter(s => career.strengthsMatch.includes(s));
    if (strengthHits.length > 0) {
      score += strengthHits.length * 15;
      matchReasons.push(`Uses your strength in ${strengthHits.slice(0, 2).join(" and ")}`);
    }

    if (answers.motivation && career.motivationMatch.includes(answers.motivation)) {
      score += 20;
      matchReasons.push(`Matches your motivation to "${answers.motivation.toLowerCase()}"`);
    }

    if (answers.education && career.education !== "") {
      const educationMap: Record<string, number> = {
        "High School only": 1,
        "Trade/Vocational": 2,
        "Associate Degree": 3,
        "Bachelor's Degree": 4,
        "Master's or higher": 5
      };
      const userEdu = educationMap[answers.education] || 0;
      const careerEdu = educationMap[career.education] || 0;
      if (userEdu >= careerEdu) {
        score += 10;
        if (userEdu === careerEdu) {
          matchReasons.push(`Matches your education level exactly`);
        }
      }
    }

    if (answers.personality && career.personalityMatch.includes(answers.personality)) {
      score += 15;
      matchReasons.push(`Suits your ${answers.personality.toLowerCase()} work style`);
    }

    const maxScore = 30 + 20 + 45 + 20 + 10 + 15;
    const percentage = Math.min(99, Math.round((score / maxScore) * 100));

    return {
      career,
      score,
      percentage,
      matchReasons: matchReasons.slice(0, 4)
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
