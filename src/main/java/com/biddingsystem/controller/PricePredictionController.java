package com.biddingsystem.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biddingsystem.service.impl.GeminiService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class PricePredictionController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/predict-price")
    public ResponseEntity<?> predictPrice(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String description = payload.get("description");
        String category = payload.get("category");

        try {
            String jsonResponse = geminiService.predictPrice(name, description, category);

            if (jsonResponse == null) {
                return ResponseEntity.status(502).body(
                        Map.of("error", "AI service failed to generate a valid response. Please check backend logs."));
            }

            // Ensure valid JSON format or return raw string if simple
            try {
                Map result = objectMapper.readValue(jsonResponse, Map.class);
                return ResponseEntity.ok(result);
            } catch (Exception e) {
                // Fallback: return as simple map with text
                return ResponseEntity.ok(Map.of("raw_response", jsonResponse));
            }
        } catch (org.springframework.web.client.HttpClientErrorException.TooManyRequests e) {
            return ResponseEntity.status(429).body(Map.of("error", "AI Quota Exceeded. Please wait 1 minute."));
        }
    }

}
