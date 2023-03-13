const colorPlugin = {
  onRegister: function (editor) {
    // 创建颜色选择器
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.gap = "8px";
    colorPicker.style.marginBottom = "8px";

    colorPicker.addEventListener("change", (event) =>
      setColor(event.target.value)
    );

    // 将颜色选择器添加到工具栏
    const container = editor.container;
    container.insertBefore(colorPicker, container.firstChild);

    function setColor(color) {
      // 设置文本的颜色
      editor.executeCommand(color);
    }
  },
  onCommand: function (editor, command) {
    // 处理编辑器的命令
    editor.textarea.style.color = command;
  },

  onUnregister: function (editor) {
    // 移除颜色选择器
    const colorPicker = editor.container.querySelector("input[type=color]");
    editor.container.removeChild(colorPicker);
  },
  onTextChanged(){}
};
