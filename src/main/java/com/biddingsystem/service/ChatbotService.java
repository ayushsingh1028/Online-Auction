package com.biddingsystem.service;

import com.biddingsystem.dto.ChatbotRequest;
import com.biddingsystem.dto.ChatbotResponse;

public interface ChatbotService {

    ChatbotResponse getChatbotResponse(ChatbotRequest request);

}
