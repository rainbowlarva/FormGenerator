export default function initGenerator(config) {
  const container = document.getElementById('form-container');
  const output = document.getElementById('output');
  const fieldElements = {};
  const visibilityMap = {};

  document.body.classList.add(`theme-${config.theme || 'blue'}`);
  document.body.classList.add(`mode-${config.mode || 'dark'}`);

  const form = document.createElement('form');
  form.id = 'dynamic-form';

  config.fields.forEach(field => {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-wrapper';
    wrapper.dataset.id = field.id;

    // Group headers
    if (field.group) {
      const groupHeader = document.createElement('h2');
      groupHeader.textContent = field.group;
      form.appendChild(groupHeader);
    }

    // Conditional visibility
    if (field.visibleIf) {
      wrapper.style.display = 'none';
      visibilityMap[field.id] = { dependsOn: field.visibleIf.field, value: field.visibleIf.value, wrapper };
    }

    const label = document.createElement('label');
    label.textContent = field.label;
    wrapper.appendChild(label);

    if (field.type === 'text' || field.type === 'textarea') {
      const input = document.createElement(field.type === 'text' ? 'input' : 'textarea');
      input.id = field.id;
      if (field.type === 'textarea') {
        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = input.scrollHeight + 'px';
        });
      }
      if (field.persist) {
        input.value = localStorage.getItem(field.id) || '';
        input.addEventListener('input', () => localStorage.setItem(field.id, input.value));
      }
      input.addEventListener('input', updateOutput);
      fieldElements[field.id] = () => input.value;
      wrapper.appendChild(input);
    }

    else if (field.type === 'repeatable') {
      const list = document.createElement('div');
      list.id = field.id + '-list';

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.textContent = 'Add';
      addBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.addEventListener('input', updateOutput);
        list.appendChild(input);
      });

      fieldElements[field.id] = () => {
        return Array.from(list.querySelectorAll('input')).map(i => i.value).filter(Boolean);
      };

      wrapper.appendChild(list);
      wrapper.appendChild(addBtn);
    }

    else if (field.type === 'checkbox-group') {
      const group = document.createElement('div');
      const selected = new Set();
      field.options.forEach(opt => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = field.id + '-' + opt.value;
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) selected.add(opt.value);
          else selected.delete(opt.value);
          updateOutput();
        });

        const lbl = document.createElement('label');
        lbl.htmlFor = checkbox.id;
        lbl.textContent = opt.label;

        group.appendChild(checkbox);
        group.appendChild(lbl);
      });
      fieldElements[field.id] = () => Array.from(selected);
      wrapper.appendChild(group);
    }

    else if (field.type === 'radio-group') {
      const group = document.createElement('div');
      field.options.forEach(opt => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = field.id;
        radio.value = opt.value;
        radio.addEventListener('change', updateOutput);

        const lbl = document.createElement('label');
        lbl.textContent = opt.label;

        group.appendChild(radio);
        group.appendChild(lbl);
      });
      fieldElements[field.id] = () => {
        const selected = group.querySelector('input:checked');
        return selected ? selected.value : '';
      };
      wrapper.appendChild(group);
    }

    else if (field.type === 'dropdown') {
      const select = document.createElement('select');
      field.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        if (opt.color) {
          option.style.color = opt.color;
        }
        select.appendChild(option);
      });
      select.addEventListener('change', updateOutput);
      fieldElements[field.id] = () => select.value;
      wrapper.appendChild(select);
    }

    else if (field.type === 'checkbox-other') {
      const container = document.createElement('div');
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.id = field.id + '-check';

      const checkLbl = document.createElement('label');
      checkLbl.textContent = field.checkboxLabel;

      const other = document.createElement('input');
      other.type = 'text';
      other.style.display = 'none';

      check.addEventListener('change', () => {
        other.style.display = check.checked ? 'block' : 'none';
        updateOutput();
      });

      other.addEventListener('input', updateOutput);

      container.appendChild(check);
      container.appendChild(checkLbl);
      container.appendChild(other);
      fieldElements[field.id] = () => check.checked ? other.value : '';
      wrapper.appendChild(container);
    }

    form.appendChild(wrapper);
  });

  container.innerHTML = `<h2>${config.title}</h2>`;
  container.appendChild(form);

  function updateOutput() {
    const result = config.fields.map(field => {
      const val = fieldElements[field.id]();
      if (field.type === 'repeatable') {
        return val.map(v => field.output(v)).join('\n');
      } else {
        return field.output(val);
      }
    }).join('\n\n');

    if (config.outputFormat === 'html') {
      output.innerHTML = result;
    } else {
      output.textContent = result;
    }

    // Update conditionally visible elements
    Object.values(visibilityMap).forEach(cond => {
      const val = fieldElements[cond.dependsOn]();
      cond.wrapper.style.display = val === cond.value ? '' : 'none';
    });
  }
}
