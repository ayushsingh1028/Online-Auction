package com.biddingsystem.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biddingsystem.dto.ChatbotRequest;
import com.biddingsystem.dto.ChatbotResponse;
import com.biddingsystem.service.ChatbotService;

@Service
public class ChatbotServiceImpl implements ChatbotService {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private com.biddingsystem.dao.ProductDao productDao;

    @Override
    public ChatbotResponse getChatbotResponse(ChatbotRequest request) {
        String query = request.getUserQuery() != null ? request.getUserQuery().trim() : "";
        String role = request.getUserRole() != null ? request.getUserRole() : "guest";
        String page = request.getCurrentPage() != null ? request.getCurrentPage() : "homepage";

        // 1. Empty Query / Greeting
        if (query.isEmpty() || query.equalsIgnoreCase("hello") || query.equalsIgnoreCase("hi")) {
            return handleGreeting(role, page);
        }

        // 2. Try Gemini AI
        String prompt = buildPrompt(query, role, page);
        String aiReply = geminiService.generateContent(prompt);

        if (aiReply != null && !aiReply.isBlank()) {
            return new ChatbotResponse(aiReply, extractActions(aiReply, role, page));
        }

        // 3. Fallback to Rules (if AI fails)
        return handleRuleBasedFallback(query.toLowerCase(), role, page);
    }

    private String buildPrompt(String query, String role, String page) {
        // Fetch products - try to find relevant ones first
        List<String> status = Arrays.asList(com.biddingsystem.utility.Constants.ProductStatus.AVAILABLE.value());
        List<com.biddingsystem.entity.Product> products;

        // Simple keyword extraction
        String[] keywords = query.toLowerCase().split("\\s+");
        String searchKeyword = null;
        for (String word : keywords) {
            if (word.length() > 3
                    && !Arrays.asList("this", "that", "there", "where", "have", "want", "find").contains(word)) {
                searchKeyword = word;
                break;
            }
        }

        if (searchKeyword != null) {
            products = productDao.findByNameContainingIgnoreCaseAndStatusIn(searchKeyword, status);
        } else {
            products = productDao.findByStatusIn(status);
        }

        StringBuilder inventory = new StringBuilder();
        int count = 0;
        if (products.isEmpty() && searchKeyword != null) {
            inventory.append("No products found matching \"" + searchKeyword + "\". ");
            // Fallback to general list
            products = productDao.findByStatusIn(status);
        }

        for (com.biddingsystem.entity.Product p : products) {
            if (count++ > 15)
                break;
            String cat = p.getCategory() != null ? p.getCategory().getName() : "General";
            inventory.append(String.format("- %s (%s) Price: %s\n", p.getName(), cat, p.getPrice()));
        }

        return "You are an AI assistant for an Online Bidding System. " +
                "User Role: " + role + ". Context: " + page + ". " +
                "User Query: \"" + query + "\". " +
                "Relevant Products:\n" +
                inventory.toString() + "\n" +
                "Answer the user's question accurately based on the data provided. " +
                "If they ask for recommendations, suggest the most relevant items from the list. " +
                "Keep response concise (max 3 sentences).";
    }

    private List<String> extractActions(String reply, String role, String page) {
        // Simple heuristic to suggest actions based on context
        List<String> actions = new ArrayList<>();
        if (reply.toLowerCase().contains("register") || reply.toLowerCase().contains("sign up"))
            actions.add("Go to Register");
        if (reply.toLowerCase().contains("login") || reply.toLowerCase().contains("log in"))
            actions.add("Go to Login");
        if (reply.toLowerCase().contains("bid"))
            actions.add("View Live Auctions");
        if (reply.toLowerCase().contains("sell") && role.equalsIgnoreCase("seller"))
            actions.add("Add Product");

        if (actions.isEmpty()) {
            actions.add("Browse Auctions"); // Default
        }
        return actions;
    }

    private ChatbotResponse handleRuleBasedFallback(String query, String role, String page) {
        String reply = "";
        List<String> actions = new ArrayList<>();

        if (containsAny(query, "register", "sign up")) {
            reply = "To create an account, click the 'Register' button in the navigation bar.";
            actions = Arrays.asList("Go to Register");
        } else if (containsAny(query, "login", "sign in")) {
            reply = "You can log in with your email and password from the 'Login' page.";
            actions = Arrays.asList("Go to Login");
        } else if (containsAny(query, "bid", "how to bid")) {
            if (page.equals("product page")) {
                reply = "To place a bid, use the bidding box below the product details.";
                actions = Arrays.asList("Place Bid Now");
            } else {
                reply = "You can place bids on any live auction items listed in our catalog.";
                actions = Arrays.asList("View Live Auctions");
            }
        } else if (containsAny(query, "sell", "listing")) {
            if (!role.equalsIgnoreCase("seller")) {
                reply = "Only Sellers can list items. Please apply for a seller account in your profile.";
                actions = Arrays.asList("Apply for Seller");
            } else {
                reply = "You can list new items for auction from your Seller Dashboard.";
                actions = Arrays.asList("Go to Dashboard", "Add Product");
            }
        } else {
            reply = "I'm having trouble connecting to my AI brain right now, but I can help with basic navigation!";
            actions = Arrays.asList("Browse Auctions", "Contact Support");
        }
        return new ChatbotResponse(reply, actions);
    }

    private ChatbotResponse handleGreeting(String role, String page) {
        String reply = "Hello! ";
        List<String> actions = new ArrayList<>();

        if (role.equalsIgnoreCase("guest")) {
            reply += "Welcome to our auction platform. How can I help you today?";
            actions = Arrays.asList("How to Register", "Browse Auctions");
        } else {
            reply += "Welcome back!";
            actions = Arrays.asList("View Recommended", "Search Items");
        }
        return new ChatbotResponse(reply, actions);
    }

    private boolean containsAny(String text, String... keywords) {
        for (String k : keywords) {
            if (text.contains(k))
                return true;
        }
        return false;
    }

}
