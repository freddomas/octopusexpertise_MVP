export type Locale = "fr" | "en";

export type PageSection = {
  title: string;
  text: string;
  items?: string[];
};

export type PublicPage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PageSection[];
  notice?: string;
};

export const isLocale = (value: string): value is Locale =>
  value === "fr" || value === "en";

export const pathFor = (locale: Locale, slug = "") =>
  `/${locale}${slug ? `/${slug}` : ""}`;

export const navigation = {
  fr: [
    ["Expertises", "expertises"],
    ["Secteurs", "secteurs"],
    ["Méthode", "methode"],
    ["Réseau partenaires", "reseau-partenaires"],
    ["Qualité", "qualite-conformite"],
    ["Insights", "insights"],
    ["À propos", "a-propos"],
  ],
  en: [
    ["Expertise", "expertises"],
    ["Sectors", "secteurs"],
    ["Method", "methode"],
    ["Partner network", "reseau-partenaires"],
    ["Quality", "qualite-conformite"],
    ["Insights", "insights"],
    ["About", "a-propos"],
  ],
} satisfies Record<Locale, [string, string][]>;

const frHome = {
  utility: "Connexion",
  menuOpen: "Ouvrir le menu",
  menuClose: "Fermer le menu",
  mobileNav: "Navigation mobile",
  primaryCta: "Confier un besoin",
  partnerCta: "Rejoindre le réseau",
  contactCta: "Nous contacter",
  hero: "Au centre de l'interaction métier",
  footerStatement:
    "Un interlocuteur unique pour coordonner des capacités multisectorielles.",
  operationalProof: [
    "Besoin cadré",
    "Capacités qualifiées",
    "Exécution coordonnée",
    "Livrables contrôlés",
  ],
  valueEyebrow: "Une interface. Plusieurs métiers.",
  valueTitle:
    "Une seule interface pour des besoins qui dépassent un seul métier.",
  valueText:
    "Lorsque plusieurs compétences, fournisseurs et contraintes doivent avancer ensemble, la dispersion devient un risque. Octopus Expertise centralise le cadrage, la sélection des capacités, les échanges et le suivi afin que chaque intervenant contribue au même résultat.",
  pillars: [
    [
      "Clarifier",
      "Transformer le besoin en exigences, priorités et livrables.",
    ],
    [
      "Mobiliser",
      "Identifier les entreprises et experts adaptés à la mission.",
    ],
    ["Piloter", "Organiser les décisions, jalons, documents et validations."],
  ],
  orchestrationEyebrow: "Le système d’exécution",
  orchestrationTitle: "Pas un annuaire. Une couche d’orchestration.",
  orchestrationText:
    "Le réseau n’a de valeur que s’il peut être activé avec méthode. Sélectionnez une étape pour voir le contrôle appliqué.",
  orchestration: [
    [
      "Besoin",
      "Clarifier le résultat attendu",
      "Contexte et contraintes",
      "Brief initial structuré",
    ],
    [
      "Qualification",
      "Rendre la demande exploitable",
      "Critères et responsabilités",
      "Périmètre qualifié",
    ],
    [
      "Capacités requises",
      "Identifier les compétences nécessaires",
      "Adéquation au besoin",
      "Matrice de capacités",
    ],
    [
      "Partenaires éligibles",
      "Retenir les contributeurs pertinents",
      "Documents et disponibilité",
      "Sélection argumentée",
    ],
    [
      "Proposition",
      "Aligner solution et engagements",
      "Livrables et gouvernance",
      "Proposition cohérente",
    ],
    [
      "Mission",
      "Coordonner décisions et jalons",
      "Risques et communication",
      "Exécution visible",
    ],
    [
      "Livrables validés",
      "Vérifier le résultat",
      "Réception et corrections",
      "Clôture maîtrisée",
    ],
  ],
  panelLabels: ["Objectif", "Contrôle", "Résultat"],
  capabilitiesEyebrow: "Capacités mobilisables",
  capabilitiesTitle:
    "Un portefeuille multisectoriel. Une même discipline d’exécution.",
  capabilitiesText:
    "Capacités mobilisables via le réseau Octopus Expertise, selon le besoin et les exigences de contrôle.",
  capabilities: [
    "Technologies et infrastructures numériques",
    "Ingénierie, construction et installations techniques",
    "Maintenance industrielle et performance des actifs",
    "Énergie et continuité opérationnelle",
    "Achats, supply chain et logistique",
    "Opérations minières et services de site",
    "QHSE, qualité et conformité",
    "Capital humain, formation et services aux entreprises",
  ],
  sectorsEyebrow: "Contextes métier",
  sectorsTitle: "Une méthode commune, adaptée aux réalités de chaque secteur.",
  sectors: [
    "Mines et métaux",
    "Industrie et production",
    "Énergie et utilities",
    "Construction et infrastructures",
    "Technologies et télécommunications",
    "Logistique et commerce",
    "Entreprises, institutions et organisations",
    "Médecine",
  ],
  methodEyebrow: "Six étapes, un interlocuteur",
  methodTitle:
    "Vous gardez un interlocuteur unique. Nous coordonnons le reste.",
  method: [
    ["Comprendre", "Objectif, environnement, contraintes et urgence."],
    ["Cadrer", "Exigences, critères, livrables et responsabilités."],
    ["Mobiliser", "Capacités, partenaires et ressources éligibles."],
    ["Structurer", "Solution, proposition, engagements et gouvernance."],
    ["Piloter", "Décisions, risques, jalons, documents et communication."],
    ["Valider", "Réception, corrections, approbations et clôture."],
  ],
  networkEyebrow: "Réseau partenaires",
  networkTitle: "Un réseau construit pour l’exécution, pas pour la vitrine.",
  networkText:
    "Les entreprises partenaires sont évaluées selon leurs capacités, leur couverture, leurs documents, leurs références et leur performance. Les informations critiques doivent rester à jour.",
  networkAxes: [
    "Identité légale",
    "Capacités et secteurs",
    "Couverture",
    "Conformité documentaire",
    "Disponibilité",
    "Performance",
  ],
  territoryEyebrow: "Couverture",
  territoryTitle:
    "Ancrés dans les réalités du Lualaba et du Haut-Katanga. Connectés aux capacités utiles en RDC et en Afrique.",
  territoryText:
    "La mobilisation s’organise à partir du contexte de la mission, sans inventer de présence physique ou de bureau.",
  platformEyebrow: "Visibilité",
  platformTitle:
    "Une visibilité continue sur les demandes, décisions et livrables.",
  platformText:
    "La présentation publique reste volontairement limitée aux principes validés. Aucune interface fictive n’est utilisée comme preuve opérationnelle.",
  qualityEyebrow: "Contrôles visibles",
  qualityTitle:
    "La confiance ne se décrète pas. Elle se construit par des contrôles visibles.",
  quality: [
    "Qualification des intervenants",
    "Confidentialité des informations",
    "Séparation des accès",
    "Historique des décisions",
    "Contrôle des documents",
    "Validation des livrables",
  ],
  finalTitle: "Transformons votre besoin en mission maîtrisée.",
  finalText:
    "Décrivez le résultat attendu, les contraintes et le contexte. L’équipe structurera la prochaine étape avec vous.",
};

