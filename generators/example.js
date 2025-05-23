export default {
  title: "Example Generator",
  theme: "teal",
  mode: "dark",
  outputFormat: "bbcode",
  fields: [
    {
      id: "name",
      label: "Name",
      type: "text",
      output: (val) => `[b]Name:[/b] ${val}`
    },
    {
      id: "notes",
      label: "Notes",
      type: "textarea",
      output: (val) => `[i]${val}[/i]`
    },
    {
      id: "tags",
      label: "Tags",
      type: "repeatable",
      subtype: "text",
      output: (val) => `[tag]${val}[/tag]`
    }
  ]
};
