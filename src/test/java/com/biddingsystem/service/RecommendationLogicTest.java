package com.biddingsystem.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.biddingsystem.dao.ProductDao;
import com.biddingsystem.dao.ProductOfferDao;
import com.biddingsystem.dto.RecommendationRequest;
import com.biddingsystem.dto.RecommendationResponse;
import com.biddingsystem.entity.Category;
import com.biddingsystem.entity.Product;
import com.biddingsystem.entity.ProductOffer;
import com.biddingsystem.service.impl.RecommendationServiceImpl;

public class RecommendationLogicTest {

    @Mock
    private ProductDao productDao;

    @Mock
    private ProductOfferDao productOfferDao;

    @InjectMocks
    private RecommendationServiceImpl recommendationService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRecommendations() {
        // Setup Date
        String futureDate = LocalDateTime.now().plusDays(5).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String pastDate = LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Setup Categories
        Category electronics = new Category();
        electronics.setName("Electronics");
        Category fashion = new Category();
        fashion.setName("Fashion");

        // Setup Products
        Product p1 = new Product();
        p1.setId(1);
        p1.setName("iPhone 15");
        p1.setCategory(electronics);
        p1.setEndDate(futureDate);
        p1.setPrice(new BigDecimal("999"));
        Product p2 = new Product();
        p2.setId(2);
        p2.setName("T-Shirt");
        p2.setCategory(fashion);
        p2.setEndDate(futureDate);
        p2.setPrice(new BigDecimal("20"));
        Product p3 = new Product();
        p3.setId(3);
        p3.setName("Laptop");
        p3.setCategory(electronics);
        p3.setEndDate(futureDate);
        p3.setPrice(new BigDecimal("1500"));
        Product p4 = new Product();
        p4.setId(4);
        p4.setName("Old Phone");
        p4.setCategory(electronics);
        p4.setEndDate(pastDate); // Expired

        List<Product> allProducts = Arrays.asList(p1, p2, p3, p4);

        // Mock DAO behavior
        when(productDao.findByStatusIn(any())).thenReturn(allProducts);

        // Mock Bid Counts (Trending)
        // p1 has 5 bids, p2 has 0, p3 has 2
        List<ProductOffer> p1Offers = new ArrayList<>(Collections.nCopies(5, new ProductOffer()));
        List<ProductOffer> p3Offers = new ArrayList<>(Collections.nCopies(2, new ProductOffer()));

        when(productOfferDao.findByProductAndStatusIn(eq(p1), any())).thenReturn(p1Offers);
        when(productOfferDao.findByProductAndStatusIn(eq(p2), any())).thenReturn(Collections.emptyList());
        when(productOfferDao.findByProductAndStatusIn(eq(p3), any())).thenReturn(p3Offers);
        when(productOfferDao.findByProductAndStatusIn(eq(p4), any())).thenReturn(Collections.emptyList());

        // Create Request
        RecommendationRequest request = new RecommendationRequest();
        request.setViewedCategories(Arrays.asList("Electronics"));
        request.setSearchKeywords(Arrays.asList("iPhone"));

        // Execute Service
        RecommendationResponse response = recommendationService.getRecommendations(request);

        // Assertions
        System.out.println("Recommendations found: " + response.getRecommendedItems().size());
        response.getRecommendedItems().forEach(item -> System.out
                .println("ID: " + item.getItemId() + ", Name: " + item.getName() + ", Reason: " + item.getReason()));

        // p4 should be filtered out (expired)
        assertTrue(response.getRecommendedItems().stream().noneMatch(i -> i.getItemId() == 4),
                "Expired item should not be recommended");

        // p1 should be top (Category + Keyword + 5 bids)
        // Score: Cat(10) + Key(15) + Bids(10) = 35
        assertEquals(1, response.getRecommendedItems().get(0).getItemId(), "iPhone 15 should be top recommendation");

        // p3 (Category + 2 bids) -> Score: 10 + 4 = 14
        // p2 (No match) -> Score: 0

        assertTrue(response.getRecommendedItems().size() >= 1);
    }
}
