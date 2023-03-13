// 测试用例
const editor = new Editor();
const plugin1 = new Plugin1();
const plugin2 = new Plugin2();

// 注册插件
editor.registerPlugin(plugin1);
editor.registerPlugin(plugin2);

// 编辑器初始化完成生命周期函数
editor.onEditorReady();

// 设置编辑区域容器
const container = document.querySelector("#editor-container");
editor.onElementAttached(container);

// 设置文本内容
editor.setText("Hello World!");

// 获取文本内容
console.log(editor.getText());

// 执行命令
editor.executeCommand("bold");

// 编辑器卸载生命周期函数
editor.onEditorUnloaded();

// 卸载插件
editor.unregisterPlugin(plugin1);
editor.unregisterPlugin(plugin2);
