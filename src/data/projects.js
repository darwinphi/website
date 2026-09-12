export const projects = [
  {
    id: 'globe-onehub',
    translationKey: 'globeOnehub',
    name: 'Globe Business OneHub',
    role: 'Senior Backend Engineer',
    link: 'https://onehub.globe.com.ph/',
    description:
      'Globe Business serves enterprises with connectivity, communications, and digital solutions. OneHub gives its customers a centralized portal for managing accounts, billing information, users, and support needs.',
    aboutClient:
      'Globe Telecom is a major telecommunications provider in the Philippines. Through Globe Business, it serves enterprises with connectivity, communications, and digital solutions. OneHub gives Globe Business customers a centralized portal for managing accounts, billing information, users, and support needs.',
    problem:
      'Corporate customers needed a simpler way to access billing information and request assistance without navigating disconnected channels. OneHub required secure and reliable integration with Globe\'s Bill Delivery & Storage Platform (BDSP), along with a structured way to capture portal issues and make them visible to customer support teams.',
    solution:
      'As a Senior Backend Engineer, I designed and implemented the backend integrations connecting OneHub with BDSP and Helpdesk. The solution enabled authorized corporate users to list, view, and download bills while giving customers a direct channel for reporting technical and account-related portal issues. I owned the integration lifecycle from architecture and implementation through testing, production release, and operational support.',
    keyContributions: [
      'Designed the service integration and API contracts between OneHub and BDSP;',
      'Implemented backend workflows for listing, viewing, and downloading corporate bills;',
      'Applied authorization controls so users could access only bills associated with their permitted organization and accounts;',
      'Transformed upstream billing data into stable contracts for OneHub consumers;',
      'Added resilience and error handling for slow, unavailable, or inconsistent upstream responses;',
      'Designed and built the Helpdesk integration for reporting login, page-loading, display, invitation, email-notification, and missing-information issues;',
      'Developed a scheduled daily reporting workflow that gave Globe support teams visibility into submitted concerns; and,',
      'Supported testing, production readiness, deployment, troubleshooting, and ongoing operation of the integrations.',
    ],
    impact: [
      'Enabled corporate customers to retrieve billing information and documents through a centralized self-service portal;',
      'Established a structured channel for reporting and tracking portal-related concerns;',
      'Improved support visibility through automated daily issue reporting;',
      'Protected sensitive billing information through account- and organization-level access controls; and,',
      'Created more reliable boundaries between OneHub and its billing and support systems.',
    ],
  },
  {
    id: 'globe-telecom',
    translationKey: 'globeTelecom',
    name: `Globe Telecom's Bill Delivery & Storage Platform`,
    role: 'Full Stack Developer',
    link: null,
    description:
      'Globe Telecom is one of the largest telecommunications providers in the Philippines, offering mobile, broadband, and enterprise services to millions of customers. Globe continuously invests in modernizing its internal systems to improve operational efficiency and service delivery.',
    aboutClient:
      'Globe Telecom is one of the largest telecommunications providers in the Philippines that offer mobile, broadband, and enterprise services to millions of customers. Globe continuously invests in modernizing its internal systems to improve operational efficiency and service delivery.',
    problem:
      'The existing billing system relied heavily on manually executed scripts to generate bill summaries, store records, and send emails. Thus, this approach introduced inefficiencies which resulted to risk of human error, and made the system difficult to scale and maintain.',
    solution:
      'As a Full Stack Developer, I became a part of the solution by modernizing the billing workflow and building internal tools to support operations.',
    keyContributions: [
      'Improved bill summary generation, storage, and email delivery processes;',
      'Helped transition from a manual, script-driven system to a more automated and scalable architecture;',
      'Developed backend APIs to support billing operations and admin functionalities;',
      'Built an admin portal for billing agents and support teams;',
      'Designed user-friendly interfaces to streamline administrative workflows; and,',
      'Integrated front-end and back-end systems for seamless data handling.',
    ],
    impact: [
      'Reduced reliance on manual processes and scripts;',
      'Improved system reliability and scalability;',
      'Enabled faster and more efficient billing operations;',
      'Provided a centralized platform for internal teams to manage billing tasks; and,',
      'Enhanced overall maintainability of the system.',
    ],
  },
  {
    id: 'chong-hua-hospital',
    translationKey: 'chongHuaHospital',
    name: `Chong Hua Hospital's Doctors Recruitment Portal`,
    role: 'Frontend Developer',
    link: 'https://chonghua.com.ph/',
    description:
      'Chong Hua Hospital is a leading private healthcare institution based in Cebu City, Philippines, with over a century of experience in delivering quality medical services. As part of its continuous digital transformation, the hospital invests in technology solutions to improve internal processes and operational efficiency.',
    aboutClient:
      'Chong Hua Hospital is a leading private healthcare institution based in Cebu City, Philippines, with over a century of experience in delivering quality medical services. As part of its continuous digital transformation, the hospital invests in technology solutions to improve internal processes and operational efficiency.',
    problem:
      'The recruitment process for doctors relied heavily on manual submission and handling of documents. This resulted in slower processing times, increase of administrative workload, and a fragmented experience for both applicants and staff.',
    solution:
      'As a Frontend Developer, I contributed by building an online recruitment portal that digitized the document submission process.',
    keyContributions: [
      'Developed user-friendly interfaces for doctor applications;',
      'Implemented structured document upload and form workflows;',
      'Improved usability for both applicants and internal staff; and,',
      'Collaborated with back-end APIs to ensure seamless data handling.',
    ],
    impact: [
      'Reduced reliance on manual document handling;',
      'Improved efficiency in processing applications;',
      'Provided a smoother and more accessible experience for applicants; and,',
      'Enabled recruitment staff to manage submissions in a centralized system.',
    ],
  },
  {
    id: 'jollibee-kids-party',
    translationKey: 'jollibeeKidsParty',
    name: 'Jollibee Kids Party',
    role: 'Full Stack Developer',
    link: 'https://party.jollibee.com.ph/',
    description:
      "Jollibee is the largest fast-food chain in the Philippines and a globally recognized brand known for its family-oriented dining experience. It is primarily recognized for its in-store Kids Party service which allows families to celebrate birthdays and special occasions. As customers' expectations shift toward digital convenience, Jollibee continues to invest in modernizing its customer-facing platforms.",
    aboutClient: `Jollibee is the largest fast-food chain in the Philippines and a globally recognized brand known for its family-oriented dining experience. It is primarily recognized for its in-store Kids Party service which allows families to celebrate birthdays and special occasions. As customers' expectations shift toward digital convenience, Jollibee continues to invest in modernizing its customer-facing platforms.`,
    problem:
      'The kids party booking process lacked a fully optimized digital experience, with limitations in customization, booking workflows, and content management. This resulted in friction for users trying to plan events and inefficiencies for internal teams managing bookings and configurations.',
    solution:
      'As a Full Stack Developer, I played a key role by developing and enhancing both new and existing features across the storefront, CMS, and backend systems.',
    keyContributions: [
      'Built and enhanced party customization features (themes, packages, add-ons);',
      'Improved booking workflows to make scheduling and reservations more intuitive;',
      'Developed and maintained back-end APIs to support booking logic and data flow;',
      'Optimized CMS capabilities for managing party content and configurations;',
      'Refined system performance for faster load times and smoother user interactions; and,',
      'Collaborated across teams to ensure alignment between front-end, back-end, and business requirements.',
    ],
    impact: [
      'Streamlined the end-to-end party booking experience for customers;',
      'Improved flexibility in customizing party packages;',
      'Reduced friction in the booking process, increasing usability and completion rates;',
      'Enabled internal teams to manage party offerings more efficiently via CMS; and,',
      'Enhanced overall system performance and reliability across platforms.',
    ],
  },
  {
    id: 'konsultamd',
    translationKey: 'konsultaMd',
    name: 'KonsultaMD',
    role: 'Backend Developer',
    link: 'https://konsulta.md/',
    description:
      'KonsultaMD is a leading Telehealth service in the Philippines that provides 24/7 access to licensed doctors through phone and digital platforms. It aims to make healthcare more accessible, especially for underserved and remote communities. During the COVID-19 pandemic, KonsultaMD experienced rapid growth as demand for remote medical consultations arose.',
    aboutClient:
      'KonsultaMD is a leading Telehealth service in the Philippines that provides 24/7 access to licensed doctors through phone and digital platforms. It aims to make healthcare more accessible, especially for underserved and remote communities. During the COVID-19 pandemic, KonsultaMD experienced rapid growth as demand for remote medical consultations arose.',
    problem:
      'At the peak of the pandemic, healthcare systems were overwhelmed, and patients faced limited access to physical consultations due to lockdowns and safety concerns. KonsultaMD needed to rapidly scale its platform.',
    solution:
      'As a Backend Developer, I contributed to building a scalable and resilient Teleconsultation platform to suffice the demand for virtual healthcare services.',
    keyContributions: [
      'Designed and implemented APIs to centralize and optimize data communication;',
      'Built and optimized back-end services to handle high concurrency and traffic spikes;',
      'Integrated secure and flexible payment solutions to support various subscription models;',
      'Improved system performance and reliability for real-time consultation workflows; and,',
      'Collaborated with front-end teams to ensure efficient API consumption and data flow.',
    ],
    impact: [
      'Enabled large-scale access to remote healthcare services during the pandemic;',
      'Supported flexible monetization strategies and increased user adoption; and,',
      'Contributed to the rapid growth of KonsultaMD during a critical period.',
    ],
  },
  {
    id: 'shore-suite',
    translationKey: 'shoreSuite',
    name: 'Shore Suite',
    role: 'Junior Backend Developer',
    link: 'https://web.facebook.com/shoresuite',
    description:
      'Shore Suite is a hotel management platform designed to streamline hospitality operations which include room bookings, customer management, and day-to-day administrative processes. The system supports hotels in improving operational efficiency and delivering topnotch guest experiences through digital solutions.',
    aboutClient:
      'Shore Suite is a hotel management platform designed to streamline hospitality operations which include room bookings, customer management, and day-to-day administrative processes. The system supports hotels in improving operational efficiency and delivering topnotch guest experiences through digital solutions.',
    problem:
      'Traditional hotel management processes often relied on fragmented systems or manual workflows, leading to inconveniences in room reservations, customer data handling, and operational coordination. This resulted in slower booking processes, increased risk of human error, and difficulty scaling operations.',
    solution:
      'As a Junior Backend Developer, I played a vital role to building the core APIs that powered the hotel management system. This served as my foundation in backend engineering that helped me gain hands-on experience in modern technologies and architectural patterns.',
    keyContributions: [
      'Developed robust APIs to support room booking, customer management, and operational workflows;',
      'Contributed to a MicroServices Architecture setup to improve system modularity and scalability; and,',
      'Implemented unit and integration tests to ensure system reliability and maintain code quality',
    ],
    impact: [
      'Improved efficiency of hotel booking and management operations through reliable API services;',
      'Enabled scalable system architecture capable of handling growing business needs;',
      'Reduced system errors and increased confidence in deployments through testing practices; and,',
      'Built a strong foundation in backend development, particularly in functional programming.',
    ],
  },
];
