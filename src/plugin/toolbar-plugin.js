const toolbarPlugin = {
  onRegister: function (editor) {
    // 创建工具栏
    const toolbar = document.createElement("div");
    toolbar.style.display = "inline";
    toolbar.style.gap = "8px";
    toolbar.style.marginBottom = "8px";

    // 添加按钮
    const boldButton = createButton("B", () => execCommand("bold"));
    const italicButton = createButton("I", () => execCommand("italic"));
    const underlineButton = createButton("U", () => execCommand("underline"));
    const fontSizeButton = createSelect(
      "fontSize",
      ["12px", "16px", "20px", "24px"],
      (value) => setFontSize(value)
    );

    // 将按钮添加到工具栏
    toolbar.appendChild(boldButton);
    toolbar.appendChild(italicButton);
    toolbar.appendChild(underlineButton);
    toolbar.appendChild(fontSizeButton);

    // 将工具栏添加到容器中
    const container = editor.container;
    container.insertBefore(toolbar, container.firstChild);

    function execCommand(command) {
      // 执行编辑器的命令
      editor.executeCommand(command);
    }

    function setFontSize(value) {
      // 设置编辑器文本框的字体大小
      editor.textarea.style.fontSize = value;
    }

    function createButton(label, onClick) {
      // 创建按钮
      const button = document.createElement("button");
      button.innerText = label;
      button.addEventListener("click", onClick);
      return button;
    }

    function createSelect(name, options, onChange) {
      // 创建下拉框
      const select = document.createElement("select");
      select.name = name;
      select.addEventListener("change", () => onChange(select.value));

      for (const option of options) {
        // 添加下拉框选项
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.innerText = option;
        select.appendChild(optionElement);
      }

      return select;
    }
  },

  onUnregister: function (editor) {
    // 移除工具栏
    const container = editor.container;
    const toolbar = container.querySelector("div");
    container.removeChild(toolbar);
  },

  onCommand: function (editor, command) {
    // 处理编辑器的命令
    switch (command) {
      case "bold":
        editor.textarea.style.fontWeight = "bold";
        break;
      case "italic":
        editor.textarea.style.fontStyle = "italic";
        break;
      case "underline":
        editor.textarea.style.textDecoration = "underline";
        break;
    }
  },
  onTextChanged(){}
};
