package com.biddingsystem.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class PaymentRequest {
    private int userId;
    private BigDecimal amount;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