const enHome: typeof frHome = {
  utility: "Sign in",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  mobileNav: "Mobile navigation",
  primaryCta: "Submit a need",
  partnerCta: "Join the network",
  contactCta: "Contact us",
  hero: "Your business gateway",
  footerStatement:
    "One gateway to coordinate qualified multisector capabilities.",
  operationalProof: [
    "Need framed",
    "Capabilities qualified",
    "Delivery coordinated",
    "Deliverables controlled",
  ],
  valueEyebrow: "One interface. Multiple disciplines.",
  valueTitle: "One interface for needs that go beyond a single discipline.",
  valueText:
    "When several capabilities, suppliers and constraints must move together, fragmentation becomes a risk. Octopus Expertise centralises framing, capability selection, communication and monitoring so every contributor works towards the same result.",
  pillars: [
    [
      "Clarify",
      "Turn the need into requirements, priorities and deliverables.",
    ],
    ["Mobilise", "Identify the companies and experts suited to the mission."],
    ["Steer", "Organise decisions, milestones, documents and approvals."],
  ],
  orchestrationEyebrow: "The delivery system",
  orchestrationTitle: "Not a directory. An orchestration layer.",
  orchestrationText:
    "A network only creates value when it can be activated methodically. Select a stage to see the control applied.",
  orchestration: [
    [
      "Need",
      "Clarify the expected outcome",
      "Context and constraints",
      "Structured initial brief",
    ],
    [
      "Qualification",
      "Make the request actionable",
      "Criteria and responsibilities",
      "Qualified scope",
    ],
    [
      "Required capabilities",
      "Identify the necessary skills",
      "Fit with the need",
      "Capability matrix",
    ],
    [
      "Eligible partners",
      "Retain relevant contributors",
      "Documents and availability",
      "Reasoned selection",
    ],
    [
      "Proposal",
      "Align solution and commitments",
      "Deliverables and governance",
      "Coherent proposal",
    ],
    [
      "Mission",
      "Coordinate decisions and milestones",
      "Risks and communication",
      "Visible delivery",
    ],
    [
      "Validated deliverables",
      "Verify the result",
      "Acceptance and corrections",
      "Controlled closure",
    ],
  ],
  panelLabels: ["Objective", "Control", "Result"],
  capabilitiesEyebrow: "Mobilisable capabilities",
  capabilitiesTitle: "A multisector portfolio. One delivery discipline.",
  capabilitiesText:
    "Capabilities mobilisable through the Octopus Expertise network, according to the need and control requirements.",
  capabilities: [
    "Digital technologies and infrastructure",
    "Engineering, construction and technical installations",
    "Industrial maintenance and asset performance",
    "Energy and operational continuity",
    "Procurement, supply chain and logistics",
    "Mining operations and site services",
    "HSE, quality and compliance",
    "Human capital, training and business services",
  ],
  sectorsEyebrow: "Business contexts",
  sectorsTitle: "One method, adapted to the realities of each sector.",
  sectors: [
    "Mining and metals",
    "Industry and production",
    "Energy and utilities",
    "Construction and infrastructure",
    "Technology and telecommunications",
    "Logistics and trade",
    "Companies, institutions and organisations",
    "Healthcare",
  ],
  methodEyebrow: "Six stages, one point of contact",
  methodTitle: "You keep one point of contact. We coordinate the rest.",
  method: [
    ["Understand", "Objective, environment, constraints and urgency."],
    ["Frame", "Requirements, criteria, deliverables and responsibilities."],
    ["Mobilise", "Eligible capabilities, partners and resources."],
    ["Structure", "Solution, proposal, commitments and governance."],
    ["Steer", "Decisions, risks, milestones, documents and communication."],
    ["Validate", "Acceptance, corrections, approvals and closure."],
  ],
  networkEyebrow: "Partner network",
  networkTitle: "A network built for delivery, not display.",
  networkText:
    "Partner companies are assessed according to their capabilities, coverage, documents, references and performance. Critical information must remain current.",
  networkAxes: [
    "Legal identity",
    "Capabilities and sectors",
    "Coverage",
    "Document compliance",
    "Availability",
    "Performance",
  ],
  territoryEyebrow: "Coverage",
  territoryTitle:
    "Rooted in the realities of Lualaba and Haut-Katanga. Connected to useful capabilities in the DRC and Africa.",
  territoryText:
    "Mobilisation is organised around the mission context, without inventing a physical presence or office.",
  platformEyebrow: "Visibility",
  platformTitle:
    "Continuous visibility across requests, decisions and deliverables.",
  platformText:
    "The public presentation is deliberately limited to validated principles. No fictional interface is used as operational proof.",
  qualityEyebrow: "Visible controls",
  qualityTitle: "Trust is not declared. It is built through visible controls.",
  quality: [
    "Contributor qualification",
    "Information confidentiality",
    "Access separation",
    "Decision history",
    "Document control",
    "Deliverable validation",
  ],
  finalTitle: "Turn your need into a controlled mission.",
  finalText:
    "Describe the expected result, constraints and context. The team will structure the next step with you.",
};

