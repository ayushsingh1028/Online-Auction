package com.biddingsystem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendedItem {

    @JsonProperty("item_id")
    private int itemId;

    private String category;

    private String reason;

    // Additional fields for UI convenience, can be mapped if needed or kept as
    // camelCase if not strict
    // User only specified item_id, category, reason.
    // I will map others to snake_case too just in case.

    private String name;

    private String description;

    @JsonProperty("image_url")
    private String imageUrl;

    private String price;

}
