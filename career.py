from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class MatchProfile:
    subjects: List[str]
    environments: List[str]
    strengths: List[str]
    motivations: List[str]
    education_levels: List[str]
    personalities: List[str]

@dataclass
class Career:
    id: str
    title: str
    category: str
    description: str
    salary: str
    education: str
    skills: List[str]
    next_steps: List[str]
    icon: str
    match_profile: MatchProfile

CAREERS: List[Career] = [
    Career(
        id="software-engineer",
        title="Software Engineer",
        category="Technology",
        description="Design, develop, and maintain software systems and applications that power our digital world.",
        salary="$90k - $160k+",
        education="Bachelor's Degree or Bootcamp",
        skills=["Programming", "Problem Solving", "System Design", "Logic"],
        next_steps=[
            "Learn a core language like Python or JavaScript",
            "Build a portfolio of small projects",
            "Contribute to open-source software",
            "Consider a computer science degree or coding bootcamp",
        ],
        icon="💻",
        match_profile=MatchProfile(
            subjects=["Technology", "Science & Research"],
            environments=["Remote/Home", "Office/Corporate", "Flexible/Hybrid"],
            strengths=["Problem Solving", "Analytical Thinking", "Attention to Detail"],
            motivations=["Solving hard problems", "Building things", "Learning constantly", "Making money"],
            education_levels=["Bachelor's Degree", "Trade/Vocational"],
            personalities=["Independent Worker", "Adaptable/Flexible"],
        ),
    ),
    Career(
        id="ux-designer",
        title="UX/UI Designer",
        category="Arts & Design",
        description="Create intuitive, user-friendly, and visually appealing digital experiences for web and mobile apps.",
        salary="$75k - $130k+",
        education="Bachelor's Degree or specialized training",
        skills=["Empathy", "Visual Design", "User Testing", "Prototyping"],
        next_steps=[
            "Learn design tools like Figma or Adobe XD",
            "Study human-computer interaction principles",
            "Redesign an existing app for practice",
            "Build a visual portfolio",
        ],
        icon="🎨",
        match_profile=MatchProfile(
            subjects=["Arts & Design", "Technology"],
            environments=["Creative Studio", "Remote/Home", "Flexible/Hybrid"],
            strengths=["Creativity", "Empathy", "Problem Solving"],
            motivations=["Creative expression", "Helping others", "Building things"],
            education_levels=["Bachelor's Degree", "Trade/Vocational"],
            personalities=["Detail-Oriented", "Team Player"],
        ),
    ),
    Career(
        id="data-analyst",
        title="Data Analyst",
        category="Business & Finance",
        description="Translate complex numbers and data into understandable stories that help businesses make better decisions.",
        salary="$65k - $110k+",
        education="Bachelor's Degree",
        skills=["Statistics", "SQL", "Data Visualization", "Critical Thinking"],
        next_steps=[
            "Learn Excel and basic SQL",
            "Practice data visualization with tools like Tableau",
            "Take a course in statistics",
            "Analyze public datasets on Kaggle",
        ],
        icon="📊",
        match_profile=MatchProfile(
            subjects=["Business & Finance", "Technology", "Science & Research"],
            environments=["Office/Corporate", "Remote/Home"],
            strengths=["Analytical Thinking", "Attention to Detail", "Problem Solving"],
            motivations=["Solving hard problems", "Making an impact", "Learning constantly"],
            education_levels=["Bachelor's Degree", "Master's or higher"],
            personalities=["Detail-Oriented", "Independent Worker"],
        ),
    ),
    Career(
        id="nurse-practitioner",
        title="Nurse Practitioner",
        category="Healthcare",
        description="Provide advanced nursing care, diagnose illnesses, and prescribe medication in various clinical settings.",
        salary="$100k - $140k+",
        education="Master's Degree",
        skills=["Clinical Care", "Compassion", "Stamina", "Communication"],
        next_steps=[
            "Earn a Bachelor of Science in Nursing (BSN)",
            "Pass the NCLEX-RN exam",
            "Gain clinical experience as an RN",
            "Complete an MSN or DNP program",
        ],
        icon="🩺",
        match_profile=MatchProfile(
            subjects=["Healthcare", "Science & Research"],
            environments=["Hospital/Lab", "Outdoors/Field"],
            strengths=["Empathy", "Communication", "Attention to Detail", "Physical Dexterity"],
            motivations=["Helping others", "Making an impact"],
            education_levels=["Master's or higher"],
            personalities=["Team Player", "Adaptable/Flexible", "Leader"],
        ),
    ),
    Career(
        id="teacher",
        title="Educator / Teacher",
        category="Education",
        description="Inspire and shape the minds of the next generation through structured curriculum and mentorship.",
        salary="$50k - $85k+",
        education="Bachelor's Degree + Teaching Certification",
        skills=["Patience", "Public Speaking", "Planning", "Empathy"],
        next_steps=[
            "Choose a specialty subject or age group",
            "Earn a Bachelor's degree in Education or a specific field",
            "Complete student teaching hours",
            "Obtain state teaching certification",
        ],
        icon="📚",
        match_profile=MatchProfile(
            subjects=["Education", "Social Work", "Arts & Design"],
            environments=["Office/Corporate", "Outdoors/Field"],
            strengths=["Communication", "Empathy", "Leadership", "Creativity"],
            motivations=["Helping others", "Making an impact", "Learning constantly"],
            education_levels=["Bachelor's Degree", "Master's or higher"],
            personalities=["Leader", "Team Player", "Adaptable/Flexible"],
        ),
    ),
    Career(
        id="environmental-scientist",
        title="Environmental Scientist",
        category="Science & Research",
        description="Study the environment and discover solutions to environmental problems like pollution and climate change.",
        salary="$60k - $105k+",
        education="Bachelor's or Master's Degree",
        skills=["Research", "Data Analysis", "Field Work", "Scientific Method"],
        next_steps=[
            "Study biology, chemistry, and earth sciences",
            "Volunteer with conservation organizations",
            "Pursue a degree in environmental science",
            "Seek field research internships",
        ],
        icon="🌿",
        match_profile=MatchProfile(
            subjects=["Science & Research", "Engineering"],
            environments=["Outdoors/Field", "Hospital/Lab", "Flexible/Hybrid"],
            strengths=["Analytical Thinking", "Problem Solving", "Attention to Detail"],
            motivations=["Making an impact", "Solving hard problems", "Learning constantly"],
            education_levels=["Bachelor's Degree", "Master's or higher"],
            personalities=["Independent Worker", "Adaptable/Flexible"],
        ),
    ),
    Career(
        id="electrician",
        title="Master Electrician",
        category="Engineering & Trades",
        description="Install, maintain, and repair electrical power, communications, lighting, and control systems.",
        salary="$55k - $95k+",
        education="Trade/Vocational or Apprenticeship",
        skills=["Technical Skills", "Safety Focus", "Physical Dexterity", "Troubleshooting"],
        next_steps=[
            "Complete a high school diploma",
            "Enroll in a technical school program",
            "Apply for an electrician apprenticeship",
            "Obtain required state licensing",
        ],
        icon="⚡",
        match_profile=MatchProfile(
            subjects=["Engineering", "Technology"],
            environments=["Outdoors/Field", "Flexible/Hybrid"],
            strengths=["Problem Solving", "Physical Dexterity", "Attention to Detail"],
            motivations=["Building things", "Making money", "Solving hard problems"],
            education_levels=["Trade/Vocational", "High School only"],
            personalities=["Independent Worker", "Detail-Oriented"],
        ),
    ),
    Career(
        id="social-worker",
        title="Clinical Social Worker",
        category="Social Work",
        description="Help people cope with challenges in their lives, diagnosing and treating mental, behavioral, and emotional issues.",
        salary="$50k - $85k+",
        education="Master's Degree (MSW)",
        skills=["Active Listening", "Empathy", "Crisis Intervention", "Advocacy"],
        next_steps=[
            "Volunteer at community outreach programs",
            "Earn a Bachelor's in Social Work (BSW)",
            "Pursue a Master's degree (MSW)",
            "Complete clinical hours for licensure",
        ],
        icon="🤝",
        match_profile=MatchProfile(
            subjects=["Social Work", "Healthcare"],
            environments=["Office/Corporate", "Hospital/Lab", "Flexible/Hybrid"],
            strengths=["Empathy", "Communication", "Problem Solving"],
            motivations=["Helping others", "Making an impact"],
            education_levels=["Bachelor's Degree", "Master's or higher"],
            personalities=["Team Player", "Adaptable/Flexible"],
        ),
    ),
    Career(
        id="marketing-manager",
        title="Marketing Manager",
        category="Business & Finance",
        description="Develop strategies to promote products or services, analyzing market trends and overseeing creative campaigns.",
        salary="$85k - $150k+",
        education="Bachelor's Degree",
        skills=["Strategy", "Communication", "Analytics", "Creativity"],
        next_steps=[
            "Learn basics of digital marketing and SEO",
            "Study consumer psychology",
            "Take courses in business or communications",
            "Gain experience managing social media accounts",
        ],
        icon="📣",
        match_profile=MatchProfile(
            subjects=["Business & Finance", "Arts & Design"],
            environments=["Office/Corporate", "Remote/Home"],
            strengths=["Communication", "Creativity", "Leadership"],
            motivations=["Making an impact", "Making money", "Creative expression"],
            education_levels=["Bachelor's Degree"],
            personalities=["Leader", "Team Player"],
        ),
    ),
    Career(
        id="video-editor",
        title="Video Editor / Producer",
        category="Arts & Design",
        description="Manipulate and arrange video shots, audio, and graphics to create compelling visual stories for various media.",
        salary="$50k - $90k+",
        education="Associate Degree or Self-Taught",
        skills=["Visual Storytelling", "Software Mastery", "Timing", "Creativity"],
        next_steps=[
            "Learn Premiere Pro, Final Cut, or DaVinci Resolve",
            "Offer to edit videos for local organizations",
            "Create a demo reel of your best work",
            "Study pacing and narrative structure",
        ],
        icon="🎬",
        match_profile=MatchProfile(
            subjects=["Arts & Design", "Technology"],
            environments=["Creative Studio", "Remote/Home"],
            strengths=["Creativity", "Attention to Detail", "Analytical Thinking"],
            motivations=["Creative expression", "Building things"],
            education_levels=["Trade/Vocational", "Associate Degree", "Bachelor's Degree"],
            personalities=["Independent Worker", "Detail-Oriented"],
        ),
    ),
    Career(
        id="mechanical-engineer",
        title="Mechanical Engineer",
        category="Engineering",
        description="Design, develop, build, and test mechanical and thermal sensors and devices.",
        salary="$75k - $120k+",
        education="Bachelor's Degree",
        skills=["Math", "Physics", "CAD Software", "Problem Solving"],
        next_steps=[
            "Excel in advanced math and physics",
            "Learn CAD (Computer-Aided Design) software",
            "Participate in robotics clubs",
            "Pursue an ABET-accredited engineering degree",
        ],
        icon="🔧",
        match_profile=MatchProfile(
            subjects=["Engineering", "Science & Research"],
            environments=["Office/Corporate", "Outdoors/Field", "Hospital/Lab"],
            strengths=["Analytical Thinking", "Problem Solving", "Attention to Detail"],
            motivations=["Building things", "Solving hard problems"],
            education_levels=["Bachelor's Degree", "Master's or higher"],
            personalities=["Detail-Oriented", "Independent Worker"],
        ),
    ),
    Career(
        id="financial-advisor",
        title="Financial Advisor",
        category="Business & Finance",
        description="Help individuals manage their finances by providing advice on investments, insurance, mortgages, and retirement.",
        salary="$70k - $150k+",
        education="Bachelor's Degree",
        skills=["Finance", "Interpersonal Skills", "Sales", "Analysis"],
        next_steps=[
            "Study finance and economics",
            "Develop strong interpersonal skills",
            "Prepare for licensing exams (Series 7, 65)",
            "Consider pursuing CFP certification",
        ],
        icon="💰",
        match_profile=MatchProfile(
            subjects=["Business & Finance"],
            environments=["Office/Corporate", "Flexible/Hybrid"],
            strengths=["Analytical Thinking", "Communication", "Problem Solving"],
            motivations=["Helping others", "Making money"],
            education_levels=["Bachelor's Degree"],
            personalities=["Leader", "Independent Worker"],
        ),
    ),
]

CATEGORIES = sorted(set(c.category for c in CAREERS))