export const homeContent = { fr: frHome, en: enHome };

const commonPages: Record<Locale, Record<string, PublicPage>> = {
  fr: {
    expertises: {
      eyebrow: "Expertises",
      title: "Les capacités nécessaires, réunies autour de votre objectif.",
      intro:
        "Explorez les domaines mobilisables par Octopus Expertise. Chaque intervention est structurée selon le besoin, les compétences disponibles et les exigences de contrôle.",
      sections: [
        {
          title: "Portefeuille",
          text: frHome.capabilitiesText,
          items: frHome.capabilities,
        },
        {
          title: "Mobilisation",
          text: "Le besoin est cadré avant toute sélection de capacités ou de partenaires.",
        },
        {
          title: "Règle de vérité",
          text: "Capacités mobilisables via le réseau Octopus Expertise.",
        },
      ],
      notice:
        "Les règles de filtrage et les données sources restent à spécifier.",
    },
    secteurs: {
      eyebrow: "Secteurs",
      title:
        "Des expertises adaptées aux contraintes réelles de votre secteur.",
      intro:
        "Les exigences de sécurité, de continuité, de conformité et de mobilisation diffèrent selon les environnements. Octopus Expertise relie le besoin aux capacités pertinentes et structure leur coordination.",
      sections: [
        {
          title: "Contextes initiaux",
          text: "Une méthode commune s’adapte aux enjeux de chaque environnement.",
          items: frHome.sectors,
        },
        {
          title: "Approche",
          text: "Les enjeux, capacités, contraintes et contrôles sont cadrés pour chaque mission.",
        },
      ],
      notice: "Le modèle des pages sectorielles détaillées reste à spécifier.",
    },
    methode: {
      eyebrow: "Méthode",
      title: "De l’expression du besoin à la validation du résultat.",
      intro:
        "Une mission multisectorielle exige plus qu’une mise en relation. Elle exige un cadrage, des critères, des responsabilités, des jalons et des preuves de livraison.",
      sections: [
        {
          title: "Six étapes",
          text: "Un parcours lisible maintient chaque intervenant aligné.",
          items: frHome.method.map(([title, text]) => `${title} — ${text}`),
        },
        {
          title: "Contrôle",
          text: "Les décisions, risques, documents, écarts et livrables sont suivis au niveau adapté à la mission.",
        },
        {
          title: "Responsabilités",
          text: "Le client, Octopus Expertise et les partenaires conservent des rôles définis et visibles.",
        },
      ],
    },
    "reseau-partenaires": {
      eyebrow: "Réseau partenaires",
      title: "Un réseau qualifié selon les exigences de chaque mission.",
      intro:
        "Octopus Expertise identifie, évalue et suit des entreprises capables de contribuer à des missions concrètes. L’accès aux opportunités dépend de la pertinence des capacités et de la validité des informations fournies.",
      sections: [
        {
          title: "Axes de qualification",
          text: "La qualification reste liée au contexte de la mission.",
          items: frHome.networkAxes,
        },
        {
          title: "Gouvernance",
          text: "L’intégration au réseau ne vaut pas validation permanente; les informations critiques doivent rester à jour.",
        },
      ],
      notice:
        "Les critères publics détaillés et le formulaire de candidature restent à spécifier.",
    },
    "confier-un-besoin": {
      eyebrow: "Confier un besoin",
      title:
        "Décrivez le résultat attendu. Nous structurerons la prochaine étape.",
      intro:
        "Donnez-nous le contexte, l’objectif, les contraintes et les délais connus. Vous n’avez pas besoin d’avoir déjà rédigé un cahier des charges complet.",
      sections: [
        {
          title: "Première étape",
          text: "Écrivez à info@octopusexpertise.com ou contactez le numéro adapté à votre zone.",
        },
        {
          title: "Traitement",
          text: "La demande est examinée avant engagement. Aucune information n’est publiée ni transmise sans étape appropriée.",
        },
        { title: "Coordonnées", text: "+32 485 36 88 03 · +243 974 849 528" },
      ],
      notice:
        "Le formulaire, sa validation, sa conservation et les pièces jointes sécurisées restent à spécifier.",
    },
    plateforme: {
      eyebrow: "Plateforme",
      title:
        "Une visibilité continue sur les demandes, décisions et livrables.",
      intro:
        "Cette page présente la valeur du cadre numérique sans attribuer à la plateforme des fonctions qui n’ont pas été validées.",
      sections: [
        {
          title: "Frontière publique",
          text: "Aucune démonstration fictive, faux compte, fausse mission ou faux indicateur n’est utilisé comme preuve opérationnelle.",
        },
        {
          title: "Principes visibles",
          text: "Demandes, décisions, jalons et livrables constituent le modèle d’information annoncé.",
        },
      ],
      notice:
        "Les fonctionnalités réellement disponibles et la structure complète restent à spécifier.",
    },
    "qualite-conformite": {
      eyebrow: "Qualité et conformité",
      title: "Des contrôles adaptés au niveau de risque de chaque mission.",
      intro:
        "Le cadre de contrôle s’ajuste au contexte, aux documents, aux responsabilités et aux exigences spécifiques de la mission.",
      sections: [
        {
          title: "Cadre de contrôle",
          text: "La confiance repose sur des contrôles observables.",
          items: frHome.quality,
        },
        {
          title: "Gestion des écarts",
          text: "Les décisions, corrections et validations restent traçables au niveau défini pour la mission.",
        },
      ],
      notice: "Aucune certification n’est déclarée sans preuve vérifiée.",
    },
    "a-propos": {
      eyebrow: "À propos",
      title:
        "Construire un accès plus simple aux capacités dont les entreprises ont réellement besoin.",
      intro:
        "Octopus Expertise répond à la dispersion du marché par un modèle de qualification, de sélection et d’orchestration.",
      sections: [
        {
          title: "Raison d’être",
          text: "Relier un besoin complexe aux capacités pertinentes dans un cadre visible et maîtrisé.",
        },
        {
          title: "Principes",
          text: "Clarté, sélection, responsabilité, confidentialité, traçabilité et amélioration continue.",
        },
        {
          title: "Zones prioritaires",
          text: "Lualaba, Haut-Katanga et République démocratique du Congo, avec une pertinence africaine.",
        },
      ],
      notice:
        "Aucun membre d’équipe, bureau, chiffre, historique ou référence n’est ajouté sans validation factuelle.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Parlons de votre besoin.",
      intro: "Choisissez le canal qui convient à votre contexte professionnel.",
      sections: [
        { title: "E-mail", text: "info@octopusexpertise.com" },
        { title: "Bruxelles", text: "+32 485 36 88 03" },
        { title: "RDC", text: "+243 974 849 528" },
      ],
      notice:
        "Le formulaire, le consentement, l’anti-spam et la conservation restent à spécifier.",
    },
  },
  en: {},
};

