import {
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  LineChart,
  LucideIcon,
  Settings,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  content: {
    intro: string;
    listTitle?: string;
    points?: { title: string; desc: string }[];
    secondParagraph?: string;
    closing?: string;
  };
};

const services: Service[] = [
  {
    slug: "financial-industry-services",
    title: "Financial Industry Services",
    icon: LineChart,
    summary:
      "PT FAST Indo Talenta (FITALENTA) provides expert solutions for the financial industry, focusing on leadership, sales, business coaching, and HR strategies.",
    content: {
      intro:
        "At PT FAST Indo Talenta (FITALENTA), we empower clients in the financial industry by providing comprehensive, tailored services designed to elevate business performance and drive sustainable growth. Our expertise spans across multiple facets, ensuring that organizations can thrive in a competitive and ever-evolving financial landscape.",
      listTitle: "Our key services include:",
      points: [
        {
          title: "Leadership & Sales Empowerment",
          desc: "We provide training programs that enhance both the hard and soft skills of your workforce, from branch managers to sales staff, ensuring they meet and exceed organizational targets.",
        },
        {
          title: "Business Monitoring & Coaching",
          desc: "Our hands-on coaching and monitoring services are designed to support business leaders in maintaining discipline, creativity, and motivation across their teams, with regular reviews and tailored guidance.",
        },
        {
          title: "HR Strategy to Improve Productivity",
          desc: "We help you refine your HR processes through psychometric assessments, competency analysis, and tailored recruitment strategies to ensure the right talent is in the right position, enhancing overall organizational productivity.",
        },
        {
          title: "Culture & Business Transformation",
          desc: "FITALENTA assists in fostering a culture of innovation and entrepreneurship within your organization, driving long-term transformation through targeted programs that build both individual and team capabilities.",
        },
      ],
      closing:
        "With over 20 years of director’s experience in the financial sector, FITALENTA is dedicated to being a lifetime partner for companies aiming to achieve financial success through innovative training methods, strategic HR practices, and personalized business assistance. We focus on empowering people and businesses, driving growth and ensuring long-term success.",
    },
  },

  {
    slug: "human-capital-program",
    title: "Human Capital Program",
    icon: Users,
    summary:
      "PT FAST Indo Talenta (FITALENTA) connects businesses with top talent through curated, competency-based recruitment solutions. Streamline your hiring p…",
    content: {
      intro:
        "At PT FAST Indo Talenta (FITALENTA), we are dedicated to helping companies find, attract, and secure the best talent through our comprehensive Human Capital Recruitment services. With a focus on competency-based recruitment, we offer customized solutions to match your company’s unique needs, whether it's filling permanent positions, internships, or outsourcing roles. Our recruitment approach is designed to streamline the hiring process, making it more efficient and effective.",
      listTitle: "Key Features of Our Recruitment Services",
      points: [
        {
          title: "Talent Pool Access",
          desc: "We maintain a web-based talent database compiled through collaborations with leading universities, training institutions, and labor departments. This platform is designed to give your HR department access to a curated list of top candidates, simplifying the search for skilled individuals to meet your company's specific needs. Each candidate is thoroughly assessed and rated based on competencies, ensuring that only qualified talent is presented for consideration.",
        },
        {
          title: "Customized Recruitment Schemes",
          desc: "FITALENTA works closely with your team to understand your business objectives and talent requirements. We then curate a pool of candidates specifically tailored to meet these needs. Our process includes company needs analysis, talent curation, and collaborative selection, where companies actively participate in interviews, tests, and assessments to ensure the best fit for their roles.",
        },
        {
          title: "Flexible Recruitment Models",
          desc: "We offer multiple recruitment schemes to meet different needs, including.",
        },
        {
          title: "Internship Programs",
          desc: "For companies seeking fresh talent for short-term projects or training.",
        },
        {
          title: "Outsourcing Services",
          desc: "Ideal for businesses looking to outsource specific tasks or functions.",
        },
        {
          title: "Headhunting",
          desc: "For companies in need of highly skilled professionals or executives.",
        },
        {
          title: "End-to-End Support",
          desc: "From analyzing your company's needs to the final hiring and contract agreements, our team is with you every step of the way. We help draft contracts, assist in negotiations, and ensure that the hiring process is aligned with your business goals.",
        },
        {
          title: "Collaborative International Recruitment",
          desc: "In addition to domestic recruitment, we have experience in international talent placement. We work with international partners to send skilled workers abroad, including collaborations in countries like Japan, Taiwan, Australia, and Kyrgyzstan. Through partnerships with language and training centers, we ensure that your talent is fully prepared for international roles.",
        },
        {
          title: "Success Stories",
          desc: "Our successful collaborations with institutions such as Pribadi School, Labschool UPI, and Wakaf Salman ITB showcase our ability to provide tailored recruitment solutions across various industries, ensuring long-term satisfaction for both companies and candidates.",
        },
      ],
      secondParagraph:
        "In addition to recruitment, FITALENTA offers job preparation training and competency enhancement programs that are standardized by the National Professional Certification Agency (BNSP). Our training services are easily accessible and designed to elevate the skills and qualifications of your workforce. We provide a wide range of training schemes, developed in collaboration with more than three professional BNSP certification and training institutions. These partnerships ensure that our programs are up-to-date, relevant, and effective in addressing industry needs. Below is a sample of the certifications FITALENTA provides.",
      closing:
        "FITALENTA ensures that your company gets access to a reliable and well-vetted workforce that drives business growth. Whether you are looking to fill entry-level positions or find seasoned executives, our recruitment services provide the expertise and resources you need to succeed in today’s competitive market.",
    },
  },

  {
    slug: "next-level-edventures-program",
    title: "Next Level EduVentures Program",
    icon: TrendingUp,
    summary:
      "FITALENTA supports students and professionals through educational development, international career preparation, admissions guidance, language training, and work and study abroad opportunities.",
    content: {
      intro:
        "At PT FAST Indo Talenta (FITALENTA), we are committed to enhancing the quality of education for students and professionals alike through our Next Level EduVentures Program. This initiative is designed to support educational development by offering a wide range of services that cater to the evolving needs of learners at every stage, from admissions guidance to international work and study consultations.",
      listTitle: "Our EduVentures Services",
      points: [
        {
          title: "International Career Development and Recruitment Support",
          desc:
            "FITALENTA helps individuals prepare for and access career opportunities abroad, particularly in Japan and other international destinations. Through language training, career guidance, recruitment assistance, document preparation, and access to trusted employer networks, we equip participants with the skills, knowledge, and support needed to successfully secure and thrive in global work environments. Our services cater to graduates from Senior High Schools, Diploma, Bachelor, and Master Degrees.",
        },
        {
          title: "New Student Admissions Support",
          desc:
            "We assist students in navigating the complex process of university applications, ensuring they are well-prepared to gain acceptance into their desired institutions. Our team provides expert advice on choosing the right programs, preparing necessary documents, and meeting academic requirements.",
        },
        {
          title: "Edu Trips and Edu Camps",
          desc:
            "FITALENTA organizes educational trips and immersive edu camps to provide students with hands-on learning experiences in various fields. These programs are designed to foster practical knowledge and real-world exposure, enabling participants to bridge the gap between theoretical learning and professional practice.",
        },
        {
          title: "Language Centers for Japanese and Korean",
          desc:
            "To equip students for global opportunities, we offer language programs specializing in Japanese and Korean. Available in both online and offline formats, these programs focus on developing practical communication skills and language proficiency needed for study, work, and cultural adaptation in global environments.",
        },
        {
          title: "Work and Study Abroad Consultation",
          desc:
            "FITALENTA provides personalized consultation services for those looking to work or study abroad. Through partnerships with institutions in Japan, Korea, Australia, Taiwan, Kyrgyzstan, and Finland, we help students and professionals explore and secure international opportunities. Our comprehensive support includes visa guidance, university applications, and job placements, ensuring a smooth transition to international environments.",
        },
        {
          title: "International Opportunities",
          desc:
            "FITALENTA connects individuals to educational, training, and employment opportunities across leading international markets. We collaborate with universities, language institutions, training centers, and employers to ensure participants are fully prepared for their academic and professional journeys abroad.",
        },
      ],
      closing:
        "By leveraging our expertise and global partnerships, FITALENTA’s Next Level EduVentures Program helps learners enhance their educational experience and achieve their academic and career goals, both locally and internationally.",
    },
  },

  {
    slug: "business-affiliate",
    title: "Business Affiliate",
    icon: BriefcaseBusiness,
    summary:
      "FITALENTA's Business Affiliate Program connects talented freelancers with companies to boost sales and drive growth through structured training, c…",
    content: {
      intro:
        "FITALENTA's Business Affiliate Program connects talented freelancers with companies to boost sales and drive growth through structured training.",
    },
  },
  {
    slug: "branding-and-marketing-program",
    title: "Branding and Marketing Program",
    icon: Store,
    summary:
      "FITALENTA's Branding & Marketing Program offers exclusive seminars, webinars, and workshops to help you grow your skills, network with industry le…",
    content: {
      intro:
        "FITALENTA's Branding & Marketing Program offers exclusive seminars, webinars, and workshops to help you grow your skills and network with industry leaders.",
    },
  },
  {
    slug: "event-organizer",
    title: "Event Organizer",
    icon: CalendarDays,
    summary:
      "FITALENTA offers professional event organizer services, handling everything from planning to execution to ensure your event's success. Let us help…",
    content: {
      intro:
        "FITALENTA offers professional event organizer services, handling everything from planning to execution to ensure your event's success.",
    },
  },
  {
    slug: "business-improvement-program",
    title: "Business Improvement Program",
    icon: Settings,
    summary:
      "Business Improvement Program helps organizations strengthen performance through practical learning, expert guidance, and proven industry best practice…",
    content: {
      intro:
        "Business Improvement Program helps organizations strengthen performance through practical learning, expert guidance, and proven industry best practices.",
    },
  },
  {
    slug: "management-program",
    title: "Management Program",
    icon: ClipboardList,
    summary:
      "Management Program is designed to support philanthropic and CSR initiatives through professional project management, including ZISWAF distribution, bo…",
    content: {
      intro:
        "Management Program is designed to support philanthropic and CSR initiatives through professional project management, including ZISWAF distribution.",
    },
  },
];

  export async function getServices(): Promise<Service[]> {
    return services;
  }

  export async function getService(slug: string): Promise<Service | undefined> {
    return (await getServices()).find((s) => s.slug === slug);
  }
