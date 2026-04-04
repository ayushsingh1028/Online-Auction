package com.biddingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biddingsystem.dto.RecommendationRequest;
import com.biddingsystem.dto.RecommendationResponse;
import com.biddingsystem.service.RecommendationService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/recommendations")
@CrossOrigin(origins = "http://localhost:3000") // Assuming standard frontend port
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping
    @Operation(summary = "Api to get personalized recommendations")
    public ResponseEntity<RecommendationResponse> getRecommendations(@RequestBody RecommendationRequest request) {
        RecommendationResponse response = recommendationService.getRecommendations(request);
        return ResponseEntity.ok(response);
    }

}
