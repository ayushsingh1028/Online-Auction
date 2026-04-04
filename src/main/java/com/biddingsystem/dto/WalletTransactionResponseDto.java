package com.biddingsystem.dto;

import java.util.ArrayList;
import java.util.List;
import com.biddingsystem.entity.WalletTransaction;
import lombok.Data;

@Data
public class WalletTransactionResponseDto extends CommonApiResponse {
    private List<WalletTransaction> transactions = new ArrayList<>();
}
