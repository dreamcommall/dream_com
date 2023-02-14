package com.bitc.dream_com.scheduler;

import com.bitc.dream_com.dto.PaymentDto;
import com.bitc.dream_com.service.PaymentService;
import com.bitc.dream_com.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;

@Component
@Controller
public class PaymentScheduler {
    @Autowired
    private PaymentService paymentService;

    /**
     * 배송 2~3일 걸리는 제품 매일 4시에 배송상태 업데이트합니다.
     *
     * @author  양민호
     * @apiNote 최종 수정일 2023-02-13
     */
    @Scheduled(cron = "0 0 4 * * *")
    public void updateDeliveryState() throws Exception {
        List<PaymentDto> paymentInfo = paymentService.getLaterDelivery();
        for(PaymentDto item: paymentInfo) {
            if(item.getState() != 0 && item.getState() < 3) {
                paymentService.changeState(item.getPaymentNum(), item.getProductNum());
            }
        }
    }

    /**
     * 당일배송 state 가 1(출고 전) 인 제품 1시간마다 2(배송 중)으로 변경합니다/
     *
     * @author  양민호
     * @apiNote 최종 수정일 2023-02-13
     */
    @Scheduled(cron = "0 0 0/1 * * *")
    public void updateTodayDeliveryState1() throws Exception {
        List<PaymentDto> paymentInfo = paymentService.getTodayDelivery();
        for(PaymentDto item: paymentInfo) {
            if(item.getState() == 1) {
                paymentService.changeState(item.getPaymentNum(), item.getProductNum());
            }
        }
    }

    /**
     * 당일배송 state 가 2(배송 중) 인 제품 3(배송 완료)로 변경합니다/
     *
     * @author  양민호
     * @apiNote 최종 수정일 2023-02-13
     */
    @Scheduled(cron = "0 0 12,18 * * *")
    public void updateTodayDeliveryState2() throws Exception {
        List<PaymentDto> paymentInfo = paymentService.getTodayDelivery();
        for(PaymentDto item: paymentInfo) {
            if(item.getState() == 2) {
                paymentService.changeState(item.getPaymentNum(), item.getProductNum());
            }
        }
    }
}
