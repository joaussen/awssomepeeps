export interface Candidate {
  name: string
  title: string
  location: string
  workStyle: 'Remote' | 'Hybrid' | 'In-Person'
  superpower: string
  bio: string
  recentWins: string[]
  experience: '5-10' | '10-15' | '15-25' | '25+'
  linkedIn?: string
}

export const candidates: Candidate[] = [
  {
    name: 'Sarah Mitchell',
    title: 'Senior Partner Development Manager, ISV Accelerate',
    location: 'Seattle, United States',
    workStyle: 'Remote',
    superpower: 'AWS Marketplace',
    bio: 'Led AWS ISV Accelerate program across NA, driving 200+ ISV partners to transact on AWS Marketplace. Deep expertise in co-sell motions, CPPO, and partner GTM strategy.',
    recentWins: [
      'Grew ISV Marketplace revenue 340% YoY',
      'Onboarded 85 new ISV partners in FY24',
      'Built co-sell playbook adopted across 4 regions',
    ],
    experience: '15-25',
  },
  {
    name: 'Marcus Chen',
    title: 'Principal Solutions Architect',
    location: 'San Francisco, United States',
    workStyle: 'Remote',
    superpower: 'Cloud & AI',
    bio: 'Built and scaled cloud architectures for Fortune 500 customers on AWS. Specialist in serverless, containers, and AI/ML workloads. 12 AWS certifications.',
    recentWins: [
      'Architected $45M enterprise migration to AWS',
      'Reduced customer cloud costs by 40% through optimization',
      'Led technical wins for 3 strategic accounts worth $120M+',
    ],
    experience: '15-25',
  },
  {
    name: 'Elena Rodriguez',
    title: 'Senior Account Executive, Enterprise',
    location: 'Madrid, Spain',
    workStyle: 'Remote',
    superpower: 'Cloud & AI',
    bio: 'Managed a $200M+ portfolio of enterprise accounts across EMEA. Expert in navigating complex procurement, EDP commitments, and multi-year cloud deals.',
    recentWins: [
      'Closed $80M multi-year EDP commitment',
      '145% quota attainment in FY24',
      'Expanded 3 accounts from single-workload to full platform adoption',
    ],
    experience: '10-15',
  },
  {
    name: 'James Okafor',
    title: 'Marketplace Business Development Manager',
    location: 'London, United Kingdom',
    workStyle: 'Hybrid',
    superpower: 'AWS Marketplace',
    bio: 'Drove AWS Marketplace adoption with ISVs across EMEA. Expertise in private offers, channel partner programs, and marketplace GTM motions.',
    recentWins: [
      'Generated $35M in Marketplace-sourced pipeline',
      'Launched 40+ ISV solutions on AWS Marketplace',
      'Created partner enablement program reaching 200+ ISVs',
    ],
    experience: '10-15',
  },
  {
    name: 'Priya Sharma',
    title: 'Senior Product Manager, AWS Marketplace',
    location: 'Bangalore, India',
    workStyle: 'Remote',
    superpower: 'AWS Marketplace',
    bio: 'Product leader who shipped key Marketplace features including enhanced CPPO workflows and buyer experience improvements. Strong technical background with customer obsession.',
    recentWins: [
      'Shipped CPPO automation reducing processing time by 70%',
      'Drove 25% increase in Marketplace buyer conversion',
      'Led cross-team initiative impacting $500M+ in transactions',
    ],
    experience: '10-15',
  },
  {
    name: 'Thomas Weber',
    title: 'Cloud Solutions Architect',
    location: 'Munich, Germany',
    workStyle: 'Remote',
    superpower: 'Cloud & AI',
    bio: 'Helped enterprise customers modernize and migrate to AWS. Deep expertise in data analytics, machine learning, and infrastructure-as-code across manufacturing and automotive verticals.',
    recentWins: [
      'Led $60M cloud transformation for automotive OEM',
      'Built ML pipeline processing 2TB/day for predictive maintenance',
      'Achieved AWS Ambassador status for technical contributions',
    ],
    experience: '15-25',
  },
  {
    name: 'Rachel Kim',
    title: 'Partner Solutions Architect',
    location: 'Toronto, Canada',
    workStyle: 'Remote',
    superpower: 'ISV Partnerships',
    bio: 'Technical partner-facing architect who helped ISVs optimize their SaaS solutions on AWS. Expert in multi-tenant architecture, cost optimization, and marketplace integration.',
    recentWins: [
      'Helped 30+ ISVs achieve AWS Competency status',
      'Reduced ISV partner onboarding time from 6 months to 6 weeks',
      'Built reference architectures adopted by 100+ partners',
    ],
    experience: '10-15',
  },
  {
    name: 'David Laurent',
    title: 'Senior Program Manager, AWS Partner Network',
    location: 'Paris, France',
    workStyle: 'Hybrid',
    superpower: 'ISV Partnerships',
    bio: 'Managed strategic programs within AWS Partner Network, driving partner engagement and revenue growth across Western Europe. Expert in partner program design and execution.',
    recentWins: [
      'Scaled partner program to 500+ active ISVs in WE',
      'Drove 200% increase in partner-sourced opportunities',
      'Launched AWS partner bootcamp adopted in 8 countries',
    ],
    experience: '15-25',
  },
  {
    name: 'Lisa Tanaka',
    title: 'AWS Sales Specialist, SaaS',
    location: 'Tokyo, Japan',
    workStyle: 'Remote',
    superpower: 'Cloud & AI',
    bio: 'SaaS sales specialist driving cloud adoption across APJ enterprise accounts. Fluent in Japanese and English, with deep understanding of the Japanese enterprise market.',
    recentWins: [
      'Closed $25M in SaaS migrations to AWS',
      '160% quota attainment, #1 in APJ region',
      'Pioneered AWS marketplace adoption in Japan market',
    ],
    experience: '10-15',
  },
  {
    name: 'Michael Brooks',
    title: 'Director, ISV Business Development',
    location: 'New York, United States',
    workStyle: 'Remote',
    superpower: 'AWS Marketplace',
    bio: 'Built and led ISV business development teams at AWS. Track record of scaling marketplace revenue and building strategic alliances with top-tier ISVs.',
    recentWins: [
      'Grew ISV segment from $50M to $200M ARR',
      'Recruited and led team of 15 BDMs across NA',
      'Negotiated 5 strategic ISV partnerships worth $100M+',
    ],
    experience: '25+',
  },
  {
    name: 'Ana Costa',
    title: 'Customer Success Manager, Enterprise',
    location: 'Lisbon, Portugal',
    workStyle: 'Remote',
    superpower: 'Cloud & AI',
    bio: 'Drove cloud adoption and customer success for AWS enterprise accounts across Southern Europe. Expert in building long-term relationships and expanding cloud footprint.',
    recentWins: [
      'Achieved 98% customer retention rate across portfolio',
      'Drove $15M in upsell revenue through strategic expansion',
      'Led digital transformation for 3 Fortune 500 accounts',
    ],
    experience: '5-10',
  },
  {
    name: 'Robert Nguyen',
    title: 'Senior DevOps Architect',
    location: 'Sydney, Australia',
    workStyle: 'Remote',
    superpower: 'Cloud & AI',
    bio: 'DevOps and platform engineering leader with deep AWS expertise. Built CI/CD platforms and infrastructure automation for enterprise-scale deployments.',
    recentWins: [
      'Built platform serving 2000+ developers across 50 teams',
      'Reduced deployment time from hours to minutes with automated pipelines',
      'Achieved 99.99% uptime SLA for mission-critical workloads',
    ],
    experience: '15-25',
  },
]

export const superpowers = ['AWS Marketplace', 'Cloud & AI', 'ISV Partnerships']
export const experienceLevels = ['5-10', '10-15', '15-25', '25+']
export const workStyles = ['Remote', 'Hybrid', 'In-Person']
