export const reflections = [
  {
    id: "1",
    term: "Midterms",
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
    term: "Midterms",
    reflectionNumber: 2,
    title: "Wait, That's Social Engineering?",
    shortTitle: "That's Social Engineering?",
    subtitle:
      "My reflection on threat categories and the many techniques and tactics used in social engineering.",
    date: "August 6, 2026",
    topics: ["Threat Categories", "Social Engineering", "Security Awareness"],
    locationLabel: "New York City, United States",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
    status: "published",
    preview:
      "Apparently, those people sending messages about me winning this and that have a name: social engineers.",
    pullQuote:
      "Those who send me messages about me winning this and that are actually using something called social engineering.",
    sections: [
      {
        id: "introduction",
        comicLabel: "SO THAT'S WHAT IT'S CALLED",
        heading: "Introduction",
        paragraphs: [
          "Learning about the categories of threats and social engineering techniques and tactics was pretty interesting. Before this lesson, I did not know that hackers, or those who send me messages about me winning this and that, were doing something that actually had a name: social engineering. I just thought of them as random scam messages.",
          "Finding out that there was a whole topic behind these messages made me go, \"Ohhh, so that is what it is called.\" It also made the lesson easier to connect to things I have already seen online.",
        ],
      },
      {
        id: "watching-social-engineers",
        comicLabel: "CAUGHT IN ACTION",
        heading: "Watching Social Engineers at Work",
        paragraphs: [
          "During our classes, we watched multiple videos showing different social engineers and how easy it seemed for them to do it. Honestly, it was impressive. Watching them made the topic more interesting because we could actually see what they were doing instead of only reading definitions about it.",
        ],
      },
      {
        id: "categories-of-threats",
        comicLabel: "MEMORY RESTORED",
        heading: "Remembering the Categories of Threats",
        paragraphs: [
          "We were also taught about the different categories of threats. The lesson was great, but I honestly forgot some of it afterward. It was during our third activity that I was able to recall some of the categories again.",
          "I even managed to secure second place in that activity, so I guess the information was still somewhere in my head. I just needed the activity to bring it back.",
        ],
      },
      {
        id: "techniques-and-tactics",
        comicLabel: "OH, THAT'S A TECHNIQUE",
        heading: "Techniques and Tactics",
        paragraphs: [
          "The techniques were also interesting because I did not know there were so many of them. Some would make me think, \"Ohhh, so it is a technique,\" because I had seen or heard about something similar before without knowing what it was called.",
          "The tactics were interesting too. We had a small activity where we had to identify what kind of tactic the social engineers used in the videos we watched. It was a nice way to check if we actually understood what was happening in each video.",
        ],
      },
      {
        id: "confusions-and-challenges",
        comicLabel: "THE OBSTACLES",
        heading: "Confusions and Challenges",
        paragraphs: [
          "My main confusion was that some of the categories and techniques seemed quite similar. There were times when I was not sure which one was which. Ma'am Maureen tried to explain them thoroughly to us, but there are still some that I need to read more about to fully clear up my confusion.",
        ],
      },
      {
        id: "final-reflection",
        comicLabel: "TO BE CONTINUED...",
        heading: "Final Reflection",
        paragraphs: [
          "Overall, I want to learn more about the different techniques, how they are really done in real life, and if they are actually as possible or as easy to do as they looked in the videos. The topic was fun to learn about, especially when I started recognizing that things I had already seen were actually social engineering techniques.",
          "I still need to review the categories and techniques that seem similar, but the activities helped me remember the lesson better. At least now, the next time someone tells me that I won something I never joined, I know there is a name for what they are trying to do.",
        ],
      },
    ],
  },
  {
    id: "3",
    term: "Midterms",
    reflectionNumber: 3,
    title: "Reflection 3",
    shortTitle: "Currently Unavailable",
    date: "Currently Unavailable",
    status: "unavailable",
    preview: "A future information security reflection is waiting to be written.",
    sections: [],
  },
  {
    id: "final-1",
    term: "Finals",
    reflectionNumber: 1,
    title: "Reflection 1",
    shortTitle: "Currently Unavailable",
    date: "Currently Unavailable",
    status: "unavailable",
    preview: "This finals reflection is not available yet.",
    sections: [],
  },
  {
    id: "final-2",
    term: "Finals",
    reflectionNumber: 2,
    title: "Reflection 2",
    shortTitle: "Currently Unavailable",
    date: "Currently Unavailable",
    status: "unavailable",
    preview: "This finals reflection is not available yet.",
    sections: [],
  },
  {
    id: "final-3",
    term: "Finals",
    reflectionNumber: 3,
    title: "Reflection 3",
    shortTitle: "Currently Unavailable",
    date: "Currently Unavailable",
    status: "unavailable",
    preview: "This finals reflection is not available yet.",
    sections: [],
  },
  {
    id: "final-4",
    term: "Finals",
    reflectionNumber: 4,
    title: "Reflection 4",
    shortTitle: "Currently Unavailable",
    date: "Currently Unavailable",
    status: "unavailable",
    preview: "This finals reflection is not available yet.",
    sections: [],
  },
];

export const publishedReflections = reflections.filter(
  (reflection) => reflection.status === "published",
);

export function getReflectionById(id) {
  return reflections.find((reflection) => reflection.id === String(id));
}
