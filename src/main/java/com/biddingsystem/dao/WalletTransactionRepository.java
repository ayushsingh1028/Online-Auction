package com.biddingsystem.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.biddingsystem.entity.User;
import com.biddingsystem.entity.WalletTransaction;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Integer> {
    
    List<WalletTransaction> findByUserOrderByIdDesc(User user);
    
}
