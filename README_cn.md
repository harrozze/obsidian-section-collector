# obsidian-section-collector 用户脚本

中文 | [English](README.md)

用于收集 Obsidian 笔记中的同名章节，形成新的视图

## 用法

本项目中的脚本有两种用法

1. 结合 DataView 和 CustomJS 插件，使用 `Scripts/custom` 目录中的版本
2. 结合 DataView 插件，使用 `Views/custom` 目录中的版本

### 结合 CustomJS 插件使用

步骤：

1. 在 Obsidian 配置中的`第三方插件`页，搜索、添加、并启用 `DataView` 和 `CustomJS` 插件
2. 在 CustomJS 插件的设置中，设置 `Folder` 为 `Scripts/custom`
3. 在仓库中创建 `Scripts/custom` 目录

   ```sh
   cd <仓库目录>
   mkdir -p Scripts/custom
   ```

4. 获取 `Scripts/custom/SectionCollector.js` 并放到 Obsidian 仓库的 `Scripts/custom` 目录中

   1. `clone` 本项目仓库，并复制文件
   2. 通过浏览器浏览并保存脚本文件原始内容
   3. 获取本项目仓库的发布包，并解压相应文件

5. 在 Obsidian 仓库中创建 `Views` 目录

   ```sh
   cd <VAULT-DIRECTORY>
   mkdir Views
   ```

6. 在 `Views` 目录中创建`视图笔记`，如 `Ideas.md`，并在其中添加如下内容：

       ```dataviewjs
       let SECTION_NAME = "Ideas";
       let TAG_NAME = "ideas";
       
       const {SectionCollector} = customJS;
       SectionCollector.show(app, dv, SECTION_NAME, TAG_NAME);
       ```

   注：实际上，可以在 Obsidian 仓库的任意位置创建`视图笔记`

7. 在其他笔记中添加 `Ideas` 章节和 `#ideas` 标签，像下面这样：

   ```markdown

   #ideas

   ## Ideas

   1. 收集不同笔记中的相同章节到同一个视图中，方便查阅
   2. ……

   ```

8. 打开`视图笔记` `Views/Ideas`，会看到 `Ideas` 章节已经被聚合进来

### 配合 DataView 插件的 `dv.view()` 方法

步骤：

1. 在 Obsidian 配置中的`第三方插件`页，搜索、添加、并启用 `DataView` 插件。
2. 在仓库中创建 `Views/custom` 目录

   ```sh
   cd <VAULT-DIRECTORY>
   mkdir -p Views/custom
   ```

   注：可以根据自己的喜好创建不同的目录，第 4 步中也需要指定相同的目录

3. 获取 `Views/custom/SectionCollector.js` 并放到 Obsidian 仓库的 `Views/custom` 目录中。

   1. `clone` 本项目仓库，并复制文件
   2. 通过浏览器浏览并保存脚本文件原始内容
   3. 获取本项目仓库的发布包，并解压相应文件

4. 在 `Views` 目录中创建`视图笔记`，如 `Ideas.md`，并在其中添加如下内容：

       ```dataviewjs
       const options = {
               app: app,
               section_name: "Ideas",
               tag_name: "ideas",
       };
       await dv.view("Views/custom/SectionCollector", options);
       ```

   注：实际上，可以在 Obsidian 仓库的任意位置创建`视图笔记`

5. 在其他笔记中添加 `Ideas` 章节和 `#ideas` 标签，像下面这样：

   ```markdown

   #ideas

   ## Ideas

   1. 收集不同笔记中的相同章节到同一个视图中，方便查阅
   2. ……

   ```

6. 打开`视图笔记` `Views/Ideas`，会看到 `Ideas` 章节已经被聚合进来

### 示例

参看本代码仓库中的 `Views/Ideas.md` 文件

### 注意

如果在其他笔记中插入图片，请确保链接是在 Obsidian 仓库中的完整相对路径，而不仅仅是文件名。比如，图片放在 `images` 目录中的话，图片链接形如：

```markdown
![[images/section-collector.png]]
```

或

```markdown
![](images/section-collector.png)
```

希望本项目对你有用 :)
