const servicesData = [
  {
    serviceID: 1,
    serviceName: "ISO 9001",
    serviceDescription:
      "Looking at the currently available version of the standard, some of the anticipated overarching benefits are listed below.",
  },
  {
    serviceID: 2,
    serviceName: "ISO 14001",
    serviceDescription:
      "ISO 14001:2015 specifies the requirements for a management system that an organization can use to enhance its environmental",
  },
  {
    serviceID: 3,
    serviceName: "ISO 27001",
    serviceDescription:
      "ISO 27001 is an internationally recognized standard for information security management systems (ISMS). It provides a systematic",
  },
  {
    serviceID: 4,
    serviceName: "ISO 22000",
    serviceDescription:
      "Food Safety means adequate controls on presence of food based hazards in food at the time of its consumptions. Food safety is not single",
  },
  {
    serviceID: 5,
    serviceName: "FSSC 22000",
    serviceDescription:
      "ISO/IEC 20000 is the international standard for IT Service Management (ITSM), providing a framework for organizations to establish",
  },
  {
    serviceID: 6,
    serviceName: "ISO 45001",
    serviceDescription:
      "ISO/IEC 27001:2013 is the international standard for Information Security Management Systems (ISMS), providing a systematic framework",
  },
  {
    serviceID: 7,
    serviceName: "ISO 50001",
    serviceDescription:
      "ISO 13485:2016 is the international standard for Quality Management Systems (QMS) specific to the medical device industry. It provides",
  },
  {
    serviceID: 8,
    serviceName: "IATF 16949",
    serviceDescription:
      "Food  safety today is one of the most important things for food producer and for  the final consumers on the market. Consumer concern",
  },
  {
    serviceID: 9,
    serviceName: "EN 9100 / EN 9120",
    serviceDescription:
      "BRC (British Retail Consortium) Global Standard for Food Safety The BRC (British Retail Consortium) Global Standard has been created",
  },
];

const accreditationData = [
  {
    accreditationID: 1,
    accreditationName: "AB-CAB Accredited",
    accreditationDescription:
      "Accreditation Board for Conformity Assessment Bodies (AB-CAB) is an Independent, International Accreditation Board (AB). It works to",
  },
  {
    accreditationID: 2,
    accreditationName: "ISO 17020 Accredited",
    accreditationDescription:
      "Accreditation to ISO/IEC 17020, Conformity assessment - Requirements for the operation of various types of bodies performing inspection",
  },
  {
    accreditationID: 3,
    accreditationName: "ISO 17021 Accredited",
    accreditationDescription:
      "Accreditation Board for Conformity Assessment Bodies (AB-CAB) is an Independent, International Accreditation Board (AB). It works to serve",
  },
  {
    accreditationID: 4,
    accreditationName: "Industry Accreditation",
    accreditationDescription:
      "AB-CAB provide accredaiton for Industry-Specific Accreditation and TNV have plan to apply for accreditation for the following: cGMP/GMP",
  },
];

const trainingData = [
  {
    trainingID: 1,
    trainingName: "Quality Management Training",
    trainingDescription:
      "A comprehensive training program on quality management systems and ISO 9001:2015 requirements.",
  },
  {
    trainingID: 2,
    trainingName: "Environmental Management Training",
    trainingDescription:
      "Training on environmental management systems and ISO 14001:2015 requirements.",
  },
  {
    trainingID: 3,
    trainingName: "Information Security Training",
    trainingDescription:
      "Training on information security management systems and ISO 27001:2013 requirements.",
  },
];

