package com.biddingsystem.service;

import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class GeminiConnectionTest {

    @Test
    public void testGeminiConnection() {
        String apiKey = "AIzaSyDjFg63HjG-jSKPFl9NQfShzjVGgEZ6yFo";
        // Using a model confirmed to be in the list
        String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
        String url = apiUrl + apiKey;

        System.out.println("Testing URL: " + url);

        try {
            RestTemplate restTemplate = new RestTemplate();

            // Minimal Request Body
            String jsonBody = "{\"contents\":[{\"parts\":[{\"text\":\"Hello\"}]}]}";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            System.out.println("Sending Request...");
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
