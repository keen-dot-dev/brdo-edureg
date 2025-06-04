package dev.keen.brdo.edureg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import dev.keen.brdo.edureg.entity.Institution;
import dev.keen.brdo.edureg.entity.InstitutionType;
import dev.keen.brdo.edureg.entity.Region;
import dev.keen.brdo.edureg.repository.InstitutionRepository;
import dev.keen.brdo.edureg.repository.RegionRepository;
import dev.keen.brdo.edureg.specification.InstitutionSpecification;

@Service
public class InstitutionService {
    private final InstitutionRepository institutionRepository;
    private final RegionRepository regionRepository;

    public InstitutionService(
            @Autowired InstitutionRepository institutionRepository,
            @Autowired RegionRepository regionRepository) {
        this.institutionRepository = institutionRepository;
        this.regionRepository = regionRepository;
    }

    public Institution createInstitution(Long edrpou, String name, String region, InstitutionType type) {
        Region regionEntity = regionRepository.findByName(region)
            .orElseGet(() -> regionRepository.save(new Region(region)));

        Institution institution = new Institution();
        institution.setEdrpou(edrpou);
        institution.setName(name);
        institution.setRegion(regionEntity);
        institution.setType(type);

        return institutionRepository.save(institution);
    }

    public Institution deactivateInstitution(Long id) {
        Institution institution = institutionRepository.findById(id).orElseThrow();
        institution.setActive(false);
        return institutionRepository.save(institution);
    }

    public List<Institution> getInstitutions(List<String> regions, List<InstitutionType> types, Boolean isActive) {
        Specification<Institution> specification = Specification
            .where(InstitutionSpecification.inRegions(regions))
            .and(InstitutionSpecification.ofType(types))
            .and(InstitutionSpecification.activeStatus(isActive));
        return institutionRepository.findAll(specification);
    }
}
