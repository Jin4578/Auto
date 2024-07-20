// ==UserScript==
// @name         Auto Click "더보기" Button
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  특정 사이트에 접속 후 첫 번째 "더보기" 버튼 자동 클릭 및 전체화면 상태 변경 시에도 작동
// @author       Your Name
// @match        *://chzzk.naver.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 특정 버튼의 선택자
    const buttonSelector = '.navigator_button_more__UE0v3';
    let clickedButtons = new Set(); // 클릭한 버튼을 기록할 Set

    // 버튼을 찾고 클릭하는 함수
    function findAndClickFirstButton() {
        const buttons = document.querySelectorAll(buttonSelector);
        for (let button of buttons) {
            if (!clickedButtons.has(button)) {
                button.click(); // 버튼 클릭
                clickedButtons.add(button); // 클릭한 버튼 기록
                console.log('First "더보기" button clicked!');
                return true; // 성공적으로 클릭했음을 반환
            }
        }
        return false; // 클릭하지 못했음을 반환
    }

    // 페이지 로딩 완료 후 버튼 찾기 및 클릭
    function onPageLoad() {
        // 페이지 상태가 완전히 로드되었는지 확인
        if (document.readyState === 'complete') {
            const loadInterval = setInterval(() => {
                if (findAndClickFirstButton()) {
                    clearInterval(loadInterval); // 버튼을 찾고 클릭한 후 인터벌을 종료합니다.
                }
            }, 1000); // 1초 간격으로 버튼을 찾습니다.
        } else {
            window.addEventListener('load', () => {
                const loadInterval = setInterval(() => {
                    if (findAndClickFirstButton()) {
                        clearInterval(loadInterval); // 버튼을 찾고 클릭한 후 인터벌을 종료합니다.
                    }
                }, 1000); // 1초 간격으로 버튼을 찾습니다.
            });
        }
    }

    // 전체화면 변경 이벤트 리스너 추가
    function onFullscreenChange() {
        const fullscreenInterval = setInterval(() => {
            if (findAndClickFirstButton()) {
                clearInterval(fullscreenInterval); // 버튼을 찾고 클릭한 후 인터벌을 종료합니다.
            }
        }, 1000); // 1초 간격으로 버튼을 찾습니다.
    }

    // MutationObserver를 사용하여 DOM 변경 감지
    function setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            let foundButton = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    foundButton = findAndClickFirstButton();
                }
            });
            if (foundButton) {
                observer.disconnect(); // 버튼 클릭 후 MutationObserver를 중지합니다.
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 페이지 로딩 완료 이벤트와 MutationObserver 초기화
    onPageLoad();
    setupMutationObserver();

    // 전체화면 변경 이벤트 리스너 추가
    document.addEventListener('fullscreenchange', onFullscreenChange);

})();