# obsidian-section-collector user script

[中文](README_cn.md) | English

Obsidian user script to collect same section in notes into one view

## Usage

There 2 ways to use scripts in this project.

1. use the one in `Scripts/custom` directory with CustomJS plugin of Obsidian.
2. use the one in `Views/custom` directory with `dv.view()` method of Obsidian DataView plugin.

### Use with CustomJS Plugin

Steps:

1. find, install and enable `DataView` and `CustomJS` plugins in `Community Plugins` page of settings.
2. in the CustomJS plugin's settings page, set `Folder` to `Scripts/custom`.
3. make the `Scripts/custom` directory in your vault, if not exist.

   ```sh
   cd <VAULT-DIRECTORY>
   mkdir -p Scripts/custom
   ```

4. get `Scripts/custom/SectionCollector.js` and put it into `Scripts/custom` directory in the vault.

   1. clone this repository and copy file
   2. browse and save raw content of the script in browser
   3. get tar ball from release page and extract the file

5. make the `Views` directory in your vault, if not exist.

   ```sh
   cd <VAULT-DIRECTORY>
   mkdir Views
   ```

6. create the view note that you want in `Views` directory, e.g. Ideas.md, and put the code blow in it:

       ```dataviewjs
       let SECTION_NAME = "Ideas";
       let TAG_NAME = "ideas";
       
       const {SectionCollector} = customJS;
       SectionCollector.show(app, dv, SECTION_NAME, TAG_NAME);
       ```

   NOTICE: actually, in this way to use the script, you can put the view note anywhere.

7. add `Ideas` section and `#ideas` tag in any notes that you want to put your ideas like this:

   ```markdown

   #ideas

   ## Ideas

   1. make it possible to collect same sections in all notes into one view
   2. ...

   ```

8. open the view note `Views/Ideas`, you will see all the ideas are collected into it.

### Use with DataView plugin's `dv.view()` method

Steps:

1. find, install and enable `DataView` plugins in `Community Plugins` page of settings.
2. make the `Views/custom` directory in your vault, if not exist.

   ```sh
   cd <VAULT-DIRECTORY>
   mkdir -p Views/custom
   ```

   NOTICE: you can change the directory path as you like, and specify it in the following step 4

3. get `Views/custom/SectionCollector.js` and put it into `Views/custom` directory in the vault.

   1. clone this repository and copy file
   2. browse and save raw content of the script in browser
   3. get tar ball from release page and extract the file

4. create the view note that you want in `Views` directory, e.g. Ideas.md, and put the code blow in it:

       ```dataviewjs
       const options = {
               app: app,
               section_name: "Ideas",
               tag_name: "ideas",
       };
       await dv.view("Views/custom/SectionCollector", options);
       ```

   NOTICE: actually, in this way to use the script, you can put the view note anywhere.

5. add `Ideas` section and `#ideas` tag in any notes that you want to put your ideas like this:

   ```markdown

   #ideas

   ## Ideas

   1. make it possible to collect same sections in all notes into one view
   2. ...

   ```

6. open the view note `Views/Ideas`, you will see all the ideas are collected into it.

### Samples

you can see the sample note `Views/Ideas.md` as reference

### Notice

if you insert images in the vault local directory into your note, make sure the path is full related path. e.g. if you put images in `images` directory, the image link should be like this:

```markdown
![[images/section-collector.png]]
```

Or

```markdown
![](images/section-collector.png)
```

Hope this script is useful to you :)
