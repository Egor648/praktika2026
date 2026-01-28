package com.example.demo.service;

import com.example.demo.dto.LotDTO;
import jooqdata.tables.Lot;
import jooqdata.tables.records.LotRecord;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LotService {
    private final DSLContext dsl;
    private final Lot LOT = Lot.LOT;

    public LotService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public List<LotDTO> getAll() {
        return dsl.selectFrom(LOT)
                .fetchInto(LotDTO.class);
    }

    public LotDTO getById(Integer id) {
        return dsl.selectFrom(LOT)
                .where(LOT.LOT_ID.eq(id))
                .fetchOneInto(LotDTO.class);
    }

    public Integer create(LotDTO dto) {
        LotRecord rec = dsl.newRecord(LOT);
        rec.setLotName(dto.getLotName());
        rec.setCustomerCode(dto.getCustomerCode());
        rec.setPrice(dto.getPrice());
        rec.setCurrencyCode(dto.getCurrencyCode());
        rec.setNdsRate(dto.getNdsRate());
        rec.setPlaceDelivery(dto.getPlaceDelivery());
        rec.setDateDelivery(dto.getDateDelivery());
        rec.store();
        return rec.getLotId();
    }

    public void update(Integer id, LotDTO dto) {
        dsl.update(LOT)
                .set(LOT.LOT_NAME, dto.getLotName())
                .set(LOT.CUSTOMER_CODE, dto.getCustomerCode())
                .set(LOT.PRICE, dto.getPrice())
                .set(LOT.CURRENCY_CODE, dto.getCurrencyCode())
                .set(LOT.NDS_RATE, dto.getNdsRate())
                .set(LOT.PLACE_DELIVERY, dto.getPlaceDelivery())
                .set(LOT.DATE_DELIVERY, dto.getDateDelivery())
                .where(LOT.LOT_ID.eq(id))
                .execute();
    }

    public void delete(Integer id) {
        dsl.deleteFrom(LOT)
                .where(LOT.LOT_ID.eq(id))
                .execute();
    }
}