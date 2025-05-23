export default {
  title: "SanGang Generator",
  theme: "gray",
  mode: "dark",
  outputFormat: "html",

  fields: [
    {
      id: "filingOfficer",
      label: "Filing Officer (Rank, Name, Badge):",
      type: "text",
      persist: true,
      output: "<p><strong>Filing Officer:</strong><br>{value}</p>"
    },
    {
      id: "date",
      label: "Date (MM/DD/YYYY):",
      type: "text",
      output: "<p><strong>Date:</strong><br>{value}</p>"
    },
    {
      id: "criteria",
      label: "Criteria:",
      type: "textarea",
      output: "<p><strong>Criteria:</strong><br>{value}</p>"
    },
    {
      id: "evidence",
      label: "Evidence (DICV, audio, etc.):",
      type: "textarea",
      output: "<p><strong>Evidence:</strong><br>{value}</p>"
    },
    {
      id: "threatLevel",
      label: "Threat Level (STEP ACT §304):",
      type: "dropdown",
      options: [
        { label: "High", value: "<span style='color:#F44336; font-weight:bold;'>High</span>" },
        { label: "Medium", value: "<span style='color:#FF9800; font-weight:bold;'>Medium</span>" },
        { label: "Low", value: "<span style='color:#2196F3; font-weight:bold;'>Low</span>" }
      ],
      output: "<p><strong>Threat Level:</strong><br>{value}</p>"
    },
    {
      id: "threatExplanation",
      label: "Threat Explanation:",
      type: "textarea",
      output: "<p><strong>Threat Explanation:</strong><br>{value}</p>"
    },
    {
      id: "physicalDescription",
      label: "Physical Description:",
      type: "textarea",
      output: "<p><strong>Physical Description:</strong><br>{value}</p>"
    },
    {
      id: "screenshots",
      label: "Screenshot URLs",
      type: "repeatable",
      output: "<img src='{value}' alt='Screenshot' style='max-width:100%; margin-bottom:10px;'>"
    }
  ]
};