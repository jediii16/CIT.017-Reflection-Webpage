export const reflections = [
  {
    id: "1",
    reflectionNumber: 1,
    title: "Understanding the Layers of Information Security",
    shortTitle: "Foundations of Information Security",
    subtitle:
      "My reflection on the CIA Triad, AAA Framework, McCumber Cube, and Security Principles.",
    date: "July 31, 2026",
    topics: ["CIA Triad", "AAA Framework", "McCumber Cube"],
    locationLabel: "Zamboanga City, Philippines",
    coordinates: { latitude: 6.9214, longitude: 122.079 },
    status: "published",
    preview:
      "How the CIA Triad, AAA Framework, and security principles changed the way I think about building trustworthy systems.",
    pullQuote:
      "A system can calculate everything correctly and still fail to explain who did what, when, and with whose approval.",
    sections: [
      {
        id: "introduction",
        comicLabel: "ORIGIN STORY",
        heading: "Introduction",
        paragraphs: [
          "Before our discussion, I mostly connected information security with passwords, hackers, and stopping people from entering a system. Those ideas are still part of security, but the lesson helped me see that the subject is much wider. Information must not only be hidden from people who should not see it. It also needs to stay accurate, be available when authorized users need it, be accessed with the correct permission, and leave enough evidence for actions to be traced.",
          "This wider view made the topic feel more connected to actual system development. Security is not a single feature that can be switched on at the end of a project. It is a set of goals, decisions, and controls that affect how people use a system and how the system handles information. The CIA Triad, AAA Framework, McCumber Cube, and Security Principles gave me different ways to examine those decisions.",
        ],
      },
      {
        id: "strengthening-understanding",
        comicLabel: "NEW DISCOVERIES",
        heading: "Strengthening My Understanding of Security",
        paragraphs: [
          "We first reviewed the CIA Triad: Confidentiality, Integrity, and Availability. I understood confidentiality as protecting information from unauthorized viewing, integrity as keeping information correct and preventing improper changes, and availability as making sure systems and data can be reached when they are needed. What became clearer to me was that these are security goals. A system is not secure just because one of them is strong. Protecting confidentiality while making a service impossible for legitimate users to access would still create a serious problem.",
          "The AAA Framework also cleared up a confusion I often had. Authentication and Authorization sounded very similar to me, so I would sometimes mix them up. I now understand authentication as verifying who a user is, while authorization decides what that verified user is allowed to do. Accounting completes the framework by recording and tracking actions. That third part stood out because it connects security with accountability. Knowing that a change happened is less useful when the system cannot show which identity made it, when it happened, or what action was approved.",
        ],
      },
      {
        id: "mccumber-cube",
        comicLabel: "THE SECURITY MODEL",
        heading: "Understanding the McCumber Cube",
        paragraphs: [
          "The McCumber Cube helped organize these ideas into a model of information security. Instead of looking at one password, firewall, or rule by itself, the cube considers security goals, information states, and safeguards together. Information may be stored, processed, or transmitted. It may need confidentiality, integrity, and availability in each state. Protecting it can involve technology, policies and practices, and people through education and awareness.",
          "My main insight from the cube is that security has to be examined across several dimensions. A technical control may protect stored information but fail when that information is transmitted. A good policy may also fail when users do not understand it. I would like to study how development teams apply the McCumber Cube to a real project: whether they use it as a checklist, a risk-analysis tool, or a guide throughout design and testing. I am also interested in how teams balance goals when stronger controls reduce usability or availability.",
        ],
      },
      {
        id: "separation-of-duties",
        comicLabel: "MISSION: SEPARATION OF DUTIES",
        heading: "Learning Through Separation of Duties",
        paragraphs: [
          "At the end of our meeting, my partner Ysabel and I were assigned the Principle of Separation of Duties. We had to create a presentation slide about it. Working on the slide made the principle easier to understand because we had to explain why an important process should not be controlled completely by one person. Dividing sensitive responsibilities reduces the chance that a single person can make, approve, and hide an improper action.",
          "This principle seems especially useful in processes involving money, private records, or major system changes. One person may prepare a request while another approves it. The purpose is not simply to make a process longer. It is to create checks between roles and prevent excessive control. The activity showed me that user roles and approval paths are security decisions, not only administrative details.",
        ],
      },
      {
        id: "complete-mediation",
        comicLabel: "CASE FILE: COMPLETE MEDIATION",
        heading: "Applying Complete Mediation",
        paragraphs: [
          "During the week, we received another activity. We had to choose one of three scenarios and identify the Security Principle that deserved the most focus. I reviewed the slides made by my classmates so I could understand the other principles better. I chose Scenario 1 and answered Complete Mediation. In the next class, I learned that my answer was correct.",
          "The scenario involved salary adjustments that could not be explained. The records showed that changes had occurred, and the payroll calculations were still accurate, but the reports did not identify who approved the changes, which workstation was used, or when they were made. Auditors could not reconstruct the sequence of events. This helped me realize that correct output does not automatically mean a system is secure. The data may have integrity in the sense that the calculations are accurate, yet the process can still have a major weakness because it lacks traceability and accountability.",
          "I connected the case to Complete Mediation because each request to access or modify a resource should be checked for proper authorization instead of trusting only an earlier approval. However, Complete Mediation alone does not automatically create an audit trail. The missing evidence also points to logging, unique user identities, accountability, and the Accounting part of AAA. Several principles and controls can apply to the same weakness, which is why choosing only one principle for the scenario was challenging.",
        ],
      },
      {
        id: "next-mission",
        comicLabel: "NEXT MISSION",
        heading: "Concepts I Want to Explore Further",
        paragraphs: [
          "I still want to understand how Complete Mediation is implemented without making a system too slow. If authorization must be checked for every request, developers need a secure and efficient way to do it. I also want to explore the relationship between those repeated checks, audit logging, and accountability. They support one another, but they are not the same control.",
          "Other questions remain for me: How do organizations decide which Security Principles matter most for a particular system? How is the McCumber Cube used during actual development? How do teams balance stronger controls with usability and availability? These questions matter because security choices can affect both protection and the experience of legitimate users.",
        ],
      },
      {
        id: "the-obstacles",
        comicLabel: "THE OBSTACLES",
        heading: "Confusions and Challenges",
        paragraphs: [
          "One challenge was that some Security Principles overlap or appear to solve similar problems. Reading a definition was easier than recognizing how a principle should be implemented in a real system. The payroll case could benefit from Complete Mediation, Separation of Duties, stronger logging, and clearer accountability. The activity and my classmates' presentations helped because they placed the definitions beside practical situations and made the differences easier to notice.",
        ],
      },
      {
        id: "final-reflection",
        comicLabel: "TO BE CONTINUED...",
        heading: "Final Reflection",
        paragraphs: [
          "The lessons changed the way I view system development. Information security is not limited to stopping hackers, and it should not be added only after a system is completed. It needs to be considered while designing user roles, permissions, records, approvals, data handling, and system availability.",
          "The CIA Triad gives clear goals, AAA explains identity, permission, and accountability, and the McCumber Cube shows why one control or one viewpoint is not enough. Separation of Duties and Complete Mediation then show how those ideas can influence actual processes. I may still need more practice applying these concepts, but I now look at a system differently: not only by asking whether it works, but also whether its actions are properly authorized, accurate, available, and traceable.",
        ],
      },
    ],
  },
  {
    id: "2",
    reflectionNumber: 2,
    title: "Reflection 2",
    shortTitle: "Coming Soon",
    date: "Coming Soon",
    status: "coming-soon",
    preview: "A new information security reflection will be documented here.",
    sections: [],
  },
  {
    id: "3",
    reflectionNumber: 3,
    title: "Reflection 3",
    shortTitle: "Coming Soon",
    date: "Coming Soon",
    status: "coming-soon",
    preview: "A future information security reflection is waiting to be written.",
    sections: [],
  },
];

export const publishedReflections = reflections.filter(
  (reflection) => reflection.status === "published",
);

export function getReflectionById(id) {
  return reflections.find((reflection) => reflection.id === String(id));
}
