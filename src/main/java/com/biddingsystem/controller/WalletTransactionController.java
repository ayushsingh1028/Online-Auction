package com.biddingsystem.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.biddingsystem.dto.WalletTransactionResponseDto;
import com.biddingsystem.entity.User;
import com.biddingsystem.entity.WalletTransaction;
import com.biddingsystem.service.UserService;
import com.biddingsystem.service.WalletTransactionService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/wallet/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class WalletTransactionController {

    @Autowired
    private WalletTransactionService walletTransactionService;

    @Autowired
    private UserService userService;

    @GetMapping("fetch")
    @Operation(summary = "Api to fetch wallet transactions by user Id")
    public ResponseEntity<WalletTransactionResponseDto> fetchTransactionsByUserId(@RequestParam(name = "userId") int userId) {
        
        WalletTransactionResponseDto response = new WalletTransactionResponseDto();

        if (userId == 0) {
            response.setResponseMessage("missing user id");
            response.setSuccess(false);
            return new ResponseEntity<WalletTransactionResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        User user = this.userService.getUserById(userId);

        if (user == null) {
            response.setResponseMessage("user not found");
            response.setSuccess(false);
            return new ResponseEntity<WalletTransactionResponseDto>(response, HttpStatus.BAD_REQUEST);
        }

        List<WalletTransaction> transactions = this.walletTransactionService.getTransactionsByUser(user);

        if (transactions == null || transactions.isEmpty()) {
            response.setResponseMessage("no transactions found");
            response.setSuccess(false);
            return new ResponseEntity<WalletTransactionResponseDto>(response, HttpStatus.OK);
        }

        response.setTransactions(transactions);
        response.setResponseMessage("transactions fetched success");
        response.setSuccess(true);

        return new ResponseEntity<WalletTransactionResponseDto>(response, HttpStatus.OK);
    }
}
