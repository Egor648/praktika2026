package com.example.demo.controller;

import com.example.demo.dto.LotDTO;
import com.example.demo.service.LotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lots")
@CrossOrigin(origins = "*")
public class LotController {
    private final LotService service;

    public LotController(LotService service) {
        this.service = service;
    }

    @GetMapping
    public List<LotDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LotDTO> getById(@PathVariable Integer id) {
        LotDTO dto = service.getById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody LotDTO dto) {
        Integer id = service.create(dto);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Integer id, @RequestBody LotDTO dto) {
        service.update(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}