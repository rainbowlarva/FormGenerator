# FormGenerator Framework

This is a config-based form generator system built for GitHub Pages. It's designed to let you create fully functional BBCode or HTML output forms using simple JavaScript config files — no backend, no server, and no complex setup.

---

## 🔧 How to Use

### 1. Set up your generator
Each generator is just a `.js` file inside the `/generators/` folder. You access them by adding `?gen=name` to the URL. For example:

```
https://yourusername.github.io/YourRepo/?gen=example
```

This will load `/generators/example.js`.

### 2. Make a config
A generator config looks like this:

```js
export default {
  title: "My Report Generator",
  theme: "blue",
  mode: "dark",
  outputFormat: "bbcode", // or "html"

  fields: [
    {
      id: "officerName",
      label: "Officer Name",
      type: "text",
      output: "[b]Name:[/b] {value}"
    },
    ...
  ]
}
```

You define each field, how it looks, and how it renders in the final output.

---

## ✅ Supported Field Types

- `text` – single-line input
- `textarea` – multi-line notes
- `repeatable` – lists (tags, names, files)
- `dropdown` – dropdown menu (can include color styling)
- `radio-group` – pick one
- `checkbox-group` – pick multiple
- `checkbox-other` – checkbox that reveals a text field

Each field includes a string template for output:
```js
output: "[b]{value}[/b]"
```

---

## 🎨 Themes and Appearance

Set `theme` and `mode` in the config:
```js
theme: "green",
mode: "dark"
```

Themes include: `blue`, `green`, `red`, `purple`, `orange`, `navy`, and more.

---

## 🔁 Conditional Fields

You can show/hide fields based on others:
```js
{
  id: "details",
  label: "Explain",
  type: "textarea",
  visibleIf: { field: "status", value: "Other" },
  output: "{value}"
}
```

---

## ⚙ How It Works

The `index.html` loads `loader.js`, which looks for `?gen=` in the URL. It then loads the correct config from the `/generators/` folder and passes it to `engine.js`.

The engine:
- Renders the form
- Tracks input
- Generates output based on the `outputFormat`

---

## 🛠 Local Testing

GitHub Pages won’t run ES modules from `file://` — you need to serve it.

If you have Python:
```bash
python -m http.server
```

Then go to:
```
http://localhost:8000/?gen=example
```

---

## 📦 Publishing on GitHub Pages

1. Push your project to GitHub
2. Go to Settings → Pages
3. Set Source to `main` and folder to `/`
4. Open:
```
https://yourusername.github.io/YourRepo/?gen=example
```

---

## 🧰 Optional Tool

There's a GUI-based Config Builder in `/tools/config-builder/` that lets you create config files visually. Use it if you want to avoid editing JS by hand.

---

## 💬 Help

If your form isn’t showing up:
- Double-check the `?gen=` name matches your file
- Make sure `example.js` is included in `loader.js`
- Check the browser console (F12 → Console tab) for errors
- Make sure you're not running it from `file://`

---

Built for GitHub Pages. Made by @rainbowlarva.
