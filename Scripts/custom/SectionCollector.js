class SectionCollector {
    async show(app, dv, section_name, tag_name) {
        let page_filter_pattern = new RegExp(`## ${section_name}`);
        let line_filter_pattern = new RegExp(`^## ${section_name}`);
        let image_wiki_link_filters_patterns = [
            new RegExp(/!\[[^\]]*\]\(([^\]]*)\)/g),
            new RegExp(/!\[\[([^\]]*)\]\]/g),
        ];

        let target_pages = {};
        let pages = dv.pages("#" + tag_name);
        for (let p of pages){
            if (p.file.folder.match("^Templates")) {
                continue;
            }
            await dv.io.load(p.file.path).then(content => {
                return content.match(page_filter_pattern) ?  content : "";
            }).then(content => {
                let lines = content.split("\n");
                let found = false;
                for (let line of lines) {
                    if (found && line.match(/^(##|---)/)) {
                        found = false;
                        break;
                    }
                    if (line.match(line_filter_pattern)) {
                        found = true;
                        target_pages[p.file.path] = ["## [[" + p.file.name + "]]"];
                        continue;
                    }
                    if (found) {
                        let has_image = false;
                        image_wiki_link_filters_patterns.map(pattern => {
                            let m = [ ...line.matchAll(pattern) ];
                            m.map(item => {
                                let image_url = item[1];
                                if (!image_url.match(/^http/i)) {
                                    image_url = `file://${app.vault.adapter.basePath}/${image_url}`
                                }
                                // console.log(`pattern=${pattern}, image_url=${image_url}`);
                                target_pages[p.file.path].push(`<img src='${image_url}'>`);
                                has_image = true;
                            })
                        });
                        if (!has_image) {
                            target_pages[p.file.path].push(line);
                        }
                    }
                }
            })
        }

        let toc = ["## Table of Contents"];
        for (let p  of Object.keys(target_pages).sort().reverse()) {
            toc.push("- [[" + p + "]]");
        }

        let content = [toc.join("\n")];
        for (let p of Object.keys(target_pages).sort().reverse()) {
            content.push(target_pages[p].join('\n'));
        }
        dv.el("article", content.join("\n"));
    }
}
