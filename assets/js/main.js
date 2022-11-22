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
    var container = document.getElementById(prefix);
    var search_clone = search_template.content.cloneNode(true);
    search_clone.getElementById("search-zone").classList.add(prefix + "_search");
    search_clone.getElementById("search-input-box").id = prefix + "_search-input-box";
    search_clone.getElementById("search-zone").id = prefix + "_search";
    container.appendChild(search_clone);
}
// 两次调用函数完成装载
loadTemplate("left_non-footer");
loadTemplate("right");

// Pagefind 搜索功能
async function PagefindSearch(text) {
    const pagefind = await import("/_pagefind/pagefind.js");
    const search = await pagefind.search(text);
    const fiveResults = await Promise.all(search.results.slice(0, 5).map(r => r.data()));
    console.log(fiveResults);
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
                    PagefindSearch(search_input.value);
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
        var utterances = document.querySelector("iframe");
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
        var utterances = document.querySelector("iframe");
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
