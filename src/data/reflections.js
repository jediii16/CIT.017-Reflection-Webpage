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
    title: "Recognizing Threats and Social Engineering",
    shortTitle: "Threats and Social Engineering",
    subtitle:
      "My reflection on threat categories, social engineering techniques, and the tactics used to influence people.",
    date: "August 6, 2026",
    topics: ["Threat Categories", "Social Engineering", "Security Awareness"],
    locationLabel: "Sydney, Australia",
    coordinates: { latitude: -33.8688, longitude: 151.2093 },
    status: "published",
    preview:
      "How learning the names behind familiar scams helped me recognize the many ways social engineers manipulate people.",
    pullQuote:
      "Learning the names of these techniques changed familiar scams from random suspicious messages into threats I could recognize and examine.",
    sections: [
      {
        id: "introduction",
        comicLabel: "A FAMILIAR THREAT",
        heading: "Introduction",
        paragraphs: [
          "Learning about the categories of threats and the techniques and tactics of social engineering was interesting because it gave names to situations I had already encountered. Before this lesson, I did not know that messages claiming I had won a prize or offering something too good to be true were examples of social engineering. I only saw them as suspicious messages. Understanding the concept helped me realize that attackers do not always begin by breaking into a computer system. They can target people and persuade them to reveal information, trust a false story, or take an unsafe action.",
          "This made the topic feel practical and close to everyday life. Social engineering is not only an idea discussed in cybersecurity. It can appear in an ordinary message, call, conversation, or online interaction. Recognizing that connection made me more curious about how these attacks are planned and why they can be convincing.",
        ],
      },
      {
        id: "watching-social-engineers",
        comicLabel: "CAUGHT IN ACTION",
        heading: "Watching Social Engineers at Work",
        paragraphs: [
          "During our classes, we watched several videos showing social engineers using different approaches. I was surprised by how easily they could influence people and obtain what they wanted. Their ability to sound confident, build trust, and guide a conversation was honestly impressive, even though the purpose behind those skills can be harmful.",
          "The videos helped me understand that successful social engineering depends on more than a technical trick. It also depends on observing how people react and knowing how to make a request sound believable. Seeing the tactics in action made the lesson clearer than definitions alone because I could examine what the social engineer said, how the target responded, and why the interaction worked.",
        ],
      },
      {
        id: "categories-of-threats",
        comicLabel: "THREAT FILES",
        heading: "Remembering the Categories of Threats",
        paragraphs: [
          "We also studied the different categories of threats. I understood them during the discussion, but I honestly forgot some of them afterward. The third activity became an opportunity to recall what I had learned and apply it again. As I worked through the activity, some of the ideas returned and became easier to recognize.",
          "My partner Ysa and I were able to secure second place in that activity, which showed us that we had remembered more than we initially thought. It also reminded me that learning does not always happen after hearing a concept once. Recalling information during an activity can strengthen it and reveal which parts I understand and which parts still need review.",
        ],
      },
      {
        id: "techniques-and-tactics",
        comicLabel: "THE ATTACKER'S PLAYBOOK",
        heading: "Understanding Techniques and Tactics",
        paragraphs: [
          "I did not expect social engineering to include so many techniques. While learning about them, I often found myself thinking, \"Oh, so that is a technique.\" Actions that once seemed like unrelated scams or suspicious behavior began to fit into recognizable patterns. Learning those patterns is useful because it gives me a better way to describe what an attacker is trying to do instead of only relying on a general feeling that something is wrong.",
          "The tactics were interesting as well. In one small activity, we had to identify the kind of tactic used by the social engineers in the videos we watched. The exercise required us to look beyond the result and pay attention to how the attacker influenced the target. It helped connect the vocabulary from the lesson with actual behavior.",
        ],
      },
      {
        id: "confusions-and-challenges",
        comicLabel: "THE OBSTACLES",
        heading: "Confusions and Challenges",
        paragraphs: [
          "My main challenge was distinguishing between categories and techniques that seemed similar. Some of them appeared to overlap, so I was not always sure which label best matched a situation. Ma'am Maureen explained the differences thoroughly during the third activity, but there are still a few concepts that I need to read about again before the distinctions become completely clear.",
          "This confusion showed me that memorizing the names is not enough. I need to compare their purposes, methods, and examples so I can explain why one technique fits a situation better than another. More practice with realistic scenarios would help me recognize those differences with greater confidence.",
        ],
      },
      {
        id: "questions-to-explore",
        comicLabel: "NEXT INVESTIGATION",
        heading: "What I Want to Explore Further",
        paragraphs: [
          "I want to learn more about how social engineering techniques are actually carried out in real situations and whether the examples that look easy in videos work as smoothly in real life. I am curious about how social engineers prepare, how they choose an approach for a particular target, and how they adjust when someone becomes suspicious or refuses to cooperate.",
          "I also want to learn how people and organizations can respond without depending only on technical security tools. Since social engineering targets human judgment, awareness and careful verification seem just as important as software. Understanding both the attacker's method and the defender's response would make the topic more complete for me.",
        ],
      },
      {
        id: "final-reflection",
        comicLabel: "LESSON LEARNED",
        heading: "Final Reflection",
        paragraphs: [
          "Overall, this lesson changed how I interpret suspicious interactions. Messages about prizes and unexpected offers are no longer just random annoyances to me. They are possible attempts to influence a person through a planned technique or tactic. The class videos and activities made that idea easier to understand because they showed how the concepts can appear in practice.",
          "Placing second in the third activity was encouraging, but the lesson also showed me where I still need improvement. I want to review the similar categories and techniques, study more real-life examples, and become better at identifying the specific tactic being used. The most important insight I gained is that protecting information requires understanding people as well as technology, because sometimes the easiest way into a secure system is through the person using it.",
        ],
      },
    ],
  },
  {
    id: "final-1",
    term: "Finals",
    reflectionNumber: 1,
    title: "Risk Assessment",
    shortTitle: "Risk Assessment",
    subtitle:
      "My reflection on identifying information assets, understanding their value, and preparing for an Information Security Audit.",
    date: "November 5, 2026",
    topics: ["Information Assets", "Asset Valuation", "Risk Assessment Matrix"],
    locationLabel: "Tokyo, Japan",
    coordinates: { latitude: 35.6895, longitude: 139.6917 },
    status: "published",
    preview:
      "How classroom activities, group research, and Ma'am Maureen's feedback helped me understand risk assessment step by step.",
    pullQuote:
      "Learning to group information assets before evaluating them helped me see why understanding what we are assessing matters from the very beginning.",
    sections: [
      {
        id: "introduction",
        comicLabel: "A NEW INVESTIGATION",
        heading: "Learning About Risk Assessment",
        paragraphs: [
          "Learning about risk assessment was honestly fun, although I became confused partway through the lessons. There were several ideas to understand, and I could not immediately connect all of them. Ma'am Maureen's explanations helped me understand the topic better as we continued discussing it and applying it through activities.",
        ],
      },
      {
        id: "identifying-information-assets",
        comicLabel: "IDENTIFYING THE ASSETS",
        heading: "Learning from Our Board Activity",
        paragraphs: [
          "During our early meetings, we had a short board activity based on a scenario. We chose an office and had to list some of its information assets. My group and I analyzed the situation and selected the assets that we could identify most easily. I was the one who wrote our answers on the board.",
          "Ma'am Maureen told us that our answer was close, but explained that we needed to group the assets into more general categories first instead of listing each one individually. Her feedback was encouraging and helped us recognize what we needed to improve. That activity became an important starting point for me because it showed that identifying information assets also requires thinking about how to organize them.",
        ],
      },
      {
        id: "understanding-asset-valuation",
        comicLabel: "WEIGHING THE VALUE",
        heading: "Understanding Classification and Valuation",
        paragraphs: [
          "As the discussions continued, we learned about security classification rubrics, valuation criteria, scoring scales, and weights. We also discussed how values are computed and which classification the results fall under. This was one of the parts that became confusing for me because I had to understand both the criteria and how they were used in the computation.",
          "Working through these ideas with Ma'am Maureen's guidance helped me connect the steps more clearly. I began to understand why we needed to identify and organize the information assets before moving on to evaluating them. The activities made the process easier to follow than trying to understand all the terms at once.",
        ],
      },
      {
        id: "group-presentation",
        comicLabel: "THE GROUP MISSION",
        heading: "Preparing and Presenting Our Work",
        paragraphs: [
          "In the following meetings, we were tasked with preparing a presentation. We needed a complete list of information assets based on the scenario, possible criteria for setting the value of information, and a possible formula for computing that value. My groupmates and I worked together on the PowerPoint presentation, did research, and checked book references for information that could help us.",
          "The preparation was enjoyable because we were learning more about the topic while creating the presentation. We had to think through our choices and explain them as a group. The learning continued after we presented, when Ma'am Maureen shared her insights and pointed out what we could improve. Her feedback helped us review our work and understand the parts that needed more attention.",
        ],
      },
      {
        id: "matrix-and-audit",
        comicLabel: "MAPPING THE NEXT STEPS",
        heading: "From the Risk Assessment Matrix to the Audit",
        paragraphs: [
          "Later, we learned more about the Risk Assessment Matrix and how to map out the assessment. This added another part to the process we had been studying. We then began preparing for our final project, which was to create an Information Security Audit.",
          "We had a whole session where Ma'am Maureen explained what each section of the audit should contain and what other sections could potentially include. That discussion helped me understand what we needed to prepare and how the project would build on the lessons and activities we had already completed.",
        ],
      },
      {
        id: "final-reflection",
        comicLabel: "LESSON LEARNED",
        heading: "Final Reflection",
        paragraphs: [
          "Looking back, the board activity, group presentation, and class discussions each helped me understand a different part of risk assessment. I did not understand everything immediately, but receiving feedback and working through the tasks with my group made the confusing parts more manageable.",
          "The experience reminded me that understanding a process takes practice. Even our first answer on the board gave us something useful to learn from. As we prepared for the Information Security Audit, I could see how identifying assets, considering their value, and mapping the assessment were connected parts of the work ahead.",
        ],
      },
    ],
  },
  {
    id: "final-2",
    term: "Finals",
    reflectionNumber: 2,
    title: "Information Security Audit: Our Project Journey",
    shortTitle: "Information Security Audit",
    subtitle:
      "My reflection on finding an office, conducting an interview, and preparing our Information Security Audit through setbacks and deadlines.",
    date: "November 8, 2026",
    topics: ["Information Security Audit", "Information Gathering", "Project Scope"],
    locationLabel: "Singapore",
    coordinates: { latitude: 1.3521, longitude: 103.8198 },
    status: "published",
    preview:
      "From our first plans with ACCA to our interview with the Infirmary, this project taught me about teamwork, adapting our plans, and supporting our report with evidence.",
    pullQuote:
      "Even when a detail could make our audit report more complete, we did not want to include it without enough information to explain what actually happened.",
    sections: [
      {
        id: "forming-the-group",
        comicLabel: "THE MISSION BEGINS",
        heading: "Forming Our Group and Choosing ACCA",
        paragraphs: [
          "On October 16, while we were having a class with Sir Aleek in the Basic Computer Lab, we officially formed our group for the Information Security Audit project: me, Tenorio, together with Atienza and Nepthalie Tadifa. I suggested ACCA as our first choice of office. We already had a connection with Ma'am Perilyn through our NSTP experience during our first year, so I thought we would feel more comfortable approaching her, asking questions, and conducting an interview.",
          "I was also interested in learning about ACCA's information assets because the office handles arts and culture. I thought that would make our project unique and give us something interesting to study. At that point, I felt hopeful about our choice and excited to learn more about how their office worked.",
        ],
      },
      {
        id: "approaching-acca",
        comicLabel: "THE FIRST LEAD",
        heading: "Our First Interview and Request for Approval",
        paragraphs: [
          "On October 18, we messaged Ma'am Perilyn to ask whether we could visit her office, discuss our project, and possibly choose ACCA for the audit. We also reviewed Ma'am Maureen's guidelines together so we could understand what we needed from the office and prepare the right questions. After receiving permission to visit, we went the following day.",
          "The interview initially gave us a good feeling about the project. Ma'am Perilyn mentioned records of stored artworks, students, and organizations they had collaborated with, among other information. She was open to helping us, but explained that proceeding would still depend on approval from their boss. We prepared a formal letter so we could provide it the next day and continue with the request.",
        ],
      },
      {
        id: "changing-offices",
        comicLabel: "AN UNEXPECTED TURN",
        heading: "Recognizing What Was Beyond Our Scope",
        paragraphs: [
          "Waiting for a response took longer than we expected. On October 22, our group began drafting the parts we could already work on, including background information about ACCA from AdZU's website and an introduction to the audit. On the same day, Nepthalie received an update after speaking with Sir Epino and explaining more fully what we needed from the office.",
          "The update was disappointing. From what Nepthalie relayed to us, mapping the assets would be difficult because each painting was unique. The office also requested an Inventory Management System in exchange for the information assets we needed for the project. Although creating a system seemed doable, it would require additional work while finals week was approaching. It also felt unfair to take on that requirement because developing a system was outside the scope of our audit project.",
          "I was on retreat from October 21 to 23, so I was not able to follow every development as it happened. We had made plans beforehand to keep the project moving, but when I read Nepthalie's messages afterward, I felt sad about how things had turned out. My groupmates had been discussing whether to accept the additional work and were waiting for my response. I also declined and suggested that we look for another office instead. This experience made me realize that choosing a project partner also means checking whether their expectations fit the work we are actually required and able to do.",
        ],
      },
      {
        id: "finding-another-office",
        comicLabel: "SEARCHING FOR A NEW LEAD",
        heading: "Finding Another Office Under Time Pressure",
        paragraphs: [
          "On October 23, we discussed our next plan. I suggested the Infirmary, Guidance, and SACSI, while my groupmates also suggested the Library. We held a short vote, and the Infirmary became our first choice, with Guidance coming second. To improve our chances of securing an office, we decided to inquire at both.",
          "We had to wait until Monday, October 26, to visit, and the time we had left was already making us stressed. Unfortunately, neither office's head or coordinator was available when we arrived because they were attending a monthly reporting session with the VP Admin. The personnel at the Infirmary advised us to return on Wednesday, October 28, when they were usually free. At Guidance, we were told to return on Friday, October 30, for an interview. It was frustrating to face another delay, but at least we had possible schedules to work with.",
        ],
      },
      {
        id: "infirmary-interview",
        comicLabel: "GATHERING THE EVIDENCE",
        heading: "Interviewing the Infirmary",
        paragraphs: [
          "On October 28, we finally had the opportunity to interview the Infirmary. The interview went fairly well and lasted around one and a half to two hours. We gathered a lot of information that we could use in our audit report, which was a relief after the difficulties we had experienced while looking for an office.",
          "We still planned to attend the Guidance interview so we could compare which office would be a better fit for the report. However, classes were suspended on Friday, October 30, and the interview had to be postponed. The following week became busy with other final projects and preparation for a final exam in another course, so we were unable to return to Guidance. We decided to proceed with the Infirmary and focus on preparing the audit report using the information we had gathered.",
        ],
      },
      {
        id: "writing-the-audit",
        comicLabel: "CHECKING THE CASE FILE",
        heading: "Writing Only What We Could Support",
        paragraphs: [
          "Writing the report brought another challenge: we realized that we had not asked for enough detail about some incidents mentioned during the interview. We needed clearer explanations of what had happened and what actions had been taken. Those incidents could have been useful additions, but we did not have enough information to describe them properly.",
          "We decided to leave those details out rather than make up scenarios or fill in the gaps with assumptions. That decision reminded me how important follow-up questions are when gathering information for an audit. A long interview can provide a lot of material, but it does not automatically mean every detail is complete. We also continued researching while preparing the report because we wanted to submit good work to Ma'am Maureen.",
        ],
      },
      {
        id: "deadline-and-final-checks",
        comicLabel: "THE FINAL STRETCH",
        heading: "The Extension and Our Final Checks",
        paragraphs: [
          "The original submission date was November 6. By then, we were almost finished with the report, but an exam that day meant we were heading home late. We happened to meet Ma'am Maureen on our way home and asked whether an extension would be possible. Thankfully, she gave us until November 8, which allowed us more time to review our work carefully.",
          "On November 7, we made final checks, clarified details, and reviewed our audio recordings to make sure we had understood the interview correctly. Today, November 8, we are checking the report again, especially its formatting and whether it follows the requirements in the guidelines. After everything that happened during the project, we want to make sure our final work reflects the information we gathered as accurately as possible.",
        ],
      },
      {
        id: "final-reflection",
        comicLabel: "LESSONS FROM THE MISSION",
        heading: "Final Reflection",
        paragraphs: [
          "This project was honestly stressful, especially when our first choice of office did not work out and our remaining time became shorter. Still, it taught me that preparing an Information Security Audit involves more than writing the report. We had to communicate with offices, explain the project, adjust our plans, divide the work, and make decisions about what we could realistically complete.",
          "The experience also showed me what I would improve next time: confirm an office's expectations early, prepare more detailed follow-up questions, and leave enough time for clarification after an interview. Most of all, I learned to be careful about the information we include. Even when a detail could make our audit report more complete, we did not want to include it without enough information to explain what actually happened. As we continue our final checks, that is one of the lessons I will carry forward from this project.",
        ],
      },
    ],
  },
];

export const publishedReflections = reflections.filter(
  (reflection) => reflection.status === "published",
);

export function getReflectionById(id) {
  return reflections.find((reflection) => reflection.id === String(id));
}
