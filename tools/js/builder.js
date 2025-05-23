const fields = [];

document.getElementById('addField').addEventListener('click', () => {
  const label = document.getElementById('fieldLabel').value;
  const id = document.getElementById('fieldId').value;
  const type = document.getElementById('fieldType').value;
  const group = document.getElementById('fieldGroup').value;
  const output = document.getElementById('fieldOutput').value || '{value}';

  const field = { id, label, type, output: val => output.replace('{value}', val) };
  if (group) field.group = group;

  fields.push(field);
  renderFieldList();
  updateConfigOutput();
});

function renderFieldList() {
  const list = document.getElementById('fieldList');
  list.innerHTML = '';
  fields.forEach((f, i) => {
    const li = document.createElement('li');
    li.textContent = `${f.label} (${f.type})`;
    list.appendChild(li);
  });
}

function updateConfigOutput() {
  const title = document.getElementById('formTitle').value;
  const theme = document.getElementById('themeSelect').value;
  const mode = document.getElementById('modeSelect').value;
  const outputFormat = document.getElementById('formatSelect').value;

  const result = {
    title,
    theme,
    mode,
    outputFormat,
    fields
  };

  const output = document.getElementById('configOutput');
  output.value = 'export default ' + JSON.stringify(result, null, 2) + ';';
}

document.getElementById('copyConfig').addEventListener('click', () => {
  const text = document.getElementById('configOutput').value;
  navigator.clipboard.writeText(text);
});
