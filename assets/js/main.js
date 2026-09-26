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
        toc_el.classList.remove("toc_open");
    }
}
///////////////////////////////////////////////////////////////////////////////
// 大屏触屏设备（如 Pad 横屏）：点击标题切换目录，不依赖 :hover
{
    const toc_touch = document.getElementById("toc");
    if (toc_touch !== null) {
        const touch_mq = window.matchMedia("(hover: none) and (min-width: 1201px)");
        const toc_title = toc_touch.querySelector(".toc_title");
        if (toc_title !== null) {
            toc_title.addEventListener("click", function () {
                if (touch_mq.matches) {
                    toc_touch.classList.toggle("toc_open");
                }
            });
        }
        toc_touch.addEventListener("click", function (e) {
            if (e.target.closest("a")) {
                HideBothSide();
            }
        });
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
// 代码块的折叠展开、一键复制
document.addEventListener('DOMContentLoaded', function () {
    var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    var i18n = {
        zh: { expand: '展开', collapse: '收起', copy: '复制代码', copied: '已复制' },
        en: { expand: 'Expand', collapse: 'Collapse', copy: 'Copy code', copied: 'Copied' },
        fr: { expand: 'Développer', collapse: 'Réduire', copy: 'Copier le code', copied: 'Copié' }
    };
    var t = i18n[lang] || i18n.en;

    document.querySelectorAll('.right_main_article .highlight').forEach(function (block) {
        var codeEl = block.querySelector('code[data-lang]');
        var langName = codeEl ? codeEl.getAttribute('data-lang') : '';
        if (langName === 'fallback') {
            langName = '';
        }

        var header = document.createElement('div');
        header.className = 'code-header';
        header.innerHTML =
            '<div class="code-header-left">' +
                '<span class="code-lang"></span>' +
                '<button type="button" class="code-toggle-btn" aria-expanded="false">' +
                    '<span class="code-toggle-icon">▷</span>' +
                    '<span class="code-toggle-text"></span>' +
                '</button>' +
            '</div>' +
            '<button type="button" class="code-copy-btn">' +
                '<span class="code-copy-icon">📋</span>' +
                '<span class="code-copy-text"></span>' +
            '</button>';
        header.querySelector('.code-lang').textContent = langName;
        block.insertBefore(header, block.firstChild);

        var chroma = block.querySelector(':scope > .chroma');
        var toggleBtn = header.querySelector('.code-toggle-btn');
        var toggleText = header.querySelector('.code-toggle-text');
        var copyBtn = header.querySelector('.code-copy-btn');
        var copyIcon = header.querySelector('.code-copy-icon');
        var copyText = header.querySelector('.code-copy-text');

        toggleText.textContent = t.expand;
        copyText.textContent = t.copy;

        // 如果内容没超出高度限制，就不需要展开按钮
        if (chroma && chroma.scrollHeight <= chroma.clientHeight) {
            toggleBtn.style.display = 'none';
        }

        toggleBtn.addEventListener('click', function () {
            var expanded = block.classList.toggle('is-expanded');
            toggleBtn.setAttribute('aria-expanded', String(expanded));
            toggleText.textContent = expanded ? t.collapse : t.expand;
        });

        // 一键复制
        copyBtn.addEventListener('click', function () {
            var codeTd = block.querySelector('td.lntd:last-child');
            var text = codeTd ? codeTd.innerText : chroma.innerText;
            navigator.clipboard.writeText(text).then(function () {
                copyIcon.textContent = '✓';
                copyText.textContent = t.copied;
                setTimeout(function () {
                    copyIcon.textContent = '📋';
                    copyText.textContent = t.copy;
                }, 1200);
            });
        });
    });
});
///////////////////////////////////////////////////////////////////////////////
// 图片放大器
document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML =
        '<button type="button" class="lightbox-close">×</button>' +
        '<div class="lightbox-scroll"><img class="lightbox-img"></div>';
    document.body.appendChild(overlay);

    var scrollBox = overlay.querySelector('.lightbox-scroll');
    var img = overlay.querySelector('.lightbox-img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var zoom = 1;
    var MIN_ZOOM = 1;
    var MAX_ZOOM = 4;

    function setZoom(z) {
        zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
        img.style.setProperty('--zoom', zoom);
        img.classList.toggle('is-zoomed', zoom > MIN_ZOOM);
    }

    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        setZoom(1);
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // 打开时禁止背后页面跟着滚动
    }

    function close() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        img.src = ''; // 关闭后释放大图内存
    }

    document.querySelectorAll('.right_main_article img').forEach(function (el) {
        el.addEventListener('click', function () {
            open(el.src, el.alt);
        });
    });
    
    closeBtn.addEventListener('click', close);

    // 点击深色背景（而不是图片本身）也关闭
    scrollBox.addEventListener('click', function (e) {
        if (e.target === scrollBox) {
            close();
        }
    });

    // 点击图片本身：在 1 倍和 2 倍之间切换，方便没有滚轮的移动端
    img.addEventListener('click', function (e) {
        e.stopPropagation();
        setZoom(zoom > MIN_ZOOM ? MIN_ZOOM : 2);
    });

    // 鼠标滚轮：桌面端更精细地缩放
    scrollBox.addEventListener('wheel', function (e) {
        if (!overlay.classList.contains('is-open')) return;
        e.preventDefault();
        setZoom(zoom - e.deltaY * 0.0015 * zoom);
    }, { passive: false });
});
///////////////////////////////////////////////////////////////////////////////
