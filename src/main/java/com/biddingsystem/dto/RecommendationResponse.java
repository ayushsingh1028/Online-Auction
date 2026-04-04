package com.biddingsystem.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecommendationResponse {

    @JsonProperty("recommended_items")
    private List<RecommendedItem> recommendedItems;

    @JsonProperty("homepage_sections")
    private List<String> homepageSections;

}
