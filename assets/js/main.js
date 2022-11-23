"use strict"
///////////////////////////////////////////////////////////////////////////////
// 小屏幕顶部的两条点击事件
function ChangeClassLeft() {
    document.getElementById("left").classList.toggle("left_show");
}
function ChangeClassTOC() {
    document.getElementById("left").classList.remove("left_show");
    document.getElementById("toc").classList.toggle("toc_show");
}
function HideBothSide() {
    document.getElementById("left").classList.remove("left_show");
    const toc_el = document.getElementById("toc");
    if (toc_el != null) {
        toc_el.classList.remove("toc_show");
    }
}
///////////////////////////////////////////////////////////////////////////////
// 搜索功能

// 装载搜索页，单独装载是防止 display: none 造成搜索页闪烁
// 装载模板的函数
const search_template = document.getElementById("search-zone-template");
function loadTemplate(prefix) {
    let container = document.getElementById(prefix);
    let search_clone = search_template.content.cloneNode(true);
    search_clone.getElementById("search-zone").classList.add(prefix + "_search");
    search_clone.getElementById("search-input-box").id = prefix + "_search-input-box";
    search_clone.getElementById("search-zone").id = prefix + "_search";
    container.appendChild(search_clone);
}
// 两次调用函数完成装载
loadTemplate("left_non-footer");
loadTemplate("right");

// Pagefind 搜索功能
async function PagefindSearch(text, canvas) {
    const pagefind = await import("/_pagefind/pagefind.js");
    const search = await pagefind.search(text);
    const result_zone = canvas;
    // 先清空结果显示区域
    result_zone.innerHTML = "";
    for (const result of search.results) {
        // 解析搜索结果
        let result_data = await result.data();
        // 获取结果模板
        let result_template = document.getElementById("search-result");
        let result_clone = result_template.content.cloneNode(true);
        // 渲染模板中结果项目的标题、链接和内容
        let result_item = result_clone.querySelectorAll("div")[0];
        result_item.setAttribute("onclick", "location.href='" + result_data.url + "';");
        let result_divs = result_item.querySelectorAll("div");
        result_divs[0].textContent = result_data.meta.title;
        result_divs[1].innerHTML = result_data.excerpt;
        // 渲染模板中结果项目的日期和所属 section
        let result_tags = result_divs[2].querySelectorAll("div");
        result_tags[0].textContent = result_data.meta.date;
        let section1 = result_data.filters["1st-section"][0];
        let section2 = result_data.filters["2nd-section"][0];
        result_tags[1].textContent = section1 + " > " + section2;
        // 将模板加载进结果显示区域
        result_zone.appendChild(result_clone);
    }
}

// 搜索页的打开与搜索
function startSearch(prefix) {
    document.getElementById(prefix + "_search").classList.add("search_show");
    let search_input = document.getElementById(prefix + "_search-input-box");
    search_input.focus();
    // 避免添加多个 Listener：https://stackoverflow.com/a/47330239
    if (search_input.getAttribute("data-event-keyup") !== "true") {
        let search_timeout = null;
        search_input.addEventListener("keyup", function (e) {
            if (e.key === "Escape") {
                closeSearch(search_input);
            }
            // debounced search，函数防抖
            // See, https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
            clearTimeout(search_timeout);
            search_timeout = setTimeout(function () {
                if (search_input.value !== "") {
                    let render_canvas = search_input.parentNode.nextElementSibling;
                    PagefindSearch(search_input.value, render_canvas);
                }
            }, 600);
        });
        search_input.setAttribute("data-event-keyup", "true");
    }
}
// 搜索页的关闭
function closeSearch(close_sign) {
    close_sign.parentNode.parentNode.classList.remove("search_show");
}
///////////////////////////////////////////////////////////////////////////////
// 防剧透黑块点击事件
function ChangeClassBlackBlock(wait_to_change) {
    wait_to_change.classList.toggle("black_block_show");
}
///////////////////////////////////////////////////////////////////////////////
// 以下是切换颜色主题
// utterances 的改变主题函数，见 https://github.com/utterance/utterances/issues/170
function ut_change_to_light_mode() {
    try {
        const message = {
            type: "set-theme",
            theme: "github-light"
        };
        let utterances = document.querySelector("iframe");
        utterances.contentWindow.postMessage(message, "https://utteranc.es");
    }
    catch(err) {}
}
function ut_change_to_dark_mode() {
    try {
        const message = {
            type: "set-theme",
            theme: "github-dark"
        };
        let utterances = document.querySelector("iframe");
        utterances.contentWindow.postMessage(message, "https://utteranc.es");
    }
    catch(err) {}
}

// 主题变化监听函数，在 checkbox 状态改变时改写 css 变量并改写 localStorage，
// 同时对 utterance （有文章页有）的主题做出改变
function themeSwitch() {
    if (checkbox.checked) {
        themeContainer.classList.remove("dark");
        themeSwitcher.setAttribute("aria-checked", "true");
        localStorage.setItem("ctheme", "light");
        ut_change_to_light_mode();
    } else {
        themeContainer.classList.add("dark");
        themeSwitcher.setAttribute("aria-checked", "false");
        localStorage.setItem("ctheme", "dark");
        ut_change_to_dark_mode();
    }
}

const checkbox = document.querySelector(".theme-switcher");
const themeSwitcher = document.querySelector(".left_non-footer_option_theme-switch");
if (checked === 1) {
    checkbox.checked = true;
    ut_change_to_light_mode();
} else if (checked === 0) {
    checkbox.checked = false;
    themeSwitcher.setAttribute("aria-checked", "false");
    ut_change_to_dark_mode();
}
///////////////////////////////////////////////////////////////////////////////
