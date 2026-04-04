package com.biddingsystem.dto;

import lombok.Data;

@Data
public class PaymentResponse {
    private String razorpayOrderId;
    private String amount;
    private String currency;
    private String keyId;
}
