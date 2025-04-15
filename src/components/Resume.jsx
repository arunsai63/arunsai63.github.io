import React, { useState } from 'react'
import {
    FaLinkedin, FaFilePdf, FaGithub, FaCode,
    FaMapMarkerAlt, FaStar, FaUser, FaGraduationCap,
    FaMoon, FaSun
} from 'react-icons/fa'

const Resume = () => {
    const [isDark, setIsDark] = useState(false)

    const toggleTheme = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)

        if (newIsDark) {
            document.body.classList.add('dark-theme')
        } else {
            document.body.classList.remove('dark-theme')
        }
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'} shadow-md transition-colors`}
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`md:hidden p-4 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                        <h1 className="text-2xl font-bold uppercase">Sai Arun Munaganti</h1>
                        <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-xl mt-1`}>Solution Architect</h2>
                        <div className="flex items-center mt-2 text-sm">
                            <FaUser className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                            <span className="uppercase">6+ YOE (FULL STACK | AWS | DEVOPS | BLOCKCHAIN)</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row relative">
                        <div className={`w-full md:w-1/3 lg:w-1/4 p-4 relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className={`hidden md:block absolute bottom-0 left-0 w-full h-1/2 rounded-tr-full ${isDark ? 'bg-green-900' : 'bg-green-100'}`}></div>

                            <div className="relative z-10">
                                <div className="hidden md:block mb-8">
                                    <h1 className="text-2xl lg:text-3xl font-bold uppercase">Sai Arun Munaganti</h1>
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-xl lg:text-2xl mt-1`}>Solution Architect</h2>
                                    <div className="flex items-center mt-2 text-sm">
                                        <FaUser className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                        <span className="uppercase">6+ YOE (FULL STACK | AWS | DEVOPS | BLOCKCHAIN)</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg`}>Contacts</h2>
                                    <div className="mt-2 text-sm">
                                        <div className="flex items-center mt-1">
                                            <FaLinkedin className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                            <a href="https://www.linkedin.com/in/arunmunaganti/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>
                                                linkedin.com/in/arunmunaganti
                                            </a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaFilePdf className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                            <a href="/resume.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors`}>
                                                Resume
                                            </a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaGithub className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                            <a href='https://github.com/arunsai63'
                                                target='_blank'
                                                rel='noreferrer'
                                                className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>
                                                github.com/arunsai63
                                            </a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaMapMarkerAlt className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                            <span>Hyderabad, India</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaStar className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                            <span>
                                                <a href="https://www.hackerrank.com/profile/arunsai63" target='_blank'
                                                    rel='noreferrer'
                                                    className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>
                                                    6 star Hackerrank
                                                </a>
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaCode className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0`} />
                                            <span>
                                                <a href="https://leetcode.com/u/arunsai63/" target='_blank'
                                                    rel='noreferrer'
                                                    className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>
                                                    Leetcode
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg`}>Key Skills</h2>
                                    <div className="mt-2 text-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {['Python', 'Node', 'Rust', 'C#', 'AWS', 'Devops', 'React', 'Blockchain', 'Quant', 'LLM'].map((skill) => (
                                                <span key={skill} className={`${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'} px-2 py-1 rounded`}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg`}>Summary</h2>
                                    <p className="mt-2 text-sm">Currently Leading the Engineering Team @ Echor Tech.</p>
                                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                        <li><span className="font-bold">AWS Expert.</span> Architected scalable Backend and cloud native solutions, managing end-to-end delivery.</li>
                                        <li>Launched crypto projects achieving ~$50M market cap and thousands of active users.</li>
                                        <li>Optimised cloud infrastructure, reducing server costs while supporting tens of thousands of active users.</li>
                                        <li>Successfully scaled platforms from zero to tens of thousands of active users.</li>
                                        <li>Implemented full DevOps workflows [CI/CD, Docker, IAAC] across AWS and other clouds.</li>
                                        <li>Managed complete migration from monolithic to microservices architecture.</li>
                                        <li>Established engineering processes, trained teams, and scaled engineering headcount by 10x.</li>
                                        <li>Led stakeholder technical discussions, consistently delivering beyond expectations.</li>
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg`}>Key Achievements</h2>
                                    <p className="mt-2 text-sm">
                                        <span className="font-bold">Founding team member:</span> Built core workflows and ops from scratch, owning and scaling projects with a combined market cap of multimillion dollars.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg`}>Courses</h2>
                                    <p className="mt-2 text-sm">AWS Solution Architect Certification: Worked on AWS SAA-C03 certification.</p>
                                </div>

                                <div className="mb-6">
                                    <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg`}>Volunteering</h2>
                                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                        <li>Swecha.org: Python Teacher (2018 - Present): Working as a Volunteer teacher for python.</li>
                                        <li>Open Source Contributor (2018 - Present): contributed to open source projects and built several open source projects of my own.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={`w-full md:w-2/3 lg:w-3/4 p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className="mt-2">
                                <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold flex items-center text-lg mb-3`}>
                                    <FaCode className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2`} />
                                    Experience
                                </h2>

                                <div className="space-y-4">
                                    <div className={`border-l-4 ${isDark ? 'border-green-400' : 'border-green-500'} pl-3`}>
                                        <div className={`pt-1 pb-3`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">Echor Tech, Solution Architect</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) 09/2024 - Present</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li><span className="font-bold">A Broad-Scoped Tech Generalist.</span> Architecting Scalable Backend Solutions on primarily on AWS and other cloud services.</li>
                                                <li>Building and Leading a VC backed Product disrupting a $4B industry with a projected 200k Initial userbase</li>
                                                <li>Leading technical initiatives as the primary go-to expert across broad range of technologies - frontend, backend, mobile apps, databases, and DevOps.</li>
                                                <li>Heading all DevOps and Backend operations, ensuring smooth deployments and infrastructure efficiency, security and scalability.</li>
                                                <li>Leading technical discussions with stakeholders, clearly addressing complex requirements and consistently delivering beyond expectations.</li>
                                                <li>Tech: Kafka, Python, Nodejs, AWS, ECS, Fargate, FastApi, Cloudformation (IAAC), Docker, Linux, React, Nest JS, New Relic</li>
                                            </ul>
                                        </div>

                                        <div className={`py-3 border-t-1`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">Echor Tech, Software Engineer 3</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) 01/2023 - 09/2024</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>Successfully built and scaled three <span className="font-bold">High-Impact</span> crypto projects from scratch to thousands of active users, listed on platforms including OpenSea, MEXC, HTX exchanges and popular decentralised exchanges (DEXs).</li>
                                                <li>Built, owned and managed these crypto projects end-to-end, collectively achieving an estimated market cap of $50 Million.</li>
                                                <li>Built and owned <a href="https://www.landwey.in/" target='_blank' rel='noreferrer' className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>landwey.in</a>, scaling seamlessly to 30k+ users and thousands of listed properties and significantly optimised infrastructure achieving very low server costs and also delivering multiple internal dashboards.</li>
                                                <li>Tech: Solidity, Python, AWS, Node, Redis, Next JS, React, Rust, Github Actions, Linux, Dex, Docker, Web3, Svelte, Monitoring</li>
                                                <li>AWS Tech: Amplify, S3, Dynamodb, DocumentDb, Aurora, VPC, SQS, ECS, Auto Scaling, IAM, Cloudformation, RDS, CodeBuild, WAF, EC2, Lambda</li>
                                            </ul>
                                        </div>

                                        <div className={`py-3 border-t-1`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">Echor Tech, Lead Developer</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) 12/2021 - 01/2023</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>Led end-to-end development of a <span className="font-bold">advanced</span> crypto trading automation platform featuring copy trading, screener, realtime market tracking, backend, and complex referral systems.</li>
                                                <li>Built a multi-media platform with crypto incentives and integrated machine learning, attracting interest and getting offers from multiple VC firms.</li>
                                                <li>Architected scalable backend systems and streamlined DevOps for real-time apps involving payment gateways, location services, complex business logic.</li>
                                                <li>Established core tech workflows (Jira, GitHub) and managed technical hiring and training - becoming the startup's go-to tech expert.</li>
                                                <li>Guided critical technical decisions, ensuring product excellence and timely delivery across multiple high-impact projects.</li>
                                                <li>Tech: Rabbit MQ, Python, Flask, Node, Express, Mongodb, Postgres, Linux, Docker, Cloud Native, Serverless, Lambda, AWS, React, Solidity, Web3</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={`border-l-4 border-t-1 ${isDark ? 'border-green-400' : 'border-green-500'} pl-3`}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">Grow Indigo Pvt. Ltd, Software Development Engineer</span>
                                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Mumbai, India) 04/2021 - 12/2021</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>
                                                <a href="https://www.growindigo.co.in/" rel='noreferrer' target='_blank'
                                                    className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>growindigo.co.in</a>
                                            </li>
                                            <li>Complete revamp of internal dashboards from asp.net to react and .net core microservices</li>
                                            <li>Migrated all the services from on-prem to AWS along with CI/CD setup involving several microservices (10+) with minimal downtime.</li>
                                            <li>Identified and Fixed critical security vulnerabilities and implemented proper IAM service for all the microservices</li>
                                            <li>Built and Owned a referral and offers microservice</li>
                                            <li>Scaled the application to tens of thousands of users</li>
                                            <li>Tech: .Net Core, C#, AWS, Mongodb, Mysql, Microservices, Security, Python, Typescript, React</li>
                                        </ul>
                                    </div>

                                    <div className={`border-l-4 border-t-1 ${isDark ? 'border-green-400' : 'border-green-500'} px-3`}>
                                        <div className='py-1'>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">GGK Tech, Software Engineer</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) 08/2020 - 04/2021</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>
                                                    <a target='_blank' href="https://physioage.com" rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>physioage.com</a>
                                                </li>
                                                <li>Worked as a full stack developer using .net core, react, mysql and redis</li>
                                                <li>Worked on azure. CI/CD, deployments, serverless, multi environment setup</li>
                                                <li>Improved the application load times significantly (query optimisation & cache) handling 100k+ users</li>
                                                <li>Tech: C#, Azure, Serverless, .Net Core, React, Mysql, Redis, Azure Service Bus, Unit tests, Python, SQL Server</li>
                                            </ul>
                                        </div>

                                        <div className='py-1'>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">GGK Tech, Associate Software Engineer</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    (Hyderabad, India) 01/2019 - 08/2020
                                                </span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>
                                                    <a target='_blank' href="https://www.fideliscare.org/" rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>fideliscare.org</a>,
                                                    <a target='_blank' href="https://www.pronto-delivery.com/" rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>pronto-delivery.com</a>
                                                </li>
                                                <li>Worked as a full stack developer using .net core, react, oracle.</li>
                                                <li>Worked on a one of the largest migration projects. migrated complete db & several .net projects.</li>
                                                <li>Built and Owned an internal employee management system involving complex hierarchy having 10k+ users.</li>
                                                <li>Tech: React, C#, .Net, Oracle, Sybase, Python</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className={`${isDark ? 'text-green-400' : 'text-green-500'} uppercase font-bold text-lg flex items-center mb-2`}>
                                    <FaGraduationCap className={`${isDark ? 'text-green-400' : 'text-green-500'} mr-2`} />
                                    Education
                                </h2>
                                <div className={`border-l-4 ${isDark ? 'border-green-400' : 'border-green-500'} pl-3`}>
                                    <span className="font-bold block">JNTUH College of Engineering Hyderabad</span>
                                    <span className="text-sm">Bachelor's degree, Computer Science & Engineering</span>

                                    <ul className="list-disc list-inside mt-1 text-sm">
                                        <li>Member of FOSS Club (<a href='https://swecha.org/' target='_blank'>swecha.org</a>).</li>
                                        <li>
                                            Major Project:
                                            <a href="https://github.com/arunsai63/character-recognition" target='_blank'>
                                                Handwritten Character Recognition System (KNN, Python)
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                    <p>© {new Date().getFullYear()} Sai Arun Munaganti. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Resume