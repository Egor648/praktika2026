package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LotDTO {
    private Integer lotId;
    private String lotName;
    private String customerCode;
    private BigDecimal price;
    private String currencyCode;
    private String ndsRate;
    private String placeDelivery;
    private LocalDateTime dateDelivery;

    // Getters and Setters
    public Integer getLotId() { return lotId; }
    public void setLotId(Integer lotId) { this.lotId = lotId; }

    public String getLotName() { return lotName; }
    public void setLotName(String lotName) { this.lotName = lotName; }

    public String getCustomerCode() { return customerCode; }
    public void setCustomerCode(String customerCode) { this.customerCode = customerCode; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCurrencyCode() { return currencyCode; }
    public void setCurrencyCode(String currencyCode) { this.currencyCode = currencyCode; }

    public String getNdsRate() { return ndsRate; }
    public void setNdsRate(String ndsRate) { this.ndsRate = ndsRate; }

    public String getPlaceDelivery() { return placeDelivery; }
    public void setPlaceDelivery(String placeDelivery) { this.placeDelivery = placeDelivery; }

    public LocalDateTime getDateDelivery() { return dateDelivery; }
    public void setDateDelivery(LocalDateTime dateDelivery) { this.dateDelivery = dateDelivery; }
}