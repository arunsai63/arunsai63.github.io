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
                            <span className="uppercase">6+ YOE (FULL STACK | DEVOPS | BLOCKCHAIN)</span>
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
                                        <span className="uppercase">6+ YOE (FULL STACK | DEVOPS | BLOCKCHAIN)</span>
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
                                            {['AWS', 'React', 'Devops', 'Python', 'Node', 'Rust', 'Blockchain', 'Quant'].map((skill) => (
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
                                        <li>Architected scalable AWS backend solutions, managing end-to-end delivery.</li>
                                        <li>Launched crypto projects achieving ~$20M market cap and thousands of active users.</li>
                                        <li>Optimized cloud infrastructure, reducing server costs while supporting tens of thousands of users.</li>
                                        <li>Successfully scaled platforms from zero to tens of thousands of active users.</li>
                                        <li>Implemented full DevOps workflows (CI/CD, Docker, IAAC) across AWS and other clouds.</li>
                                        <li>Managed complete migration from monolithic to microservices architecture.</li>
                                        <li>Established engineering processes, trained teams, and scaled engineering headcount by 10x.</li>
                                        <li>Led client technical discussions, consistently delivering beyond expectations.</li>
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
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) Sep 2024 - Present</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>Architecting scalable backend solutions on AWS—transforming client ideas into robust realities.</li>
                                                <li>Overseeing complete product lifecycles: from initial concept and development to deployment, monitoring, and ongoing optimization.</li>
                                                <li>Leading technical initiatives as the primary go-to expert across frontend, backend, mobile apps, databases, and DevOps.</li>
                                                <li>Heading all DevOps operations, ensuring smooth deployments and infrastructure efficiency & security.</li>
                                                <li>Leading technical discussions in client meetings, clearly addressing complex requirements and consistently delivering beyond expectations.</li>
                                            </ul>
                                        </div>

                                        <div className={`py-3 border-t-1`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">Echor Tech, Software Engineer 3</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) Jan 2023 - Sep 2024</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>
                                                    Built and managed&nbsp;
                                                    <a href="https://www.landwey.in/" target='_blank' rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>
                                                        landwey.in</a>, scaling seamlessly to 30,000+ users and 1,000+ property listings with end-to-end backend and DevOps.
                                                </li>
                                                <li>
                                                    Significantly optimized infrastructure for Landwey, achieving monthly server costs under $30, while delivering multiple internal dashboards and maintaining effective client interactions.
                                                </li>
                                                <li>
                                                    Successfully launched and scaled three high-impact crypto projects from scratch to thousands of active users, listed on platforms including OpenSea, MEXC, HTX exchanges, and popular decentralized exchanges (DEXs).
                                                </li>
                                                <li>
                                                    Built, owned, and managed these crypto projects end-to-end, collectively achieving an estimated market cap of $20M.
                                                </li>
                                            </ul>
                                        </div>

                                        <div className={`py-3 border-t-1`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">Echor Tech, Lead Developer</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) Dec 2021 - Jan 2023</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>Led end-to-end development of a crypto trading automation platform featuring copy trading, priority execution, and complex referral systems.</li>
                                                <li>Built a media platform with crypto incentives and integrated machine learning, attracting interest from multiple VC firms.</li>
                                                <li>Architected scalable backend systems and streamlined DevOps for real-time apps involving payment gateways, location services, and queuing mechanisms.</li>
                                                <li>Established core tech workflows (Jira, GitHub), provided team training, and managed technical hiring—becoming the startup’s go-to tech expert.</li>
                                                <li>Guided critical technical decisions, ensuring product excellence and timely delivery across multiple high-impact projects.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={`border-l-4 border-t-1 ${isDark ? 'border-green-400' : 'border-green-500'} pl-3`}>
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">Grow Indigo Pvt. Ltd, Software Development Engineer</span>
                                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Mumbai, India) Apr 2021 - Dec 2021</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>
                                                <a href="https://www.growindigo.co.in/" rel='noreferrer' target='_blank'
                                                    className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>growindigo.co.in</a>
                                            </li>
                                            <li>Complete revamp of admin dashboard from asp.net to react and .net core micro services</li>
                                            <li>Migrated all the services from on prem to AWS along with CI/CD setup and docker</li>
                                            <li>Completed security audit and implemented IAM micro service</li>
                                            <li>Implemented brand new referral and offers system</li>
                                            <li>Scaled the application to tens of thousands of users</li>
                                        </ul>
                                    </div>

                                    <div className={`border-l-4  border-t-1 ${isDark ? 'border-green-400' : 'border-green-500'} px-3`}>
                                        <div className='py-1'>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">GGK Tech, Software Engineer</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(Hyderabad, India) Aug 2020 - Apr 2021</span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>
                                                    <a target='_blank' href="https://physioage.com" rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>physioage.com</a>
                                                </li>
                                                <li>Worked as a full stack developer using .net core, react, mysql and redis</li>
                                                <li>Worked on azure. CI/CD, deployments, serverless, multi environment setup</li>
                                                <li>Improved the application load times significantly (query optimisation, cache, serverless)</li>
                                            </ul>
                                        </div>

                                        <div className='py-1'>
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <span className="font-bold">GGK Tech, Associate Software Engineer</span>
                                                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    (Hyderabad, India) Jan 2019 - Aug 2020
                                                </span>
                                            </div>
                                            <ul className="list-disc list-inside mt-1 text-sm">
                                                <li>
                                                    <a target='_blank' href="https://www.fideliscare.org/" rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>fideliscare.org</a>,&nbsp;
                                                    <a target='_blank' href="https://www.pronto-delivery.com/" rel='noreferrer'
                                                        className={`${isDark ? 'hover:text-green-400' : 'hover:text-green-500'} transition-colors truncate`}>pronto-delivery.com</a>
                                                </li>
                                                <li>
                                                    Worked as a full stack developer using .net core, react, oracle.
                                                </li>
                                                <li>
                                                    Worked on a one of the largest migration projects. migrated complete db & several .net projects.
                                                </li>
                                                <li>
                                                    Built and Owned an internal employee management system involving complex hierarchy having 10k+ users.
                                                </li>
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
                                            Major Project:&nbsp;
                                            <a href="https://github.com/arunsai63/character-recognition" target='_blank'>
                                                Handwritten Character Recognition System using Neural Networks
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