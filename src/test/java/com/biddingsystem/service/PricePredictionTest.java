package com.biddingsystem.service;

import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import java.util.List;

public class PricePredictionTest {

    @Test
    public void testPrediction() {
        // Hardcoded for testing since we can't inject in standalone test easily without
        // context
        String apiKey = "AIzaSyDFU0qPAY3BLoqAsCn_sj9a4O9nhJNHB8c";
        String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";
        String url = apiUrl + apiKey;

        String productName = "iphone 17";
        String description = "iphone 17 orange color which is 4 months old.";
        String categoryName = "Mobile";

        try {
            String prompt = String.format(
                    "Predict the fair market selling price range for a used item in an online auction.\n" +
                            "Category: %s\n" +
                            "Item Name: %s\n" +
                            "Description: %s\n" +
                            "Return valid JSON ONLY in this format: {\"min_price\": 100, \"max_price\": 200, \"currency\": \"USD\", \"reasoning\": \"...\"}",
                    categoryName, productName, description);

            System.out.println("Prompt: " + prompt);

            // Copying inner DTO structure for test
            String jsonBody = "{\"contents\":[{\"parts\":[{\"text\":\""
                    + prompt.replace("\n", "\\n").replace("\"", "\\\"") + "\"}]}]}";

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            System.out.println("Sending Request to: " + url);
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            System.out.println("Response Code: " + response.getStatusCode());
            System.out.println("Response Body: " + response.getBody());

        } catch (Exception e) {
            System.out.println("ERROR OCCURRED: " + e.getMessage());
            if (e instanceof org.springframework.web.client.HttpClientErrorException) {
                System.out.println("Response Body: "
                        + ((org.springframework.web.client.HttpClientErrorException) e).getResponseBodyAsString());
            }
            e.printStackTrace();
        }
    }
}
