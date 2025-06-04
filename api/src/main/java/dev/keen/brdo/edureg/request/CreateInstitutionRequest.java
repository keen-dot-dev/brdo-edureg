package dev.keen.brdo.edureg.request;

import dev.keen.brdo.edureg.entity.InstitutionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class CreateInstitutionRequest {
    private Long edrpou;
    private String name;
    private String region;
    private InstitutionType type;
}
