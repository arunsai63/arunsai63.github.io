import React from 'react'
import {
    FaLinkedin, FaFilePdf, FaGithub, FaCode,
    FaMapMarkerAlt, FaStar, FaUser, FaGraduationCap
} from 'react-icons/fa'

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main container with responsive width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Resume Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Mobile Header - Only visible on small screens */}
                    <div className="md:hidden bg-white p-4 border-b">
                        <h1 className="text-2xl font-bold uppercase">Sai Arun Munaganti</h1>
                        <h2 className="text-green-500 uppercase font-bold text-xl mt-1">Solution Architect</h2>
                        <div className="flex items-center mt-2 text-sm">
                            <FaUser className="text-green-500 mr-2 flex-shrink-0" />
                            <span className="uppercase">6+ YOE (FULL STACK | DEVOPS | BLOCKCHAIN)</span>
                        </div>
                    </div>

                    {/* Flex container for columns - Column on mobile, Row on medium+ */}
                    <div className="flex flex-col md:flex-row relative">
                        {/* Left Column - Full width on mobile, 1/3 on medium+ */}
                        <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-4 relative">
                            {/* Background Curve - Hidden on mobile */}
                            <div className="hidden md:block absolute bottom-0 left-0 w-full h-1/2 bg-green-100 rounded-tr-full"></div>

                            <div className="relative z-10">
                                {/* Desktop Header - Hidden on mobile */}
                                <div className="hidden md:block mb-8">
                                    <h1 className="text-2xl lg:text-3xl font-bold uppercase">Sai Arun Munaganti</h1>
                                    <h2 className="text-green-500 uppercase font-bold text-xl lg:text-2xl mt-1">Solution Architect</h2>
                                    <div className="flex items-center mt-2 text-sm">
                                        <FaUser className="text-green-500 mr-2 flex-shrink-0" />
                                        <span className="uppercase">6+ YOE (FULL STACK | DEVOPS | BLOCKCHAIN)</span>
                                    </div>
                                </div>

                                {/* Contacts Section */}
                                <div className="mb-6">
                                    <h2 className="text-green-500 uppercase font-bold text-lg">Contacts</h2>
                                    <div className="mt-2 text-sm">
                                        <div className="flex items-center mt-1">
                                            <FaLinkedin className="text-green-500 mr-2 flex-shrink-0" />
                                            <a href="https://www.linkedin.com/in/arunmunaganti/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="hover:text-green-500 transition-colors truncate">
                                                linkedin.com/in/arunmunaganti
                                            </a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaFilePdf className="text-green-500 mr-2 flex-shrink-0" />
                                            <a href="/resume.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="hover:text-green-500 transition-colors">
                                                Resume
                                            </a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaGithub className="text-green-500 mr-2 flex-shrink-0" />
                                            <a href='https://github.com/arunsai63'
                                                target='_blank'
                                                rel='noreferrer'
                                                className="hover:text-green-500 transition-colors truncate">
                                                github.com/arunsai63
                                            </a>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaMapMarkerAlt className="text-green-500 mr-2 flex-shrink-0" />
                                            <span>Hyderabad, India</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaStar className="text-green-500 mr-2 flex-shrink-0" />
                                            <span>
                                                <a href="https://www.hackerrank.com/profile/arunsai63" target='_blank'
                                                    rel='noreferrer'
                                                    className="hover:text-green-500 transition-colors truncate">
                                                    6 star Hackerrank
                                                </a>
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaCode className="text-green-500 mr-2 flex-shrink-0" />
                                            <span>
                                                <a href="https://leetcode.com/u/arunsai63/" target='_blank'
                                                    rel='noreferrer'
                                                    className="hover:text-green-500 transition-colors truncate">
                                                    Leetcode
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Section - Move up on mobile for better hierarchy */}
                                <div className="mb-6">
                                    <h2 className="text-green-500 uppercase font-bold text-lg">Key Skills</h2>
                                    <div className="mt-2 text-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {['AWS', 'React', 'Backend', 'Python', 'Node', 'Rust', 'Blockchain', 'Quant'].map((skill) => (
                                                <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="mb-6">
                                    <h2 className="text-green-500 uppercase font-bold text-lg">Summary</h2>
                                    <p className="mt-2 text-sm">Currently Leading the Engineering Team @ Echor Tech.</p>
                                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                        <li>Scalable Backend Services</li>
                                        <li>Multi Cloud (AWS, Digital Ocean, Azure, Firebase) - DevOps (CI-CD, Docker, Cloudformation, serverless)</li>
                                        <li>Crypto and Blockchain</li>
                                        {/* <li>Leading the product team for product roadmap</li> */}
                                        <li>100% documentation [product | technical | user]</li>
                                        <li>Monolithic to MicroServices</li>
                                        <li>Security First Approach</li>
                                        <li>Attracting and mentoring talented developers</li>
                                        <li>10x growth in team members</li>
                                        {/* <li>Establishing strong growth path for the team</li> */}
                                        <li>Managing Hybrid Workspace (WFH and WFO) with high efficiency</li>
                                    </ul>
                                    {/* <p className="mt-2 text-sm">Tech Stack: AWS, Python, React, Solidity, Web3, Blockchain, Javascript, Docker</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Full width on mobile, 2/3 on medium+ */}
                        <div className="w-full md:w-2/3 lg:w-3/4 bg-white p-4">
                            {/* Experience Section */}
                            <div className="mt-2">
                                <h2 className="text-green-500 uppercase font-bold text-lg mb-3">Experience</h2>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">Echor Tech, Solution Architect</span>
                                            <span className="text-sm text-gray-600">(Hyderabad, India) Sep 2024 - Present</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>Architect solutions using AWS, Backend.</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">Echor Tech, Software Engineer 3</span>
                                            <span className="text-sm text-gray-600">(Hyderabad, India) Jan 2023 - Sep 2024</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li><a href="https://www.landwey.in/" target='_blank' rel='noreferrer'
                                                className="hover:text-green-500 transition-colors truncate">landwey.in</a></li>
                                            <li>Built and Scaled 3 key projects from ground-up and scaled to thousands of users while keeping cost down.</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">Echor Tech, Lead Developer</span>
                                            <span className="text-sm text-gray-600">(Hyderabad, India) Dec 2021 - Jan 2023</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>Built and Owned several crypto projects.</li>
                                            <li>Most notably built a trading automation platform from scratch.</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">Grow Indigo Pvt. Ltd, Software Development Engineer</span>
                                            <span className="text-sm text-gray-600">(Mumbai, India) Apr 2021 - Dec 2021</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>
                                                <a href="https://www.growindigo.co.in/" rel='noreferrer' target='_blank'
                                                    className="hover:text-green-500 transition-colors truncate">growindigo.co.in</a>
                                            </li>
                                            <li>Complete revamp of admin dashboard from asp.net to react and .net core micro services</li>
                                            <li>Migrated all the services from on prem to AWS along with CI/CD setup and docker</li>
                                            <li>Completed security audit and implemented IAM micro service</li>
                                            <li>Implemented brand new referral and offers system</li>
                                            <li>Scaled the application to tens of thousands of users</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">GGK Tech, Software Engineer</span>
                                            <span className="text-sm text-gray-600">(Hyderabad, India) Aug 2020 - Apr 2021</span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>
                                                <a target='_blank' href="https://physioage.com" rel='noreferrer'
                                                    className="hover:text-green-500 transition-colors truncate">physioage.com</a>
                                            </li>
                                            <li>Worked as a full stack developer using .net core, react, mysql and redis</li>
                                            <li>Worked on azure. CI/CD, deployments, serverless, multi environment setup</li>
                                            <li>Improved the application load times significantly (query optimisation, cache, serverless)</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="flex flex-col sm:flex-row sm:justify-between">
                                            <span className="font-bold">GGK Tech, Associate Software Engineer</span>
                                            <span className="text-sm text-gray-600">
                                                (Hyderabad, India) Jan 2019 - Aug 2020
                                            </span>
                                        </div>
                                        <ul className="list-disc list-inside mt-1 text-sm">
                                            <li>
                                                <a target='_blank' href="https://www.fideliscare.org/" rel='noreferrer'
                                                    className="hover:text-green-500 transition-colors truncate">fideliscare.org</a>,&nbsp;
                                                <a target='_blank' href="https://www.pronto-delivery.com/" rel='noreferrer'
                                                    className="hover:text-green-500 transition-colors truncate">pronto-delivery.com</a>
                                            </li>
                                            <li>
                                                Worked as a full stack developer using .net core, react, oracle.
                                            </li>
                                            <li>
                                                Worked on a very large db migration project. migrated sql scripts & several .net projects.
                                            </li>
                                            <li>
                                                built and owned an internal employee management system involving complex hierarchy having 10k+ users.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="mt-6">
                                <h2 className="text-green-500 uppercase font-bold text-lg flex items-center mb-2">
                                    <FaGraduationCap className="text-green-500 mr-2" />
                                    Education
                                </h2>
                                <div className="border-l-4 border-green-500 pl-3">
                                    <span className="font-bold block">JNTUH College of Engineering Hyderabad</span>
                                    <span className="text-sm">Bachelor's degree, Computer Science & Engineering</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-4">
                    <p>© {new Date().getFullYear()} Sai Arun Munaganti. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default App