commonPages.en = {
  expertises: {
    eyebrow: "Expertise",
    title: "The capabilities you need, brought together around your objective.",
    intro:
      "Explore capabilities that Octopus Expertise can mobilise. Every intervention is structured around the need, available skills and control requirements.",
    sections: [
      {
        title: "Portfolio",
        text: enHome.capabilitiesText,
        items: enHome.capabilities,
      },
      {
        title: "Mobilisation",
        text: "The need is framed before capabilities or partners are selected.",
      },
      {
        title: "Truth standard",
        text: "Capabilities mobilisable through the Octopus Expertise network.",
      },
    ],
    notice: "Filtering rules and source data remain to be specified.",
  },
  secteurs: {
    eyebrow: "Sectors",
    title: "Expertise adapted to the real constraints of your sector.",
    intro:
      "Safety, continuity, compliance and mobilisation requirements differ across environments. Octopus Expertise links the need to relevant capabilities and structures their coordination.",
    sections: [
      {
        title: "Initial contexts",
        text: "One method adapts to each environment.",
        items: enHome.sectors,
      },
      {
        title: "Approach",
        text: "Issues, capabilities, constraints and controls are framed for each mission.",
      },
    ],
    notice: "Detailed sector page models remain to be specified.",
  },
  methode: {
    eyebrow: "Method",
    title: "From expressing the need to validating the result.",
    intro:
      "A multisector mission requires more than an introduction. It requires framing, criteria, responsibilities, milestones and evidence of delivery.",
    sections: [
      {
        title: "Six stages",
        text: "A clear pathway keeps every contributor aligned.",
        items: enHome.method.map(([title, text]) => `${title} — ${text}`),
      },
      {
        title: "Control",
        text: "Decisions, risks, documents, issues and deliverables are monitored at the level suited to the mission.",
      },
      {
        title: "Responsibilities",
        text: "The client, Octopus Expertise and partners retain defined, visible roles.",
      },
    ],
  },
  "reseau-partenaires": {
    eyebrow: "Partner network",
    title: "A network qualified against each mission’s requirements.",
    intro:
      "Octopus Expertise identifies, assesses and monitors companies able to contribute to concrete missions. Access to opportunities depends on relevant capabilities and valid information.",
    sections: [
      {
        title: "Qualification dimensions",
        text: "Qualification remains tied to the mission context.",
        items: enHome.networkAxes,
      },
      {
        title: "Governance",
        text: "Joining the network is not permanent validation; critical information must remain current.",
      },
    ],
    notice:
      "Detailed public criteria and the application form remain to be specified.",
  },
  "confier-un-besoin": {
    eyebrow: "Submit a need",
    title: "Describe the expected result. We will structure the next step.",
    intro:
      "Share the context, objective, constraints and known deadlines. You do not need a complete specification before contacting us.",
    sections: [
      {
        title: "First step",
        text: "Email info@octopusexpertise.com or use the number suited to your location.",
      },
      {
        title: "Processing",
        text: "The request is reviewed before commitment. No information is published or shared without an appropriate step.",
      },
      { title: "Contact", text: "+32 485 36 88 03 · +243 974 849 528" },
    ],
    notice:
      "The form, validation, retention and secure attachments remain to be specified.",
  },
  plateforme: {
    eyebrow: "Platform",
    title: "Continuous visibility across requests, decisions and deliverables.",
    intro:
      "This page presents the value of the digital framework without assigning unvalidated features to the platform.",
    sections: [
      {
        title: "Public boundary",
        text: "No fictional demonstration, account, mission or indicator is used as operational proof.",
      },
      {
        title: "Visible principles",
        text: "Requests, decisions, milestones and deliverables form the announced information model.",
      },
    ],
    notice:
      "Available features and the complete structure remain to be specified.",
  },
  "qualite-conformite": {
    eyebrow: "Quality and compliance",
    title: "Controls adapted to each mission’s level of risk.",
    intro:
      "The control framework adjusts to context, documents, responsibilities and mission-specific requirements.",
    sections: [
      {
        title: "Control framework",
        text: "Trust rests on observable controls.",
        items: enHome.quality,
      },
      {
        title: "Issue management",
        text: "Decisions, corrections and approvals remain traceable at the level defined for the mission.",
      },
    ],
    notice: "No certification is claimed without verified evidence.",
  },
  "a-propos": {
    eyebrow: "About",
    title:
      "Building simpler access to the capabilities companies actually need.",
    intro:
      "Octopus Expertise addresses market fragmentation through qualification, selection and orchestration.",
    sections: [
      {
        title: "Purpose",
        text: "Connect a complex need to relevant capabilities in a visible, controlled framework.",
      },
      {
        title: "Principles",
        text: "Clarity, selection, responsibility, confidentiality, traceability and continuous improvement.",
      },
      {
        title: "Priority areas",
        text: "Lualaba, Haut-Katanga and the Democratic Republic of Congo, with African relevance.",
      },
    ],
    notice:
      "No team member, office, figure, history or reference is added without factual validation.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s discuss your need.",
    intro: "Choose the channel that best fits your professional context.",
    sections: [
      { title: "Email", text: "info@octopusexpertise.com" },
      { title: "Brussels", text: "+32 485 36 88 03" },
      { title: "DRC", text: "+243 974 849 528" },
    ],
    notice:
      "The form, consent, anti-spam and retention rules remain to be specified.",
  },
};

