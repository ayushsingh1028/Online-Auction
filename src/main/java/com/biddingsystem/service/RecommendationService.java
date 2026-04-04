package com.biddingsystem.service;

import com.biddingsystem.dto.RecommendationRequest;
import com.biddingsystem.dto.RecommendationResponse;

public interface RecommendationService {

    RecommendationResponse getRecommendations(RecommendationRequest request);

}
