package com.biddingsystem.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biddingsystem.dao.ProductDao;
import com.biddingsystem.dao.ProductOfferDao;
import com.biddingsystem.dto.RecommendationRequest;
import com.biddingsystem.dto.RecommendationResponse;
import com.biddingsystem.dto.RecommendedItem;
import com.biddingsystem.entity.Product;
import com.biddingsystem.entity.ProductOffer;
import com.biddingsystem.service.RecommendationService;
import com.biddingsystem.utility.Constants.ProductOfferStatus;
import com.biddingsystem.utility.Constants.ProductStatus;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private ProductOfferDao productOfferDao;

    @Override
    public RecommendationResponse getRecommendations(RecommendationRequest request) {
        RecommendationResponse response = new RecommendationResponse();

        // 1. Fetch all available products
        List<Product> availableProducts = productDao.findByStatusIn(Arrays.asList(ProductStatus.AVAILABLE.value()));

        // 2. Filter out products that have ended
        // Assuming endDate is comparable string YYYY-MM-DD HH:mm:ss
        String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        List<Product> liveProducts = availableProducts.stream()
                .filter(p -> p.getEndDate() != null && p.getEndDate().compareTo(currentDateTime) > 0)
                .collect(Collectors.toList());

        // 3. Score Products
        List<ScoredProduct> scoredProducts = new ArrayList<>();

        Set<Integer> recentlyViewedIds = (request.getRecentlyViewedItems() != null)
                ? new HashSet<>(request.getRecentlyViewedItems())
                : new HashSet<>();

        List<String> viewedCategories = (request.getViewedCategories() != null)
                ? request.getViewedCategories()
                : new ArrayList<>();

        List<String> searchKeywords = (request.getSearchKeywords() != null)
                ? request.getSearchKeywords()
                : new ArrayList<>();

        for (Product product : liveProducts) {
            // Filter out recently viewed items
            if (recentlyViewedIds.contains(product.getId())) {
                continue;
            }

            int score = 0;
            String reason = "Trending Item"; // Default reason

            // Score based on Category
            if (product.getCategory() != null && viewedCategories.contains(product.getCategory().getName())) {
                score += 10;
                reason = "Because you viewed " + product.getCategory().getName();
            }

            // Score based on Keywords
            String pName = product.getName() != null ? product.getName().toLowerCase() : "";
            String pDesc = product.getDescription() != null ? product.getDescription().toLowerCase() : "";

            if (searchKeywords.stream().anyMatch(k -> pName.contains(k.toLowerCase())
                    || pDesc.contains(k.toLowerCase()))) {
                score += 15;
                if (score > 10) { // Update reason if this is a stronger match
                    reason = "Matches your search interests";
                }
            }

            // Score based on Trending (Bid Count)
            List<ProductOffer> offers = productOfferDao.findByProductAndStatusIn(product,
                    Arrays.asList(ProductOfferStatus.ACTIVE.value()));
            int bidCount = offers.size();
            score += bidCount * 2; // 2 points per bid

            if (score == bidCount * 2 && bidCount > 0) {
                reason = "Popular item with " + bidCount + " bids";
            } else if (score == 0) {
                // Determine if it's ending soon?
                if (pIsEndingSoon(product, currentDateTime)) {
                    score += 5;
                    reason = "Ending soon";
                }
            }

            scoredProducts.add(new ScoredProduct(product, score, reason, bidCount));
        }

        // 4. Sort and Limit
        scoredProducts.sort(Comparator.comparingInt(ScoredProduct::getScore)
                .thenComparingInt(ScoredProduct::getBidCount).reversed());

        List<RecommendedItem> finalRecommendations = scoredProducts.stream()
                .limit(8)
                .map(sp -> {
                    Product p = sp.product;
                    return new RecommendedItem(
                            p.getId(),
                            (p.getCategory() != null ? p.getCategory().getName() : "General"),
                            sp.reason,
                            p.getName(),
                            p.getDescription(),
                            p.getImage1(),
                            p.getPrice() != null ? p.getPrice().toPlainString() : "0.00");
                })
                .collect(Collectors.toList());

        response.setRecommendedItems(finalRecommendations);
        response.setHomepageSections(Arrays.asList("Recommended for You", "Trending Auctions", "Ending Soon"));

        return response;
    }

    // Helper to check if ending soon (e.g., within 24 hours)
    private boolean pIsEndingSoon(Product product, String currentDateTime) {
        // Just return false for MVP as sophisticated date math is not implemented
        return false;
    }

    // Inner helper class
    class ScoredProduct {
        Product product;
        int score;
        String reason;
        int bidCount;

        public ScoredProduct(Product product, int score, String reason, int bidCount) {
            this.product = product;
            this.score = score;
            this.reason = reason;
            this.bidCount = bidCount;
        }

        public int getScore() {
            return score;
        }

        public int getBidCount() {
            return bidCount;
        }
    }
}
