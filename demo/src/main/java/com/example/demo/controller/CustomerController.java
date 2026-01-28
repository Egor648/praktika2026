package com.example.demo.controller;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public List<CustomerDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{code}")
    public ResponseEntity<CustomerDTO> getByCode(@PathVariable String code) {
        CustomerDTO dto = service.getByCode(code);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CustomerDTO dto) {
        service.create(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{code}")
    public ResponseEntity<Void> update(@PathVariable String code, @RequestBody CustomerDTO dto) {
        service.update(code, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<Void> delete(@PathVariable String code) {
        service.delete(code);
        return ResponseEntity.ok().build();
    }
}