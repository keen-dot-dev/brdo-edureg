package dev.keen.brdo.edureg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.keen.brdo.edureg.entity.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    Optional<Region> findByName(String name);
}
