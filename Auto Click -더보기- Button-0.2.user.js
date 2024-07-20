// ==UserScript==
// @name         Auto Click "더보기" Button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  특정 사이트에 접속 후 "더보기" 버튼 자동 클릭 및 전체화면 상태 변경 시에도 작동
// @author       Your Name
// @match        *://chzzk.naver.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 특정 버튼의 선택자
    const buttonSelector = '.navigator_button_more__UE0v3';

    // 버튼을 찾고 클릭하는 함수
    function findAndClickButton() {
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.click();
            console.log('Button clicked!');
        } else {
            console.log('Button not found, retrying...');
        }
    }

    // 페이지 로딩 완료 후 버튼 찾기 및 클릭
    window.addEventListener('load', function() {
        const loadInterval = setInterval(() => {
            const button = document.querySelector(buttonSelector);
            if (button) {
                button.click();
                console.log('Button clicked!');
                clearInterval(loadInterval); // 버튼을 찾고 클릭한 후 인터벌을 종료합니다.
            } else {
                console.log('Button not found, retrying...');
            }
        }, 1000); // 1초 간격으로 버튼을 찾습니다.
    }, false);

    // 전체화면 변경 이벤트 리스너 추가
    document.addEventListener('fullscreenchange', function() {
        const fullscreenInterval = setInterval(() => {
            const button = document.querySelector(buttonSelector);
            if (button) {
                button.click();
                console.log('Button clicked in fullscreen change!');
                clearInterval(fullscreenInterval); // 버튼을 찾고 클릭한 후 인터벌을 종료합니다.
            } else {
                console.log('Button not found in fullscreen change, retrying...');
            }
        }, 1000); // 1초 간격으로 버튼을 찾습니다.
    });

})();