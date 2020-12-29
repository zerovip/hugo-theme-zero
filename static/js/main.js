// 小屏幕顶部的两条点击事件
function ChangeClassLeft() {
    document.getElementById("left").classList.toggle("left_show");
}
function ChangeClassTOC() {
    document.getElementById("toc").classList.toggle("toc_show");
}

// 防剧透黑块点击事件
function ChangeClassBlackBlock(wait_to_change) {
    wait_to_change.classList.toggle("black_block_show");
}

// 切换颜色主题
// 定义函数，功能是：获取以 cname 为键的 cookie 值
// 这是 jQuary.cookie 中用的方法，见，https://stackoverflow.com/q/5639346/9783145
function read_cookie(key) {
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}
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
// 初始化
const checkbox = document.querySelector(".theme-switcher");
const themeContainer = document.querySelector(".theme-container");
// 获取 cookie
var ctheme = read_cookie("ctheme");
// 如果 cookie 里有值就按 cookie 的方法去做
// 如果 cookie 里没有值就看 checkbox 的默认值
// checkbox 的默认值看 single.html
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
        document.cookie = "ctheme=light; path=/";
        ut_change_to_light_mode();
    } else {
        themeContainer.classList.add("dark");
        document.cookie = "ctheme=dark; path=/";
        ut_change_to_dark_mode();
    }
}
// 添加监听函数，在 checkbox 状态改变时改写 css 变量并改写 cookie，
// 同时对 utterance （有文章页有）的主题做出改变
checkbox.addEventListener("change", function() {
    if (themeContainer && this.checked) {
        themeContainer.classList.remove("dark");
        document.cookie = "ctheme=light; path=/";
        ut_change_to_light_mode();
    } else {
        themeContainer.classList.add("dark");
        document.cookie = "ctheme=dark; path=/";
        ut_change_to_dark_mode();
    }
});

