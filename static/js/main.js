// 小屏幕顶部的两条点击事件
function ChangeClassLeft(){
    document.getElementById("left").classList.toggle("left_show");
}
function ChangeClassTOC(){
    document.getElementById("toc").classList.toggle("toc_show");
}

// 防剧透黑块点击事件
function ChangeClassBlackBlock(wait_to_change){
    wait_to_change.classList.toggle("black_block_show");
}

// 切换颜色主题
// 定义函数，功能是：获取以 cname 为键的 cookie 值
// 这是 jQuary.cookie 中用的方法，见，https://stackoverflow.com/q/5639346/9783145
function read_cookie(key) {
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}
// 初始化
const checkbox = document.querySelector(".theme-switcher");
const themeContainer = document.querySelector(".theme-container");
// 获取 cookie
var ctheme = read_cookie("ctheme");
// 如果 cookie 里有值就按 cookie 的方法去做
// 如果 cookie 里没有值就看 checkbox 的默认值
// checkbox 的默认值看 baseof.html
if (ctheme == "dark") {
    themeContainer.classList.remove("light");
    checkbox.checked = false;
} else if (ctheme == "light") {
    themeContainer.classList.add("light");
    checkbox.checked = true;
} else {
    if (checkbox.checked) {
        themeContainer.classList.add("light");
        document.cookie = "ctheme=light; path=/";
    } else {
        themeContainer.classList.remove("light");
        document.cookie = "ctheme=dark; path=/";
    }
}
// 添加监听函数，在 checkbox 状态改变时改写 css 变量并改写 cookie
checkbox.addEventListener("change", function() {
    if (themeContainer && this.checked) {
        themeContainer.classList.add("light");
        document.cookie = "ctheme=light; path=/";
    } else {
        themeContainer.classList.remove("light");
        document.cookie = "ctheme=dark; path=/";
    }
});

