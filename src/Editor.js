class Editor {
  constructor(options) {
    // 插件列表
    this.plugins = [];
    // 文本输入区域元素
    this.textarea = options.textarea;
    // 编辑器容器元素
    this.container = options.container;
    // 编辑器准备就绪时的回调函数
    this.onEditorReady = options.onEditorReady || null;
    // 编辑器卸载时的回调函数
    this.onEditorUnloaded = options.onEditorUnloaded || null;
    // 元素附加到编辑器时的回调函数
    this.onElementAttached = options.onElementAttached || null;
    // 元素从编辑器中移除时的回调函数
    this.onElementDetached = options.onElementDetached || null;
    // 元素大小更改时的回调函数
    this.onElementResized = options.onElementResized || null;
  }

  // 注册插件
  registerPlugin(plugin) {
    this.plugins.push(plugin);
    plugin.onRegister(this);
  }

  // 卸载插件
  unregisterPlugin(plugin) {
    const index = this.plugins.indexOf(plugin);
    if (index > -1) {
      plugin.onUnregister(this);
      this.plugins.splice(index, 1);
    }
  }

  // 查询已注册插件
  getPlugins() {
    return this.plugins;
  }

  // 文本编辑器功能
  setText(text) {
    this.textarea.value = text;
    this.plugins.forEach((plugin) => plugin.onTextChanged(text));
    console.log(`Setting text: ${text}`);
  }

  // 获取文本编辑器内容
  getText() {
    return this.textarea.value;
  }

  // 插件调用
  executeCommand(command) {
    this.plugins.forEach((plugin) => plugin.onCommand(this, command));
  }

  // 初始化编辑器
  init() {
    this.onEditorReady && this.onEditorReady(this);
    this.plugins.forEach((plugin) => {
      if (typeof plugin.onEditorReady === "function") {
        plugin.onEditorReady(this);
      }
    });
  }

  // 卸载编辑器
  unload() {
    this.onEditorUnloaded && this.onEditorUnloaded(this);
    this.plugins.forEach((plugin) => {
      if (typeof plugin.onEditorUnloaded === "function") {
        plugin.onEditorUnloaded(this);
      }
    });
  }

  // 在 DOM 中附加编辑区域容器
  attachTo(container) {
    this.container = container;
    this.onElementAttached && this.onElementAttached(this, container);
    this.plugins.forEach((plugin) => {
      if (typeof plugin.onElementAttached === "function") {
        plugin.onElementAttached(this, container);
      }
    });
  }

  // 在 DOM 中移除编辑区域容器
  detach() {
    this.onElementDetached && this.onElementDetached(this);
    this.plugins.forEach((plugin) => {
      if (typeof plugin.onElementDetached === "function") {
        plugin.onElementDetached(this);
      }
    });
  }

  // 在编辑区域容器的尺寸变化时触发
  resize() {
    this.onElementResized && this.onElementResized(this);
    this.plugins.forEach((plugin) => {
      if (typeof plugin.onElementResized === "function") {
        plugin.onElementResized(this);
      }
    });
  }
}
