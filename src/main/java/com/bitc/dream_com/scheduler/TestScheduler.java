package com.bitc.dream_com.scheduler;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;

@Component
@Controller
public class TestScheduler {
    @Autowired
    private TestService testService;

//    최근 클릭 수 3시간마다 업데이트 스케줄러
//    최종 수정일 2023-01-17
//    최종 작성자 : 양민호
    @Scheduled(cron = "0 0/5 * * * *")
    public void test() throws Exception {
//        클릭 수 높은 10개 가져오기
        List<ProductDto> products = testService.getTopClickedProduct();

//        hitcount에 들어가 있던 데이터 삭제
        testService.deleteHitCount();

//        hitcount 업데이트
        testService.updateClickCount(products);
        System.out.println("업데이트 완료");
    }
}
