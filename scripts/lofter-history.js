// ==UserScript==
// @name         Lofter查看历史记录
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  在 Lofter 网页版查看App端浏览记录
// @author       SrakhiuMeow
// @match        *://*.lofter.com/
// @grant        none
// @require      https://unpkg.com/ajax-hook@3.0/dist/ajaxhook.min.js
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    function getHistory() {
        console.log('hi');
    }

    const slideBar = document.getElementById('slide-bar').children[0].children[1];
    
    // 添加分割线
    const dividingLine = document.createElement('div');
    dividingLine.className = slideBar.children[3].children[0].className;
    slideBar.insertBefore(dividingLine, slideBar.children[0]);

    // 添加历史记录按钮
    // 不知道为什么直接用<a>会有报错（
    const history = document.createElement('div');
    history.id = 'getHistory';
    history.innerHTML = `
        <div>
            <h5 class="LRlf1c3Y3+bO-foPi4wNjQ==">
                <span>历史记录</span>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="mVWxtvI0CO9-BAyQYEFwKw=="><path d="M8 4.5l5.5 5.5L8 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </h5>
        </div>
    `;
    history.style.cursor = 'pointer';
    history.addEventListener('click', getHistory);
    slideBar.insertBefore(history, slideBar.children[0]);



})();