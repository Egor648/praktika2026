package com.example.demo.dto;

public class CustomerDTO {
    private String customerCode;
    private String customerName;
    private String customerInn;
    private String customerKpp;
    private String customerLegalAddress;
    private String customerPostalAddress;
    private String customerEmail;
    private String customerCodeMain;
    private Boolean isOrganization;
    private Boolean isPerson;

    // Getters and Setters
    public String getCustomerCode() { return customerCode; }
    public void setCustomerCode(String customerCode) { this.customerCode = customerCode; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerInn() { return customerInn; }
    public void setCustomerInn(String customerInn) { this.customerInn = customerInn; }

    public String getCustomerKpp() { return customerKpp; }
    public void setCustomerKpp(String customerKpp) { this.customerKpp = customerKpp; }

    public String getCustomerLegalAddress() { return customerLegalAddress; }
    public void setCustomerLegalAddress(String customerLegalAddress) {
        this.customerLegalAddress = customerLegalAddress;
    }

    public String getCustomerPostalAddress() { return customerPostalAddress; }
    public void setCustomerPostalAddress(String customerPostalAddress) {
        this.customerPostalAddress = customerPostalAddress;
    }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getCustomerCodeMain() { return customerCodeMain; }
    public void setCustomerCodeMain(String customerCodeMain) {
        this.customerCodeMain = customerCodeMain;
    }

    public Boolean getIsOrganization() { return isOrganization; }
    public void setIsOrganization(Boolean isOrganization) { this.isOrganization = isOrganization; }

    public Boolean getIsPerson() { return isPerson; }
    public void setIsPerson(Boolean isPerson) { this.isPerson = isPerson; }
}