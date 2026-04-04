package com.biddingsystem.dto;

import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String tokenId;
    private String role;
}
