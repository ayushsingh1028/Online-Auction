package com.biddingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.biddingsystem.dto.CommonApiResponse;
import com.biddingsystem.dto.PaymentRequest;
import com.biddingsystem.dto.PaymentResponse;
import com.biddingsystem.resource.PaymentResource;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentResource paymentResource;

    @PostMapping("/create-order")
    @Operation(summary = "Api to create Razorpay Order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody PaymentRequest paymentRequest) {
        return paymentResource.createOrder(paymentRequest);
    }

    @PostMapping("/verify-payment")
    @Operation(summary = "Api to verify Razorpay Payment and add money to wallet")
    public ResponseEntity<CommonApiResponse> verifyPaymentAndAddMoney(@RequestBody PaymentRequest paymentRequest) {
        return paymentResource.verifyPaymentAndAddMoney(paymentRequest);
    }
}
