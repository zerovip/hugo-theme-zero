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

// 以下是切换颜色主题
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

const checkbox = document.querySelector(".theme-switcher");
if (checked === 1) {
    checkbox.checked = true;
    ut_change_to_light_mode();
} else if (checked === 0) {
    checkbox.checked = false;
    ut_change_to_dark_mode();
}

