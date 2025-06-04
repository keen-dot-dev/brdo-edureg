package dev.keen.brdo.edureg.controller;

import org.springframework.web.bind.annotation.RestController;

import dev.keen.brdo.edureg.entity.Institution;
import dev.keen.brdo.edureg.entity.InstitutionType;
import dev.keen.brdo.edureg.request.CreateInstitutionRequest;
import dev.keen.brdo.edureg.service.InstitutionService;
import dev.keen.brdo.edureg.specification.InstitutionSpecification;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/schools")
public class InstitutionController {
    private final InstitutionService institutionService;

    public InstitutionController(@Autowired InstitutionService service) {
        this.institutionService = service;
    }

    @GetMapping
    public ResponseEntity<List<Institution>> getSchools(
            @RequestParam(required = false) List<String> region,
            @RequestParam(required = false) List<InstitutionType> type,
            @RequestParam(required = false) Boolean isActive) {
        List<Institution> institutions = institutionService.getInstitutions(region, type, isActive);
        return ResponseEntity.ok(institutions);
    }

    @PostMapping
    public ResponseEntity<Institution> createInstitution(@RequestBody CreateInstitutionRequest request) {
        Institution institution = institutionService.createInstitution(
                request.getEdrpou(), request.getName(),
                request.getRegion(), request.getType());
        return ResponseEntity.ok(institution);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Institution> deactivateInstitution(@PathVariable("id") Long id) {
        Institution institution = institutionService.deactivateInstitution(id);
        return ResponseEntity.ok(institution);
    }
}
