const MAX_HISTORY_SAVE_COUNT = 4;

// 세션 스토리지에 상품의 섬네일 이미지와 제목, 그리고 상품번호를 저장합니다.
export function saveHistory(productTitle, thumbnailImg, productNum) {
    if (isHistory(productNum) == true) {
        return;
    }
    
    if ((sessionStorage.length / 3).toFixed() == MAX_HISTORY_SAVE_COUNT) {
        replaceHistory();
    }
    
    let idx = (sessionStorage.length / 3).toFixed();
    
    sessionStorage.setItem(`productTitle${idx}`, productTitle);
    sessionStorage.setItem(`thumbnailImg${idx}`, thumbnailImg);
    sessionStorage.setItem(`productNum${idx}`, productNum);
}

// 세션 스토리지에서 저장된 정보들을 가져오는 함수
export function getAllHistory() {
    let result = [];
    let idx = (sessionStorage.length / 3).toFixed();
    for (let i = 0; i < idx; ++i) {
        result.push({
            key : i,
            productTitle : sessionStorage.getItem(`productTitle${i}`),
            thumbnailImg : sessionStorage.getItem(`thumbnailImg${i}`),
            productNum : sessionStorage.getItem(`productNum${i}`)
        });
    }
    return result;
}

// 각 세션이름에 붙은 번호를 기준으로 세션 스토리지에 등록되어있는 데이터를 삭제합니다.
function removeHistory(sessionNumber) {
    sessionStorage.removeItem(`productTitle${sessionNumber}`);
    sessionStorage.removeItem(`thumbnailImg${sessionNumber}`);
    sessionStorage.removeItem(`productNum${sessionNumber}`);
}

// 세션에 저장되어있는 데이터들을 하나씩 앞 번호로 이동시킵니다.
function replaceHistory() {
    // 최대 저장가능한 개수보다 -1 만큼 반복을 동작
    for (let i = 0; i < MAX_HISTORY_SAVE_COUNT - 1; ++i) {
        let tempProductTitle = sessionStorage.getItem(`productTitle${i + 1}`);
        let tempThumbnailImg = sessionStorage.getItem(`thumbnailImg${i + 1}`);
        let tempProductNum = sessionStorage.getItem(`productNum${i + 1}`);
        
        removeHistory(i);
        sessionStorage.setItem(`productTitle${i}`, tempProductTitle);
        sessionStorage.setItem(`thumbnailImg${i}`, tempThumbnailImg);
        sessionStorage.setItem(`productNum${i}`, tempProductNum);
    }
    
    // 마지막 데이터는 삭제한다.
    // 번호가 0부터 시작하기때문에 -1
    removeHistory(MAX_HISTORY_SAVE_COUNT - 1);
}

// 세션에 이미 같은값이 존재하는지를 확인
function isHistory(productNum) {
    let flag = false;
    let idx = (sessionStorage.length / 3).toFixed();
    for (let i = 0; i < idx; ++i) {
        if (sessionStorage.getItem(`productNum${i}`) == productNum) {
            flag = true;
            break;
        }
    }
    return flag;
}