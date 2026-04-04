package com.biddingsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ChatbotRequest {

    @JsonProperty("user_role")
    private String userRole; // guest, buyer, seller

    @JsonProperty("current_page")
    private String currentPage; // homepage, product page, bidding page, dashboard

    @JsonProperty("user_query")
    private String userQuery;

}
