package com.biddingsystem.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateContent(String prompt) {
        try {
            String url = apiUrl + apiKey;

            GeminiRequest request = new GeminiRequest();
            request.setContents(Collections.singletonList(
                    new Content(Collections.singletonList(
                            new Part(prompt)))));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

            ResponseEntity<GeminiResponse> response = restTemplate.postForEntity(url, entity, GeminiResponse.class);

            if (response.getBody() != null && !response.getBody().getCandidates().isEmpty()) {
                return response.getBody().getCandidates().get(0).getContent().getParts().get(0).getText();
            }
        } catch (HttpClientErrorException e) {
            System.err.println("Gemini API Error: " + e.getStatusCode());
            System.err.println("Response Body: " + e.getResponseBodyAsString());
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Fallback to rule-based if API fails
        }
        return null;
    }

    public String predictPrice(String productName, String description, String categoryName) {
        try {
            if (apiUrl == null || apiKey == null) {
                System.err.println("Gemini Configuration Error: apiUrl or apiKey is NULL!");
                System.err.println("apiUrl: " + apiUrl);
                System.err.println("apiKey: " + (apiKey != null ? "SET" : "MISSING"));
                return null;
            }

            String url = apiUrl + apiKey;
            System.out.println("Gemini Price Prediction Request for: " + productName);

            String prompt = String.format(
                    "Predict the fair market selling price range for a used item in an online auction.\n" +
                            "Category: %s\n" +
                            "Item Name: %s\n" +
                            "Description: %s\n" +
                            "Return valid JSON ONLY. No markdown, no extra text. Format: {\"min_price\": 100, \"max_price\": 200, \"currency\": \"INR\", \"reasoning\": \"...\"}",
                    categoryName, productName, description);

            GeminiRequest request = new GeminiRequest();
            request.setContents(Collections.singletonList(
                    new Content(Collections.singletonList(
                            new Part(prompt)))));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

            ResponseEntity<GeminiResponse> response = restTemplate.postForEntity(url, entity, GeminiResponse.class);

            if (response.getBody() != null && !response.getBody().getCandidates().isEmpty()) {
                Candidate candidate = response.getBody().getCandidates().get(0);

                if (candidate.getContent() == null || candidate.getContent().getParts() == null
                        || candidate.getContent().getParts().isEmpty()) {
                    System.err
                            .println("Gemini Warning: Candidate has no content. Safety Filter might have blocked it.");
                    if (candidate.getFinishReason() != null) {
                        System.err.println("Finish Reason: " + candidate.getFinishReason());
                    }
                    return null;
                }

                String text = candidate.getContent().getParts().get(0).getText();
                System.out.println("Gemini Raw Response: " + text);

                // Robust JSON extraction using regex (non-greedy)
                java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("\\{.*\\}",
                        java.util.regex.Pattern.DOTALL);
                java.util.regex.Matcher matcher = pattern.matcher(text);
                if (matcher.find()) {
                    return matcher.group().trim();
                }

                System.err.println("Gemini Error: No JSON found in response: " + text);
                return null;
            }
        } catch (HttpClientErrorException.TooManyRequests e) {
            throw e; // Propagate 429 to controller
        } catch (HttpClientErrorException e) {
            System.err.println(
                    "Gemini Price Prediction API Error (" + e.getStatusCode() + "): " + e.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            System.err.println("Gemini Price Prediction Global Error: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
        return null;
    }

    // Inner DTOs for Gemini API
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class GeminiRequest {
        private List<Content> contents;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class Content {
        private List<Part> parts;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class Part {
        private String text;
    }

    @Data
    static class GeminiResponse {
        private List<Candidate> candidates;
    }

    @Data
    static class Candidate {
        private Content content;
        private String finishReason;
    }
}
