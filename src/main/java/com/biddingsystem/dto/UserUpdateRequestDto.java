package com.biddingsystem.dto;

import lombok.Data;

@Data
public class UserUpdateRequestDto {
    private int userId;
    private String firstName;
    private String lastName;
    private String phoneNo;
    private String street;
    private String city;
    private Integer pincode;
}
