package br.com.fiap.urbanrisk.repository;

import br.com.fiap.urbanrisk.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor,Long> {
 boolean existsByCodigoIgnoreCase(String codigo);
 Optional<Sensor> findByCodigoIgnoreCase(String codigo);
}
