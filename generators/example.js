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
      output: "[b]Name:[/b] {value}"
    },
    {
      id: "notes",
      label: "Notes",
      type: "textarea",
      output: "[i]{value}[/i]"
    },
    {
      id: "tags",
      label: "Tags",
      type: "repeatable",
      subtype: "text",
      output: "[tag]{value}[/tag]"
    }
  ]
};
