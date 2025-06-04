package dev.keen.brdo.edureg.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import dev.keen.brdo.edureg.entity.Institution;
import dev.keen.brdo.edureg.entity.InstitutionType;

public class InstitutionSpecification {
    public static Specification<Institution> inRegions(List<String> regions) {
        return (root, query, cb) -> {
            if (regions == null || regions.isEmpty()) return null;
            return root.join("region").get("name").in(regions);
        };
    }
    public static Specification<Institution> ofType(List<InstitutionType> types) {
        return (root, query, cb) -> {
            if (types == null || types.isEmpty()) return null;
            return root.get("type").in(types);
        };
    }
    public static Specification<Institution> activeStatus(Boolean active) {
        return (root, query, cb) -> {
            if (active == null) return null;
            return cb.equal(root.get("isActive"), active);
        };
    }
}
