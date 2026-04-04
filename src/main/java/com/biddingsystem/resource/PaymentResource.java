package com.biddingsystem.resource;

import java.math.BigDecimal;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.biddingsystem.dto.CommonApiResponse;
import com.biddingsystem.dto.PaymentRequest;
import com.biddingsystem.dto.PaymentResponse;
import com.biddingsystem.entity.User;
import com.biddingsystem.entity.WalletTransaction;
import com.biddingsystem.service.UserService;
import com.biddingsystem.service.WalletTransactionService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

@Component
@Transactional
public class PaymentResource {

    private final Logger LOG = LoggerFactory.getLogger(PaymentResource.class);

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletTransactionService walletTransactionService;

    private String calculateSignature(String data, String secret) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        byte[] hash = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(hash);
    }

    public ResponseEntity<PaymentResponse> createOrder(PaymentRequest paymentRequest) {
        LOG.info("Received request to create Razorpay order");

        PaymentResponse response = new PaymentResponse();

        try {
            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", paymentRequest.getAmount().multiply(new BigDecimal(100)).intValue()); // amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = razorpayClient.orders.create(orderRequest);

            response.setRazorpayOrderId(order.get("id"));
            response.setAmount(order.get("amount").toString());
            response.setCurrency(order.get("currency"));
            response.setKeyId(keyId);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            LOG.error("Exception occurred while creating Razorpay order: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<CommonApiResponse> verifyPaymentAndAddMoney(PaymentRequest paymentRequest) {
        LOG.info("Received request to verify Razorpay payment and add money to wallet");

        CommonApiResponse response = new CommonApiResponse();

        try {
            // Verify signature
            String generatedSignature = calculateSignature(
                    paymentRequest.getRazorpayOrderId() + "|" + paymentRequest.getRazorpayPaymentId(), keySecret);

            if (generatedSignature.equals(paymentRequest.getRazorpaySignature())) {
                // Signature verified, update wallet
                User user = userService.getUserById(paymentRequest.getUserId());
                if (user != null) {
                    BigDecimal currentBalance = user.getWalletAmount() != null ? user.getWalletAmount() : BigDecimal.ZERO;
                    user.setWalletAmount(currentBalance.add(paymentRequest.getAmount()));
                    userService.updateUser(user);

                    // Record Transaction
                    WalletTransaction transaction = new WalletTransaction();
                    transaction.setAmount(paymentRequest.getAmount());
                    transaction.setDateTime(String.valueOf(System.currentTimeMillis()));
                    transaction.setStatus("Success");
                    transaction.setType("Deposit");
                    transaction.setUser(user);
                    transaction.setRemarks("Wallet Top-up");
                    walletTransactionService.addTransaction(transaction);

                    response.setResponseMessage("Payment verified and Wallet updated successfully");
                    response.setSuccess(true);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    response.setResponseMessage("User not found");
                    response.setSuccess(false);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                }
            } else {
                response.setResponseMessage("Invalid payment signature");
                response.setSuccess(false);
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            LOG.error("Exception occurred during payment verification: ", e);
            response.setResponseMessage("Internal server error during payment verification");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
