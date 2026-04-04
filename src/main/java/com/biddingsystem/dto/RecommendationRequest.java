package com.biddingsystem.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecommendationRequest {

    @JsonProperty("viewed_categories")
    private List<String> viewedCategories;

    @JsonProperty("recently_viewed_items")
    private List<Integer> recentlyViewedItems;

    @JsonProperty("search_keywords")
    private List<String> searchKeywords;

}
