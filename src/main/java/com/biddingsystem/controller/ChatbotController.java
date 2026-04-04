package com.biddingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biddingsystem.dto.ChatbotRequest;
import com.biddingsystem.dto.ChatbotResponse;
import com.biddingsystem.service.ChatbotService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/ask")
    @Operation(summary = "Api to interact with the AI chatbot")
    public ResponseEntity<ChatbotResponse> askChatbot(@RequestBody ChatbotRequest request) {
        ChatbotResponse response = chatbotService.getChatbotResponse(request);
        return ResponseEntity.ok(response);
    }

}
