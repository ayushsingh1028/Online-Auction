package com.biddingsystem.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.biddingsystem.dto.ChatbotRequest;
import com.biddingsystem.dto.ChatbotResponse;
import com.biddingsystem.service.impl.ChatbotServiceImpl;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import java.util.ArrayList;

import com.biddingsystem.dao.ProductDao;
import com.biddingsystem.service.impl.GeminiService;

public class ChatbotLogicTest {

    @InjectMocks
    private ChatbotServiceImpl chatbotService;

    @Mock
    private ProductDao productDao;

    @Mock
    private GeminiService geminiService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(productDao.findByStatusIn(anyList())).thenReturn(new ArrayList<>());
        when(productDao.findByNameContainingIgnoreCaseAndStatusIn(anyString(), anyList()))
                .thenReturn(new ArrayList<>());
    }

    @Test
    public void testGreetingGuest() {
        ChatbotRequest request = new ChatbotRequest();
        request.setUserRole("guest");
        request.setCurrentPage("homepage");
        request.setUserQuery("hello");

        ChatbotResponse response = chatbotService.getChatbotResponse(request);

        System.out.println("Greeting Response: " + response.getReply());
        assertTrue(response.getReply().contains("Welcome"));
        assertTrue(response.getSuggestedActions().contains("How to Register"));
    }

    @Test
    public void testRegisterHelp() {
        ChatbotRequest request = new ChatbotRequest();
        request.setUserQuery("how do i register?");

        ChatbotResponse response = chatbotService.getChatbotResponse(request);

        System.out.println("Register Response: " + response.getReply());
        assertTrue(response.getReply().contains("create an account"));
        assertTrue(response.getSuggestedActions().contains("Go to Register"));
    }

    @Test
    public void testContextAwareBidding() {
        ChatbotRequest request = new ChatbotRequest();
        request.setUserRole("buyer");
        request.setCurrentPage("product page");
        request.setUserQuery("how to bid");

        ChatbotResponse response = chatbotService.getChatbotResponse(request);

        System.out.println("Bidding Response (Product Page): " + response.getReply());
        assertTrue(response.getReply().contains("bidding box below"));
        assertTrue(response.getSuggestedActions().contains("Place Bid Now"));
    }

    @Test
    public void testSellerListing() {
        ChatbotRequest request = new ChatbotRequest();
        request.setUserRole("seller");
        request.setUserQuery("I want to sell items");

        ChatbotResponse response = chatbotService.getChatbotResponse(request);

        System.out.println("Seller Response: " + response.getReply());
        assertTrue(response.getReply().contains("Dashboard"));
        assertTrue(response.getSuggestedActions().contains("Add Product"));
    }

    @Test
    public void testGuestCannotSell() {
        ChatbotRequest request = new ChatbotRequest();
        request.setUserRole("guest");
        request.setUserQuery("sell item");

        ChatbotResponse response = chatbotService.getChatbotResponse(request);

        System.out.println("Guest Sell Response: " + response.getReply());
        assertTrue(response.getReply().contains("Only Sellers can list"));
    }

}
