
with CustomJS:

```dataviewjs
let SECTION_NAME = "Ideas";
let TAG_NAME = "ideas";

const {SectionCollector} = customJS;
SectionCollector.show(app, dv, SECTION_NAME, TAG_NAME);
```

with DataView directly:

```dataviewjs
const options = {
        app: app,
        section_name: "Ideas",
        tag_name: "ideas",
};
await dv.view("Views/custom/SectionCollector", options);
```