const unspecified = {
  fr: {
    eyebrow: "Périmètre public",
    title: "Cette page reste à spécifier.",
    intro:
      "La structure, les contenus et les conditions de validation ne sont pas encore définis dans la spécification publique.",
    sections: [
      {
        title: "Prochaine étape",
        text: "Contactez Octopus Expertise pour une information vérifiée.",
      },
    ],
    notice: "Aucune capacité ou information non vérifiée n’est publiée ici.",
  },
  en: {
    eyebrow: "Public scope",
    title: "This page remains to be specified.",
    intro:
      "Its structure, content and validation conditions are not yet defined in the public specification.",
    sections: [
      {
        title: "Next step",
        text: "Contact Octopus Expertise for verified information.",
      },
    ],
    notice: "No unverified capability or information is published here.",
  },
} satisfies Record<Locale, PublicPage>;

const unspecifiedSlugs = new Set([
  "devenir-partenaire",
  "lualaba",
  "haut-katanga",
  "insights",
  "connexion",
  "confidentialite",
  "conditions-utilisation",
]);

export const getPublicPage = (locale: Locale, slug: string) => {
  if (slug in commonPages[locale]) return commonPages[locale][slug];
  if (unspecifiedSlugs.has(slug)) return unspecified[locale];
  return undefined;
};
