import React from 'react'
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaStar, FaUser, FaGraduationCap } from 'react-icons/fa'

const App = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex relative">
                {/* Left Column */}
                <div className="w-1/3 bg-white p-4 relative">
                    {/* Background Curve */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-green-100 rounded-tr-full"></div>
                    <div className="relative z-10">
                        {/* Contacts Section */}
                        <div className="mb-6">
                            <h2 className="text-green-500 uppercase font-bold text-lg">Contacts</h2>
                            <div className="mt-2">
                                <div className="flex items-center">
                                    <FaPhone className="text-green-500 mr-2" />
                                    <span>+91 8919863307</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <FaEnvelope className="text-green-500 mr-2" />
                                    <span>arunsai63@gmail.com</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <FaLinkedin className="text-green-500 mr-2" />
                                    <span>https://www.linkedin.com/in/arun-munaganti/</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <FaGithub className="text-green-500 mr-2" />
                                    <span>github.com/arunsai63</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <FaMapMarkerAlt className="text-green-500 mr-2" />
                                    <span>Hyderabad, India</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <FaStar className="text-green-500 mr-2" />
                                    <span>6 star Hackerrank</span>
                                </div>
                            </div>
                        </div>
                        {/* Summary Section */}
                        <div className="mb-6">
                            <h2 className="text-green-500 uppercase font-bold text-lg">Summary</h2>
                            <p className="mt-2">Currently Leading the Engineering Team @ Echor Tech.</p>
                            <ul className="list-disc list-inside mt-2">
                                <li>Scalable Backend Services</li>
                                <li>Multi Cloud (AWS, Digital Ocean, Azure, Firebase) - DevOps (CI-CD, Docker, Cloudformation, serverless)</li>
                                <li>Crypto and Blockchain</li>
                                <li>Leading the product team for product roadmap</li>
                                <li>100% documentation [product | technical | user]</li>
                                <li>Monolithic to MicroServices</li>
                                <li>Security First Approach</li>
                                <li>Attracting and mentoring talented developers</li>
                                <li>10x growth in team members</li>
                                <li>Establishing strong growth path for the team</li>
                                <li>Managing Hybrid Workspace (WFH and WFO) with high efficiency</li>
                            </ul>
                            <p className="mt-2">Tech Stack: AWS, Python, React. Solidity, Web3, Blockchain, Javascript, Docker</p>
                        </div>
                        {/* Skills Section */}
                        <div>
                            <h2 className="text-green-500 uppercase font-bold text-lg">Skills</h2>
                            <div className="mt-2">
                                <span>AWS • React • Backend</span>
                                <br />
                                <span>Python • Node • Rust</span>
                                <br />
                                <span>Blockchain • Quant</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className="w-2/3 bg-white p-4">
                    {/* Header Section */}
                    <div>
                        <h1 className="text-3xl font-bold uppercase">Sai Arun Munaganti</h1>
                        <h2 className="text-green-500 uppercase font-bold text-2xl mt-2">Solution Architect</h2>
                        <div className="flex items-center mt-2">
                            <FaUser className="text-green-500 mr-2" />
                            <span className="uppercase">6 + YOE (FULL STACK | DEVOPS | BLOCKCHAIN)</span>
                        </div>
                    </div>
                    {/* Experience Section */}
                    <div className="mt-6">
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">Echor Tech, Solution Architect</span>
                                <span>Hyderabad, India 09/2024 - Present</span>
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>Architect solutions using AWS, Backend.</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">Echor Tech, Software Engineer 3</span>
                                <span>Hyderabad, India 01/2023 - 09/2024</span>
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>Built and Scaled 3 key projects from ground-up and scaled to thousands of users while keeping cost down.</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">Echor Tech, Lead Developer</span>
                                <span>Hyderabad, India 12/2021 - 01/2023</span>
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>Built and Owned several crypto projects.</li>
                                <li>Most notably built a trading automation platform from scratch.</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">Grow Indigo Pvt. Ltd., Software Development Engineer</span>
                                <span>Mumbai, India 04/2021 - 12/2021</span>
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>Complete revamp of admin dashboard from asp.net to react and .net core micro services</li>
                                <li>Migrated all the services from own servers to AWS along with CI/CD setup and docker</li>
                                <li>Completed security audit and implemented IAM (identity and access management system) micro service for all the micro services</li>
                                <li>Implemented brand new referral and offers system</li>
                                <li>Scaled the application to thousands of users</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">GGK Tech, Software Engineer</span>
                                <span>Hyderabad, India 08/2020 - 04/2021</span>
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>physiologue.com</li>
                                <li>Worked as a full stack developer using .net core, react, mysql and redis</li>
                                <li>Worked on azure → CI/CD, deployments, serverless, multi environment setup</li>
                                <li>Improved the application load times significantly (query optimisation, cache, serverless)</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between">
                                <span className="font-bold">GGK Tech, Associate Software Engineer</span>
                                <span>Hyderabad, India 01/2019 - 08/2020</span>
                            </div>
                            <ul className="list-disc list-inside mt-2">
                                <li>fideliscare.org</li>
                                <li>pronto-delivery.com</li>
                            </ul>
                        </div>
                    </div>
                    {/* Education Section */}
                    <div className="mt-6">
                        <h2 className="text-green-500 uppercase font-bold text-lg flex items-center">
                            <FaGraduationCap className="text-green-500 mr-2" />
                            Education
                        </h2>
                        <div className="mt-2">
                            <span className="font-bold">JNTUH College of Engineering Hyderabad</span>
                            <br />
                            <span>Bachelor's degree, Computer Science & Engineering</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App