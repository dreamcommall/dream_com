// 세션 스토리지에 상품의 섬네일 이미지와 제목, 그리고 상품번호를 저장합니다.
export function saveHistory(productTitle, thumbnailImg, productNum) {
    if (isHistory(productNum)) { // 제품 번호를 기준으로 히스토리가 존재하는지 확인
        return;
    }

    if (isMaxHistory()) { // 현재 저장된 히스토리 용량이 가득찼는지 확인
        removeHistory();
    }

    // 세션 스토리지에 히스토리 내용을 저장
    let historyInfo = sessionStorage.getItem("historyInfo");
    let arr = [];
    if (historyInfo == null) { // 키 값이 존재하지 않는경우 신규로 생성
        arr.push({
            productTitle : productTitle.toString(),
            thumbnailImg : thumbnailImg.toString(),
            productNum : productNum.toString()
        });
    } else { // 키 값이 존재하는 경우 저장된 배열에 이어서 저장
        let histories = sessionStorage.getItem("historyInfo");
        histories = JSON.parse(histories);
        arr = histories.values;
        arr.push({
            productTitle : productTitle.toString(),
            thumbnailImg : thumbnailImg.toString(),
            productNum : productNum.toString()
        });
    }
    sessionStorage.setItem("historyInfo", JSON.stringify({values : arr}));
}

// 세션 스토리지에서 저장된 정보들을 가져오는 함수
// 히스토리가 담긴 배열을 반환한다.
export function getAllHistory() {
    let histories = sessionStorage.getItem("historyInfo");
    if (histories == undefined || histories == null) { // 저장된 히스토리가 없으면 빈 배열을 반환한다.
        return [];
    }

    histories = JSON.parse(histories);
    let arr = [];
    arr = histories.values;
    return arr;
}

// 히스토리 보관수가 최대값에 도달했는지 확인합니다.
function isMaxHistory() {
    const MAX_HISTORY_SAVE_COUNT = 4;
    let arr = [];
    arr = getAllHistory();
    if (arr.length >= MAX_HISTORY_SAVE_COUNT) {
        return true;
    } else {
        return false;
    }
}

// 가장 오래된 히스토리를 삭제하고 저장합니다.
function removeHistory() {
    let arr = [];
    arr = getAllHistory();
    arr = arr.slice(1);
    sessionStorage.setItem("historyInfo", JSON.stringify({values : arr}));
}

// 세션에 이미 같은값이 존재하는지를 확인
function isHistory(productNum) {
    let flag = false;
    let arr = getAllHistory();
    arr.forEach(item => {
        if (item.productNum == productNum) {
            flag = true;
        }
    });
    return flag;
}