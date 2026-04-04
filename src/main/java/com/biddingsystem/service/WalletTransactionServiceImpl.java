package com.biddingsystem.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.biddingsystem.dao.WalletTransactionRepository;
import com.biddingsystem.entity.User;
import com.biddingsystem.entity.WalletTransaction;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Override
    public WalletTransaction addTransaction(WalletTransaction transaction) {
        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactionsByUser(User user) {
        return walletTransactionRepository.findByUserOrderByIdDesc(user);
    }
}
