package dev.keen.brdo.edureg.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "institution")
@Getter @Setter @NoArgsConstructor
public class Institution extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    private Long edrpou;

    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    @Enumerated(EnumType.STRING)
    private InstitutionType type;
    
    private boolean isActive = true;
}
