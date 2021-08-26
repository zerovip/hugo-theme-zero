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
    document.getElementById("toc").classList.remove("toc_show");
}

// 防剧透黑块点击事件
function ChangeClassBlackBlock(wait_to_change) {
    wait_to_change.classList.toggle("black_block_show");
}

// 切换颜色主题
// utterances 的改变主题函数，见 https://github.com/utterance/utterances/issues/170
function ut_change_to_light_mode() {
    try {
        const message = {
            type: 'set-theme',
            theme: 'github-light'
        };
        var utterances = document.querySelector('iframe');
        utterances.contentWindow.postMessage(message, 'https://utteranc.es');
    }
    catch(err) {}
}
function ut_change_to_dark_mode() {
    try {
        const message = {
            type: 'set-theme',
            theme: 'github-dark'
        };
        var utterances = document.querySelector('iframe');
        utterances.contentWindow.postMessage(message, 'https://utteranc.es');
    }
    catch(err) {}
}

// 主题变化监听函数，在 checkbox 状态改变时改写 css 变量并改写 localStorage，
// 同时对 utterance （有文章页有）的主题做出改变
function themeSwitch() {
    if (checkbox.checked) {
        themeContainer.classList.remove("dark");
        localStorage.setItem("ctheme", "light");
        ut_change_to_light_mode();
    } else {
        themeContainer.classList.add("dark");
        localStorage.setItem("ctheme", "dark");
        ut_change_to_dark_mode();
    }
}

// 下面是修正换页面时的闪烁，参见:
// https://zwbetz.com/fix-the-white-flash-on-page-load-when-using-a-dark-theme-on-a-static-site/
function showTheme() {
    // 获取 localStorage
    var ctheme = localStorage.getItem('ctheme');
    // 如果 localStorage 里有值就按 localStorage 的方法去做
    // 如果 localStorage 里没有值就看 checkbox 的默认值
    // checkbox 的默认值看 baseof.html
    if (ctheme == "dark") {
        themeContainer.classList.add("dark");
        checkbox.checked = false;
        ut_change_to_dark_mode();
    } else if (ctheme == "light") {
        themeContainer.classList.remove("dark");
        checkbox.checked = true;
        ut_change_to_light_mode();
    } else {
        if (checkbox.checked) {
            themeContainer.classList.remove("dark");
            localStorage.setItem("ctheme", "light");
            ut_change_to_light_mode();
        } else {
            themeContainer.classList.add("dark");
            localStorage.setItem("ctheme", "dark");
            ut_change_to_dark_mode();
        }
    }
}

function showContent() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;
}

// 初始化
const checkbox = document.querySelector(".theme-switcher");
const themeContainer = document.querySelector(".theme-container");
window.addEventListener('DOMContentLoaded', function () {
    showTheme();
    showContent();
});

