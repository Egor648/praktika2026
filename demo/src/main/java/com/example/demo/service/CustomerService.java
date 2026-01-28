package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;
import jooqdata.tables.Customer;
import jooqdata.tables.records.CustomerRecord;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    private final DSLContext dsl;
    private final Customer CUSTOMER = Customer.CUSTOMER;

    public CustomerService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public List<CustomerDTO> getAll() {
        return dsl.selectFrom(CUSTOMER)
                .fetchInto(CustomerDTO.class);
    }

    public CustomerDTO getByCode(String code) {
        return dsl.selectFrom(CUSTOMER)
                .where(CUSTOMER.CUSTOMER_CODE.eq(code))
                .fetchOneInto(CustomerDTO.class);
    }

    public void create(CustomerDTO dto) {
        CustomerRecord rec = dsl.newRecord(CUSTOMER);
        rec.setCustomerCode(dto.getCustomerCode());
        rec.setCustomerName(dto.getCustomerName());
        rec.setCustomerInn(dto.getCustomerInn());
        rec.setCustomerKpp(dto.getCustomerKpp());
        rec.setCustomerLegalAddress(dto.getCustomerLegalAddress());
        rec.setCustomerPostalAddress(dto.getCustomerPostalAddress());
        rec.setCustomerEmail(dto.getCustomerEmail());
        rec.setCustomerCodeMain(dto.getCustomerCodeMain());
        rec.setIsOrganization(dto.getIsOrganization());
        rec.setIsPerson(dto.getIsPerson());
        rec.store();
    }

    public void update(String code, CustomerDTO dto) {
        dsl.update(CUSTOMER)
                .set(CUSTOMER.CUSTOMER_NAME, dto.getCustomerName())
                .set(CUSTOMER.CUSTOMER_INN, dto.getCustomerInn())
                .set(CUSTOMER.CUSTOMER_KPP, dto.getCustomerKpp())
                .set(CUSTOMER.CUSTOMER_LEGAL_ADDRESS, dto.getCustomerLegalAddress())
                .set(CUSTOMER.CUSTOMER_POSTAL_ADDRESS, dto.getCustomerPostalAddress())
                .set(CUSTOMER.CUSTOMER_EMAIL, dto.getCustomerEmail())
                .set(CUSTOMER.CUSTOMER_CODE_MAIN, dto.getCustomerCodeMain())
                .set(CUSTOMER.IS_ORGANIZATION, dto.getIsOrganization())
                .set(CUSTOMER.IS_PERSON, dto.getIsPerson())
                .where(CUSTOMER.CUSTOMER_CODE.eq(code))
                .execute();
    }

    public void delete(String code) {
        dsl.deleteFrom(CUSTOMER)
                .where(CUSTOMER.CUSTOMER_CODE.eq(code))
                .execute();
    }
}