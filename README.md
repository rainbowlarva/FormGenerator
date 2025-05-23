# Dynamic Form Generator Framework

This is a static, config-driven form generator system that runs entirely on GitHub Pages. It allows you to build custom BBCode/HTML report generators using a visual JSON schema with modular fields, themes, and live output formatting.

---

## 🚀 Quick Start

1. **Clone or download** this repository.
2. Add new generator config files inside the `/generators/` folder.
3. Open the site using:

```
https://yourusername.github.io/YourRepo/?gen=yourGeneratorName
```

---

## 📁 Project Structure

```
/index.html               ← Main entry point
/js/loader.js             ← Loads correct generator based on URL
/js/engine.js             ← Renders form from config
/css/base.css             ← Theme + layout styling
/generators/example.js    ← Example config file
/home/                    ← Optional homepage folder
```

---

## 🧠 How It Works

This framework loads generator configs based on the `?gen=` query string.

For example:

```
https://yourusername.github.io/YourRepo/?gen=example
```

Will load `/generators/example.js`.

---

## 🧩 Creating a Generator Config

Each generator config must use the following structure:

```js
export default {
  title: "Report Title",
  theme: "teal",            // any of 15+ preset themes
  mode: "dark",             // "light" or "dark"
  outputFormat: "bbcode",   // "bbcode" or "html"

  fields: [
    {
      id: "name",                     // Unique ID
      label: "Officer Name",         // Form label
      type: "text",                  // One of: text, textarea, repeatable, dropdown, checkbox-group, radio-group, checkbox-other
      output: "[b]{value}[/b]"       // Output string or function (use {value} for replacement)
    },
    ...
  ]
}
```

---

## 🛠 Supported Field Types

### `text`
Single-line input field.

### `textarea`
Multi-line resizable input.

### `repeatable`
Add/remove text entries.

### `dropdown`
Selection menu with optional color-coded options.

```js
{
  type: "dropdown",
  options: [
    { label: "Low", value: "Low", color: "green" },
    { label: "High", value: "High", color: "red" }
  ]
}
```

### `checkbox-group`
Multiple checkboxes with multi-value output.

### `radio-group`
Single-selection buttons.

### `checkbox-other`
Shows a text field when a checkbox is toggled.

```js
{
  type: "checkbox-other",
  checkboxLabel: "Other Reason"
}
```

---

## 🎨 Themes

Set in the config:

```js
theme: "red"
mode: "dark"
```

Themes include: `blue`, `green`, `red`, `orange`, `purple`, `navy`, `gold`, `teal`, etc.

---

## 🧩 Output

Each field must include:
```js
output: "[b]{value}[/b]"
```

Use `{value}` to dynamically insert the input into BBCode or HTML format.

The `engine.js` automatically detects `outputFormat` and renders appropriately.

---

## 🧠 Visibility Conditions

Fields can optionally use `visibleIf` to be conditionally shown:

```js
{
  id: "explainOther",
  label: "Explain Other",
  type: "textarea",
  visibleIf: { field: "status", value: "Other" },
  output: "{value}"
}
```

---

## 🧠 Functions Used (Internally)

You don't need to call these yourself, but here's what runs behind the scenes:

### `initGenerator(config)`
- Entry point loaded by `engine.js`
- Accepts your config object
- Builds the form, tracks inputs, renders output

### `updateOutput()`
- Called on every input
- Renders either `.textContent` or `.innerHTML` depending on `outputFormat`

### `applyTheme(theme)`
- Automatically applies `theme-${name}` and `mode-${light|dark}` classes to `<body>`

---

## 🧪 Testing Locally

GitHub Pages does not allow ES modules from `file://`.

To test locally:

```bash
python -m http.server
```

Then visit:

```
http://localhost:8000/?gen=example
```

---

## 💾 Deployment on GitHub Pages

1. Go to repo → Settings → Pages
2. Set **Source** to `main` (or your default branch)
3. Set **Root folder** as `/`
4. Visit:

```
https://yourusername.github.io/yourrepo/?gen=yourConfigName
```

---

## ❓ Troubleshooting

- ✅ Confirm `example.js` is imported in `loader.js`
- ✅ Make sure filenames and generator names match exactly
- ✅ Avoid arrow functions in config — use string templates like `"[b]{value}[/b]"`
- ✅ Use relative paths in all imports

---

## 🧰 Optional Tools

If included:
- `/tools/config-builder/` contains a visual GUI to build your config JSON interactively

---

MIT License. Created with 💡 by @rainbowlarva.