const companiesData = [
  {
    companyID: 1,
    companyName: "OneWorld InfoTech",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "Cybersecurity, Digital Transformation and Data Center Service",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "29, Dilkusha Commercial Area, Dhaka 1000, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2308240800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2023-08-24",
        FirstSurveillanceDate: "2024-07-24",
        SecondSurveillanceDate: "2025-07-24",
        expiryDate: "2026-04-23",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 2,
    companyName: "CREATION360 LTD.",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "IT & ITES, Event Management, Service Provider, Advertising Agency, Printing & Press, Solution Integration, Cyber Security Services, Software Development, Software-Hardware & Networking Supply, Installation, Commissioning and Maintenance, Pre-Post Sales, IT Department, Business Continuity management, PMO, Digital Branding & Promotion, Human Resources, Procurement, Physical Security and Facility Management, On Premises & Cloud Data Center Services & Solutions",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "House -151, Block-D, Road-06, Mohanagar Project, Hatirjheel, West Rampura, Dhaka-1219; Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2404190800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2024-04-19",
        FirstSurveillanceDate: "2025-03-19",
        SecondSurveillanceDate: "2026-03-19",
        expiryDate: "2027-04-18",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 3,
    companyName: "CORNEA SOFT & IT SOLUTION LTD.",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "IT & ITES, Solution Integration, Cyber Security Services, Software Development, Software-Hardware & Networking Products Supply, Installation, Commissioning and Maintenance, Pre-Post Sales, IT Department, Service Provider, IT/ITES Training, BPO, Call Center, ISP, Technology Consultancy, Business Continuity management, PMO, Digital Branding & Promotion, Human Resources, Procurement, Physical Security and Facility Management, On Premises & Cloud Data Center Services & Solutions",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "3rd Floor, 39 Sher Shah Suri Road, Mohammadpur, Dhaka - 1207, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2404300800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2024-04-30",
        FirstSurveillanceDate: "2025-03-30",
        SecondSurveillanceDate: "2026-03-30",
        expiryDate: "2027-04-29",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 4,
    companyName: "OneWorld InfoTech",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "Cybersecurity, Digital Transformation and Data Center Service",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "29, Dilkusha Commercial Area, Dhaka 1000, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2308240800501",
        serviceID: 3,
        certificationName: "ISO 27001",
        issueDate: "2023-08-24",
        FirstSurveillanceDate: "2024-07-24",
        SecondSurveillanceDate: "2025-07-24",
        expiryDate: "2026-08-23",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
    trainings: [
      {
        trainingID: 1,
        trainingName: "Quality Management Training",
        completionDate: "2022-03-10",
      },
      {
        trainingID: 2,
        trainingName: "Information Security Training",
        completionDate: "2021-12-05",
      },
    ],
    accreditations: [
      {
        accreditationID: 1,
        accreditationName: "AB-CAB Accredited",
        issueDate: "2022-05-01",
        expiryDate: "2025-05-01",
      },
    ],
  },
  {
    companyID: 5,
    companyName: "CORNEA SOFT & IT SOLUTION LTD.",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "IT & ITES, Solution Integration, Cyber Security Services, Software Development, Software-Hardware & Networking Products Supply, Installation, Commissioning and Maintenance, Pre-Post Sales, IT Department, Service Provider, IT/ITES Training, BPO, Call Center, ISP, Technology Consultancy, Business Continuity management, PMO, Digital Branding & Promotion, Human Resources, Procurement, Physical Security and Facility Management, On Premises & Cloud Data Center Services & Solutions",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "2nd floor, Darogoa Market, Road 7/A, Zigatola, Dhanmondi, Dhaka 1209, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2404300800501",
        serviceID: 3,
        certificationName: "ISO 27001:2022",
        issueDate: "2025-03-03",
        FirstSurveillanceDate: "2026-03-30",
        SecondSurveillanceDate: "2027-03-30",
        expiryDate: "2028-04-29",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 6,
    companyName: "HAJ CORPORATION",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "Surveillance Solution, IT Solution, Lab Solution and Building Management Systems (BMS).",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "Suit-10-A, 5th floor, Sahera Tropical Centre, 218 Dr. Kudrat-E-Khuda Road, Dhaka-1205, BangladeshPostal Address: Plot#1/3, Block-A, Mohammadpur Housing Estate, Asad Gate, Dhaka-1207, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2412030800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2024-03-12",
        FirstSurveillanceDate: "2025-03-11",
        SecondSurveillanceDate: "2026-03-11",
        expiryDate: "2027-02-12",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
];


export { servicesData, accreditationData, trainingData, companiesData };
