package com.biddingsystem.service;

import java.util.List;
import com.biddingsystem.entity.User;
import com.biddingsystem.entity.WalletTransaction;

public interface WalletTransactionService {
    
    WalletTransaction addTransaction(WalletTransaction transaction);
    
    List<WalletTransaction> getTransactionsByUser(User user);
    
}
