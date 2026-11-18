package br.com.fiap.urbanrisk.repository;
import br.com.fiap.urbanrisk.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EventoRepository extends JpaRepository<Evento,Long>{List<Evento> findAllByOrderByPrioridadeDescCriadoEmDesc();}
