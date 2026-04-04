package com.biddingsystem.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatbotResponse {

    private String reply;

    @JsonProperty("suggested_actions")
    private List<String> suggestedActions;

}
