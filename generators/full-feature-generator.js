export default {
  title: "Full Feature Test Generator",
  theme: "red",
  mode: "dark",
  outputFormat: "bbcode",

  fields: [
    {
      id: "incidentTitle",
      label: "Incident Title",
      type: "text",
      group: "Basic Info",
      output: "[b]Title:[/b] {value}"
    },
    {
      id: "reportDate",
      label: "Date & Time",
      type: "text",
      output: "[b]Date:[/b] {value}"
    },
    {
      id: "description",
      label: "Incident Description",
      type: "textarea",
      output: "[i]{value}[/i]"
    },
    {
      id: "involvedUnits",
      label: "Involved Units",
      type: "repeatable",
      group: "Participants",
      output: "[unit]{value}[/unit]"
    },
    {
      id: "incidentType",
      label: "Incident Type",
      type: "dropdown",
      group: "Classification",
      options: [
        { label: "Traffic Stop", value: "Traffic" },
        { label: "Warrant Service", value: "Warrant" },
        { label: "Pursuit", value: "Pursuit" },
        { label: "Other", value: "Other", color: "red" }
      ],
      output: "[b]Type:[/b] {value}"
    },
    {
      id: "riskLevel",
      label: "Risk Level",
      type: "radio-group",
      options: [
        { label: "Low", value: "[color=green]Low[/color]" },
        { label: "Medium", value: "[color=orange]Medium[/color]" },
        { label: "High", value: "[color=red]High[/color]" }
      ],
      group: "Assessment",
      output: "[b]Risk:[/b] {value}"
    },
    {
      id: "outcomes",
      label: "Outcomes",
      type: "checkbox-group",
      group: "Assessment",
      options: [
        { label: "Citation Issued", value: "Citation" },
        { label: "Arrest Made", value: "Arrest" },
        { label: "Use of Force", value: "Force" }
      ],
      output: "[b]Outcomes:[/b]\n{value}"
    },
    {
      id: "otherOutcomeDetails",
      label: "Other Outcomes",
      type: "checkbox-other",
      checkboxLabel: "Include other outcome",
      output: "[b]Other Outcome:[/b] {value}"
    },
    {
      id: "forceExplanation",
      label: "Explain Use of Force",
      type: "textarea",
      visibleIf: { field: "outcomes", value: "Force" },
      output: "[quote]{value}[/quote]"
    },
    {
      id: "officerNotes",
      label: "Officer Notes",
      type: "textarea",
      persist: true,
      output: "[b]Notes:[/b]\n{value}"
    }
  ]
};
