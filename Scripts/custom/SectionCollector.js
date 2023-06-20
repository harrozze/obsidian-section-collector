class SectionCollector {
    async show(app, dv, section_name, tag_name) {
        let page_filter_pattern = new RegExp(`## ${section_name}`);
        let header_filter_pattern = new RegExp(`^## ${section_name}`);
        let no_content_line_filter_pattern = new RegExp('^[ \t]*[0-9]+\.[ \t]\+$');
        let empty_line_filter_pattern = new RegExp('^[ \t]*$');
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
            let page_file_path = p.file.path;
            let non_empty_lines = 0;
            let lines_in_page = [];
            await dv.io.load(page_file_path).then(content => {
                return content.match(page_filter_pattern) ?  content : "";
            }).then(content => {
                let lines = content.split("\n");
                let found = false;
                for (let line of lines) {
                    if (found && line.match(/^(##|---)/)) {
                        found = false;
                        break;
                    }
                    if (line.match(header_filter_pattern)) {
                        found = true;
                        lines_in_page = ["## [[" + p.file.name + "]]"];
                        continue;
                    }
                    if (!found) {
                        continue;
                    }
                    if (line.match(no_content_line_filter_pattern)) {
                        continue;
                    }
                    if (!line.match(empty_line_filter_pattern)) {
                        ++ non_empty_lines;
                        console.log(`non-empty-line: ${line}`);
                    }

                    let has_image = false;
                    image_wiki_link_filters_patterns.map(pattern => {
                        let m = [ ...line.matchAll(pattern) ];
                        m.map(item => {
                            let image_url = item[1];
                            if (!image_url.match(/^http/i)) {
                                image_url = `file://${app.vault.adapter.basePath}/${image_url}`
                            }
                            // console.log(`pattern=${pattern}, image_url=${image_url}`);
                            lines_in_page.push(`<img src='${image_url}'>`);
                            has_image = true;
                        })
                    });
                    if (!has_image) {
                        lines_in_page.push(line);
                    }
                }
            });
            console.log(`found: page=${page_file_path}, non_empty_lines=${non_empty_lines}`);
            if (non_empty_lines > 0 && lines_in_page.length > 1) {
                console.log(`found: page=${page_file_path}, lines: ${lines_in_page.length}`);
                target_pages[page_file_path] = lines_in_page;
            }
        }

        let sorted_target_page_paths = Object.keys(target_pages).sort().reverse();
        console.log(`sorted_target_page_paths=${sorted_target_page_paths}`);

        let toc = ["## Table of Contents"];
        for (let p of sorted_target_page_paths) {
            toc.push("- [[" + p + "]]");
        }

        let content = [toc.join("\n")];
        for (let p of sorted_target_page_paths) {
            content.push(target_pages[p].join('\n'));
        }
        dv.el("article", content.join("\n"));
    }
}
