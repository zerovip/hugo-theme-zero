// 初始化
const themeContainer = document.querySelector(".theme-container");
var ctheme = localStorage.getItem('ctheme');
var checked = 1;
// 如果 localStorage 里有值就按 localStorage 的方法去做
// 如果 localStorage 里没有值就看用户系统的偏好
if (ctheme == "dark") {
    themeContainer.classList.add("dark");
    checked = 0;
} else if (ctheme == "light") {
    themeContainer.classList.remove("dark");
}
