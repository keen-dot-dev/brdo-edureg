package dev.keen.brdo.edureg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import dev.keen.brdo.edureg.entity.Institution;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long>, JpaSpecificationExecutor<Institution> { }

